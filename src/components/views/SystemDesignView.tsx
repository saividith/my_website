'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ViewShell from '@/components/ui/ViewShell';
import { SYSTEM_PHILOSOPHY } from '@/lib/constants';

// Request flow nodes
const FLOW_NODES = [
  { id: 'user', label: 'User', color: 'cyan' },
  { id: 'api', label: 'API Gateway', color: 'cyan' },
  { id: 'cache', label: 'Cache (Redis)', color: 'purple' },
  { id: 'db', label: 'Database', color: 'cyan' },
  { id: 'response', label: 'Response', color: 'green' },
];

interface SystemDesignViewProps {
  onBack: () => void;
}

export default function SystemDesignView({ onBack }: SystemDesignViewProps) {
  const [activeNode, setActiveNode] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Animate request flow
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setActiveNode(prev => {
        if (prev >= FLOW_NODES.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <ViewShell title="System Design" subtitle="// Architecture Philosophy" onBack={onBack}>
      <div className="space-y-12">
        {/* Animated Request Flow */}
        <motion.div
          className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-white/30">
              Request Flow
            </h3>
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="font-mono text-[10px] px-3 py-1 rounded-full
                bg-white/[0.04] border border-white/[0.08] text-white/30
                hover:text-white/50 transition-colors"
            >
              {isAnimating ? '⏸ Pause' : '▶ Play'}
            </button>
          </div>

          {/* Flow visualization */}
          <div className="flex items-center justify-between gap-2 md:gap-4 overflow-x-auto pb-2">
            {FLOW_NODES.map((node, i) => (
              <div key={node.id} className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                <motion.div
                  className={`relative px-4 py-3 rounded-xl font-mono text-xs md:text-sm text-center
                    border transition-all duration-300 min-w-[90px] md:min-w-[120px]
                    ${activeNode === i
                      ? node.color === 'green'
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : node.color === 'purple'
                        ? 'border-accent-purple/40 bg-accent-purple/10 text-accent-purple shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                        : 'border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan shadow-[0_0_20px_rgba(110,231,249,0.2)]'
                      : 'border-white/[0.08] bg-white/[0.02] text-white/30'
                    }`}
                  animate={activeNode === i ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {node.label}

                  {/* Active pulse indicator */}
                  {activeNode === i && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent-cyan"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Arrow */}
                {i < FLOW_NODES.length - 1 && (
                  <motion.span
                    className={`text-xs transition-colors duration-300 ${
                      activeNode > i ? 'text-accent-cyan/60' : 'text-white/10'
                    }`}
                  >
                    →
                  </motion.span>
                )}
              </div>
            ))}
          </div>

          {/* Flow details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-accent-cyan/[0.03] border border-accent-cyan/10">
              <h4 className="font-mono text-[10px] tracking-wider uppercase text-accent-cyan/50 mb-2">
                Caching Strategy
              </h4>
              <p className="text-xs text-white/40 leading-relaxed">
                Redis for hot data (TTL: 30s), CDN for static assets, in-memory LRU for computed values.
                Cache-aside pattern with write-through for consistency.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-accent-purple/[0.03] border border-accent-purple/10">
              <h4 className="font-mono text-[10px] tracking-wider uppercase text-accent-purple/50 mb-2">
                Latency Budget
              </h4>
              <p className="text-xs text-white/40 leading-relaxed">
                p50: &lt;50ms, p99: &lt;200ms. Cache hit: &lt;10ms, DB query: &lt;80ms,
                AI inference: &lt;800ms (async). Budget split: 20% network, 30% compute, 50% I/O.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/10">
              <h4 className="font-mono text-[10px] tracking-wider uppercase text-emerald-500/50 mb-2">
                Scaling Approach
              </h4>
              <p className="text-xs text-white/40 leading-relaxed">
                Horizontal scaling via stateless services + load balancer. DB read replicas for query load.
                Event-driven async processing for heavy compute. Circuit breakers at service boundaries.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Design Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SYSTEM_PHILOSOPHY.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]
                hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{principle.icon}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Diagram - Simplified */}
        <motion.div
          className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-white/30 mb-6">
            System Architecture Pattern
          </h3>

          <div className="font-mono text-xs text-white/40 leading-loose whitespace-pre overflow-x-auto pb-2">
{`┌──────────┐     ┌──────────────┐     ┌─────────────┐
│  Client  │────▶│  API Gateway │────▶│  Auth Layer │
│  (React) │     │  (Next.js)   │     │  (JWT/RBAC) │
└──────────┘     └──────┬───────┘     └──────┬──────┘
                        │                     │
                        ▼                     ▼
                 ┌──────────────┐     ┌─────────────┐
                 │  Rate Limit  │     │  Service    │
                 │  (Redis)     │     │  Router     │
                 └──────────────┘     └──────┬──────┘
                                             │
                    ┌────────────┬────────────┼────────────┐
                    ▼            ▼            ▼            ▼
             ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
             │  Cache   │ │  Search  │ │  AI/ML   │ │  Queue   │
             │  (Redis) │ │  Engine  │ │  Service │ │  (Async) │
             └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
                  │            │            │            │
                  └────────────┴────────────┴────────────┘
                                     │
                              ┌──────┴──────┐
                              │  Database   │
                              │  (Postgres) │
                              └─────────────┘`}
          </div>
        </motion.div>
      </div>
    </ViewShell>
  );
}
