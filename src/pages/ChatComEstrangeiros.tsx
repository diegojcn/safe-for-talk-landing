import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function ChatComEstrangeiros() {
  return (
    <>
      <Helmet>
        <title>Chat com Estrangeiros ao Vivo e Grátis – Safe 4 Talk</title>
        <meta name="description" content="Converse com estrangeiros ao vivo pelo chat de voz. Conheça culturas, pratique idiomas e faça conexões reais. Grátis no navegador e Android." />
        <link rel="canonical" href="https://safe4talk.com/chat-com-estrangeiros" />
        <meta property="og:title" content="Chat com Estrangeiros ao Vivo e Grátis – Safe 4 Talk" />
        <meta property="og:description" content="Converse com estrangeiros ao vivo. Conheça culturas, pratique idiomas. Grátis no navegador e Android." />
        <meta property="og:url" content="https://safe4talk.com/chat-com-estrangeiros" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Chat Internacional</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Chat com Estrangeiros:<br />
              <span className="text-indigo-400">O Mundo Inteiro numa Sala ao Vivo</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Conheça pessoas de EUA, Europa, Ásia e América Latina em conversas ao vivo por voz. Troque culturas, pratique idiomas e faça conexões que vão além da tela — de graça, pelo navegador ou Android.
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
          <h2 className="text-3xl font-bold mb-6">O que torna o chat com estrangeiros tão valioso?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Conversar com pessoas de outros países abre horizontes que nenhum documentário ou livro consegue. Você ouve diretamente como é viver em outro lugar, como as pessoas pensam, o que as preocupa e o que as alegra.</p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Além disso, é a forma mais eficaz de praticar idiomas — não existe imersão melhor do que uma conversa real com um nativo.</p>
          <p className="text-slate-400 text-lg leading-relaxed">No Safe 4 Talk, essa experiência está disponível agora, de graça, sem precisar comprar passagem de avião.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Países mais presentes na comunidade</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['🇺🇸 EUA', '🇬🇧 Reino Unido', '🇩🇪 Alemanha', '🇦🇺 Austrália', '🇨🇦 Canadá', '🇲🇽 México', '🇦🇷 Argentina', '🇮🇳 Índia', '🇫🇷 França', '🇯🇵 Japão', '🇪🇸 Espanha', '🇳🇬 Nigéria'].map(pais => (
              <div key={pais} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center text-slate-300 text-sm font-medium">{pais}</div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              { q: 'Em qual idioma as conversas acontecem?', a: 'Principalmente inglês, mas há salas em espanhol, alemão, francês e outros idiomas. Cada sala indica o idioma.' },
              { q: 'E se eu não falar bem inglês?', a: 'Comece nas salas para iniciantes. Muitos participantes estão no mesmo nível que você. O objetivo é praticar, não impressionar.' },
              { q: 'Funciona pelo computador?', a: 'Sim. Acesse safe4talk.com pelo navegador. Disponível também no Android.' },
              { q: 'É seguro conversar com desconhecidos de outros países?', a: 'Sim. O Safe 4 Talk tem sistema de moderação e reporte. As salas são monitoradas e comportamentos inadequados são tratados rapidamente.' },
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
