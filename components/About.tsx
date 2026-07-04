"use client";
import { motion } from "framer-motion";
import { Layers, Zap, TrendingUp, Brain } from "lucide-react";
import Panel from "./dashboard/Panel";
import StatusPill from "./dashboard/StatusPill";

const PILLARS = [
  {
    icon: Layers,
    title: "Systems Thinking",
    desc: "Design data architectures that scale — from raw ingestion to warehouse to BI layer.",
  },
  {
    icon: Zap,
    title: "Automation-First",
    desc: "Every manual process is an engineering opportunity. ~120 hrs/month of manual work eliminated.",
  },
  {
    icon: TrendingUp,
    title: "Business Impact",
    desc: "Measured in revenue recovered, hours saved, and errors corrected — not in lines of code.",
  },
  {
    icon: Brain,
    title: "Analytical Rigour",
    desc: "Root-causing a 6–17× IEC 61724 KPI error and a $1.05M ASIN-encoding bug. Not surface fixes.",
  },
];

const FACTS = [
  { k: "experience", v: "3–4 years" },
  { k: "industries", v: "3 (e-comm · edtech · solar)" },
  { k: "ownership", v: "end-to-end" },
  { k: "stack",      v: "Python · SQL · Airflow · ClickHouse · Redshift · Grafana · Power BI" },
];

export default function About() {
  return (
    <section id="about" className="px-4 sm:px-6 py-6">
      <Panel
        name="panel.about"
        meta="role: data engineer · analytics engineer"
        actions={<StatusPill status="ACTIVE" />}
      >
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* Prose column */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold theme-text-primary tracking-tight">
              About <span className="theme-text-accent">/</span> who am I
            </h2>

            <div className="mt-5 space-y-4 theme-text-secondary leading-relaxed text-[15px]">
              <p>
                I&apos;m Shashank — a Data Engineer & Analytics Engineer at a data
                analytics consultancy. I own the full data stack: ingestion
                pipelines, warehouses, executive dashboards, automated
                reporting.
              </p>
              <p>
                My work covers{" "}
                <span className="theme-text-accent">e-commerce</span> (multi-marketplace
                Airflow platforms, revenue analytics),{" "}
                <span className="theme-text-accent">EdTech</span> (student persona
                engines, automated OMR evaluation), and{" "}
                <span className="theme-text-accent">renewable energy</span> (IoT
                ingestion for 245 solar plants, IEC 61724–compliant KPIs).
              </p>
              <p>
                I don&apos;t just build dashboards — I build the infrastructure
                underneath them. I reduce human intervention at every layer,
                validate data rigorously, and make systems self-healing and
                observable.
              </p>
            </div>

            {/* Mono fact list */}
            <div className="mt-7 panel">
              <div className="panel-header">
                <span><span className="theme-text-accent">SELECT</span> * FROM about_me;</span>
                <span className="theme-text-faint">4 rows</span>
              </div>
              <dl className="divide-y theme-border-soft">
                {FACTS.map((f) => (
                  <div key={f.k} className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-3 px-4 py-2.5 row-hover hover:row-hover-bg">
                    <dt className="mono text-[11.5px] theme-text-muted uppercase tracking-wider">{f.k}</dt>
                    <dd className="mono text-[12.5px] theme-text-primary tnum">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Pillars column */}
          <div className="space-y-3">
            <h3 className="mono text-[11px] uppercase tracking-wider theme-text-muted">
              engineering.principles[]
            </h3>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="panel panel-hover p-3.5 flex items-start gap-3"
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent-soft)" }}
                >
                  <p.icon size={15} className="theme-text-accent" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold theme-text-primary">{p.title}</div>
                  <p className="text-[12px] theme-text-muted leading-relaxed mt-0.5">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Panel>
    </section>
  );
}
