import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Download, MapPin } from 'lucide-react'
import { Asterisk } from '../components/Identity'
import { profile } from '../data/portfolio'
export default function Hero() {
  const hero = useRef<HTMLElement>(null)
  const portrait = useRef<HTMLPictureElement>(null)
  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const element = hero.current
    const picture = portrait.current
    if (!element || !picture) return
    let frame = 0
    const reset = () => {
      window.cancelAnimationFrame(frame)
      picture.style.setProperty('--portrait-x', '0px')
      picture.style.setProperty('--portrait-y', '0px')
    }
    const move = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1))
        const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1))
        picture.style.setProperty('--portrait-x', `${x * 7}px`)
        picture.style.setProperty('--portrait-y', `${y * 5}px`)
      })
    }
    const sync = () => {
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', reset)
      reset()
      if (media.matches) {
        element.addEventListener('pointermove', move, { passive: true })
        element.addEventListener('pointerleave', reset)
      }
    }
    sync()
    media.addEventListener('change', sync)
    return () => {
      media.removeEventListener('change', sync)
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', reset)
      reset()
    }
  }, [])
  return <section ref={hero} className="hero" id="home" aria-labelledby="hero-title">
    <div className="hero-circuit" aria-hidden="true"><svg viewBox="0 0 900 800" fill="none"><path d="M70 80H330L430 180H830M170 280H430L530 380H830M70 480H330L430 580H830M530 180V380M630 380V580" /><g><circle cx="430" cy="180" r="5"/><circle cx="530" cy="380" r="5"/><circle cx="430" cy="580" r="5"/><circle cx="630" cy="580" r="5"/></g></svg></div>
    <div className="shell hero-inner">
      <div className="hero-kicker eyebrow"><span className="status-dot" /> ENGINEER BY MIND. BUILDER AT HEART.</div>
      <h1 id="hero-title" className="hero-name" aria-label="Ravi Kumar"><span className="hero-name-line" aria-hidden="true"><span>RAVI</span></span><span className="hero-name-line" aria-hidden="true"><span>KUMAR<span className="name-period">.</span></span></span></h1>
      <div className="hero-summary"><p className="hero-role">Backend-Focused<br />Software Engineer<span className="lime-text">.</span></p><p className="hero-description">Building backend systems, real-time applications, and AI-powered experiences with Java and Spring Boot.</p><div className="hero-actions"><a className="button button-lime" href="#projects">View projects <ArrowDownRight size={19} /></a><a className="resume-link" href={"https://ravisingh.online/resume.pdf"} download="Ravi-Kumar-Resume.pdf">Download resume <Download size={16} /></a></div></div>
      <div className="hero-portrait-wrap"><Asterisk className="hero-asterisk" /><div className="portrait-label eyebrow" aria-hidden="true">A LITTLE CURIOUS.<br />ALWAYS BUILDING. <ArrowDownRight size={20} /></div><picture ref={portrait} className="hero-portrait"><source srcSet="/images/ravi-portrait-768.webp 768w, /images/ravi-portrait.webp 1122w" sizes="(max-width: 700px) 90vw, 48vw" type="image/webp" /><img src="/images/ravi-portrait.webp" width="1122" height="1402" alt="Ravi Kumar, smiling, in a dark T-shirt" fetchPriority="high" decoding="async" /></picture><a className="portrait-contact" href="#contact"><span>Have something in mind?<br /><strong>Contact me</strong></span><span className="portrait-contact-icon"><ArrowUpRight size={29} /></span></a></div>
      <div className="hero-bottom"><span><MapPin size={13} /> BENGALURU, INDIA</span><span>BE ’27 <i /> GRADUATING JULY 2027</span><a href="#about">SCROLL TO EXPLORE <ArrowDown size={15} /></a></div>
    </div>
  </section>
}
