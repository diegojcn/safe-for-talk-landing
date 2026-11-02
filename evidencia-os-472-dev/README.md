# Evidência — OS diegojcn/bd-ia-company#472 (Dev: Mad Frog)

`vite preview` local (porta 5472) do build `pnpm build:ssg` da branch `os/472-landing-404-prerenderizado`,
Chromium headless via Playwright, viewport 390×844, CDP `Network.emulateNetworkConditions`
400 kbps / 150 ms + `Emulation.setCPUThrottlingRate` 4×.

| print | o que mostra |
|---|---|
| `naoencontrada-t1s.png` | `/404.html` a ~1,3 s: já é "Página não encontrada" |
| `naoencontrada-t14s.png` | `/404.html` a 14 s, depois do bundle: o mesmo corpo |
| `home-t1s.png`, `home-t14s.png` | `/` continua a home |

Amostragem a cada 50 ms em `/404.html`: a manchete da home ("Practice with real people") não aparece em
nenhuma amostra; o texto da página não muda entre 980 ms e 14 s.

Lembrete: o `vite preview` não aplica o `vercel.json` — `localhost:5472/p/pronunciation` continua mostrando a
home localmente. A prova de que endereço desconhecido recebe este documento é o rewrite (asserção 5 do check)
e o preview da Vercel.
