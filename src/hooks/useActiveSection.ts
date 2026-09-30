import { useEffect, useState } from 'react'
export function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const update = () => {
      let current = 'home'
      document.querySelectorAll<HTMLElement>('main > section[id]').forEach(section => { if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) current = section.id })
      setActive(current)
    }
    window.addEventListener('scroll', update, { passive: true }); update()
    return () => window.removeEventListener('scroll', update)
  }, [])
  return active
}
