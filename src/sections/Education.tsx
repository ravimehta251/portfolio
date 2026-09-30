import { ArrowUpRight, GraduationCap, MapPin } from 'lucide-react'
import { education } from '../data/portfolio'
import { Reveal, SectionHeading } from '../components/Shared'
export default function Education() {
  return <section id="education" className="section container education-section"><SectionHeading number="05" eyebrow="ENGINEERING JOURNEY" title={<>A foundation for<br /><em>what comes next.</em></>} />
    <Reveal className="education-layout"><div className="education-timeline"><span className="timeline-marker" /><span className="mono">2023 — 2027</span><p>Learning the fundamentals.<br />Building beyond them.</p><span className="timeline-end">EXPECTED JULY 2027 <ArrowUpRight size={13} /></span></div>
      <div className="education-card"><div className="education-top"><span className="education-icon"><GraduationCap size={25} /></span><span className="mono">{education.dates}</span></div><h3>{education.university} <span>({education.abbreviation})</span></h3><p className="education-location"><MapPin size={13} /> {education.location}</p><div className="degree-row"><div><h4>{education.degree}</h4><p>{education.field}</p></div><div className="cgpa"><strong>{education.cgpa}<span>/10</span></strong><span className="mono">CGPA</span></div></div><div className="coursework"><span className="eyebrow">RELEVANT COURSEWORK</span><div>{education.coursework.map(course => <span key={course}>{course}</span>)}</div></div></div>
    </Reveal>
  </section>
}
