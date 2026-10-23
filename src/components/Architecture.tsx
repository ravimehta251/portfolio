import { useId, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Database, GitBranch, Network, Radio, ShieldCheck, Workflow } from 'lucide-react'
import { projects } from '../data/portfolio'
import '../architecture.css'

type NodeId = 'gateway' | 'order' | 'kafka' | 'inventory' | 'payment' | 'discovery'

const nodes = [
  { id: 'gateway', index: '01', title: 'API gateway', label: 'Request entry', icon: ShieldCheck,
    heading: 'A clear entry point.',
    explanation: 'Spring Cloud Gateway routes incoming requests to the right service. Stateless JWT authorization protects every routed request.',
    principle: 'Routing & authorization', technology: 'Spring Cloud Gateway · JWT' },
  { id: 'order', index: '02', title: 'Order', label: 'Owns order state', icon: Workflow,
    heading: 'Keep state and intent together.',
    explanation: 'The order service owns its MySQL database. A transactional outbox connects committed state changes with the Kafka event flow across checkout.',
    principle: 'Transactional outbox', technology: 'Spring Boot · MySQL' },
  { id: 'kafka', index: '03', title: 'Kafka', label: 'Event backbone', icon: Radio,
    heading: 'Coordinate through events.',
    explanation: 'Six Kafka event types coordinate the checkout saga. Services react to events, including compensation that releases reserved stock when payment fails.',
    principle: 'Event-driven saga', technology: 'Apache Kafka · 6 event types' },
  { id: 'inventory', index: '04', title: 'Inventory', label: 'Owns stock state', icon: Database,
    heading: 'Reserve stock. Recover safely.',
    explanation: 'Inventory manages stock in its own MySQL database. Compensating events release reserved inventory when a payment fails.',
    principle: 'Compensating actions', technology: 'Spring Boot · MySQL' },
  { id: 'payment', index: '05', title: 'Payment', label: 'Owns payment state', icon: GitBranch,
    heading: 'Treat failure as part of the flow.',
    explanation: 'The payment service owns a separate MySQL database. Payment failure feeds back into the saga so the order and reserved inventory can recover.',
    principle: 'Independent data ownership', technology: 'Spring Boot · MySQL' },
  { id: 'discovery', index: '06', title: 'Discovery', label: 'Service registry', icon: Network,
    heading: 'Make services discoverable.',
    explanation: 'Eureka provides service discovery for the platform. Together with the gateway, order, inventory, and payment services, it forms the five-service architecture.',
    principle: 'Service discovery', technology: 'Netflix Eureka · Spring Cloud' },
] as const

const edges = [
  { id: 'entry', from: 'gateway', to: 'order', desktop: 'M 169 180 H 211', mobile: 'M 170 88 V 108 Q 170 122 155 122 H 80 V 144' },
  { id: 'publish', from: 'order', to: 'kafka', desktop: 'M 359 180 H 401', mobile: 'M 148 180 H 192' },
  { id: 'stock', from: 'kafka', to: 'inventory', desktop: 'M 549 180 H 575 Q 590 180 590 165 V 100 Q 590 85 605 85 H 631', mobile: 'M 260 216 V 239 Q 260 250 247 250 H 94 Q 80 250 80 264 V 284' },
  { id: 'pay', from: 'kafka', to: 'payment', desktop: 'M 549 180 H 575 Q 590 180 590 195 V 270 Q 590 285 605 285 H 631', mobile: 'M 260 216 V 284' },
  { id: 'registry', from: 'discovery', to: 'order', desktop: 'M 285 309 V 216', mobile: 'M 170 404 V 380 Q 170 365 155 365 H 35 Q 18 365 18 347 V 195 Q 18 180 28 180 H 32' },
] as const

function ConnectionMap({ selected, mobile, markerId }: { selected: NodeId; mobile?: boolean; markerId: string }) {
  return <svg className={`architecture-connections ${mobile ? 'is-mobile' : 'is-desktop'}`} viewBox={mobile ? '0 0 340 490' : '0 0 800 430'} aria-hidden="true" focusable="false">
    <defs>
      <marker id={markerId} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M 1 1 L 5 3.5 L 1 6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </marker>
    </defs>
    {edges.map(edge => <path key={edge.id} d={mobile ? edge.mobile : edge.desktop}
      className={`architecture-wire ${edge.id === 'registry' ? 'is-registry' : ''} ${edge.from === selected || edge.to === selected ? 'is-active' : ''}`}
      markerEnd={`url(#${markerId})`} />)}
    {!mobile && <>
      <text x="377" y="160" textAnchor="middle">PUBLISH</text>
      <text x="602" y="45" textAnchor="middle">CHECKOUT EVENTS</text>
      <text x="307" y="270">DISCOVER</text>
      <path className="architecture-bracket" d="M 625 350 v 14 h 156 v -14" />
      <text x="703" y="385" textAnchor="middle">ISOLATED DATABASES</text>
    </>}
  </svg>
}

export default function Architecture() {
  const [selected, setSelected] = useState<NodeId>('kafka')
  const uniqueId = useId().replace(/:/g, '')
  const detail = nodes.find(node => node.id === selected)!
  const shopmesh = projects.find(project => project.id === 'shopmesh')!

  return <section className="architecture-section section-pad" id="architecture" aria-labelledby="architecture-title">
    <div className="shell">
      <div className="architecture-heading reveal">
        <div>
          <p className="eyebrow architecture-kicker"><span /> A look under the surface</p>
          <h2 className="display-heading" id="architecture-title">Built to work<br /><span className="serif-word">together.</span></h2>
        </div>
        <p className="architecture-intro">Good backend work lives in the connections. Explore how ShopMesh routes a request, coordinates events, and handles failure.</p>
      </div>

      <div className="architecture-workbench reveal">
        <div className="architecture-toolbar">
          <p><span className="architecture-toolbar-mark"><Network size={15} aria-hidden="true" /></span> SHOPMESH <span className="architecture-toolbar-divider">/</span> SYSTEM EXPLORER</p>
          <span className="architecture-illustration-label">ILLUSTRATIVE ARCHITECTURE</span>
        </div>
        <div className="architecture-workspace">
          <figure className="architecture-figure">
            <div className="architecture-graph" role="group" aria-label="Explore architecture nodes">
              <ConnectionMap selected={selected} markerId={`architecture-arrow-${uniqueId}`} />
              <ConnectionMap selected={selected} mobile markerId={`architecture-mobile-arrow-${uniqueId}`} />
              {nodes.map(node => {
                const Icon = node.icon
                return <button key={node.id} type="button" className={`architecture-node architecture-node-${node.id} ${selected === node.id ? 'is-selected' : ''}`}
                  aria-pressed={selected === node.id} aria-controls={`architecture-detail-${uniqueId}`} onClick={() => setSelected(node.id)}>
                  <span className="architecture-node-top"><Icon size={17} strokeWidth={1.6} aria-hidden="true" /><span>{node.index}</span></span>
                  <span className="architecture-node-title">{node.title}</span>
                  <span className="architecture-node-label">{node.label}</span>
                </button>
              })}
            </div>
            <figcaption><span><i /> REQUEST / EVENT FLOW</span><span><i /> DISCOVERY</span><p>Select a node to explore <ArrowDownRight size={14} aria-hidden="true" /></p></figcaption>
          </figure>

          <div id={`architecture-detail-${uniqueId}`} className="architecture-detail" aria-live="polite" aria-atomic="true">
            <div className="architecture-detail-copy" key={selected}>
              <p className="eyebrow architecture-detail-index">{detail.index} / {detail.title}</p>
              <h3>{detail.heading}</h3>
              <p className="architecture-explanation">{detail.explanation}</p>
              <div className="architecture-principle"><span className="eyebrow">THE DECISION</span><p>{detail.principle}</p></div>
              <p className="architecture-technology">{detail.technology}</p>
            </div>
            <a href={shopmesh.github} target="_blank" rel="noopener noreferrer" className="architecture-source">Explore the source <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="architecture-footer"><p><strong>5</strong> SERVICES <span /> <strong>6</strong> EVENT TYPES <span /> <strong>3</strong> DATABASES</p><p>Simplified system map · no live traffic</p></div>
      </div>
    </div>
  </section>
}
