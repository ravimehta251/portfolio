import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { metrics } from '../data/portfolio';
import SectionHeading from './SectionHeading';

function Counter({ value, suffix }) {
  const ref = useRef(null); const reduceMotion = useReducedMotion(); const [count, setCount] = useState(reduceMotion ? value : 0);
  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || reduceMotion) return;
      const start = performance.now(); const duration = 900;
      const tick = (now) => { const progress = Math.min((now - start) / duration, 1); setCount(Math.round(value * (1 - (1 - progress) ** 3))); if (progress < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick); observer.disconnect();
    }, { threshold: 0.5 });
    if (node) observer.observe(node); return () => observer.disconnect();
  }, [reduceMotion, value]);
  return <strong ref={ref}>{count.toLocaleString()}{suffix}</strong>;
}
export default function EngineeringMetrics() { return <section className="section section--tinted" aria-labelledby="metrics-title"><div className="shell"><SectionHeading eyebrow="04 / Engineering highlights" title="Outcomes you can verify in the work." description="Measured tests, architecture scope, and sustained problem-solving—not vanity statistics." /><div className="metrics-grid" id="metrics-title">{metrics.map((metric) => <article className="metric" key={`${metric.label}-${metric.note}`}><Counter value={metric.value} suffix={metric.suffix} /><h3>{metric.label}</h3><p>{metric.note}</p></article>)}</div></div></section>; }
