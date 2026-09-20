import { Navbar } from "./components/Navbar"
import { SiteHeader } from "./components/SiteHeader"
import { Features } from "./components/Features"
import { HowItWorks } from "./components/HowItWorks"
import { Roadmap } from "./components/Roadmap"
import { CTA } from "./components/CTA"
import { Footer } from "./components/Footer"
import Unsubscribe from './pages/Unsubcribe'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import Support from './pages/Support'
import ChatAnonimoSeguro from './pages/ChatAnonimoSeguro'
import PraticarInglesAoVivo from './pages/PraticarInglesAoVivo'
import AppParaPraticarIngles from './pages/AppParaPraticarIngles'
import ConversarComNativosGratis from './pages/ConversarComNativosGratis'
import AprenderInglesSemCurso from './pages/AprenderInglesSemCurso'
import SalasDeConversacaoIngles from './pages/SalasDeConversacaoIngles'
import PraticarInglesComMedo from './pages/PraticarInglesComMedo'
import InglesParaTrabalho from './pages/InglesParaTrabalho'
import AlternativaDuolingo from './pages/AlternativaDuolingo'
import ComoMelhorarSotaqueIngles from './pages/ComoMelhorarSotaqueIngles'
import PraticarEspanholAoVivo from './pages/PraticarEspanholAoVivo'
import AprenderAlemaoFalando from './pages/AprenderAlemaoFalando'
import ConversarComEstranhosOnline from './pages/ConversarComEstranhosOnline'
import ChatParaConhecerPessoas from './pages/ChatParaConhecerPessoas'
import FazerAmigosOnline from './pages/FazerAmigosOnline'
import ChatComEstrangeiros from './pages/ChatComEstrangeiros'
import TeacherProfile from './pages/TeacherProfile'
import { Routes, Route } from 'react-router-dom'

// Router is provided externally (BrowserRouter in main.tsx, StaticRouter in entry-server.tsx)
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full">
            <Navbar />
            <SiteHeader />
            <Features />
            <HowItWorks />
            <Roadmap />
            <CTA />
            <Footer />
          </div>
        }
      />
      <Route path="/unsubscribe" element={<Unsubscribe />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfUse />} />
      <Route path="/support" element={<Support />} />
      <Route path="/suporte" element={<Support />} />
      <Route path="/chat-anonimo-seguro" element={<ChatAnonimoSeguro />} />
      <Route path="/praticar-ingles-ao-vivo" element={<PraticarInglesAoVivo />} />
      <Route path="/app-para-praticar-ingles" element={<AppParaPraticarIngles />} />
      <Route path="/conversar-com-nativos-gratis" element={<ConversarComNativosGratis />} />
      <Route path="/aprender-ingles-sem-curso" element={<AprenderInglesSemCurso />} />
      <Route path="/salas-de-conversacao-ingles" element={<SalasDeConversacaoIngles />} />
      <Route path="/praticar-ingles-com-medo" element={<PraticarInglesComMedo />} />
      <Route path="/ingles-para-trabalho" element={<InglesParaTrabalho />} />
      <Route path="/alternativa-duolingo" element={<AlternativaDuolingo />} />
      <Route path="/como-melhorar-sotaque-ingles" element={<ComoMelhorarSotaqueIngles />} />
      <Route path="/praticar-espanhol-ao-vivo" element={<PraticarEspanholAoVivo />} />
      <Route path="/aprender-alemao-falando" element={<AprenderAlemaoFalando />} />
      <Route path="/conversar-com-estranhos-online" element={<ConversarComEstranhosOnline />} />
      <Route path="/chat-para-conhecer-pessoas" element={<ChatParaConhecerPessoas />} />
      <Route path="/fazer-amigos-online" element={<FazerAmigosOnline />} />
      <Route path="/chat-com-estrangeiros" element={<ChatComEstrangeiros />} />
      {/*
        Last on purpose, after every known route.

        It carries the teacher's own link — safe4talk.com/@handle, the one the panel tells them
        to post on Instagram — which until now matched nothing and rendered a blank page. It
        cannot be written as `/@:handle`: React Router matches params as whole segments, so a
        static prefix inside one never matches. The component reads the slug and decides.

        It also ends the blank page on every other unknown URL, which was the same silence.
      */}
      <Route path="/:slug" element={<TeacherProfile />} />
    </Routes>
  )
}

export default App
