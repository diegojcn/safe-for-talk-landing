/**
 * Tests for the invite redirect behind safe4talk.com/baixar (api/baixar.js).
 *
 * Lives outside api/ on purpose: every file under api/ becomes an endpoint on Vercel.
 * Run with `node --test scripts/convite.test.mjs` — node:test is built in, no dependency.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { destinoDoConvite } from '../api/baixar.js'

const ANDROID = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36'
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
const DESKTOP = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

const parse = (destino) => new URL(destino, 'https://safe4talk.com')

test('android goes to the Play Store with the channel in utm_source and referrer', () => {
  const destino = destinoDoConvite(ANDROID, 'whatsapp_dm_intl1', {})
  assert.ok(destino.startsWith('https://play.google.com/store/apps/details?id=br.com.safefortalk.android&'), destino)
  assert.ok(destino.includes('utm_source=whatsapp_dm_intl1'), destino)
  assert.ok(destino.includes('utm_campaign=social'), destino)
  assert.ok(destino.includes('referrer=utm_source%3Dwhatsapp_dm_intl1'), destino)
})

test('iphone goes to the App Store with ct and no pt when the token is not configured', () => {
  const destino = destinoDoConvite(IPHONE, 'whatsapp_dm_intl1', {})
  assert.ok(destino.startsWith('https://apps.apple.com/us/app/safe-4-talk/id6778502736'), destino)
  assert.ok(destino.includes('ct=whatsapp_dm_intl1'), destino)
  assert.ok(!destino.includes('pt='), destino)
})

test('iphone carries pt only when the provider token is numeric', () => {
  const comToken = destinoDoConvite(IPHONE, 'whatsapp_dm_intl1', { APPSTORE_PROVIDER_TOKEN: '123456' })
  assert.ok(comToken.includes('pt=123456'), comToken)
  assert.ok(comToken.includes('ct=whatsapp_dm_intl1'), comToken)

  const tokenInvalido = destinoDoConvite(IPHONE, 'whatsapp_dm_intl1', { APPSTORE_PROVIDER_TOKEN: '12ab' })
  assert.ok(!tokenInvalido.includes('pt='), tokenInvalido)
})

test('ipad and ipod are treated as iOS', () => {
  for (const ua of ['Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X)', 'Mozilla/5.0 (iPod touch; CPU iPhone OS 15_0 like Mac OS X)']) {
    assert.equal(parse(destinoDoConvite(ua, 'x', {})).host, 'apps.apple.com', ua)
  }
})

test('desktop lands on the home page keeping the channel', () => {
  assert.equal(
    destinoDoConvite(DESKTOP, 'ig_comenta', {}),
    '/?utm_source=ig_comenta&utm_medium=convite&utm_campaign=social',
  )
})

test('missing or empty user agent is treated as desktop', () => {
  assert.equal(parse(destinoDoConvite(undefined, 'ig_comenta', {})).host, 'safe4talk.com')
  assert.equal(parse(destinoDoConvite('', 'ig_comenta', {})).host, 'safe4talk.com')
})

test('hostile channels become "site" and never leave the two stores or the site', () => {
  const hostis = [
    'https://evil.com',
    '//evil.com',
    'a%26referrer%3Dx',
    'abc&utm_source=x',
    '<script>',
    'a'.repeat(33),
    '',
    undefined,
  ]
  const permitidos = { 'play.google.com': 'utm_source', 'apps.apple.com': 'ct', 'safe4talk.com': 'utm_source' }

  for (const c of hostis) {
    for (const ua of [ANDROID, IPHONE, DESKTOP]) {
      const url = parse(destinoDoConvite(ua, c, {}))
      assert.ok(url.host in permitidos, `${JSON.stringify(c)} / ${ua} -> ${url.href}`)
      assert.equal(url.searchParams.get(permitidos[url.host]), 'site', `${JSON.stringify(c)} -> ${url.href}`)
      assert.equal(url.searchParams.getAll(permitidos[url.host]).length, 1, url.href)
    }
  }
})

test('32 characters is still a valid channel', () => {
  const c = 'a'.repeat(32)
  assert.ok(destinoDoConvite(DESKTOP, c, {}).includes(`utm_source=${c}&`))
})

test('channel is lowercased and trimmed before validation', () => {
  assert.ok(destinoDoConvite(DESKTOP, 'WhatsApp_DM', {}).includes('utm_source=whatsapp_dm&'))
  assert.ok(destinoDoConvite(ANDROID, '  WhatsApp_DM ', {}).includes('referrer=utm_source%3Dwhatsapp_dm'))
})
