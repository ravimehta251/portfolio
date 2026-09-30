import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Github, Linkedin } from '../components/Brands'
import { profile } from '../data/portfolio'
import { ExternalLink, Reveal } from '../components/Shared'
type Fields = { name: string; email: string; message: string }
export default function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [status, setStatus] = useState('')
  const [copied, setCopied] = useState(false)
  const validate = (event: FormEvent) => {
    event.preventDefault()
    const next: Partial<Fields> = {}
    if (!fields.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = 'Please enter a valid email address.'
    if (fields.message.trim().length < 10) next.message = 'Please write at least 10 characters.'
    setErrors(next); setStatus('')
    if (Object.keys(next).length) { document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus(); return }
    const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name.trim()}`)
    const body = encodeURIComponent(`Name: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\n\n${fields.message.trim()}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('Your email draft is ready in your mail app. Review it there and send it when you’re ready. Nothing has been sent by this website.')
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true) }
    catch { setStatus('Copy is unavailable here. You can select the email address or use the email link.') }
  }
  return <section id="contact" className="section contact-section"><div className="container contact-layout">
    <Reveal className="contact-copy"><div className="eyebrow"><span className="section-number">06</span>THE NEXT GREAT SYSTEM</div><h2>Let’s build<br />something<br /><em>that scales.</em><ArrowUpRight className="contact-arrow" size={65} strokeWidth={1} /></h2><p>Have an engineering challenge, a role, or an idea?<br />Let’s start a conversation.</p><div className="contact-email-row"><a href={`mailto:${profile.email}`} className="contact-email">{profile.email}</a><button className="icon-button" onClick={copy} aria-label={copied ? 'Email address copied' : 'Copy email address'}>{copied ? <Check size={17} /> : <Copy size={17} />}</button></div><div className="contact-socials"><ExternalLink href={profile.github}><Github size={17} /> GitHub</ExternalLink><ExternalLink href={profile.linkedin}><Linkedin size={17} /> LinkedIn</ExternalLink></div><div className="contact-location"><span><MapPin size={14} />{profile.location}</span><a href="tel:+917707000206"><Phone size={13} />{profile.phone}</a></div></Reveal>
    <Reveal className="contact-form-wrap" delay={0.1}><div className="form-header"><Mail size={20} /><h3>A good place to start.</h3></div><form noValidate onSubmit={validate}>{(['name', 'email', 'message'] as const).map(field => <div className="form-field" key={field}><label htmlFor={`contact-${field}`}>{field === 'name' ? 'Your name' : field === 'email' ? 'Email address' : 'What are you thinking?'}<span> *</span></label>{field === 'message' ? <textarea id={`contact-${field}`} name={field} rows={4} maxLength={5000} placeholder="Tell me a little about your project or opportunity…" value={fields[field]} onChange={event => setFields({ ...fields, [field]: event.target.value })} aria-invalid={!!errors[field]} aria-describedby={errors[field] ? `${field}-error` : undefined} required /> : <input id={`contact-${field}`} name={field} type={field === 'email' ? 'email' : 'text'} autoComplete={field} maxLength={field === 'name' ? 100 : 254} placeholder={field === 'name' ? 'Your name' : 'you@company.com'} value={fields[field]} onChange={event => setFields({ ...fields, [field]: event.target.value })} aria-invalid={!!errors[field]} aria-describedby={errors[field] ? `${field}-error` : undefined} required />}{errors[field] && <p id={`${field}-error`} className="field-error">{errors[field]}</p>}</div>)}<button className="button button-primary form-submit" type="submit">Create email draft <Send size={16} /></button><p className="form-note">Opens your email app with a prepared draft. You send it from there.</p><p className="form-status" role="status">{status}</p></form></Reveal>
  </div></section>
}
