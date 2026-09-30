import { useState } from 'react'
import { ArrowRight, Check, Database, FileText, Layers, Play, Sparkles } from 'lucide-react'
const stages = [
  { name: 'Upload', description: 'PDF, DOCX, TXT', Icon: FileText, detail: 'Documents enter a private knowledge workspace protected by JWT and Spring Security.' },
  { name: 'Chunk', description: 'Spring AI', Icon: Layers, detail: 'Spring AI parses and chunks uploaded files in memory.' },
  { name: 'Embed', description: 'Azure / Ollama', Icon: Sparkles, detail: 'Azure OpenAI embeds the chunks, with support for local Ollama.' },
  { name: 'Store', description: 'pgvector', Icon: Database, detail: 'PostgreSQL 16 stores the vector embeddings using pgvector.' },
  { name: 'Retrieve', description: 'Semantic search', Icon: Layers, detail: 'Relevant document chunks supply context for the assistant’s answer.' },
  { name: 'Generate', description: 'LLM', Icon: Sparkles, detail: 'The language model answers using retrieved document context.' },
  { name: 'Stream', description: 'SSE + citations', Icon: Check, detail: 'Authenticated SSE delivers token, citation, and completion events.' },
]
export default function RecallDemo() {
  const [step, setStep] = useState(0)
  return <div className="architecture-demo recall-demo">
    <div className="demo-window-bar"><span className="window-dots"><i /><i /><i /></span><span>recall / knowledge pipeline</span><span className="demo-label">INTERACTIVE MODEL</span></div>
    <div className="recall-display"><div className="document-preview"><FileText size={24} /><div><strong>Private knowledge space</strong><span>PDF · DOCX · TXT</span></div><span className="document-shield">JWT</span></div>
      <div className="pipeline" aria-label="Recall RAG architecture">{stages.map(({ name, description, Icon }, i) => <button type="button" aria-pressed={step === i} key={name} onClick={() => setStep(i)} className={`pipeline-node ${i <= step ? 'passed' : ''} ${i === step ? 'current' : ''}`}><span className="pipeline-icon"><Icon size={18} /></span><strong>{name}</strong><span>{description}</span>{i < stages.length - 1 && <ArrowRight className="pipeline-arrow" size={12} />}</button>)}</div>
      <div className="pipeline-readout" aria-live="polite"><span className="mono">0{step + 1} / 07</span><p>{stages[step].detail}</p></div>
      <div className="stream-preview"><span className="stream-spark"><Sparkles size={18} /></span><div><span className="mono">RESPONSE STREAM</span><p>{step === 6 ? <>Answers grounded in your documents.<span className="citation-tag">Source citation</span></> : 'From a document to an answer you can trace.'}</p><div className="stream-lines" aria-hidden="true"><i /><i /><i /></div></div></div>
      <button className="demo-button" onClick={() => setStep((step + 1) % stages.length)}><Play size={13} /> {step === 6 ? 'Restart pipeline' : 'Follow the data'}<ArrowRight size={14} /></button>
    </div>
  </div>
}
