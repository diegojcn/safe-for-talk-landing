/**
 * Link-preview shim for safe4talk.com/@handle.
 *
 * The teacher page itself is client-rendered (handles are dynamic, so it can't
 * be part of the SSG pass), which means crawlers that don't run JS — WhatsApp,
 * Instagram, Facebook, Telegram — would only ever see the generic site tags.
 * Since the whole point of the page is being pasted into a social bio, this
 * function serves the same index.html with the teacher's title/description/
 * image already substituted. Real browsers get the identical document and
 * react-helmet-async takes over on hydration.
 *
 * Failure is non-fatal: on any error we fall back to the untouched index.html.
 */

const API_BASE =
  process.env.VITE_SAFE_4_TALK_URL ??
  'https://safe-for-talk-api.diginfrastructures.com/api/safe-for-talk/v1'

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * Rewrites the head of the built index.html for one teacher. Exported so the
 * substitution can be exercised without a deployment.
 */
export function injectTeacherMeta(html, teacher, canonicalUrl) {
  const title = `${teacher.displayName} — aulas de inglês 1:1 | Safe 4 Talk`
  const description = teacher.bio
    ? teacher.bio.slice(0, 150)
    : `Agende uma aula de inglês 1:1 com ${teacher.displayName} no Safe 4 Talk.`

  const tags = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    teacher.photoUrl
      ? `<meta property="og:image" content="${escapeHtml(teacher.photoUrl)}" />`
      : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    teacher.photoUrl
      ? `<meta name="twitter:image" content="${escapeHtml(teacher.photoUrl)}" />`
      : '',
  ]
    .filter(Boolean)
    .join('\n    ')

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:(?:title|description|url|image|type)"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:(?:card|title|description|image)"[^>]*>/gi, '')
    .replace('</head>', `    ${tags}\n  </head>`)
}

export default async function handler(request, response) {
  const url = new URL(request.url, `https://${request.headers.host}`)
  const handle = (url.searchParams.get('handle') ?? '').replace(/^@/, '')
  const origin = `https://${request.headers.host}`

  // index.html is a real static file, so this fetch is served directly and does
  // not loop back through the rewrite that routed us here.
  const shellResponse = await fetch(`${origin}/index.html`)
  const shell = await shellResponse.text()

  const send = (body, statusCode) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=600')
    response.status(statusCode).send(body)
  }

  if (!/^[a-z][a-z0-9_.]{2,29}$/.test(handle)) {
    send(shell, 404)
    return
  }

  try {
    const apiResponse = await fetch(`${API_BASE}/teachers/public/${encodeURIComponent(handle)}`)
    if (!apiResponse.ok) {
      send(shell, apiResponse.status === 404 ? 404 : 200)
      return
    }
    const teacher = await apiResponse.json()
    send(injectTeacherMeta(shell, teacher, `${origin}/@${handle}`), 200)
  } catch {
    send(shell, 200)
  }
}
