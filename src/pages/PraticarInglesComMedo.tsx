import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function PraticarInglesComMedo() {
  return (
    <>
      <Helmet>
        <title>Tenho Medo de Falar Inglês – Como Superar e Praticar – Safe 4 Talk</title>
        <meta name="description" content="Medo de falar inglês é mais comum do que você pensa. Veja como superar o bloqueio e praticar sem pressão em salas ao vivo. Grátis no navegador e Android." />
        <link rel="canonical" href="https://safe4talk.com/praticar-ingles-com-medo" />
        <meta property="og:title" content="Tenho Medo de Falar Inglês – Como Superar – Safe 4 Talk" />
        <meta property="og:description" content="Medo de falar inglês é mais comum do que você pensa. Saiba como superar e praticar sem pressão." />
        <meta property="og:url" content="https://safe4talk.com/praticar-ingles-com-medo" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Sem Pressão</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Tenho Medo de Falar Inglês.<br />
              <span className="text-indigo-400">Como Superar e Começar a Praticar?</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Você sabe inglês, mas na hora de falar, trava. Fica com medo de errar, de não ser entendido, de passar vergonha. Isso tem nome — e tem solução. O Safe 4 Talk foi feito para quem está nesse lugar.
            </p>
            <a href="https://safe-for-talk-web.diginfrastructures.com" target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors">
              Praticar Sem Pressão →
            </a>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Por que você trava na hora de falar inglês?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">O bloqueio ao falar inglês tem uma causa psicológica clara: <strong className="text-white">medo do julgamento</strong>. Você associa o erro com humilhação — e isso faz o cérebro entrar em modo de defesa.</p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">O problema é que esse medo só piora quanto menos você pratica. E a única forma de superar é a exposição gradual — falar em ambientes seguros, sem consequências reais para os erros.</p>
          <p className="text-slate-400 text-lg leading-relaxed">O Safe 4 Talk cria exatamente esse ambiente. Comunidade acolhedora, salas por nível, sem gravação e sem julgamento.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">5 passos para superar o medo de falar inglês</h2>
          <div className="space-y-4">
            {[
              { n: '01', tip: 'Aceite que errar é normal', desc: 'Todo mundo que fala inglês como segunda língua erra. Nativos erram. Errar é parte do processo, não uma falha.' },
              { n: '02', tip: 'Comece ouvindo, sem pressão de falar', desc: 'Entre numa sala do Safe 4 Talk e fique só ouvindo. Sem obrigação de falar. Deixe o ouvido acostumar.' },
              { n: '03', tip: 'Fale frases curtas primeiro', desc: '"I agree", "That\'s interesting", "Where are you from?" — comece com o básico e vá expandindo.' },
              { n: '04', tip: 'Pratique todo dia, mesmo que pouco', desc: '10 minutos diários são melhores que 2 horas por semana. A exposição contínua quebra o bloqueio.' },
              { n: '05', tip: 'Celebre cada tentativa', desc: 'Cada vez que você abre a boca em inglês é uma vitória. O progresso vem da repetição, não da perfeição.' },
            ].map(item => (
              <div key={item.n} className="flex gap-4 p-5 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <span className="text-indigo-500 font-bold text-lg min-w-[32px]">{item.n}.</span>
                <div>
                  <p className="font-semibold mb-1">{item.tip}</p>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              { q: 'E se eu falar errado e as pessoas rirem?', a: 'Não acontece no Safe 4 Talk. A comunidade é formada por pessoas que também estão aprendendo e entendem o processo. Comportamentos negativos são reportados e moderados.' },
              { q: 'Posso entrar numa sala e só ouvir?', a: 'Sim. Você pode participar só ouvindo por quanto tempo quiser. Ninguém vai te forçar a falar.' },
              { q: 'E se eu não entender nada?', a: 'Comece nas salas de iniciantes. O ritmo é mais lento e as pessoas repetem quando necessário. Com o tempo, sua compreensão melhora naturalmente.' },
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
