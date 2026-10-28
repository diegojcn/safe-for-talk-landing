/**
 * Check de página branca — nenhum endereço do site pode renderizar nada.
 *
 * O defeito que ele prende: um param do React Router casa um segmento inteiro, então
 * `/p/pronunciation` (dois segmentos) não casava rota nenhuma, `<Routes>` devolvia null e o
 * corpo da página ficava com 0 byte. O visitante via branco — sem mensagem, sem erro.
 *
 * São duas conferências, e as duas precisam existir juntas:
 *
 * 1. Caminho desconhecido rende HTML. Se qualquer um der 0 byte, o branco voltou.
 * 2. Rota de verdade NÃO rende "não encontrada". É a rede contra o conserto do item 1: um
 *    catch-all com prioridade errada engoliria a home e o site inteiro viraria 404 — em
 *    silêncio, respondendo 200. A lista vem do mesmo routes.mjs que o pré-render usa.
 *
 * Roda sobre o bundle SSR (dist-ssr/entry-server.js), que é o mesmo App.tsx do navegador.
 * Pré-requisito: `pnpm build:ssr`. O script `check:routes` do package.json faz os dois.
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { prerenderRoutes } from './routes.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ssrDist = path.resolve(__dirname, '../dist-ssr')

// O texto que o corpo de "não encontrada" sempre mostra (TeacherProfile.tsx). É por ele que
// se reconhece a página, porque ela não tem rota nem marcador próprio.
const NAO_ENCONTRADA = 'Página não encontrada'

// Endereços que não existem e, por isso mesmo, têm de mostrar a página de não-encontrada.
// Os três primeiros são os que o Loro mediu em branco na produção.
const desconhecidos = [
  '/p/pronunciation',
  '/p/pronunciation?src=instagram',
  '/p/a/b/c',
  '/p/',
  '/xyz-nao-existe',
]

// Rotas reais + o link de professor, que renderiza o skeleton de carregamento no servidor.
const reais = [...prerenderRoutes, '/@alguem']

async function check() {
  const { render } = await import(path.join(ssrDist, 'entry-server.js'))
  const violacoes = []

  const medir = (url) => {
    const { html } = render(url)
    const naoEncontrada = html.includes(NAO_ENCONTRADA)
    console.log(`${url} bytes=${html.length} naoEncontrada=${naoEncontrada}`)
    return { bytes: html.length, naoEncontrada }
  }

  console.log('— caminhos desconhecidos: têm de renderizar alguma coisa')
  for (const url of desconhecidos) {
    const { bytes } = medir(url)
    if (bytes === 0) {
      violacoes.push(`${url} renderizou 0 byte — página branca`)
      break
    }
  }

  if (violacoes.length === 0) {
    console.log('\n— rotas reais: nenhuma pode virar "não encontrada"')
    for (const url of reais) {
      const { naoEncontrada } = medir(url)
      if (naoEncontrada) {
        violacoes.push(`${url} virou "${NAO_ENCONTRADA}" — o catch-all engoliu uma rota real`)
        break
      }
    }
  }

  if (violacoes.length > 0) {
    console.error(`\n❌ ${violacoes[0]}`)
    process.exit(1)
  }

  console.log(`\n✅ ${desconhecidos.length} caminhos desconhecidos com corpo, ${reais.length} rotas reais intactas`)
}

check().catch((err) => {
  console.error('❌ Erro no check de rotas:', err)
  process.exit(1)
})
