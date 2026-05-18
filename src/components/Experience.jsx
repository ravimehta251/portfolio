import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaShieldAlt, FaCogs, FaLock, FaProjectDiagram } from 'react-icons/fa';

const Experience = () => {
  const highlights = [
    { text: 'Production-ready full-stack apps', icon: <FaServer className="text-blue-400" /> },
    { text: 'Secure REST APIs', icon: <FaShieldAlt className="text-emerald-400" /> },
    { text: 'JWT/OAuth2 authentication', icon: <FaLock className="text-indigo-400" /> },
    { text: 'Microservices patterns', icon: <FaProjectDiagram className="text-purple-400" /> },
    { text: 'RBAC implementation', icon: <FaShieldAlt className="text-red-400" /> },
    { text: 'Security-first backend development', icon: <FaCogs className="text-orange-400" /> },
  ];

  return (
    <section id="experience" className="py-32 relative z-10">
      <div className="absolute top-1/2 right-0 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Focus</span></h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group rounded-[2.5rem] p-[1px] bg-gradient-to-br from-blue-500/30 via-slate-700/20 to-emerald-500/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="glass-card p-8 md:p-14 rounded-[2.5rem] relative overflow-hidden border-l-4 border-l-blue-500 bg-[#0a0a0e]/80 backdrop-blur-xl h-full">
              <div className="absolute -right-10 -top-10 text-9xl text-slate-800/20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                <FaProjectDiagram />
              </div>
              
              <div className="relative z-10">
                <div className="mb-10">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">Backend Engineering</h3>
                  <h4 className="text-xl text-blue-400 font-semibold tracking-wide drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">Self-Directed Technical Projects</h4>
                  <p className="text-slate-300 mt-6 leading-relaxed max-w-2xl text-lg">
                    Focusing on architectural design, secure implementation, and deploying robust backend services. Emphasizing clean code, scalable patterns, and modern authentication flows to build enterprise-grade applications.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {highlights.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: index * 0.1, type: "spring" }}
                      className="flex items-center gap-4 bg-[#0a0a0e]/90 p-5 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:-translate-y-1 group/item"
                    >
                      <div className="text-2xl bg-slate-900 p-3 rounded-xl shadow-inner group-hover/item:scale-110 transition-transform duration-300">{item.icon}</div>
                      <span className="text-slate-200 font-semibold text-sm tracking-wide">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
