"use client";

import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import dynamic from "next/dynamic";


const ParticleNetwork = dynamic(() => import("@/components/three/ParticleNetwork"), {
  ssr: false,
  loading: () => null,
});

const BOOT_LINES = [
  { text: "[BOOT] Initializing SV-OS v2.1...", delay: 200 },
  { text: "[OK]   Loading kernel modules", delay: 600 },
  { text: "[OK]   Mounting file system", delay: 400 },
  { text: "[OK]   Starting AI subsystems", delay: 500 },
  { text: "[OK]   Connecting to neural network", delay: 450 },
  { text: "[OK]   Initializing Python runtime", delay: 350 },
  { text: "[OK]   Loading knowledge base", delay: 600 },
  { text: "[INFO] Backend systems: ONLINE", delay: 300 },
  { text: "[INFO] AI services: READY", delay: 400 },
  { text: "──────────────────────────────────────", delay: 200 },
  { text: "Welcome, Recruiter. System ready.", delay: 600 },
];

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let accumulated = 0;

    BOOT_LINES.forEach((line, i) => {
      accumulated += line.delay;
      timeout = setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => {
            setDone(true);
            onComplete();
          }, 800);
        }
      }, accumulated);
    });

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <motion.div
      className="terminal max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="terminal-header">
        <div className="terminal-btn red" />
        <div className="terminal-btn yellow" />
        <div className="terminal-btn green" />
        <span className="ml-3 text-xs text-text-muted font-mono">sv-os — terminal</span>
      </div>
      <div className="p-6 font-mono text-sm min-h-[280px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`leading-7 ${line.startsWith("[OK]")
                ? "text-accent-green"
                : line.startsWith("[BOOT]")
                  ? "text-accent-cyan"
                  : line.startsWith("[INFO]")
                    ? "text-accent-blue"
                    : line.startsWith("Welcome")
                      ? "text-white font-semibold"
                      : "text-text-secondary"
              }`}
          >
            {line}
          </motion.div>
        ))}
        {!done && (
          <span className="text-accent-blue animate-blink">█</span>
        )}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [bootDone, setBootDone] = useState(false);
  const [, setShowContent] = useState(false);

  const handleBootComplete = () => {
    setTimeout(() => {
      setBootDone(true);
      setTimeout(() => setShowContent(true), 300);
    }, 400);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ParticleNetwork />
        </Suspense>
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 z-0 bg-hero-glow" />

      {/* Center glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-blue/5 blur-3xl z-0" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {!bootDone ? (
            <motion.div key="boot" className="w-full max-w-2xl">
              <BootSequence onComplete={handleBootComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="flex flex-col items-center gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
            >
              {/* Status badge */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="status-badge available">
                  <span className="status-dot" />
                  Available for opportunities
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="section-title"
              >
                <span className="text-text-primary">Hi, I&apos;m </span>
                <span className="gradient-text text-glow-blue">Sai Vidith</span>
              </motion.h1>

              {/* Typewriter roles */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl md:text-3xl font-semibold text-text-secondary"
              >
                <TypeAnimation
                  sequence={[
                    "Backend Engineer", 2000,
                    "AI Systems Builder", 2000,
                    "Systems Architect", 2000,
                    "Problem Solver", 2000,
                    "Full-Stack Developer", 2000,
                  ]}
                  wrapper="span"
                  repeat={Infinity}
                  className="text-accent-cyan"
                />
              </motion.div>

              {/* Bio */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl text-text-secondary text-lg leading-relaxed"
              >
                I build systems that scale — from distributed backends to intelligent AI pipelines.
                Obsessed with clean architecture and engineering that makes a difference.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 flex-wrap justify-center"
              >
                <a href="#projects" className="btn-neon primary" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  View Projects
                </a>
                <a href="#ai-assistant" className="btn-neon" onClick={(e) => { e.preventDefault(); document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  Ask my AI →
                </a>
                <a
                  href="https://github.com/sai-vidith"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon"
                >
                  GitHub ↗
                </a>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-8 mt-4"
              >
                {[
                  { value: "7+", label: "Projects" },
                  { value: "5+", label: "AI/ML Apps" },
                  { value: "3+", label: "Certifications" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold gradient-text-blue-cyan">{stat.value}</div>
                    <div className="text-xs text-text-muted font-mono mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Scroll hint */}
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
              >
                <span className="text-xs font-mono">scroll down</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-0.5 h-8 bg-gradient-to-b from-accent-blue to-transparent rounded-full"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
