"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "hero", label: "Home", icon: "⌂" },
  { id: "about", label: "About", icon: "◈" },
  { id: "ai-assistant", label: "AI", icon: "◎" },
  { id: "projects", label: "Projects", icon: "◧" },
  { id: "system-design", label: "System", icon: "⬡" },
  { id: "skills", label: "Skills", icon: "◈" },
  { id: "experience", label: "XP", icon: "◉" },
  { id: "playground", label: "Lab", icon: "⬢" },
  { id: "contact", label: "Contact", icon: "◈" },
];

export default function Navigation() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollY = window.scrollY + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Desktop floating nav */}
      <motion.nav
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-6 left-1/2 z-50 hidden lg:flex items-center gap-1 px-4 py-2 rounded-full transition-colors duration-300 ${scrolled
            ? "glass border border-border-default shadow-glow-sm"
            : "bg-transparent"
          }`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active === item.id
                ? "text-white"
                : "text-text-secondary hover:text-text-primary"
              }`}
          >
            {active === item.id && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-full bg-accent-blue/20 border border-accent-blue/40"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}

        <a
          href="https://github.com/sai-vidith"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 px-4 py-2 rounded-full text-sm font-medium bg-accent-blue text-white hover:bg-indigo-500 transition-colors"
        >
          GitHub
        </a>
      </motion.nav>

      {/* Mobile nav toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 glass p-3 rounded-xl border border-border-default"
      >
        <div className="flex flex-col gap-1.5 w-5">
          <span className={`block h-0.5 bg-text-primary transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 bg-text-primary transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 bg-text-primary transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </div>
      </motion.button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="lg:hidden fixed inset-y-0 right-0 w-64 z-40 glass border-l border-border-default flex flex-col pt-20 px-6 gap-2"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${active === item.id
                    ? "bg-accent-blue/20 border border-accent-blue/40 text-accent-blue"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
