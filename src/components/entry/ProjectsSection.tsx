'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PROJECTS } from '@/lib/constants';

const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 3);

interface ProjectDetailProps {
  project: typeof PROJECTS[0];
  onClose: () => void;
}

function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl
          bg-[#0a0d14]/95 backdrop-blur-2xl border border-white/[0.06]
          shadow-[0_24px_80px_rgba(0,0,0,0.6)] custom-scrollbar"
        initial={{ scale: 0.96, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/[0.04] bg-[#0a0d14]/90 backdrop-blur-xl">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-cyan/40 mb-1">
              {project.category}
            </p>
            <h2 className="font-display text-2xl font-bold text-white">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center
              bg-white/5 border border-white/8 text-white/40 hover:text-white/70
              hover:bg-white/10 transition-all text-sm"
          >
            &#x2715;
          </button>
        </div>

        <div className="p-6 space-y-8">
          <p className="text-white/50 leading-relaxed text-[15px]">{project.description}</p>

          {/* Stack */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/25 mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="px-3 py-1 rounded-full text-xs font-mono bg-accent-cyan/[0.05] border border-accent-cyan/15 text-accent-cyan/60">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/25 mb-4">
              Architecture
            </h3>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.architecture.components.map((comp, i) => (
                <div key={comp} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-bg-surface/60 border border-white/[0.05] text-white/50">
                    {comp}
                  </span>
                  {i < project.architecture.components.length - 1 && (
                    <span className="text-white/15 text-[10px]">&rarr;</span>
                  )}
                </div>
              ))}
            </div>

            {/* Flow */}
            <div className="p-4 rounded-xl bg-[#02040A]/60 border border-white/[0.03] mb-5">
              <p className="font-mono text-xs text-accent-cyan/50 leading-relaxed">{project.architecture.flow}</p>
            </div>

            {/* Decisions */}
            <div className="space-y-2.5 mb-5">
              <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/20">Engineering Decisions</h4>
              {project.architecture.decisions.map(d => (
                <div key={d.choice} className="p-3 rounded-lg bg-white/[0.015] border border-white/[0.03]">
                  <p className="font-mono text-xs text-accent-purple/70 mb-0.5">{d.choice}</p>
                  <p className="text-xs text-white/35">{d.reason}</p>
                </div>
              ))}
            </div>

            {/* Tradeoffs */}
            <div className="p-4 rounded-xl bg-accent-purple/[0.03] border border-accent-purple/8">
              <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase text-accent-purple/40 mb-1.5">Tradeoffs</h4>
              <p className="text-xs text-white/40 leading-relaxed">{project.architecture.tradeoffs}</p>
            </div>
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono
              bg-white/[0.03] border border-white/[0.08] text-white/50
              hover:text-accent-cyan hover:border-accent-cyan/20 transition-all duration-200"
          >
            View Source &nearr;
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="relative py-32 px-6" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent-cyan/30 mb-3">
            Selected Work
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            Projects
          </h2>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-5">
          {featuredProjects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(project)}
              className="group relative p-7 md:p-9 rounded-2xl cursor-pointer
                bg-white/[0.015] border border-white/[0.05]
                hover:border-white/[0.1] hover:bg-white/[0.025]
                transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent-cyan/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-semibold text-white/90 mb-2 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[15px] text-white/35 mb-5 leading-relaxed max-w-xl">
                    {project.tagline}
                  </p>

                  {/* Stack preview */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 5).map(tech => (
                      <span key={tech} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.025] text-white/25">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono text-white/15">
                        +{project.stack.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full
                  border border-white/[0.05] text-white/15
                  group-hover:border-white/[0.1] group-hover:text-white/40
                  transition-all duration-300 flex-shrink-0 mt-2">
                  <span className="text-sm">&rarr;</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
