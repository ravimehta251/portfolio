import { ArrowUpRight, Check, Code2 } from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';
import Reveal from './Reveal';

export default function ProjectCard({ project, index }) {
  return <Reveal as="article" className={`project-card project-card--${project.id}`} delay={index * 0.06}>
    <div className="project-card__head"><span className="project-number">{project.number}</span><div><p>{project.name}</p><h3>{project.title}</h3></div><a className="icon-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.name} on GitHub`}><Code2 /><ArrowUpRight /></a></div>
    <div className="project-intro"><p className="project-description">{project.description}</p><p className="project-proof"><Check size={16} /><span>{project.highlights[0]}</span></p></div>
    <div className="project-layout">
      <ArchitectureDiagram type={project.id} title={project.name} />
      <div className="project-details">
        <div><span className="detail-label">Engineering challenge</span><p>{project.challenge}</p></div>
        <div><span className="detail-label">Architecture decision</span><p>{project.solution}</p></div>
        <details><summary>More engineering outcomes <span aria-hidden="true">+</span></summary><ul>{project.highlights.slice(1).map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></details>
      </div>
    </div>
    <div className="project-footer"><div className="tags tags--compact">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><a className="text-link" href={project.github} target="_blank" rel="noreferrer">Repository <ArrowUpRight size={16} /></a></div>
  </Reveal>;
}
