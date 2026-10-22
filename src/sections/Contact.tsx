import { useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { Asterisk, Monogram } from '../components/Identity'
import { profile } from '../data/portfolio'
export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setCopyError(false); window.setTimeout(() => setCopied(false), 2500) } catch { setCopyError(true) }
  }
  return <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="shell contact-inner">
    <div className="section-topline"><span className="eyebrow">05 / LET’S MAKE SOMETHING COUNT</span><a href="#home" className="eyebrow contact-back">BACK TO TOP <ArrowUp size={16} /></a></div>
    <div className="contact-main reveal"><div><p className="contact-availability"><span className="status-dot" /> OPEN TO INTERNSHIPS & SOFTWARE ENGINEERING OPPORTUNITIES</p><h2 id="contact-title">GOT AN<br /><span className="serif-word">idea?</span><Asterisk className="contact-asterisk" /></h2></div><a className="contact-circle" href={`mailto:${profile.email}`} aria-label="Email Ravi Kumar"><ArrowUpRight strokeWidth={1.2} /><span>LET’S TALK</span></a></div>
    <div className="contact-details"><div><p>Good conversations start good things.<br />Internships, engineering roles, or a project you have in mind.</p><div className="email-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><button onClick={copyEmail} className="copy-email" aria-label={copied ? 'Email copied' : 'Copy email address'} title={copied ? 'Copied!' : 'Copy email'}>{copied ? <Check size={17} /> : <Copy size={17} />}</button></div><span className="copy-message" role="status">{copied ? 'Email copied.' : copyError ? 'Please select the email address to copy it.' : ''}</span></div><div className="social-links"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={19} /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={19} /></a><a href={profile.leetcode} target="_blank" rel="noopener noreferrer">LeetCode <ArrowUpRight size={19} /></a><a href={profile.resume} download="Ravi-Kumar-Resume.pdf">Resume <ArrowUpRight size={19} /></a></div></div>
    <footer className="site-footer"><a className="footer-brand" href="#home" aria-label="Ravi Kumar — back to top"><Monogram /><span>RAVI KUMAR</span></a><span className="eyebrow">A LITTLE CURIOSITY. A LOT OF CODE.</span><span className="eyebrow">© {new Date().getFullYear()} RAVI KUMAR</span></footer>
  </div></section>
}
