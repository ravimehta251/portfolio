import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CheckCheck, CreditCard, Database, FileText, Layers3, LockKeyhole, Network, Package, Plus, Radio, RotateCcw, Search, ShieldCheck, Sparkles, Terminal } from 'lucide-react'
import { projects } from '../data/portfolio'
import '../projects.css'

// Begin complete: the information never depends on an animation running.
function useProjectDemo(lastFrame: number, interval = 700) {
  const element = useRef<HTMLDivElement>(null)
  const reducedMotion = useRef(false)
  const [frame, setFrame] = useState(lastFrame)
  const [playing, setPlaying] = useState(false)
  const [replayCount, setReplayCount] = useState(0)
  const finish = useCallback(() => {
    setFrame(lastFrame)
    setPlaying(false)
  }, [lastFrame])
  const replay = useCallback(() => {
    setReplayCount(count => count + 1)
    if (reducedMotion.current) {
      finish()
      return
    }
    setFrame(0)
    setPlaying(true)
  }, [finish])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = preference.matches
    const onPreferenceChange = () => {
      reducedMotion.current = preference.matches
      if (preference.matches) finish()
    }
    preference.addEventListener('change', onPreferenceChange)
    let hasPlayed = false
    let observer: IntersectionObserver | undefined
    if (typeof IntersectionObserver === 'function') {
      try {
        observer = new IntersectionObserver(entries => {
          const entry = entries[0]
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25 && !hasPlayed) {
            hasPlayed = true
            if (!reducedMotion.current) {
              setFrame(0)
              setPlaying(true)
            }
          } else if (!entry.isIntersecting) {
            finish()
          }
        }, { threshold: 0.25 })
        if (element.current) observer.observe(element.current)
      } catch {
        // The completed illustration remains usable if visibility setup fails.
        observer?.disconnect()
        observer = undefined
      }
    }
    return () => {
      observer?.disconnect()
      preference.removeEventListener('change', onPreferenceChange)
    }
  }, [finish])

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => {
      if (frame + 1 >= lastFrame) finish()
      else setFrame(current => current + 1)
    }, interval)
    return () => window.clearTimeout(timer)
  }, [finish, frame, interval, lastFrame, playing, replayCount])

  return { element, frame, playing, replay, replayCount }
}

type DemoControlsProps = { playing: boolean; replay: () => void; label: string }
function DemoControls({ playing, replay, label }: DemoControlsProps) {
  return <div className="project-demo-controls"><span><span className={playing ? 'demo-indicator is-playing' : 'demo-indicator'} />Illustrative demo · sample data</span><button type="button" onClick={replay} aria-label={`Replay ${label} demonstration`}><RotateCcw size={12} /><span>Replay</span></button></div>
}

function RecallIllustration() {
  const demo = useProjectDemo(5, 650)
  const chunks = ['Publish domain events ', 'so each service can react independently. ', 'Use compensating actions ', 'if a later step fails.']
  return (
    <figure className="project-art recall-art" aria-label="Recall illustrative interface: a document question, a streamed answer, and a source citation.">
      <div className="project-canvas recall-canvas" ref={demo.element}>
        <div className="project-visual-topbar"><div className="recall-wordmark"><Layers3 size={21} />recall</div><span className="visual-edition">YOUR KNOWLEDGE, CONNECTED.</span></div>
        <div className="recall-window" aria-hidden="true">
          <aside className="recall-sidebar"><div className="recall-library-title"><span>R</span>My workspace</div><span className="recall-side-label">KNOWLEDGE LIBRARY</span><div className="recall-file is-current"><FileText size={16} /><span>System design<small>PDF · ready to ask</small></span><Check size={11}/></div><div className="recall-file"><FileText size={16} /><span>Architecture notes<small>DOCX · ready to ask</small></span></div><div className="recall-sidebar-bottom"><LockKeyhole size={12} />Private workspace</div></aside>
          <div className="recall-conversation"><div className="recall-chat-header"><span><Sparkles size={12}/>Ask your documents</span><span className="recall-status-dot"/></div><div className="recall-question">How do services stay consistent?</div><div className="recall-answer"><span className="recall-ai"><Sparkles size={14}/></span><div><span className="recall-answer-label">RECALL</span><p>{chunks.map((chunk, index) => <span key={chunk} className={demo.frame >= index + 2 ? 'answer-chunk is-visible' : 'answer-chunk'}>{chunk}</span>)}<sup className={demo.frame === 5 ? 'answer-citation is-visible' : 'answer-citation'}>1</sup></p><div className={`recall-source ${demo.frame === 5 ? 'is-visible' : ''}`}><FileText size={12}/><span>System design<small>Source 1 · page 08</small></span><ArrowUpRight size={12}/></div></div></div><div className="recall-input"><span>Ask a follow-up…</span><ArrowRight size={15}/></div></div>
        </div>
        <div className="recall-flow" aria-hidden="true"><span className={demo.frame >= 1 ? 'is-done' : ''}><Search size={12}/>Retrieve</span><i/><span className={demo.frame >= 2 ? 'is-done' : ''}><Sparkles size={12}/>Generate</span><i/><span className={demo.frame === 5 ? 'is-done' : ''}><CheckCheck size={12}/>Cite</span></div>
        <DemoControls playing={demo.playing} replay={demo.replay} label="Recall answer streaming"/>
        <span className="sr-only" role="status">{demo.playing ? '' : `Sample answer complete, with a citation to System design, page eight.${demo.replayCount ? ` Replay ${demo.replayCount}.` : ''}`}</span>
      </div>
      <figcaption><span>01 / DOCUMENT INTELLIGENCE</span><span>Interface illustration</span></figcaption>
    </figure>
  )
}

function BidlyIllustration() {
  const demo = useProjectDemo(4, 800)
  const bidAccepted = demo.frame >= 2
  const broadcast = demo.frame >= 3
  return (
    <figure className="project-art bidly-art" aria-label="Bidly illustrative interface: a sample bid is validated, committed, and broadcast to two connected clients.">
      <div className="project-canvas bidly-canvas" ref={demo.element}>
        <div className="project-visual-topbar"><div className="bidly-wordmark">bidly<span>.</span></div><span className="visual-edition"><Radio size={12}/> EVERY BID. IN SYNC.</span></div>
        <div className="bidly-auction" aria-hidden="true"><div className="bidly-auction-label"><span>AUCTION / 0042</span><span>Sample auction</span></div><span className="bidly-price-label">HIGHEST BID</span><div className={`bidly-price ${bidAccepted ? 'is-updated' : ''}`}>₹{bidAccepted ? '24,800' : '24,500'}<span>INR</span></div><div className="bidly-chart"><svg viewBox="0 0 420 100" fill="none" preserveAspectRatio="none"><path className="bidly-chart-grid" d="M0 20H420M0 55H420M0 90H420"/><path className="bidly-chart-line" d="M0 89H48V78H94V80H138V61H183V54H225V62H271V39H318V34H364V16H420"/><path className={`bidly-chart-last ${bidAccepted ? 'is-visible' : ''}`} d="M364 16H391V5H420"/></svg><span className={bidAccepted ? 'bidly-chart-point is-visible' : 'bidly-chart-point'}/></div><div className="bidly-bid-receipt"><span><LockKeyhole size={13}/>{demo.frame === 0 ? 'Waiting for a sample bid' : demo.frame === 1 ? 'Lock acquired · validating bid' : 'Bid accepted · write committed'}</span><Check size={14} className={bidAccepted ? 'is-visible' : ''}/></div></div>
        <div className="bidly-broadcast" aria-hidden="true"><span className={`bidly-broadcast-label ${broadcast ? 'is-active' : ''}`}><Radio size={13}/>{broadcast ? 'BROADCAST VIA REDIS PUB/SUB' : 'CONNECTED BIDDERS'}</span><div className="bidly-clients"><div className={broadcast ? 'bidly-client is-updated' : 'bidly-client'}><span>CLIENT 01</span><strong>₹{broadcast ? '24,800' : '24,500'}</strong><small>{broadcast ? 'Update received' : 'Connected'}</small></div><div className="bidly-client-link"><ArrowRight size={18}/></div><div className={broadcast ? 'bidly-client is-updated' : 'bidly-client'}><span>CLIENT 02</span><strong>₹{broadcast ? '24,800' : '24,500'}</strong><small>{broadcast ? 'Update received' : 'Connected'}</small></div></div></div>
        <DemoControls playing={demo.playing} replay={demo.replay} label="Bidly bid and broadcast"/>
        <span className="sr-only" role="status">{demo.playing ? '' : `Sample bid accepted at 24,800 rupees and broadcast to both clients.${demo.replayCount ? ` Replay ${demo.replayCount}.` : ''}`}</span>
      </div>
      <figcaption><span>02 / CONCURRENT BIDDING</span><span>Interface illustration</span></figcaption>
    </figure>
  )
}

function ShopMeshIllustration() {
  const demo = useProjectDemo(4, 950)
  const stages = ['Checkout begins', 'Order created', 'Stock reserved', 'Payment processed', 'Order confirmed']
  const active = demo.frame === 2 ? 1 : demo.frame === 3 ? 2 : 0
  return (
    <figure className="project-art shopmesh-art" aria-label="ShopMesh illustrative architecture: a sample checkout event moves through Order, Inventory, and Payment services via Kafka.">
      <div className="project-canvas shopmesh-canvas" ref={demo.element}>
        <div className="project-visual-topbar"><div className="shopmesh-wordmark"><Network size={21}/>ShopMesh</div><span className="visual-edition">ONE CHECKOUT. CONNECTED SERVICES.</span></div>
        <div className="mesh-diagram" aria-hidden="true"><div className="mesh-entry"><span>CLIENT</span><ArrowDown size={15}/><div className="mesh-gateway"><Network size={15}/><strong>API Gateway</strong><span><LockKeyhole size={11}/>JWT</span></div></div><div className="mesh-routing"><i/><i/><i/></div><div className="mesh-services">{[{ name: 'Order', action: 'Manage checkout', Icon: Layers3 }, { name: 'Inventory', action: 'Reserve stock', Icon: Package }, { name: 'Payment', action: 'Process payment', Icon: CreditCard }].map(({ name, action, Icon }, index) => <div key={name} className={`mesh-service ${active === index ? 'is-active' : ''}`}><Icon size={21}/><strong>{name}</strong><span>{action}</span><small><Database size={11}/>Own database</small></div>)}</div><div className="mesh-event-track"><div className="mesh-event-rail"/><div className={`mesh-packet-position mesh-packet-${active}`}><span className="mesh-event-packet"/></div><i/><i/><i/></div><div className="mesh-event-bus"><span className="kafka-symbol">K</span><strong>Apache Kafka</strong><span>EVENT BUS</span><ArrowRight size={15}/></div><div className="mesh-event-status"><span className="mesh-status-dot"/><span>{stages[demo.frame]}</span><span>0{demo.frame + 1} / 05</span></div><div className="mesh-compensation"><ShieldCheck size={13}/><span>Payment fails? Compensating events release stock.</span></div></div>
        <DemoControls playing={demo.playing} replay={demo.replay} label="ShopMesh checkout event"/>
        <span className="sr-only" role="status">{demo.playing ? '' : `Sample checkout complete: order created, stock reserved, payment processed, order confirmed.${demo.replayCount ? ` Replay ${demo.replayCount}.` : ''}`}</span>
      </div>
      <figcaption><span>03 / EVENT-DRIVEN COMMERCE</span><span>Architecture illustration</span></figcaption>
    </figure>
  )
}

const illustrations = { recall: RecallIllustration, bidly: BidlyIllustration, shopmesh: ShopMeshIllustration }
const summaries = {
  recall: { problem: 'Your documents hold the answer. Finding it takes too long.', solution: 'A private RAG workspace that streams answers with traceable source citations.' },
  bidly: { problem: 'Everyone bids at once. Only one write should win.', solution: 'Distributed locks protect each bid. Live broadcasts keep every client in sync.' },
  shopmesh: { problem: 'One checkout spans independent services. A failed payment must not strand stock.', solution: 'Kafka events coordinate the flow. Compensating actions recover when a step fails.' },
}
const labels = {
  recall: ['Spring AI', 'Azure OpenAI', 'pgvector', 'React + TypeScript'],
  bidly: ['Spring Boot', 'Redis / Redisson', 'WebSocket'],
  shopmesh: ['Spring Cloud', 'Apache Kafka', 'MySQL', 'AWS EC2'],
}

export default function ProjectShowcases() {
  const [openDetails, setOpenDetails] = useState<string[]>([])
  function toggleDetails(id: string) {
    setOpenDetails(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }
  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <div className="shell">
        <div className="projects-heading reveal" data-reveal="text"><div><p className="eyebrow"><span>02 / SELECTED WORK</span></p><h2 id="projects-title" className="section-heading">Built to solve.<br/><span>Made to work.</span></h2></div><p className="projects-heading-note">A question. A bid. A checkout.<br/>Three different problems.<br/>The systems behind them.</p></div>
        <div className="project-collection">
          {projects.map((project, index) => {
            const key = project.id as keyof typeof illustrations
            const Illustration = illustrations[key]
            const isOpen = openDetails.includes(project.id)
            return (
              <article key={project.id} className={`project-row project-row-${project.id}`} aria-labelledby={`project-${project.id}`}>
                <div className="project-visual-wrap reveal" data-reveal="image"><Illustration/></div>
                <div className="project-story reveal" data-reveal="text">
                  <div className="project-kicker"><span>0{index + 1}</span><span>{project.category}</span></div>
                  <h3 id={`project-${project.id}`}>{project.name}<span className="project-title-dot">.</span></h3>
                  <p className="project-tagline">{project.title}</p>
                  <dl className="project-summary"><div><dt>The problem</dt><dd>{summaries[key].problem}</dd></div><div><dt>The approach</dt><dd>{summaries[key].solution}</dd></div></dl>
                  <ul className="project-stack" aria-label={`${project.name} technologies`}>{labels[key].map(label => <li key={label}>{label}</li>)}</ul>
                  <div className="project-proof"><span className="project-proof-icon">{project.id === 'recall' ? <Search size={17}/> : project.id === 'bidly' ? <ShieldCheck size={17}/> : <Network size={17}/>}</span><span>{project.outcome}</span></div>
                  <div className="project-actions"><a href={project.github} target="_blank" rel="noreferrer" className="project-github"><Terminal size={16}/><span>Explore the code</span><ArrowUpRight size={17}/></a><button type="button" className="project-details-toggle" aria-expanded={isOpen} aria-controls={`details-${project.id}`} onClick={() => toggleDetails(project.id)}><span>Under the hood</span><Plus size={15} className={isOpen ? 'is-expanded' : ''}/></button></div>
                  <div id={`details-${project.id}`} className="project-details" hidden={!isOpen}><div className="project-details-heading"><Terminal size={14}/><span>ENGINEERING NOTES</span></div><p>{project.solution}</p><ul>{project.decisions.map(decision => <li key={decision}>{decision}</li>)}</ul></div>
                </div>
              </article>
            )
          })}
        </div>
        <div className="projects-footer reveal" data-reveal="text"><span>Thoughtful architecture. Working code.</span><a href="https://github.com/ravimehta251" target="_blank" rel="noreferrer">More on GitHub<ArrowUpRight size={17}/></a></div>
      </div>
    </section>
  )
}
