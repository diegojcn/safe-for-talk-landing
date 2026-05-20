import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import GooglePlayIcon from '../assets/google-play.svg'
import { useTranslation } from 'react-i18next'
import { Globe, ArrowLeft } from 'lucide-react'
import { trackEvent, Events } from '@/lib/analytics'

/* ─── Social proof avatars (pill above headline) ─── */
const SOCIAL_AVATARS = [
  'https://i.pravatar.cc/40?img=32',
  'https://i.pravatar.cc/40?img=44',
  'https://i.pravatar.cc/40?img=47',
  'https://i.pravatar.cc/40?img=60',
  'https://i.pravatar.cc/40?img=68',
]

/* ─── Room participants — matches Figma "Sala de Vídeo · 5 pessoas" ─── */
type FrameType = 'green-spike' | 'gold-crown' | 'silver-arc'

interface Participant {
  id: number
  name: string
  letter: string
  avatar?: string     // if set → camera open
  frame: FrameType
  muted: boolean
  tileBg: string
  waiting?: boolean
}

const PARTICIPANTS: Participant[] = [
  { id: 0, name: 'Diego N.',  letter: 'D', avatar: 'https://i.pravatar.cc/80?img=12', frame: 'green-spike', muted: false, tileBg: '#050d1a' },
  { id: 1, name: 'Teri J.',   letter: 'T', frame: 'gold-crown',  muted: true,  tileBg: '#0d1e35' },
  { id: 2, name: 'Damon W.', letter: 'D', frame: 'silver-arc',  muted: true,  tileBg: '#0a1628' },
  { id: 3, name: 'Nuage L.', letter: 'N', frame: 'gold-crown',  muted: false, tileBg: '#0e2d1a' },
  { id: 4, name: 'Sara K.',  letter: 'S', avatar: 'https://i.pravatar.cc/80?img=38', frame: 'green-spike', muted: false, tileBg: '#0a1628' },
  { id: 5, name: '',          letter: '+', frame: 'silver-arc',  muted: true,  tileBg: '#050d1a', waiting: true },
]

const SPEAKING_SEQUENCE = [0, 3, 4, 0, 1, 3, 0, 4]

/* ─── Ornamental frames ─── */
function GreenSpikeRing({ speaking }: { speaking: boolean }) {
  return (
    <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <filter id="glow-green">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Main ring */}
      <circle cx="28" cy="28" r="22" stroke={speaking ? '#22c55e' : '#16a34a'} strokeWidth="2" fill="none"
        filter={speaking ? 'url(#glow-green)' : undefined} />
      {/* Spikes — 12 at 30° intervals */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180
        const ao = a
        const ai1 = a + 0.22
        const ai2 = a - 0.22
        const outer = 27, inner = 22
        const x1 = 28 + Math.cos(ao) * outer, y1 = 28 + Math.sin(ao) * outer
        const x2 = 28 + Math.cos(ai1) * inner, y2 = 28 + Math.sin(ai1) * inner
        const x3 = 28 + Math.cos(ai2) * inner, y3 = 28 + Math.sin(ai2) * inner
        return (
          <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
            fill={speaking ? '#22c55e' : '#16a34a'} opacity={speaking ? 0.9 : 0.6}
            filter={speaking ? 'url(#glow-green)' : undefined} />
        )
      })}
      {/* Small dots at cardinal points */}
      {[0, 90, 180, 270].map(deg => {
        const r = (deg * Math.PI) / 180
        return <circle key={deg} cx={28 + Math.cos(r) * 26.5} cy={28 + Math.sin(r) * 26.5} r="1.5"
          fill={speaking ? '#4ade80' : '#22c55e'} />
      })}
    </svg>
  )
}

function GoldCrownFrame({ speaking }: { speaking: boolean }) {
  return (
    <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <filter id="glow-gold">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Main ring */}
      <circle cx="28" cy="28" r="20" stroke={speaking ? '#fbbf24' : '#d97706'} strokeWidth="2.5" fill="none"
        filter={speaking ? 'url(#glow-gold)' : undefined} />
      {/* Crown top — left star */}
      <polygon points="16,8 17.5,4 19,8 16.5,6" fill="#f59e0b" />
      {/* Crown top — right star */}
      <polygon points="37,8 38.5,4 40,8 37.5,6" fill="#f59e0b" />
      {/* Crown top — center */}
      <polygon points="27,5 28.5,1 30,5 28,3.5" fill="#fbbf24" />
      {/* Small gems on ring at bottom */}
      <circle cx="28" cy="49" r="2" fill="#f59e0b" opacity="0.7" />
      <circle cx="12" cy="40" r="1.5" fill="#f59e0b" opacity="0.5" />
      <circle cx="44" cy="40" r="1.5" fill="#f59e0b" opacity="0.5" />
    </svg>
  )
}

function SilverArcFrame() {
  return (
    <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Open arc — only top half visible */}
      <path d="M 8 28 A 20 20 0 0 1 48 28" stroke="#64748b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="8" cy="28" r="2" fill="#475569" />
      <circle cx="48" cy="28" r="2" fill="#475569" />
    </svg>
  )
}

function ParticipantTile({ p, speaking }: { p: Participant; speaking: boolean }) {
  if (p.waiting) {
    return (
      <div
        className="relative rounded-xl flex flex-col items-center justify-center"
        style={{ backgroundColor: p.tileBg, border: '1px dashed rgba(255,255,255,0.15)' }}
      >
        <span className="text-white/20 text-lg">+</span>
        <span className="text-white/20 text-[8px] mt-0.5 absolute bottom-1 left-2">Aguardando</span>
      </div>
    )
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundColor: p.tileBg,
        border: speaking ? '2px solid #3b82f6' : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Animated background glow when speaking */}
      {speaking && (
        <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
      )}

      {/* Frame + avatar area */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Ornamental frame SVG */}
        {p.frame === 'green-spike' && <GreenSpikeRing speaking={speaking} />}
        {p.frame === 'gold-crown' && <GoldCrownFrame speaking={speaking} />}
        {p.frame === 'silver-arc' && <SilverArcFrame />}

        {/* Avatar: photo (camera open) or letter (camera off) */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden z-10 flex items-center justify-center"
          style={{ backgroundColor: p.avatar ? 'transparent' : (p.tileBg) }}>
          {p.avatar ? (
            <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-bold text-sm" style={{ color: p.frame === 'gold-crown' ? '#fbbf24' : '#94a3b8' }}>
              {p.letter}
            </span>
          )}
        </div>
      </div>

      {/* Name bottom-left */}
      <span className="absolute bottom-1 left-1.5 text-white/80 text-[8px] font-medium truncate max-w-[50%]">
        {p.name}
      </span>

      {/* Mic icon bottom-right */}
      <span className={`absolute bottom-1 right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center z-10 ${p.muted ? 'bg-red-500' : 'bg-blue-500'}`}>
        {p.muted ? (
          <svg width="7" height="7" viewBox="0 0 24 24" fill="white">
            <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M3 3l18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
        ) : (
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" fill="white"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
        )}
      </span>
    </div>
  )
}

/* ─── Bottom action bar ─── */
function BottomBar() {
  return (
    <div className="flex-none flex justify-around items-center px-3 py-2 border-t border-white/5" style={{ backgroundColor: '#060c18' }}>
      {/* Mic — muted */}
      <button className="flex flex-col items-center gap-0.5">
        <span className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <line x1="2" y1="2" x2="22" y2="22" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M12 1a3 3 0 00-3 3v5m6 0V4a3 3 0 00-3-3zM19 10a7 7 0 01-1.5 4.4M5 10a7 7 0 007 7" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
        </span>
        <span className="text-red-400 text-[7px]">Microfone</span>
      </button>

      {/* Camera — muted */}
      <button className="flex flex-col items-center gap-0.5">
        <span className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <line x1="2" y1="2" x2="22" y2="22" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M15 10l4.553-2.548A1 1 0 0121 8.382v7.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
        </span>
        <span className="text-red-400 text-[7px]">Câmera</span>
      </button>

      {/* People — with badge */}
      <button className="flex flex-col items-center gap-0.5 relative">
        <span className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 text-[7px] text-white font-bold flex items-center justify-center">5</span>
        <span className="text-white/50 text-[7px]">Pessoas</span>
      </button>

      {/* Leave */}
      <button className="flex flex-col items-center gap-0.5">
        <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="text-red-400 text-[7px]">Sair</span>
      </button>
    </div>
  )
}

/* ─── Main App Mockup ─── */
function AppMockup() {
  const [speakingIdx, setSpeakingIdx] = useState(0)
  const seqPosRef = useRef(0)
  const [timer, setTimer] = useState(872)

  useEffect(() => {
    const iv = setInterval(() => {
      seqPosRef.current = (seqPosRef.current + 1) % SPEAKING_SEQUENCE.length
      setSpeakingIdx(SPEAKING_SEQUENCE[seqPosRef.current])
    }, 1800)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setTimer(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const mins = String(Math.floor(timer / 60)).padStart(2, '0')
  const secs = String(timer % 60).padStart(2, '0')

  return (
    <div className="relative w-[270px] h-[580px] rounded-[38px] border border-white/10 shadow-2xl shadow-indigo-500/20 overflow-hidden flex flex-col"
      style={{ backgroundColor: '#080e1c' }}>

      {/* Status bar */}
      <div className="flex-none flex justify-between items-center px-5 pt-3 pb-1">
        <span className="text-white/40 text-[10px] font-medium">9:41</span>
        <div className="w-20 h-5 bg-black rounded-full" />
        <div className="flex items-center gap-0.5">
          <svg width="13" height="9" viewBox="0 0 15 10" fill="none" className="opacity-40">
            <rect x="0" y="4" width="3" height="6" rx="0.5" fill="white"/>
            <rect x="4" y="2" width="3" height="8" rx="0.5" fill="white"/>
            <rect x="8" y="0" width="3" height="10" rx="0.5" fill="white"/>
            <rect x="12" y="0" width="3" height="10" rx="0.5" fill="white" opacity="0.3"/>
          </svg>
        </div>
      </div>

      {/* Room header — matches Figma exactly */}
      <div className="flex-none flex items-center gap-2 px-3 py-2">
        <button className="text-white/40 p-1">
          <ArrowLeft size={14} />
        </button>
        <div className="flex-1 text-center">
          {/* Blue title like Figma */}
          <p className="text-[#3b82f6] text-xs font-bold leading-none">Only English</p>
          <p className="text-white/40 text-[8px] mt-0.5">Any Level · 5/10</p>
        </div>
        {/* Timer — blue pill */}
        <span className="bg-[#1d4ed8] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
          {mins}:{secs}
        </span>
        {/* Host avatar with speaking ring */}
        <div className="relative w-7 h-7">
          <span className="absolute inset-0 rounded-full border border-green-500 animate-ping opacity-40" />
          <span className="absolute inset-0 rounded-full border border-green-500 opacity-80" />
          <img src="https://i.pravatar.cc/40?img=12" alt="host"
            className="w-full h-full rounded-full object-cover border border-green-500" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5 mx-3" />

      {/* Participants grid 2×3 */}
      <div className="flex-1 grid grid-cols-2 gap-1 p-1.5 overflow-hidden">
        {PARTICIPANTS.map((p) => (
          <ParticipantTile key={p.id} p={p} speaking={speakingIdx === p.id && !p.waiting} />
        ))}
      </div>

      {/* Speaking label with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={speakingIdx}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-none text-center py-1"
        >
          <span className="text-green-400 text-[8px] font-medium">
            🎙 {PARTICIPANTS[speakingIdx]?.name || ''} está falando…
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Bottom action bar */}
      <BottomBar />
    </div>
  )
}

/* ─── Section ─── */
export function SiteHeader() {
  const { t } = useTranslation()

  return (
    <section id="site-header" className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0f1e]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT ── */}
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
                target="_blank" rel="noopener noreferrer"
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
                target="_blank" rel="noopener noreferrer"
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

              {/* Floating badge — right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -right-20 top-20 bg-[#0a0f1e] border border-white/10 rounded-2xl px-3 py-2 shadow-xl min-w-[120px]"
              >
                <p className="text-white/40 text-[9px] uppercase tracking-wide">Sala ativa</p>
                <p className="text-white text-xs font-bold">🇺🇸 Only English</p>
                <p className="text-green-400 text-[9px]">● 5 participantes</p>
              </motion.div>

              {/* Floating badge — left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -left-20 bottom-32 bg-[#0a0f1e] border border-white/10 rounded-2xl px-3 py-2 shadow-xl min-w-[120px]"
              >
                <p className="text-white/40 text-[9px] uppercase tracking-wide">Ao vivo</p>
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
