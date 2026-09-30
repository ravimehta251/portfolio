import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.6, delay }}>{children}</motion.div>
}
export function SectionHeading({ number, eyebrow, title, text }: { number: string; eyebrow: string; title: ReactNode; text?: string }) {
  return <Reveal className="section-heading"><div className="eyebrow"><span className="section-number">{number}</span>{eyebrow}</div><h2>{title}</h2>{text && <p>{text}</p>}</Reveal>
}
export function ExternalLink({ href, children, className = '', label }: { href: string; children: ReactNode; className?: string; label?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>{children}<ArrowUpRight size={16} aria-hidden="true" /></a>
}
