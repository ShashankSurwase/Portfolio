"use client";
import { motion } from "framer-motion";
import { Clock, Database, BarChart2, AlertTriangle, RefreshCw, Eye } from "lucide-react";

const PROBLEMS = [
  {
    icon: Clock,
    before: "80–120 hrs/month of manual MIS compilation",
    after: "Fully automated scheduled pipelines",
    label: "Manual Reporting",
  },
  {
    icon: Database,
    before: "Data scattered across 31 disconnected sources",
    after: "Unified warehouse with validated, queryable data",
    label: "Data Fragmentation",
  },
  {
    icon: BarChart2,
    before: "KPI dashboards with 6–17× calculation errors",
    after: "IEC-audited, ±2%-accurate metrics",
    label: "Unreliable KPIs",
  },
  {
    icon: AlertTriangle,
    before: "Fault detection latency: 8–12 hours",
    after: "Real-time alerting in ≤10 minutes",
    label: "Delayed Alerts",
  },
  {
    icon: RefreshCw,
    before: "New marketplace integration: 2–5 days of engineering",
    after: "Business-user spreadsheet update: 2–4 hours",
    label: "Slow Onboarding",
  },
  {
    icon: Eye,
    before: "$1.05M vendor revenue completely untracked",
    after: "99.8% reconciliation accuracy, full P&L visibility",
    label: "Revenue Blind Spots",
  },
];

export default function Problems() {
  return (
    <section className="section-pad surface-tint">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-4">Value Delivered</div>
          <h2 className="text-3xl md:text-4xl font-bold theme-text-primary mb-4">Problems I Solve</h2>
          <p className="theme-text-muted max-w-xl mx-auto">
            Every engagement starts with a specific operational pain. These are the most common ones I've fixed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 group hover:theme-border-strong transition-all lift"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                  <p.icon size={18} className="text-rose-500 dark:text-rose-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                </div>
                <span className="text-sm font-semibold theme-text-primary">{p.label}</span>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <span className="text-xs text-rose-500 dark:text-rose-400 font-semibold mt-0.5 flex-shrink-0">Before</span>
                  <p className="text-xs theme-text-muted leading-relaxed">{p.before}</p>
                </div>
                <div className="h-px theme-border-soft border-t" />
                <div className="flex gap-2">
                  <span className="text-xs text-emerald-500 dark:text-emerald-400 font-semibold mt-0.5 flex-shrink-0">After</span>
                  <p className="text-xs theme-text-secondary leading-relaxed">{p.after}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
