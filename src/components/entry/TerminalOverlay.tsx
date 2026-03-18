'use client';

import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ViewState } from '@/lib/state';

const Terminal = dynamic(() => import('@/components/terminal/Terminal'), { ssr: false });
const ProjectsView = dynamic(() => import('@/components/views/ProjectsView'), { ssr: false });
const SystemDesignView = dynamic(() => import('@/components/views/SystemDesignView'), { ssr: false });
const SkillsView = dynamic(() => import('@/components/views/SkillsView'), { ssr: false });
const AboutView = dynamic(() => import('@/components/views/AboutView'), { ssr: false });
const ProfileView = dynamic(() => import('@/components/views/ProfileView'), { ssr: false });
const AssistantView = dynamic(() => import('@/components/views/AssistantView'), { ssr: false });

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  terminalView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export default function TerminalOverlay({
  isOpen,
  onClose,
  terminalView,
  onNavigate,
}: TerminalOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const goBackToTerminal = useCallback(() => {
    onNavigate('terminal');
  }, [onNavigate]);

  // ESC to close overlay or go back to terminal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (terminalView !== 'terminal') {
          goBackToTerminal();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, terminalView, onClose, goBackToTerminal]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const renderView = () => {
    switch (terminalView) {
      case 'projects':
        return <ProjectsView key="projects" onBack={goBackToTerminal} />;
      case 'system_design':
        return <SystemDesignView key="system_design" onBack={goBackToTerminal} />;
      case 'skills':
        return <SkillsView key="skills" onBack={goBackToTerminal} />;
      case 'about':
        return <AboutView key="about" onBack={goBackToTerminal} />;
      case 'profile':
        return <ProfileView key="profile" onBack={goBackToTerminal} />;
      case 'assistant':
        return <AssistantView key="assistant" onBack={goBackToTerminal} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#02040A]/95 backdrop-blur-xl" />
          <div className="grid-bg" />

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/30 tracking-wider">SV-OS Terminal</span>
              {terminalView !== 'terminal' && (
                <span className="font-mono text-[10px] text-accent-cyan/30 tracking-wider uppercase">
                  / {terminalView.replace('_', ' ')}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono
                text-white/25 hover:text-white/50 hover:bg-white/[0.03]
                transition-all duration-200"
            >
              <span>Close</span>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.04] border border-white/[0.06] text-white/20">
                ESC
              </kbd>
            </button>
          </div>

          {/* Content */}
          <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {terminalView === 'terminal' ? (
                <motion.div
                  key="terminal"
                  className="flex items-center justify-center min-h-full px-4 py-12"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Terminal onNavigate={onNavigate} isActive={isOpen && terminalView === 'terminal'} />
                </motion.div>
              ) : (
                <motion.div
                  key={terminalView}
                  className="min-h-full py-8 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderView()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
