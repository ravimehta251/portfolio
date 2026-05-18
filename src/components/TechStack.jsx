import React from 'react';
import { motion } from 'framer-motion';
import { FaJava, FaReact, FaDocker, FaAws, FaGithub, FaDatabase, FaNodeJs } from 'react-icons/fa';
import { SiSpring, SiSpringboot, SiSpringsecurity, SiHibernate, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiPostman, SiSwagger, SiJunit5, SiJavascript } from 'react-icons/si';

const TechStack = () => {
  const categories = [
    {
      title: 'Backend & Frameworks',
      skills: [
        { name: 'Java', icon: <FaJava className="text-orange-500" /> },
        { name: 'Spring Boot', icon: <SiSpringboot className="text-green-500" /> },
        { name: 'Spring Security', icon: <SiSpringsecurity className="text-green-600" /> },
        { name: 'Microservices', icon: <SiSpring className="text-green-400" /> },
        { name: 'Hibernate', icon: <SiHibernate className="text-yellow-600" /> },
        { name: 'Spring Data JPA', icon: <FaDatabase className="text-blue-400" /> },
      ],
    },
    {
      title: 'APIs & Security',
      skills: [
        { name: 'REST APIs', icon: <FaNodeJs className="text-green-500" /> },
        { name: 'JWT Auth', icon: <SiSpringsecurity className="text-indigo-400" /> },
        { name: 'OAuth2', icon: <SiSpringsecurity className="text-blue-500" /> },
        { name: 'RBAC', icon: <SiSpringsecurity className="text-red-400" /> },
        { name: 'Spring AI', icon: <SiSpring className="text-emerald-400" /> },
      ],
    },
    {
      title: 'Frontend',
      skills: [
        { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
        { name: 'React.js', icon: <FaReact className="text-blue-400" /> },
        { name: 'HTML5 / CSS3', icon: <FaReact className="text-orange-400" /> },
        { name: 'Responsive UI', icon: <FaReact className="text-pink-400" /> },
      ],
    },
    {
      title: 'Databases & Tools',
      skills: [
        { name: 'MySQL', icon: <SiMysql className="text-blue-500" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-400" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
        { name: 'Redis', icon: <SiRedis className="text-red-500" /> },
        { name: 'Docker', icon: <FaDocker className="text-blue-500" /> },
        { name: 'AWS', icon: <FaAws className="text-orange-400" /> },
        { name: 'Git/GitHub', icon: <FaGithub className="text-white" /> },
        { name: 'Postman', icon: <SiPostman className="text-orange-500" /> },
        { name: 'Swagger', icon: <SiSwagger className="text-green-400" /> },
        { name: 'JUnit', icon: <SiJunit5 className="text-red-500" /> },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section id="skills" className="py-32 relative bg-[#0a0a0e]/50 z-10">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">Stack</span></h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl rounded-3xl"></div>
              <div className="glass-card p-8 rounded-3xl relative backdrop-blur-xl border border-slate-700/60 bg-slate-900/40 h-full">
                <h3 className="text-2xl font-bold text-white mb-8 border-b border-slate-700/50 pb-4 tracking-tight">{category.title}</h3>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex flex-wrap gap-4"
                >
                  {category.skills.map((skill) => (
                    <motion.div 
                      variants={itemVariants}
                      key={skill.name} 
                      className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0a0a0e]/80 border border-slate-700/80 hover:border-blue-500 hover:bg-slate-800 transition-all cursor-default hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:-translate-y-1"
                    >
                      <span className="text-xl drop-shadow-[0_0_8px_currentColor]">{skill.icon}</span>
                      <span className="text-sm font-semibold text-slate-300 transition-colors">{skill.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
