'use client';

import { motion } from 'framer-motion';
import ViewShell from '@/components/ui/ViewShell';
import { SKILLS, CERTIFICATIONS } from '@/lib/constants';

interface SkillsViewProps {
  onBack: () => void;
}

export default function SkillsView({ onBack }: SkillsViewProps) {
  return (
    <ViewShell title="Skills" subtitle="// Technical Arsenal" onBack={onBack}>
      <div className="space-y-10">
        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.08, duration: 0.4 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]
                hover:border-white/[0.1] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-lg">{category.icon}</span>
                <h3 className="font-display text-base font-semibold text-white">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-3.5">
                {category.items.map((skill, skillIdx) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-white/50 font-mono">{skill.name}</span>
                      <span className="text-[10px] text-white/20 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent-cyan/80 to-accent-purple/80"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          delay: catIdx * 0.08 + skillIdx * 0.05 + 0.3,
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                        }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-white/30 mb-4">
            Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]
                  hover:border-accent-cyan/20 transition-all duration-200"
              >
                <p className="text-sm text-white/60 font-medium mb-1">{cert.name}</p>
                <p className="font-mono text-[10px] text-white/25">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </ViewShell>
  );
}
