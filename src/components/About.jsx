import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const highlights = [
    { title: 'Backend Focus', desc: 'Expertise in Spring ecosystem and Microservices.' },
    { title: 'Security First', desc: 'Implementing robust auth and data protection.' },
    { title: 'Full Stack', desc: 'Bridging robust APIs with modern React UIs.' },
    { title: 'Problem Solver', desc: 'Consistent DSA practice & Hackathon winner.' },
  ];

  return (
    <section id="about" className="py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Me</span></h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative group rounded-3xl p-[1px] overflow-hidden bg-gradient-to-br from-blue-500/30 via-slate-700/20 to-emerald-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="bg-[#0a0a0e]/80 backdrop-blur-xl p-10 rounded-3xl relative z-10 h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen transition-transform duration-700 group-hover:scale-150"></div>
                
                <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">Information Science Engineering Student</h3>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  I am a passionate backend-focused developer with a strong foundation in building scalable, secure, and production-ready applications. My expertise lies heavily in the <span className="text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">Spring ecosystem</span>, where I design resilient microservices and RESTful APIs.
                </p>
                <p className="text-slate-300 leading-relaxed text-lg">
                  With a <span className="text-emerald-400 font-semibold drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">security-first mindset</span>, I prioritize protecting data through robust authentication and authorization strategies like JWT, OAuth2, and RBAC. Beyond the backend, I craft dynamic, responsive user interfaces using <span className="text-indigo-400 font-semibold drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">React.js</span> to deliver end-to-end solutions.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-slate-700/50 to-slate-800/50 hover:from-blue-500/50 hover:to-emerald-500/50 transition-colors duration-500"
              >
                <div className="bg-[#0a0a0e]/90 backdrop-blur-md p-6 rounded-2xl h-full relative overflow-hidden transition-all duration-500 group-hover:bg-[#0a0a0e]/60">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500 shadow-lg">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
