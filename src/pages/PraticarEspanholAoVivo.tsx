import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function PraticarEspanholAoVivo() {
  return (
    <>
      <Helmet>
        <title>Praticar Espanhol ao Vivo com Nativos Grátis – Safe 4 Talk</title>
        <meta name="description" content="Pratique espanhol ao vivo com falantes nativos da América Latina e Espanha. Salas de conversação grátis no navegador e no Android." />
        <link rel="canonical" href="https://safe4talk.com/praticar-espanhol-ao-vivo" />
        <meta property="og:title" content="Praticar Espanhol ao Vivo com Nativos Grátis – Safe 4 Talk" />
        <meta property="og:description" content="Pratique espanhol ao vivo com nativos da América Latina e Espanha. Grátis no navegador e Android." />
        <meta property="og:url" content="https://safe4talk.com/praticar-espanhol-ao-vivo" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Espanhol ao Vivo</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Pratique Espanhol ao Vivo<br />
              <span className="text-indigo-400">com Nativos da América Latina e Espanha</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              O espanhol é o segundo idioma mais falado do mundo. No Safe 4 Talk você pratica com nativos da Argentina, México, Colômbia, Espanha e muito mais — de graça, pelo navegador ou Android.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://safe-for-talk-web.diginfrastructures.com" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors">
                Praticar pelo Navegador →
              </a>
              <a href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold text-lg transition-colors">
                Baixar no Android →
              </a>
            </div>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Por que aprender espanhol é mais fácil para brasileiros?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Português e espanhol compartilham raízes latinas — cerca de 89% do vocabulário é similar. Isso significa que brasileiros partem na frente na hora de aprender espanhol.</p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">O desafio principal não é o vocabulário: é o <strong className="text-white">portunhol</strong> — o hábito de misturar os dois idiomas. A solução é exposição constante ao espanhol falado por nativos.</p>
          <p className="text-slate-400 text-lg leading-relaxed">No Safe 4 Talk você pratica com pessoas de diferentes países hispânicos, conhecendo também as variações regionais do idioma.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              { q: 'Quais países têm nativos no Safe 4 Talk?', a: 'A comunidade é global. Você vai encontrar falantes da Argentina, México, Colômbia, Espanha, Chile, Peru e outros países hispanófonos.' },
              { q: 'Qual variante do espanhol vou aprender?', a: 'Você vai se expor a várias variantes — o que é ótimo para desenvolver uma compreensão ampla do idioma.' },
              { q: 'Precisa ter base em espanhol para entrar?', a: 'Não. Há salas para iniciantes. Com a proximidade com o português, a maioria dos brasileiros consegue se comunicar desde cedo.' },
              { q: 'Funciona pelo computador?', a: 'Sim. Acesse safe4talk.com pelo navegador. Disponível também no Android.' },
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
