import { SiteHeader } from "./components/SiteHeader"
import { Features } from "./components/Features"
import { Roadmap } from "./components/Roadmap"
import { CTA } from "./components/CTA"
import { Footer } from "./components/Footer"
import Unsubscribe from './pages/Unsubcribe'
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
import { Routes, Route } from 'react-router-dom'

// Router is provided externally (BrowserRouter in main.tsx, StaticRouter in entry-server.tsx)
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full">
            <SiteHeader />
            <Features />
            <Roadmap />
            <CTA />
            <Footer />
          </div>
        }
      />
      <Route path="/unsubscribe" element={<Unsubscribe />} />
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
    </Routes>
  )
}

export default App
