/**
 * Check de <head> — cada página pré-renderizada sai com UMA tag de cada tipo, e é a dela.
 *
 * O defeito que ele prende: o template (index.html) já traz title, description, canonical,
 * og:* e twitter:* da home, e as páginas de SEO declaram as suas pelo <Helmet>. O pré-render
 * juntava as duas coisas sem tirar nada, então cada página saía com duas descriptions e duas
 * canonicals, a primeira apontando para a home. Pior: no React 19 o Helmet não devolve nada
 * no `head` do SSR, e as tags da página iam parar dentro do <div id="root">, no body, onde o
 * Google ignora a canonical.
 *
 * Para cada rota de routes.mjs, sobre dist/<rota>/index.html:
 *
 * 1. Nenhuma das tags abaixo aparece mais de uma vez no arquivo.
 * 2. Nenhuma delas aparece fora do <head>.
 * 3. Se a página declara canonical no <Helmet>, a canonical do arquivo é exatamente essa. É o
 *    que pega a canonical da home sobrando numa página de SEO. Página sem canonical própria
 *    (/privacy, /terms...) fica com a do template, e isso não é assunto deste check.
 *
 * O que a página declara vem do bundle SSR (dist-ssr/entry-server.js), o mesmo App.tsx do
 * navegador. Pré-requisito: `pnpm build:ssg`. O script `check:head` do package.json faz os dois.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { prerenderRoutes } from './routes.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const ssrDist = path.resolve(__dirname, '../dist-ssr')

const tags = {
  title: /<title[\s>]/g,
  description: /<meta\b[^>]*\bname="description"/g,
  canonical: /<link\b[^>]*\brel="canonical"/g,
  'og:title': /<meta\b[^>]*\bproperty="og:title"/g,
  'og:description': /<meta\b[^>]*\bproperty="og:description"/g,
  'og:url': /<meta\b[^>]*\bproperty="og:url"/g,
  'twitter:title': /<meta\b[^>]*\bname="twitter:title"/g,
  'twitter:description': /<meta\b[^>]*\bname="twitter:description"/g,
}

const contar = (texto, re) => (texto.match(re) ?? []).length
const hrefCanonical = (texto) => texto.match(/<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]*)"/)?.[1]

async function check() {
  const { render } = await import(path.join(ssrDist, 'entry-server.js'))
  const violacoes = []

  for (const route of prerenderRoutes) {
    const problemas = []
    const arquivo = route === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.slice(1), 'index.html')
    const html = fs.readFileSync(arquivo, 'utf-8')
    const fimHead = html.indexOf('</head>')
    const body = html.slice(fimHead)

    const contagem = []
    for (const [nome, re] of Object.entries(tags)) {
      const total = contar(html, re)
      contagem.push(`${nome}=${total}`)
      if (total > 1) problemas.push(`${total}× ${nome}`)
      if (contar(body, re) > 0) problemas.push(`${nome} fora do <head>`)
    }
    console.log(`${route} ${contagem.join(' ')}`)

    const declarada = hrefCanonical(render(route).html)
    if (declarada && hrefCanonical(html) !== declarada) {
      problemas.push(`canonical ${hrefCanonical(html)} ≠ declarada ${declarada}`)
    }
    if (problemas.length > 0) violacoes.push(`${route}: ${problemas.join('; ')}`)
  }

  if (violacoes.length > 0) {
    console.error(`\n❌ ${violacoes.length} rota(s) com problema no <head>:`)
    for (const v of violacoes) console.error(`   ${v}`)
    process.exit(1)
  }

  console.log(`\n✅ ${prerenderRoutes.length} rotas com uma tag de cada tipo, todas no <head>`)
}

check().catch((err) => {
  console.error('❌ Erro no check de head:', err)
  process.exit(1)
})
