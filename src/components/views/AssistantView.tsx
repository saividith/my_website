'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ViewShell from '@/components/ui/ViewShell';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const SUGGESTIONS = [
  'Tell me about your projects',
  'What is your tech stack?',
  'Explain your system design approach',
  'What are you currently learning?',
];

interface AssistantViewProps {
  onBack: () => void;
}

export default function AssistantView({ onBack }: AssistantViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response || data.message || 'Sorry, I could not process that request.',
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Connection error. Please try again.',
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ViewShell title="AI Assistant" subtitle="// SV-AI Chat Interface" onBack={onBack}>
      <div className="flex flex-col h-[65vh] rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        {/* Messages area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-mono text-xs text-white/20 mb-6">
                Ask me anything about my projects, skills, or experience
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-mono
                      bg-white/[0.03] border border-white/[0.08] text-white/30
                      hover:text-accent-cyan hover:border-accent-cyan/20
                      transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan/80'
                      : 'bg-white/[0.03] border border-white/[0.06] text-white/60'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-invert prose-sm max-w-none [&_p]:text-white/60 [&_code]:text-accent-cyan/70 [&_code]:bg-white/5 [&_code]:px-1 [&_code]:rounded">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 px-4 py-3"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-accent-cyan/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about projects, skills, experience..."
              className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl
                px-4 py-2.5 text-sm text-white/70 placeholder:text-white/20
                outline-none focus:border-accent-cyan/30 transition-colors font-mono"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-mono
                bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan/70
                hover:bg-accent-cyan/20 disabled:opacity-30 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </ViewShell>
  );
}
