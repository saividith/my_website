'use client';

import { motion } from 'framer-motion';
import ViewShell from '@/components/ui/ViewShell';
import { PERSONAL_INFO, EXPERIENCE, CURRENTLY_LEARNING } from '@/lib/constants';

interface AboutViewProps {
  onBack: () => void;
}

export default function AboutView({ onBack }: AboutViewProps) {
  return (
    <ViewShell title="About" subtitle="// Personal Dashboard" onBack={onBack}>
      <div className="space-y-8">
        {/* Bio card */}
        <motion.div
          className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold text-white mb-3">
                {PERSONAL_INFO.name}
              </h2>
              <p className="font-mono text-xs text-accent-cyan/60 mb-4 tracking-wider">
                {PERSONAL_INFO.title} · {PERSONAL_INFO.location}
              </p>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                {PERSONAL_INFO.bio}
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Projects', value: '7+' },
                  { label: 'Skills', value: '30+' },
                  { label: 'Certifications', value: '4' },
                  { label: 'Status', value: 'Open to work' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center"
                  >
                    <p className="font-display text-xl font-bold text-white mb-0.5">{stat.value}</p>
                    <p className="font-mono text-[10px] text-white/25 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-white/30 mb-4">
            Timeline
          </h3>
          <div className="space-y-4">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="relative pl-6 border-l border-white/[0.06]"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-accent-cyan/60 -translate-x-[4.5px]" />

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-accent-cyan/40 uppercase tracking-wider">
                      {exp.type}
                    </span>
                    <span className="text-white/10">·</span>
                    <span className="font-mono text-[10px] text-white/20">{exp.period}</span>
                  </div>
                  <h4 className="font-display text-base font-semibold text-white mb-1">{exp.title}</h4>
                  <p className="font-mono text-xs text-white/30 mb-2">{exp.organization}</p>
                  <p className="text-xs text-white/40 leading-relaxed mb-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.highlights.map(h => (
                      <span
                        key={h}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono
                          bg-white/[0.03] border border-white/[0.05] text-white/30"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Currently learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-white/30 mb-4">
            Currently Learning
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CURRENTLY_LEARNING.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
              >
                <span className="text-accent-cyan/40 font-mono text-xs">0{i + 1}</span>
                <span className="text-sm text-white/50">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </ViewShell>
  );
}
