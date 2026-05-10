import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function ConversarComNativosGratis() {
  return (
    <>
      <Helmet>
        <title>Conversar com Nativos de Inglês Grátis – Safe 4 Talk</title>
        <meta name="description" content="Converse com falantes nativos de inglês de graça em salas ao vivo. Sem pagar professor particular. Disponível no navegador e no Android." />
        <link rel="canonical" href="https://safe4talk.com/conversar-com-nativos-gratis" />
        <meta property="og:title" content="Conversar com Nativos de Inglês Grátis – Safe 4 Talk" />
        <meta property="og:description" content="Converse com falantes nativos de inglês de graça em salas ao vivo. Sem pagar professor particular." />
        <meta property="og:url" content="https://safe4talk.com/conversar-com-nativos-gratis" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Nativos Grátis</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Como Conversar com Nativos de Inglês<br />
              <span className="text-indigo-400">Sem Pagar Nada</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Professor particular custa caro. Intercâmbio então, nem se fala. O Safe 4 Talk te conecta com falantes nativos de inglês ao vivo — de graça, pelo navegador ou pelo Android.
            </p>
            <a href="https://safe-for-talk-web.diginfrastructures.com" target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors">
              Começar pelo Navegador — Grátis →
            </a>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Por que conversar com nativos acelera tanto?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Nativos falam no ritmo natural, usam expressões idiomáticas, gírias e sotaques reais. É uma exposição que nenhum curso ou app consegue replicar.</p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Quando você conversa com um nativo, seu cérebro é forçado a processar e produzir o idioma em tempo real — que é exatamente o que acontece numa entrevista de emprego, numa viagem ou numa reunião internacional.</p>
          <p className="text-slate-400 text-lg leading-relaxed">No Safe 4 Talk há salas com falantes de EUA, Reino Unido, Austrália, Canadá e outros países anglófonos — disponíveis 24h por dia.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Como funciona</h2>
          <ol className="space-y-6">
            {[
              { n: '01', title: 'Acesse pelo navegador ou Android', desc: 'Sem precisar baixar nada. Abra safe4talk.com ou instale o app no Android.' },
              { n: '02', title: 'Escolha uma sala com nativos', desc: 'Filtre por idioma inglês e veja quais salas têm falantes nativos participando.' },
              { n: '03', title: 'Ouça antes de falar', desc: 'Fique alguns minutos ouvindo a conversa para pegar o ritmo antes de entrar.' },
              { n: '04', title: 'Pratique todo dia', desc: '20 minutos diários com nativos superam horas de estudo sozinho.' },
            ].map(step => (
              <li key={step.n} className="flex gap-6 items-start">
                <span className="text-4xl font-bold text-indigo-500/30 leading-none">{step.n}</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              { q: 'Os nativos têm paciência com iniciantes?', a: 'Sim. A comunidade do Safe 4 Talk é conhecida por ser acolhedora. Muitos nativos participam justamente para ajudar quem está aprendendo.' },
              { q: 'Há nativos disponíveis a qualquer hora?', a: 'Como a comunidade é global, sempre há alguém online em algum fuso horário diferente do seu.' },
              { q: 'Precisa ter microfone?', a: 'Para falar sim. Mas você pode começar só ouvindo, sem precisar falar nada.' },
              { q: 'Funciona no iPhone?', a: 'A versão iOS está em desenvolvimento. Use pelo navegador no iPhone por enquanto — funciona perfeitamente.' },
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
