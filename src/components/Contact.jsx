import { useState } from 'react';
import { BriefcaseBusiness, Check, Code2, Copy, Mail, MapPin } from 'lucide-react';
import { links } from '../data/portfolio';
import SectionHeading from './SectionHeading';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('ravi7481081raj@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="shell">
        <SectionHeading
          eyebrow="08 / Contact"
          title="Let’s build something reliable."
          description="I’m open to software engineering internships, collaborative projects, hackathons, and relevant freelance work."
        />
        <div className="contact-card">
          <div className="contact-card__primary">
            <span className="detail-label">Email</span>
            <a href={links.email}><Mail />ravi7481081raj@gmail.com</a>
            <button type="button" onClick={copyEmail} aria-live="polite">
              {copied ? <Check /> : <Copy />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
          <div className="contact-card__meta">
            <span><MapPin />Bengaluru, India</span>
            <p>For opportunities or collaboration, reach me directly by email or connect through my professional profiles.</p>
          </div>
          <div className="contact-social" aria-label="Professional profiles">
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 /></a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
