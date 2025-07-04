import { SiteHeader } from "./components/SiteHeader"
import { Features } from "./components/Features"
import { Roadmap } from "./components/Roadmap"
import { CTA } from "./components/CTA"

function App() {
  return (
    <div className="w-full">
      <SiteHeader />
      <Features />
      <Roadmap />
      <CTA />
    </div>
  )
}

export default App
