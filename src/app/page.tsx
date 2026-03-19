'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ViewState } from '@/lib/state';
import { initializeCommands } from '@/lib/commands';
import HeroSection from '@/components/entry/HeroSection';
import ProjectsSection from '@/components/entry/ProjectsSection';
import SystemDesignSection from '@/components/entry/SystemDesignSection';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Navigation from '@/components/layout/Navigation';

import SplashProfile from '@/components/entry/SplashProfile';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy-load heavy components
const AISection = dynamic(() => import('@/components/entry/AISection'), { ssr: false });
const Playground = dynamic(() => import('@/components/sections/Playground'), { ssr: false });
const TerminalOverlay = dynamic(() => import('@/components/entry/TerminalOverlay'), { ssr: false });

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalView, setTerminalView] = useState<ViewState>('terminal');
  const [showSplash, setShowSplash] = useState(true);
  const initialized = useRef(false);

  // Initialize command registry once
  useEffect(() => {
    if (!initialized.current) {
      initializeCommands();
      initialized.current = true;
    }
  }, []);

  const openTerminal = useCallback(() => {
    setTerminalView('terminal');
    setTerminalOpen(true);
  }, []);

  const closeTerminal = useCallback(() => {
    setTerminalOpen(false);
    // Reset view after close animation
    setTimeout(() => setTerminalView('terminal'), 300);
  }, []);

  const navigateTerminal = useCallback((view: ViewState) => {
    setTerminalView(view);
  }, []);

  // CMD+K / Ctrl+K to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (terminalOpen) {
          closeTerminal();
        } else {
          openTerminal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalOpen, openTerminal, closeTerminal]);

  return (
    <main className="relative min-h-screen">
      {/* Background layers */}
      <div className="fixed inset-0 bg-[#02040A]" />
      <div className="grid-bg" />
      <div className="noise fixed inset-0 pointer-events-none" />

      {/* Splash Screen Profile */}
      <AnimatePresence>
        {showSplash && (
          <SplashProfile onEnter={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Navigation - placed outside motion.div to prevent fixed positioning issues */}
      {!showSplash && <Navigation />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10"
      >
        {/* Hero */}
        <div id="hero">
          <HeroSection onOpenTerminal={openTerminal} />
        </div>

        {/* About — System Dashboard */}
        <div id="about">
          <About />
        </div>

        {/* Projects */}
        <ProjectsSection />

        {/* System Design */}
        <div id="system-design">
          <SystemDesignSection />
        </div>

        {/* AI Assistant */}
        <div id="ai-assistant">
          <AISection />
        </div>

        {/* Skills & Certifications */}
        <div id="skills">
          <Skills />
        </div>

        {/* Experience Timeline */}
        <div id="experience">
          <Experience />
        </div>

        {/* Interactive Playground */}
        <div id="playground">
          <Playground />
        </div>

        {/* Contact */}
        <div id="contact">
          <Contact />
        </div>

        {/* Footer */}
        <footer className="relative py-16 px-6 border-t border-white/[0.03]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-mono text-[12px] text-white/15">
              Built with intention. Next.js, TypeScript, Framer Motion.
            </p>
            <button
              onClick={openTerminal}
              className="flex items-center gap-2 font-mono text-[12px] text-white/20 hover:text-white/40 transition-colors"
            >
              <span>Open Terminal</span>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.03] border border-white/[0.05]">
                <span>&#8984;</span>K
              </kbd>
            </button>
          </div>
        </footer>
      </motion.div>

      {/* Terminal overlay */}
      <TerminalOverlay
        isOpen={terminalOpen}
        onClose={closeTerminal}
        terminalView={terminalView}
        onNavigate={navigateTerminal}
      />
    </main>
  );
}
