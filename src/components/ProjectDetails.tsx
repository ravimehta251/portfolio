import { useEffect, useRef } from 'react'
import { Check, X } from 'lucide-react'
import { Github } from './Brands'
import type { Project } from '../types/portfolio'
import { ExternalLink } from './Shared'
export default function ProjectDetails({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current!
    const previouslyFocused = document.activeElement as HTMLElement | null
    element.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { element.close(); document.body.style.overflow = previousOverflow; previouslyFocused?.focus() }
  }, [])
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="detail-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="dialog-inner"><div className="dialog-heading"><span className="eyebrow">ENGINEERING CASE STUDY / {project.category}</span><button className="icon-button" onClick={onClose} aria-label="Close project details" autoFocus><X size={21} /></button></div>
      <h2 id="detail-title">{project.name}<span className="brand-dot">.</span></h2><p className="dialog-subtitle">{project.title}</p>
      <div className="dialog-section"><h3>The problem</h3><p>{project.problem}</p></div><div className="dialog-section"><h3>The solution & architecture</h3><p>{project.solution}</p></div>
      <div className="dialog-section"><h3>Engineering decisions</h3><ul>{project.decisions.map(item => <li key={item}><Check size={15} /><span>{item}</span></li>)}</ul></div>
      <div className="dialog-outcome"><span className="eyebrow">KEY TECHNICAL ACHIEVEMENT</span><p>{project.outcome}</p></div>
      <div className="dialog-section"><h3>Built with</h3><div className="skill-tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div></div>
      <ExternalLink href={project.github} className="button button-primary"><Github size={17} /> Explore the source</ExternalLink>
    </div>
  </dialog>
}
