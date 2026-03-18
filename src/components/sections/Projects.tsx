"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/constants";

const CATEGORIES = ["All", "AI/ML", "Backend", "Blockchain", "Full-Stack"] as const;

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof PROJECTS)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-3xl glass-card p-6 md:p-8 z-10 mt-8"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="section-subtitle text-[10px]">{'// PROJECT_MODULE'}</span>
            <h3 className="text-2xl font-bold text-text-primary mt-1">{project.title}</h3>
            <p className="text-text-secondary text-sm mt-1">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-bg-surface border border-border-default flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent-blue transition-all"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Stack */}
        <div className="mb-6">
          <div className="text-xs font-mono text-text-muted mb-2">TECH STACK</div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div className="mb-6">
          <div className="text-xs font-mono text-text-muted mb-3">ARCHITECTURE</div>
          <div className="terminal p-4 rounded-xl">
            <div className="text-xs font-mono text-text-secondary mb-3">
              <span className="text-accent-green">REQUEST FLOW</span>
              <span className="text-text-muted mx-2">→</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {project.architecture.components.map((comp, i) => (
                <div key={comp} className="flex items-center gap-2">
                  <div className="arch-node text-xs">{comp}</div>
                  {i < project.architecture.components.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-accent-blue text-sm"
                    >
                      →
                    </motion.span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engineering decisions */}
        <div className="mb-6">
          <div className="text-xs font-mono text-text-muted mb-3">ENGINEERING DECISIONS</div>
          <div className="space-y-3">
            {project.architecture.decisions.map((d, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-accent-cyan font-mono flex-shrink-0 mt-0.5">▸</span>
                <div>
                  <span className="text-text-primary font-medium">{d.choice}</span>
                  <span className="text-text-muted mx-2">—</span>
                  <span className="text-text-secondary">{d.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tradeoffs */}
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-6">
          <div className="text-xs font-mono text-amber-400 mb-1">⚖ TRADEOFF</div>
          <p className="text-sm text-text-secondary">{project.architecture.tradeoffs}</p>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="text-xs px-2.5 py-1 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green font-mono"
            >
              ✓ {h}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-neon w-full justify-center"
        >
          View on GitHub ↗
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<(typeof PROJECTS)[0] | null>(null);

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="section-base">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/5 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <div className="section-subtitle mb-4">{'// PROJECTS'}</div>
          <h2 className="section-title">
            System <span className="gradient-text">Modules</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto text-base">
            Click any project to explore its architecture, engineering decisions, and technical tradeoffs.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-200 ${
                filter === cat
                  ? "bg-accent-blue text-white shadow-glow-sm"
                  : "bg-bg-surface border border-border-default text-text-secondary hover:text-text-primary hover:border-accent-blue/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(project)}
                className="glass-card project-card relative p-5 cursor-pointer group"
              >
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full bg-accent-purple/20 border border-accent-purple/30 text-accent-purple font-mono">
                    FEATURED
                  </div>
                )}

                {/* Category dot */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-accent-blue" />
                  <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-bold text-text-primary text-base mb-2 group-hover:text-accent-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                  {project.tagline}
                </p>

                {/* Stack preview */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-0.5 rounded bg-bg-primary border border-border-subtle text-text-muted font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-bg-primary border border-border-subtle text-text-muted font-mono">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Open arrow */}
                <div className="flex items-center gap-1.5 text-xs text-text-muted group-hover:text-accent-blue transition-colors font-mono">
                  <span>View architecture</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
