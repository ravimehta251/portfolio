import { lazy, Suspense, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Github } from '../components/Brands'
import { projects } from '../data/portfolio'
import { ExternalLink, Reveal, SectionHeading } from '../components/Shared'
import RecallDemo from '../components/RecallDemo'
import BidlyDemo from '../components/BidlyDemo'
import ShopMeshDemo from '../components/ShopMeshDemo'
import type { Project } from '../types/portfolio'
const ProjectDetails = lazy(() => import('../components/ProjectDetails'))
const demos = { recall: RecallDemo, bidly: BidlyDemo, shopmesh: ShopMeshDemo }
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  return <section id="projects" className="section container projects-section">
    <div className="projects-heading"><SectionHeading number="03" eyebrow="SELECTED WORK" title={<>Built to solve.<br /><em>Designed to last.</em></>} text="Three projects. Three engineering challenges. A closer look at the systems behind the interface." /><ExternalLink href="https://github.com/ravimehta251" className="text-link all-repos">All repositories</ExternalLink></div>
    <div className="project-list">{projects.map((project, i) => {
      const Demo = demos[project.id]
      return <Reveal key={project.id} className={`project-card project-${project.id}`}><article aria-labelledby={`project-title-${project.id}`}>
        <div className="project-info"><div className="project-eyebrow"><span className="mono">PROJECT / 0{i + 1}</span><span className="project-category">{project.category}</span></div><h3 id={`project-title-${project.id}`}>{project.name}<span className="brand-dot">.</span></h3><h4>{project.title}</h4><p>{project.description}</p><div className="project-tags">{project.stack.slice(0, 6).map(item => <span key={item}>{item}</span>)}</div>
          <div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
          <div className="project-actions"><button className="text-link" onClick={() => setSelected(project)}>Inside the architecture <ArrowUpRight size={17} /></button><ExternalLink href={project.github} className="project-source" label={`${project.name} GitHub repository`}><Github size={17} /> Source</ExternalLink></div>
        </div><div className="project-visual"><Demo /></div>
      </article></Reveal>
    })}</div>
    {selected && <Suspense fallback={<div className="detail-loading" role="status">Loading case study…</div>}><ProjectDetails project={selected} onClose={() => setSelected(null)} /></Suspense>}
  </section>
}
