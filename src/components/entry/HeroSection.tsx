'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';
import { TypeAnimation } from 'react-type-animation';

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
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent-cyan/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-accent-purple/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={fadeUp} className="mb-6">
          {PERSONAL_INFO.availableForWork && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available to Build
            </span>
          )}
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1] mb-5"
        >
          <span className="text-white">Sai Vidith</span>
        </motion.h1>

        {/* Typewriter Roles */}
        <motion.div
          variants={fadeUp}
          className="h-10 md:h-12 mb-7"
        >
          <TypeAnimation
            sequence={[
              "Aspiring AI Engineer", 2000,
              "Cloud Engineer", 2000,
              "ML Engineer", 2000,
            ]}
            wrapper="span"
            repeat={Infinity}
            className="text-xl md:text-3xl font-medium gradient-text-blue-cyan"
          />
        </motion.div>

        {/* Self Intro */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-10 font-light"
        >
          I design and build intelligent systems that scale. From robust backend architectures 
          and cloud deployments to cutting-edge machine learning pipelines, I focus on 
          bringing complex engineering concepts to life.
        </motion.p>

        {/* Entry actions */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={scrollToWork}
            className="group relative px-8 py-4 rounded-xl text-sm font-medium
              bg-white text-[#02040A]
              hover:bg-white/90 hover:-translate-y-0.5
              transition-all duration-300
              shadow-[0_0_30px_rgba(255,255,255,0.08)]
              hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Explore My Work
          </button>

          <button
            onClick={onOpenTerminal}
            className="group flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-mono
              bg-white/[0.03] border border-white/[0.08] text-white/50
              hover:text-white/80 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-0.5
              transition-all duration-300 shadow-lg"
          >
            <span className="text-accent-cyan/80 group-hover:text-accent-cyan">~/$</span>
            <span>Enter Terminal</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] bg-white/[0.06] border border-white/[0.08] text-white/30">
              <span className="text-xs">&#8984;</span>K
            </kbd>
          </button>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div 
          variants={fadeUp} 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 w-full max-w-3xl border-t border-white/[0.04] pt-8"
        >
          {[
            { label: "AI Models", val: "5+" },
            { label: "Backend APIs", val: "10+" },
            { label: "Cloud Deployments", val: "8+" },
            { label: "Years Coding", val: "3+" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold text-white/80 mb-1">{stat.val}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
