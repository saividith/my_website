"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";

const TYPE_COLORS: Record<string, string> = {
  education: "accent-blue",
  achievement: "accent-purple",
  project: "accent-green",
};

const TYPE_ICONS: Record<string, string> = {
  education: "🎓",
  achievement: "🏆",
  project: "⚙️",
};

export default function Experience() {
  return (
    <div className="section-base">
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-green/5 blur-3xl rounded-full" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <div className="section-subtitle mb-4">// EXPERIENCE</div>
          <h2 className="section-title">
            Journey <span className="gradient-text">Log</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border-default to-transparent" />

          <div className="space-y-12">
            {EXPERIENCE.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex gap-6 md:gap-0 ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Card */}
                  <div className={`md:w-[calc(50%-32px)] ${isEven ? "md:mr-auto" : "md:ml-auto"} ml-16 md:ml-0`}>
                    <div className="glass-card p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-xl flex-shrink-0">{TYPE_ICONS[item.type]}</span>
                        <div>
                          <h3 className="font-bold text-text-primary text-base leading-tight">{item.title}</h3>
                          <p className="text-text-muted text-xs font-mono mt-0.5">{item.organization}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mb-3 text-xs font-mono">
                        <span className={`text-${TYPE_COLORS[item.type]}`}>{item.period}</span>
                        <span className="text-text-muted">{item.location}</span>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-[10px] px-2 py-0.5 rounded bg-bg-primary border border-border-subtle text-text-muted font-mono"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 border-${TYPE_COLORS[item.type]} bg-bg-primary`}
                      style={{ marginTop: `${i * 0 + 24}px` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
