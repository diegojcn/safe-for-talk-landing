import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function AprenderAlemaoFalando() {
  return (
    <>
      <Helmet>
        <title>Aprender Alemão Conversando Online Grátis – Safe 4 Talk</title>
        <meta name="description" content="Aprenda alemão conversando com nativos online. Salas ao vivo com falantes da Alemanha, Áustria e Suíça. Grátis no navegador e Android." />
        <link rel="canonical" href="https://safe4talk.com/aprender-alemao-falando" />
        <meta property="og:title" content="Aprender Alemão Conversando Online Grátis – Safe 4 Talk" />
        <meta property="og:description" content="Aprenda alemão conversando com nativos online. Salas ao vivo. Grátis no navegador e Android." />
        <meta property="og:url" content="https://safe4talk.com/aprender-alemao-falando" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Alemão ao Vivo</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Aprenda Alemão Conversando<br />
              <span className="text-indigo-400">com Nativos Online e de Graça</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Alemão é um dos idiomas mais valorizados no mercado de trabalho. No Safe 4 Talk você pratica com falantes nativos da Alemanha, Áustria e Suíça — sem pagar nada, pelo navegador ou Android.
            </p>
            <a href="https://safe-for-talk-web.diginfrastructures.com" target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors">
              Praticar Alemão pelo Navegador →
            </a>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Por que aprender alemão conversando é mais eficaz?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">O alemão tem uma gramática complexa — casos, gêneros, conjugações. Mas a forma mais rápida de internalizar essas regras não é memorizando tabelas, é ouvindo e reproduzindo padrões em contextos reais.</p>
          <p className="text-slate-400 text-lg leading-relaxed">Quando você conversa com um nativo, seu cérebro começa a reconhecer padrões naturalmente — da mesma forma que crianças aprendem a língua materna.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              { q: 'Precisa saber alemão para começar?', a: 'Não. Há salas para iniciantes absolutos. Você pode começar com frases básicas e ir evoluindo no ritmo da comunidade.' },
              { q: 'Por que aprender alemão vale a pena?', a: 'Alemão é exigido em diversas empresas multinacionais, abre portas para trabalho e estudo na Europa, e é o idioma mais falado da União Europeia.' },
              { q: 'Funciona pelo computador?', a: 'Sim. Acesse safe4talk.com pelo navegador. Disponível também no Android.' },
              { q: 'É gratuito?', a: 'Sim. Salas de conversação são gratuitas. Sem assinatura.' },
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
