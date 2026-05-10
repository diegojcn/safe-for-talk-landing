import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function AppParaPraticarIngles() {
  return (
    <>
      <Helmet>
        <title>Melhor App para Praticar Inglês Falando – Safe 4 Talk</title>
        <meta name="description" content="Encontre o melhor app para praticar inglês falando com pessoas reais. Salas ao vivo, nativos e estudantes do mundo todo. Grátis no Android e no navegador." />
        <link rel="canonical" href="https://safe4talk.com/app-para-praticar-ingles" />
        <meta property="og:title" content="Melhor App para Praticar Inglês Falando – Safe 4 Talk" />
        <meta property="og:description" content="Pratique inglês falando com pessoas reais em salas ao vivo. Grátis no Android e no navegador." />
        <meta property="og:url" content="https://safe4talk.com/app-para-praticar-ingles" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">App de Inglês</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              O Melhor App para Praticar Inglês Falando<br />
              <span className="text-indigo-400">com Pessoas Reais</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Chega de apps que só ensinam vocabulário. O Safe 4 Talk coloca você em salas de conversa ao vivo com falantes nativos e estudantes do mundo todo — no Android ou direto no navegador, de graça.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors">
                Baixar no Android →
              </a>
              <a href="https://safe-for-talk-web.diginfrastructures.com" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold text-lg transition-colors">
                Acessar pelo Navegador →
              </a>
            </div>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Por que a maioria dos apps de inglês não funciona?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Apps de vocabulário e gramática ensinam o inglês de forma passiva. Você memoriza palavras, completa exercícios, ganha pontos — mas na hora de falar com alguém, trava.</p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">O problema é simples: falar é uma habilidade que só se aprende falando. Não tem atalho.</p>
          <p className="text-slate-400 text-lg leading-relaxed">O Safe 4 Talk resolve isso colocando você em conversas reais desde o primeiro dia — sem pressão, sem julgamento, no seu ritmo.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">O que o Safe 4 Talk oferece</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🎙', title: 'Salas de áudio ao vivo', desc: 'Entre em salas por tema e nível. Ouça, fale e aprenda no ritmo da conversa real.' },
              { icon: '📱', title: 'Android + Navegador', desc: 'Sem desculpa para não praticar. Funciona no celular e no computador, sem instalar nada.' },
              { icon: '🌍', title: 'Comunidade global', desc: 'Falantes de inglês de EUA, Reino Unido, Austrália, Canadá e muito mais.' },
              { icon: '🎯', title: 'Filtro por nível', desc: 'Salas para iniciantes, intermediários e avançados. Você pratica com quem está no mesmo nível.' },
              { icon: '💸', title: '100% gratuito', desc: 'As principais funcionalidades são grátis. Sem assinatura obrigatória.' },
              { icon: '🤝', title: 'Sem julgamento', desc: 'Comunidade acolhedora que entende que errar faz parte do aprendizado.' },
            ].map(item => (
              <div key={item.title} className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              { q: 'Funciona no iPhone?', a: 'A versão iOS está no roadmap. Por enquanto use pelo navegador — funciona em qualquer dispositivo.' },
              { q: 'Precisa pagar para falar com nativos?', a: 'Não. As salas públicas são 100% gratuitas. Você conversa com nativos sem pagar nada.' },
              { q: 'Qual o nível mínimo para começar?', a: 'Não existe nível mínimo. Há salas para quem está começando do zero.' },
              { q: 'Funciona no computador?', a: 'Sim. Acesse safe4talk.com pelo navegador e use no PC ou Mac sem instalar nada.' },
            ].map(faq => (
              <div key={faq.q} className="border border-slate-700/50 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <CTA />
        <Footer />
      </div>
    </>
  )
}
