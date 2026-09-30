import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Achievements from './sections/Achievements'
import Education from './sections/Education'
import Contact from './sections/Contact'
import { ArrowUp } from 'lucide-react'
export default function App() {
  return <><a className="skip-link" href="#about">Skip to content</a><Navbar /><Cursor />
    <main><Hero /><About /><Skills /><Projects /><Achievements /><Education /><Contact /></main>
    <footer className="site-footer container"><a className="wordmark" href="#home">ravi<span className="brand-dot">.</span></a><p>Ravi Kumar · Built with intent.</p><a href="#home" className="back-top">Back to top <ArrowUp size={14} /></a></footer>
  </>
}
