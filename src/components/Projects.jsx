import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaServer, FaChartLine } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'SmartColdMailer',
      type: 'Full-Stack Platform',
      description: 'A comprehensive full-stack email automation platform designed for bulk email campaigns with advanced analytics and tracking.',
      tech: ['Spring Boot 3', 'React Vite', 'MongoDB', 'JWT', 'RBAC', 'SMTP', 'Docker'],
      features: ['Bulk email campaigns', 'Analytics dashboard', 'Open/click tracking', 'Role-based access control'],
      architecture: 'Microservices-ready layered architecture with secure JWT authentication and asynchronous email processing.',
      github: '#',
      demo: '#',
      color: 'from-blue-500 to-indigo-500',
      icon: <FaServer className="text-3xl text-blue-400" />
    },
    {
      title: 'FinDash',
      type: 'REST API Backend',
      description: 'A robust finance management REST API backend focused on secure transaction handling and comprehensive role-based authorization.',
      tech: ['Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'Swagger'],
      features: ['Transaction management', 'RBAC authorization', 'Swagger documentation', 'Secure data persistence'],
      architecture: 'Strict layered architecture separating controllers, services, and repositories with comprehensive security filters.',
      github: '#',
      demo: '#',
      color: 'from-emerald-500 to-teal-500',
      icon: <FaChartLine className="text-3xl text-emerald-400" />
    }
  ];

  return (
    <section id="projects" className="py-24 relative bg-slate-800/20">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-indigo-500">Projects</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition duration-500 blur-xl rounded-3xl`} style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
              <div className="glass-card relative p-8 rounded-3xl h-full flex flex-col hover:-translate-y-2 transition-transform duration-300">
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 transition-all">{project.title}</h3>
                      <p className="text-indigo-400 text-sm font-medium">{project.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a href={project.github} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all">
                      <FaGithub size={20} />
                    </a>
                    <a href={project.demo} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all">
                      <FaExternalLinkAlt size={16} />
                    </a>
                  </div>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6 flex-grow">
                  <h4 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-slate-400 text-sm">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color} mr-2`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
                  <h4 className="text-sm font-semibold text-slate-200 mb-2">Architecture</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{project.architecture}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-700/50">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
