/**
 * Public teacher profile API — the anonymous endpoints the landing page uses.
 *
 * These are deliberately the `/teachers/public/...` routes (no JWT): this page
 * is opened by cold visitors coming from a teacher's Instagram/TikTok bio.
 * The in-app profile uses the authenticated `/by-handle/...` routes instead,
 * which also carry caller-specific data (favorites, stored timezone).
 */

const API_BASE: string =
  (import.meta.env.VITE_SAFE_4_TALK_URL as string | undefined) ??
  'https://safe-for-talk-api.diginfrastructures.com/api/safe-for-talk/v1'

export type TeacherLanguage = {
  languageCode: string
  isNative: boolean
  levelMin: string | null
  levelMax: string | null
}

export type TeacherOffering = {
  kind: string // TRIAL | STANDARD
  durationMinutes: number
  priceCents: number
  currency: string | null
  active: boolean | null
}

export type TeacherCredential = {
  kind: string
  title: string
  issuer: string | null
  year: number | null
}

export type PublicTeacher = {
  handle: string
  displayName: string
  bio: string | null
  photoUrl: string | null
  introVideoUrl: string | null
  countryCode: string | null
  timezone: string | null
  ratingAvg: number | null
  ratingCount: number
  lessonsDone: number
  languages: TeacherLanguage[]
  specialties: string[]
  credentials: TeacherCredential[]
  offerings: TeacherOffering[]
  /** today | tomorrow | mon..sun — server-computed in the visitor's timezone. */
  nextSlotKey: string | null
  nextSlotTime: string | null
}

export type TeacherSlot = { startAtUtc: string; startLocal: string; endLocal: string }
export type TeacherDaySlots = { date: string; labelKey: string; slots: TeacherSlot[] }
export type TeacherSlots = {
  handle: string
  durationMinutes: number
  studentTimezone: string
  days: TeacherDaySlots[]
}

/** Timezone detected in the browser; the API converts slots into it. */
export function visitorTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo'
  } catch {
    return 'America/Sao_Paulo'
  }
}

export class TeacherNotFoundError extends Error {}

export async function fetchPublicTeacher(handle: string): Promise<PublicTeacher> {
  const tz = encodeURIComponent(visitorTimezone())
  const response = await fetch(`${API_BASE}/teachers/public/${encodeURIComponent(handle)}?tz=${tz}`)
  if (response.status === 404) throw new TeacherNotFoundError(handle)
  if (!response.ok) throw new Error(`teacher_fetch_failed_${response.status}`)
  return (await response.json()) as PublicTeacher
}

export async function fetchPublicSlots(handle: string, durationMinutes = 60): Promise<TeacherSlots> {
  const tz = encodeURIComponent(visitorTimezone())
  const response = await fetch(
    `${API_BASE}/teachers/public/${encodeURIComponent(handle)}/slots?tz=${tz}&duration=${durationMinutes}`,
  )
  if (!response.ok) throw new Error(`slots_fetch_failed_${response.status}`)
  return (await response.json()) as TeacherSlots
}

/** Store links — the page's only conversion target until deep links ship. */
export const STORE_LINKS = {
  android: 'https://play.google.com/store/apps/details?id=br.com.safefortalk.android',
  ios: 'https://apps.apple.com/us/app/safe-4-talk/id6778502736?l=pt-BR',
}

/**
 * Where the CTAs point. Mobile visitors go to their store (the app is where
 * booking happens); desktop visitors get the Play Store as the default.
 */
export function appStoreUrlForVisitor(): string {
  if (typeof navigator === 'undefined') return STORE_LINKS.android
  const ua = navigator.userAgent || ''
  return /iPhone|iPad|iPod/i.test(ua) ? STORE_LINKS.ios : STORE_LINKS.android
}

export function formatPrice(cents: number, currency: string | null): string {
  const value = cents / 100
  const symbol = (currency ?? 'BRL') === 'BRL' ? 'R$' : (currency ?? '')
  return `${symbol} ${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`
}

const DAY_LABELS: Record<string, string> = {
  today: 'Hoje',
  tomorrow: 'Amanhã',
  mon: 'Segunda',
  tue: 'Terça',
  wed: 'Quarta',
  thu: 'Quinta',
  fri: 'Sexta',
  sat: 'Sábado',
  sun: 'Domingo',
}

export function dayLabel(labelKey: string, isoDate: string): string {
  return DAY_LABELS[labelKey] ?? isoDate
}

/** "today 18:00" -> "hoje às 18:00" for the hero availability pill. */
export function nextSlotLabel(key: string | null, time: string | null): string | null {
  if (!key || !time) return null
  const label = DAY_LABELS[key]
  if (!label) return null
  return `${label.toLowerCase()} às ${time}`
}
