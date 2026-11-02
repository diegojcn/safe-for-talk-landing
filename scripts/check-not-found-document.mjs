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

// O texto que o corpo de "não encontrada" sempre mostra (TeacherProfile.tsx).
const NAO_ENCONTRADA = 'Página não encontrada'
// A manchete do hero da home. Está no HTML da home e não no da não-encontrada.
const MANCHETE_HOME = 'Practice with real people'
// Quantos rewrites o vercel.json tem. Este check troca o destino do último, não acrescenta.
const TOTAL_REWRITES = 9

const ler = (arquivo) => fs.readFileSync(arquivo, 'utf-8')

// Todo arquivo sob `dir`, inclusive os de pasta oculta (.well-known), como caminho relativo.
const arquivosSob = (dir, base = dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entrada) => {
    const caminho = path.join(dir, entrada.name)
    return entrada.isDirectory() ? arquivosSob(caminho, base) : [path.relative(base, caminho)]
  })

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
  [`vercel.json: ${TOTAL_REWRITES} rewrites, o último manda /(.*) para /404.html`, () => {
    const { rewrites } = JSON.parse(ler(path.join(rootDir, 'vercel.json')))
    const ultimo = rewrites.at(-1)
    return rewrites.length === TOTAL_REWRITES &&
      Object.keys(ultimo).length === 2 &&
      ultimo.source === '/(.*)' &&
      ultimo.destination === '/404.html'
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
