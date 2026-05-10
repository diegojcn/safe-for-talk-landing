import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function ChatParaConhecerPessoas() {
  return (
    <>
      <Helmet>
        <title>Chat para Conhecer Pessoas Novas do Mundo Todo – Safe 4 Talk</title>
        <meta name="description" content="Conheça pessoas novas do mundo todo em salas de chat ao vivo. Sem julgamentos, sem pressão. Grátis pelo navegador e no Android." />
        <link rel="canonical" href="https://safe4talk.com/chat-para-conhecer-pessoas" />
        <meta property="og:title" content="Chat para Conhecer Pessoas Novas do Mundo Todo – Safe 4 Talk" />
        <meta property="og:description" content="Conheça pessoas novas do mundo todo em salas ao vivo. Sem julgamentos. Grátis pelo navegador e Android." />
        <meta property="og:url" content="https://safe4talk.com/chat-para-conhecer-pessoas" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Conheça Pessoas</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Chat para Conhecer Pessoas Novas<br />
              <span className="text-indigo-400">do Mundo Todo, ao Vivo</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Redes sociais mostram o que as pessoas querem parecer. No Safe 4 Talk você vê quem elas são — em conversas ao vivo, por voz, com pessoas reais de países e culturas diferentes.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://safe-for-talk-web.diginfrastructures.com" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors">
                Conhecer Pessoas pelo Navegador →
              </a>
              <a href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android" target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold text-lg transition-colors">
                Baixar no Android →
              </a>
            </div>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Por que o Safe 4 Talk é diferente das redes sociais?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Nas redes sociais você consome conteúdo. No Safe 4 Talk você tem conversas. É uma diferença fundamental — e faz toda a diferença na qualidade das conexões que você forma.</p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Conversar por voz com alguém é infinitamente mais humano do que trocar likes. Você ouve o sotaque, a risada, o jeito de falar — e isso cria conexões reais.</p>
          <p className="text-slate-400 text-lg leading-relaxed">Além disso, as salas são temáticas — você já começa a conversa com algo em comum com os outros participantes.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Tipos de pessoas que você vai conhecer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎓', titulo: 'Estudantes', desc: 'Pessoas aprendendo idiomas ao redor do mundo, abertas a conversar e trocar culturas.' },
              { icon: '💼', titulo: 'Profissionais', desc: 'Trabalhadores remotos, empreendedores e freelancers de países diferentes.' },
              { icon: '🌍', titulo: 'Viajantes', desc: 'Quem ama viajar e quer conectar com pessoas de outros países antes ou durante as viagens.' },
              { icon: '🎮', titulo: 'Entusiastas', desc: 'Pessoas que compartilham paixões por games, música, filmes e cultura pop.' },
              { icon: '📚', titulo: 'Curiosos', desc: 'Quem gosta de aprender sobre outras culturas, histórias e formas de ver o mundo.' },
              { icon: '🤝', titulo: 'Nativos', desc: 'Falantes nativos que participam para ajudar quem está aprendendo o idioma deles.' },
            ].map(item => (
              <div key={item.titulo} className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="text-lg font-semibold mt-2 mb-3">{item.titulo}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              { q: 'Preciso revelar meu nome ou foto?', a: 'Não. Você controla o que compartilha. Nenhuma informação pessoal é obrigatória.' },
              { q: 'Como funcionam as salas?', a: 'Você entra numa sala por tema ou idioma e conversa por áudio ao vivo com outros participantes.' },
              { q: 'Funciona pelo computador?', a: 'Sim. Acesse safe4talk.com pelo navegador. Disponível também no Android.' },
              { q: 'Posso fazer amizades duradouras?', a: 'Muitos usuários relatam amizades que continuam fora da plataforma. As conexões que se formam em conversas reais tendem a ser mais sólidas.' },
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
