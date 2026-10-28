/**
 * Rotas que devem ser pré-renderizadas.
 *
 * Moram aqui, e não dentro do prerender.mjs, porque o check-blank-routes.mjs precisa
 * percorrer exatamente as mesmas rotas. Uma segunda lista envelheceria sozinha: a rota
 * nova entraria no pré-render e o check continuaria conferindo as antigas, sem avisar.
 */
export const prerenderRoutes = [
  '/',
  '/chat-anonimo-seguro',
  '/praticar-ingles-ao-vivo',
  '/app-para-praticar-ingles',
  '/conversar-com-nativos-gratis',
  '/aprender-ingles-sem-curso',
  '/salas-de-conversacao-ingles',
  '/praticar-ingles-com-medo',
  '/ingles-para-trabalho',
  '/alternativa-duolingo',
  '/como-melhorar-sotaque-ingles',
  '/praticar-espanhol-ao-vivo',
  '/aprender-alemao-falando',
  '/conversar-com-estranhos-online',
  '/chat-para-conhecer-pessoas',
  '/fazer-amigos-online',
  '/chat-com-estrangeiros',
  '/privacy',
  '/terms',
  '/support',
  '/suporte',
  '/unsubscribe',
]
