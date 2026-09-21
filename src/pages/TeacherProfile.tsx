import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  bookingUrlFor,
  fetchPublicTeacher,
  formatPrice,
  languageLabel,
  offeringLabel,
  specialtyLabel,
  type TeacherLoad,
} from '../lib/teacherApi'
import { Events, trackEvent } from '../lib/analytics'

/**
 * safe4talk.com/@handle — the link the teacher's panel tells them to post on Instagram.
 *
 * Until now that URL rendered a blank page: the landing had no route for it and no catch-all,
 * so React Router matched nothing. The panel has been handing out a dead link.
 *
 * Rendered in the browser rather than prerendered, because teachers are created long after the
 * build. That means link previews (WhatsApp, Instagram) will NOT show this content — crawlers
 * do not run the JavaScript that fetches it. Fixing that needs a renderer at request time,
 * which is a separate decision; the Helmet tags below are correct for the tab and for anything
 * that does execute JS.
 */
const TeacherProfile: React.FC = () => {
  // This is the catch-all, so the slug is any unknown path. Only the ones shaped like a
  // teacher link are a teacher; everything else lands on the same "not found" body, which is
  // still an improvement on the blank page it used to be.
  const { slug = '' } = useParams<{ slug: string }>()
  const isTeacherLink = slug.startsWith('@') && slug.length > 1
  const handle = isTeacherLink ? slug.slice(1) : ''
  const [load, setLoad] = useState<TeacherLoad>(
    isTeacherLink ? { state: 'loading' } : { state: 'not-found' },
  )

  useEffect(() => {
    if (!isTeacherLink) {
      setLoad({ state: 'not-found' })
      return
    }
    let alive = true
    setLoad({ state: 'loading' })
    fetchPublicTeacher(handle).then((result) => {
      if (!alive) return
      setLoad(result)
      // The first step of the booking funnel, and the only one the teacher controls: they
      // posted the link. Everything after the click is measured inside the app.
      if (result.state === 'found') {
        trackEvent(Events.ViewTeacherProfile, { handle })
      } else if (result.state === 'not-found') {
        // A visit that hit a profile the teacher never published. Counted apart, because it
        // is a teacher problem and not a demand problem, and the two would cancel out.
        trackEvent(Events.ViewTeacherProfileUnavailable, { handle })
      }
    })
    return () => {
      alive = false
    }
  }, [handle, isTeacherLink])

  const title =
    load.state === 'found'
      ? `${load.profile.displayName} · Safe 4 Talk`
      : isTeacherLink
        ? `@${handle} · Safe 4 Talk`
        : 'Safe 4 Talk'
  const description =
    load.state === 'found'
      ? load.profile.bio?.trim() ||
        `Agende uma aula ao vivo com ${load.profile.displayName} no Safe 4 Talk.`
      : 'Aulas de idiomas ao vivo, com professores de verdade.'

  return (
    <div className="w-full min-h-screen bg-[#f0f2f5] flex flex-col">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        {load.state === 'found' && load.profile.photoUrl && (
          <meta property="og:image" content={load.profile.photoUrl} />
        )}
      </Helmet>

      <div className="bg-white shadow">
        <div className="container mx-auto p-4">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            Safe 4 Talk
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-8 max-w-2xl flex-grow">
        {load.state === 'loading' && (
          <div className="bg-white rounded-lg shadow p-8 animate-pulse">
            <div className="h-24 w-24 rounded-full bg-gray-200 mb-4" />
            <div className="h-6 w-48 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>
        )}

        {(load.state === 'not-found' || load.state === 'error') && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-2xl font-bold mb-3">
              {load.state === 'error'
                ? 'Não foi possível carregar'
                : isTeacherLink
                  ? 'Perfil não disponível'
                  : 'Página não encontrada'}
            </h1>
            <p className="text-gray-700 mb-6">
              {load.state === 'error'
                ? 'Tente de novo em alguns instantes.'
                : isTeacherLink
                  ? 'Esse professor ainda não publicou o perfil, ou o link está errado.'
                  : 'Essa página não existe.'}
            </p>
            <a
              href="https://safe-for-talk-web.diginfrastructures.com/"
              className="inline-block bg-blue-600 text-white font-semibold rounded-full px-6 py-3 hover:bg-blue-700 transition-colors"
            >
              Ver outros professores
            </a>
          </div>
        )}

        {load.state === 'found' && (
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center gap-4 mb-6">
              {load.profile.photoUrl ? (
                <img
                  src={load.profile.photoUrl}
                  alt={load.profile.displayName}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700">
                  {load.profile.displayName.trim().charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold">{load.profile.displayName}</h1>
                <p className="text-gray-500">@{load.profile.handle}</p>
                {load.profile.ratingCount > 0 && load.profile.ratingAvg !== null && (
                  <p className="text-sm text-gray-600 mt-1">
                    ★ {load.profile.ratingAvg.toFixed(1)} · {load.profile.ratingCount} avaliações ·{' '}
                    {load.profile.lessonsDone} aulas
                  </p>
                )}
              </div>
            </div>

            {load.profile.bio?.trim() && (
              <p className="text-gray-700 whitespace-pre-line mb-6">{load.profile.bio}</p>
            )}

            {load.profile.languages.length > 0 && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">Ensina</h2>
                <div className="flex flex-wrap gap-2">
                  {load.profile.languages.map((language) => (
                    <span
                      key={language.languageCode}
                      className="bg-blue-50 text-blue-800 text-sm rounded-full px-3 py-1"
                    >
                      {languageLabel(language.languageCode)}
                      {language.isNative ? ' · nativo' : ''}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {load.profile.specialties.length > 0 && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">Foco</h2>
                <div className="flex flex-wrap gap-2">
                  {load.profile.specialties.map((specialty) => (
                    <span key={specialty} className="bg-gray-100 text-gray-700 text-sm rounded-full px-3 py-1">
                      {specialtyLabel(specialty)}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {load.profile.offerings.length > 0 && (
              <section className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">Aulas</h2>
                <ul className="divide-y">
                  {load.profile.offerings.map((offering) => (
                    <li key={`${offering.kind}-${offering.durationMinutes}`} className="flex justify-between py-2">
                      <span className="text-gray-700">
                        {offeringLabel(offering.kind, offering.durationMinutes)}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(offering.priceCents, offering.currency)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <a
              href={bookingUrlFor(load.profile.handle)}
              onClick={() => trackEvent(Events.ClickTeacherBook, { handle: load.profile.handle })}
              className="block w-full text-center bg-blue-600 text-white font-semibold rounded-full px-6 py-3 hover:bg-blue-700 transition-colors"
            >
              Agendar uma aula
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeacherProfile
