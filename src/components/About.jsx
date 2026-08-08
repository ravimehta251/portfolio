import { createElement } from 'react';
import { Braces, Network, ShieldCheck, Waypoints } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const principles = [
  [Network, 'Consistency under concurrency', 'Reason about race conditions, ownership, locking, and transaction boundaries.'],
  [Waypoints, 'Event-driven communication', 'Design service interactions for decoupling, failure recovery, and eventual consistency.'],
  [ShieldCheck, 'Secure by design', 'Keep authentication, authorization, and sensitive data handling within the architecture.'],
  [Braces, 'Strong fundamentals', 'Apply data structures, networking, databases, and operating-system concepts to implementation choices.'],
];

export default function About() {
  return <section id="about" className="section shell">
    <SectionHeading eyebrow="01 / About" title="Engineering beyond the happy path." description="I focus on the behavior that appears when systems are concurrent, distributed, stateful, or under failure—not only when a CRUD request succeeds." />
    <div className="about-grid">
      <Reveal className="about-copy">
        <p>I am an Information Science and Engineering student at Visvesvaraya Technological University with a strong interest in backend engineering and distributed systems.</p>
        <p>I enjoy solving problems involving concurrency, consistency, service communication, authentication, and real-time data delivery. My work includes a race-condition-safe auction platform, an event-driven e-commerce system, and an email campaign automation platform.</p>
        <a className="text-link" href="#projects">See how those systems are designed <span>→</span></a>
      </Reveal>
      <div className="principles-grid">
        {principles.map(([PrincipleIcon, title, description], index) => <Reveal className="principle" delay={index * 0.07} key={title}>{createElement(PrincipleIcon)}<h3>{title}</h3><p>{description}</p></Reveal>)}
      </div>
    </div>
  </section>;
}
