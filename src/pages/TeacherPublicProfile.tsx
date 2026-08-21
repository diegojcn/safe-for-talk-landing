import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
// Simple Icons: the official monochrome brand glyphs — consistent weight across
// Apple/Google/Instagram/Threads, unlike mixing Font Awesome with a custom svg.
import { SiApple, SiGoogleplay, SiInstagram, SiThreads } from 'react-icons/si'
import { trackEvent, Events } from '@/lib/analytics'
import { Link, useParams } from 'react-router-dom'
import {
  appStoreUrlForVisitor,
  fetchPublicAgenda,
  fetchPublicSlots,
  fetchPublicTeacher,
  formatPrice,
  nextSlotLabel,
  PublicTeacher,
  STORE_LINKS,
  webAppTeacherUrl,
  TeacherNotFoundError,
  TeacherAgenda,
  TeacherSlots,
} from '../lib/teacherApi'

/**
 * safe4talk.com/@handle — the teacher's PUBLIC page.
 *
 * A different job from the in-app profile: this one is opened by a cold
 * visitor arriving from the teacher's Instagram/TikTok bio, with no session and
 * no idea what Safe4Talk is. So it leads with social proof, explains the
 * product, and converts to the app — no favorites, no options menu, nothing
 * that needs a login.
 */

const SPECIALTY_LABELS: Record<string, string> = {
  conversation: 'Conversação',
  business: 'Business',
  ielts: 'IELTS',
  toefl: 'TOEFL',
  interviews: 'Entrevistas',
  beginners: 'Iniciantes',
}

const FLAGS: Record<string, string> = {
  BR: '🇧🇷', US: '🇺🇸', GB: '🇬🇧', ES: '🇪🇸', IT: '🇮🇹', PT: '🇵🇹',
  CA: '🇨🇦', AU: '🇦🇺', IE: '🇮🇪', ZA: '🇿🇦', MX: '🇲🇽', AR: '🇦🇷',
}

const TeacherPublicProfile: React.FC = () => {
  const { handle: rawHandle } = useParams<{ handle: string }>()
  // The route is the site's single-segment catch-all, so only @-prefixed paths
  // are teacher profiles; anything else is just an unknown URL.
  const segment = rawHandle ?? ''
  const handle = segment.startsWith('@') ? segment.slice(1) : ''

  const [teacher, setTeacher] = useState<PublicTeacher | null>(null)
  const [slots, setSlots] = useState<TeacherSlots | null>(null)
  const [agenda, setAgenda] = useState<TeacherAgenda | null>(null)
  const [weekOffset, setWeekOffset] = useState(0)
  const [status, setStatus] = useState<'loading' | 'ready' | 'notfound' | 'error'>('loading')
  // Media lives on a CDN we don't control; a dead URL must degrade, not show a
  // broken-image icon on the teacher's own landing page.
  const [photoBroken, setPhotoBroken] = useState(false)
  const [videoBroken, setVideoBroken] = useState(false)

  // The grid reloads on its own when the visitor pages weeks; the profile
  // fetch below must not restart for that.
  useEffect(() => {
    let cancelled = false
    if (!handle) return
    fetchPublicAgenda(handle, weekOffset)
      .then((a) => !cancelled && setAgenda(a))
      .catch(() => !cancelled && setAgenda(null))
    return () => {
      cancelled = true
    }
  }, [handle, weekOffset])

  useEffect(() => {
    let cancelled = false
    if (!handle) {
      setStatus('notfound')
      return
    }
    setStatus('loading')
    fetchPublicTeacher(handle)
      .then((data) => {
        if (cancelled) return
        setTeacher(data)
        setStatus('ready')
        // Slots are secondary: a failure here must not blank the page.
        fetchPublicSlots(handle)
          .then((s) => !cancelled && setSlots(s))
          .catch(() => !cancelled && setSlots(null))
      })
      .catch((error) => {
        if (cancelled) return
        setStatus(error instanceof TeacherNotFoundError ? 'notfound' : 'error')
      })
    return () => {
      cancelled = true
    }
  }, [handle])

  // Booking chooser: every "agendar" tap offers browser-first booking or the app —
  // the visitor may not have (or want) the app yet, and the web books just as well.
  const [bookingOpen, setBookingOpen] = useState(false)

  if (status === 'loading') return <ProfileSkeleton />
  if (status === 'notfound') return <NotFound handle={handle || segment.replace(/^@/, '')} />
  if (status === 'error' || !teacher) return <LoadError handle={handle} />

  const firstName = teacher.displayName.split(' ')[0]
  const flag = teacher.countryCode ? FLAGS[teacher.countryCode.toUpperCase()] ?? '' : ''
  const offerings = teacher.offerings ?? []
  const trial = offerings.find((o) => o.kind === 'TRIAL')
  const standard = offerings
    .filter((o) => o.kind === 'STANDARD')
    .sort((a, b) => a.priceCents - b.priceCents)
  const availability = nextSlotLabel(teacher.nextSlotKey, teacher.nextSlotTime)
  const storeUrl = appStoreUrlForVisitor()
  const webBookUrl = webAppTeacherUrl(handle)
  const pageTitle = `${teacher.displayName} — aulas de inglês 1:1 | Safe 4 Talk`
  const pageDescription = teacher.bio
    ? `${teacher.bio.slice(0, 150)}`
    : `Agende uma aula de inglês 1:1 com ${teacher.displayName} no Safe 4 Talk.`
  const priceFrom = standard[0] ?? trial

  return (
    <div className={PAGE_SHELL}>
      <Helmet>
        <title>{pageTitle}</title>
        {/* The rest of the site is dark; this page is light by design. Declaring
            the scheme keeps mobile browsers' "dark mode for websites" from
            inverting it into a low-contrast mess. */}
        <meta name="color-scheme" content="light" />
        <style type="text/css">{':root{color-scheme:only light}'}</style>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`https://safe4talk.com/@${teacher.handle}`} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://safe4talk.com/@${teacher.handle}`} />
        {teacher.photoUrl && <meta property="og:image" content={teacher.photoUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Top bar — brand + download, never a login */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-[#DEDFE4]">
        <div className="container mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-[#2D8CFF]">
            Safe 4 Talk
          </Link>
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#2D8CFF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1B7BEE] transition-colors"
          >
            Baixar o app
          </a>
        </div>
      </header>

      {/* Hero — above the fold: who, proof, video, CTA */}
      <section className="container mx-auto max-w-6xl px-5 pt-8 pb-10 md:grid md:grid-cols-2 md:gap-10 md:items-start">
        <div>
          <div className="flex items-start gap-4">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#F5F6FA] ring-2 ring-[#2D8CFF]/25">
              {teacher.photoUrl && !photoBroken ? (
                <img
                  src={teacher.photoUrl}
                  alt={teacher.displayName}
                  className="h-full w-full object-cover"
                  loading="eager"
                  onError={() => setPhotoBroken(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#B6B7BB]">
                  {firstName.charAt(0)}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold leading-tight md:text-4xl">
                {teacher.displayName} {flag}
              </h1>
              <span className="mt-1 inline-block rounded-md bg-[#2D8CFF]/10 px-2 py-0.5 text-xs font-semibold text-[#2D8CFF]">
                ✓ Professor verificado
              </span>
              <p className="mt-2 text-sm text-[#6A6C72]">
                Inglês
                {(teacher.languages ?? []).some((l) => l.isNative) && ' · Nativo'}
                {teacher.ratingAvg
                  ? ` · ⭐ ${teacher.ratingAvg} (${teacher.ratingCount} avaliações)`
                  : ' · Professor novo por aqui'}
                {teacher.lessonsDone > 0 && ` · ${teacher.lessonsDone} aulas dadas`}
              </p>
              {availability && (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#00AA4F]/10 px-3 py-1 text-xs font-bold text-[#00AA4F]">
                  <span className="h-2 w-2 rounded-full bg-[#00AA4F]" />
                  Livre {availability}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="mt-6 block w-full rounded-full bg-[#2D8CFF] py-4 text-center text-base font-semibold text-white hover:bg-[#1B7BEE] transition-colors"
          >
            Agendar aula com {firstName}
          </button>
          <a href="#horarios" className="mt-3 block text-center text-sm font-semibold text-[#2D8CFF]">
            Ver horários ↓
          </a>
        </div>

        {/* Intro video — the strongest conversion driver on marketplaces */}
        <div className="mt-8 md:mt-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#F5F6FA]">
            {teacher.introVideoUrl && !videoBroken ? (
              <>
                <video
                  src={teacher.introVideoUrl}
                  controls
                  playsInline
                  poster={photoBroken ? undefined : teacher.photoUrl ?? undefined}
                  className="h-full w-full object-cover"
                  onError={() => setVideoBroken(true)}
                />
                <span className="pointer-events-none absolute left-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
                  Apresentação
                </span>
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-[#B6B7BB]">
                Vídeo de apresentação em breve
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What is Safe4Talk — the visitor does not know the product */}
      <section className="bg-[#2D8CFF]/[0.06] py-8">
        <div className="container mx-auto max-w-6xl px-5">
          <h2 className="text-lg font-bold text-[#2D8CFF]">O que é o Safe 4 Talk?</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Bullet
              title="Aula 1:1 ao vivo"
              text="numa sala de vídeo dentro do app — só você e o professor."
            />
            <Bullet
              title="Aula sob medida"
              text="o professor vê seu nível e as palavras que você mais erra."
            />
            <Bullet
              title="Pague só quando a aula começar."
              text="Cancele grátis até 24h antes."
            />
          </div>
        </div>
      </section>

      {/* On mobile, prices + agenda come before the bio: a visitor who already
          wants to book shouldn't have to scroll past the "about" text. */}
      <section className="container mx-auto flex max-w-6xl flex-col px-5 py-10 md:grid md:grid-cols-[1.4fr_1fr] md:gap-10">
        <div className="order-2 mt-10 md:order-none md:mt-0">
          {teacher.bio && (
            <>
              <h2 className="text-xl font-bold">Sobre mim</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-[#6A6C72]">{teacher.bio}</p>
            </>
          )}

          {((teacher.specialties?.length ?? 0) > 0 || (teacher.credentials?.length ?? 0) > 0) && (
            <div className="mt-5 flex flex-wrap gap-2">
              {(teacher.specialties ?? []).map((s) => (
                <span
                  key={s}
                  className="rounded-lg bg-[#2D8CFF]/10 px-3 py-1.5 text-sm font-semibold text-[#2D8CFF]"
                >
                  {SPECIALTY_LABELS[s] ?? s}
                </span>
              ))}
              {(teacher.credentials ?? []).map((c, index) => (
                <span
                  key={`${c.title}-${index}`}
                  className="rounded-lg border border-[#DEDFE4] px-3 py-1.5 text-sm font-semibold text-[#161616]"
                >
                  {`🎓 ${c.title}${c.issuer ? ` — ${c.issuer}` : ''}`}
                </span>
              ))}
            </div>
          )}

          {/* Reviews — never fabricate proof when there is none */}
          <h2 className="mt-10 text-xl font-bold">Avaliações</h2>
          {teacher.ratingAvg ? (
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold">⭐ {teacher.ratingAvg}</span>
              <span className="text-sm text-[#6A6C72]">{teacher.ratingCount} avaliações</span>
            </div>
          ) : (
            <p className="mt-3 text-sm text-[#6A6C72]">
              Professor novo por aqui — seja um dos primeiros alunos.
            </p>
          )}
        </div>

        {/* Prices + agenda: sidebar on desktop, inline on mobile */}
        <aside className="order-1 md:order-none md:mt-0">
          {priceFrom && (
          <div className="rounded-2xl border border-[#DEDFE4] p-5">
            <h2 className="text-lg font-bold">Preços</h2>
            <ul className="mt-3 divide-y divide-[#DEDFE4]">
              {trial && (
                <PriceRow
                  onBook={() => setBookingOpen(true)}
                  label={`Experimental · ${trial.durationMinutes}min`}
                  badge="1ª AULA"
                  price={formatPrice(trial.priceCents, trial.currency)}
                />
              )}
              {(standard ?? []).map((o) => (
                <PriceRow
                  key={`${o.kind}-${o.durationMinutes}`}
                  onBook={() => setBookingOpen(true)}
                  label={`Aula · ${o.durationMinutes}min`}
                  price={formatPrice(o.priceCents, o.currency)}
                />
              ))}
            </ul>
            <p className="mt-3 text-xs text-[#6A6C72]">
              Você só é cobrado quando a aula começar. Cancele grátis até 24h antes.
            </p>
          </div>
          )}

          <div id="horarios" className="mt-6 rounded-2xl border border-[#DEDFE4] p-5">
            <h2 className="text-lg font-bold">Agenda da semana</h2>
            {slots?.studentTimezone && (
              <p className="text-xs text-[#6A6C72]">Horários no seu fuso ({slots.studentTimezone})</p>
            )}
            <AgendaGrid
              agenda={agenda}
              onBook={() => setBookingOpen(true)}
              onWeek={(delta) => setWeekOffset((current) => Math.max(0, current + delta))}
            />
          </div>
        </aside>
      </section>

      {/* Conversion footer */}
      <section className="border-t border-[#DEDFE4] bg-[#F5F6FA] py-10">
        <div className="container mx-auto max-w-6xl px-5 text-center">
          <h2 className="text-2xl font-bold">Aprenda inglês praticando todo dia</h2>
          <p className="mx-auto mt-2 max-w-xl text-[#6A6C72]">
            Baixe o Safe 4 Talk para agendar sua aula com {firstName} e praticar entre as aulas.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href={STORE_LINKS.ios}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(Events.ClickAppStore)}
              className="flex items-center gap-2 rounded-full bg-[#161616] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              <SiApple className="text-lg" />
              App Store
            </a>
            <a
              href={STORE_LINKS.android}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(Events.ClickPlayStore)}
              className="flex items-center gap-2 rounded-full bg-[#161616] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              <SiGoogleplay className="text-base" />
              Google Play
            </a>
          </div>

          {/* Social row: the teacher shares this page on social media, so the way back to
              the profiles that vouch for the product belongs right next to the stores. */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6A6C72]">
              Siga o Safe 4 Talk
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/safe4talk/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do Safe 4 Talk"
                onClick={() => trackEvent(Events.ClickInstagram)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DEDFE4] bg-white text-[#161616] transition-all hover:scale-110 hover:border-pink-400 hover:text-pink-600"
              >
                <SiInstagram className="text-lg" />
              </a>
              <a
                href="https://www.threads.net/@safe4talk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads do Safe 4 Talk"
                onClick={() => trackEvent(Events.ClickThreads)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DEDFE4] bg-white text-[#161616] transition-all hover:scale-110 hover:border-black"
              >
                <SiThreads className="text-lg" />
              </a>
            </div>
          </div>

          <a
            href={STORE_LINKS.android}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm text-[#6A6C72] underline"
          >
            Sou professor, quero criar meu perfil
          </a>
        </div>
      </section>

      {/* Sticky mobile CTA — the page is long, the CTA should never be far */}
      <div className="sticky bottom-0 z-20 border-t border-[#DEDFE4] bg-white/95 p-3 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setBookingOpen(true)}
          className="block w-full rounded-full bg-[#2D8CFF] py-3.5 text-center font-semibold text-white"
        >
          Agendar aula com {firstName}
        </button>
      </div>

      {bookingOpen && (
        <BookingChooser
          firstName={firstName}
          webBookUrl={webBookUrl}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </div>
  )
}

/**
 * "Como você quer agendar?" — browser first, app second.
 *
 * The visitor arriving from a shared link often has no app installed, and the
 * web app books end to end; sending everyone to the store put an install
 * between them and the lesson. The store stays one tap away for whoever
 * prefers the app experience.
 */
const BookingChooser: React.FC<{
  firstName: string
  webBookUrl: string
  onClose: () => void
}> = ({ firstName, webBookUrl, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 md:items-center md:p-6"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-label={`Agendar aula com ${firstName}`}
  >
    <div
      className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-xl md:rounded-3xl"
      onClick={(event) => event.stopPropagation()}
    >
      <h3 className="text-lg font-bold">Como você quer agendar com {firstName}?</h3>

      <a
        href={webBookUrl}
        onClick={() => trackEvent(Events.ClickWebApp, { source: 'teacher_page_booking' })}
        className="mt-5 block rounded-2xl bg-[#2D8CFF] px-5 py-4 text-white transition-colors hover:bg-[#1B7BEE]"
      >
        <span className="block text-base font-semibold">Agendar no navegador</span>
        <span className="mt-0.5 block text-sm text-white/85">
          Sem instalar nada — entra e agenda em 1 minuto
        </span>
      </a>

      <div className="mt-3 rounded-2xl border border-[#DEDFE4] px-5 py-4">
        <span className="block text-sm font-semibold">Prefere o app?</span>
        <span className="mt-0.5 block text-xs text-[#6A6C72]">
          Melhor para praticar todo dia entre as aulas
        </span>
        <div className="mt-3 flex gap-2">
          <a
            href={STORE_LINKS.ios}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(Events.ClickAppStore, { source: 'teacher_page_booking' })}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#161616] px-4 py-2.5 text-sm font-semibold text-white"
          >
            <SiApple className="text-base" /> App Store
          </a>
          <a
            href={STORE_LINKS.android}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(Events.ClickPlayStore, { source: 'teacher_page_booking' })}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#161616] px-4 py-2.5 text-sm font-semibold text-white"
          >
            <SiGoogleplay className="text-sm" /> Google Play
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-4 block w-full py-2 text-center text-sm font-semibold text-[#6A6C72]"
      >
        Agora não
      </button>
    </div>
  </div>
)

const Bullet: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <p className="text-sm leading-relaxed text-[#161616]">
    <strong className="font-bold">{title}</strong> {text}
  </p>
)

const PriceRow: React.FC<{ onBook: () => void; label: string; price: string; badge?: string }> = ({
  onBook,
  label,
  price,
  badge,
}) => (
  <li>
    <button
      type="button"
      onClick={onBook}
      className="flex w-full items-center gap-2 py-3 text-left hover:opacity-80"
    >
      <span className="text-sm">{label}</span>
      {badge && (
        <span className="rounded bg-[#00AA4F]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#00AA4F]">
          {badge}
        </span>
      )}
      <span className="ml-auto font-bold">{price}</span>
    </button>
  </li>
)

/**
 * The public week grid — two states, free and unavailable.
 *
 * A booked hour is not a third state: the API stops offering it, so it lands
 * here as "not offered" and looks exactly like an hour the teacher never
 * worked. That is deliberate. This page is public and indexable, and any
 * visual difference between "taken" and "off" would publish how many lessons
 * this person gives and when.
 */
const AgendaGrid: React.FC<{
  agenda: TeacherAgenda | null
  onBook: () => void
  onWeek: (delta: number) => void
}> = ({ agenda, onBook, onWeek }) => {
  if (!agenda) {
    return (
      <div className="mt-3 space-y-2">
        <div className="h-4 w-24 animate-pulse rounded bg-[#DEDFE4]" />
        <div className="h-28 w-full animate-pulse rounded-xl bg-[#F5F6FA]" />
      </div>
    )
  }
  if (agenda.hours.length === 0) {
    return (
      <p className="mt-3 text-sm text-[#6A6C72]">
        Sem horários nos próximos 30 dias. Baixe o app e peça para ser avisado.
      </p>
    )
  }
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onWeek(-1)}
          aria-label="Semana anterior"
          className="rounded-full px-2 py-1 text-lg text-[#6A6C72] hover:bg-[#F5F6FA]"
        >
          ‹
        </button>
        <span className="text-sm font-semibold">{agenda.weekLabel}</span>
        <button
          type="button"
          onClick={() => onWeek(1)}
          aria-label="Próxima semana"
          className="rounded-full px-2 py-1 text-lg text-[#6A6C72] hover:bg-[#F5F6FA]"
        >
          ›
        </button>
        <span className="ml-auto rounded-full bg-[#F5F6FA] px-2 py-1 text-[11px] font-semibold text-[#6A6C72]">
          {agenda.timezone}
        </span>
      </div>

      {/* The grid scrolls inside itself: seven columns must never push the page sideways. */}
      <div className="mt-2 overflow-x-auto rounded-xl bg-[#F5F6FA] p-3">
        <table className="w-full min-w-[420px] border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="w-8" />
              {agenda.days.map((day) => (
                <th key={day.date} className="pb-1 text-center">
                  <div
                    className={`text-[10px] font-semibold ${
                      day.isToday ? 'text-[#2D8CFF]' : 'text-[#6A6C72]'
                    }`}
                  >
                    {WEEKDAY_SHORT[day.weekdayKey] ?? day.weekdayKey}
                  </div>
                  <div className={`text-sm font-bold ${day.isToday ? 'text-[#2D8CFF]' : ''}`}>
                    {day.dayOfMonth}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agenda.hours.map((hour, rowIndex) => (
              <tr key={hour}>
                <td className="pr-1 text-right align-middle text-[10px] text-[#6A6C72]">{hour}</td>
                {agenda.days.map((day) => {
                  const cell = day.cells[rowIndex]
                  const free = cell?.state === 'FREE'
                  return (
                    <td key={`${day.date}-${hour}`} className="p-0">
                      {free ? (
                        <button
                          type="button"
                          onClick={onBook}
                          aria-label={`Livre ${hour} em ${day.dayOfMonth}`}
                          className="block h-9 w-full rounded-lg border-[1.5px] border-[#2D8CFF] bg-[#2D8CFF]/10 hover:bg-[#2D8CFF]/20 md:h-11"
                        />
                      ) : (
                        <div className="h-9 rounded-lg bg-[#DEDFE4]/45 md:h-11" aria-hidden="true" />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const WEEKDAY_SHORT: Record<string, string> = {
  sun: 'Dom',
  mon: 'Seg',
  tue: 'Ter',
  wed: 'Qua',
  thu: 'Qui',
  fri: 'Sex',
  sat: 'Sáb',
}

/** The site is dark-themed; the teacher page (and its states) is light. */
const PAGE_SHELL = 'min-h-screen w-full bg-white text-[#161616]'

const ProfileSkeleton: React.FC = () => (
  <div className={`${PAGE_SHELL} container mx-auto max-w-6xl animate-pulse px-5 py-10`}>
    <div className="flex items-center gap-4">
      <div className="h-20 w-20 rounded-full bg-[#DEDFE4]" />
      <div className="flex-1 space-y-2">
        <div className="h-7 w-48 rounded bg-[#DEDFE4]" />
        <div className="h-4 w-64 rounded bg-[#F5F6FA]" />
      </div>
    </div>
    <div className="mt-6 h-14 w-full rounded-full bg-[#DEDFE4]" />
    <div className="mt-6 aspect-video w-full rounded-2xl bg-[#F5F6FA]" />
  </div>
)

const NotFound: React.FC<{ handle: string }> = ({ handle }) => (
  <div className={`${PAGE_SHELL} px-5 py-20 text-center`}>
    <Helmet>
      <title>Professor não encontrado | Safe 4 Talk</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <h1 className="text-2xl font-bold">Professor não encontrado</h1>
    <p className="mx-auto mt-3 max-w-md text-[#6A6C72]">
      O perfil <strong>@{handle}</strong> não existe ou ainda não foi publicado.
    </p>
    <a
      href={STORE_LINKS.android}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-block rounded-full bg-[#2D8CFF] px-6 py-3 font-semibold text-white"
    >
      Explorar professores no app
    </a>
    <div className="mt-4">
      <Link to="/" className="text-sm text-[#2D8CFF] underline">
        Voltar para o Safe 4 Talk
      </Link>
    </div>
  </div>
)

const LoadError: React.FC<{ handle: string }> = ({ handle }) => (
  <div className={`${PAGE_SHELL} px-5 py-20 text-center`}>
    <Helmet>
      <title>Safe 4 Talk</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <h1 className="text-2xl font-bold">Não foi possível carregar este perfil</h1>
    <p className="mt-3 text-[#6A6C72]">Tente novamente em alguns instantes.</p>
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="mt-6 rounded-full bg-[#2D8CFF] px-6 py-3 font-semibold text-white"
    >
      Tentar de novo
    </button>
    <p className="mt-4 text-xs text-[#B6B7BB]">@{handle}</p>
  </div>
)

export default TeacherPublicProfile
