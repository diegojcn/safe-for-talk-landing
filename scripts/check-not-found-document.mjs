/**
 * Check do documento de não-encontrada — endereço desconhecido não pode receber a home.
 *
 * O defeito que ele prende: o último rewrite do vercel.json mandava todo endereço sem arquivo
 * para /index.html, e /index.html é a home pré-renderizada. Quem abria /p/pronunciation via a
 * home inteira, em inglês, até o bundle carregar e o React trocar pela não-encontrada — 12 s
 * numa rede lenta. O conserto pré-renderiza a não-encontrada em dist/404.html e aponta o
 * fallback para ela.
 *
 * Trocar o destino do fallback muda o que TODO endereço sem arquivo recebe, por isso o check
 * confere também o outro lado: rota real continua com conteúdo próprio, e tudo de public/
 * continua indo para o dist. Um arquivo de public/ que sumisse do dist passaria a responder a
 * não-encontrada com 200 — o App Link do Android e a verificação do Search Console cairiam em
 * silêncio.
 *
 * Os rewrites do vercel.json não são contados: cada um é conferido contra o que aponta. A lista
 * esperada vem do que existe no repo — página em routes.mjs (e no dist), função em api/ — então
 * rota nova não exige editar este check, e rewrite que falta ou sobra continua sendo pego. Um
 * número fixo aqui já foi editado à mão duas vezes e quebrou uma (landing#23 × landing#24).
 *
 * Roda sobre o dist já construído. Pré-requisito: `pnpm build:ssg`. O script
 * `check:not-found` do package.json faz os dois.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { prerenderRoutes } from './routes.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const publicDir = path.join(rootDir, 'public')
const apiDir = path.join(rootDir, 'api')

// O texto que o corpo de "não encontrada" sempre mostra (TeacherProfile.tsx).
const NAO_ENCONTRADA = 'Página não encontrada'
// A manchete do hero da home. Está no HTML da home e não no da não-encontrada.
const MANCHETE_HOME = 'Practice with real people'
// O rewrite que manda todo endereço sem arquivo para a não-encontrada.
const FALLBACK = { source: '/(.*)', destination: '/404.html' }
// Os tipos de rewrite que o check sabe conferir. Tipo novo (URL externa, por exemplo) falha até
// alguém ensinar o check — de propósito, para não voltar a ser só subir um número.
const TIPOS_ACEITOS = 'página (/<rota> → /<rota>/index.html, rota em routes.mjs), ' +
  'função (/<origem> → /api/<nome>[?…], com api/<nome>.js) ou o fallback /(.*) → /404.html'

const ler = (arquivo) => fs.readFileSync(arquivo, 'utf-8')

// Todo arquivo sob `dir`, inclusive os de pasta oculta (.well-known), como caminho relativo.
const arquivosSob = (dir, base = dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entrada) => {
    const caminho = path.join(dir, entrada.name)
    return entrada.isDirectory() ? arquivosSob(caminho, base) : [path.relative(base, caminho)]
  })

const rewrites = () => JSON.parse(ler(path.join(rootDir, 'vercel.json'))).rewrites
const éFallback = (r) =>
  Object.keys(r).length === 2 && r.source === FALLBACK.source && r.destination === FALLBACK.destination

// Confere um rewrite que não é o fallback. Devolve o problema, ou null se ele aponta para algo real.
const problemaDoRewrite = ({ source, destination }) => {
  const pagina = /^\/(.+)\/index\.html$/.exec(destination ?? '')
  if (pagina) {
    const rota = `/${pagina[1]}`
    if (source !== rota) return `${source} → ${destination}: a origem devia ser ${rota}`
    if (!prerenderRoutes.includes(rota)) return `${source} → ${destination}: ${rota} não está em routes.mjs`
    if (!fs.existsSync(path.join(distDir, pagina[1], 'index.html'))) {
      return `${source} → ${destination}: dist${rota}/index.html não existe`
    }
    return null
  }
  const funcao = /^\/api\/([^/?]+)(\?.*)?$/.exec(destination ?? '')
  if (funcao) {
    const arquivo = `api/${funcao[1]}.js`
    return fs.existsSync(path.join(rootDir, arquivo)) ? null : `${source} → ${destination}: ${arquivo} não existe`
  }
  return `${source} → ${destination}: tipo de rewrite desconhecido. Aceitos: ${TIPOS_ACEITOS}`
}

const asserções = [
  ['dist/404.html existe', () => fs.existsSync(path.join(distDir, '404.html'))],
  [`dist/404.html contém "${NAO_ENCONTRADA}"`, () =>
    ler(path.join(distDir, '404.html')).includes(NAO_ENCONTRADA)],
  [`dist/404.html não contém "${MANCHETE_HOME}"`, () =>
    !ler(path.join(distDir, '404.html')).includes(MANCHETE_HOME)],
  [`dist/index.html continua a home (tem "${MANCHETE_HOME}", não tem "${NAO_ENCONTRADA}")`, () => {
    const home = ler(path.join(distDir, 'index.html'))
    return home.includes(MANCHETE_HOME) && !home.includes(NAO_ENCONTRADA)
  }],
  ['vercel.json: o último rewrite manda /(.*) para /404.html, e só ele', () => {
    const todos = rewrites()
    const fallbacks = todos.filter((r) => r.source === FALLBACK.source)
    if (fallbacks.length !== 1) console.error(`   /(.*) aparece ${fallbacks.length} vezes, devia ser 1`)
    return fallbacks.length === 1 && éFallback(todos.at(-1))
  }],
  ['vercel.json: todo rewrite aponta para uma página pré-renderizada ou uma função de api/', () => {
    const problemas = rewrites().filter((r) => !éFallback(r)).flatMap((r) => {
      const problema = problemaDoRewrite(r)
      if (!problema) console.log(`   ${r.source} → ${r.destination}`)
      return problema ? [problema] : []
    })
    problemas.forEach((p) => console.error(`   rewrite quebrado: ${p}`))
    return problemas.length === 0
  }],
  ['toda função de api/ é destino de um rewrite', () => {
    const destinos = rewrites().map((r) => r.destination ?? '')
    const orfas = fs.readdirSync(apiDir).filter((f) => f.endsWith('.js')).filter((f) => {
      const nome = f.slice(0, -'.js'.length)
      return !destinos.some((d) => d === `/api/${nome}` || d.startsWith(`/api/${nome}?`))
    })
    orfas.forEach((f) => console.error(`   sem rewrite: api/${f}`))
    return orfas.length === 0
  }],
  [`${prerenderRoutes.length} rotas reais com index.html próprio e sem "${NAO_ENCONTRADA}"`, () =>
    prerenderRoutes.every((route) => {
      const arquivo = path.join(distDir, route.slice(1), 'index.html')
      const ok = fs.existsSync(arquivo) && !ler(arquivo).includes(NAO_ENCONTRADA)
      if (!ok) console.error(`   rota quebrada: ${route}`)
      return ok
    })],
  ['todo arquivo de public/ chegou no dist no mesmo caminho', () => {
    const faltando = arquivosSob(publicDir).filter((rel) => !fs.existsSync(path.join(distDir, rel)))
    faltando.forEach((rel) => console.error(`   faltando no dist: ${rel}`))
    return faltando.length === 0
  }],
]

asserções.forEach(([descricao, conferir], i) => {
  let ok
  try {
    ok = conferir()
  } catch (err) {
    console.error(`   ${err.message}`)
    ok = false
  }
  if (!ok) {
    console.error(`❌ ${i + 1}. ${descricao}`)
    process.exit(1)
  }
  console.log(`✅ ${i + 1}. ${descricao}`)
})

console.log(`\n✅ ${asserções.length} asserções: endereço desconhecido recebe a não-encontrada, o resto intacto`)
