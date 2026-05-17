import React from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode } from 'react-icons/si';

const LeetCode = () => {
  const stats = [
    { label: 'Easy', count: 150, color: 'text-emerald-400', bg: 'bg-emerald-400/20' },
    { label: 'Medium', count: 180, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
    { label: 'Hard', count: 20, color: 'text-red-400', bg: 'bg-red-400/20' },
  ];

  return (
    <section className="py-16 relative bg-slate-800/20">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex items-center gap-6">
              <a href="https://leetcode.com/u/ravi_kumar_129/" target="_blank" rel="noreferrer" className="w-20 h-20 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/30 hover:bg-orange-500/20 transition-colors cursor-pointer">
                <SiLeetcode className="text-5xl text-orange-500 hover:scale-110 transition-transform" />
              </a>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">350+ Problems</h3>
                <p className="text-slate-400">Consistent DSA practice & Problem Solving</p>
              </div>
            </div>

            <div className="flex gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="flex flex-col items-center p-3 rounded-xl bg-slate-900 border border-slate-700/50 min-w-[80px]"
                >
                  <span className={`text-xl font-bold ${stat.color} mb-1`}>{stat.count}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeetCode;
