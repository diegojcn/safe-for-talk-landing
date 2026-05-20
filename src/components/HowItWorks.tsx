import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { UserPlus, DoorOpen, Mic } from 'lucide-react'

const steps = [
  {
    icon: <UserPlus size={28} />,
    titleKey: 'how-it-works-step-one-title',
    descKey: 'how-it-works-step-one-desc',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
    number: '01',
  },
  {
    icon: <DoorOpen size={28} />,
    titleKey: 'how-it-works-step-two-title',
    descKey: 'how-it-works-step-two-desc',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    number: '02',
  },
  {
    icon: <Mic size={28} />,
    titleKey: 'how-it-works-step-three-title',
    descKey: 'how-it-works-step-three-desc',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    number: '03',
  },
]

export function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section id="how-it-works" className="py-24 bg-[#0f172a] relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('how-it-works-title')}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            {t('how-it-works-subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-emerald-500/30" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center gap-4"
            >
              {/* Icon circle */}
              <div className={`relative w-20 h-20 rounded-2xl border ${step.bg} flex items-center justify-center ${step.color} z-10`}>
                {step.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0f172a] border border-white/10 text-[10px] font-bold text-slate-400 flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              <h3 className="text-white text-xl font-semibold">
                {t(step.titleKey)}
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-xs">
                {t(step.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <a
            href="https://safe-for-talk-web.diginfrastructures.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/20"
          >
            Comece agora — é grátis
          </a>
        </motion.div>
      </div>
    </section>
  )
}
