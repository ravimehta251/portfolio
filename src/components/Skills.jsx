import { Braces, Cpu, Database, Layout, Radio, Server, Wrench } from 'lucide-react';
import { skillGroups } from '../data/portfolio';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
const icons = { code: Braces, server: Server, radio: Radio, database: Database, layout: Layout, wrench: Wrench, cpu: Cpu };

export default function Skills() {
  return <section id="skills" className="section section--tinted"><div className="shell">
    <SectionHeading eyebrow="03 / Technical expertise" title="A backend-first toolkit, organized by system concern." description="Technologies I use across API design, real-time communication, persistence, messaging, delivery, and frontend integration." />
    <div className="skills-grid">
      {skillGroups.map((group, index) => { const Icon = icons[group.icon]; return <Reveal className={`skill-card ${group.title === 'Computer Science' ? 'skill-card--wide' : ''}`} delay={(index % 3) * 0.06} key={group.title}><div className="skill-card__title"><Icon /><h3>{group.title}</h3><span>{String(index + 1).padStart(2, '0')}</span></div><div className="tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></Reveal>; })}
    </div>
  </div></section>;
}
