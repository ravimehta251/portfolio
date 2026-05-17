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
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About <span className="text-blue-500">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-2xl"></div>
              <h3 className="text-2xl font-bold mb-4 text-white">Information Science Engineering Student</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                I am a passionate backend-focused developer with a strong foundation in building scalable, secure, and production-ready applications. My expertise lies heavily in the <span className="text-blue-400 font-medium">Spring ecosystem</span>, where I design resilient microservices and RESTful APIs.
              </p>
              <p className="text-slate-300 leading-relaxed">
                With a <span className="text-emerald-400 font-medium">security-first mindset</span>, I prioritize protecting data through robust authentication and authorization strategies like JWT, OAuth2, and RBAC. Beyond the backend, I have hands-on experience crafting dynamic, responsive user interfaces using <span className="text-indigo-400 font-medium">React.js</span> to deliver complete end-to-end solutions.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl hover:border-blue-500/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
