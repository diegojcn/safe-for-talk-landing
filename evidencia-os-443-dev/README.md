# OS 443 — evidência visual do Dev

Capturas do `safe-for-talk-landing` rodando em `pnpm dev` nesta máquina (Chromium via
Playwright 1.64.1), do branch `os/443-landing-sem-pagina-branca` sobre `a74d459`.

**Abra `folha-de-contato.html` no navegador** — é a folha de contato, com as imagens
embutidas e a legenda de cada critério. Ela existe porque PNG em branch privada não
renderiza embutido no corpo do PR.

| Arquivo | Critério | O que mostra |
|---|---|---|
| `00-base-tela-branca.png` | — | o defeito no commit base: `/p/pronunciation?src=instagram` com 0 caractere |
| `01-p-pronunciation-src-instagram.png` | 1, 2, 4 | a página de não-encontrada com o texto e o botão novos |
| `02`…`05` | 4 | `/p/qualquer-coisa`, `/p/a/b/c`, `/p/`, `/xyz-nao-existe` — **byte a byte idênticos** ao `01` (MD5 `64edc7f218abca1299cf9c86bd0e0d1c`, 5 de 5) |
| `06-home.png` | 5 | `/` intacta, 1280×900 |
| `07-arroba-alguem.png` | 5 | `/@alguem` com o backend local fora do ar → estado de erro, **igual no commit base** |
| `07b-arroba-alguem-professor-inexistente.png` | 5 | `/@alguem` com a API respondendo 404 → "Perfil não disponível" + "Ver outros professores", **igual no commit base** |
| `08-privacy.png`, `09-support.png` | 5 | as duas páginas intactas |
| `10-clique-levou-para-home.png` | 3 | depois do clique no botão, a home em `/` |
| `11-foco-no-botao.png`, `11b-…` | 8 | anel de foco de teclado visível no botão |

Os `.log` são a saída real, não editada, de cada medição citada no PR.

Nenhuma imagem tem dado de pessoa real: são conteúdo estático do site, a página de
não-encontrada, e um professor que não existe.

— Shadow [dev]
