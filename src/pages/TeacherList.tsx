import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  WEB_APP_BASE,
  fetchPublicTeachers,
  formatPrice,
  languageLabel,
  type TeacherCard,
  type TeacherListLoad,
} from '../lib/teacherApi'
import { Events, trackEvent } from '../lib/analytics'

const TITLE = 'Professores de idiomas · Safe 4 Talk'
const DESCRIPTION =
  'Veja professores de inglês e outros idiomas e o preço de cada aula, antes de instalar o app.'

const PILL =
  'inline-block text-center bg-blue-600 text-white font-semibold rounded-full px-6 py-3 hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'

/**
 * safe4talk.com/professores — the link social sends to whoever asks for a teacher (OS #604).
 *
 * Someone comparing prices with other teachers does not install an app to find out what a
 * lesson costs, so this answers it before any install: who teaches, which language, how much.
 * Each card leads to the teacher's own page (/@handle), which already knows how to book.
 *
 * One column at every width and the "Como funciona" block always present: with one to three
 * teachers published, a grid would show holes, which is exactly what this page cannot look like.
 */
const TeacherList: React.FC = () => {
  const [load, setLoad] = useState<TeacherListLoad>({ state: 'loading' })
  // Bumped by "Tentar de novo" so the effect runs again.
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let alive = true
    setLoad({ state: 'loading' })
    fetchPublicTeachers().then((result) => {
      if (!alive) return
      setLoad(result)
      // Counted with zero too: an empty list that social keeps linking to is worth knowing.
      if (result.state === 'found') {
        trackEvent(Events.ViewTeacherList, { count: result.list.totalCount })
      }
    })
    return () => {
      alive = false
    }
  }, [attempt])

  return (
    <div className="w-full min-h-screen bg-[#f0f2f5] flex flex-col">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="bg-white shadow">
        <div className="container mx-auto p-4">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            Safe 4 Talk
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-8 max-w-2xl flex-grow">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Aulas de idiomas ao vivo, com professores de verdade</h1>
          <p className="text-gray-700">
            Veja quem dá aula, que idioma ensina e quanto custa, antes de instalar qualquer coisa. Cada
            professor define o próprio preço.
          </p>
        </header>

        {load.state === 'loading' && (
          <div className="flex flex-col gap-4" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse flex gap-4">
                <div className="h-16 w-16 shrink-0 rounded-full bg-gray-200" />
                <div className="flex-grow">
                  <div className="h-5 w-40 bg-gray-200 rounded mb-3" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {load.state === 'error' && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Não foi possível carregar os professores</h2>
            <p className="text-gray-700 mb-6">Verifique sua conexão e tente de novo.</p>
            <button type="button" onClick={() => setAttempt((n) => n + 1)} className={PILL}>
              Tentar de novo
            </button>
          </div>
        )}

        {load.state === 'found' && load.list.teachers.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Ainda não há professores com perfil público</h2>
            <p className="text-gray-700">
              Novos professores estão entrando. Enquanto isso, você já pode praticar conversação de graça
              no app.
            </p>
          </div>
        )}

        {load.state === 'found' && load.list.teachers.length > 0 && (
          <ul className="flex flex-col gap-4">
            {load.list.teachers.map((teacher) => (
              <li key={teacher.handle}>
                <TeacherCardLink teacher={teacher} />
              </li>
            ))}
          </ul>
        )}

        <HowItWorksBlock />
      </div>
    </div>
  )
}

const TeacherCardLink: React.FC<{ teacher: TeacherCard }> = ({ teacher }) => (
  <Link
    to={`/@${teacher.handle}`}
    onClick={() => trackEvent(Events.ClickTeacherListCard, { handle: teacher.handle })}
    className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
  >
    <div className="flex gap-4">
      {teacher.photoUrl ? (
        // The name is written right beside it; alt={name} would make a screen reader say it twice.
        <img src={teacher.photoUrl} alt="" className="h-16 w-16 shrink-0 rounded-full object-cover" />
      ) : (
        <div className="h-16 w-16 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-700">
          {teacher.displayName.trim().charAt(0).toUpperCase()}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-lg font-semibold text-gray-900">{teacher.displayName}</p>
        {teacher.ratingCount > 0 && teacher.ratingAvg !== null && (
          <p className="text-sm text-gray-700 mt-1">
            <span className="sr-only">Nota </span>
            <span aria-hidden="true">★ </span>
            {teacher.ratingAvg.toFixed(1)} · {teacher.ratingCount} avaliações · {teacher.lessonsDone} aulas
          </p>
        )}
        {(teacher.languages.length > 0 || teacher.isNative) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {teacher.languages.map((language) => (
              <span key={language} className="bg-blue-50 text-blue-800 text-sm rounded-full px-3 py-1">
                {languageLabel(language)}
              </span>
            ))}
            {teacher.isNative && (
              <span className="bg-gray-100 text-gray-700 text-sm rounded-full px-3 py-1">Nativo</span>
            )}
          </div>
        )}
      </div>
    </div>

    <div className="mt-4">
      <PriceLines teacher={teacher} />
    </div>

    <p className="mt-3 text-right text-blue-600 font-medium">Ver perfil e horários →</p>
  </Link>
)

/** Standard lesson first, trial under it; a trial alone takes the main line; neither says where to look. */
const PriceLines: React.FC<{ teacher: TeacherCard }> = ({ teacher }) => {
  const { referencePriceCents, referenceDurationMinutes, trialPriceCents, currency } = teacher
  const trial = trialPriceCents !== null ? `Aula experimental: ${formatPrice(trialPriceCents, currency)}` : null

  if (referencePriceCents !== null) {
    return (
      <>
        <p>
          <span className="font-semibold text-gray-900">{formatPrice(referencePriceCents, currency)}</span>
          {referenceDurationMinutes !== null && (
            <span className="text-gray-700"> · aula de {referenceDurationMinutes} min</span>
          )}
        </p>
        {trial && <p className="text-sm text-gray-700">{trial}</p>}
      </>
    )
  }
  if (trial) return <p className="font-semibold text-gray-900">{trial}</p>
  return <p className="text-gray-700">Preço na página do professor</p>
}

const HOW_IT_WORKS = [
  { title: 'O professor define o preço', text: 'Você vê o valor de cada aula antes de agendar.' },
  { title: 'Pagamento seguro pelo app', text: 'Você paga dentro do Safe 4 Talk, não direto para o professor.' },
  {
    title: 'Aula ao vivo, no app',
    text: 'Escolha o horário na agenda do professor e entre na aula pelo Safe 4 Talk.',
  },
]

/** Always shown, whatever the count: it fills the page with one teacher and holds the store links with ten. */
const HowItWorksBlock: React.FC = () => (
  <section className="bg-white rounded-lg shadow p-6 md:p-8 mt-6">
    <h2 className="text-xl font-bold mb-4">Como funciona a aula no Safe 4 Talk</h2>
    <ol className="flex flex-col gap-3 mb-6">
      {HOW_IT_WORKS.map((item) => (
        <li key={item.title} className="text-gray-700">
          <strong className="text-gray-900">{item.title}</strong> — {item.text}
        </li>
      ))}
    </ol>
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent(Events.ClickPlayStore, { source: 'teacher_list' })}
        className={`${PILL} w-full sm:w-auto`}
      >
        Baixar no Android
      </a>
      <a
        href="https://apps.apple.com/us/app/safe-4-talk/id6778502736?l=pt-BR"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent(Events.ClickAppStore, { source: 'teacher_list' })}
        className={`${PILL} w-full sm:w-auto`}
      >
        Baixar no iPhone
      </a>
    </div>
    <a
      href={WEB_APP_BASE}
      className="inline-block mt-4 text-blue-600 hover:text-blue-800 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      Ou comece pelo navegador
    </a>
  </section>
)

export default TeacherList
