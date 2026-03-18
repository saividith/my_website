'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ViewShellProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: ReactNode;
}

export default function ViewShell({ title, subtitle, onBack, children }: ViewShellProps) {
  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-4"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* View header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          {subtitle && (
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent-cyan/60 mb-1">
              {subtitle}
            </p>
          )}
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
            {title}
          </h1>
        </div>
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono
            bg-white/[0.03] border border-white/[0.08] text-white/40
            hover:text-white/70 hover:border-white/20 hover:bg-white/[0.06]
            transition-all duration-200"
        >
          <span className="text-accent-cyan group-hover:text-accent-cyan/80">ESC</span>
          <span className="hidden md:inline">Back to terminal</span>
        </button>
      </div>

      {/* View content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}
