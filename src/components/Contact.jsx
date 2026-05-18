import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden z-10">
      <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Touch</span></h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-2 space-y-8"
          >
            <div className="relative group rounded-3xl p-[1px] overflow-hidden bg-gradient-to-br from-purple-500/30 via-slate-700/20 to-pink-500/30 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="glass-card p-10 rounded-3xl bg-[#0a0a0e]/80 backdrop-blur-xl h-full relative z-10">
                <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">Contact Info</h3>
                <div className="space-y-8">
                  <div className="flex items-center gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/30 group-hover/item:border-purple-500 group-hover/item:bg-purple-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover/item:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                      <FaEnvelope className="text-purple-400 group-hover/item:scale-110 transition-transform" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 font-medium tracking-wide">Email</p>
                      <a href="mailto:ravi7481081raj@gmail.com" className="text-slate-200 font-semibold hover:text-purple-400 transition-colors text-lg">ravi7481081raj@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-700/50">
                  <h4 className="text-sm text-slate-400 mb-6 uppercase tracking-widest font-semibold">Social Profiles</h4>
                  <div className="flex gap-4">
                    <a href="https://github.com/ravimehta251" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                      <FaGithub size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/ravi-mehta2511/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-slate-700 transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <FaLinkedin size={24} />
                    </a>
                    <a href="https://leetcode.com/u/ravi_kumar_129/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-slate-700 transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                      <SiLeetcode size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-3"
          >
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-purple-500/30 to-pink-500/30">
              <form className="glass-card p-8 md:p-12 rounded-3xl space-y-8 bg-[#0a0a0e]/90 backdrop-blur-2xl relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Your Name</label>
                    <input type="text" id="name" className="w-full bg-[#0a0a0e] border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner placeholder:text-slate-600 font-medium" placeholder="John Doe" />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Your Email</label>
                    <input type="email" id="email" className="w-full bg-[#0a0a0e] border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner placeholder:text-slate-600 font-medium" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Message</label>
                  <textarea id="message" rows="5" className="w-full bg-[#0a0a0e] border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none shadow-inner placeholder:text-slate-600 font-medium" placeholder="How can I help you?"></textarea>
                </div>
                <button type="button" className="w-full py-5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all relative overflow-hidden group">
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
