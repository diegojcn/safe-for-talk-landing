import { SiteHeader } from "./components/SiteHeader"
import { Features } from "./components/Features"
import { Roadmap } from "./components/Roadmap"
import { CTA } from "./components/CTA"
import { Footer } from "./components/Footer"
import Unsubscribe from './pages/Unsubcribe'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  return (
     <Router>
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
      </Routes>
    </Router>
  )
}

export default App
