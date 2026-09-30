import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open])
  return <header className="nav-shell"><nav className="navbar" aria-label="Main navigation">
    <a className="wordmark" href="#home" onClick={() => setOpen(false)} aria-label="Ravi Kumar home">ravi<span className="brand-dot">.</span><span className="wordmark-suffix">/ dev</span></a>
    <div className={`nav-links ${open ? 'is-open' : ''}`} id="main-menu">{navigation.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''} aria-current={active === item.id ? 'location' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}</div>
    <a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </nav></header>
}
