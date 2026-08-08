import { motion as Motion, useReducedMotion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description }) {
  const reduceMotion = useReducedMotion();
  return (
    <Motion.header
      className="section-heading"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Motion.header>
  );
}
