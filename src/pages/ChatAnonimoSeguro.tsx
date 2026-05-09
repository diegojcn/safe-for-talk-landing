import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export default function ChatAnonimoSeguro() {
  return (
    <>
      <Helmet>
        <title>Chat Anônimo e Seguro – Safe 4 Talk</title>
        <meta
          name="description"
          content="Converse anonimamente com pessoas do mundo todo sem revelar sua identidade. Chat seguro, privado e sem julgamentos. 100% grátis."
        />
        <link rel="canonical" href="https://safe4talk.com/chat-anonimo-seguro" />
        <meta property="og:title" content="Chat Anônimo e Seguro – Safe 4 Talk" />
        <meta
          property="og:description"
          content="Converse anonimamente com pessoas do mundo todo sem revelar sua identidade. Chat seguro, privado e sem julgamentos."
        />
        <meta property="og:url" content="https://safe4talk.com/chat-anonimo-seguro" />
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
              Chat Anônimo
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Chat Anônimo e Seguro:<br />
              <span className="text-indigo-400">Converse Sem Revelar Sua Identidade</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              O Safe 4 Talk é um app de chat seguro onde você pode conversar com pessoas
              do mundo todo de forma anônima, sem julgamentos e completamente de graça.
              Sua privacidade é nossa prioridade.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors"
            >
              Baixar Grátis no Android →
            </a>
          </motion.div>
        </section>

        {/* O que é */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-6">O que é um chat anônimo seguro?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">
            Um chat anônimo seguro é uma plataforma onde você pode se comunicar com outras
            pessoas sem precisar revelar informações pessoais como nome, foto ou localização.
            Diferente das redes sociais tradicionais, o foco está na conversa — não no perfil.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">
            O Safe 4 Talk foi criado exatamente para isso: um espaço seguro para praticar
            idiomas, fazer amizades internacionais e ter conversas reais sem o peso do
            julgamento social.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            Ideal para quem quer <strong className="text-white">praticar inglês sem vergonha</strong>,
            conversar com estranhos de forma segura, ou simplesmente conhecer pessoas novas
            ao redor do mundo.
          </p>
        </section>

        {/* Por que escolher */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Por que usar o Safe 4 Talk?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '🔒',
                title: 'Privacidade total',
                desc: 'Sem obrigação de foto ou nome real. Você controla o que compartilha.',
              },
              {
                icon: '🌍',
                title: 'Pessoas do mundo todo',
                desc: 'Conecte com falantes nativos de inglês, espanhol, alemão e muito mais.',
              },
              {
                icon: '🎙',
                title: 'Salas de áudio e vídeo',
                desc: 'Pratique conversação real — muito mais eficaz do que ficar só lendo.',
              },
              {
                icon: '💸',
                title: '100% gratuito',
                desc: 'Acesse salas ao vivo, converse e aprenda sem pagar nada.',
              },
              {
                icon: '🤝',
                title: 'Sem julgamentos',
                desc: 'Comunidade acolhedora onde todo nível é bem-vindo. Errar faz parte.',
              },
              {
                icon: '📱',
                title: 'Android e navegador',
                desc: 'Use no celular ou direto pelo browser, sem precisar instalar nada.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Como funciona o chat anônimo no Safe 4 Talk?</h2>
          <ol className="space-y-6">
            {[
              { n: '01', title: 'Crie sua conta grátis', desc: 'Cadastro rápido via Google ou Facebook. Sem burocracia.' },
              { n: '02', title: 'Escolha uma sala', desc: 'Filtre por idioma, nível ou tema. Há salas para iniciantes até avançados.' },
              { n: '03', title: 'Entre e comece a falar', desc: 'Áudio ou vídeo ao vivo com pessoas reais. Sem roteiro, sem pressão.' },
              { n: '04', title: 'Aprenda na prática', desc: 'A exposição diária ao idioma acelera o aprendizado de forma natural.' },
            ].map((step) => (
              <li key={step.n} className="flex gap-6 items-start">
                <span className="text-4xl font-bold text-indigo-500/30 leading-none">{step.n}</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
          <h2 className="text-3xl font-bold mb-10">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              {
                q: 'O chat é realmente anônimo?',
                a: 'Você não precisa usar nome real nem foto de perfil. As conversas acontecem em salas temáticas sem exposição de dados pessoais.',
              },
              {
                q: 'É seguro conversar com estranhos no Safe 4 Talk?',
                a: 'Sim. A plataforma tem sistema de moderação e os usuários podem reportar comportamentos inadequados. Salas são monitoradas pela comunidade.',
              },
              {
                q: 'Precisa pagar alguma coisa?',
                a: 'Não. O acesso às salas ao vivo é 100% gratuito. Salas exclusivas com professores e mentores são pagas, mas as principais funcionalidades são free.',
              },
              {
                q: 'Funciona para aprender inglês?',
                a: 'Sim, é uma das formas mais eficazes. Você pratica conversação real com falantes nativos e outros estudantes no mesmo nível que você.',
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
