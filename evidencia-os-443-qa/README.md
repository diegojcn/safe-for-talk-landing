# Evidência do QA — OS #443 (Safe4Talk, landing)

Loro (QA) · 28/10/2026 · branch `os/443-landing-sem-pagina-branca`, commit `bf92d3e`
PR: diegojcn/safe-for-talk-landing#22

- `folha-de-contato-qa.html` — todas as capturas numa página só, imagens embutidas em base64.
  Baixe e abra no navegador; não precisa de mais nada.
- `prints/` — os PNG originais.
- `logs/` — a saída crua dos gates que rodei eu mesmo.
- `medicoes.md` — as tabelas de medição, em texto, para quem quiser buscar/citar.

**Alvo testado:** navegador (Chromium headless), em duas formas de servir:

| forma | o que é | por que importa |
|---|---|---|
| `pnpm dev` (5450) | o servidor de desenvolvimento do Vite, `index.html` vazio | é o que o Dev usou |
| `vite preview` sobre `dist` do `pnpm build:ssg` (5451) | serve o **mesmo arquivo que a Vercel publica**, com fallback para `/index.html` igual ao rewrite `/(.*)` do `vercel.json` | é o que o usuário vai receber |
| `vite preview` sobre `dist` do commit base `a74d459` (5452) | o site **sem** a correção, buildado por mim | prova que o bug existia e que o PR o conserta |

Não testei Android nem iOS: esta OS é da landing, que é só web.
