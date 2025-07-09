import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FaInstagram } from "react-icons/fa"
import ThreadsIcon from '../assets/threads.svg';
import { useTranslation } from 'react-i18next';

export function CTA() {
  const { t } = useTranslation();
  return (
    <section id="cta" className="py-24 bg-gray-50 relative" >
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
      <div className="w-full max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-blue-600 mb-6 sora-400"
          >
            {t('cta-page-tile')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-blue-600 mb-8 sora-400"
          >
            {t('cta-page-description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              variant="outline"
              className="font-sora border-pink-600 text-pink-600 hover:bg-pink-100/10 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-pink-700"
            >
              <a
                href="https://www.instagram.com/safe4talk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FaInstagram className="text-2xl" />
                <span>{t('instagram-button')}</span>
              </a>
            </Button>


            <Button
              size="lg"
              variant="outline"
              className="font-sora border-black text-black hover:bg-black/5 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <a
                href="https://www.threads.net/@safe4talk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <img src={ThreadsIcon} alt="Threads" className="w-6 h-6" />
                <span>{t('threads-button')}</span>
              </a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >

            <Button
              size="lg"
              onClick={() => document.getElementById("site-header")?.scrollIntoView({ behavior: "smooth" })}
              variant="outline"
              className="border-blue-600 text-blue-600 sora-400 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-blue-600"
            >
              {t('cta-page-button')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section >
  )
} 