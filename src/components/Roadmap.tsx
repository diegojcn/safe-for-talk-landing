import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Circle, Clock, CheckCircle2, Loader2 } from 'lucide-react'

const PHASES = [
  {
    badgeKey: 'roadmap-phase-1-badge',
    periodKey: 'roadmap-phase-1-period',
    titleKey: 'roadmap-phase-1-title',
    descKey: 'roadmap-phase-1-description',
    features: [
      { key: 'roadmap-phase-1-f1', done: true },
      { key: 'roadmap-phase-1-f2', done: true },
      { key: 'roadmap-phase-1-f3', done: true },
      { key: 'roadmap-phase-1-f4', done: true },
      { key: 'roadmap-phase-1-f5', done: true },
      { key: 'roadmap-phase-1-f6', done: true },
    ],
    statusKey: 'roadmap-phase-1-status',
    statusColor: 'bg-green-500/20 text-green-600 border-green-500/30',
    dotColor: 'bg-green-500',
    accent: 'border-green-500/30 hover:border-green-500/60',
    icon: <CheckCircle2 size={14} />,
  },
  {
    badgeKey: 'roadmap-phase-2-badge',
    periodKey: 'roadmap-phase-2-period',
    titleKey: 'roadmap-phase-2-title',
    descKey: 'roadmap-phase-2-description',
    features: [
      { key: 'roadmap-phase-2-f1', done: true },
      { key: 'roadmap-phase-2-f2', done: false },
      { key: 'roadmap-phase-2-f3', done: false },
      { key: 'roadmap-phase-2-f4', done: false },
    ],
    statusKey: 'roadmap-phase-2-status',
    statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    dotColor: 'bg-blue-500',
    accent: 'border-blue-500/30 hover:border-blue-500/60',
    icon: <Circle size={14} />,
  },
  {
    badgeKey: 'roadmap-phase-3-badge',
    periodKey: 'roadmap-phase-3-period',
    titleKey: 'roadmap-phase-3-title',
    descKey: 'roadmap-phase-3-description',
    features: [
      { key: 'roadmap-phase-3-f1', done: true },
      { key: 'roadmap-phase-3-f4', done: true },
      { key: 'roadmap-phase-3-f2', inProgress: true },
      { key: 'roadmap-phase-3-f3', inProgress: true },
    ],
    statusKey: 'roadmap-phase-3-status',
    statusColor: 'bg-amber-500/20 text-amber-600 border-amber-500/30',
    dotColor: 'bg-amber-500',
    accent: 'border-amber-500/30 hover:border-amber-500/60',
    icon: <Loader2 size={14} />,
  },
  {
    badgeKey: 'roadmap-phase-4-badge',
    periodKey: 'roadmap-phase-4-period',
    titleKey: 'roadmap-phase-4-title',
    descKey: 'roadmap-phase-4-description',
    features: [
      { key: 'roadmap-phase-4-f1', done: false },
      { key: 'roadmap-phase-4-f2', done: false },
      { key: 'roadmap-phase-4-f3', done: false },
      { key: 'roadmap-phase-4-f4', done: false },
    ],
    statusKey: 'roadmap-phase-4-status',
    statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    dotColor: 'bg-purple-500',
    accent: 'border-purple-500/30 hover:border-purple-500/60',
    icon: <Clock size={14} />,
  },
  {
    badgeKey: 'roadmap-phase-5-badge',
    periodKey: 'roadmap-phase-5-period',
    titleKey: 'roadmap-phase-5-title',
    descKey: 'roadmap-phase-5-description',
    features: [
      { key: 'roadmap-phase-5-f1', done: false },
      { key: 'roadmap-phase-5-f2', done: true },
      { key: 'roadmap-phase-5-f3', done: false },
      { key: 'roadmap-phase-5-f4', done: false },
    ],
    statusKey: 'roadmap-phase-5-status',
    statusColor: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    dotColor: 'bg-slate-500',
    accent: 'border-slate-500/30 hover:border-slate-500/60',
    icon: <Clock size={14} />,
  },
]

export function Roadmap() {
  const { t } = useTranslation()

  return (
    <section id="roadmap" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('roadmap-page-title')}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t('roadmap-page-title-description')}
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-12 origin-left"
        >
          <div className="hidden md:flex justify-between items-center mb-2">
            {PHASES.map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div className={`w-4 h-4 rounded-full ${p.dotColor} ${i < 1 ? 'shadow-lg' : 'opacity-40'}`} />
                <span className="text-[10px] text-gray-400 font-medium">{t(p.badgeKey)}</span>
              </div>
            ))}
          </div>
          <div className="hidden md:block h-1 bg-gray-100 rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-[40%] bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
          </div>
        </motion.div>

        {/* Phase cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PHASES.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`relative rounded-2xl border bg-white p-6 flex flex-col gap-4 transition-colors duration-300 ${phase.accent} shadow-sm hover:shadow-md`}
            >
              {/* Phase number + status */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {t(phase.badgeKey)} · {t(phase.periodKey)}
                </span>
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${phase.statusColor}`}>
                  {phase.icon}
                  {t(phase.statusKey)}
                </span>
              </div>

              {/* Title + description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                  {t(phase.titleKey)}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{t(phase.descKey)}</p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2">
                {phase.features.map((f, fi) => (
                  <li
                    key={fi}
                    className={`flex items-start gap-2 text-sm ${f.done || f.inProgress ? 'text-gray-700' : 'text-gray-600'}`}
                  >
                    {f.done ? (
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" />
                    ) : f.inProgress ? (
                      <Loader2 size={16} className="mt-0.5 shrink-0 text-amber-600" />
                    ) : (
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${phase.dotColor}`} />
                    )}
                    <span className={f.done || f.inProgress ? 'font-medium' : ''}>{t(f.key)}</span>
                    {f.done && (
                      <span className="ml-auto text-[10px] font-semibold text-green-700 bg-green-100 border border-green-200 rounded-full px-2 py-0.5 shrink-0">
                        {t('roadmap-done-label')}
                      </span>
                    )}
                    {f.inProgress && (
                      <span className="ml-auto text-[10px] font-semibold text-amber-700 bg-amber-100 border border-amber-200 rounded-full px-2 py-0.5 shrink-0">
                        {t('roadmap-in-progress-label')}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 bg-gray-900 rounded-2xl px-8 py-6 text-center"
        >
          <p className="text-white/70 text-sm italic max-w-2xl mx-auto leading-relaxed">
            {t('roadmap-quote')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
