"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Tell me about Smart Brain project",
  "What's your tech stack?",
  "Explain your system design philosophy",
  "How can I contact you?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I'm **SV-AI**, Sai Vidith's portfolio assistant. I can tell you about his projects, skills, system design decisions, and experience. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text?: string) {
    const content = text || input.trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Connection issue. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function renderContent(content: string) {
    // Basic markdown rendering
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-bg-surface px-1 py-0.5 rounded text-accent-cyan text-sm font-mono">$1</code>');
  }

  return (
    <div className="section-base">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-purple/5 blur-3xl rounded-full" />

      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <div className="section-subtitle mb-4">{'// AI_ASSISTANT'}</div>
          <h2 className="section-title">
            Ask <span className="gradient-text">SV-AI</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            An AI assistant trained on my portfolio, projects, and experience. Ask it anything.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {/* Terminal chat */}
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-btn red" />
              <div className="terminal-btn yellow" />
              <div className="terminal-btn green" />
              <span className="ml-3 text-xs text-text-muted font-mono">sv-ai — portfolio assistant</span>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="status-badge available text-xs">
                  <span className="status-dot" /> online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-4 h-80 overflow-y-auto scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      msg.role === "user"
                        ? "bg-accent-blue text-white"
                        : "bg-accent-purple/20 border border-accent-purple/40 text-accent-purple"
                    }`}
                  >
                    {msg.role === "user" ? "U" : "⊹"}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed font-mono ${
                      msg.role === "user"
                        ? "chat-message-user text-text-primary rounded-tr-none"
                        : "chat-message-ai text-text-primary rounded-tl-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                  />
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-xs text-accent-purple">
                    ⊹
                  </div>
                  <div className="chat-message-ai px-4 py-3 rounded-xl rounded-tl-none">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-accent-purple"
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border-default text-text-secondary hover:border-accent-blue hover:text-accent-blue transition-all duration-200 font-mono"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border-subtle p-4">
              <div className="flex gap-3">
                <span className="text-accent-green font-mono text-sm pt-2.5 flex-shrink-0">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about projects, skills, system design..."
                  disabled={loading}
                  className="flex-1 bg-transparent outline-none text-sm font-mono text-text-primary placeholder:text-text-muted caret-accent-blue"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="px-4 py-1.5 rounded-lg bg-accent-blue/20 border border-accent-blue/40 text-accent-blue text-sm font-mono hover:bg-accent-blue/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
