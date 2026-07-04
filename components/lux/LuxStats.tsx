"use client";
import { motion } from "framer-motion";
import { DollarSign, Sun, GitBranch, Timer } from "lucide-react";

const STATS = [
  {
    icon: DollarSign,
    value: "$1.05M",
    label: "Revenue Recovered",
    desc: "One encoding bug diagnosed → 0% to 99.8% marketplace match rate.",
  },
  {
    icon: GitBranch,
    value: "131",
    label: "Production Airflow DAGs",
    desc: "Ingesting 31 source systems across three industries, daily.",
  },
  {
    icon: Sun,
    value: "245",
    label: "Solar Plants Monitored",
    desc: "IoT ingestion at 10M+ rows with ≤10-minute data freshness.",
  },
  {
    icon: Timer,
    value: "120+",
    label: "Hours Automated / Month",
    desc: "Manual MIS, reporting, and invoicing replaced with pipelines.",
  },
];

export default function LuxStats() {
  return (
    <section className="py-14" style={{ background: "var(--lx-bg-soft)", borderTop: "1px solid var(--lx-border)", borderBottom: "1px solid var(--lx-border)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="lx-card lx-card-hover p-6"
          >
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "var(--lx-accent-soft)", color: "var(--lx-accent)" }}
            >
              <s.icon size={16} />
            </span>
            <div className="lx-serif mt-4 text-[34px] font-bold leading-none" style={{ color: "var(--lx-accent)" }}>
              {s.value}
            </div>
            <div className="mono mt-2.5 text-[10.5px] font-semibold tracking-[0.16em] uppercase lx-ink">
              {s.label}
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed lx-muted">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
