import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Braces, Database, Layers, Server, Sparkles } from 'lucide-react'
import { skillGroups } from '../data/portfolio'
import { Reveal, SectionHeading } from '../components/Shared'
export default function Skills() {
  const [selected, setSelected] = useState(1)
  const group = skillGroups[selected]
  return <section id="skills" className="section stack-section"><div className="container">
    <SectionHeading number="02" eyebrow="ENGINEERING STACK" title={<>Different layers.<br /><em>One connected system.</em></>} text="Explore the tools behind the work. Every layer has a purpose." />
    <Reveal className="stack-workspace"><div className="stack-sidebar" role="tablist" aria-label="Engineering skill groups" aria-orientation="vertical">{skillGroups.map((item, i) => <button type="button" role="tab" id={`stack-tab-${i}`} aria-selected={selected === i} aria-controls="stack-panel" key={item.name} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)} onKeyDown={event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
        event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? skillGroups.length - 1 : (i + (event.key === 'ArrowDown' ? 1 : -1) + skillGroups.length) % skillGroups.length
        setSelected(next); document.getElementById(`stack-tab-${next}`)?.focus()
      }
    }} tabIndex={selected === i ? 0 : -1}><span>{item.code}</span>{item.name}<ArrowUpRight size={15} /></button>)}</div>
      <div className="stack-content" role="tabpanel" id="stack-panel" aria-labelledby={`stack-tab-${selected}`} tabIndex={0}>
        <div className="stack-visual" aria-hidden="true"><div className="stack-orbit orbit-one" /><div className="stack-orbit orbit-two" /><div className="stack-core"><Layers size={35} /><span>ENGINEERING</span></div><span className="orbit-icon orbit-a"><Server size={21} /></span><span className="orbit-icon orbit-b"><Database size={21} /></span><span className="orbit-icon orbit-c"><Braces size={21} /></span><span className="orbit-icon orbit-d"><Sparkles size={21} /></span></div>
        <AnimatePresence mode="wait"><motion.div key={selected} className="stack-details" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><span className="eyebrow">LAYER {group.code} / {group.name.toUpperCase()}</span><h3>{group.description}</h3><div className="skill-tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div><div className="used-in"><span className="status-dot" /><p>{group.usedIn}</p></div></motion.div></AnimatePresence>
      </div>
    </Reveal>
  </div></section>
}
