import { useEffect, useRef } from 'react'
export default function Cursor() {
  const cursor = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const move = (event: PointerEvent) => {
      if (!cursor.current) return
      cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      cursor.current.classList.add('visible')
      cursor.current.classList.toggle('interactive', !!(event.target as HTMLElement).closest('a, button, [data-interactive]'))
    }
    const leave = () => cursor.current?.classList.remove('visible')
    window.addEventListener('pointermove', move, { passive: true }); document.addEventListener('pointerleave', leave)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave) }
  }, [])
  return <div ref={cursor} className="cursor" aria-hidden="true"><span /></div>
}
