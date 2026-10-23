import { useEffect, useRef, useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { Asterisk, Monogram } from '../components/Identity'
import { profile } from '../data/portfolio'
import '../contact.css'

type CopyState = 'idle' | 'copying' | 'copied' | 'error'

export default function Contact() {
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const resetTimer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  async function copyEmail() {
    window.clearTimeout(resetTimer.current)
    setCopyState('copying')
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
      resetTimer.current = window.setTimeout(() => setCopyState('idle'), 3500)
    } catch {
      setCopyState('error')
    }
  }

  const copyMessage = copyState === 'copied' ? 'Email address copied.' : copyState === 'error' ? 'Copy unavailable. Select the email address to copy it.' : copyState === 'copying' ? 'Copying email address…' : ''

  return <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="shell contact-inner">
    <div className="section-topline"><span className="eyebrow">05 / LET’S MAKE SOMETHING COUNT</span><a href="#home" className="eyebrow contact-back">BACK TO TOP <ArrowUp size={16} aria-hidden="true" /></a></div>
    <div className="contact-main reveal"><div><p className="contact-availability"><span className="status-dot" /> OPEN TO INTERNSHIPS & SOFTWARE ENGINEERING OPPORTUNITIES</p><h2 id="contact-title">GOT AN<br /><span className="serif-word">idea?</span><Asterisk className="contact-asterisk" /></h2></div><a className="contact-circle" href={`mailto:${profile.email}`} aria-label="Email Ravi Kumar"><ArrowUpRight strokeWidth={1.2} aria-hidden="true" /><span>LET’S TALK</span></a></div>
    <div className="contact-details reveal"><div><p>Good conversations start good things.<br />Internships, engineering roles, or a project you have in mind.</p><div className="email-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><button type="button" onClick={copyEmail} className="copy-email" data-copy-state={copyState} disabled={copyState === 'copying'} aria-label={copyState === 'copied' ? 'Email copied. Copy again' : 'Copy email address'} aria-describedby="copy-feedback" title={copyState === 'copied' ? 'Copied!' : 'Copy email'}>{copyState === 'copied' ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}</button></div><span id="copy-feedback" className="copy-message" data-copy-state={copyState} role="status" aria-live="polite" aria-atomic="true">{copyMessage}</span></div><div className="social-links"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={19} aria-hidden="true" /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={19} aria-hidden="true" /></a><a href={profile.leetcode} target="_blank" rel="noopener noreferrer">LeetCode <ArrowUpRight size={19} aria-hidden="true" /></a><a href={profile.resume} download="Ravi-Kumar-Resume.pdf">Resume <ArrowUpRight size={19} aria-hidden="true" /></a></div></div>
    <footer className="site-footer"><a className="footer-brand" href="#home" aria-label="Ravi Kumar — back to top"><Monogram /><span>RAVI KUMAR</span></a><span className="eyebrow">A LITTLE CURIOSITY. A LOT OF CODE.</span><span className="eyebrow">© {new Date().getFullYear()} RAVI KUMAR</span></footer>
  </div></section>
}
