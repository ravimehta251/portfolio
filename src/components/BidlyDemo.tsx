import { useState } from 'react'
import { ArrowRight, Check, LockKeyhole, Radio, RotateCcw, Users } from 'lucide-react'
export default function BidlyDemo() {
  const [stage, setStage] = useState(0)
  const descriptions = ['Three clients submit bids to the backend.', 'Redisson coordinates access; JPA optimistic locking checks the stored version.', 'PostgreSQL persists the coordinated writes. Redis Pub/Sub broadcasts the latest price to every instance.']
  return <div className="architecture-demo bidly-demo"><div className="demo-window-bar"><span className="window-dots"><i /><i /><i /></span><span>bidly / concurrency model</span><span className="demo-label">ILLUSTRATIVE BIDS</span></div>
    <div className="bidly-display"><div className="auction-header"><span className="eyebrow"><Radio size={13} /> LIVE AUCTION</span><span className="live-pill">WebSocket / STOMP</span></div>
      <div className="bid-price"><span className="mono">EXAMPLE HIGHEST BID</span><strong>₹{stage === 2 ? '1,300' : '1,000'}<span>.00</span></strong><p>{stage === 2 ? 'State synchronized across instances' : 'Waiting for concurrent bids'}</p></div>
      <div className="bid-clients">{[1100, 1200, 1300].map((bid, i) => <div key={bid} className={stage > 0 ? 'bid-submitted' : ''}><span className="client-avatar"><Users size={17} /></span><span>Client 0{i + 1}</span><strong>₹{bid.toLocaleString('en-IN')}</strong>{stage === 2 && <Check size={13} className="mint" />}</div>)}</div>
      <div className={`lock-channel ${stage > 0 ? 'lock-active' : ''}`}><span /><div><LockKeyhole size={16} /><strong>{stage === 0 ? 'Distributed lock' : stage === 1 ? 'Lock acquired' : 'Writes coordinated'}</strong></div><span /></div>
      <div className="bid-infrastructure"><span>Redisson</span><ArrowRight size={13} /><span>JPA version check</span><ArrowRight size={13} /><span>PostgreSQL</span></div>
      <p className="demo-status" aria-live="polite">{descriptions[stage]}</p>
      <button className="demo-button" onClick={() => setStage((stage + 1) % 3)}>{stage === 2 ? <RotateCcw size={13} /> : <Users size={13} />}{stage === 0 ? 'Simulate concurrent bids' : stage === 1 ? 'Commit & broadcast' : 'Reset simulation'}<ArrowRight size={14} /></button>
    </div>
  </div>
}
