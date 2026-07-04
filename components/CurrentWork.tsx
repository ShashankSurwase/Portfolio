"use client";
import { motion } from "framer-motion";
import { Sparkles, Bot, Layers, TrendingUp } from "lucide-react";

const CURRENT = [
  {
    icon: Bot,
    title: "AI-Augmented Analytics",
    desc: "Integrating LLM capabilities into existing analytics workflows — natural language interfaces over structured data, intelligent anomaly narration, and auto-generated insight summaries.",
    tag: "In Progress",
  },
  {
    icon: Sparkles,
    title: "Intelligent Automation",
    desc: "Building next-generation automation pipelines that use ML signals — adaptive retry policies, predictive schema drift detection, and self-optimising ETL scheduling.",
    tag: "Exploring",
  },
  {
    icon: Layers,
    title: "Scalable ETL Architecture",
    desc: "Evolving pipeline patterns toward event-driven micro-batch architectures using Redshift Data API, S3 event chains, and stateless Lambda functions for zero-connection-limit scaling.",
    tag: "Active",
  },
  {
    icon: TrendingUp,
    title: "Unified Metrics Layer",
    desc: "Designing a domain-agnostic metrics layer that standardises KPI definitions across BI tools — Grafana, Power BI, Superset — with a single SQL source of truth.",
    tag: "Active",
  },
];

export default function CurrentWork() {
  return (
    <section className="section-pad surface-tint">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-4">Now</div>
          <h2 className="text-3xl md:text-4xl font-bold theme-text-primary mb-4">Currently Working On</h2>
          <p className="theme-text-muted max-w-xl mx-auto">
            Building toward AI-native data systems — where pipelines are intelligent, dashboards explain themselves, and automation anticipates failures.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {CURRENT.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 group hover:border-indigo-500/20 transition-all lift"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                  <c.icon size={20} className="text-indigo-500 dark:text-indigo-400" />
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  c.tag === "In Progress" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                  c.tag === "Active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                  "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                }`}>
                  {c.tag}
                </span>
              </div>
              <h3 className="text-base font-semibold theme-text-primary mb-2">{c.title}</h3>
              <p className="text-sm theme-text-muted leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass-strong rounded-2xl p-8 text-center"
        >
          <div className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 mb-2">Future Vision</div>
          <p className="theme-text-secondary max-w-2xl mx-auto leading-relaxed">
            &ldquo;Focused on building next-generation AI-powered analytics and automation ecosystems —
            where data pipelines self-monitor, KPIs self-explain, and business decisions are
            accelerated by intelligent, trustworthy systems.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
