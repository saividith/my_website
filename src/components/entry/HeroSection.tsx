'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection({ onOpenTerminal }: HeroSectionProps) {
  const scrollToWork = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent-cyan/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-accent-purple/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={fadeUp} className="mb-8">
          {PERSONAL_INFO.availableForWork && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase bg-emerald-500/[0.06] border border-emerald-500/15 text-emerald-400/70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
              Available for opportunities
            </span>
          )}
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          <span className="text-white">{PERSONAL_INFO.shortName}</span>
        </motion.h1>

        {/* Identity statement */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-white/40 leading-relaxed max-w-2xl mx-auto mb-4"
        >
          I design and build backend systems, intelligent applications,
          and scalable architectures.
        </motion.p>

        {/* Sub-line */}
        <motion.p
          variants={fadeUp}
          className="font-mono text-[13px] text-white/20 tracking-wide mb-12"
        >
          {PERSONAL_INFO.title} &middot; {PERSONAL_INFO.location}
        </motion.p>

        {/* Entry actions */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToWork}
            className="group relative px-8 py-3.5 rounded-xl text-sm font-medium
              bg-white text-[#02040A]
              hover:bg-white/90
              transition-all duration-200
              shadow-[0_0_30px_rgba(255,255,255,0.08)]
              hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]"
          >
            Explore Work
          </button>

          <button
            onClick={onOpenTerminal}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-xl text-sm font-mono
              bg-white/[0.04] border border-white/[0.08] text-white/50
              hover:text-white/80 hover:border-white/15 hover:bg-white/[0.06]
              transition-all duration-200"
          >
            <span>Enter Terminal</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-white/[0.06] border border-white/[0.08] text-white/25">
              <span>&#8984;</span>K
            </kbd>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-1 h-1.5 rounded-full bg-white/20" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
