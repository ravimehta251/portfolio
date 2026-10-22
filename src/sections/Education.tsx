import { ArrowUpRight, Code2, GraduationCap, Trophy } from 'lucide-react'
import { education, profile } from '../data/portfolio'
export default function Education() {
  return <section id="education" className="education-section section-pad" aria-labelledby="education-title"><div className="shell">
    <div className="section-topline"><span className="eyebrow">04 / ALWAYS IN PROGRESS</span><span className="eyebrow">LEARN. BUILD. REPEAT.</span></div>
    <div className="education-grid reveal"><div><h2 id="education-title" className="display-heading">The long<br /><span className="serif-word">game.</span></h2><p className="education-intro">A foundation in engineering.<br />An appetite for the next challenge.</p></div><div className="education-record"><GraduationCap size={28} strokeWidth={1.4} /><span className="eyebrow">SEPTEMBER 2023 — JULY 2027</span><h3>BE, Information Science<br />and Engineering</h3><p>{education.university}</p><div className="education-meta"><span><strong>8.1<span>/10</span></strong><small>CGPA</small></span><span><strong>2027</strong><small>EXPECTED GRADUATION · JULY</small></span></div></div></div>
    <div id="achievements" className="achievement-grid reveal"><a href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="achievement"><Code2 size={24} /><div><strong>500<span>+</span></strong><h3>Problems. Patterns. Progress.</h3><p>DSA problems solved on LeetCode.</p></div><ArrowUpRight className="achievement-arrow" size={25} /></a><div className="achievement"><Trophy size={24} /><div><strong>03<span> / podium</span></strong><h3>2nd Runner-Up</h3><p>JSSATE Hackathon · Snap2Clean</p></div><span className="achievement-star" aria-hidden="true">✳</span></div></div>
  </div></section>
}
