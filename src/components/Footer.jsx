import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-10 mt-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <AnchorLink href="#home" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Ravi
          </AnchorLink>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Ravi All rights reserved. Built with React & Tailwind.
        </p>
        
        <div className="flex items-center gap-6">
          <AnchorLink href="#about" className="text-slate-500 hover:text-blue-400 transition-colors text-sm">About</AnchorLink>
          <AnchorLink href="#projects" className="text-slate-500 hover:text-blue-400 transition-colors text-sm">Projects</AnchorLink>
          <AnchorLink href="#contact" className="text-slate-500 hover:text-blue-400 transition-colors text-sm">Contact</AnchorLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
