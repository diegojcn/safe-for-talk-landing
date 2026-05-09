import { SiteHeader } from "./components/SiteHeader"
import { Features } from "./components/Features"
import { Roadmap } from "./components/Roadmap"
import { CTA } from "./components/CTA"
import { Footer } from "./components/Footer"
import Unsubscribe from './pages/Unsubcribe'
import ChatAnonimoSeguro from './pages/ChatAnonimoSeguro'
import PraticarInglesAoVivo from './pages/PraticarInglesAoVivo'
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
    </Routes>
  )
}

export default App
