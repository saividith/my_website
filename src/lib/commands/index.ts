// Register all commands

import { registerCommand, CommandOutput } from './registry';
import { PERSONAL_INFO, PROJECTS, SKILLS, SYSTEM_PHILOSOPHY, CURRENTLY_LEARNING } from '@/lib/constants';

export function initializeCommands(): void {
  registerCommand({
    name: 'help',
    description: 'List all available commands',
    execute: (): CommandOutput => ({
      type: 'text',
      content: [
        '┌─────────────────────────────────────────────┐',
        '│  AVAILABLE COMMANDS                          │',
        '├─────────────────────────────────────────────┤',
        '│  help              Show this help menu       │',
        '│  whoami            Display profile + bio     │',
        '│  cd projects       Browse project portfolio  │',
        '│  open system-design  View system design      │',
        '│  skills            View technical skills     │',
        '│  about             About me dashboard        │',
        '│  chat              Open AI assistant          │',
        '│  view --profile    View hologram profile     │',
        '│  status            System status              │',
        '│  clear             Clear terminal             │',
        '│  home              Return to terminal         │',
        '└─────────────────────────────────────────────┘',
      ].join('\n'),
    }),
  });

  registerCommand({
    name: 'whoami',
    description: 'Display profile information',
    execute: (): CommandOutput => ({
      type: 'navigate',
      content: [
        `> Resolving identity...`,
        ``,
        `  Name     : ${PERSONAL_INFO.name}`,
        `  Handle   : @${PERSONAL_INFO.handle}`,
        `  Role     : ${PERSONAL_INFO.title}`,
        `  Location : ${PERSONAL_INFO.location}`,
        `  Status   : ${PERSONAL_INFO.availableForWork ? '● Available for work' : '○ Not available'}`,
        ``,
        `> Loading hologram profile...`,
      ].join('\n'),
      navigateTo: 'profile',
    }),
  });

  registerCommand({
    name: 'cd projects',
    description: 'Browse projects',
    execute: (): CommandOutput => ({
      type: 'navigate',
      content: [
        `> Indexing project directory...`,
        `  Found ${PROJECTS.filter(p => p.featured).length} featured projects`,
        ``,
        `> Loading project viewer...`,
      ].join('\n'),
      navigateTo: 'projects',
    }),
  });

  registerCommand({
    name: 'open system-design',
    description: 'View system design philosophy',
    execute: (): CommandOutput => ({
      type: 'navigate',
      content: [
        `> Loading system design module...`,
        `  ${SYSTEM_PHILOSOPHY.length} design principles loaded`,
        ``,
        `> Rendering architecture view...`,
      ].join('\n'),
      navigateTo: 'system_design',
    }),
  });

  registerCommand({
    name: 'skills',
    description: 'View technical skills',
    execute: (): CommandOutput => ({
      type: 'navigate',
      content: [
        `> Scanning skill matrix...`,
        `  ${SKILLS.length} categories indexed`,
        `  ${SKILLS.reduce((acc, s) => acc + s.items.length, 0)} total skills loaded`,
        ``,
        `> Rendering skill dashboard...`,
      ].join('\n'),
      navigateTo: 'skills',
    }),
  });

  registerCommand({
    name: 'about',
    description: 'About me',
    execute: (): CommandOutput => ({
      type: 'navigate',
      content: [
        `> Loading personal dashboard...`,
        ``,
        `> Initializing about module...`,
      ].join('\n'),
      navigateTo: 'about',
    }),
  });

  registerCommand({
    name: 'chat',
    description: 'Open AI assistant',
    execute: (): CommandOutput => ({
      type: 'navigate',
      content: [
        `> Initializing SV-AI assistant...`,
        `  Model: Gemini Pro`,
        `  Context: Portfolio + Resume`,
        ``,
        `> Opening chat interface...`,
      ].join('\n'),
      navigateTo: 'assistant',
    }),
  });

  registerCommand({
    name: 'view --profile',
    description: 'View hologram profile',
    execute: (): CommandOutput => ({
      type: 'navigate',
      content: [
        `> Rendering hologram...`,
        `  Stage 1: ASCII decode`,
        `  Stage 2: Glitch transition`,
        `  Stage 3: Full resolution`,
        ``,
        `> Profile materializing...`,
      ].join('\n'),
      navigateTo: 'profile',
    }),
  });

  registerCommand({
    name: 'status',
    description: 'System status',
    execute: (): CommandOutput => ({
      type: 'text',
      content: [
        '┌─ SYSTEM STATUS ─────────────────────────────┐',
        '│                                              │',
        `│  User     : ${PERSONAL_INFO.shortName.padEnd(32)}│`,
        `│  Domain   : ${PERSONAL_INFO.domain.padEnd(32)}│`,
        '│  Runtime  : Next.js 14 + React 18            │',
        '│  Engine   : Terminal OS v1.0                  │',
        `│  Uptime   : ${Math.floor(performance.now() / 1000)}s${''.padEnd(28)}│`,
        '│  Status   : ● All systems operational        │',
        '│                                              │',
        '├─ CURRENTLY LEARNING ─────────────────────────┤',
        ...CURRENTLY_LEARNING.map(item =>
          `│  → ${item.padEnd(41)}│`
        ),
        '│                                              │',
        '└──────────────────────────────────────────────┘',
      ].join('\n'),
    }),
  });

  registerCommand({
    name: 'clear',
    description: 'Clear terminal',
    execute: (): CommandOutput => ({
      type: 'clear',
      content: '',
    }),
  });

  registerCommand({
    name: 'home',
    description: 'Return to terminal',
    execute: (): CommandOutput => ({
      type: 'navigate',
      content: '> Returning to terminal...',
      navigateTo: 'terminal',
    }),
  });

  registerCommand({
    name: 'projects',
    description: 'Browse projects (alias)',
    execute: (): CommandOutput => ({
      type: 'navigate',
      content: `> Loading ${PROJECTS.filter(p => p.featured).length} featured projects...`,
      navigateTo: 'projects',
    }),
  });

  registerCommand({
    name: 'system-design',
    description: 'System design (alias)',
    execute: (): CommandOutput => ({
      type: 'navigate',
      content: '> Loading system design view...',
      navigateTo: 'system_design',
    }),
  });

  registerCommand({
    name: 'assistant',
    description: 'AI assistant (alias)',
    execute: (): CommandOutput => ({
      type: 'navigate',
      content: '> Opening AI assistant...',
      navigateTo: 'assistant',
    }),
  });
}
