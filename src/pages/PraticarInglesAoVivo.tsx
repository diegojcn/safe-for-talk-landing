import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function PraticarInglesAoVivo() {
  return (
    <>
      <Helmet>
        <title>Praticar Inglês ao Vivo com Nativos – Safe 4 Talk</title>
        <meta
          name="description"
          content="Pratique inglês ao vivo com falantes nativos e outros estudantes. Salas de conversação gratuitas, sem pressão e sem julgamentos. Aprenda falando de verdade."
        />
        <link rel="canonical" href="https://safe4talk.com/praticar-ingles-ao-vivo" />
        <meta property="og:title" content="Praticar Inglês ao Vivo com Nativos – Safe 4 Talk" />
        <meta
          property="og:description"
          content="Pratique inglês ao vivo com falantes nativos. Salas de conversação gratuitas, sem pressão e sem julgamentos."
        />
        <meta property="og:url" content="https://safe4talk.com/praticar-ingles-ao-vivo" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
              Inglês ao Vivo
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Praticar Inglês ao Vivo:<br />
              <span className="text-indigo-400">A Forma Mais Rápida de Aprender</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Esqueça os cursos intermináveis. A forma mais eficaz de aprender inglês é
              falando com pessoas reais. No Safe 4 Talk você entra em salas ao vivo com
              nativos e estudantes do mundo todo — de graça e sem pressão.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors"
            >
              Começar a Praticar Grátis →
            </a>
          </motion.div>
        </section>

        {/* Por que falar é melhor */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Por que praticar falando é mais eficaz?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">
            Estudos de aquisição de linguagem mostram que a exposição oral ativa — ou seja,
            falar e ouvir em situações reais — acelera o aprendizado até 3x mais do que
            métodos passivos como leitura e exercícios gramaticais.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">
            O problema é que a maioria das pessoas não tem acesso fácil a falantes nativos
            ou parceiros de conversação. É aí que o Safe 4 Talk entra: uma comunidade
            global disponível 24h por dia, todos os dias.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            Em vez de decorar gramática, você aprende o inglês de forma natural —
            <strong className="text-white"> do mesmo jeito que aprendeu português quando criança</strong>.
          </p>
        </section>

        {/* Tipos de sala */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Tipos de salas para praticar inglês</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🌱',
                level: 'Iniciante',
                title: 'English for Beginners',
                desc: 'Salas com ritmo lento, vocabulário básico e muito apoio. Sem vergonha de errar.',
              },
              {
                icon: '⚡',
                level: 'Intermediário',
                title: 'Everyday English',
                desc: 'Conversas sobre temas do dia a dia: trabalho, viagens, filmes e cultura.',
              },
              {
                icon: '🚀',
                level: 'Avançado',
                title: 'Fluency Practice',
                desc: 'Debates, discussões e tópicos complexos para quem já tem uma base sólida.',
              },
            ].map((room) => (
              <div
                key={room.title}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <div className="text-3xl mb-2">{room.icon}</div>
                <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">
                  {room.level}
                </span>
                <h3 className="text-lg font-semibold mt-2 mb-3">{room.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{room.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparação */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Safe 4 Talk vs. outros métodos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 pr-6 text-slate-400 font-medium">Método</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Conversação real</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Gratuito</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Disponível 24h</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Safe 4 Talk', conv: '✅', free: '✅', hours: '✅', highlight: true },
                  { name: 'Duolingo', conv: '❌', free: '✅', hours: '✅', highlight: false },
                  { name: 'Curso de inglês', conv: '✅', free: '❌', hours: '❌', highlight: false },
                  { name: 'Apps de flashcard', conv: '❌', free: '✅', hours: '✅', highlight: false },
                  { name: 'Professor particular', conv: '✅', free: '❌', hours: '❌', highlight: false },
                ].map((row) => (
                  <tr
                    key={row.name}
                    className={`border-b border-slate-800 ${row.highlight ? 'bg-indigo-500/5' : ''}`}
                  >
                    <td className={`py-4 pr-6 font-medium ${row.highlight ? 'text-indigo-400' : 'text-slate-300'}`}>
                      {row.name}
                    </td>
                    <td className="text-center py-4 px-4">{row.conv}</td>
                    <td className="text-center py-4 px-4">{row.free}</td>
                    <td className="text-center py-4 px-4">{row.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Dicas */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Dicas para evoluir mais rápido</h2>
          <div className="space-y-4">
            {[
              { tip: 'Entre em salas todo dia', detail: 'Consistência é mais importante do que intensidade. 20 minutos diários supera 2 horas semanais.' },
              { tip: 'Não tenha medo de errar', detail: 'Erros fazem parte do processo. Os nativos sabem que você está aprendendo e têm paciência.' },
              { tip: 'Comece no nível certo', detail: 'Não pule para salas avançadas cedo demais. Dominar o básico te dá confiança para crescer.' },
              { tip: 'Use o chat de texto como apoio', detail: 'Quando não entender uma palavra, pergunte no chat. A comunidade sempre ajuda.' },
              { tip: 'Ouça antes de falar', detail: 'Nos primeiros dias, observe como os nativos constroem as frases. O ouvido treina antes da fala.' },
            ].map((item, i) => (
              <div key={item.tip} className="flex gap-4 p-5 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <span className="text-indigo-500 font-bold text-lg min-w-[24px]">{i + 1}.</span>
                <div>
                  <p className="font-semibold mb-1">{item.tip}</p>
                  <p className="text-slate-400 text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Precisa ter um nível mínimo de inglês?',
                a: 'Não. Existem salas para todos os níveis, inclusive iniciantes que mal sabem o básico. O importante é a prática, não a perfeição.',
              },
              {
                q: 'Como funciona a conversa com nativos?',
                a: 'Você entra em uma sala pública e pode falar por áudio ou vídeo com qualquer participante. É uma conversa natural, como se estivesse em um grupo de conversação presencial.',
              },
              {
                q: 'Posso usar no computador?',
                a: 'Sim. O Safe 4 Talk tem versão web que funciona direto no navegador, além do app para Android.',
              },
              {
                q: 'Quanto tempo leva para ver resultados?',
                a: 'Usuários que praticam 20–30 minutos por dia relatam melhora perceptível na fluência em 4 a 8 semanas.',
              },
            ].map((faq) => (
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
