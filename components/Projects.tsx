"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Filter } from "lucide-react";
import Panel from "./dashboard/Panel";
import StatusPill from "./dashboard/StatusPill";

type ProjectStatus = "LIVE" | "PROD" | "ACTIVE";

const PROJECTS = [
  {
    id: "ETL-001",
    tag: "ECOM",
    status: "PROD" as ProjectStatus,
    title: "Multi-Source Airflow ETL Platform",
    summary:
      "131-DAG orchestration unifying 31 marketplace sources with schema validation and zero-code onboarding.",
    problem:
      "A D2C apparel brand operated across 31 platforms with different schemas and delivery cadences. Manual consolidation was creating 80+ hours/month of ops work.",
    solution:
      "Designed a modular Airflow platform with schema-fingerprint validation (CSV header hash), Excel-driven column mapping (business users onboard new sources), and reusable DAG patterns.",
    impact:
      "New marketplace onboarding: 2–5 days → 2–4 hours. 80+ hrs/month manual MIS eliminated. Zero silent data corruption after schema validation.",
    tech: ["Airflow", "Python", "PostgreSQL", "Kafka", "S3"],
    metrics: ["131 DAGs", "31 sources", "−80 hrs/mo"],
    primary: "131",
    primaryLabel: "DAGs",
  },
  {
    id: "REC-002",
    tag: "ECOM",
    status: "PROD" as ProjectStatus,
    title: "Revenue Recovery & ASIN Reconciliation",
    summary:
      "5-step reconciliation framework recovering $1.05M unmapped vendor revenue across 6 international platforms.",
    problem:
      "Amazon Vendor UAE feed had a 0% match rate. $1.05M in vendor revenue was completely untracked.",
    solution:
      "Diagnosed root cause as Unicode/ASCII encoding corruption in the ASIN cleaning step. Fixed with encode-both-sides ASCII + strip + uppercase. Built a 5-step framework with per-platform match-rate monitoring.",
    impact:
      "Match rate: 0% → 99.8%. $1.05M recovered. Coverage: 96.5% ($3.65M / $3.78M). Pipeline: 53s → 6s (8.8× speedup).",
    tech: ["Python", "pandas", "PostgreSQL", "SQL", "S3"],
    metrics: ["$1.05M", "0%→99.8%", "8.8× faster"],
    primary: "$1.05M",
    primaryLabel: "recovered",
  },
  {
    id: "EMS-003",
    tag: "EMS",
    status: "LIVE" as ProjectStatus,
    title: "Solar IoT Ingestion & IEC 61724 KPI Engine",
    summary:
      "End-to-end IoT pipeline for 245 solar plants with IEC-compliant PR calculation and 99% Lambda reduction.",
    problem:
      "245 plants overloaded Redshift with 864K Lambda invocations/month, hitting a 500-connection ceiling. PR values were inflated by 6–17×.",
    solution:
      "Re-architected to single EventBridge-scheduled ETL Lambda using Redshift Data API (HTTP, 0 persistent connections). Built final_generation_etl with watermarks, dedup, and a 56-column dynamic pivot. Audited all 13 dashboards against IEC 61724.",
    impact:
      "Lambda: 864K → 8.6K/mo (−99%). Freshness: ≤10 min. PR within ±2% of IEC 61724. Fault detection: 8–12h → ≤10 min.",
    tech: ["Lambda", "Redshift", "Data API", "S3", "EventBridge"],
    metrics: ["245 plants", "−99% Lambda", "10M+ rows"],
    primary: "245",
    primaryLabel: "plants",
  },
  {
    id: "EDU-004",
    tag: "EDU",
    status: "PROD" as ProjectStatus,
    title: "Student Analytics & Persona Engine",
    summary:
      "6-dashboard Grafana suite with 5-persona classification, automated OMR evaluation, and SWOT paper generation.",
    problem:
      "Coaching institutes processed exam results manually over 10–15 days with ~80% accuracy. Personalised question paper generation was entirely manual.",
    solution:
      "Built 70+ ETL pipelines across 7 sources into PostgreSQL + ClickHouse. Designed a 5-persona engine. OMR via SQL window functions. SWOT generator with SequenceMatcher(0.7) + reportlab PDF + S3 delivery.",
    impact:
      "Exam processing: 10–15 days → same-day. Accuracy: ~80% → 99%+. 30–40 hrs/week saved. 500+ personalised papers/cycle.",
    tech: ["Python", "ClickHouse", "PostgreSQL", "Grafana", "Selenium"],
    metrics: ["500+ students", "same-day", "99%+ acc"],
    primary: "70+",
    primaryLabel: "pipelines",
  },
  {
    id: "CHW-005",
    tag: "ECOM",
    status: "ACTIVE" as ProjectStatus,
    title: "ClickHouse OLAP Warehouse — K-Beauty",
    summary:
      "Greenfield ClickHouse warehouse with 5 sources, 3 standardised write patterns, 27 production reports.",
    problem:
      "A K-beauty brand with no analytics infrastructure needed a warehouse handling daily snapshots, incremental appends, and delta upserts.",
    solution:
      "Designed ClickHouse schema with three write patterns: TRUNCATE+INSERT (snapshots), putDataframe+OPTIMIZE (incremental), deleteInsert (date-keyed delta). Delivered 27 reports + Power BI dashboard.",
    impact:
      "₹5.79 Cr revenue tracked across 87,514 transactions / 28,419 orders. 27 reports automated. PBIX version-controlled.",
    tech: ["ClickHouse", "Python", "Power BI", "Shopify", "Zoho"],
    metrics: ["₹5.79 Cr", "27 reports", "5 sources"],
    primary: "27",
    primaryLabel: "reports",
  },
  {
    id: "DSH-006",
    tag: "EMS",
    status: "LIVE" as ProjectStatus,
    title: "Solar Dashboard Platform & DGR Automation",
    summary:
      "4-family, 13-surface Grafana platform for 245 plants with RBAC, automated DGR, and real-time alarm engine.",
    problem:
      "Ops teams spent 80+ hrs/month on manual DGR. Fault detection took 8–12 hours. 12 distinct roles needed role-specific visibility.",
    solution:
      "Built a 4-family Grafana platform (13 surfaces). RBAC via user_effective_access_view (TEXT[] arrays GIN-indexed). FastAPI backend with 37 parameterised SQL files. Automated DGR + revenue invoicing.",
    impact:
      "DGR: 80+ hrs/mo saved. Invoicing: 15–20 hrs/mo saved. Fault detection: 8–12h → ≤10 min. 12 roles served.",
    tech: ["Grafana", "FastAPI", "PostgreSQL", "Lambda"],
    metrics: ["13 surfaces", "12 roles", "−80 hrs/mo"],
    primary: "13",
    primaryLabel: "dash surfaces",
  },
];

const FILTERS = ["ALL", "ECOM", "EDU", "EMS"];

function Modal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="panel w-full max-w-3xl max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="panel-header sticky top-0 z-10" style={{ background: "var(--bg-panel-2)" }}>
            <div className="flex items-center gap-2">
              <span className="theme-text-accent">project.{project.id.toLowerCase()}</span>
              <span className="theme-text-faint">·</span>
              <span className="theme-text-muted normal-case tracking-normal">{project.tag.toLowerCase()}</span>
            </div>
            <button onClick={onClose} aria-label="Close" className="theme-text-muted hover:theme-text-accent">
              <X size={14} />
            </button>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="mono text-[11px] theme-text-accent">{project.id}</span>
              <StatusPill status={project.status} pulse={project.status === "LIVE"} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold theme-text-primary">{project.title}</h3>

            <div className="flex flex-wrap gap-2 mt-4 mb-6">
              {project.metrics.map((m) => <span key={m} className="chip mono">{m}</span>)}
            </div>

            <div className="space-y-5 text-sm">
              {[
                { label: "Problem",         content: project.problem },
                { label: "Solution",        content: project.solution },
                { label: "Business impact", content: project.impact  },
              ].map(({ label, content }) => (
                <div key={label}>
                  <div className="mono text-[10.5px] uppercase tracking-wider theme-text-accent mb-1.5">{label}</div>
                  <p className="theme-text-secondary leading-relaxed">{content}</p>
                </div>
              ))}
              <div>
                <div className="mono text-[10.5px] uppercase tracking-wider theme-text-accent mb-2">Tech stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);
  const [filter, setFilter] = useState("ALL");

  const list = filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);

  return (
    <section id="projects" className="px-4 sm:px-6 py-6">
      <Panel
        name="panel.projects"
        meta={`SELECT * FROM projects WHERE tag = '${filter.toLowerCase()}' · ${list.length} rows`}
        actions={
          <div className="flex items-center gap-1">
            <Filter size={11} className="theme-text-muted" />
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-0.5 mono text-[10px] tracking-wider rounded-sm transition-colors ${
                  filter === f ? "theme-text-accent" : "theme-text-muted hover:theme-text-secondary"
                }`}
                style={filter === f ? { background: "var(--accent-soft)" } : undefined}
              >
                {f}
              </button>
            ))}
          </div>
        }
      >
        <h2 className="text-2xl sm:text-3xl font-bold theme-text-primary tracking-tight mb-1">
          Projects <span className="theme-text-accent">/</span> things I&apos;ve shipped
        </h2>
        <p className="theme-text-muted text-sm mb-6">
          Each row is a production system. Click to inspect problem, solution, impact, and tech stack.
        </p>

        {/* Table */}
        <div className="overflow-x-auto -mx-5 sm:-mx-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="mono text-[10.5px] uppercase tracking-wider theme-text-muted border-b theme-border-soft">
                <th className="text-left py-2.5 px-5 sm:px-6">id</th>
                <th className="text-left py-2.5 px-2">title</th>
                <th className="text-left py-2.5 px-2 hidden lg:table-cell">summary</th>
                <th className="text-left py-2.5 px-2 hidden sm:table-cell">tag</th>
                <th className="text-left py-2.5 px-2">status</th>
                <th className="text-left py-2.5 px-2 hidden md:table-cell">headline</th>
                <th className="text-left py-2.5 px-2 hidden lg:table-cell">tech</th>
                <th className="px-5 sm:px-6"></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => (
                  <motion.tr
                    layout
                    key={p.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelected(p)}
                    className="border-b theme-border-soft row-hover hover:row-hover-bg cursor-pointer group"
                  >
                    <td className="px-5 sm:px-6 py-3 mono text-[10.5px] theme-text-accent whitespace-nowrap">
                      {p.id}
                    </td>
                    <td className="px-2 py-3">
                      <div className="text-[13.5px] theme-text-primary font-medium leading-tight">
                        {p.title}
                      </div>
                      <div className="text-[11px] theme-text-muted mt-0.5 lg:hidden">
                        {p.summary}
                      </div>
                    </td>
                    <td className="px-2 py-3 hidden lg:table-cell text-[12px] theme-text-secondary max-w-md">
                      {p.summary}
                    </td>
                    <td className="px-2 py-3 hidden sm:table-cell">
                      <span className="mono text-[10.5px] theme-text-accent">{p.tag}</span>
                    </td>
                    <td className="px-2 py-3">
                      <StatusPill status={p.status} pulse={p.status === "LIVE"} />
                    </td>
                    <td className="px-2 py-3 hidden md:table-cell">
                      <div className="mono tnum text-[13px] font-bold theme-text-primary">{p.primary}</div>
                      <div className="mono text-[10px] theme-text-faint uppercase">{p.primaryLabel}</div>
                    </td>
                    <td className="px-2 py-3 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {p.tech.slice(0, 3).map((t) => (
                          <span key={t} className="mono text-[10px] theme-text-muted">{t}</span>
                        ))}
                        {p.tech.length > 3 && (
                          <span className="mono text-[10px] theme-text-faint">+{p.tech.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 sm:px-6 py-3 text-right">
                      <ArrowRight
                        size={14}
                        className="theme-text-faint group-hover:theme-text-accent group-hover:translate-x-0.5 transition-all"
                      />
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t theme-border-soft mono text-[10.5px] theme-text-faint flex justify-between">
          <span>showing {list.length} of {PROJECTS.length} rows</span>
          <span>order by: deployed desc</span>
        </div>
      </Panel>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
