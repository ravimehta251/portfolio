import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import ProjectShowcases from './components/ProjectShowcases'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Contact from './sections/Contact'
import Architecture from './components/Architecture'

export default function App() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined
    const root = document.documentElement
    const revealAll = () => {
      observer?.disconnect()
      root.classList.remove('motion-ready')
    }
    const initialize = () => {
      revealAll()
      if (media.matches || !('IntersectionObserver' in window)) return
      try {
        observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer?.unobserve(entry.target)
            }
          })
        }, { threshold: 0 })
        document.querySelectorAll('.reveal').forEach(element => observer?.observe(element))
        root.classList.add('motion-ready')
      } catch { revealAll() }
    }
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return
      let element = event.target.closest('.reveal')
      while (element) {
        element.classList.add('is-visible')
        observer?.unobserve(element)
        element = element.parentElement?.closest('.reveal') ?? null
      }
    }
    initialize()
    media.addEventListener('change', initialize)
    document.addEventListener('focusin', onFocus)
    return () => {
      revealAll()
      media.removeEventListener('change', initialize)
      document.removeEventListener('focusin', onFocus)
    }
  }, [])
  return <>
    <a className="skip-link" href="#about">Skip to content</a>
    <Navbar />
    <main id="main-content">
      <Hero />
      <div className="discipline-strip" aria-label="Core disciplines"><div>JAVA & SPRING BOOT <span>✳</span> DISTRIBUTED SYSTEMS <span>✳</span> REAL-TIME APPLICATIONS <span>✳</span> AI INTEGRATION <span>✳</span></div></div>
      <About /><ProjectShowcases /><Architecture /><Skills /><Education /><Contact />
    </main>
  </>
}
