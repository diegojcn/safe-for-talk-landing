import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function SalasDeConversacaoIngles() {
  return (
    <>
      <Helmet>
        <title>Salas de Conversação em Inglês Online e Grátis – Safe 4 Talk</title>
        <meta name="description" content="Entre em salas de conversação em inglês online ao vivo. Pratique com nativos e estudantes de todo o mundo. Grátis pelo navegador ou Android." />
        <link rel="canonical" href="https://safe4talk.com/salas-de-conversacao-ingles" />
        <meta property="og:title" content="Salas de Conversação em Inglês Online e Grátis – Safe 4 Talk" />
        <meta property="og:description" content="Salas de conversação em inglês online ao vivo. Pratique com nativos e estudantes. Grátis." />
        <meta property="og:url" content="https://safe4talk.com/salas-de-conversacao-ingles" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Salas ao Vivo</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Salas de Conversação em Inglês Online<br />
              <span className="text-indigo-400">Ao Vivo e Completamente Grátis</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Entre em salas de conversação em inglês com pessoas do mundo todo, agora mesmo. Sem agendamento, sem mensalidade. Funciona no navegador e no Android.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://safe-for-talk-web.diginfrastructures.com" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors">
                Entrar numa Sala Agora →
              </a>
              <a href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold text-lg transition-colors">
                Baixar no Android →
              </a>
            </div>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Tipos de salas disponíveis</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🌱', nivel: 'Iniciante', titulo: 'Beginners Welcome', desc: 'Conversas lentas, vocabulário simples, muito encorajamento.' },
              { icon: '⚡', nivel: 'Intermediário', titulo: 'Everyday English', desc: 'Temas do dia a dia: trabalho, viagens, filmes, tecnologia.' },
              { icon: '🚀', nivel: 'Avançado', titulo: 'Fluency Challenge', desc: 'Debates e discussões em ritmo natural com nativos.' },
              { icon: '💼', nivel: 'Profissional', titulo: 'Business English', desc: 'Vocabulário e situações do ambiente corporativo internacional.' },
              { icon: '🎮', nivel: 'Casual', titulo: 'Fun & Games', desc: 'Conversas descontraídas sobre cultura pop, games e entretenimento.' },
              { icon: '📚', nivel: 'Temático', titulo: 'Topic Rooms', desc: 'Salas por assunto: ciência, arte, esportes, música e mais.' },
            ].map(sala => (
              <div key={sala.titulo} className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="text-3xl mb-2">{sala.icon}</div>
                <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">{sala.nivel}</span>
                <h3 className="text-lg font-semibold mt-2 mb-3">{sala.titulo}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{sala.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              { q: 'Precisa marcar horário para entrar nas salas?', a: 'Não. As salas são abertas e ao vivo. Basta entrar quando quiser e começar a praticar.' },
              { q: 'Quantas pessoas costumam ter nas salas?', a: 'Varia entre 5 e 50 pessoas dependendo do horário e do tema. Nos horários de pico há sempre várias salas ativas.' },
              { q: 'Posso criar minha própria sala?', a: 'Sim. Qualquer usuário pode criar salas públicas ou privadas sobre o tema que quiser.' },
              { q: 'Funciona sem instalar nada?', a: 'Sim. Acesse safe4talk.com pelo navegador no computador ou celular. Disponível também como app no Android.' },
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
