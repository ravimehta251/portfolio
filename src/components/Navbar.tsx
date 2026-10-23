import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Monogram } from './Identity'
import '../navigation.css'

const links = [['projects', 'The work'], ['about', 'The person'], ['skills', 'The toolkit']] as const
const mobileQuery = '(max-width: 700px)'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(() => window.matchMedia(mobileQuery).matches)
  const navigation = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const closing = useRef(false)

  const closeMenu = useCallback((restoreFocus = false) => {
    closing.current = true
    setOpen(false)
    if (restoreFocus) toggle.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    const media = window.matchMedia(mobileQuery)
    const onResize = () => {
      setMobile(media.matches)
      if (!media.matches) closeMenu()
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    media.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      media.removeEventListener('change', onResize)
    }
  }, [closeMenu])

  useEffect(() => {
    if (!open || !mobile) return
    closing.current = false
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = () => [
      ...Array.from(navigation.current?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? []),
      ...(toggle.current ? [toggle.current] : []),
    ]
    const initialFocus = window.requestAnimationFrame(() => {
      if (!closing.current) focusables()[0]?.focus()
    })
    const onKey = (event: KeyboardEvent) => {
      if (closing.current) return
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu(true)
      } else if (event.key === 'Tab') {
        const items = focusables()
        const active = document.activeElement as HTMLAnchorElement | HTMLButtonElement
        const index = items.indexOf(active)
        const next = event.shiftKey ? (index <= 0 ? items.length - 1 : index - 1) : (index + 1) % items.length
        event.preventDefault()
        items[next]?.focus()
      }
    }
    const onOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !navigation.current?.contains(event.target) && !toggle.current?.contains(event.target)) {
        closeMenu()
        const clickedControl = event.target instanceof Element && event.target.closest('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')
        // Let an outside control receive the click's native focus. Background clicks return to the toggle.
        if (!clickedControl) window.requestAnimationFrame(() => toggle.current?.focus({ preventScroll: true }))
      }
    }
    const onFocus = (event: FocusEvent) => {
      if (!closing.current && event.target instanceof Node && !navigation.current?.contains(event.target) && event.target !== toggle.current) {
        focusables()[0]?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    document.addEventListener('focusin', onFocus)
    return () => {
      window.cancelAnimationFrame(initialFocus)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onOutside)
      document.removeEventListener('focusin', onFocus)
    }
  }, [open, mobile, closeMenu])

  function followAnchor(event: MouseEvent<HTMLAnchorElement>) {
    if (!mobile || !open) return
    closeMenu()
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
    const destination = document.getElementById(event.currentTarget.hash.slice(1))
    // Retain native hash/history/scroll behavior while moving keyboard focus to its destination.
    window.requestAnimationFrame(() => {
      if (!destination) return
      const hadTabIndex = destination.hasAttribute('tabindex')
      if (!hadTabIndex) destination.setAttribute('tabindex', '-1')
      destination.focus({ preventScroll: true })
      if (!hadTabIndex) destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), { once: true })
    })
  }

  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open && mobile ? 'has-open-menu' : ''}`}>
    <div className="shell header-inner">
      <a className="brand" href="#home" aria-label="Ravi Kumar — home" onClick={followAnchor}><Monogram /><span>RAVI<br />KUMAR<span className="brand-period">.</span></span></a>
      <nav ref={navigation} id="site-navigation" className={`main-navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation" inert={mobile && !open} aria-hidden={mobile && !open ? true : undefined}>
        {links.map(([id, text], index) => <a href={`#${id}`} key={id} onClick={followAnchor} style={{ '--nav-order': index } as CSSProperties}><span className="nav-index">0{index + 1}</span><span className="nav-label">{text}</span><ArrowUpRight size={15} aria-hidden="true" /></a>)}
        <a className="mobile-contact" href="#contact" onClick={followAnchor} style={{ '--nav-order': 3 } as CSSProperties}>Let’s talk <ArrowUpRight size={18} aria-hidden="true" /></a>
      </nav>
      <a className="header-contact" href="#contact" onClick={followAnchor}>Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></a>
      <button ref={toggle} className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open && mobile} aria-controls="site-navigation" onClick={() => {
        if (open) closeMenu(true)
        else { closing.current = false; setOpen(true) }
      }}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    </div>
  </header>
}
