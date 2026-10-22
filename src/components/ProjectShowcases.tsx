import { useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, CreditCard, Database, FileText, Layers3, LockKeyhole, Network, Package, Plus, Search, ShieldCheck, Sparkles, Terminal, X } from 'lucide-react'
import { projects } from '../data/portfolio'
import '../projects.css'

function RecallIllustration() {
  return (
    <figure className="project-art recall-art" aria-label="Recall interface concept showing a document library and a source-cited answer">
      <div className="recall-canvas" aria-hidden="true">
        <div className="recall-wordmark"><span className="recall-mark"><Layers3 size={18} /></span> recall<span className="concept-version">WORKSPACE / 01</span></div>
        <div className="recall-window">
          <div className="recall-sidebar">
            <div className="recall-space"><span>R</span><div>My knowledge space<small>Personal workspace</small></div><ChevronDown size={12} /></div>
            <div className="recall-side-label">LIBRARY <Plus size={12} /></div>
            <div className="recall-file is-current"><FileText size={14} /><span>System design notes<small>PDF · 24 pages</small></span><span className="file-ready" /></div>
            <div className="recall-file"><FileText size={14} /><span>Architecture decisions<small>DOCX · 12 pages</small></span><span className="file-ready" /></div>
            <div className="recall-file"><FileText size={14} /><span>Engineering handbook<small>PDF · 38 pages</small></span><span className="file-ready" /></div>
            <div className="recall-sidebar-bottom"><ShieldCheck size={13} /><span>Private by design</span></div>
          </div>
          <div className="recall-conversation">
            <div className="recall-chat-header"><span>Ask your knowledge</span><span className="recall-model"><span /> RAG enabled</span></div>
            <div className="recall-question">How do we keep services in sync?</div>
            <div className="recall-answer"><span className="recall-ai"><Sparkles size={13} /></span><div><strong>Start with events.</strong><p>Publish changes as domain events so each service can react independently. Use compensating actions when a step fails.<sup>1</sup></p><div className="recall-source"><FileText size={11} /><span>System design notes</span><span>p. 08 <ArrowUpRight size={10} /></span></div></div></div>
            <div className="recall-retrieved"><span>GROUNDED IN YOUR DOCUMENTS</span><div><span><Check size={10} /> Context retrieved</span><span><Check size={10} /> Source cited</span></div></div>
            <div className="recall-input"><span>Ask a follow-up question...</span><span><ArrowRight size={14} /></span></div>
          </div>
        </div>
        <div className="recall-caption"><span><span className="visual-dot" /> A little less searching. A lot more knowing.</span><span>01 — 03</span></div>
      </div>
      <figcaption>Interface concept <span>Recall / Document intelligence</span></figcaption>
    </figure>
  )
}

function BidlyIllustration() {
  return (
    <figure className="project-art bidly-art" aria-label="Bidly architecture illustration with a live bidding chart, accepted bid ledger, and distributed locking">
      <div className="bidly-canvas" aria-hidden="true">
        <div className="bidly-topbar"><div className="bidly-wordmark">bidly<span>.</span></div><div className="bidly-live"><span /> LIVE AUCTION</div><span className="bidly-auction-id">AUCTION / 0042</span></div>
        <div className="bidly-grid">
          <div className="bidly-chart-panel">
            <div className="bidly-chart-label">CURRENT HIGHEST BID <ArrowUpRight size={14} /></div>
            <div className="bidly-price">₹24,800<span>INR</span></div>
            <div className="bidly-price-change"><ArrowUpRight size={12} /> A new bid. Every screen updated.</div>
            <div className="bidly-chart"><div className="chart-axis"><span>25k</span><span>20k</span><span>15k</span></div><svg viewBox="0 0 360 144" fill="none" preserveAspectRatio="none"><defs><linearGradient id="bidly-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d2ff00" stopOpacity=".2"/><stop offset="1" stopColor="#d2ff00" stopOpacity="0"/></linearGradient></defs><path className="bidly-chart-grid" d="M0 16H360M0 67H360M0 118H360" /><path d="M0 128H38V118H74V106H108V110H145V90H179V78H216V56H252V64H286V34H322V16H360V144H0Z" fill="url(#bidly-chart-fill)" /><path d="M0 128H38V118H74V106H108V110H145V90H179V78H216V56H252V64H286V34H322V16H360" stroke="#D2FF00" strokeWidth="2.5" vectorEffect="non-scaling-stroke"/><circle cx="322" cy="16" r="5" fill="#D2FF00" stroke="#282C20" strokeWidth="3" /></svg><div className="chart-times"><span>12:40</span><span>12:45</span><span>12:50</span></div></div>
            <div className="bidly-lock"><span><LockKeyhole size={14} /> Distributed lock acquired</span><span><Check size={13} /> WRITE COMMITTED</span></div>
          </div>
          <div className="bidly-ledger"><div className="ledger-heading">BID ACTIVITY <span>STOMP</span></div><div className="ledger-item"><span className="bid-avatar">AK</span><span>Bid accepted<small>Just now · instance 02</small></span><strong>₹24,800</strong></div><div className="ledger-item"><span className="bid-avatar">MR</span><span>Bid accepted<small>8s ago · instance 01</small></span><strong>₹24,500</strong></div><div className="ledger-item"><span className="bid-avatar">VS</span><span>Bid accepted<small>14s ago · instance 02</small></span><strong>₹24,200</strong></div><div className="bidly-sync"><Network size={16} /><span>Redis Pub/Sub<small>Instances in sync</small></span><span className="sync-waves"><i/><i/><i/></span></div><div className="bidly-guarantee"><strong>200<span>threads</span></strong><p>Zero conflicting writes<br/>in concurrency testing.</p></div></div>
        </div>
        <div className="bidly-bottom"><span><span className="visual-dot" /> Built for the moment everyone clicks.</span><span>02 — 03</span></div>
      </div>
      <figcaption>Architecture illustration <span>Bidly / Concurrent bidding</span></figcaption>
    </figure>
  )
}

function ShopMeshIllustration() {
  return (
    <figure className="project-art shopmesh-art" aria-label="ShopMesh architecture illustration showing gateway, discovery, inventory, order and payment services with Kafka and three isolated databases">
      <div className="shopmesh-canvas" aria-hidden="true">
        <div className="shopmesh-topbar"><div className="shopmesh-wordmark"><span><Network size={17} /></span> ShopMesh</div><span>ONE CHECKOUT. MANY MOVING PARTS.</span></div>
        <div className="mesh-diagram">
          <div className="mesh-ingress"><span>CLIENT REQUEST</span><ArrowDown size={14}/></div>
          <div className="mesh-gateway"><span className="mesh-node-icon"><Network size={16}/></span><span>API Gateway<small>Spring Cloud Gateway</small></span><span className="mesh-jwt"><LockKeyhole size={10}/> JWT</span></div>
          <div className="mesh-discovery"><span className="mesh-status"/>Eureka<small>Service discovery</small></div>
          <div className="mesh-routing"><span/><span/><span/></div>
          <div className="mesh-services"><div className="mesh-service"><Package size={19}/><strong>Inventory</strong><span>Reserve stock</span><small>01</small></div><div className="mesh-service"><Layers3 size={19}/><strong>Order</strong><span>Manage checkout</span><small>02</small></div><div className="mesh-service"><CreditCard size={19}/><strong>Payment</strong><span>Process payment</span><small>03</small></div></div>
          <div className="mesh-event-connectors"><span/><span/><span/></div>
          <div className="mesh-event-bus"><span className="kafka-symbol">K</span><strong>Apache Kafka</strong><span>EVENT-DRIVEN SAGA</span><ArrowRight size={16}/></div>
          <div className="mesh-databases"><span><Database size={13}/> inventory_db</span><span><Database size={13}/> order_db</span><span><Database size={13}/> payment_db</span></div>
          <div className="mesh-compensation"><span><X size={11}/> Payment fails</span><ArrowRight size={12}/><span><Check size={11}/> Inventory released</span></div>
        </div>
        <div className="shopmesh-bottom"><span>05 SERVICES <i/> 03 DATABASES <i/> 06 EVENT TYPES</span><span>03 — 03</span></div>
      </div>
      <figcaption>Architecture illustration <span>ShopMesh / Event-driven commerce</span></figcaption>
    </figure>
  )
}

const illustrations = { recall: RecallIllustration, bidly: BidlyIllustration, shopmesh: ShopMeshIllustration }
const descriptions = {
  recall: 'A private knowledge workspace that turns your documents into a conversation. Answers stream in with citations, so every insight has a source.',
  bidly: 'A real-time auction platform designed for the rush of simultaneous bids. Distributed locks keep writes safe while live updates keep every bidder in sync.',
  shopmesh: 'Five independent services working toward one reliable checkout. Kafka events coordinate orders, inventory, and payments—and recover gracefully when a payment fails.',
}
const labels = {
  recall: ['Spring AI', 'Azure OpenAI', 'pgvector', 'React + TypeScript'],
  bidly: ['Spring Boot', 'Redis', 'WebSocket'],
  shopmesh: ['Microservices', 'Apache Kafka', 'AWS EC2'],
}

export default function ProjectShowcases() {
  const [openDetails, setOpenDetails] = useState<string[]>([])

  function toggleDetails(id: string) {
    setOpenDetails(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }

  return (
    <section id="projects" className="projects-section">
      <div className="shell">
        <div className="projects-heading reveal"><div><p className="eyebrow"><span>02 / SELECTED WORK</span></p><h2 className="section-heading">Built to solve.<br/><span>Made to work.</span></h2></div><p className="projects-heading-note">From a question to an answer.<br/>From a bid to a broadcast.<br/>From an event to a working system.</p></div>
        <div className="project-collection">
          {projects.map((project, index) => {
            const key = project.id as keyof typeof illustrations
            const Illustration = illustrations[key]
            const isOpen = openDetails.includes(project.id)
            return (
              <article key={project.id} className={`project-row project-row-${project.id} reveal`}>
                <Illustration />
                <div className="project-story">
                  <div className="project-kicker"><span>0{index + 1}</span><span>{project.category}</span></div>
                  <h3>{project.name}<span className="project-title-dot">.</span></h3>
                  <p className="project-tagline">{project.title}</p>
                  <p className="project-description">{descriptions[key]}</p>
                  <ul className="project-stack" aria-label={`${project.name} technologies`}>{labels[key].map(label => <li key={label}>{label}</li>)}</ul>
                  <div className="project-proof"><span className="project-proof-icon">{project.id === 'recall' ? <Search size={17}/> : project.id === 'bidly' ? <ShieldCheck size={17}/> : <Network size={17}/>}</span><span>{project.outcome}</span></div>
                  <div className="project-actions"><a href={project.github} target="_blank" rel="noreferrer" className="project-github"><Terminal size={16}/><span>Explore the code</span><ArrowUpRight size={17}/></a><button type="button" className="project-details-toggle" aria-expanded={isOpen} aria-controls={`details-${project.id}`} onClick={() => toggleDetails(project.id)}><span>Under the hood</span><Plus size={15} className={isOpen ? 'is-expanded' : ''}/></button></div>
                  <div id={`details-${project.id}`} className="project-details" hidden={!isOpen}><div className="project-details-heading"><Terminal size={14}/><span>ENGINEERING NOTES</span></div><ul>{project.decisions.map(decision => <li key={decision}>{decision}</li>)}</ul></div>
                </div>
              </article>
            )
          })}
        </div>
        <div className="projects-footer reveal"><span>Good interfaces. Thoughtful architecture. Working code.</span><a href="https://github.com/ravimehta251" target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={17}/></a></div>
      </div>
    </section>
  )
}
