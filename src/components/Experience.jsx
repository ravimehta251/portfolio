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
    <section id="experience" className="py-24 relative">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience & <span className="text-emerald-500">Focus</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden border-l-4 border-l-blue-500"
          >
            <div className="absolute -right-10 -top-10 text-9xl text-slate-800/50">
              <FaProjectDiagram />
            </div>
            
            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Backend Engineering</h3>
                <h4 className="text-xl text-blue-400 font-medium">Self-Directed Technical Projects</h4>
                <p className="text-slate-400 mt-4 leading-relaxed max-w-2xl">
                  Focusing on architectural design, secure implementation, and deploying robust backend services. Emphasizing clean code, scalable patterns, and modern authentication flows to build enterprise-grade applications.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors"
                  >
                    <div className="text-xl bg-slate-800 p-2 rounded-lg">{item.icon}</div>
                    <span className="text-slate-300 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
