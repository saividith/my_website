'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';

type Stage = 'ascii' | 'glitch' | 'resolved';

// ASCII art representation for Stage 1
const ASCII_FRAMES = [
  [
    '    ████████████    ',
    '  ██░░░░░░░░░░██  ',
    ' ██░░██░░░░██░░██ ',
    ' ██░░░░░░░░░░░░██ ',
    ' ██░░░████░░░░░██ ',
    '  ██░░░░░░░░░░██  ',
    '   ██████████████  ',
    '      ██░░██       ',
    '  ████████████████ ',
    '  ██░░░░██░░░░░░██ ',
    '  ██░░░░██░░░░░░██ ',
    '  ████████████████ ',
  ],
  [
    '    ▓▓▓▓▓▓▓▓▓▓    ',
    '  ▓▓▒▒▒▒▒▒▒▒▒▓▓  ',
    ' ▓▓▒▒██▒▒▒▒██▒▓▓ ',
    ' ▓▓▒▒▒▒▒▒▒▒▒▒▒▓▓ ',
    ' ▓▓▒▒▒████▒▒▒▒▓▓ ',
    '  ▓▓▒▒▒▒▒▒▒▒▒▓▓  ',
    '   ▓▓▓▓▓▓▓▓▓▓▓▓  ',
    '      ▓▓▒▒▓▓      ',
    '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ',
    '  ▓▓▒▒▒▒▓▓▒▒▒▒▓▓ ',
    '  ▓▓▒▒▒▒▓▓▒▒▒▒▓▓ ',
    '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ',
  ],
];

export default function HologramProfile() {
  const [stage, setStage] = useState<Stage>('ascii');
  const [asciiFrame, setAsciiFrame] = useState(0);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  // Glare position
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  // Stage progression
  useEffect(() => {
    // ASCII phase: cycle frames
    const asciiInterval = setInterval(() => {
      setAsciiFrame(prev => (prev + 1) % ASCII_FRAMES.length);
    }, 200);

    // After 1.5s, transition to glitch
    const glitchTimeout = setTimeout(() => {
      setStage('glitch');
      clearInterval(asciiInterval);
    }, 1500);

    return () => {
      clearInterval(asciiInterval);
      clearTimeout(glitchTimeout);
    };
  }, []);

  // Glitch phase animation
  useEffect(() => {
    if (stage !== 'glitch') return;

    let frame = 0;
    const maxFrames = 20;
    const interval = setInterval(() => {
      frame++;
      setGlitchIntensity(Math.random());

      if (frame >= maxFrames) {
        clearInterval(interval);
        setStage('resolved');
      }
    }, 80);

    return () => clearInterval(interval);
  }, [stage]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="flex flex-col items-center gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile card with 3D tilt */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent-cyan/30 via-accent-purple/30 to-accent-cyan/30 blur-sm animate-pulse-glow" />

        {/* Card body */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-bg-secondary/80 backdrop-blur-xl">
          {/* Glare effect */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            }}
          />

          {/* Stage 1: ASCII */}
          {stage === 'ascii' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-bg-primary"
              exit={{ opacity: 0 }}
            >
              <pre className="text-[8px] md:text-[9px] leading-tight font-mono text-accent-cyan/80 select-none">
                {ASCII_FRAMES[asciiFrame]?.join('\n')}
              </pre>
              {/* Matrix rain effect */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-accent-cyan font-mono text-[10px]"
                    style={{ left: `${12 + i * 12}%` }}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                      y: ['-10%', '110%'],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Infinity,
                      delay: Math.random() * 0.8,
                    }}
                  >
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Stage 2: Glitch */}
          {stage === 'glitch' && (
            <div className="absolute inset-0">
              {/* Distorted image layers */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://avatars.githubusercontent.com/sai-vidith)`,
                  filter: `contrast(${1.2 + glitchIntensity * 0.5}) saturate(${1.5 + glitchIntensity})`,
                  transform: `translateX(${(glitchIntensity - 0.5) * 10}px)`,
                }}
              />
              {/* Red channel offset */}
              <div
                className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-60"
                style={{
                  backgroundImage: `url(https://avatars.githubusercontent.com/sai-vidith)`,
                  filter: 'hue-rotate(90deg)',
                  transform: `translateX(${glitchIntensity * 6}px) translateY(${(glitchIntensity - 0.5) * 4}px)`,
                }}
              />
              {/* Scanline bars */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 bg-bg-primary/80"
                  style={{
                    top: `${20 + glitchIntensity * 60 + i * 15}%`,
                    height: `${2 + glitchIntensity * 4}px`,
                    transform: `translateX(${(glitchIntensity - 0.5) * 20}px)`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Stage 3: Resolved */}
          {stage === 'resolved' && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://avatars.githubusercontent.com/sai-vidith"
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover"
              />
              {/* Subtle color overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-accent-cyan/10" />
            </motion.div>
          )}

          {/* Floating border animation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect
              x="0" y="0" width="100" height="100"
              fill="none"
              stroke="url(#hologramGradient)"
              strokeWidth="0.5"
              strokeDasharray="10 5"
              className="animate-scan"
            />
            <defs>
              <linearGradient id="hologramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6EE7F9" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6EE7F9" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Profile info */}
      <motion.div
        className="text-center space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: stage === 'resolved' ? 1 : 0, y: stage === 'resolved' ? 0 : 10 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
          {PERSONAL_INFO.name}
        </h2>
        <p className="font-mono text-sm text-accent-cyan/80 tracking-wider">
          @{PERSONAL_INFO.handle}
        </p>
        <p className="text-white/50 text-sm max-w-md leading-relaxed">
          {PERSONAL_INFO.bio}
        </p>

        {/* Status badges */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {PERSONAL_INFO.availableForWork && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/40">
            {PERSONAL_INFO.location}
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-4 pt-3">
          <a
            href={PERSONAL_INFO.github.primary}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-accent-cyan transition-colors text-sm font-mono"
          >
            GitHub ↗
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-accent-purple transition-colors text-sm font-mono"
          >
            LinkedIn ↗
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-white/40 hover:text-accent-cyan transition-colors text-sm font-mono"
          >
            Email ↗
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
