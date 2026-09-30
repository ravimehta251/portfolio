import { useState } from 'react'
import { ArrowDown, ArrowRight, Check, Database, Package, Radio, RotateCcw, Server, ShoppingBag, Wallet } from 'lucide-react'
export default function ShopMeshDemo() {
  const [failed, setFailed] = useState(false)
  const [step, setStep] = useState(0)
  const success = ['Ready to start checkout.', 'Order created. An event enters the Kafka saga.', 'Inventory reserved. Payment processes the request.', 'Payment confirmed. Checkout completes.']
  const failure = ['Ready to start checkout.', 'Order created. An event enters the Kafka saga.', 'Inventory reserved. Payment processes the request.', 'Payment failed. Compensating events release reserved stock.']
  return <div className="architecture-demo shopmesh-demo"><div className="demo-window-bar"><span className="window-dots"><i /><i /><i /></span><span>shopmesh / event-driven saga</span><span className="demo-label">INTERACTIVE MODEL</span></div>
    <div className="mesh-display"><div className="mesh-gateway"><span><Server size={14} /> API Gateway</span><span className="discovery">Eureka discovery</span></div><ArrowDown className="mesh-down" size={17} />
      <div className="mesh-services">{[{ name: 'Order', Icon: ShoppingBag }, { name: 'Inventory', Icon: Package }, { name: 'Payment', Icon: Wallet }].map(({ name, Icon }, i) => <div key={name} className={`mesh-service ${step > i ? 'service-active' : ''} ${i === 2 && step === 3 && failed ? 'service-failed' : ''}`}><Icon size={21} /><strong>{name}</strong><span>{step > i ? i === 2 && failed ? 'FAILED' : 'PROCESSED' : 'READY'}</span><div className="service-db"><Database size={11} /> MySQL</div></div>)}</div>
      <div className={`kafka-bus ${step > 0 ? 'bus-active' : ''} ${failed && step === 3 ? 'bus-compensate' : ''}`}><Radio size={16} /><strong>Apache Kafka</strong><span>{failed && step === 3 ? '← COMPENSATION' : 'TRANSACTIONAL OUTBOX →'}</span><i aria-hidden="true" /></div>
      <div className="saga-options"><span className="mono">PAYMENT OUTCOME</span><div role="group" aria-label="Payment outcome"><button aria-pressed={!failed} className={!failed ? 'chosen' : ''} onClick={() => { setFailed(false); setStep(0) }}><Check size={12} /> Success</button><button aria-pressed={failed} className={failed ? 'chosen failure-choice' : ''} onClick={() => { setFailed(true); setStep(0) }}>Failure</button></div></div>
      <p className="demo-status" aria-live="polite">{(failed ? failure : success)[step]}</p>
      <div className="mesh-deployment"><span>Docker Compose</span><span>GitHub Actions → AWS EC2</span></div>
      <button className="demo-button" onClick={() => setStep((step + 1) % 4)}>{step === 3 ? <RotateCcw size={13} /> : <Radio size={13} />}{step === 0 ? 'Start checkout' : step === 3 ? 'Reset saga' : 'Follow the next event'}<ArrowRight size={14} /></button>
    </div>
  </div>
}
