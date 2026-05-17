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

  return (
    <section id="skills" className="py-24 relative bg-slate-800/20">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Tech <span className="text-blue-500">Stack</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all cursor-default group">
                    <span className="text-xl group-hover:scale-110 transition-transform">{skill.icon}</span>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
