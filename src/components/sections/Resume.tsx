"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO, WORK_EXPERIENCE, EDUCATION, SKILLS, CERTIFICATIONS } from "@/lib/constants";

export default function Resume() {
  return (
    <div className="section-base">
      <div className="absolute top-0 left-0 w-96 h-64 bg-accent-purple/5 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <div className="section-subtitle mb-4">{"// RESUME"}</div>
          <h2 className="section-title">
            The Full <span className="gradient-text">Record</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Everything above, condensed to one page — or grab the PDF.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Left: download card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-accent-cyan/[0.06] via-transparent to-accent-purple/[0.06] p-[1px]">
              <div className="rounded-2xl bg-bg-secondary/90 backdrop-blur-xl p-7">
                {/* File icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 border border-white/10 flex items-center justify-center text-2xl mb-5">
                  📄
                </div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-1">
                  {PERSONAL_INFO.shortName} — Resume
                </h3>
                <p className="text-xs font-mono text-text-muted mb-6">SaiVidith_Resume.pdf</p>

                <div className="flex flex-col gap-3">
                  <a
                    href={PERSONAL_INFO.resumeUrl}
                    download
                    className="btn-neon primary justify-center w-full"
                  >
                    ↓ Download PDF
                  </a>
                  <a
                    href={PERSONAL_INFO.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon justify-center w-full"
                  >
                    View in New Tab
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-border-subtle space-y-2 text-xs font-mono text-text-muted">
                  <div className="flex justify-between">
                    <span>Email</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-accent-cyan hover:underline">{PERSONAL_INFO.email}</a>
                  </div>
                  <div className="flex justify-between">
                    <span>Location</span>
                    <span className="text-text-secondary">{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: condensed resume content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-6 md:p-8 space-y-8"
          >
            {/* Summary */}
            <div>
              <div className="section-subtitle mb-3">Summary</div>
              <p className="text-text-secondary text-sm leading-relaxed">{PERSONAL_INFO.bio}</p>
            </div>

            {/* Education */}
            <div>
              <div className="section-subtitle mb-3">Education</div>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-text-primary font-semibold text-sm">{EDUCATION.institution}</p>
                  <p className="text-text-muted text-xs font-mono mt-0.5">{EDUCATION.degree}</p>
                </div>
                <div className="text-right">
                  <p className="text-accent-cyan text-xs font-mono">{EDUCATION.period}</p>
                  <p className="text-text-muted text-xs font-mono mt-0.5">CGPA {EDUCATION.cgpa}</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="section-subtitle mb-3">Experience</div>
              <div className="space-y-5">
                {WORK_EXPERIENCE.map((job) => (
                  <div key={job.title + job.organization}>
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-1.5">
                      <div>
                        <span className="text-text-primary font-semibold text-sm">{job.title}</span>
                        <span className="text-text-muted text-xs font-mono ml-2">{job.organization}</span>
                      </div>
                      <span className="text-accent-cyan text-xs font-mono flex-shrink-0">{job.period}</span>
                    </div>
                    <p className="text-text-secondary text-xs leading-relaxed">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="section-subtitle mb-3">Skills</div>
              <div className="space-y-2.5">
                {SKILLS.map((group) => (
                  <div key={group.category} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <span className="text-xs font-mono text-text-muted w-32 flex-shrink-0">{group.category}</span>
                    <span className="text-xs text-text-secondary leading-relaxed">{group.items.join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="section-subtitle mb-3">Certifications</div>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert) => (
                  <span
                    key={cert.name}
                    className="text-xs font-mono px-3 py-1.5 rounded-full bg-bg-primary border border-border-subtle text-text-secondary"
                  >
                    {cert.name} <span className="text-text-muted">· {cert.issuer}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
