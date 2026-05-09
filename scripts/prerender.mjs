/**
 * Prerender script — gera HTML estático para cada rota após o build.
 *
 * Como funciona:
 * 1. Lê o dist/index.html gerado pelo Vite (template base)
 * 2. Importa o entry-server.js (build SSR do React)
 * 3. Para cada rota, renderiza o componente com StaticRouter
 * 4. Injeta o HTML + meta tags no template
 * 5. Salva como dist/<rota>/index.html
 *
 * Resultado: cada rota tem um arquivo HTML completo com conteúdo real,
 * legível por qualquer crawler (WhatsApp, Google, Facebook) sem precisar
 * executar JavaScript.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const ssrDist = path.resolve(__dirname, '../dist-ssr')

// Rotas que devem ser pré-renderizadas
const routes = [
  '/',
  '/chat-anonimo-seguro',
  '/praticar-ingles-ao-vivo',
]

async function prerender() {
  // Template base gerado pelo Vite
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

  // Importa o bundle SSR do React
  const { render } = await import(path.join(ssrDist, 'entry-server.js'))

  for (const route of routes) {
    console.log(`⚙️  Pré-renderizando: ${route}`)

    const { html, head } = render(route)

    // Injeta o conteúdo no template
    const fullHtml = template
      .replace('<!--app-head-->', head ?? '')
      .replace('<!--app-html-->', html)

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
