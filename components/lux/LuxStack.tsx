"use client";
import { motion } from "framer-motion";
import { Code2, Workflow, Database, Cloud, BarChart3, Wrench } from "lucide-react";

const GROUPS = [
  {
    icon: Code2,
    title: "Languages",
    items: ["Python", "SQL", "R", "Bash", "TypeScript"],
  },
  {
    icon: Workflow,
    title: "Orchestration & ETL",
    items: ["Apache Airflow", "AWS Lambda", "EventBridge", "Selenium / Playwright", "Kafka", "REST / Webhook APIs"],
  },
  {
    icon: Database,
    title: "Databases & Warehouses",
    items: ["ClickHouse", "Amazon Redshift", "PostgreSQL", "BigQuery", "S3 Data Lake"],
  },
  {
    icon: Cloud,
    title: "Cloud & Infra",
    items: ["AWS", "Docker", "Kubernetes", "FastAPI", "SFTPGo", "GitHub Actions"],
  },
  {
    icon: BarChart3,
    title: "BI & Visualisation",
    items: ["Grafana", "Apache Superset", "Power BI", "Metabase", "Excel Automation"],
  },
  {
    icon: Wrench,
    title: "Practices",
    items: ["Dimensional Modelling", "Data Quality Gates", "Idempotent Pipelines", "RBAC at Query Level", "IEC 61724 KPIs"],
  },
];

export default function LuxStack() {
  return (
    <section id="stack" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <span className="lx-kicker">Tech Stack</span>
        <h2 className="lx-serif lx-ink mt-3 text-[32px] sm:text-[40px] font-bold tracking-tight leading-tight">
          Tools chosen for <em className="lx-accent">production reliability</em>.
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GROUPS.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.07, duration: 0.4 }}
              className="lx-card lx-card-hover p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--lx-accent-soft)", color: "var(--lx-accent)" }}
                >
                  <g.icon size={16} />
                </span>
                <h3 className="lx-ink text-[15px] font-semibold">{g.title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <span key={it} className="lx-tag !text-[11.5px] !py-1 !px-3">{it}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
