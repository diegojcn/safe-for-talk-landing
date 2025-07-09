import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTranslation } from 'react-i18next';


const roadmapItems = [
  {
    date: "Q3 2025",
    title: "roadmap-item-one-title",
    description: "roadmap-item-one-description",
    features: ["roadmap-item-one-feature-one", "roadmap-item-one-feature-two", "roadmap-item-one-feature-three"]
  },
  {
    date: "Q3 2025",
    title: "roadmap-item-two-title",
    description: "roadmap-item-two-description",
    features: ["roadmap-item-two-feature-one", "roadmap-item-two-feature-two", "roadmap-item-two-feature-three"]
  },
  {
    date: "Q1 2026",
    title: "roadmap-item-three-title",
    description: "roadmap-item-three-description",
    features: ["roadmap-item-three-feature-one", "roadmap-item-three-feature-two"]
  },
  {
    date: "Q2 2026",
    title: "roadmap-item-four-title",
    description: "roadmap-item-four-description",
    features: ["roadmap-item-four-feature-one", "roadmap-item-four-feature-two", "roadmap-item-four-feature-three"]
  },
  {
    date: "Q3 2026",
    title: "roadmap-item-five-title",
    description: "roadmap-item-five-description",
    features: ["roadmap-item-five-feature-one", "roadmap-item-five-feature-two", "roadmap-item-five-feature-three"]
  },
  {
    date: "roadmap-item-six-when",
    title: "roadmap-item-six-title",
    description: "roadmap-item-six-description",
    features: ["roadmap-item-six-feature-one", "roadmap-item-six-feature-two"]
  }
]


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const fadeIn = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
}

export function Roadmap() {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white">
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:60px_60px]" />
      <div className="w-full max-w-7xl mx-auto px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 sora-400">
            {t('roadmap-page-title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto sora-400">
            {t('roadmap-page-title-description')}
          </p>
        </motion.div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="relative pl-8 pb-12 last:pb-0 border-l-2 border-blue-600"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute left-[-9px] top-0 w-4 h-4 bg-blue-600 rounded-full" 
              />
              <div className="mb-4 sora-400">
                <span className="text-blue-600 sora-400 font-semibold">{t(item.date)}</span>
                <h3 className="text-2xl font-bold sora-400 text-gray-900 mt-2">{t(item.title)}</h3>
                <p className="text-gray-600 sora-400 mt-2">{t(item.description)}</p>
              </div>
              <ul className="list-disc list-inside text-gray-600 sora-400 space-y-1">
                {item.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{t(feature)}</li>
                ))}
              </ul>
            </motion.div>
          ))}
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
            onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
            variant="outline" 
            className="border-blue-600 text-blue-600 sora-400 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-blue-600"
          >
            {t('button-news')}
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 