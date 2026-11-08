/**
 * Check do token do anel de foco — `--ring` do `:root` tem de ser uma cor de verdade.
 *
 * O defeito que ele prende: o `:root` de src/index.css guarda as cores como trio HSL solto
 * (`221.2 83.2% 53.3%`, formato do shadcn para Tailwind 3), mas o `@theme inline` do
 * Tailwind 4 usa `var(--ring)` como cor pronta. O `ring-ring/50` do <Button> vira
 * `color-mix(in oklab, 221.2 83.2% 53.3% 50%, transparent)`, que é inválido; o navegador
 * descarta a cor, o box-shadow sai `none` e quem navega pelo teclado não vê onde está o foco.
 *
 * Só olha o `:root` (tema claro). O `.dark` já usa oklch e não entra aqui.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cssPath = path.resolve(__dirname, '../src/index.css')

// Função de cor CSS ou hex. Um trio de números solto não é cor.
const COR_VALIDA = /^(hsl|hsla|rgb|rgba|oklch|oklab|lab|lch|color)\(|^#[0-9a-f]{3,8}$/i

function check() {
  const css = fs.readFileSync(cssPath, 'utf8')

  const root = css.match(/:root\s*\{([^}]*)\}/)
  if (!root) {
    console.error('❌ bloco :root não encontrado em src/index.css')
    process.exit(1)
  }

  const ring = root[1].match(/--ring\s*:\s*([^;]+);/)
  if (!ring) {
    console.error('❌ --ring não declarado no :root de src/index.css')
    process.exit(1)
  }

  const valor = ring[1].trim()
  console.log(`:root --ring = ${valor}`)

  if (!COR_VALIDA.test(valor)) {
    console.error(`❌ --ring não é uma cor — "${valor}" quebra o color-mix do ring-ring/50 e o anel de foco some`)
    process.exit(1)
  }

  console.log('✅ --ring é uma cor válida')
}

check()
