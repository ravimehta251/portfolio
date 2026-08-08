import { projects } from '../data/portfolio';
import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';
export default function Projects() { return <section id="projects" className="section shell"><SectionHeading eyebrow="02 / Featured work" title="Systems designed around real engineering constraints." description="Each case study starts with a failure mode or coordination problem, then shows the architecture used to address it." /><div className="projects-list">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div></section>; }
