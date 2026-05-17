import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background animated blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/30 blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-500/20 blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500/20 blob" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wide"
        >
          Backend & Full Stack Engineer
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
        >
          Hi, I'm <span className="gradient-text">Ravi</span> <br className="hidden md:block" />
          <span className="text-slate-100">Building Robust Systems.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Specializing in <span className="text-blue-400 font-medium">Spring Boot</span>, <span className="text-emerald-400 font-medium">Microservices</span>, <span className="text-indigo-400 font-medium">React</span>, <span className="text-purple-400 font-medium">Security</span>, and scalable <span className="text-pink-400 font-medium">REST APIs</span>. Transforming complex problems into elegant, production-ready solutions.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <AnchorLink href="#projects" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
            View Projects
          </AnchorLink>
          <AnchorLink href="#contact" className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-slate-600 hover:border-blue-500 hover:bg-blue-500/10 text-slate-200 font-medium transition-all">
            Contact Me
          </AnchorLink>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-medium transition-all">
            Download Resume
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-6"
        >
          <a href="https://github.com/ravimehta251" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white hover:scale-110 transition-all">
            <FaGithub size={28} />
          </a>
          <a href="https://www.linkedin.com/in/ravi-mehta2511/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 hover:scale-110 transition-all">
            <FaLinkedin size={28} />
          </a>
          <a href="https://leetcode.com/u/ravi_kumar_129/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-yellow-500 hover:scale-110 transition-all">
            <FaCode size={28} />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <AnchorLink href="#about" className="text-slate-400 hover:text-blue-400 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </AnchorLink>
      </div>
    </section>
  );
};

export default Hero;
