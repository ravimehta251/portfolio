import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import ProjectShowcases from './components/ProjectShowcases'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Contact from './sections/Contact'

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element))
    document.documentElement.classList.add('motion-ready')
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])
  return <>
    <a className="skip-link" href="#about">Skip to content</a>
    <Navbar />
    <main id="main-content">
      <Hero />
      <div className="discipline-strip" aria-label="Core disciplines"><div>JAVA & SPRING BOOT <span>✳</span> DISTRIBUTED SYSTEMS <span>✳</span> REAL-TIME APPLICATIONS <span>✳</span> AI INTEGRATION <span>✳</span></div></div>
      <About /><ProjectShowcases /><Skills /><Education /><Contact />
    </main>
  </>
}
