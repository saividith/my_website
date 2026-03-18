"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";

const LINKS = [
  {
    label: "GitHub (primary)",
    href: "https://github.com/saividithvjdq",
    icon: "⊹",
    desc: "@saividithvjdq · 13 repos",
    color: "accent-blue",
  },
  {
    label: "GitHub (secondary)",
    href: "https://github.com/saividith",
    icon: "◈",
    desc: "@saividith · 6 repos",
    color: "accent-cyan",
  },
  {
    label: "Email",
    href: `mailto:${PERSONAL_INFO.email}`,
    icon: "◎",
    desc: PERSONAL_INFO.email,
    color: "accent-purple",
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="section-base">
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent-purple/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-cyan/5 blur-3xl rounded-full" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <div className="section-subtitle mb-4">{'// CONTACT'}</div>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Open to internships, collaborations, and interesting engineering problems.
          </p>
          <div className="mt-4 flex justify-center">
            <span className="status-badge available">
              <span className="status-dot" />
              Available for opportunities
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Links */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-text-secondary text-xs font-mono uppercase tracking-wider mb-4">Find me online</h3>
              <div className="space-y-3">
                {LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 p-4 glass-card group"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-${link.color}/10 border border-${link.color}/30 flex items-center justify-center text-lg text-${link.color} group-hover:shadow-glow-sm transition-all`}>
                      {link.icon}
                    </div>
                    <div>
                      <div className="font-medium text-text-primary text-sm group-hover:text-white transition-colors">
                        {link.label}
                      </div>
                      <div className={`text-xs font-mono text-${link.color} opacity-70`}>{link.desc}</div>
                    </div>
                    <span className="ml-auto text-text-muted group-hover:text-text-secondary group-hover:translate-x-1 transition-all">↗</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="glass-card p-5"
            >
              <div className="text-xs font-mono text-accent-cyan mb-2">{'// QUICK_NOTE'}</div>
              <p className="text-text-secondary text-sm leading-relaxed">
                I respond quickly. Whether it&apos;s about a project, a collaboration, or a role —
                I&apos;m genuinely interested. Drop a message.
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-6"
          >
            <h3 className="text-text-secondary text-xs font-mono uppercase tracking-wider mb-5">Send a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "name", label: "Name", type: "text", placeholder: "John Doe" },
                { name: "email", label: "Email", type: "email", placeholder: "john@company.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-mono text-text-muted mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={(e) => setFormState((s) => ({ ...s, [field.name]: e.target.value }))}
                    className="w-full bg-bg-primary border border-border-default rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue/50 transition-colors font-mono"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-mono text-text-muted mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about the opportunity or project..."
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  className="w-full bg-bg-primary border border-border-default rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue/50 transition-colors resize-none font-mono"
                />
              </div>
              <button
                type="submit"
                className="btn-neon primary w-full justify-center"
              >
                {sent ? "✓ Opening email client..." : "Send Message →"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-border-subtle text-center"
        >
          <p className="text-text-muted text-xs font-mono">
            © 2025 Gouribhatla Sai Vidith · Built with Next.js + Framer Motion · Hosted on{" "}
            <span className="text-accent-blue">saividith.tech</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
