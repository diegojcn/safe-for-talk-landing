/**
 * Prerender script — gera HTML estático para cada rota após o build.
 *
 * Como funciona:
 * 1. Lê o dist/index.html gerado pelo Vite (template base)
 * 2. Importa o entry-server.js (build SSR do React)
 * 3. Para cada rota, renderiza o componente com StaticRouter
 * 4. Injeta o HTML + meta tags no template, tirando do template as tags que a página redefine
 * 5. Salva como dist/<rota>/index.html
 *
 * Resultado: cada rota tem um arquivo HTML completo com conteúdo real,
 * legível por qualquer crawler (WhatsApp, Google, Facebook) sem precisar
 * executar JavaScript.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { prerenderRoutes } from './routes.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const ssrDist = path.resolve(__dirname, '../dist-ssr')

// Tags de <head> que uma página declara pelo <Helmet>. No React 19 o Helmet não devolve nada
// em `head`: as tags saem no começo do `html`, e ficariam dentro do <div id="root">, no body,
// onde o Google ignora a canonical. Por isso elas são tiradas do corpo e vão para o <head>.
// Dos <link>, só a canonical: os `preload` de imagem que o React emite ficam onde estão.
const HEAD_TAG = /<title>[^<]*<\/title>|<meta\b[^>]*>|<link\b[^>]*\brel="canonical"[^>]*>/g

const atributo = (tag, nome) => tag.match(new RegExp(`\\b${nome}="([^"]*)"`))?.[1]

// A chave diz qual tag do template uma tag da página substitui: mesma chave, mesma tag.
function chave(tag) {
  if (tag.startsWith('<title')) return 'title'
  if (tag.startsWith('<link')) return 'link:canonical'
  const name = atributo(tag, 'name')
  if (name) return `name:${name}`
  const property = atributo(tag, 'property')
  return property ? `property:${property}` : null
}

const escapar = (texto) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Remove do <head> do template toda tag com uma das chaves. O resto do template fica intacto.
function semAsTagsRedefinidas(template, chaves) {
  const fimHead = template.indexOf('</head>')
  let head = template.slice(0, fimHead)
  for (const c of chaves) {
    const re = c === 'title'
      ? /\n?[ \t]*<title>[^<]*<\/title>/g
      : c === 'link:canonical'
        ? /\n?[ \t]*<link\b[^>]*\brel="canonical"[^>]*>/g
        : new RegExp(`\\n?[ \\t]*<meta\\b[^>]*\\b${c.split(':')[0]}="${escapar(c.slice(c.indexOf(':') + 1))}"[^>]*>`, 'g')
    head = head.replace(re, '')
  }
  return head + template.slice(fimHead)
}

async function prerender() {
  // Template base gerado pelo Vite
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

  // Importa o bundle SSR do React
  const { render } = await import(path.join(ssrDist, 'entry-server.js'))

  for (const route of prerenderRoutes) {
    console.log(`⚙️  Pré-renderizando: ${route}`)

    const { html, head } = render(route)

    // Tags que a página declara: as que o Helmet devolveu em `head` e as que vieram no corpo
    const tagsDoCorpo = html.match(HEAD_TAG) ?? []
    const pageHead = (head ?? '') + tagsDoCorpo.join('')
    const corpo = html.replace(HEAD_TAG, '')

    // A página manda no que declara. Sem twitter:* próprio, o X lê as og:* da página, então
    // as twitter:* genéricas da home saem junto com as og:* que a página redefine.
    const chaves = new Set((pageHead.match(HEAD_TAG) ?? []).map(chave).filter(Boolean))
    if (chaves.has('property:og:title')) chaves.add('name:twitter:title')
    if (chaves.has('property:og:description')) chaves.add('name:twitter:description')

    // Injeta o conteúdo no template
    const fullHtml = semAsTagsRedefinidas(template, chaves)
      .replace('<!--app-head-->', pageHead)
      .replace('<!--app-html-->', corpo)

    // Cria o diretório da rota (ex: dist/chat-anonimo-seguro/)
    const routeDir = route === '/'
      ? distDir
      : path.join(distDir, route.slice(1))

    fs.mkdirSync(routeDir, { recursive: true })
    fs.writeFileSync(path.join(routeDir, 'index.html'), fullHtml)

    console.log(`✅  Salvo: dist${route === '/' ? '/index.html' : route + '/index.html'}`)
  }

  console.log('\n🎉 Pré-renderização concluída!')
}

prerender().catch((err) => {
  console.error('❌ Erro na pré-renderização:', err)
  process.exit(1)
})
