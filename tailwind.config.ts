import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['var(--font-display)', 'var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        bg: {
          primary: '#02040A',
          secondary: '#0a0d14',
          tertiary: '#111620',
          surface: '#161c28',
        },
        accent: {
          cyan: '#6EE7F9',
          purple: '#8B5CF6',
          green: '#10b981',
          pink: '#ec4899',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          glow: 'rgba(110,231,249,0.3)',
          subtle: 'rgba(255,255,255,0.03)',
        },
        text: {
          primary: '#e2e8f0',
          secondary: '#94a3b8',
          muted: '#475569',
          accent: '#6EE7F9',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(110,231,249,0.08), transparent)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(110,231,249,0.2)',
        'glow-md': '0 0 20px rgba(110,231,249,0.3)',
        'glow-lg': '0 0 40px rgba(110,231,249,0.2)',
        'glow-cyan': '0 0 20px rgba(110,231,249,0.3)',
        'glow-purple': '0 0 20px rgba(139,92,246,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(110,231,249,0.2)' },
          '50%': { boxShadow: '0 0 24px rgba(110,231,249,0.4)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scan: {
          '0%': { strokeDashoffset: '30' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
