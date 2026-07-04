"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const STEPS = [
  { num: "01", label: "Data Sources", desc: "APIs, SFTP, Selenium, Kafka, IoT loggers", color: "from-indigo-500 to-blue-500" },
  { num: "02", label: "Ingestion & Validation", desc: "Schema fingerprinting, type checks, match-rate gating", color: "from-blue-500 to-violet-500" },
  { num: "03", label: "Transformation & Modelling", desc: "Airflow DAGs, Lambda ETL, SQL views, pandas pipelines", color: "from-violet-500 to-purple-500" },
  { num: "04", label: "Warehouse", desc: "PostgreSQL, ClickHouse, Redshift Serverless", color: "from-purple-500 to-cyan-500" },
  { num: "05", label: "Analytics & BI", desc: "Grafana, Power BI, Superset, FastAPI", color: "from-cyan-500 to-emerald-500" },
  { num: "06", label: "Business Value", desc: "Automated reports, real-time alerts, executive KPIs", color: "from-emerald-500 to-teal-500" },
];

export default function Workflow() {
  return (
    <section className="section-pad">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-4">Engineering Approach</div>
          <h2 className="text-3xl md:text-4xl font-bold theme-text-primary mb-4">How I Work</h2>
          <p className="theme-text-muted max-w-xl mx-auto">
            Every engagement follows the same principle: raw data in, validated business insight out — with automation at every layer.
          </p>
        </motion.div>

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:flex items-center gap-2">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5 flex-1 group hover:theme-border-strong transition-all lift"
              >
                <div className={`text-xs font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-2`}>
                  {step.num}
                </div>
                <div className="text-sm font-semibold theme-text-primary mb-1">{step.label}</div>
                <div className="text-xs theme-text-muted leading-relaxed">{step.desc}</div>
              </motion.div>
              {i < STEPS.length - 1 && (
                <ArrowRight size={16} className="theme-text-faint flex-shrink-0 mx-1" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden space-y-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-5 flex gap-4"
            >
              <div className={`text-2xl font-bold bg-gradient-to-b ${step.color} bg-clip-text text-transparent flex-shrink-0`}>
                {step.num}
              </div>
              <div>
                <div className="text-sm font-semibold theme-text-primary mb-1">{step.label}</div>
                <div className="text-xs theme-text-muted">{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Principles */}
        <div className="mt-12 grid sm:grid-cols-3 gap-5">
          {[
            { title: "Automation-First", desc: "If a human does it more than once, it becomes a pipeline." },
            { title: "Validate at the Boundary", desc: "Schema checks, match-rate gates, and fingerprinting prevent corruption before it enters the warehouse." },
            { title: "Self-Healing Systems", desc: "Greedy watermarks, retry loops, progress-file resumption, and ROW_NUMBER dedup make pipelines robust by design." },
          ].map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-6 lift"
            >
              <h4 className="text-sm font-semibold theme-text-primary mb-2">{p.title}</h4>
              <p className="text-xs theme-text-muted leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
