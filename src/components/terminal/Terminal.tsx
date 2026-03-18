'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseInput, getCommand, getSuggestions, CommandOutput } from '@/lib/commands/registry';
import { ViewState } from '@/lib/state';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp: number;
}

interface TerminalProps {
  onNavigate: (view: ViewState) => void;
  isActive: boolean;
}

const BOOT_SEQUENCE = [
  '> Initializing SV-OS v1.0...',
  '> Loading kernel modules...',
  '> Mounting file systems... OK',
  '> Starting terminal engine... OK',
  '> System ready.',
  '',
  '  Welcome to Sai Vidith\'s Terminal OS',
  '  Type "help" for available commands.',
  '',
];

export default function Terminal({ onNavigate, isActive }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const lineIdCounter = useRef(0);

  const generateId = () => {
    lineIdCounter.current += 1;
    return `line-${lineIdCounter.current}-${Date.now()}`;
  };

  const addLines = useCallback((newLines: TerminalLine[]) => {
    setLines(prev => [...prev, ...newLines]);
  }, []);

  // Boot sequence
  useEffect(() => {
    if (booted) return;
    let timeout: NodeJS.Timeout;
    const bootLines: TerminalLine[] = [];

    BOOT_SEQUENCE.forEach((line, i) => {
      timeout = setTimeout(() => {
        const newLine: TerminalLine = {
          id: generateId(),
          type: 'system',
          content: line,
          timestamp: Date.now(),
        };
        bootLines.push(newLine);
        setLines(prev => [...prev, newLine]);

        if (i === BOOT_SEQUENCE.length - 1) {
          setBooted(true);
        }
      }, 100 + i * 120);
    });

    return () => clearTimeout(timeout);
  }, [booted]);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when terminal is active
  useEffect(() => {
    if (isActive && booted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive, booted]);

  const executeCommand = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Add input line
    const inputLine: TerminalLine = {
      id: generateId(),
      type: 'input',
      content: trimmed,
      timestamp: Date.now(),
    };

    // Parse and execute
    const { command } = parseInput(trimmed);
    const cmd = getCommand(trimmed.toLowerCase()) || getCommand(command);

    const outputLines: TerminalLine[] = [inputLine];

    if (cmd) {
      const result: CommandOutput = cmd.execute(trimmed.split(/\s+/).slice(1));

      if (result.type === 'clear') {
        setLines([]);
        setInput('');
        setCommandHistory(prev => [...prev, trimmed]);
        setHistoryIndex(-1);
        return;
      }

      const outLine: TerminalLine = {
        id: generateId(),
        type: result.type === 'error' ? 'error' : 'output',
        content: result.content,
        timestamp: Date.now(),
      };
      outputLines.push(outLine);

      if (result.navigateTo) {
        // Delay navigation slightly for the output to appear
        setTimeout(() => {
          onNavigate(result.navigateTo!);
        }, 600);
      }
    } else {
      outputLines.push({
        id: generateId(),
        type: 'error',
        content: `  Command not found: "${trimmed}"\n  Type "help" to see available commands.`,
        timestamp: Date.now(),
      });
    }

    addLines(outputLines);
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput('');
    setShowSuggestions(false);
  }, [addLines, onNavigate]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        executeCommand(input);
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] ?? '');
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] ?? '');
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
        break;

      case 'Tab':
        e.preventDefault();
        const matches = getSuggestions(input);
        if (matches.length === 1) {
          setInput(matches[0]);
          setShowSuggestions(false);
        } else if (matches.length > 1) {
          setSuggestions(matches);
          setShowSuggestions(true);
        }
        break;

      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.length > 0) {
      const matches = getSuggestions(value);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  // Execute command from suggestion pill
  const executeFromPill = (command: string) => {
    // Animate typing effect
    setInput('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < command.length) {
        setInput(command.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => executeCommand(command), 200);
      }
    }, 40);
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Terminal Window */}
      <div className="terminal-window relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#020408]/90 backdrop-blur-2xl shadow-2xl">
        {/* Noise overlay */}
        <div className="noise pointer-events-none absolute inset-0 z-10" />
        {/* Scanline overlay */}
        <div className="scanline pointer-events-none absolute inset-0 z-10" />

        {/* Title bar */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
          </div>
          <span className="text-xs font-mono text-white/30 ml-2 tracking-wider">
            sv-terminal — saividith@os ~
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="p-5 h-[420px] overflow-y-auto font-mono text-sm leading-relaxed custom-scrollbar"
          onClick={() => inputRef.current?.focus()}
        >
          <AnimatePresence mode="popLayout">
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`whitespace-pre-wrap ${
                  line.type === 'input'
                    ? 'text-accent-cyan'
                    : line.type === 'error'
                    ? 'text-red-400/90'
                    : line.type === 'system'
                    ? 'text-white/40'
                    : 'text-white/70'
                }`}
              >
                {line.type === 'input' && (
                  <span className="text-accent-purple mr-2">❯</span>
                )}
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input line */}
          {booted && (
            <div className="flex items-center mt-1">
              <span className="text-accent-purple mr-2">❯</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-accent-cyan outline-none font-mono text-sm caret-accent-cyan"
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />

                {/* Autocomplete dropdown */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute left-0 top-7 z-20 bg-bg-secondary/95 backdrop-blur-xl border border-white/10 rounded-lg p-2 min-w-[200px] shadow-xl"
                    >
                      {suggestions.slice(0, 8).map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setInput(s);
                            setShowSuggestions(false);
                            inputRef.current?.focus();
                          }}
                          className="block w-full text-left px-3 py-1.5 text-xs text-white/60 hover:text-accent-cyan hover:bg-white/5 rounded transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggested command pills */}
      <motion.div
        className="flex flex-wrap gap-2.5 mt-6 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: BOOT_SEQUENCE.length * 0.12 + 0.3 }}
      >
        {[
          { label: 'Explore Projects', command: 'cd projects' },
          { label: 'View System Design', command: 'open system-design' },
          { label: 'Who am I?', command: 'whoami' },
          { label: 'My Skills', command: 'skills' },
          { label: 'AI Chat', command: 'chat' },
        ].map((pill) => (
          <button
            key={pill.command}
            onClick={() => executeFromPill(pill.command)}
            className="group px-4 py-2 rounded-full text-xs font-mono tracking-wide
              bg-white/[0.03] border border-white/[0.08] text-white/50
              hover:text-accent-cyan hover:border-accent-cyan/30 hover:bg-accent-cyan/[0.05]
              hover:shadow-[0_0_20px_rgba(110,231,249,0.1)]
              transition-all duration-300 cursor-pointer"
          >
            <span className="text-white/20 group-hover:text-accent-cyan/50 mr-1.5">$</span>
            {pill.label}
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}
