"use client";

import { motion } from "framer-motion";
import { SKILLS, CERTIFICATIONS } from "@/lib/constants";

export default function Skills() {
  return (
    <div className="section-base">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent-blue/5 blur-3xl" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <div className="section-subtitle mb-4">{'// SKILLS'}</div>
          <h2 className="section-title">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Tools and technologies I use to build production-grade systems.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SKILLS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">{group.icon}</span>
                <h3 className="font-semibold text-text-primary text-sm">{group.category}</h3>
              </div>
              <div className="space-y-4">
                {group.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-mono text-text-secondary">{skill.name}</span>
                      <span className="text-xs font-mono text-accent-cyan">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: si * 0.08 + gi * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-subtitle text-center mb-6">{'// CERTIFICATIONS'}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-4 text-center"
              >
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-xs font-semibold text-text-primary leading-tight mb-1">{cert.name}</div>
                <div className="text-[10px] text-accent-blue font-mono">{cert.issuer}</div>
                <div className="text-[10px] text-text-muted mt-1">{cert.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* GitHub stats */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 glass-card p-6"
        >
          <div className="section-subtitle mb-4">{'// GITHUB_ACTIVITY'}</div>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://github.com/saividithvjdq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-bg-primary border border-border-subtle hover:border-accent-blue/40 transition-all"
            >
              <span className="text-2xl">⊹</span>
              <div>
                <div className="font-semibold text-text-primary text-sm">@saividithvjdq</div>
                <div className="text-text-muted text-xs">13 repositories · Backend & AI projects</div>
              </div>
            </a>
            <a
              href="https://github.com/saividith"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-bg-primary border border-border-subtle hover:border-accent-blue/40 transition-all"
            >
              <span className="text-2xl">◈</span>
              <div>
                <div className="font-semibold text-text-primary text-sm">@saividith</div>
                <div className="text-text-muted text-xs">6 repositories · Knowledge systems</div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
