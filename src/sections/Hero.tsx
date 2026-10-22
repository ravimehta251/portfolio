import { ArrowDown, ArrowDownRight, ArrowUpRight, Download, MapPin } from 'lucide-react'
import { Asterisk } from '../components/Identity'
import { profile } from '../data/portfolio'
export default function Hero() {
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <div className="hero-track" aria-hidden="true"><svg viewBox="0 0 1000 900" preserveAspectRatio="none"><path d="M1100 60H580c-190 0-190 235 0 235h55c190 0 190 240 0 240H490c-185 0-185 260 0 260h610" /><path d="M1100 94H580c-145 0-145 167 0 167h55c235 0 235 308 0 308H490c-140 0-140 192 0 192h610" /></svg></div>
    <div className="shell hero-inner">
      <div className="hero-kicker eyebrow"><span className="status-dot" /> ENGINEER BY MIND. BUILDER AT HEART.</div>
      <h1 id="hero-title" className="hero-name"><span>RAVI</span><span>KUMAR<span className="name-period">.</span></span></h1>
      <div className="hero-summary"><p className="hero-role">Backend-Focused<br />Software Engineer<span className="lime-text">.</span></p><p className="hero-description">Building backend systems, real-time applications, and AI-powered experiences with Java and Spring Boot.</p><div className="hero-actions"><a className="button button-lime" href="#projects">View projects <ArrowDownRight size={19} /></a><a className="resume-link" href={profile.resume} download="Ravi-Kumar-Resume.pdf">Download resume <Download size={16} /></a></div></div>
      <div className="hero-portrait-wrap"><Asterisk className="hero-asterisk" /><div className="portrait-label eyebrow" aria-hidden="true">A LITTLE CURIOUS.<br />ALWAYS BUILDING. <ArrowDownRight size={20} /></div><picture className="hero-portrait"><source srcSet="/images/ravi-portrait-768.webp 768w, /images/ravi-portrait.webp 1122w" sizes="(max-width: 700px) 90vw, 48vw" type="image/webp" /><img src="/images/ravi-portrait.webp" width="1122" height="1402" alt="Ravi Kumar, smiling, in a dark T-shirt" fetchPriority="high" decoding="async" /></picture><a className="portrait-contact" href="#contact"><span>Have something in mind?<br /><strong>Contact me</strong></span><span className="portrait-contact-icon"><ArrowUpRight size={29} /></span></a></div>
      <div className="hero-bottom"><span><MapPin size={13} /> BENGALURU, INDIA</span><span>BE ’27 <i /> GRADUATING JULY 2027</span><a href="#about">SCROLL TO EXPLORE <ArrowDown size={15} /></a></div>
    </div>
  </section>
}
