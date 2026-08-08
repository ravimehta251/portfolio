import { lazy, Suspense } from 'react';
import { ArrowDownRight, BriefcaseBusiness, Code2, Download, Mail, MapPin } from 'lucide-react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { links } from '../data/portfolio';
const NetworkScene = lazy(() => import('./three/NetworkScene'));

export default function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="hero shell" id="top" aria-labelledby="hero-title">
      <div className="hero__copy">
        <Motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="status"><span /> Bengaluru, India · Open to internships & collaboration</Motion.div>
        <Motion.p initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }} className="hero__role">Backend & Full-Stack Software Engineer</Motion.p>
        <Motion.h1 id="hero-title" initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>I build reliable backend systems for <em>real-time</em> and distributed applications.</Motion.h1>
        <Motion.p className="hero__intro" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>Information Science and Engineering student specializing in Java, Spring Boot, microservices, event-driven architecture, concurrency, and real-time applications. I design systems that remain secure, scalable, and consistent under load.</Motion.p>
        <Motion.div className="hero__actions" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
          <a className="button" href="#projects">Explore projects <ArrowDownRight size={18} /></a>
          <a className="button button--ghost" href={links.github} target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub</a>
          <a className="button button--text" href={links.resume} target="_blank" rel="noreferrer"><Download size={17} /> Download resume</a>
        </Motion.div>
        <div className="hero__meta">
          <span><MapPin size={16} /> Bengaluru, India</span>
          <a href={links.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={16} /> LinkedIn</a>
          <a href={links.leetcode} target="_blank" rel="noreferrer">LC LeetCode</a>
          <a href={links.email}><Mail size={16} /> Email</a>
        </div>
      </div>
      <Motion.div className="hero__visual" initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} aria-hidden="true">
        <div className="scene-label"><span>Distributed system</span><strong>Live topology</strong></div>
        {reduceMotion ? <div className="scene-fallback"><span /><span /><span /><span /><span /></div> : <Suspense fallback={<div className="scene-fallback"><span /><span /><span /><span /><span /></div>}><NetworkScene /></Suspense>}
        <div className="scene-legend"><span>Gateway</span><span>Events</span><span>State</span></div>
      </Motion.div>

    </section>
  );
}
