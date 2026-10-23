import { ArrowUpRight, MoveUpRight } from 'lucide-react'
import { profile } from '../data/portfolio'
export default function About() {
  return <section id="about" className="about-section section-pad" aria-labelledby="about-title"><div className="shell">
    <div className="section-topline"><span className="eyebrow">01 / THE PERSON BEHIND THE CODE</span><span className="eyebrow">CURIOUS BY DEFAULT.</span></div>
    <div className="about-grid"><h2 id="about-title" className="display-heading reveal" data-reveal="text">Good systems.<br />Great <span className="serif-word">questions.</span><br /><span className="outlined-word">Better ideas.</span></h2><div className="about-copy reveal" data-reveal="depth"><span className="tiny-cross" aria-hidden="true">+</span><p className="body-large">I’m Ravi. I build the things<br className="desktop-break" /> that make things work.</p><p>I’m an Information Science and Engineering student with a focus on Java, Spring Boot, and the systems behind a smooth user experience.</p><p>From coordinating distributed services to streaming AI responses, I like working through the details: how data moves, where things can fail, and how to make the whole system fit together. I build the React interfaces, too.</p><a className="text-link" href={profile.github} target="_blank" rel="noopener noreferrer">A look inside my GitHub <ArrowUpRight size={20} /></a></div></div>
    <div className="about-facts reveal" data-reveal="line"><div><span className="eyebrow">MY CORE</span><p>Java + Spring Boot</p></div><div><span className="eyebrow">MY APPROACH</span><p>Understand. Build. Refine.</p></div><a href="#education"><span className="eyebrow">MY NEXT CHAPTER</span><p>Graduating July 2027 <MoveUpRight size={20} /></p></a></div>
  </div></section>
}
