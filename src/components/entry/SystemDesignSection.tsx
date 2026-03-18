'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SYSTEM_PHILOSOPHY } from '@/lib/constants';

const FLOW_NODES = [
  { id: 'user', label: 'User', sublabel: 'Request' },
  { id: 'api', label: 'API Gateway', sublabel: 'Rate limit + Auth' },
  { id: 'cache', label: 'Cache', sublabel: 'Redis / CDN' },
  { id: 'service', label: 'Service', sublabel: 'Business logic' },
  { id: 'db', label: 'Database', sublabel: 'PostgreSQL' },
  { id: 'response', label: 'Response', sublabel: 'Serialized' },
];

export default function SystemDesignSection() {
  const [activeNode, setActiveNode] = useState(0);
  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (!sectionInView) return;
    const interval = setInterval(() => {
      setActiveNode(prev => (prev >= FLOW_NODES.length - 1 ? 0 : prev + 1));
    }, 1400);
    return () => clearInterval(interval);
  }, [sectionInView]);

  return (
    <section id="system-design" className="relative py-32 px-6" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent-purple/40 mb-3">
            Architecture
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            System Design
          </h2>
        </motion.div>

        {/* Request flow */}
        <motion.div
          className="p-6 md:p-10 rounded-2xl bg-white/[0.015] border border-white/[0.05] mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/20 mb-8">
            Request Lifecycle
          </h3>

          {/* Flow nodes */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-1 mb-10">
            {FLOW_NODES.map((node, i) => (
              <div key={node.id} className="flex items-center gap-3 md:gap-1">
                <motion.div
                  className={`relative px-4 md:px-5 py-3 md:py-4 rounded-xl text-center min-w-[100px] md:min-w-[130px]
                    border transition-all duration-400
                    ${activeNode === i
                      ? 'border-accent-cyan/30 bg-accent-cyan/[0.06] shadow-[0_0_24px_rgba(110,231,249,0.1)]'
                      : activeNode > i
                      ? 'border-white/[0.06] bg-white/[0.02]'
                      : 'border-white/[0.03] bg-white/[0.01]'
                    }`}
                  animate={activeNode === i ? { scale: 1.03 } : { scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className={`font-mono text-xs md:text-sm font-medium transition-colors duration-300
                    ${activeNode === i ? 'text-accent-cyan' : activeNode > i ? 'text-white/40' : 'text-white/20'}`}>
                    {node.label}
                  </p>
                  <p className={`font-mono text-[10px] mt-0.5 transition-colors duration-300
                    ${activeNode === i ? 'text-accent-cyan/40' : 'text-white/10'}`}>
                    {node.sublabel}
                  </p>

                  {activeNode === i && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent-cyan/80"
                      animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {i < FLOW_NODES.length - 1 && (
                  <div className={`hidden md:block w-8 h-px transition-colors duration-300
                    ${activeNode > i ? 'bg-accent-cyan/20' : 'bg-white/[0.04]'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Detail cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.015] border border-white/[0.03]">
              <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase text-accent-cyan/35 mb-2">Caching</h4>
              <p className="text-[13px] text-white/35 leading-relaxed">
                Redis for hot data (TTL: 30s). CDN for static assets. Cache-aside with write-through for consistency.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.015] border border-white/[0.03]">
              <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase text-accent-purple/35 mb-2">Latency</h4>
              <p className="text-[13px] text-white/35 leading-relaxed">
                p50 &lt;50ms, p99 &lt;200ms. Cache hit &lt;10ms. DB query &lt;80ms. Budget: 20% network, 30% compute, 50% I/O.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.015] border border-white/[0.03]">
              <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase text-emerald-400/35 mb-2">Scaling</h4>
              <p className="text-[13px] text-white/35 leading-relaxed">
                Horizontal via stateless services. DB read replicas. Event-driven async for compute. Circuit breakers at boundaries.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Design principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SYSTEM_PHILOSOPHY.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
              className="group p-6 rounded-2xl bg-white/[0.015] border border-white/[0.04]
                hover:border-white/[0.08] transition-all duration-300"
            >
              <h3 className="font-display text-base font-semibold text-white/80 mb-2">
                {principle.title}
              </h3>
              <p className="text-[13px] text-white/30 leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
