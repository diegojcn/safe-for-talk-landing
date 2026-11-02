/**
 * Invite link: safe4talk.com/baixar?c=<channel>.
 *
 * One address the social channels can hand out to anyone, whatever their phone.
 * Android goes to the Play Store with the channel in the install referrer (the
 * format the app reads on first launch), iPhone/iPad to the App Store with the
 * App Store Connect campaign token, and everything else to the home page, which
 * already shows both store buttons and the web version.
 *
 * This is a server redirect on purpose: the link is opened inside the WhatsApp and
 * Instagram in-app browsers, and a client-side redirect would depend on them
 * downloading and running the whole SPA bundle first.
 *
 * Destinations are constants. The channel only ever enters as a query value built
 * with URLSearchParams, and nothing else from the request is forwarded — that is
 * what keeps this from becoming an open redirector.
 */

const PLAY_STORE = 'https://play.google.com/store/apps/details'
const APP_STORE = 'https://apps.apple.com/us/app/safe-4-talk/id6778502736'

// Same rule the backend applies to POST /acquisition: a channel this link accepts
// must be one the database accepts too.
const CANAL_VALIDO = /^[a-z0-9_]{1,32}$/
const CANAL_PADRAO = 'site'

// Apple only attributes with both pt and ct; pt is the account's provider token.
const PROVIDER_TOKEN_VALIDO = /^[0-9]{1,20}$/

const canalDoConvite = (c) => {
  const canal = String(c ?? '').trim().toLowerCase()
  return CANAL_VALIDO.test(canal) ? canal : CANAL_PADRAO
}

/**
 * Where an invite click should land, for a given User-Agent and raw `c` value.
 * Exported so the routing can be exercised without a deployment.
 */
export function destinoDoConvite(userAgent, c, env) {
  const ua = String(userAgent ?? '')
  const canal = canalDoConvite(c)

  if (/android/i.test(ua)) {
    const params = new URLSearchParams({
      id: 'br.com.safefortalk.android',
      utm_source: canal,
      utm_campaign: 'social',
      referrer: new URLSearchParams({ utm_source: canal }).toString(),
    })
    return `${PLAY_STORE}?${params}`
  }

  if (/iphone|ipad|ipod/i.test(ua)) {
    const params = new URLSearchParams({ l: 'pt-BR', ct: canal, mt: '8' })
    const providerToken = env?.APPSTORE_PROVIDER_TOKEN
    if (providerToken && PROVIDER_TOKEN_VALIDO.test(providerToken)) {
      params.set('pt', providerToken)
    }
    return `${APP_STORE}?${params}`
  }

  const params = new URLSearchParams({ utm_source: canal, utm_medium: 'convite', utm_campaign: 'social' })
  return `/?${params}`
}

export default function handler(request, response) {
  const url = new URL(request.url, `https://${request.headers.host}`)
  const destino = destinoDoConvite(request.headers['user-agent'], url.searchParams.get('c'), process.env)

  // The destination depends on the User-Agent: an edge-cached 302 would send the
  // next iPhone to the Play Store.
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('Location', destino)
  response.status(302).end()
}
