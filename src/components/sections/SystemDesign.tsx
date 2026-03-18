"use client";

import { motion } from "framer-motion";

const ARCHITECTURES = [
  {
    id: "smart-brain",
    title: "Smart Brain — RAG Architecture",
    description: "Production-grade Retrieval-Augmented Generation system with semantic search and LLM orchestration.",
    components: [
      { id: "client", label: "Client", color: "accent-cyan", desc: "React Frontend" },
      { id: "gateway", label: "FastAPI Gateway", color: "accent-blue", desc: "REST + Auth" },
      { id: "langchain", label: "LangChain", color: "accent-purple", desc: "Orchestration" },
      { id: "embedder", label: "Embedder", color: "accent-blue", desc: "text-embedding-3" },
      { id: "vector", label: "Pinecone", color: "accent-purple", desc: "Vector DB" },
      { id: "cache", label: "Redis Cache", color: "accent-green", desc: "Response Cache" },
      { id: "postgres", label: "PostgreSQL", color: "accent-cyan", desc: "Metadata Store" },
      { id: "llm", label: "LLM", color: "accent-purple", desc: "GPT-4 / Gemini" },
    ],
    flows: [
      { from: "client", to: "gateway", label: "HTTP" },
      { from: "gateway", to: "cache", label: "Cache?" },
      { from: "gateway", to: "langchain", label: "Query" },
      { from: "langchain", to: "embedder", label: "Embed" },
      { from: "embedder", to: "vector", label: "Search" },
      { from: "vector", to: "langchain", label: "Context" },
      { from: "langchain", to: "llm", label: "Prompt" },
      { from: "llm", to: "client", label: "Stream" },
    ],
    insights: [
      { metric: "Retrieval Accuracy", value: "87%", note: "with MMR reranking" },
      { metric: "p99 Latency", value: "~1.2s", note: "with response cache" },
      { metric: "Chunk Size", value: "512 tokens", note: "200 token overlap" },
    ],
  },
  {
    id: "distributed",
    title: "Distributed Backend — Navaidix",
    description: "High-throughput geospatial route optimization with multi-layer caching and async processing.",
    components: [
      { id: "client2", label: "Client", color: "accent-cyan", desc: "Mobile/Web" },
      { id: "lb", label: "Load Balancer", color: "accent-blue", desc: "Nginx" },
      { id: "api", label: "API Gateway", color: "accent-blue", desc: "Rate Limit + Auth" },
      { id: "route", label: "Route Engine", color: "accent-purple", desc: "Path Optimizer" },
      { id: "redis2", label: "Redis Geo", color: "accent-green", desc: "Spatial Cache" },
      { id: "postgis", label: "PostGIS", color: "accent-cyan", desc: "Geo Queries" },
      { id: "ai", label: "AI Scorer", color: "accent-purple", desc: "Route Ranking" },
      { id: "ws", label: "WebSocket", color: "accent-green", desc: "Real-time Feed" },
    ],
    flows: [
      { from: "client2", to: "lb", label: "HTTPS" },
      { from: "lb", to: "api", label: "Forward" },
      { from: "api", to: "redis2", label: "Cache?" },
      { from: "api", to: "route", label: "Request" },
      { from: "route", to: "postgis", label: "Geo Query" },
      { from: "route", to: "ai", label: "Score" },
      { from: "ai", to: "ws", label: "Stream" },
      { from: "ws", to: "client2", label: "Push" },
    ],
    insights: [
      { metric: "Cache Hit Rate", value: "76%", note: "30s TTL for traffic" },
      { metric: "Query Speed", value: "<10ms", note: "with Redis GEO" },
      { metric: "Throughput", value: "2k RPS", note: "per instance" },
    ],
  },
];

const CACHE_STRATEGIES = [
  {
    layer: "L1 — Application",
    tool: "In-memory (Node/Python)",
    ttl: "Seconds",
    use: "Computed values, hot configs",
    color: "accent-cyan",
  },
  {
    layer: "L2 — Distributed",
    tool: "Redis",
    ttl: "Minutes",
    use: "Session data, API responses, geo queries",
    color: "accent-blue",
  },
  {
    layer: "L3 — CDN",
    tool: "Cloudflare / AWS CloudFront",
    ttl: "Hours",
    use: "Static assets, public API responses",
    color: "accent-purple",
  },
  {
    layer: "L4 — Database",
    tool: "PostgreSQL query cache",
    ttl: "Query-scoped",
    use: "Repeated complex aggregations",
    color: "accent-green",
  },
];

export default function SystemDesign() {
  return (
    <div className="section-base">
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent-purple/5 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <div className="section-subtitle mb-4">// SYSTEM_DESIGN</div>
          <h2 className="section-title">
            How I <span className="gradient-text">Think</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Architecture decisions, caching strategies, and engineering tradeoffs from real systems I've built.
          </p>
        </motion.div>

        {/* Architecture diagrams */}
        {ARCHITECTURES.map((arch, ai) => (
          <motion.div
            key={arch.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: ai * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-6 mb-8"
          >
            <div className="mb-4">
              <h3 className="font-bold text-text-primary text-lg">{arch.title}</h3>
              <p className="text-text-secondary text-sm mt-1">{arch.description}</p>
            </div>

            {/* Component nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {arch.components.map((comp, ci) => (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.06 }}
                  className={`arch-node text-center`}
                >
                  <div className={`text-${comp.color} font-semibold text-xs mb-0.5`}>{comp.label}</div>
                  <div className="text-text-muted text-[10px]">{comp.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Request flow */}
            <div className="p-4 bg-bg-primary rounded-xl mb-4 overflow-x-auto">
              <div className="text-xs font-mono text-accent-green mb-2">REQUEST FLOW</div>
              <div className="flex items-center gap-1 flex-wrap">
                {arch.flows.map((flow, fi) => (
                  <motion.div
                    key={fi}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: fi * 0.08 }}
                    className="flex items-center gap-1"
                  >
                    <span className="text-xs font-mono text-text-secondary">{flow.from}</span>
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] text-text-muted">{flow.label}</span>
                      <span className="text-accent-blue">→</span>
                    </div>
                    {fi === arch.flows.length - 1 && (
                      <span className="text-xs font-mono text-text-secondary">{flow.to}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
              {arch.insights.map((ins) => (
                <div
                  key={ins.metric}
                  className="bg-bg-primary rounded-lg p-3 text-center border border-border-subtle"
                >
                  <div className="text-lg font-bold gradient-text-blue-cyan">{ins.value}</div>
                  <div className="text-xs text-text-primary font-medium">{ins.metric}</div>
                  <div className="text-[10px] text-text-muted mt-0.5">{ins.note}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Caching strategies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-6"
        >
          <h3 className="font-bold text-text-primary text-lg mb-5">Caching Strategy Layers</h3>
          <div className="space-y-3">
            {CACHE_STRATEGIES.map((s, i) => (
              <motion.div
                key={s.layer}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-3 rounded-xl bg-bg-primary border border-border-subtle"
              >
                <div className={`min-w-[8px] h-8 rounded-full bg-${s.color} self-center`} />
                <div className="flex-1 grid sm:grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="font-semibold text-text-primary text-xs">{s.layer}</div>
                    <div className="text-text-muted text-xs font-mono mt-0.5">{s.tool}</div>
                  </div>
                  <div>
                    <div className="text-text-muted text-[10px] uppercase tracking-wider">TTL</div>
                    <div className="text-text-secondary text-xs">{s.ttl}</div>
                  </div>
                  <div>
                    <div className="text-text-muted text-[10px] uppercase tracking-wider">Use Case</div>
                    <div className="text-text-secondary text-xs">{s.use}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
