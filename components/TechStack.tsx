"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Panel from "./dashboard/Panel";

type Skill = { name: string; depth: 1 | 2 | 3 | 4; tip: string };

const STACK: { category: string; items: Skill[] }[] = [
  {
    category: "Orchestration & ETL",
    items: [
      { name: "Apache Airflow",  depth: 4, tip: "131 DAGs in production · 31 source systems" },
      { name: "AWS Lambda",      depth: 4, tip: "Reduced invocations 99% (864K → 8.6K/mo)" },
      { name: "EventBridge",     depth: 3, tip: "Solar IoT ETL trigger every 15 min · 245 plants" },
      { name: "Kafka",           depth: 2, tip: "Real-time event streaming for D2C orders" },
      { name: "SFTPGo",          depth: 2, tip: "Managed SFTP ingestion for legacy feeds" },
      { name: "Selenium",        depth: 3, tip: "Browser-driven scraping for no-API SaaS" },
      { name: "Playwright",      depth: 3, tip: "Amazon Vendor Central with Gmail OTP 2FA" },
    ],
  },
  {
    category: "Databases & Warehouses",
    items: [
      { name: "PostgreSQL",      depth: 4, tip: "OLTP store · 47+ views · GIN-indexed RBAC" },
      { name: "ClickHouse",      depth: 4, tip: "OLAP warehouse · ₹5.79 Cr tracked · 87K+ txns" },
      { name: "Amazon Redshift", depth: 4, tip: "Serverless · 10M+ rows · Data API (0 conn)" },
      { name: "BigQuery",        depth: 2, tip: "Ad-hoc analytics + cross-cloud reporting" },
      { name: "MongoDB",         depth: 2, tip: "Document store for semi-structured feeds" },
      { name: "MySQL",           depth: 2, tip: "Legacy source integration" },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      { name: "AWS S3",            depth: 4, tip: "Central data lake · event-driven ingestion" },
      { name: "AWS CloudWatch",    depth: 3, tip: "Pipeline alerting + Lambda monitoring" },
      { name: "AWS IAM",           depth: 3, tip: "Least-privilege multi-tenant access" },
      { name: "Redshift Data API", depth: 4, tip: "HTTP Redshift — zero connection-limit pattern" },
      { name: "Docker",            depth: 2, tip: "Containerised ETL services" },
      { name: "Kubernetes",        depth: 2, tip: "Orchestration for microservices" },
      { name: "GCP",               depth: 2, tip: "BigQuery + Cloud Storage cross-cloud" },
    ],
  },
  {
    category: "BI & Visualisation",
    items: [
      { name: "Grafana",     depth: 4, tip: "13 surfaces · 245 plants · 12-role RBAC" },
      { name: "Power BI",    depth: 3, tip: "ABC inventory dashboard · PBIX in git" },
      { name: "Superset",    depth: 3, tip: "Self-serve analytics on PostgreSQL views" },
      { name: "Metabase",    depth: 2, tip: "Rapid prototype dashboards" },
      { name: "FastAPI",     depth: 3, tip: "37 parameterised SQL endpoints" },
    ],
  },
  {
    category: "Languages & Libraries",
    items: [
      { name: "Python",       depth: 4, tip: "Primary language — ETL, APIs, ML, automation" },
      { name: "SQL",          depth: 4, tip: "Window functions, CTEs, dynamic pivots across 4 engines" },
      { name: "R",            depth: 2, tip: "Stats + academic reporting" },
      { name: "pandas",       depth: 4, tip: "~15K records/sec throughput" },
      { name: "NumPy",        depth: 3, tip: "Vectorised numerics for telemetry" },
      { name: "scikit-learn", depth: 3, tip: "5-segment student persona classification" },
      { name: "pangres",      depth: 3, tip: "Upsert helper for PostgreSQL" },
      { name: "boto3",        depth: 4, tip: "S3 + Lambda + Redshift Data API" },
      { name: "reportlab",    depth: 3, tip: "PDF generation · 500+ papers/cycle" },
    ],
  },
  {
    category: "Integrations",
    items: [
      { name: "Amazon SP-API",     depth: 4, tip: "0%→99.8% ASIN match-rate · $1.05M recovered" },
      { name: "Canvas LMS API",    depth: 3, tip: "Student data sync · 500+ learners" },
      { name: "Google Sheets/Drive", depth: 3, tip: "Business-user-driven column mapping" },
      { name: "Shopify API",       depth: 3, tip: "Order + inventory for K-beauty D2C" },
      { name: "Flipkart API",      depth: 3, tip: "Multi-channel inventory + orders" },
      { name: "Zoho API",          depth: 3, tip: "CRM + inventory sync" },
      { name: "Modbus",            depth: 3, tip: "Solar inverter telemetry parsing" },
    ],
  },
];

const DEPTH_LABEL: Record<number, string> = {
  4: "Expert",
  3: "Proficient",
  2: "Familiar",
  1: "Learning",
};

// Background colour by depth (using accent at varying alpha)
function depthBg(depth: number, hover: boolean) {
  const opacity =
    depth === 4 ? 0.95 :
    depth === 3 ? 0.65 :
    depth === 2 ? 0.35 :
    0.18;
  return hover
    ? `color-mix(in srgb, var(--accent) ${opacity * 100}%, var(--bg-panel-2))`
    : `color-mix(in srgb, var(--accent) ${opacity * 70}%, var(--bg-panel))`;
}

function HeatCell({ skill }: { skill: Skill }) {
  const [hover, setHover] = useState(false);
  // Pure dark text on the accent at high depth (yellow), white on dark base — choose by depth
  const isHigh = skill.depth >= 3;
  return (
    <div className="relative">
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-full h-full text-left rounded-sm px-3 py-2.5 transition-all border"
        style={{
          background: depthBg(skill.depth, hover),
          borderColor: hover ? "var(--accent)" : "var(--border-soft)",
          transform: hover ? "translateY(-1px)" : undefined,
          color: isHigh ? "#0b0f17" : "var(--fg-primary)",
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-semibold">{skill.name}</span>
          <span className="mono text-[10px] opacity-70 tnum">
            {"▰".repeat(skill.depth)}{"▱".repeat(4 - skill.depth)}
          </span>
        </div>
        <div className="mono text-[10px] opacity-60 mt-0.5">{DEPTH_LABEL[skill.depth]}</div>
      </button>

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.12 }}
            className="absolute z-30 left-1/2 -translate-x-1/2 mt-2 w-60 px-3 py-2 panel pointer-events-none"
          >
            <div className="mono text-[10px] uppercase tracking-wider theme-text-accent mb-1">
              {skill.name}
            </div>
            <p className="text-[11.5px] theme-text-secondary leading-snug">{skill.tip}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TOTALS = (() => {
  const all = STACK.flatMap((g) => g.items);
  const expert = all.filter((s) => s.depth === 4).length;
  const profic = all.filter((s) => s.depth === 3).length;
  const famil  = all.filter((s) => s.depth === 2).length;
  return { all: all.length, expert, profic, famil };
})();

export default function TechStack() {
  return (
    <section id="tech" className="px-4 sm:px-6 py-6">
      <Panel
        name="panel.tech_stack"
        meta={`heatmap · ${TOTALS.all} skills · hover any cell for production context`}
        actions={
          <span className="chip">
            <span className="theme-text-success">{TOTALS.expert}</span>
            <span className="theme-text-muted">expert</span>
            <span className="theme-text-faint">·</span>
            <span className="theme-text-info">{TOTALS.profic}</span>
            <span className="theme-text-muted">proficient</span>
          </span>
        }
      >
        <h2 className="text-2xl sm:text-3xl font-bold theme-text-primary tracking-tight mb-1">
          Tech <span className="theme-text-accent">/</span> production-proven stack
        </h2>
        <p className="theme-text-muted text-sm mb-6">
          Skill depth visualised. Darker amber = deeper hands-on usage. Hover any
          cell to see where it shipped in production.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 mb-6 mono text-[11px] theme-text-muted">
          <span className="theme-text-faint">depth:</span>
          {([4, 3, 2, 1] as const).map((d) => (
            <span key={d} className="inline-flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm border theme-border-soft"
                style={{ background: depthBg(d, false) }}
              />
              <span>{"▰".repeat(d)}{"▱".repeat(4 - d)}</span>
              <span>{DEPTH_LABEL[d]}</span>
            </span>
          ))}
        </div>

        {/* Grid of categories */}
        <div className="grid lg:grid-cols-2 gap-5">
          {STACK.map((group) => (
            <div key={group.category} className="panel">
              <div className="panel-header">
                <span><span className="theme-text-accent">{group.category}</span></span>
                <span className="theme-text-faint">{group.items.length}</span>
              </div>
              <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {group.items.map((s) => <HeatCell key={s.name} skill={s} />)}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}
