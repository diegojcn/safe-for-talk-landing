import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import bgImage from "../assets/safe4talk_cover.png";


export function SiteHeader() {
  return (
    // <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
    <section id="site-header" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }} >

      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent -z-10" />
      <div className="w-full max-w-7xl bg-black/50 mx-auto px-6 py-16 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight sora-400"
        >

          Pratique idiomas em um Ambiente
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="block text-blue-200 sora-400"
          >
            Seguro e Acolhedor
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto sora-400"
        >
          Conecte-se com pessoas do mundo todo e pratique idiomas sem medo de errar.
          Um espaço acolhedor para todos os níveis de proficiência.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto sora-400"
        >
          Começe já! 
          É grátis!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center sora-400"
        >
          
          <a
            href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-8 bg-black text-white px-5 py-3 rounded-lg hover:bg-neutral-800 transition-all font-sora"
          >
           <img src="src/assets/google-play.svg" alt="Google Play" className="w-12 h-12" />
            
            <div className="text-left">
              <span className="text-xs leading-none block">Disponível no</span>
              <span className="text-sm font-medium leading-none">Google Play</span>
            </div>
          </a>

        </motion.div>
      </div>
    </section>
  )
} 