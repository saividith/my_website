'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'What projects has he built?',
  'Explain his system design approach',
  'What technologies does he use?',
  'Tell me about Smart Brain',
];

export default function AISection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    if (!isExpanded) setIsExpanded(true);

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
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

      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response || data.message || 'I could not process that request.',
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Connection error. Please try again.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="assistant" className="relative py-32 px-6" ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent-cyan/30 mb-3">
            Interactive
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Ask me anything
          </h2>
          <p className="text-[15px] text-white/30 max-w-lg mx-auto leading-relaxed">
            An AI assistant with context about my projects, skills, and engineering decisions.
            Ask about architecture, tech stack, or anything else.
          </p>
        </motion.div>

        {/* Chat container */}
        <motion.div
          className="rounded-2xl bg-white/[0.015] border border-white/[0.05] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Messages area */}
          <div
            ref={scrollRef}
            className={`overflow-y-auto p-6 custom-scrollbar transition-all duration-500
              ${isExpanded ? 'h-[400px]' : 'h-[200px]'}`}
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="font-mono text-[12px] text-white/15 mb-5">
                  Try asking a question
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="px-3 py-1.5 rounded-full text-[12px] font-mono
                        bg-white/[0.025] border border-white/[0.05] text-white/25
                        hover:text-white/50 hover:border-white/[0.1]
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
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-xl text-[14px] leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-white/[0.05] border border-white/[0.06] text-white/60'
                      : 'bg-white/[0.02] border border-white/[0.03] text-white/50'
                    }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-invert prose-sm max-w-none
                        [&_p]:text-white/50 [&_p]:text-[14px] [&_p]:leading-relaxed [&_p]:mb-2
                        [&_code]:text-accent-cyan/60 [&_code]:bg-white/5 [&_code]:px-1 [&_code]:rounded [&_code]:text-[12px]
                        [&_strong]:text-white/60 [&_strong]:font-medium
                        [&_li]:text-white/45 [&_li]:text-[14px]">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 px-4 py-2"
              >
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/20"
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/[0.04]">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask about projects, architecture, tech stack..."
                className="flex-1 bg-white/[0.025] border border-white/[0.05] rounded-xl
                  px-4 py-3 text-[14px] text-white/60 placeholder:text-white/15
                  outline-none focus:border-white/[0.1] transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="px-5 py-3 rounded-xl text-[13px] font-medium
                  bg-white/[0.05] border border-white/[0.06] text-white/40
                  hover:bg-white/[0.08] hover:text-white/60
                  disabled:opacity-20 disabled:cursor-not-allowed
                  transition-all duration-200"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
