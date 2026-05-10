import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function FazerAmigosOnline() {
  return (
    <>
      <Helmet>
        <title>Como Fazer Amigos Online de Outros Países – Safe 4 Talk</title>
        <meta name="description" content="Faça amigos online de outros países em salas de conversa ao vivo. Conexões reais, sem julgamento. Grátis pelo navegador e no Android." />
        <link rel="canonical" href="https://safe4talk.com/fazer-amigos-online" />
        <meta property="og:title" content="Como Fazer Amigos Online de Outros Países – Safe 4 Talk" />
        <meta property="og:description" content="Faça amigos online de outros países em salas de conversa ao vivo. Conexões reais. Grátis." />
        <meta property="og:url" content="https://safe4talk.com/fazer-amigos-online" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Amizades Reais</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Como Fazer Amigos Online<br />
              <span className="text-indigo-400">de Outros Países de Verdade</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Não é sobre followers, é sobre conexões reais. O Safe 4 Talk coloca você em salas de conversa ao vivo com pessoas de todo o mundo — onde amizades de verdade começam com uma simples troca de palavras.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://safe-for-talk-web.diginfrastructures.com" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors">
                Entrar pelo Navegador →
              </a>
              <a href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold text-lg transition-colors">
                Baixar no Android →
              </a>
            </div>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Por que é difícil fazer amigos online?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">A maioria das plataformas online não foi feita para criar amizades — foi feita para engajamento. Curtidas, comentários e seguidores criam a sensação de conexão sem a substância real.</p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Amizades reais se formam em conversas — onde há espaço para vulnerabilidade, humor, discordância e espontaneidade. Exatamente o que acontece numa sala de voz ao vivo.</p>
          <p className="text-slate-400 text-lg leading-relaxed">No Safe 4 Talk, você entra numa sala com pessoas que compartilham um interesse em comum e a conversa acontece naturalmente.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Dicas para fazer amigos reais no Safe 4 Talk</h2>
          <div className="space-y-4">
            {[
              { tip: 'Entre em salas do seu interesse', desc: 'Amizades começam com algo em comum. Escolha salas sobre temas que você gosta de verdade.' },
              { tip: 'Seja consistente', desc: 'Apareça nas mesmas salas com frequência. As pessoas começam a te reconhecer e a conversa flui mais naturalmente.' },
              { tip: 'Faça perguntas genuínas', desc: 'Interesse real é o ingrediente principal de toda amizade. Pergunte sobre a vida da pessoa, não só sobre o tema da sala.' },
              { tip: 'Não tenha pressa', desc: 'Amizades levam tempo. Trate cada conversa como um fim em si mesma, não como um meio para ter um amigo.' },
              { tip: 'Use o idioma como ponte', desc: 'Praticar inglês juntos cria um vínculo natural. Vocês estão aprendendo algo juntos — isso une.' },
            ].map((item, i) => (
              <div key={item.tip} className="flex gap-4 p-5 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <span className="text-indigo-500 font-bold text-lg min-w-[24px]">{i + 1}.</span>
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
              { q: 'É possível fazer amigos reais online?', a: 'Sim. Pesquisas mostram que amizades online podem ser tão significativas quanto as presenciais quando há conversas reais e consistentes.' },
              { q: 'Como sei que as pessoas são reais?', a: 'No Safe 4 Talk as conversas são por voz ao vivo. É muito mais difícil fingir do que em chats de texto.' },
              { q: 'Funciona pelo computador?', a: 'Sim. Acesse safe4talk.com pelo navegador. Disponível também no Android.' },
              { q: 'É gratuito?', a: 'Sim. Entrar nas salas e conversar com pessoas é 100% gratuito.' },
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
