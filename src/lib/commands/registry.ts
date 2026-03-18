// Terminal command registry system

import { ViewState } from '@/lib/state';

export interface CommandOutput {
  type: 'text' | 'navigate' | 'clear' | 'error';
  content: string;
  navigateTo?: ViewState;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string[]) => CommandOutput;
}

const commands: Map<string, Command> = new Map();

export function registerCommand(command: Command): void {
  commands.set(command.name, command);
}

export function getCommand(name: string): Command | undefined {
  return commands.get(name);
}

export function getAllCommands(): Command[] {
  return Array.from(commands.values());
}

export function getCommandNames(): string[] {
  return Array.from(commands.keys());
}

export function parseInput(input: string): { command: string; args: string[] } {
  const trimmed = input.trim();
  // Handle multi-word commands like "cd projects", "open system-design", "view --profile"
  const multiWordCommands = [
    'cd projects',
    'open system-design',
    'view --profile',
  ];

  for (const cmd of multiWordCommands) {
    if (trimmed.toLowerCase().startsWith(cmd)) {
      const remaining = trimmed.slice(cmd.length).trim();
      return {
        command: cmd,
        args: remaining ? remaining.split(/\s+/) : [],
      };
    }
  }

  const parts = trimmed.split(/\s+/);
  return {
    command: parts[0]?.toLowerCase() ?? '',
    args: parts.slice(1),
  };
}

export function getSuggestions(partial: string): string[] {
  const lower = partial.toLowerCase();
  const allNames = getCommandNames();
  const multiWord = ['cd projects', 'open system-design', 'view --profile'];
  const all = [...allNames, ...multiWord];

  if (!lower) return all;
  return all.filter(name => name.startsWith(lower));
}
