"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// --- Sorting Visualizer ---
type SortItem = { value: number; state: "default" | "comparing" | "sorted" };

function SortingVisualizer() {
  const [items, setItems] = useState<SortItem[]>([]);
  const [algo, setAlgo] = useState<"bubble" | "selection" | "insertion">("bubble");
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(80);
  const cancelRef = useRef(false);

  const randomize = useCallback(() => {
    const arr = Array.from({ length: 30 }, () => ({
      value: Math.floor(Math.random() * 90) + 10,
      state: "default" as const,
    }));
    setItems(arr);
  }, []);

  useEffect(() => { randomize(); }, [randomize]);

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const bubbleSort = async (arr: SortItem[]) => {
    const a = [...arr];
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        if (cancelRef.current) return;
        a[j].state = "comparing";
        a[j + 1].state = "comparing";
        setItems([...a]);
        await delay(100 - speed);
        if (a[j].value > a[j + 1].value) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
        }
        a[j].state = "default";
        a[j + 1].state = "default";
      }
      a[a.length - 1 - i].state = "sorted";
    }
    setItems([...a]);
  };

  const selectionSort = async (arr: SortItem[]) => {
    const a = [...arr];
    for (let i = 0; i < a.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < a.length; j++) {
        if (cancelRef.current) return;
        a[j].state = "comparing";
        setItems([...a]);
        await delay(100 - speed);
        if (a[j].value < a[minIdx].value) minIdx = j;
        a[j].state = "default";
      }
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      a[i].state = "sorted";
    }
    setItems([...a]);
  };

  const insertionSort = async (arr: SortItem[]) => {
    const a = [...arr];
    a[0].state = "sorted";
    for (let i = 1; i < a.length; i++) {
      if (cancelRef.current) return;
      const key = a[i].value;
      let j = i - 1;
      a[i].state = "comparing";
      setItems([...a]);
      await delay(100 - speed);
      while (j >= 0 && a[j].value > key) {
        a[j + 1].value = a[j].value;
        j--;
        setItems([...a]);
        await delay(100 - speed);
      }
      a[j + 1].value = key;
      a[j + 1].state = "sorted";
    }
    setItems([...a]);
  };

  const start = async () => {
    if (running) {
      cancelRef.current = true;
      setRunning(false);
      randomize();
      return;
    }
    cancelRef.current = false;
    setRunning(true);
    const fresh = items.map((i) => ({ ...i, state: "default" as const }));
    if (algo === "bubble") await bubbleSort(fresh);
    else if (algo === "selection") await selectionSort(fresh);
    else await insertionSort(fresh);
    setRunning(false);
  };

  const BAR_COLORS: Record<string, string> = {
    default: "#6366f1",
    comparing: "#22d3ee",
    sorted: "#10b981",
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        {(["bubble", "selection", "insertion"] as const).map((a) => (
          <button
            key={a}
            onClick={() => { if (!running) setAlgo(a); }}
            disabled={running}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              algo === a
                ? "bg-accent-blue text-white"
                : "bg-bg-primary border border-border-default text-text-secondary hover:text-text-primary"
            }`}
          >
            {a}_sort
          </button>
        ))}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-text-muted font-mono">speed:</span>
          <input
            type="range"
            min={10}
            max={95}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={running}
            className="w-20 accent-indigo-500"
          />
        </div>
        <button
          onClick={randomize}
          disabled={running}
          className="px-3 py-1.5 rounded-lg text-xs font-mono bg-bg-primary border border-border-default text-text-secondary hover:text-text-primary disabled:opacity-40"
        >
          shuffle
        </button>
        <button
          onClick={start}
          className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
            running
              ? "bg-red-500/20 border border-red-500/40 text-red-400"
              : "bg-accent-green/20 border border-accent-green/40 text-accent-green"
          }`}
        >
          {running ? "◼ stop" : "▶ run"}
        </button>
      </div>

      <div className="flex items-end gap-0.5 h-36 bg-bg-primary rounded-xl p-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            animate={{ height: `${item.value}%`, backgroundColor: BAR_COLORS[item.state] }}
            transition={{ duration: 0.05 }}
            style={{ backgroundColor: BAR_COLORS[item.state] }}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 mt-3">
        {Object.entries(BAR_COLORS).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: v }} />
            <span className="text-[10px] text-text-muted font-mono">{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Terminal Commands ---
type CommandOutput = { input?: string; output: string; type: "info" | "success" | "error" | "data" };

const COMMANDS: Record<string, CommandOutput> = {
  help: {
    output:
      "Available commands:\n  whoami          — about Sai Vidith\n  ls projects     — list all projects\n  cat skills.txt  — view tech stack\n  cat philosophy  — engineering philosophy\n  contact         — get in touch\n  clear           — clear terminal",
    type: "info",
  },
  whoami: {
    output:
      "Gouribhatla Sai Vidith\nRole: Backend & AI Engineer\nLocation: Hyderabad, India\nInstitution: VJIT\nStatus: Available for opportunities",
    type: "data",
  },
  "ls projects": {
    output:
      "drwxr-xr-x  Smart_Brain         (Python, FastAPI, LangChain, RAG)\ndrwxr-xr-x  KIRo                (Next.js, TypeScript, Multi-agent AI)\ndrwxr-xr-x  ProjectRaseed       (Python, OCR, TensorFlow, Receipt AI)\ndrwxr-xr-x  HealthCare-BC       (Solidity, Web3, IPFS, Ethereum)\ndrwxr-xr-x  Navaidix            (Node.js, PostGIS, Redis)\ndrwxr-xr-x  Ambulance-YOLOv8    (YOLOv8, Python, 94.2% mAP50)\ndrwxr-xr-x  Smart-Tourist       (React, Node.js, MongoDB, OpenAI)",
    type: "data",
  },
  "cat skills.txt": {
    output:
      "LANGUAGES: Python★★★★★  TypeScript★★★★☆  SQL★★★★☆  Java★★★☆☆\nAI/ML:     LangChain★★★★★  YOLOv8★★★★☆  TensorFlow★★★★☆  RAG★★★★★\nBACKEND:   FastAPI★★★★★   Node.js★★★★☆  Microservices★★★★☆\nDATABASE:  PostgreSQL★★★★☆ Redis★★★★☆  Pinecone★★★★★\nDEVOPS:    Docker★★★★☆  AWS★★★☆☆  GitHub Actions★★★★☆",
    type: "data",
  },
  "cat philosophy": {
    output:
      "1. Design for failure — circuit breakers, graceful degradation\n2. Cache at the right layer — Redis > DB every time\n3. APIs are contracts — version from v1, never break compat\n4. Measure before optimizing — profile first, fix actual bottlenecks\n5. Simplicity wins — complexity is entropy",
    type: "info",
  },
  contact: {
    output:
      "Email:    saividithvjdq@gmail.com\nGitHub:   github.com/saividithvjdq\nGitHub:   github.com/saividith\nLinkedIn: linkedin.com/in/saividith",
    type: "success",
  },
};

function TerminalPlayground() {
  const [history, setHistory] = useState<CommandOutput[]>([
    { output: "Welcome to SV-OS Terminal v2.1. Type 'help' to start.", type: "info" },
  ]);
  const [input, setInput] = useState("");
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const run = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newEntry: CommandOutput = { input: cmd, output: "", type: "info" };
    if (cmd === "clear") {
      setHistory([{ output: "Terminal cleared.", type: "info" }]);
      setInput("");
      return;
    }
    const result = COMMANDS[cmd] || {
      output: `command not found: ${cmd}\nType 'help' for available commands.`,
      type: "error" as const,
    };
    setHistory((h) => [...h, { ...newEntry, ...result, input: cmd }]);
    setInputHistory((prev) => [cmd, ...prev.slice(0, 19)]);
    setHistIdx(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") run();
    if (e.key === "ArrowUp") {
      const next = Math.min(histIdx + 1, inputHistory.length - 1);
      setHistIdx(next);
      setInput(inputHistory[next] || "");
    }
    if (e.key === "ArrowDown") {
      const prev = Math.max(histIdx - 1, -1);
      setHistIdx(prev);
      setInput(prev === -1 ? "" : inputHistory[prev]);
    }
  };

  return (
    <div className="p-5">
      <div className="h-48 overflow-y-auto space-y-2 mb-3 pr-2" onClick={() => inputRef.current?.focus()}>
        {history.map((item, i) => (
          <div key={i} className="text-xs font-mono">
            {item.input && (
              <div className="flex gap-2 text-accent-green mb-1">
                <span>❯</span><span>{item.input}</span>
              </div>
            )}
            <pre
              className={`whitespace-pre-wrap leading-5 ${
                item.type === "success"
                  ? "text-accent-green"
                  : item.type === "error"
                  ? "text-red-400"
                  : item.type === "data"
                  ? "text-accent-cyan"
                  : "text-text-secondary"
              }`}
            >
              {item.output}
            </pre>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2 border-t border-border-subtle pt-3">
        <span className="text-accent-green font-mono text-sm pt-1">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command..."
          className="flex-1 bg-transparent outline-none text-sm font-mono text-text-primary placeholder:text-text-muted caret-accent-blue"
        />
      </div>
    </div>
  );
}

export default function Playground() {
  const [activeTab, setActiveTab] = useState<"sort" | "terminal">("sort");

  return (
    <div className="section-base">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent-cyan/5 blur-3xl rounded-full" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <div className="section-subtitle mb-4">// PLAYGROUND</div>
          <h2 className="section-title">
            Interactive <span className="gradient-text">Lab</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Live algorithm visualizer and interactive terminal. Just for fun.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="terminal"
        >
          <div className="terminal-header">
            <div className="terminal-btn red" />
            <div className="terminal-btn yellow" />
            <div className="terminal-btn green" />
            <div className="ml-3 flex gap-1">
              {(["sort", "terminal"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                    activeTab === tab
                      ? "bg-accent-blue/30 text-accent-blue border border-accent-blue/30"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {tab === "sort" ? "algo_visualizer" : "sv_terminal"}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "sort" ? <SortingVisualizer /> : <TerminalPlayground />}
        </motion.div>
      </div>
    </div>
  );
}
