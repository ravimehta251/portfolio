import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className={`mx-auto max-w-6xl px-6 transition-all duration-500 ${isScrolled ? 'md:px-8' : 'md:px-12'}`}>
        <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-[#0a0a0e]/70 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-full px-6 py-3' : 'px-0 py-0'}`}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-black tracking-tighter cursor-pointer relative group"
          >
            <AnchorLink href="#home" className="text-white hover:text-blue-500 transition-colors">
              Ravi
            </AnchorLink>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnchorLink href={link.href} className="relative px-4 py-2 text-slate-300 text-sm font-medium transition-colors hover:text-white group">
                  {link.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
                </AnchorLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="ml-4"
            >
              <AnchorLink href="#contact" className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors group-hover:bg-slate-900">
                  Hire Me
                </span>
              </AnchorLink>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white focus:outline-none transition-transform active:scale-95">
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          className="md:hidden absolute top-full left-4 right-4 mt-2 bg-[#0a0a0e]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <AnchorLink 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white hover:translate-x-2 transition-all font-medium text-lg"
              >
                {link.name}
              </AnchorLink>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
