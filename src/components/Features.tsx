import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const features = [
  {
    icon: "🎯",
    title: "Ambiente Seguro",
    description: "Pratique sem medo de julgamentos em um espaço acolhedor e inclusivo",
    color: "text-blue-600"
  },
  {
    icon: "🌍",
    title: "Todos os Níveis",
    description: "Do iniciante ao avançado, há espaço para todos desenvolverem suas habilidades",
    color: "text-indigo-600"
  },
  {
    icon: "💬",
    title: "Chat em Tempo Real",
    description: "Conversas fluidas e naturais com pessoas do mundo todo",
    color: "text-purple-600"
  },
  {
    icon: "🎓",
    title: "Aprendizado Natural",
    description: "Aprenda idiomas da forma mais natural possível: conversando",
    color: "text-blue-600"
  },
  {
    icon: "🤝",
    title: "Comunidade Acolhedora",
    description: "Faça parte de uma comunidade global de aprendizes de idiomas",
    color: "text-indigo-600"
  },
  {
    icon: "⚡",
    title: "Prática Instantânea",
    description: "Conecte-se instantaneamente com outros usuários para praticar",
    color: "text-purple-600"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function Features() {
  return (
    <section className="py-24 bg-gray-50 relative">
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
            Por que escolher o Safe 4 Talk?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto sora-400">
            Uma plataforma projetada para tornar o aprendizado de idiomas mais acessível,
            divertido e eficiente para todos.
          </p>
        </motion.div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sora-400"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="p-6 sora-400 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`text-4xl mb-4 ${feature.color}`}>{feature.icon}</div>
              <h3 className="text-xl sora-400 font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 sora-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12 sora-400"
        >
          <Button 
            size="lg" 
            onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
            variant="outline" 
            className="border-blue-600 text-blue-600 sora-400 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-blue-600"
          >
            Fique por Dentro das Novidades
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 