import { motion } from "framer-motion"
import GooglePlayIcon from '../assets/google-play.svg';
import safe4talkLogo from '../assets/safe4tal - image.svg';
import { useTranslation } from 'react-i18next';
import { Globe, Mic, Users, Zap } from 'lucide-react';
import { trackEvent, Events } from '@/lib/analytics';

const AVATARS = [
  'https://i.pravatar.cc/40?img=1',
  'https://i.pravatar.cc/40?img=5',
  'https://i.pravatar.cc/40?img=9',
  'https://i.pravatar.cc/40?img=12',
  'https://i.pravatar.cc/40?img=20',
]

const FLOATING_BADGES = [
  { icon: <Mic size={14} />, label: 'Áudio ao vivo', delay: 0, x: '-left-4', y: 'top-16' },
  { icon: <Users size={14} />, label: '+2.400 usuários', delay: 0.3, x: '-right-4', y: 'top-32' },
  { icon: <Zap size={14} />, label: 'Entre em segundos', delay: 0.6, x: '-left-2', y: 'bottom-24' },
]

export function SiteHeader() {
  const { t } = useTranslation();

  return (
    <section
      id="site-header"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0f1e]"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col gap-6">

            {/* Social proof pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 self-start bg-white/5 border border-white/10 rounded-full px-4 py-2"
            >
              <div className="flex -space-x-2">
                {AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="user"
                    className="w-7 h-7 rounded-full border-2 border-[#0a0f1e] object-cover"
                  />
                ))}
              </div>
              <span className="text-slate-300 text-sm font-medium">
                +2.400 pessoas conversando agora
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
            >
              {t('site-header-start-one')}
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {t('site-header-start-two')}
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg text-slate-400 max-w-lg leading-relaxed"
            >
              {t('site-header-start-three')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              {/* Primary: Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent(Events.ClickPlayStore, { source: 'hero' })}
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-5 py-3 rounded-xl hover:bg-slate-100 transition-all font-semibold shadow-lg shadow-white/10"
              >
                <img src={GooglePlayIcon} alt="Google Play" className="w-8 h-8" />
                <div className="text-left">
                  <span className="text-[10px] leading-none block text-gray-500 uppercase tracking-wide">{t('site-header-google-one')}</span>
                  <span className="text-sm font-bold leading-none">{t('site-header-google-two')}</span>
                </div>
              </a>

              {/* Secondary: Web */}
              <a
                href="https://safe-for-talk-web.diginfrastructures.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent(Events.ClickWebApp, { source: 'hero' })}
                className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white px-5 py-3 rounded-xl hover:bg-white/15 transition-all font-semibold"
              >
                <Globe className="w-6 h-6 text-indigo-400" />
                <div className="text-left">
                  <span className="text-[10px] leading-none block text-slate-400 uppercase tracking-wide">{t('site-header-web-one')}</span>
                  <span className="text-sm font-bold leading-none">{t('site-header-web-two')}</span>
                </div>
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-4 text-slate-500 text-sm"
            >
              <span>✓ Gratuito</span>
              <span>✓ Sem cartão</span>
              <span>✓ Android & Web</span>
            </motion.div>
          </div>

          {/* ── RIGHT: App mockup ── */}
          <div className="hidden lg:flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Phone frame */}
              <div className="relative w-72 h-[580px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[40px] border border-white/10 shadow-2xl shadow-indigo-500/20 overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-between items-center px-6 pt-4 pb-2">
                  <span className="text-white/60 text-xs">9:41</span>
                  <div className="w-24 h-6 bg-black rounded-full mx-auto" />
                  <div className="flex gap-1">
                    <div className="w-4 h-3 border border-white/40 rounded-sm" />
                  </div>
                </div>

                {/* App UI simulation */}
                <div className="px-4 py-2 flex flex-col gap-3">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-1">
                    <img src={safe4talkLogo} alt="Safe 4 Talk" className="w-7 h-7" />
                    <span className="text-white font-bold text-sm">Safe 4 Talk</span>
                    <span className="ml-auto flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                  </div>

                  {/* Rooms list */}
                  {[
                    { flag: '🇺🇸', name: 'English Practice', members: 8, live: true },
                    { flag: '🇧🇷', name: 'Conversação Livre', members: 14, live: true },
                    { flag: '🇪🇸', name: 'Español Avanzado', members: 5, live: true },
                    { flag: '🇩🇪', name: 'Deutsch B2', members: 3, live: false },
                  ].map((room, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/5"
                    >
                      <span className="text-2xl">{room.flag}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{room.name}</p>
                        <p className="text-slate-400 text-[10px]">{room.members} participantes</p>
                      </div>
                      {room.live && (
                        <span className="text-[9px] font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                          AO VIVO
                        </span>
                      )}
                    </motion.div>
                  ))}

                  {/* CTA button inside app */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-2 bg-indigo-600 rounded-2xl py-3 text-center"
                  >
                    <span className="text-white text-xs font-bold">+ Criar nova sala</span>
                  </motion.div>
                </div>
              </div>

              {/* Floating badges */}
              {FLOATING_BADGES.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + badge.delay }}
                  className={`absolute ${badge.x} ${badge.y} bg-[#0a0f1e] border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2 shadow-xl`}
                >
                  <span className="text-indigo-400">{badge.icon}</span>
                  <span className="text-white text-xs font-medium whitespace-nowrap">{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
    </section>
  )
}
