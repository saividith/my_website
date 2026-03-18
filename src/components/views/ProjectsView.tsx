'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ViewShell from '@/components/ui/ViewShell';
import { PROJECTS } from '@/lib/constants';

interface ProjectDetailProps {
  project: typeof PROJECTS[0];
  onClose: () => void;
}

function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl
          bg-bg-secondary/95 backdrop-blur-2xl border border-white/[0.08]
          shadow-[0_24px_80px_rgba(0,0,0,0.6)] custom-scrollbar"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/[0.06] bg-bg-secondary/90 backdrop-blur-xl">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-cyan/50 mb-1">
              {project.category}
            </p>
            <h2 className="font-display text-2xl font-bold text-white">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center
              bg-white/5 border border-white/10 text-white/40 hover:text-white/70
              hover:bg-white/10 transition-all text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Description */}
          <p className="text-white/60 leading-relaxed">{project.description}</p>

          {/* Tech Stack */}
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase text-white/30 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono
                    bg-accent-cyan/[0.06] border border-accent-cyan/20 text-accent-cyan/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase text-white/30 mb-4">Architecture</h3>

            {/* Components */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.architecture.components.map((comp, i) => (
                <div key={comp} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono
                    bg-bg-surface border border-white/[0.08] text-white/60
                    hover:border-accent-cyan/30 hover:text-accent-cyan transition-all">
                    {comp}
                  </span>
                  {i < project.architecture.components.length - 1 && (
                    <span className="text-white/20 text-xs">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* Flow */}
            <div className="p-4 rounded-xl bg-bg-primary/50 border border-white/[0.04] mb-6">
              <p className="font-mono text-xs text-accent-cyan/60 leading-relaxed">
                {project.architecture.flow}
              </p>
            </div>

            {/* Decisions */}
            <div className="space-y-3 mb-6">
              <h4 className="font-mono text-[11px] tracking-wider uppercase text-white/25">
                Engineering Decisions
              </h4>
              {project.architecture.decisions.map((d) => (
                <div
                  key={d.choice}
                  className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                >
                  <p className="font-mono text-xs text-accent-purple/80 mb-1">{d.choice}</p>
                  <p className="text-xs text-white/40">{d.reason}</p>
                </div>
              ))}
            </div>

            {/* Tradeoffs */}
            <div className="p-4 rounded-xl bg-accent-purple/[0.04] border border-accent-purple/10">
              <h4 className="font-mono text-[11px] tracking-wider uppercase text-accent-purple/50 mb-2">
                Tradeoffs
              </h4>
              <p className="text-xs text-white/50 leading-relaxed">
                {project.architecture.tradeoffs}
              </p>
            </div>
          </div>

          {/* GitHub Link */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono
              bg-white/[0.04] border border-white/[0.1] text-white/60
              hover:text-accent-cyan hover:border-accent-cyan/30 hover:bg-accent-cyan/[0.05]
              transition-all duration-200"
          >
            View Source ↗
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ProjectsViewProps {
  onBack: () => void;
}

export default function ProjectsView({ onBack }: ProjectsViewProps) {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 3);

  return (
    <ViewShell title="Projects" subtitle="// Featured Work" onBack={onBack}>
      <div className="space-y-6">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedProject(project)}
            className="group relative w-full p-6 md:p-8 rounded-2xl cursor-pointer
              bg-white/[0.02] border border-white/[0.06]
              hover:border-accent-cyan/20 hover:bg-white/[0.03]
              hover:shadow-[0_0_40px_rgba(110,231,249,0.06)]
              transition-all duration-300"
          >
            {/* Top glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent-cyan/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-cyan/40">
                    {project.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span className="font-mono text-[10px] text-white/20">
                    {project.stack.length} technologies
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-accent-cyan/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-white/40 mb-4 leading-relaxed max-w-2xl">
                  {project.tagline}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono
                        bg-white/[0.03] border border-white/[0.06] text-white/35"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full
                bg-white/[0.03] border border-white/[0.06]
                group-hover:border-accent-cyan/20 group-hover:text-accent-cyan
                text-white/20 transition-all">
                →
              </div>
            </div>
          </motion.div>
        ))}
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
    </ViewShell>
  );
}
