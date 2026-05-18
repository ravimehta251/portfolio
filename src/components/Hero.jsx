import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Magnetic from './Magnetic';

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="inline-block mb-4 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]"
        >
          Backend & Full Stack Engineer
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight"
        >
          Hi, I'm <span className="gradient-text">Ravi</span> <br className="hidden md:block" />
          <span className="text-slate-100">Building Robust Systems.</span>
        </motion.h1>

        <motion.p 
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Specializing in <span className="text-blue-400 font-medium">Spring Boot</span>, <span className="text-emerald-400 font-medium">Microservices</span>, <span className="text-indigo-400 font-medium">React</span>, <span className="text-purple-400 font-medium">Security</span>, and scalable <span className="text-pink-400 font-medium">REST APIs</span>. Transforming complex problems into elegant, production-ready solutions.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <Magnetic>
            <AnchorLink href="#projects" className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-medium transition-all hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] flex items-center justify-center relative overflow-hidden group">
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </AnchorLink>
          </Magnetic>

          <Magnetic>
            <AnchorLink href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-600 hover:border-blue-500 hover:bg-blue-500/10 text-slate-200 font-medium transition-all flex items-center justify-center backdrop-blur-md">
              Contact Me
            </AnchorLink>
          </Magnetic>

          <Magnetic>
            <a href="https://drive.google.com/file/d/1H8sY_YrCIH7pXK3l0GxnFWgd687GoscO/view?usp=sharing" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-full border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-medium transition-all flex items-center justify-center backdrop-blur-md hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Download Resume
            </a>
          </Magnetic>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
          className="flex items-center justify-center gap-8"
        >
          <Magnetic>
            <a href="https://github.com/ravimehta251" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-2">
              <FaGithub size={32} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="https://www.linkedin.com/in/ravi-mehta2511/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors p-2">
              <FaLinkedin size={32} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="https://leetcode.com/u/ravi_kumar_129/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-yellow-500 transition-colors p-2">
              <FaCode size={32} />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <AnchorLink href="#about" className="text-slate-400 hover:text-blue-400 transition-colors flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </AnchorLink>
      </motion.div>
    </section>
  );
};

export default Hero;
