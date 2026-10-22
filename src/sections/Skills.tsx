import { Asterisk } from '../components/Identity'
import { toolkit } from '../data/portfolio'
export default function Skills() {
  return <section id="skills" className="skills-section section-pad" aria-labelledby="skills-title"><div className="shell">
    <div className="section-topline"><span className="eyebrow">03 / THE TOOLKIT</span><span className="eyebrow">THE RIGHT TOOL. THE RIGHT REASON.</span></div>
    <div className="skills-intro reveal"><h2 id="skills-title" className="display-heading">Under<br />the <span className="serif-word">hood.</span></h2><div><Asterisk className="skills-asterisk" /><p>Strong foundations.<br />Room to keep learning.</p></div></div>
    <div className="skills-list">{toolkit.map((group, index) => <div className="skill-row reveal" key={group.name}><span className="skill-number eyebrow">0{index + 1}</span><h3>{group.name}</h3><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>)}</div><p className="skills-note eyebrow"><span /> BUILT WITH THESE. STILL EXPLORING WHAT’S NEXT.</p>
  </div></section>
}
