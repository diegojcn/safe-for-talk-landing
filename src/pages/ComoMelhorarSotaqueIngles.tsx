import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function ComoMelhorarSotaqueIngles() {
  return (
    <>
      <Helmet>
        <title>Como Melhorar o Sotaque em Inglês Praticando ao Vivo – Safe 4 Talk</title>
        <meta name="description" content="Melhore seu sotaque em inglês conversando com nativos ao vivo. Dicas práticas e salas de conversação grátis no navegador e Android." />
        <link rel="canonical" href="https://safe4talk.com/como-melhorar-sotaque-ingles" />
        <meta property="og:title" content="Como Melhorar o Sotaque em Inglês – Safe 4 Talk" />
        <meta property="og:description" content="Melhore seu sotaque em inglês conversando com nativos ao vivo. Grátis no navegador e Android." />
        <meta property="og:url" content="https://safe4talk.com/como-melhorar-sotaque-ingles" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">Sotaque e Pronúncia</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Como Melhorar o Sotaque em Inglês<br />
              <span className="text-indigo-400">Conversando com Nativos ao Vivo</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Sotaque não se melhora ouvindo podcast. Se melhora falando — e recebendo feedback de quem fala a língua nativamente. No Safe 4 Talk você faz isso de graça, pelo navegador ou Android.
            </p>
            <a href="https://safe-for-talk-web.diginfrastructures.com" target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors">
              Praticar Pronúncia Agora →
            </a>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Sotaque brasileiro em inglês: problema ou característica?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">A boa notícia: você não precisa soar como americano para ser entendido. O objetivo não é eliminar o sotaque, mas ter uma <strong className="text-white">pronúncia clara</strong> que não dificulte a comunicação.</p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">Os problemas mais comuns dos brasileiros em inglês são: adicionar vogais no final das palavras (<em>"likes-i"</em> em vez de <em>"likes"</em>), dificuldade com o <em>th</em>, e confundir sons de vogais curtas e longas.</p>
          <p className="text-slate-400 text-lg leading-relaxed">A solução para tudo isso é a mesma: ouvir e imitar nativos em conversas reais — exatamente o que o Safe 4 Talk oferece.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Dicas práticas para melhorar o sotaque</h2>
          <div className="space-y-4">
            {[
              { tip: 'Ouça antes de falar', desc: 'Entre numa sala e passe os primeiros minutos só ouvindo. Preste atenção no ritmo, na entonação e nos sons que os nativos fazem.' },
              { tip: 'Repita frases inteiras, não palavras soltas', desc: 'O sotaque vem do ritmo da frase, não só da pronúncia individual das palavras.' },
              { tip: 'Grave-se e escute', desc: 'Use o gravador do celular. Ouvir a si mesmo é desconfortável, mas é uma das formas mais eficazes de identificar problemas.' },
              { tip: 'Peça feedback gentilmente', desc: 'Nas salas do Safe 4 Talk, você pode pedir aos nativos para te corrigir quando errar. Muitos adoram ajudar.' },
              { tip: 'Pratique sons difíceis isoladamente', desc: 'Foque nos sons que você sabe que erra: o "th", o "r" americano, as vogais curtas.' },
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
              { q: 'Quanto tempo leva para melhorar o sotaque?', a: 'Com prática diária de 20 minutos, mudanças perceptíveis aparecem em 4 a 8 semanas. Sotaque é hábito muscular — leva repetição.' },
              { q: 'Os nativos do Safe 4 Talk corrigem minha pronúncia?', a: 'Muitos corrigem quando pedido. A comunidade é acolhedora e entende que você está aprendendo.' },
              { q: 'Funciona pelo computador?', a: 'Sim. Acesse safe4talk.com pelo navegador. Disponível também no Android.' },
              { q: 'Precisa de microfone bom?', a: 'Um microfone básico (de fone de ouvido) já funciona bem. Não precisa de equipamento especial.' },
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
