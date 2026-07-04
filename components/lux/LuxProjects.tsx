"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, BookText } from "lucide-react";

const PROJECTS = [
  {
    title: "Multi-Marketplace ETL Platform",
    metric: "131 DAGs · 31 sources",
    impact:
      "Airflow platform ingesting marketplaces, ERPs and logistics APIs daily. New source onboarding cut from 2–5 days to 2–4 hours via an Excel-driven mapping system.",
    tags: ["Apache Airflow", "Python", "ClickHouse", "REST APIs"],
    story: "/v2#stories",
  },
  {
    title: "Revenue Reconciliation Engine",
    metric: "$1.05M recovered",
    impact:
      "Diagnosed an ASCII-encoding bug silently breaking marketplace ASIN matching (0% → 99.8%). Reconciles $3.78M across 6 platforms, 8.8× faster than before.",
    tags: ["Python", "Pandas", "Redshift", "SQL"],
    story: "/v2#stories",
  },
  {
    title: "Solar IoT KPI Platform",
    metric: "245 plants · −99% cost",
    impact:
      "Re-architected per-file Lambda ingestion into scheduled ETL: 864k → 8.6k invocations/month. KPIs corrected from 6–17× errors to ±2% of IEC 61724.",
    tags: ["AWS Lambda", "Redshift", "EventBridge", "Grafana"],
    story: "/v2#stories",
  },
  {
    title: "ClickHouse Analytics Warehouse",
    metric: "₹5.79 Cr tracked",
    impact:
      "30+ table warehouse with 27 fully automated SQL reports across 5 sales channels — every recurring report a human used to build, now a pipeline.",
    tags: ["ClickHouse", "SQL", "Airflow", "Metabase"],
    story: "/v2#work",
  },
  {
    title: "Student Analytics & Persona Engine",
    metric: "99%+ accuracy · same-day",
    impact:
      "5-type student personas from score trajectory, attendance and homework signals. OMR evaluation 10–15 days → same-day; 500+ personalised SWOT papers per cycle.",
    tags: ["ClickHouse", "Python", "Grafana", "ReportLab"],
    story: "/v2#stories",
  },
  {
    title: "Real-Time Alarm & Report Automation",
    metric: "≤10 min detection",
    impact:
      "Absence-based fault detection for solar plants (T+1 day → ≤10 min) protecting ~₹2.8L per incident, plus 80+ hrs/month of daily generation reports automated.",
    tags: ["PostgreSQL", "Airflow", "Grafana", "Slack API"],
    story: "/v2#work",
  },
];

export default function LuxProjects() {
  return (
    <section id="projects" className="py-20 sm:py-28" style={{ background: "var(--lx-bg-soft)", borderTop: "1px solid var(--lx-border)", borderBottom: "1px solid var(--lx-border)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="lx-kicker">Projects</span>
            <h2 className="lx-serif lx-ink mt-3 text-[32px] sm:text-[40px] font-bold tracking-tight leading-tight">
              Systems that run <em className="lx-accent">in production</em>, every day.
            </h2>
          </div>
          <Link href="/v2" className="lx-btn-outline !py-2.5 !px-4 !text-[11px]">
            <BookText size={13} /> Read the full stories
          </Link>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.4 }}
              className="lx-card lx-card-hover p-6 flex flex-col"
            >
              <div className="mono text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--lx-accent)" }}>
                {p.metric}
              </div>
              <h3 className="lx-serif lx-ink mt-2.5 text-[19px] font-bold leading-snug">{p.title}</h3>
              <p className="mt-2.5 text-[13px] leading-relaxed lx-muted flex-1">{p.impact}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="lx-tag">{t}</span>
                ))}
              </div>
              <Link
                href={p.story}
                className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors"
                style={{ color: "var(--lx-accent)" }}
              >
                Case study <ArrowUpRight size={13} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
