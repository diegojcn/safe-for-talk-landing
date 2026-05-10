import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function ConversarComEstranhosOnline() {
  return (
    <>
      <Helmet>
        <title>Conversar com Estranhos Online de Forma Segura – Safe 4 Talk</title>
        <meta name="description" content="Converse com estranhos online de forma segura e sem julgamentos. Salas ao vivo com pessoas do mundo todo. Grátis no navegador e Android." />
        <link rel="canonical" href="https://safe4talk.com/conversar-com-estranhos-online" />
        <meta property="og:title" content="Conversar com Estranhos Online de Forma Segura – Safe 4 Talk" />
        <meta property="og:description" content="Converse com estranhos online de forma segura. Salas ao vivo com pessoas do mundo todo. Grátis." />
        <meta property="og:url" content="https://safe4talk.com/conversar-com-estranhos-online" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Conexões Reais</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Conversar com Estranhos Online<br />
              <span className="text-indigo-400">de Forma Segura e Sem Julgamentos</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Às vezes a melhor conversa é com alguém que você nunca viu. No Safe 4 Talk você encontra pessoas do mundo todo em salas ao vivo — sem exposição desnecessária, sem pressão, 100% gratuito no navegador e Android.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://safe-for-talk-web.diginfrastructures.com" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors">
                Entrar numa Sala pelo Navegador →
              </a>
              <a href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold text-lg transition-colors">
                Baixar no Android →
              </a>
            </div>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Por que conversar com estranhos faz bem?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Pesquisas em psicologia social mostram que conversas com desconhecidos aumentam o bem-estar, expandem perspectivas e reduzem o sentimento de solidão — mesmo quando são breves.</p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">O problema é que no mundo real falar com estranhos tem uma barreira social enorme. Online, e com o ambiente certo, essa barreira some.</p>
          <p className="text-slate-400 text-lg leading-relaxed">O Safe 4 Talk cria esse ambiente: salas temáticas onde as pessoas entram com um objetivo em comum — conversar, aprender, se conectar.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">O que torna o Safe 4 Talk diferente</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🛡', title: 'Segurança real', desc: 'Sistema de moderação e reporte. Comportamentos inadequados são tratados rapidamente.' },
              { icon: '🎯', title: 'Salas por tema', desc: 'Você entra numa conversa com contexto — não é um chat aleatório sem propósito.' },
              { icon: '🌍', title: 'Global', desc: 'Pessoas de dezenas de países, culturas e backgrounds diferentes.' },
              { icon: '🎙', title: 'Áudio ao vivo', desc: 'Conversas de voz, não só texto. Mais humanas, mais reais, mais memoráveis.' },
              { icon: '👤', title: 'Sem exposição forçada', desc: 'Você controla o que compartilha. Sem obrigação de foto ou nome real.' },
              { icon: '💸', title: 'Gratuito', desc: 'Sem barreira de pagamento para se conectar com pessoas.' },
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
              { q: 'É seguro conversar com estranhos no Safe 4 Talk?', a: 'Sim. A plataforma tem moderação ativa e sistema de reporte. As salas são temáticas, o que naturalmente filtra o tipo de conversa.' },
              { q: 'Posso entrar sem falar nada?', a: 'Sim. Você pode ouvir a conversa sem participar ativamente. Ninguém vai te forçar a falar.' },
              { q: 'Funciona pelo computador?', a: 'Sim. Acesse safe4talk.com pelo navegador sem instalar nada. Disponível também no Android.' },
              { q: 'Precisa me cadastrar?', a: 'Sim, é necessário um cadastro básico via Google ou Facebook para entrar nas salas.' },
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
