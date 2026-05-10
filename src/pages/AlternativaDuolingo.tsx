import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function AlternativaDuolingo() {
  return (
    <>
      <Helmet>
        <title>Alternativa ao Duolingo para Falar Inglês de Verdade – Safe 4 Talk</title>
        <meta name="description" content="Cansado do Duolingo e ainda não consegue falar inglês? O Safe 4 Talk é a alternativa com conversação real ao vivo. Grátis no navegador e Android." />
        <link rel="canonical" href="https://safe4talk.com/alternativa-duolingo" />
        <meta property="og:title" content="Alternativa ao Duolingo para Falar Inglês – Safe 4 Talk" />
        <meta property="og:description" content="O Safe 4 Talk é a alternativa ao Duolingo com conversação real. Fale inglês de verdade com nativos." />
        <meta property="og:url" content="https://safe4talk.com/alternativa-duolingo" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Alternativa ao Duolingo</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Cansado do Duolingo e Ainda Não Fala Inglês?<br />
              <span className="text-indigo-400">Existe uma Alternativa Melhor</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              O Duolingo é ótimo para vocabulário, mas não te ensina a falar. O Safe 4 Talk resolve exatamente isso: conversação real com pessoas reais, ao vivo, de graça — pelo navegador ou Android.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://safe-for-talk-web.diginfrastructures.com" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors">
                Experimentar pelo Navegador →
              </a>
              <a href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold text-lg transition-colors">
                Baixar no Android →
              </a>
            </div>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Duolingo vs. Safe 4 Talk</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 pr-6 text-slate-400 font-medium">Funcionalidade</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Duolingo</th>
                  <th className="text-center py-3 px-4 text-indigo-400 font-medium">Safe 4 Talk</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feat: 'Conversação real ao vivo', duo: '❌', s4t: '✅' },
                  { feat: 'Falantes nativos', duo: '❌', s4t: '✅' },
                  { feat: 'Gratuito', duo: '✅ (limitado)', s4t: '✅ completo' },
                  { feat: 'Vocabulário e gramática', duo: '✅', s4t: '🟡 indireto' },
                  { feat: 'Funciona no navegador', duo: '✅', s4t: '✅' },
                  { feat: 'App Android', duo: '✅', s4t: '✅' },
                  { feat: 'Comunidade global', duo: '❌', s4t: '✅' },
                  { feat: 'Prática de listening real', duo: '🟡 simulado', s4t: '✅ real' },
                ].map(row => (
                  <tr key={row.feat} className="border-b border-slate-800">
                    <td className="py-4 pr-6 text-slate-300">{row.feat}</td>
                    <td className="text-center py-4 px-4">{row.duo}</td>
                    <td className="text-center py-4 px-4 text-indigo-300 font-medium">{row.s4t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Use os dois juntos</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Duolingo e Safe 4 Talk não precisam ser concorrentes — podem se complementar.</p>
          <p className="text-slate-400 text-lg leading-relaxed">Use o Duolingo para construir vocabulário e gramática. Use o Safe 4 Talk para praticar tudo isso em conversas reais. É a combinação mais eficiente para quem quer falar inglês rápido.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              { q: 'O Safe 4 Talk substitui o Duolingo?', a: 'Para quem quer falar, sim. O Safe 4 Talk foca em conversação real, que é o que faz a diferença na fluência. O Duolingo é mais útil para construir base de vocabulário.' },
              { q: 'Precisa ter um nível para começar?', a: 'Não. Há salas para todos os níveis, inclusive quem está no nível A1 (básico total).' },
              { q: 'É realmente gratuito?', a: 'Sim. Salas públicas e conversação são gratuitas. Sem assinatura obrigatória.' },
              { q: 'Precisa instalar algo?', a: 'Não. Acesse pelo navegador. Se preferir, tem app disponível no Android.' },
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
