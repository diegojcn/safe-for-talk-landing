import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function AprenderInglesSemCurso() {
  return (
    <>
      <Helmet>
        <title>Como Aprender Inglês Sem Pagar Curso – Safe 4 Talk</title>
        <meta name="description" content="Aprenda inglês sem pagar curso ou professor. Salas de conversação ao vivo com nativos e estudantes, grátis no navegador e no Android." />
        <link rel="canonical" href="https://safe4talk.com/aprender-ingles-sem-curso" />
        <meta property="og:title" content="Como Aprender Inglês Sem Pagar Curso – Safe 4 Talk" />
        <meta property="og:description" content="Aprenda inglês sem pagar curso ou professor. Salas de conversação ao vivo com nativos, grátis." />
        <meta property="og:url" content="https://safe4talk.com/aprender-ingles-sem-curso" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Inglês Gratuito</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Como Aprender Inglês Sem Pagar Curso<br />
              <span className="text-indigo-400">e Falar Fluente de Verdade</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Curso de inglês não é pré-requisito para fluência. O que faz você falar bem é prática de conversação real — e isso você consegue de graça no Safe 4 Talk, pelo navegador ou Android.
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
          <h2 className="text-3xl font-bold mb-6">A verdade sobre aprender inglês</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Brasileiros passam anos em cursos de inglês e ainda não conseguem manter uma conversa simples. Não é culpa deles — é o método.</p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Cursos tradicionais focam em gramática e vocabulário. Isso cria uma base teórica, mas não treina o cérebro para pensar e responder em inglês em tempo real.</p>
          <p className="text-slate-400 text-lg leading-relaxed">A ciência linguística mostra que fluência vem de <strong className="text-white">output oral repetido</strong> — ou seja, falar muito, errar, corrigir e repetir. É exatamente isso que o Safe 4 Talk oferece.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Plano gratuito para aprender inglês sem curso</h2>
          <div className="space-y-4">
            {[
              { step: 'Semana 1–2', desc: 'Entre em salas de iniciantes no Safe 4 Talk. Só ouça. Acostume o ouvido com o ritmo do inglês falado.' },
              { step: 'Semana 3–4', desc: 'Comece a falar frases simples. Apresente-se, pergunte de onde a pessoa é, o que ela faz.' },
              { step: 'Mês 2', desc: 'Passe para salas intermediárias. Fale sobre filmes, séries, viagens — temas que você já conhece em português.' },
              { step: 'Mês 3+', desc: 'Pratique 20–30 min por dia. Em 3 meses você vai notar uma diferença enorme na sua fluência.' },
            ].map(item => (
              <div key={item.step} className="flex gap-4 p-5 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <span className="text-indigo-400 font-bold min-w-[100px]">{item.step}</span>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              { q: 'Consigo aprender inglês sem nunca ter feito um curso?', a: 'Sim. Muitas pessoas atingem fluência através de imersão e conversação, sem método formal. O Safe 4 Talk é ideal para isso.' },
              { q: 'Quanto tempo por dia preciso praticar?', a: '20 a 30 minutos diários são suficientes para progredir. Consistência é mais importante do que intensidade.' },
              { q: 'E se eu não entender nada que falam?', a: 'Comece nas salas de iniciantes. O ritmo é mais lento e as pessoas estão acostumadas a ajudar quem está começando.' },
              { q: 'Precisa instalar algo?', a: 'Não. Acesse safe4talk.com pelo navegador no computador ou celular. Se preferir, baixe o app no Android.' },
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
