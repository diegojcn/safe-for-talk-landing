import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function InglesParaTrabalho() {
  return (
    <>
      <Helmet>
        <title>Inglês para Trabalho e Home Office – Pratique ao Vivo – Safe 4 Talk</title>
        <meta name="description" content="Pratique inglês para o trabalho em salas de conversação ao vivo. Reuniões internacionais, e-mails e apresentações. Grátis no navegador e Android." />
        <link rel="canonical" href="https://safe4talk.com/ingles-para-trabalho" />
        <meta property="og:title" content="Inglês para Trabalho e Home Office – Safe 4 Talk" />
        <meta property="og:description" content="Pratique inglês para o trabalho em salas de conversação ao vivo. Reuniões internacionais sem travar." />
        <meta property="og:url" content="https://safe4talk.com/ingles-para-trabalho" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Inglês Profissional</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Inglês para o Trabalho:<br />
              <span className="text-indigo-400">Pare de Travar nas Reuniões Internacionais</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Empresas remotas, reuniões em inglês, entrevistas com gringos — o mercado de trabalho exige fluência. O Safe 4 Talk te prepara com conversação real, sem pagar curso caro.
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
          <h2 className="text-3xl font-bold mb-6">Por que o inglês para trabalho é diferente?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Inglês de escritório tem vocabulário próprio: <em>deliverables, stakeholders, sync, pipeline, onboarding</em>. E além do vocabulário, tem a pressão: falar bem numa reunião com o chefe gringo é completamente diferente de uma conversa casual.</p>
          <p className="text-slate-400 text-lg leading-relaxed">A melhor forma de se preparar é simular essas situações antes que elas aconteçam. No Safe 4 Talk você conversa com profissionais de outros países, em inglês, sobre temas reais de trabalho.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Situações que você vai dominar praticando</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '💻', title: 'Daily meetings', desc: 'Fale com confiança no daily scrum, atualize o time sobre seu progresso sem travar.' },
              { icon: '🎤', title: 'Apresentações', desc: 'Apresente seus resultados e projetos em inglês com clareza e segurança.' },
              { icon: '✉️', title: 'E-mails e Slack', desc: 'Escreva mensagens profissionais e naturais, sem parecer que passou pelo Google Tradutor.' },
              { icon: '🤝', title: 'Entrevistas', desc: 'Responda perguntas difíceis em inglês sem engasgar. A prática é o melhor preparo.' },
              { icon: '💡', title: 'Negociações', desc: 'Defenda suas ideias, faça perguntas e chegue a acordos em inglês com segurança.' },
              { icon: '🌐', title: 'Networking', desc: 'Construa relações profissionais com pessoas do mundo todo, em eventos e comunidades online.' },
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
              { q: 'Tem salas específicas para inglês profissional?', a: 'Sim. Há salas de Business English onde profissionais discutem temas corporativos em inglês. Ótimo para simular o ambiente de trabalho.' },
              { q: 'Funciona para preparação para entrevista?', a: 'Muito bem. Pratique se apresentar, falar sobre sua experiência e responder perguntas comuns de entrevista com falantes nativos.' },
              { q: 'Posso usar no computador do trabalho?', a: 'Sim. Acesse pelo navegador em qualquer computador. Não precisa instalar nada.' },
              { q: 'Quanto tempo até me sentir confiante nas reuniões?', a: 'Com 30 minutos por dia de prática consistente, a maioria dos usuários relata melhora perceptível em 4 a 6 semanas.' },
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
