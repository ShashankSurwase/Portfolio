"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  GraduationCap,
  Zap,
  X,
  ArrowRight,
  Database,
  TrendingUp,
  Wrench,
  Layers,
} from "lucide-react";
import Panel from "./dashboard/Panel";
import StatusPill from "./dashboard/StatusPill";
import Sparkline from "./dashboard/Sparkline";

type SubProject = {
  title: string;
  oneLiner: string;
  bullets: string[];
};

type Domain = {
  id: string;
  code: string;
  icon: typeof ShoppingCart;
  label: string;
  industry: string;
  description: string;
  outcomes: string[];
  tech: string[];
  status: "LIVE" | "PROD";
  problemSummary: string;
  whatIDo: string;
  subProjects: SubProject[];
  patterns: string[];
  headlineMetrics: { label: string; value: string }[];
  sparkData: number[];
  sparkVariant: "accent" | "info";
};

const DOMAINS: Domain[] = [
  {
    id: "ecommerce",
    code: "ECOM",
    icon: ShoppingCart,
    label: "E-commerce",
    industry: "D2C · Marketplace · Quick-commerce · General Trade",
    description:
      "Multi-channel data platforms for brands selling across 6–12 channels — own D2C site, pan-Indian marketplaces, quick-commerce, regional retailers, General Trade distribution, and international (UAE / GCC) marketplaces.",
    outcomes: [
      "$1.05M revenue recovered via ASIN reconciliation fix",
      "131 production Airflow DAGs across 31 source systems",
      "₹5.79 Cr revenue tracked; 27 automated reports",
      "80+ hrs/month manual MIS work eliminated",
    ],
    tech: ["Airflow", "PostgreSQL", "ClickHouse", "Kafka", "Selenium", "Playwright", "Power BI", "Grafana"],
    status: "LIVE",
    problemSummary:
      "Brands sit on data they can't use — marketplace exports are non-standardised, source-system access spans every protocol (REST, SFTP, scraping, Azure SQL, MongoDB, Kafka, webhooks), and the same SKU has different stock balances simultaneously across a dozen locations.",
    whatIDo:
      "I own the full data stack — from raw ingestion across 31 source systems to a dual PostgreSQL + ClickHouse warehouse, then onward to dashboards, ML use-cases, and automated reporting. Three engagements: D2C apparel (12+ channels), multi-marketplace personal-care (India + GCC), K-beauty platform.",
    subProjects: [
      { title: "131-DAG Airflow ETL Platform", oneLiner: "Multi-source orchestration with schema fingerprint validation and zero-code onboarding",
        bullets: ["31 source systems automated end-to-end","Excel-driven mapping — analysts onboard new marketplaces without engineering","CSV header hash on every load → reject schema drift","New marketplace onboarding: 2–5 days → 2–4 hours"] },
      { title: "Unified Sales Fact Table (ClickHouse)", oneLiner: "129-column hourly-refreshed fact unifying 12+ sales channels",
        bullets: ["Unions D2C website + 8 marketplaces + retail outlets + GT","8 dimension joins enrich every row","5–7 day lookback heals backdated returns","LowCardinality + columnar = 10–100× faster than row-based PG"] },
      { title: "Inventory Analytics (Grafana, multi-org)", oneLiner: "92-column inventory fact + per-team dashboards with row-level RBAC",
        bullets: ["Inventory across 9 facilities unified","Per-SKU True ADS (divides by days-in-stock, not window)","ADS buckets: NOOS / Core / Snail / Non-selling","Per-platform topseller thresholds 45% / 55% / 80%"] },
      { title: "UAE-ASIN Revenue Recovery", oneLiner: "5-step framework + Unicode encoding fix recovered $1.05M",
        bullets: ["UAE Vendor Central match: 0% → 99.8%","Performance: 53 sec → 6 sec per run (8.8× speedup)","Per-platform quality gates >0.5% trigger alerts","1,425-product master with 9,975 platform-SKU mappings"] },
      { title: "K-Beauty ClickHouse Warehouse", oneLiner: "30+ tables, 27 production reports, PowerBI inventory dashboard",
        bullets: ["5 sources (Zoho, Unicommerce, Shopify, Flipkart, Reliance)","Three write patterns: TRUNCATE+INSERT, putDataframe, deleteInsert","27 reports across sales, RFM, inventory ageing, ABC","PBIX version-controlled as unpacked folder"] },
      { title: "Logistics & Reverse-Flow Analytics", oneLiner: "ClickPost two-stage polling + 50+ derived columns",
        bullets: ["47-column checkpoint history across 6+ couriers","EDD-breach + SLA-breach + attempt-count buckets","RTO early warning before courier auto-RTO","One query language across all channels"] },
    ],
    patterns: [
      "Schema-fingerprint validation at ingestion — catches silent format drift",
      "Excel- / Google-Sheet-driven configuration — business users own master mappings",
      "Snapshot tables over mutable inventory — ClickHouse TRUNCATE+INSERT",
      "True ADS (sum / days-in-stock), not naive ADS",
      "Raw → MV → Final pattern for streaming webhook events",
    ],
    headlineMetrics: [
      { label: "Sources",      value: "31" },
      { label: "Airflow DAGs", value: "131" },
      { label: "SQL files",    value: "1,441+" },
      { label: "Recovered",    value: "$1.05M" },
    ],
    sparkData: [12, 18, 22, 26, 30, 31, 31, 31, 31],
    sparkVariant: "accent",
  },
  {
    id: "edtech",
    code: "EDU",
    icon: GraduationCap,
    label: "EdTech",
    industry: "Coaching Institutes · K-12 Exam Prep (JEE / NEET / Boards)",
    description:
      "Student intelligence platforms for K–12 coaching institutes — 70+ ETL pipelines across 7+ source systems, dual PostgreSQL + ClickHouse architecture, and a 6-dashboard Grafana suite.",
    outcomes: [
      "OMR evaluation: 10–15 days → same-day",
      "Data accuracy: ~80% → 99%+",
      "30–40 hrs/week of manual work eliminated",
      "SWOT-based personalised question papers per student",
    ],
    tech: ["ClickHouse", "PostgreSQL", "Grafana", "Selenium", "Canvas LMS API", "Mistral OCR", "AWS S3"],
    status: "PROD",
    problemSummary:
      "Coaching institutes run yearly batches of 1,000+ students. The coaching-management tool has no API. OMR evaluation took 10–15 days. Test data lived in three siloed systems. MIS reports consumed 30–40 hrs/week.",
    whatIDo:
      "I built a complete data analytics platform — from scraping a no-API web app to personalised PDF question papers uploaded to S3. End-to-end: 70+ ETL pipelines, dual-database warehouse, six Grafana dashboards, automated reporting, and a SWOT-based question paper generator.",
    subProjects: [
      { title: "Coaching-Tool Selenium Ingestion", oneLiner: "Browser automation for a no-API SaaS, with crash-resumable scrapes",
        bullets: ["Reusable browserLib wrapper","IMAP-based intercept for email-delivered exports","Progress-file resumption (delete-on-completion)","500+ student attendance scraped daily"] },
      { title: "Online-Testing-Platform REST Sync", oneLiner: "Canvas-style API integration with Link-header pagination",
        bullets: ["Bearer-token auth, Link rel=next pagination","Active-courses + 2-month rolling window","Pool(8–10) parallel quiz / submission pulls","12-retry loop wrapping every DB write"] },
      { title: "OMR Evaluation Pipeline", oneLiner: "1,000+ bubble sheets per test, SQL window scoring + ranking",
        bullets: ["Multi-sheet Excel ingest","Handles CANCELLED / BONUS / BLANK edges","Per-test-type scoring (4 types)","Turnaround: 10–15 days → same-day"] },
      { title: "SWOT Question-Paper Generator", oneLiner: "Per-student PDF with fuzzy chapter matching + difficulty calibration",
        bullets: ["Per-student SWOT view from test history","SequenceMatcher 0.7-threshold fuzzy match","reportlab PDF + boto3 → S3 pre-signed URL","Row-count gate — skip days with no new data"] },
      { title: "6-Dashboard Grafana Suite", oneLiner: "Per-student / per-test / per-subject / per-faculty / institute / segmentation",
        bullets: ["5-persona auto-classification","Chapter prioritisation: (70-Median%)×Students","8-dimension faculty feedback matrix","4-band student segmentation"] },
      { title: "IoT + RFID Attendance", oneLiner: "Real-time presence + card-reader sync for cross-validation",
        bullets: ["Real-time classroom presence telemetry","RFID tap-in / tap-out attendance","Mistral AI OCR for physical docs"] },
    ],
    patterns: [
      "Progress-file resumption — crash-safe long-running scrapes",
      "Metadata-driven file discovery — `drive_metadata` index queried by path-pattern",
      "Filename-convention parsing (testid.date.subject.set.schedule.group)",
      "MultiIndex stack for 4-level header Excels",
      "Single service-account auth across Sheets / Drive / Geocoding / Forms",
    ],
    headlineMetrics: [
      { label: "Students/yr",  value: "~1,200" },
      { label: "Pipelines",    value: "70+" },
      { label: "Sources",      value: "7+" },
      { label: "Dashboards",   value: "6" },
    ],
    sparkData: [10, 22, 35, 44, 53, 62, 68, 70, 72],
    sparkVariant: "info",
  },
  {
    id: "renewable",
    code: "EMS",
    icon: Zap,
    label: "Renewable Energy",
    industry: "Utility-Scale Solar IPP · Ground-Mount + C&I Rooftop + Captive",
    description:
      "Cloud Energy Management System for 245 solar plants across India — real-time IoT ingestion, IEC 61724-compliant KPI engine, role-based Grafana dashboards (13 surfaces / 12 roles), and the full audit + automation set.",
    outcomes: [
      "245 plants, ≤10-min data freshness",
      "99% Lambda invocation reduction (864K → 8.6K/mo)",
      "6×–17× PR error corrected across 13 dashboards",
      "Fault detection: 8–12h → ≤10 minutes",
    ],
    tech: ["Redshift Serverless", "AWS Lambda", "Redshift Data API", "Grafana", "FastAPI", "Modbus", "SFTPGo"],
    status: "LIVE",
    problemSummary:
      "The platform was already running — making the problems more dangerous. PR values across 13 dashboards were silently 6×–17× off but looked plausible. Lambda-per-file was hitting Redshift's 500-connection limit. Manual DGR consumed 80+ hrs/month. Fault detection was T+1.",
    whatIDo:
      "End-to-end ownership of ingestion, KPI calculation, dashboard SQL, and the audit / correctness work that proves the platform's numbers are trustworthy. Re-architected from per-file Lambda to scheduled batch via the Redshift Data API; audited every KPI against IEC 61724.",
    subProjects: [
      { title: "IoT Ingestion Layer", oneLiner: "Two logger families normalised to one 8-column schema",
        bullets: ["WebDyn (Modbus + DEF-file scaling) + Locus (named pre-scaled CSV)","Per-site timestamp format detection","S3 server-side copy archives raw files","Redshift Auto-Copy continuously loads processed prefix"] },
      { title: "Architecture Re-design", oneLiner: "864K → 8.6K Lambda invocations/month; connection pressure eliminated",
        bullets: ["Collapsed Lambda-per-file → single EventBridge ETL Lambda","Switched to Redshift Data API — zero persistent connections","System now scales to 1,000+ plants","99% reduction in invocation cost"] },
      { title: "IEC 61724 PR Audit", oneLiner: "Plausible-but-wrong PR values 6–17× off; corrected to ±2%",
        bullets: ["Root-caused: AVG instead of SUM across pyranometers","Root-caused: ÷1000 instead of ÷12000","Cross-referenced every SQL against IEC 61724","Reprocessed final_generation for all affected sites"] },
      { title: "ETL Pipeline (final_generation_etl)", oneLiner: "Self-healing transactional ETL with per-site greedy watermarks",
        bullets: ["ready_sites gate","Per-site watermarks (independent backfill)","36-hour window + neighbour-record re-fetch","Atomic upsert: DELETE…USING…; INSERT in one BEGIN/COMMIT"] },
      { title: "Role-Based Grafana (13 surfaces, 12 roles)", oneLiner: "Global / Plant / Map / Performance-Availability + 9 auxiliary",
        bullets: ["RBAC via user_effective_access_view","TEXT[] arrays GIN-indexed for site-level scoping","Every query injected with = ANY(:site_ids)","Health thresholds Good ≥90% / Warn / Alert"] },
      { title: "Automation Engine", oneLiner: "DGR + revenue invoicing + real-time alarm engine",
        bullets: ["DGR: 80+ hrs/month reclaimed","Revenue invoicing: 15–20 hrs/month","Alarm engine: ≤10 min detection","~₹2.8L revenue protected per 8h-fault on a 10MW plant"] },
    ],
    patterns: [
      "Batch over event-driven for predictable IoT — 99% cheaper",
      "Don't gap-fill silently — exclude OOS / missing intervals from denominators",
      "Validate against the standard, not against itself (IEC 61724)",
      "Self-healing transactional ETL — BEGIN; DELETE...; INSERT; COMMIT",
      "Per-site greedy watermarks — one stuck logger doesn't block 244 others",
    ],
    headlineMetrics: [
      { label: "Plants",        value: "245" },
      { label: "Freshness",     value: "≤10 min" },
      { label: "Lambda",        value: "−99%" },
      { label: "KPI accuracy",  value: "±2%" },
    ],
    sparkData: [110, 142, 168, 189, 204, 218, 232, 240, 245],
    sparkVariant: "accent",
  },
];

/* ─── Modal ───────────────────────────────────────────────── */
function Section({ icon: Icon, title, children }: { icon: typeof Database; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={13} className="theme-text-accent" />
        <h4 className="mono text-[11px] uppercase tracking-wider theme-text-accent">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function DomainModal({ domain, onClose }: { domain: Domain; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
          className="panel w-full max-w-4xl max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="panel-header sticky top-0 z-10" style={{ background: "var(--bg-panel-2)" }}>
            <div className="flex items-center gap-2">
              <span className="live-dot" />
              <span className="theme-text-accent">panel.domain.{domain.id}</span>
              <span className="theme-text-faint">·</span>
              <span className="theme-text-muted normal-case tracking-normal">drilldown view</span>
            </div>
            <button onClick={onClose} aria-label="Close" className="theme-text-muted hover:theme-text-accent">
              <X size={14} />
            </button>
          </div>

          {/* Header band */}
          <div className="p-6 sm:p-8 border-b theme-border-soft">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent-soft)" }}
              >
                <domain.icon size={22} className="theme-text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-2xl sm:text-3xl font-bold theme-text-primary">{domain.label}</h3>
                  <StatusPill status={domain.status} pulse={domain.status === "LIVE"} />
                  <span className="chip">code: <span className="theme-text-accent">{domain.code}</span></span>
                </div>
                <p className="text-sm theme-text-muted">{domain.industry}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {domain.headlineMetrics.map((m) => (
                <div key={m.label} className="panel p-3 text-center">
                  <div className="mono text-xl font-bold theme-text-accent tnum">{m.value}</div>
                  <div className="mono text-[10px] uppercase theme-text-muted mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            <Section icon={Wrench} title="What I do in this domain">
              <p className="text-sm theme-text-secondary leading-relaxed">{domain.whatIDo}</p>
            </Section>

            <Section icon={TrendingUp} title="The problem space">
              <p className="text-sm theme-text-secondary leading-relaxed">{domain.problemSummary}</p>
            </Section>

            <Section icon={Layers} title={`Sub-projects (${domain.subProjects.length})`}>
              <div className="space-y-3">
                {domain.subProjects.map((sp, i) => (
                  <motion.div
                    key={sp.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="panel p-4 panel-hover"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "var(--accent-soft)" }}
                      >
                        <span className="mono text-[10px] font-bold theme-text-accent">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold theme-text-primary">{sp.title}</h4>
                        <p className="text-xs theme-text-muted mt-0.5 leading-relaxed">{sp.oneLiner}</p>
                      </div>
                    </div>
                    <ul className="ml-9 space-y-1.5 mt-3">
                      {sp.bullets.map((b, j) => (
                        <li key={j} className="text-xs theme-text-secondary leading-relaxed flex gap-2">
                          <span className="mono theme-text-accent text-[10px] mt-0.5">▹</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </Section>

            <Section icon={Database} title="Engineering patterns">
              <ul className="space-y-2">
                {domain.patterns.map((p) => (
                  <li key={p} className="text-sm theme-text-secondary leading-relaxed flex gap-2">
                    <span className="mono theme-text-accent text-[11px] mt-0.5">▹</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon={Database} title="Tech stack">
              <div className="flex flex-wrap gap-2">
                {domain.tech.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            </Section>

            <div className="pt-2 border-t theme-border-soft mono text-[10px] theme-text-faint text-center">
              all content industry-generic · no client names · no proprietary data
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── List view ───────────────────────────────────────────── */
export default function Domains() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = DOMAINS.find((d) => d.id === openId);

  return (
    <section id="domains" className="px-4 sm:px-6 py-6">
      <Panel
        name="panel.domains"
        meta={`${DOMAINS.length} active domain engagements · click row to drill down`}
        actions={<span className="chip">filter: production-only</span>}
      >
        <h2 className="text-2xl sm:text-3xl font-bold theme-text-primary tracking-tight mb-1">
          Domains <span className="theme-text-accent">/</span> industries served
        </h2>
        <p className="theme-text-muted text-sm mb-6">
          Three industries, same engineering rigour. Click any row to inspect
          sub-projects, engineering patterns, and tech stack.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {DOMAINS.map((d, i) => (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setOpenId(d.id)}
              className="panel panel-hover w-full text-left p-5 group hover:theme-border-accent"
            >
              <div className="flex items-start gap-4">
                {/* Icon block */}
                <div
                  className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent-soft)" }}
                >
                  <d.icon size={20} className="theme-text-accent" />
                </div>

                {/* Main */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="mono text-[11px] theme-text-accent">{d.code}</span>
                    <h3 className="text-base sm:text-lg font-bold theme-text-primary">{d.label}</h3>
                    <StatusPill status={d.status} pulse={d.status === "LIVE"} />
                  </div>
                  <p className="text-[12.5px] theme-text-muted mb-3">{d.industry}</p>
                  <p className="text-sm theme-text-secondary leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {d.description}
                  </p>

                  {/* Metric strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                    {d.headlineMetrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className="mono text-xs sm:text-sm font-bold theme-text-accent tnum">{m.value}</span>
                        <span className="mono text-[10px] uppercase theme-text-faint mt-0.5">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sparkline + arrow */}
                <div className="hidden md:flex flex-col items-end gap-2 flex-shrink-0">
                  <Sparkline data={d.sparkData} variant={d.sparkVariant} width={120} height={32} />
                  <span className="mono text-[10px] theme-text-faint inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    drill down <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </Panel>

      {open && <DomainModal domain={open} onClose={() => setOpenId(null)} />}
    </section>
  );
}
