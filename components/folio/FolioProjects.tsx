"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, BookOpen, Sun, X, Users, Workflow, ArrowRight } from "lucide-react";
import { DOMAINS, DomainDetail } from "@/lib/domains";

const COVER = "/Portfolio/covers";

// GitHub mark (lucide dropped its brand glyph); inherits currentColor for both themes.
function Github({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

// GitHub repo roots (one repo per domain; each project lives in a Project-NN folder).
const REPO_ROOT: Record<"E-commerce" | "EdTech" | "Energy", string> = {
  "E-commerce": "https://github.com/ShashankSurwase/ECOM",
  EdTech: "https://github.com/ShashankSurwase/EdTech",
  Energy: "https://github.com/ShashankSurwase/Energy",
};
const repoUrl = (domain: "E-commerce" | "EdTech" | "Energy", n: number) =>
  `${REPO_ROOT[domain]}/tree/main/Project-${String(n).padStart(2, "0")}`;

// 16 anonymised projects (sourced from the domain folders). `id` maps to its cover art;
// `repo` opens the matching Project-NN folder in that domain's GitHub repository.
type Project = { id: string; title: string; domain: "E-commerce" | "EdTech" | "Energy"; impact: string; tags: string[]; repo: string };
const PROJECTS: Project[] = [
  // 🛒 E-COMMERCE & RETAIL
  {
    id: "ecom_multi_marketplace_airflow_etl",
    title: "Multi-Client Data Engineering Platform",
    domain: "E-commerce",
    impact: "Python 3.11 & Apache Airflow 131-DAG production platform automating multi-marketplace browser scraping (Selenium/Playwright with IMAP 2FA interception) and API ingestion across 31 source systems into a dual PostgreSQL & ClickHouse data warehouse.",
    tags: ["Python Automation", "Apache Airflow (131 DAGs)", "Selenium / Playwright", "PostgreSQL", "ClickHouse", "AWS S3"],
    repo: repoUrl("E-commerce", 1),
  },
  {
    id: "ecom_unified_sales_inventory_facts",
    title: "Unified Sales & INVMS Inventory Analytics Suite",
    domain: "E-commerce",
    impact: "ClickHouse Single Source of Truth (SSOT) data engine harmonizing 12 platforms into all_platform_sales (129-col) via date-level UNION, partner-to-child SKU mapping (ASIN/FSN/Style ID), and INVMS inventory (92-col). Features an hourly Airflow DAG with 15-day rolling DELETE+INSERT mutation window, powering predictive ML datasets and 28 team KPI dashboards with $1.05M recovered revenue.",
    tags: ["ClickHouse SSOT (129-col)", "all_platform_sales Fact", "INVMS Inventory (92-col)", "15-Day DELETE+INSERT Window", "Predictive ML Dataset Layer", "$1.05M ASIN Recovery"],
    repo: repoUrl("E-commerce", 2),
  },
  {
    id: "ecom_clickhouse_data_warehouse",
    title: "ClickHouse Data Warehouse & 27-Report Suite",
    domain: "E-commerce",
    impact: "Columnar ClickHouse warehouse built from scratch (30+ tables) unifying 5 source systems and 4 Reliance sub-channels (Ajio, Azorte, Tira Off/On). Engineered 3 write patterns (TRUNCATE+INSERT, append+OPTIMIZE, deleteInsert) powering 27 automated production reports.",
    tags: ["ClickHouse (30+ Tables)", "3 Write Patterns", "4 Reliance Channels Unified", "27 Automated Reports", "₹5.79 Cr Revenue Tracked"],
    repo: repoUrl("E-commerce", 3),
  },

  // 🎓 EDTECH & ACADEMIC ANALYTICS
  {
    id: "edtech_multi_source_etl_platform",
    title: "Multi-Client Data Engineering Pipeline Platform",
    domain: "EdTech",
    impact: "Dual PostgreSQL (47 views) & ClickHouse (16 tables) platform wiring 7 disconnected source systems (Canvas LMS API, Playwright/Selenium IMAP 2FA interception, RFID attendance, Google Drive) across ~2,200 students.",
    tags: ["70+ Python Pipelines", "7 Source Systems", "Playwright / Selenium", "PostgreSQL", "ClickHouse"],
    repo: repoUrl("EdTech", 1),
  },
  {
    id: "edtech_student_analytics_dashboards",
    title: "Unified Student Analytics & OMR / SWOT Automated PDF Reporting Suite",
    domain: "EdTech",
    impact: "50+ table star schema powering 17 Superset tabs, OpenCV/Tesseract computer vision OMR bubble evaluation (>97% accuracy), SWOT question paper generator (ReportLab), 5 student personas, and automated PDF scorecard delivery.",
    tags: ["OpenCV OMR Scoring", "SWOT PDF Generator", "5 Student Personas", "17 Superset Tabs", "Grafana"],
    repo: repoUrl("EdTech", 2),
  },

  // ☀️ RENEWABLE ENERGY (SOLAR)
  {
    id: "energy_iot_ingestion_pipeline",
    title: "IoT Data Ingestion & Real-Time Streaming Platform",
    domain: "Energy",
    impact: "Serverless IoT telemetry ingestion into Redshift Data API across 245 solar plants (cut Lambda invocations 864k → 8.6k/mo, -99% cost). Features a Kinesis real-time streaming lane with exactly-once shard watermarks.",
    tags: ["AWS Lambda (Serverless)", "Amazon Redshift Data API", "AWS Kinesis Streaming", "245 Solar Plants", "-99% Lambda Cost"],
    repo: repoUrl("Energy", 1),
  },
  {
    id: "energy_solar_kpi_engine_pr_audit",
    title: "IEC 61724 KPI Engine, EMS Dashboards & Operations Automation Suite",
    domain: "Energy",
    impact: "Audited Performance Ratio calculation bugs (6–17x error) to within ±2% of the IEC 61724 standard. Serves 13 Grafana dashboard surfaces with query-level RBAC (FastAPI) and automates daily generation reports & tariff PDF invoicing.",
    tags: ["IEC 61724 PR Audit (±2%)", "13 Grafana Surfaces", "FastAPI Query-Level RBAC", "Automated DGR & Invoicing"],
    repo: repoUrl("Energy", 4),
  },
];

// Per-project detail shown when a project card is clicked (blurb + key results).
const DETAILS: Record<string, { blurb: string; results: string[] }> = {
  ecom_multi_marketplace_airflow_etl: {
    blurb: "A production Python 3.11 & Apache Airflow platform of 131 pipelines that ingests, validates, and transforms data from 31 disconnected sales, logistics, and marketing systems into a PostgreSQL & ClickHouse dual warehouse. Engineered headless Selenium and Playwright browser automation scripts with an automated Gmail/IMAP 2FA OTP interception engine to extract non-API seller portal reports without human intervention.",
    results: ["Python 3.11 Automation", "31 sources → 1 warehouse", "131 Airflow DAGs", "Selenium/Playwright 2FA", "80+ hrs/month saved"],
  },
  ecom_unified_sales_inventory_facts: {
    blurb: "Engineered two canonical ClickHouse OLAP fact tables acting as the Single Source of Truth (SSOT) for all team analytics, predictive ML forecasting, and executive dashboarding. The all_platform_sales pipeline harmonizes raw tables across 12 platforms via date-level UNIONs and maps partner SKUs (ASINs, FNSKUs, Style IDs) to internal master Child SKUs with revenue disaggregation. An hourly Airflow DAG ingests live 1-hour sales while executing a 15-day rolling DELETE+INSERT mutation window to capture order status updates and returns, backed by parameterised on-demand historical backfill DAGs. The INVMS inventory fact consolidates 9 facility types with True-ADS calculation, powering PO replenishment and 28 production BI dashboards. Recovered $1.05M in unattributed UAE marketplace revenue by fixing an ASIN character-encoding bug (match rate 0% → 99.8%).",
    results: ["ClickHouse SSOT (129/92 cols)", "all_platform_sales & INVMS", "15-Day DELETE+INSERT Window", "$1.05M Revenue Recovered", "28 Team KPI Dashboards"],
  },
  ecom_clickhouse_data_warehouse: {
    blurb: "Designed and built a ClickHouse OLAP data warehouse from scratch with 30+ tables for a K-Beauty brand, unifying Zoho ERP, Unicommerce WMS, Shopify, and 4 Reliance sub-channels (Ajio Online, Azorte Online, Tira Offline, Tira Online) into a single view for the first time. Engineered 3 explicit write patterns (TRUNCATE+INSERT for snapshots, putDataframe()+OPTIMIZE for appends, deleteInsert() for date-keyed operations) powering 27 automated production reports tracking ₹5.79 Cr revenue across 87,514 transactions.",
    results: ["₹5.79 Cr revenue tracked", "4 Reliance channels unified", "3 ClickHouse write patterns", "27 automated reports"],
  },
  edtech_multi_source_etl_platform: {
    blurb: "An ETL platform wiring 7 disconnected student-data systems into a dual PostgreSQL (47+ views) and ClickHouse (16 tables) warehouse via 70+ production pipelines. Extracts from an API-less SaaS tool via Playwright/Selenium headless scraping with IMAP 2FA OTP interception, Canvas LMS API, and RFID gate attendance.",
    results: ["Accuracy ~80% → 99%+", "70+ production pipelines", "7 source systems unified", "~2,200 students/year"],
  },
  edtech_student_analytics_dashboards: {
    blurb: "A 50+ table star schema powering 17 Apache Superset dashboard tabs and Grafana organizations. Features an automated OpenCV computer vision OMR bubble evaluation system (>97% accuracy, 10–15 days → same-day turnaround), a SWOT-based practice paper generator rendering 500+ unique PDFs via ReportLab, and a 5-type student persona classification engine.",
    results: ["10–15 days → 30-min results", "500+ personalised papers/cycle", "17 Superset dashboard tabs", "OpenCV OMR >97% accuracy"],
  },
  energy_iot_ingestion_pipeline: {
    blurb: "Event-driven serverless ingestion of 5-minute solar telemetry from two datalogger families across 245 solar plants (~70,560 files/day). Re-architected a connection-heavy Lambda design into a scheduled Redshift Data API pipeline — cutting compute invocations 864,000 → 8,600/month (−99%). Added a real-time Kinesis streaming lane cutting latency from minutes to seconds.",
    results: ["245 solar plants live", "Latency minutes → seconds", "Lambda invocations −99%", "740M+ rows ingested"],
  },
  energy_solar_kpi_engine_pr_audit: {
    blurb: "Audited all 13 EMS dashboards and found Performance Ratio errors of 6–17x (aggregation & unit-conversion bugs); rewrote the KPI engine to within ±2% of the international IEC 61724 standard. Serves 13 Grafana dashboard surfaces with query-level RBAC via FastAPI and automates DGR reporting (80+ hrs/mo saved) and tariff invoicing.",
    results: ["±2% of IEC 61724 standard", "13 dashboards corrected", "Query-level RBAC (FastAPI)", "95+ hrs/month saved"],
  },
};

const DOMAIN_FILTER: Record<string, string> = { ecommerce: "E-commerce", edtech: "EdTech", energy: "Energy" };
const ICONS: Record<string, typeof ShoppingCart> = { ecommerce: ShoppingCart, edtech: BookOpen, energy: Sun };
const FILTERS = ["All", "E-commerce", "EdTech", "Energy"] as const;

export default function FolioProjects() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [detail, setDetail] = useState<DomainDetail | null>(null);
  const [projDetail, setProjDetail] = useState<Project | null>(null);
  const selectedDomain = active === "All" ? null : DOMAINS.find((d) => DOMAIN_FILTER[d.id] === active) || null;

  useEffect(() => {
    document.body.style.overflow = detail || projDetail ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [detail, projDetail]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setDetail(null); setProjDetail(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="py-16 sm:py-20" style={{ background: "var(--fo-bg-soft)", borderTop: "1px solid var(--fo-border)", borderBottom: "1px solid var(--fo-border)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-[32px] sm:text-[40px] font-bold">Projects</h2>
          <div className="fo-underline fo-underline-center" />
          <p className="mt-4 text-[16px] max-w-2xl mx-auto">
            Real production projects across three industries. Pick an industry to
            explore its work — every number is a real, measured outcome.
          </p>
        </div>

        {/* Domain filter buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {FILTERS.map((f) => (
            <button key={f} type="button" onClick={() => setActive(f)} className={`fo-pill-tab ${active === f ? "is-active" : ""}`}>
              {f}
            </button>
          ))}
        </div>

        {active === "All" ? (
          /* ALL: three domain cards → click to open that domain's projects */
          <div key="all" className="mt-10 grid md:grid-cols-3 gap-6">
            {DOMAINS.map((d) => {
              const Icon = ICONS[d.id];
              const label = DOMAIN_FILTER[d.id];
              const count = PROJECTS.filter((p) => p.domain === label).length;
              return (
                <div key={d.id} className="fo-card fo-card-hover fo-fade-up p-6 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--fo-accent-soft)", color: "var(--fo-accent)" }}>
                      <Icon size={22} />
                    </span>
                    <span className="fo-chip !text-[11px] !py-1 !px-2.5"><Users size={11} /> {d.clients}</span>
                  </div>
                  <h3 className="mt-4 text-[19px] font-bold fo-ink">{d.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed fo-muted flex-1">{d.tagline}</p>
                  <div className="mt-5 flex items-center gap-2.5">
                    <button onClick={() => setActive(label as (typeof FILTERS)[number])} className="fo-btn !py-2.5 !px-4 !text-[13px]">
                      View {count} projects <ArrowRight size={14} />
                    </button>
                    <button onClick={() => setDetail(d)} className="fo-btn-light !py-2.5 !px-4 !text-[13px]">Details</button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          selectedDomain && (() => {
            const Icon = ICONS[selectedDomain.id];
            const items = PROJECTS.filter((p) => p.domain === active);
            return (
              <div key={active} className="mt-10">
                <div className="flex items-center gap-3.5 pb-3.5 mb-6" style={{ borderBottom: "2px solid var(--fo-border)" }}>
                  <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--fo-accent-soft)", color: "var(--fo-accent)" }}>
                    <Icon size={19} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[18px] sm:text-[21px] font-bold fo-ink leading-tight">{selectedDomain.name}</h3>
                    <p className="text-[13px] fo-muted mt-0.5">{selectedDomain.clients} · {items.length} projects</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p, i) => (
                    <div
                      key={p.id}
                      className="fo-card fo-card-hover fo-fade-up flex flex-col overflow-hidden"
                      style={{ animationDelay: `${i * 45}ms` }}
                    >
                      <button onClick={() => setProjDetail(p)} className="fo-proj-btn group flex flex-col text-left cursor-pointer flex-1">
                        <span className="relative block w-full overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`${COVER}/${p.id}.svg`} alt={p.title} width={640} height={360} className="w-full block transition-transform duration-300 group-hover:scale-[1.04]" style={{ aspectRatio: "16 / 9", objectFit: "cover" }} />
                          <span className="fo-proj-badge">Click to explore</span>
                        </span>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="text-[16px] font-bold leading-snug fo-ink">{p.title}</h3>
                          <p className="mt-2 text-[13.5px] leading-relaxed fo-muted flex-1">{p.impact}</p>
                          <div className="mt-3.5 flex flex-wrap gap-1.5">
                            {p.tags.map((t) => (<span key={t} className="fo-tag !text-[11px]">{t}</span>))}
                          </div>
                        </div>
                      </button>
                      <div
                        className="flex items-center justify-between px-5 py-3"
                        style={{ borderTop: "1px solid var(--fo-border)", background: "var(--fo-bg-soft)" }}
                      >
                        <button
                          onClick={() => setProjDetail(p)}
                          className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors hover:opacity-80"
                          style={{ color: "var(--fo-accent)" }}
                        >
                          View case study <ArrowRight size={13} />
                        </button>
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub repository"
                          className="p-1.5 rounded-lg transition-colors fo-btn-light !p-1.5 flex items-center justify-center"
                          style={{ color: "var(--fo-ink)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={17} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* Domain detail modal */}
      <AnimatePresence>
        {detail && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            style={{ background: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(4px)" }}
            onClick={() => setDetail(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="folio w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
              style={{ background: "var(--fo-card)" }}
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 pb-4" style={{ background: "var(--fo-card)", borderBottom: "1px solid var(--fo-border)" }}>
                <div>
                  <div className="fo-chip !text-[11px] !py-1 !px-2.5 mb-2"><Users size={11} /> {detail.clients}</div>
                  <h3 className="text-[22px] sm:text-[26px] font-bold leading-tight fo-ink">{detail.name}</h3>
                </div>
                <button aria-label="Close" onClick={() => setDetail(null)} className="fo-btn-light !p-2.5 !rounded-full flex-shrink-0"><X size={16} /></button>
              </div>
              <div className="px-6 sm:px-8 py-6 space-y-7">
                <p className="text-[15px] leading-relaxed">{detail.overview}</p>
                <div>
                  <div className="fo-kicker mb-3">Results</div>
                  <div className="flex flex-wrap gap-2">{detail.metrics.map((m) => (<span key={m} className="fo-chip">{m}</span>))}</div>
                </div>
                {detail.engagements.map((g) => (
                  <div key={g.title}>
                    <h4 className="text-[16px] font-bold fo-ink mb-2.5">{g.title}</h4>
                    <ul className="space-y-2.5">
                      {g.points.map((p) => (
                        <li key={p} className="flex gap-2.5 text-[14px] leading-relaxed">
                          <span className="mt-[8px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--fo-accent)" }} />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="fo-card !shadow-none p-4" style={{ background: "var(--fo-bg-soft)" }}>
                  <div className="flex items-center gap-2 fo-kicker mb-2"><Workflow size={13} /> How the data flows</div>
                  <p className="mono text-[12.5px] leading-relaxed fo-muted">{detail.dataFlow}</p>
                </div>
                <div>
                  <div className="fo-kicker mb-3">Tools used</div>
                  <div className="flex flex-wrap gap-1.5">{detail.stack.map((t) => (<span key={t} className="fo-tag">{t}</span>))}</div>
                </div>
                <div className="pb-2">
                  <a
                    href={REPO_ROOT[DOMAIN_FILTER[detail.id] as "E-commerce" | "EdTech" | "Energy"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fo-btn !py-2.5 !px-4 !text-[13px] inline-flex"
                  >
                    <Github size={15} /> Browse domain repository on GitHub <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Per-project detail modal */}
      <AnimatePresence>
        {projDetail && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            style={{ background: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(4px)" }}
            onClick={() => setProjDetail(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="folio w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
              style={{ background: "var(--fo-card)" }}
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${COVER}/${projDetail.id}.svg`} alt={projDetail.title} width={640} height={360} className="w-full block" style={{ aspectRatio: "16 / 9", objectFit: "cover" }} />
                <button aria-label="Close" onClick={() => setProjDetail(null)} className="fo-btn-light !p-2.5 !rounded-full absolute top-3 right-3 flex-shrink-0"><X size={16} /></button>
              </div>
              <div className="px-6 sm:px-8 py-6 space-y-6">
                <div>
                  <h3 className="text-[21px] sm:text-[25px] font-bold leading-tight fo-ink">{projDetail.title}</h3>
                </div>
                <p className="text-[15px] leading-relaxed">{DETAILS[projDetail.id]?.blurb ?? projDetail.impact}</p>
                {DETAILS[projDetail.id]?.results?.length ? (
                  <div>
                    <div className="fo-kicker mb-3">Key results</div>
                    <div className="flex flex-wrap gap-2">{DETAILS[projDetail.id].results.map((r) => (<span key={r} className="fo-chip">{r}</span>))}</div>
                  </div>
                ) : null}
                <div>
                  <div className="fo-kicker mb-3">Tech</div>
                  <div className="flex flex-wrap gap-1.5">{projDetail.tags.map((t) => (<span key={t} className="fo-tag">{t}</span>))}</div>
                </div>

                {/* Direct link button with GitHub icon to project folder in domain GitHub repository */}
                <div className="pt-3 border-t border-[var(--fo-border)]">
                  <a
                    href={projDetail.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fo-btn !py-2.5 !px-4 !text-[13px] inline-flex items-center gap-2"
                  >
                    <Github size={16} /> View project code on GitHub <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
