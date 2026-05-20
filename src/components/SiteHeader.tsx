import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import GooglePlayIcon from '../assets/google-play.svg'
import { useTranslation } from 'react-i18next'
import { Globe, ArrowLeft, Mic, MicOff, Video, Users, LogOut } from 'lucide-react'
import { trackEvent, Events } from '@/lib/analytics'

const SOCIAL_AVATARS = [
  'https://i.pravatar.cc/40?img=32',
  'https://i.pravatar.cc/40?img=44',
  'https://i.pravatar.cc/40?img=47',
  'https://i.pravatar.cc/40?img=60',
  'https://i.pravatar.cc/40?img=68',
]

// Participants inside the room — matching Figma's "Sala de Vídeo · 5 pessoas"
const PARTICIPANTS = [
  { id: 0, name: 'Diego N.',  avatar: 'https://i.pravatar.cc/80?img=12', muted: false, color: 'from-[#0d2b45] to-[#0a1f35]' },
  { id: 1, name: 'Teri J.',   avatar: 'https://i.pravatar.cc/80?img=47', muted: false, color: 'from-[#1a2744] to-[#0f1e38]' },
  { id: 2, name: 'Damon W.', avatar: 'https://i.pravatar.cc/80?img=52', muted: true,  color: 'from-[#0d2b45] to-[#0a1f35]' },
  { id: 3, name: 'Nuage L.', avatar: 'https://i.pravatar.cc/80?img=25', muted: false, color: 'from-[#1b3a2a] to-[#0f2820]' },
  { id: 4, name: 'Sara K.',  avatar: 'https://i.pravatar.cc/80?img=38', muted: false, color: 'from-[#0d2b45] to-[#0a1f35]' },
  { id: 5, name: 'Aguard…',  avatar: '',                                  muted: true,  color: 'from-[#111827] to-[#0a0f1e]', waiting: true },
]

// speaking indices that cycle to simulate live conversation
const SPEAKING_SEQUENCE = [0, 3, 1, 4, 0, 1, 3]

function ParticipantTile({ p, speaking }: { p: typeof PARTICIPANTS[0]; speaking: boolean }) {
  return (
    <div className={`relative rounded-2xl bg-gradient-to-b ${p.color} overflow-hidden flex flex-col items-center justify-center gap-1.5 p-3 border border-white/5`}>
      {/* Speaking ring */}
      <div className="relative flex items-center justify-center">
        {speaking && (
          <>
            <span className="absolute w-14 h-14 rounded-full border-2 border-green-400 animate-ping opacity-40" />
            <span className="absolute w-14 h-14 rounded-full border-2 border-green-400 opacity-70" />
          </>
        )}
        {p.waiting ? (
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
            <span className="text-white/30 text-lg">+</span>
          </div>
        ) : (
          <img
            src={p.avatar}
            alt={p.name}
            className={`w-12 h-12 rounded-full object-cover border-2 transition-all duration-500 ${
              speaking ? 'border-green-400 shadow-lg shadow-green-400/40' : 'border-white/10'
            }`}
          />
        )}
        {/* Mic indicator */}
        {!p.waiting && (
          <span className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${
            p.muted ? 'bg-red-500' : 'bg-indigo-500'
          }`}>
            {p.muted ? <MicOff size={8} /> : <Mic size={8} />}
          </span>
        )}
      </div>
      <span className={`text-[9px] font-medium truncate max-w-full ${p.waiting ? 'text-white/20' : 'text-white/80'}`}>
        {p.name}
      </span>
    </div>
  )
}

function AppMockup() {
  const [speakingIdx, setSpeakingIdx] = useState(0)
  const seqPosRef = useRef(0)
  const [timer, setTimer] = useState(874) // 14:34

  useEffect(() => {
    const interval = setInterval(() => {
      seqPosRef.current = (seqPosRef.current + 1) % SPEAKING_SEQUENCE.length
      setSpeakingIdx(SPEAKING_SEQUENCE[seqPosRef.current])
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setTimer(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const mins = String(Math.floor(timer / 60)).padStart(2, '0')
  const secs = String(timer % 60).padStart(2, '0')

  return (
    /* Phone shell */
    <div className="relative w-[270px] h-[560px] bg-[#080e1c] rounded-[38px] border border-white/10 shadow-2xl shadow-indigo-500/20 overflow-hidden flex flex-col">

      {/* Status bar */}
      <div className="flex-none flex justify-between items-center px-6 pt-3 pb-1">
        <span className="text-white/50 text-[10px] font-medium">9:41</span>
        <div className="w-20 h-5 bg-black rounded-full" />
        <div className="flex items-center gap-1">
          <svg width="15" height="10" viewBox="0 0 15 10" fill="none" className="opacity-50">
            <rect x="0" y="4" width="3" height="6" rx="1" fill="white"/>
            <rect x="4" y="2" width="3" height="8" rx="1" fill="white"/>
            <rect x="8" y="0" width="3" height="10" rx="1" fill="white"/>
          </svg>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="opacity-50">
            <path d="M7 2 C4 2 1.5 3.5 0 5.7 L7 10 L14 5.7 C12.5 3.5 10 2 7 2Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Room header */}
      <div className="flex-none flex items-center gap-2 px-4 py-2 border-b border-white/5">
        <button className="text-white/50 hover:text-white">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1 text-center">
          <p className="text-white text-xs font-bold leading-none">Only English</p>
          <p className="text-white/40 text-[9px] mt-0.5">Any Level · 5/10</p>
        </div>
        {/* Timer */}
        <span className="bg-indigo-600/80 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
          {mins}:{secs}
        </span>
      </div>

      {/* Participants grid */}
      <div className="flex-1 grid grid-cols-2 gap-1.5 p-2 overflow-hidden">
        {PARTICIPANTS.map((p) => (
          <ParticipantTile
            key={p.id}
            p={p}
            speaking={speakingIdx === p.id && !p.waiting}
          />
        ))}
      </div>

      {/* Speaking label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={speakingIdx}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
          className="flex-none text-center pb-1"
        >
          <span className="text-green-400 text-[9px] font-medium">
            🎙 {PARTICIPANTS[speakingIdx]?.name} está falando…
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Bottom bar */}
      <div className="flex-none flex justify-around items-center px-4 py-3 border-t border-white/5 bg-[#0a1020]">
        {[
          { icon: <Mic size={16} />, label: 'Mic', active: true },
          { icon: <Video size={16} />, label: 'Câmera', active: true },
          { icon: <Users size={16} />, label: 'Pessoas', active: false },
          { icon: <LogOut size={16} />, label: 'Sair', danger: true },
        ].map((btn) => (
          <button
            key={btn.label}
            className={`flex flex-col items-center gap-0.5 ${
              btn.danger ? 'text-red-400' : btn.active ? 'text-white' : 'text-white/40'
            }`}
          >
            {btn.icon}
            <span className="text-[8px]">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function SiteHeader() {
  const { t } = useTranslation()

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

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col gap-6">

            {/* Social proof pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 self-start bg-white/5 border border-white/10 rounded-full px-4 py-2"
            >
              <div className="flex -space-x-2">
                {SOCIAL_AVATARS.map((src, i) => (
                  <img key={i} src={src} alt="user"
                    className="w-7 h-7 rounded-full border-2 border-[#0a0f1e] object-cover" />
                ))}
              </div>
              <span className="text-slate-300 text-sm font-medium">+2.400 pessoas conversando agora</span>
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
              className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight"
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

          {/* ── RIGHT: Animated phone mockup ── */}
          <div className="hidden lg:flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <AppMockup />

              {/* Floating badge: language */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -right-14 top-20 bg-[#0a0f1e] border border-white/10 rounded-2xl px-3 py-2 shadow-xl"
              >
                <p className="text-white/50 text-[9px] uppercase tracking-wide">Sala ativa</p>
                <p className="text-white text-xs font-bold">🇺🇸 Only English</p>
                <p className="text-green-400 text-[9px]">● 5 participantes</p>
              </motion.div>

              {/* Floating badge: speaking */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -left-14 bottom-28 bg-[#0a0f1e] border border-white/10 rounded-2xl px-3 py-2 shadow-xl"
              >
                <p className="text-white/50 text-[9px] uppercase tracking-wide">Ao vivo</p>
                <p className="text-white text-xs font-bold">🎙 Falando agora</p>
                <p className="text-indigo-400 text-[9px]">Áudio em tempo real</p>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
    </section>
  )
}
