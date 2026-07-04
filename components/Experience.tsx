"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Building2 } from "lucide-react";
import Panel from "./dashboard/Panel";
import StatusPill from "./dashboard/StatusPill";

const ROLES = [
  {
    code: "EMS",
    short: "Solar EMS",
    domain: "Renewable Energy",
    period: "2024 – Present",
    status: "LIVE" as const,
    title: "Data Engineer · Solar IoT & Analytics Platform",
    bullets: [
      "Designed end-to-end IoT ingestion for 245 solar plants — Modbus loggers → SFTPGo → S3 → Lambda → Redshift Serverless with ≤10-min data freshness",
      "Re-architected the Lambda/Redshift stack hitting the 500-connection limit → Redshift Data API, cutting invocations by 99% (864K → 8.6K/month)",
      "Conducted IEC 61724 PR audit across 13 dashboards, correcting a 6–17× calculation error; output now within ±2% of the standard",
      "Delivered a 4-family Grafana platform (13 surfaces, 12 roles); automated DGR saving 80+ hrs/month; alarm engine: 8–12h → ≤10 min detection",
    ],
    tech: ["AWS Lambda", "Redshift Serverless", "Redshift Data API", "Grafana", "FastAPI", "Python", "PostgreSQL"],
  },
  {
    code: "EDU",
    short: "Coaching",
    domain: "EdTech",
    period: "2023 – Present",
    status: "PROD" as const,
    title: "Data & Analytics Engineer · Student Intelligence Platform",
    bullets: [
      "Built 70+ Python ETL pipelines across 7 source systems (Selenium + IMAP, REST APIs, Cloud Sheets/Drive/Forms, IoT sensors, RFID, manual CSVs)",
      "Designed dual-database architecture: PostgreSQL (47+ views) + ClickHouse (16 tables) feeding Grafana dashboards and Apache Superset",
      "Delivered 6 Grafana dashboards including a 5-persona student classification engine, chapter weakness prioritisation, and geographic heatmap",
      "Automated OMR evaluation (SQL window functions) and SWOT question paper generation (500+ personalised papers/cycle); saved 30–40 hrs/week",
    ],
    tech: ["Python", "ClickHouse", "PostgreSQL", "Grafana", "Selenium", "REST APIs", "AWS S3", "reportlab"],
  },
  {
    code: "ECOM",
    short: "Commerce",
    domain: "E-commerce",
    period: "2022 – Present",
    status: "LIVE" as const,
    title: "Data Engineer · Multi-Marketplace Analytics Platform",
    bullets: [
      "Maintained 131 production Airflow DAGs ingesting 31 source systems; Excel-driven onboarding cut new-source integration from 2–5 days to 2–4 hours",
      "Recovered $1.05M in unmapped Amazon Vendor revenue by fixing ASIN normalisation (0% → 99.8% match rate) across 6 platforms",
      "Built ClickHouse OLAP warehouse from scratch: 30+ tables, 5 sources, 3 write patterns, 27 production reports tracking ₹5.79 Cr revenue",
      "Eliminated 80+ hrs/month of manual MIS; deployed RFM segmentation, product adjacency analysis, and Power BI inventory intelligence",
    ],
    tech: ["Apache Airflow", "PostgreSQL", "ClickHouse", "Python", "Kafka", "Power BI", "AWS S3", "scikit-learn"],
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const role = ROLES[active];

  return (
    <section id="experience" className="px-4 sm:px-6 py-6">
      <Panel
        name="panel.experience"
        meta="employer: Delphi Analytics · 3 active engagements"
        actions={
          <span className="chip">
            <Building2 size={11} className="theme-text-accent" />
            <Calendar size={11} className="theme-text-muted" />
            Jul 2021–present
          </span>
        }
      >
        <h2 className="text-2xl sm:text-3xl font-bold theme-text-primary tracking-tight mb-1">
          Experience <span className="theme-text-accent">/</span> engagements
        </h2>
        <p className="theme-text-muted text-sm mb-6">
          Switch tabs to inspect each engagement&apos;s metrics, scope, and stack.
        </p>

        {/* Tab strip */}
        <div className="flex border-b theme-border-soft overflow-x-auto">
          {ROLES.map((r, i) => (
            <button
              key={r.code}
              onClick={() => setActive(i)}
              className={`relative px-4 py-2.5 mono text-[11.5px] uppercase tracking-wider whitespace-nowrap transition-colors ${
                active === i ? "theme-text-accent" : "theme-text-muted hover:theme-text-secondary"
              }`}
            >
              <span className="opacity-60 mr-2">{String(i + 1).padStart(2, "0")}</span>
              {r.short}
              {active === i && (
                <motion.span
                  layoutId="exp-active"
                  className="absolute left-0 right-0 -bottom-px h-[2px]"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="pt-6 min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-lg sm:text-xl font-bold theme-text-primary">
                  {role.title}
                </h3>
                <StatusPill status={role.status} pulse={role.status === "LIVE"} />
              </div>
              <p className="mono text-[11.5px] theme-text-muted mb-5">
                <span className="theme-text-accent">{role.code}</span> ·{" "}
                {role.domain} · {role.period}
              </p>

              <ul className="space-y-2.5">
                {role.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 theme-text-secondary text-sm leading-relaxed">
                    <span className="mono theme-text-accent mt-1 flex-shrink-0 text-[10px]">{String(j + 1).padStart(2, "0")}</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t theme-border-soft">
                <div className="mono text-[10.5px] uppercase tracking-wider theme-text-muted mb-2.5">
                  tech.stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {role.tech.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Panel>
    </section>
  );
}
