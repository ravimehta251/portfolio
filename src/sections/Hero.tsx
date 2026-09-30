import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Download, MapPin, Pause, Play } from 'lucide-react'
import { Github, Linkedin } from '../components/Brands'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/portfolio'
import { ExternalLink } from '../components/Shared'

const NetworkScene = lazy(() => import('../three/NetworkScene'))
function StaticNetwork() {
  return <div className="static-network" role="img" aria-label="API gateway connecting services, Kafka, Redis, PostgreSQL, and AI / RAG">
    <svg viewBox="0 0 500 420" aria-hidden="true"><path d="M250 90 90 180 150 320 350 330 420 170 250 90M90 180 420 170M250 90 150 320M250 90 350 330M90 180 350 330" /></svg>
    {['API Gateway', 'Services', 'Kafka', 'Redis', 'PostgreSQL', 'AI / RAG'].map((label, i) => <span key={label} className={`static-node node-${i}`}><i />{label}</span>)}
  </div>
}
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <StaticNetwork /> : this.props.children }
}
export default function Hero() {
  const reduced = useReducedMotion()
  const [desktop, setDesktop] = useState(false)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const query = matchMedia('(min-width: 768px)')
    const update = () => setDesktop(query.matches)
    update(); query.addEventListener('change', update)
    const hero = document.getElementById('home')!
    let inView = true
    const updateVisibility = () => setVisible(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateVisibility() })
    observer.observe(hero); document.addEventListener('visibilitychange', updateVisibility)
    return () => { query.removeEventListener('change', update); observer.disconnect(); document.removeEventListener('visibilitychange', updateVisibility) }
  }, [])
  return <section id="home" className="hero">
    <div className="hero-grid" aria-hidden="true" />
    <div className="container hero-main">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="hero-kicker"><span className="status-dot" /> SOFTWARE ENGINEER <span className="kicker-divider">/</span> JAVA & SPRING BOOT</div>
        <p className="hero-name">Hi, I’m Ravi Kumar <span className="small-cross">✳</span></p>
        <h1>Engineering<br />systems that<br /><span className="headline-accent">go beyond.</span></h1>
        <p className="hero-description">{profile.introduction}</p>
        <div className="hero-actions"><a href="#projects" className="button button-primary">Explore my work <ArrowDownRight size={19} /></a><a href={profile.resume} download="Ravi_Kumar_Resume.pdf" className="button button-secondary">Download resume <Download size={17} /></a></div>
        <div className="hero-socials"><ExternalLink href={profile.github}><Github size={16} /> GitHub</ExternalLink><ExternalLink href={profile.linkedin}><Linkedin size={16} /> LinkedIn</ExternalLink><span className="location"><MapPin size={13} /> Bengaluru, India</span></div>
      </motion.div>
      <motion.div className="hero-visual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 1 }}>
        <div className="scene-heading"><span className="mono">SYSTEM_TOPOLOGY / 01</span><span className="scene-indicator"><span className="status-dot" /> CONNECTED</span></div>
        <div className="scene-stage" data-interactive>
          {desktop && !reduced ? <SceneBoundary><Suspense fallback={<StaticNetwork />}><NetworkScene active={visible && !paused} /></Suspense></SceneBoundary> : <StaticNetwork />}
        </div>
        <div className="scene-footer"><span><span className="mini-square" /> ARCHITECTURE IN MOTION</span>{desktop && !reduced && <button onClick={() => setPaused(!paused)} aria-label={paused ? 'Play 3D animation' : 'Pause 3D animation'}>{paused ? <Play size={12} /> : <Pause size={12} />} {paused ? 'PLAY' : 'PAUSE'}</button>}</div>
        <div className="scene-caption"><span>01 — THINK IN SYSTEMS</span><span>BUILD FOR PEOPLE <ArrowUpRight size={12} /></span></div>
      </motion.div>
    </div>
    <div className="hero-bottom container"><a href="#about" className="scroll-prompt"><ArrowDown size={15} /> SCROLL TO EXPLORE</a><div className="hero-specialties"><span>Backend engineering</span><span>Distributed systems</span><span>Full-stack development</span></div><span className="mono hero-index">PORTFOLIO / 2026</span></div>
  </section>
}
