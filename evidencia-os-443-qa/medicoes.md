# Medições — OS #443

## 1. Os gates, rodados por mim (não há CI neste repo)

| Gate | Comando | Resultado |
|---|---|---|
| Critério 1 — falha SEM a correção | `git checkout a74d459 -- src/App.tsx && pnpm check:routes` | **exit 1**, `/p/pronunciation bytes=0`, `No routes matched location "/p/pronunciation"` |
| Critério 2 — passa COM a correção | `pnpm check:routes` | **exit 0**, 5 caminhos desconhecidos a **1.095 bytes**, 23 rotas reais `naoEncontrada=false` |
| Critério 3 — build | `pnpm build:ssg` | **exit 0** |
| Critério 3 — páginas geradas | `ls -d dist/*/ \| wc -l` | **23** no branch e **23** no base `a74d459` — nenhuma página perdida |
| Critério 3 — lint | `pnpm lint` | **exit 1** no branch **e exit 1 no base**, com a mesma linha: `src/pages/Unsubcribe.tsx 4:28 no-wrapper-object-types`. Pré-existente, não é deste PR |

## 2. Caminhos desconhecidos — 14 endereços, `pnpm dev`, viewport 390×844

Todos devolveram **exatamente a mesma tela**: 169 caracteres, `h1 = "Página não encontrada"`,
um único botão `["Ir para a página inicial"]` com `href="/"`, 0 skeleton, sem rolagem
horizontal, botão **212×48 px**. Nenhum deles mostra "Ver outros professores" nem
"Essa página não existe."

| endereço | MD5 do print |
|---|---|
| `/p/pronunciation?src=instagram` | `64edc7f218abca1299cf9c86bd0e0d1c` |
| `/p/pronunciation` | idem |
| `/p/qualquer-coisa` | idem |
| `/p/a/b/c` | idem |
| `/p/` | idem |
| `/xyz-nao-existe` | idem |
| `/p/pronunciation/` (barra final) | idem |
| `/P/Pronunciation` (maiúsculas) | idem |
| `/p/a/b/c/d/e/f/g/h/i/j` (11 segmentos) | idem |
| `/p/%20%20` (só espaços) | idem |
| `/p/<script>alert(1)</script>` | idem |
| `/@alguem/extra` | idem |
| `/privacy/extra` | idem |
| `/p/pronunciation#ancora` | idem |

Os seis primeiros são os da spec; os oito seguintes são desvios que inventei.

## 3. Os mesmos caminhos no build que a Vercel publica (`vite preview` sobre `dist`)

```
/p/pronunciation?src=instagram   http=200 chars=169 botoes=["Ir para a página inicial"]
/p/qualquer-coisa                http=200 chars=169 botoes=["Ir para a página inicial"]
/p/a/b/c                         http=200 chars=169 botoes=["Ir para a página inicial"]
/p/                              http=200 chars=169 botoes=["Ir para a página inicial"]
/xyz-nao-existe                  http=200 chars=169 botoes=["Ir para a página inicial"]
```

## 4. Rotas reais no build de produção — nenhuma virou "não encontrada"

```
/                        http=200 chars=3644 naoEncontrada=false
/privacy                 http=200 chars=1890 naoEncontrada=false
/terms                   http=200 chars=4176 naoEncontrada=false
/support                 http=200 chars=1451 naoEncontrada=false
/suporte                 http=200 chars=1451 naoEncontrada=false
/unsubscribe             http=200 chars=1721 naoEncontrada=false
/chat-anonimo-seguro     http=200 chars=2785 naoEncontrada=false
/praticar-ingles-ao-vivo http=200 chars=2939 naoEncontrada=false
/alternativa-duolingo    http=200 chars=1678 naoEncontrada=false
/fazer-amigos-online     http=200 chars=2260 naoEncontrada=false
/ingles-para-trabalho    http=200 chars=2298 naoEncontrada=false
/aprender-alemao-falando http=200 chars=1466 naoEncontrada=false
```

## 5. Base × branch, no build de produção, a 400 kbps + CPU 4×

```
### BASE a74d459
   t=    62ms chars=    0 h1=null
   t=   664ms chars= 3942 h1="Learn the language.Practice with real people."   <- a HOME
   t= 12613ms chars=    0 h1=null                                              <- TELA BRANCA
   ESTADO FINAL: chars=0

### BRANCH os/443
   t=    13ms chars=    0 h1=null
   t=   472ms chars= 3875 h1="Learn the language.Practice with real people."   <- a HOME
   t= 12496ms chars=  169 h1="Página não encontrada"                           <- CONSERTADO
   ESTADO FINAL: chars=169
```

Sem throttle, o mesmo par:

```
BASE   : home aos 276ms -> branco aos 329ms
BRANCH : home aos 328ms -> "Página não encontrada" aos 381ms
```

## 6. Quanto tempo a home fica na tela num endereço desconhecido (branch)

| condição | home aparece | vira "Página não encontrada" | home na tela por |
|---|---|---|---|
| build de produção, sem throttle | 291 ms | 344 ms | **53 ms** |
| build de produção, 1.500 kbps + CPU 4× | 337 ms | 3.636 ms | **3,3 s** |
| build de produção, 400 kbps + CPU 4× | 553 ms | 12.666 ms | **12,1 s** |
| `pnpm dev` (index.html vazio) | nunca | 321 ms | **0** |

O HTML cru servido em `/p/pronunciation?src=instagram` tem **80.910 bytes** e **4.079
caracteres de texto** — é a home inteira — e **não contém** "Página não encontrada".

## 7. Primeira pintura, foco e navegação (`pnpm dev`)

```
primeiraPintura = {ms:77, h1:"Página não encontrada", skeletons:0}; skeletons após 1,5s = 0
Tab1 -> A "Safe 4 Talk"              outline auto 1px offset 1px
Tab2 -> A "Ir para a página inicial" outline auto 1px offset 1px, :focus-visible = true
clique -> url=/ , marca em window sobreviveu (sem recarregar), home com 3.644 caracteres
voltar -> url=/p/pronunciation?src=instagram , h1="Página não encontrada", 169 caracteres
clique duplo -> url=/ , uma navegação só, 3.644 caracteres
```

## 8. `/@alguem` — o fluxo do professor

```
com a API respondendo 404 : "Safe 4 Talk Perfil não disponível Esse professor ainda não
                             publicou o perfil, ou o link está errado. Ver outros professores"  (123 chars)
sem backend no ar         : "Safe 4 Talk Não foi possível carregar Tente de novo em alguns
                             instantes. Ver outros professores"                                 (95 chars)
```
