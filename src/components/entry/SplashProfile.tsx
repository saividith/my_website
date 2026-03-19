'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface SplashProfileProps {
  onEnter: () => void;
}

export default function SplashProfile({ onEnter }: SplashProfileProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02040A] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content Area */}
      <motion.div 
        className="relative z-10 flex flex-col items-center cursor-pointer group"
        onClick={onEnter}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {/* Profile Image Container */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
          {/* Outer glow aura */}
          <div className="absolute inset-[-10%] rounded-full bg-gradient-to-tr from-accent-cyan via-accent-blue to-accent-purple opacity-40 group-hover:opacity-100 blur-2xl transition-opacity duration-700" />
          
          {/* Image wrapper */}
          <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-accent-cyan/50 transition-colors duration-700 overflow-hidden bg-bg-surface shadow-2xl">
            <Image
              src="/me.jpg"
              alt="Sai Vidith"
              fill
              className="object-cover scale-[1.02] group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"
              priority
            />
          </div>
        </div>

        {/* Greeting */}
        <div className="text-center">
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-accent-cyan/60 uppercase mb-3">
            System Initialization
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Gouribhatla Sai Vidith
          </h1>
          <p className="text-white/40 text-sm md:text-base max-w-sm text-center mx-auto">
            Initializing neural pathways and establishing backend connections...
          </p>
        </div>

        {/* Enter CTA */}
        <motion.div 
          className="mt-14 flex flex-col items-center justify-center"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/50 group-hover:text-accent-cyan transition-colors duration-500">
            Click Anywhere to Enter
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent mt-4 group-hover:from-accent-cyan transition-colors duration-500" />
        </motion.div>
      </motion.div>

      {/* Grid background for tech feel */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none" />
    </motion.div>
  );
}
