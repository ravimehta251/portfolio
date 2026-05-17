import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaCodeBranch } from 'react-icons/fa';

const Achievements = () => {
  const achievements = [
    {
      title: 'Runner-Up',
      event: 'HackAthena 2025',
      icon: <FaTrophy className="text-yellow-400" size={32} />,
      color: 'from-yellow-400/20 to-yellow-600/5'
    },
    {
      title: '2nd Runner-Up',
      event: 'JSSATE Hackathon',
      icon: <FaMedal className="text-slate-300" size={32} />,
      color: 'from-slate-300/20 to-slate-500/5'
    },
    {
      title: '350+',
      event: 'LeetCode Problems Solved',
      icon: <FaCodeBranch className="text-orange-400" size={32} />,
      color: 'from-orange-400/20 to-orange-600/5'
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Milestones & <span className="text-yellow-500">Achievements</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={`glass-card p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br ${item.color} border border-slate-700/50 hover:border-slate-500 transition-all text-center group`}
            >
              <div className="w-20 h-20 mx-auto bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 font-medium">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
