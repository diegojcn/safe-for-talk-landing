/**
 * The public teacher endpoints — anonymous by design, built for this page.
 *
 * `VITE_SAFE_4_TALK_API_URL` is a new variable on purpose: the existing one is spelled
 * `VITE_AFE_4_TALK_URL` in `.env.production` (the S went missing) and still points at a Heroku
 * host from before the CapRover move. Reusing it would make this page fail in production for a
 * reason that has nothing to do with this page.
 */
const API_BASE: string =
  import.meta.env.VITE_SAFE_4_TALK_API_URL ||
  'https://safe-for-talk-api.diginfrastructures.com/api/safe-for-talk/v1'

/** Where a visitor goes to actually book. The web app reads `?teacher=<handle>`. */
export const WEB_APP_BASE = 'https://safe-for-talk-web.diginfrastructures.com'

export interface TeacherLanguage {
  languageCode: string
  isNative: boolean
  levelMin: string | null
  levelMax: string | null
}

export interface TeacherOffering {
  kind: string
  durationMinutes: number
  priceCents: number
  currency: string | null
  active: boolean | null
}

export interface TeacherPublicProfile {
  handle: string
  displayName: string
  bio: string | null
  photoUrl: string | null
  introVideoUrl: string | null
  countryCode: string | null
  ratingAvg: number | null
  ratingCount: number
  lessonsDone: number
  languages: TeacherLanguage[]
  specialties: string[]
  offerings: TeacherOffering[]
}

export type TeacherLoad =
  | { state: 'loading' }
  | { state: 'found'; profile: TeacherPublicProfile }
  /** The handle does not exist, or the teacher has not published yet — same page either way. */
  | { state: 'not-found' }
  | { state: 'error' }

export async function fetchPublicTeacher(handle: string): Promise<TeacherLoad> {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  const url = `${API_BASE}/teachers/public/${encodeURIComponent(handle)}?tz=${encodeURIComponent(tz)}`
  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' } })
    if (response.status === 404) return { state: 'not-found' }
    if (!response.ok) return { state: 'error' }
    return { state: 'found', profile: (await response.json()) as TeacherPublicProfile }
  } catch {
    return { state: 'error' }
  }
}

/**
 * Where "Agendar uma aula" goes.
 *
 * `src` rides along so the app can tell a visitor who came from the teacher's own public page
 * apart from one who opened an app link some other way. Without it both arrive as the same
 * "link", and the question the panel promises the teacher — does posting this on Instagram
 * bring anyone? — stays unanswerable on the side that matters.
 */
export const BOOKING_SOURCE = 'public_page'

export function bookingUrlFor(handle: string): string {
  return `${WEB_APP_BASE}/?teacher=${encodeURIComponent(handle)}&src=${BOOKING_SOURCE}`
}

/** "R$ 50,00" — prices are shown whole, because a teacher's price is a decision, not a detail. */
export function formatPrice(priceCents: number, currency: string | null): string {
  const code = (currency || 'BRL').toUpperCase()
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: code }).format(priceCents / 100)
  } catch {
    return `${code} ${(priceCents / 100).toFixed(2)}`
  }
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'Inglês',
  es: 'Espanhol',
  it: 'Italiano',
  fr: 'Francês',
  de: 'Alemão',
  pt: 'Português',
}

/**
 * Teacher languages are stored as names now, but rows written before that migration still hold
 * ISO codes. Showing "en" to a visitor deciding whether to book is a worse failure than the
 * mapping being incomplete, so unknown values pass through untouched.
 */
export function languageLabel(code: string): string {
  const key = code.trim().toLowerCase()
  return LANGUAGE_NAMES[key] || code.trim()
}
