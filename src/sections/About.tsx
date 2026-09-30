import { ArrowUpRight, Boxes, BrainCircuit, Radio, Terminal } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Shared'
export default function About() {
  return <section id="about" className="section container">
    <div className="about-layout"><SectionHeading number="01" eyebrow="THE ENGINEER BEHIND THE CODE" title={<>Good software starts<br />with <em>good thinking.</em></>} />
      <Reveal className="about-copy"><p>I’m Ravi, a software engineer in Bengaluru, studying Information Science and Engineering at VTU. My focus is Java and Spring Boot: turning complex problems into reliable backend systems.</p><p>My projects explore the parts that make engineering interesting—coordinating distributed services, protecting concurrent writes, and connecting private documents to intelligent, cited answers. I bring those systems to life with React interfaces and cloud deployments.</p><a href="#projects" className="text-link">See the thinking in the work <ArrowUpRight size={17} /></a></Reveal></div>
    <div className="principle-grid">{[
      { Icon: Terminal, title: 'Backend first', text: 'Java, Spring Boot, and secure APIs are the foundation.', code: '01 / FOUNDATION' },
      { Icon: Boxes, title: 'Systems that cooperate', text: 'Microservices, Kafka sagas, and distributed locking.', code: '02 / ARCHITECTURE' },
      { Icon: BrainCircuit, title: 'Intelligence with context', text: 'RAG pipelines, semantic retrieval, and source citations.', code: '03 / INTELLIGENCE' },
      { Icon: Radio, title: 'Built for the moment', text: 'Live bids over WebSocket. Streaming answers over SSE.', code: '04 / REAL-TIME' },
    ].map(({ Icon, title, text, code }, i) => <Reveal key={title} delay={i * 0.05} className="principle"><div className="principle-icon"><Icon size={23} /></div><span className="mono">{code}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
  </section>
}
