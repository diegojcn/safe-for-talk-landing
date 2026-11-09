# Evidência do Dev — OS diegojcn/bd-ia-company#583

Branch medida: `os/583-footer-link-contrast` @ `bbeed39`, base `origin/main` @ `503b1e8`.
Build: `pnpm build:ssg` + `pnpm preview --port 4583`. Chromium (Chrome for Testing 1248),
1280×900, script em `logs/medir-contraste.js`. Fundo do `<footer>`: `rgb(243, 244, 246)`.

| página | antes (cor · contraste) | depois (cor · contraste) |
|---|---|---|
| `/conversar-com-nativos-gratis` | `rgb(255,255,255)` · 1,10:1 | `rgb(74,85,101)` · 6,87:1 |
| `/praticar-ingles-ao-vivo` | `rgb(255,255,255)` · 1,10:1 | `rgb(74,85,101)` · 6,87:1 |
| `/` | `rgb(0,0,0)` · 19,08:1 | `rgb(74,85,101)` · 6,87:1 |

Valores iguais nos 4 links de cada página. Depois: sublinhado mantido; hover em `/privacy`
= `oklch(0.546 0.245 262.881)` (blue-600) sobre `oklch(0.97 0.014 254.604)` (blue-50);
foco por Tab = `outline auto 3px` visível; separador `·` = `oklch(0.707 0.022 261.325)`
(gray-400) antes e depois.

Prints: `antes-*.png`, `depois-*.png`, `depois-hover.png`, `depois-focus.png`.
Só o rodapé da landing, sem dado de usuário.
