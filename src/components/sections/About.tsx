"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO, SYSTEM_PHILOSOPHY, CURRENTLY_LEARNING, LEADERSHIP, EDUCATION } from "@/lib/constants";

const STATS = [
  { label: "CGPA", value: EDUCATION.cgpa, unit: "/ 10", color: "accent-blue" },
  { label: "Community Led", value: "200+", unit: "members", color: "accent-cyan" },
  { label: "Manual Effort Cut", value: "40+", unit: "hrs / month", color: "accent-purple" },
  { label: "Problems Solved", value: "160+", unit: "LeetCode", color: "accent-green" },
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
          <div className="section-subtitle mb-4">{'// ABOUT_ME'}</div>
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
                {["Python", "FastAPI", "Ray", "YOLOv8", "Next.js", "Docker"].map((tag) => (
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

          {/* Right: Leadership + Philosophy */}
          <div className="space-y-6">
            {/* Leadership & achievements */}
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
                <span className="ml-3 text-xs text-text-muted font-mono">leadership — achievements.log</span>
              </div>
              <div className="p-5 space-y-4">
                {LEADERSHIP.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-accent-cyan font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                    <div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-text-primary">{item.title}</span>
                        <span className="text-xs text-text-muted font-mono">{item.organization}</span>
                        {item.period && <span className="text-[10px] text-text-muted font-mono">· {item.period}</span>}
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed mt-1">{item.description}</p>
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
