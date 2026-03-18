"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO, SYSTEM_PHILOSOPHY, CURRENTLY_LEARNING } from "@/lib/constants";

const STATS = [
  { label: "Projects Built", value: "7+", unit: "projects", color: "accent-blue" },
  { label: "AI/ML Systems", value: "5+", unit: "deployed", color: "accent-cyan" },
  { label: "Certifications", value: "4+", unit: "verified", color: "accent-purple" },
  { label: "Experience", value: "2+", unit: "years", color: "accent-green" },
];

const PROCESS_BAR = [
  { label: "CPU (Problem Solving)", value: 92 },
  { label: "RAM (Learning Speed)", value: 88 },
  { label: "GPU (AI Processing)", value: 90 },
  { label: "DISK (Knowledge Base)", value: 85 },
];

export default function About() {
  return (
    <div className="section-base">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent-blue/5 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <div className="section-subtitle mb-4">// ABOUT_ME</div>
          <h2 className="section-title">
            System <span className="gradient-text">Dashboard</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Bio + Stats */}
          <div className="space-y-6">
            {/* Bio card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                  SV
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-primary">{PERSONAL_INFO.shortName}</h3>
                  <p className="text-accent-blue text-sm font-mono">{PERSONAL_INFO.title}</p>
                  <p className="text-text-muted text-xs mt-1">{PERSONAL_INFO.institution}</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{PERSONAL_INFO.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Python", "FastAPI", "LangChain", "YOLOv8", "React", "Docker"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-4 text-center"
                >
                  <div className={`text-3xl font-extrabold text-${stat.color}`}>{stat.value}</div>
                  <div className="text-text-muted text-xs font-mono mt-1">{stat.unit}</div>
                  <div className="text-text-secondary text-xs mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Currently learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="text-xs font-mono text-accent-green uppercase tracking-wider">Currently Learning</span>
              </div>
              <ul className="space-y-2">
                {CURRENTLY_LEARNING.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-accent-cyan mt-0.5 flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right: System load + Philosophy */}
          <div className="space-y-6">
            {/* System load */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="terminal"
            >
              <div className="terminal-header">
                <div className="terminal-btn red" />
                <div className="terminal-btn yellow" />
                <div className="terminal-btn green" />
                <span className="ml-3 text-xs text-text-muted font-mono">system — resource monitor</span>
              </div>
              <div className="p-5 space-y-4">
                {PROCESS_BAR.map((bar, i) => (
                  <motion.div
                    key={bar.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-text-secondary">{bar.label}</span>
                      <span className="text-xs font-mono text-accent-cyan">{bar.value}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* System philosophy */}
            <div className="grid grid-cols-1 gap-3">
              {SYSTEM_PHILOSOPHY.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-4 flex gap-4"
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-text-primary text-sm mb-1">{item.title}</div>
                    <div className="text-text-muted text-xs leading-relaxed">{item.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
