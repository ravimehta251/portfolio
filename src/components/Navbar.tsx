import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Monogram } from './Identity'
const links = [['projects', 'The work'], ['about', 'The person'], ['skills', 'The toolkit']] as const
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey) }
  }, [open])
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}><div className="shell header-inner">
    <a className="brand" href="#home" aria-label="Ravi Kumar — home" onClick={() => setOpen(false)}><Monogram /><span>RAVI<br />KUMAR<span className="brand-period">.</span></span></a>
    <nav id="site-navigation" className={`main-navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation">{links.map(([id, text], index) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)}><span className="nav-index">0{index + 1}</span>{text}<ArrowUpRight size={15} /></a>)}<a className="mobile-contact" href="#contact" onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={18} /></a></nav>
    <a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={17} /></a>
    <button ref={toggle} className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
  </div></header>
}
