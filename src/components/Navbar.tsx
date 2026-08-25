import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import safe4talkLogo from '../assets/safe4tal - image.svg'
import { useTranslation } from 'react-i18next'
import { trackEvent, Events } from '../lib/analytics'

export function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t('nav-features'), anchor: '#features' },
    { label: t('nav-how-it-works'), anchor: '#how-it-works' },
    { label: t('nav-roadmap'), anchor: '#roadmap' },
  ]

  const scrollTo = (anchor: string) => {
    setMenuOpen(false)
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0f1e]/90 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('#site-header')} className="flex items-center gap-2">
          <img src={safe4talkLogo} alt="Safe 4 Talk" className="w-8 h-8" />
          <span className="text-white font-bold text-lg tracking-tight">Safe 4 Talk</span>
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link.anchor}
              onClick={() => scrollTo(link.anchor)}
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA desktop — scroll to hero where store buttons live */}
        <button
          onClick={() => {
            trackEvent(Events.ClickNavCTA, { source: 'navbar-desktop' })
            scrollTo('#site-header')
          }}
          className="hidden md:inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          {t('nav-cta')}
        </button>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0f1e]/95 backdrop-blur-md border-t border-slate-800 px-6 pb-4"
          >
            <nav className="flex flex-col gap-4 pt-4">
              {links.map(link => (
                <button
                  key={link.anchor}
                  onClick={() => scrollTo(link.anchor)}
                  className="text-slate-300 hover:text-white text-sm font-medium text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  trackEvent(Events.ClickNavCTA, { source: 'navbar-mobile' })
                  scrollTo('#site-header')
                }}
                className="inline-flex justify-center bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                {t('nav-cta')}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
