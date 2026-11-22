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
import { prerenderRoutes } from './routes.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const ssrDist = path.resolve(__dirname, '../dist-ssr')

async function prerender() {
  // Template base gerado pelo Vite
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

  // Importa o bundle SSR do React
  const { render } = await import(path.join(ssrDist, 'entry-server.js'))

  for (const route of prerenderRoutes) {
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

  // Página de não-encontrada: o documento que o vercel.json entrega a todo endereço sem
  // arquivo. Antes ele recebia o dist/index.html, que é a home — e o visitante via a home até
  // o React trocar. Fica fora do routes.mjs porque lá só entra rota real (o check de rotas
  // afirma que nenhuma delas é "não encontrada"). Grava o arquivo solto, dist/404.html, e não
  // dist/404/index.html como o loop faria. Qualquer caminho que não seja rota nem link de
  // professor cai no mesmo corpo; /404 é só o nome.
  console.log('⚙️  Pré-renderizando: não encontrada')
  const notFound = render('/404')
  fs.writeFileSync(
    path.join(distDir, '404.html'),
    template
      .replace('<!--app-head-->', notFound.head ?? '')
      .replace('<!--app-html-->', notFound.html),
  )
  console.log('✅  Salvo: dist/404.html')

  console.log('\n🎉 Pré-renderização concluída!')
}

prerender().catch((err) => {
  console.error('❌ Erro na pré-renderização:', err)
  process.exit(1)
})
