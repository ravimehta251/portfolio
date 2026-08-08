import { useEffect, useMemo, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { links, navItems } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => navItems.map(([, id]) => id), []);
  const active = useActiveSection(ids);
  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className="site-header">
      <nav className="navbar shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Ravi Kumar, home"><span>RK</span><strong>Ravi Kumar</strong></a>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="nav-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <div id="nav-menu" className={`nav-menu ${open ? 'is-open' : ''}`}>
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="button button--small" href={links.resume} target="_blank" rel="noreferrer"><Download size={16} /> Resume</a>
        </div>
      </nav>
    </header>
  );
}
