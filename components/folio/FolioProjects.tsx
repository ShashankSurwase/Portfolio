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
  { id: "ecom_multi_marketplace_airflow_etl", title: "Multi-Marketplace Airflow ETL Platform", domain: "E-commerce", impact: "A production orchestration layer ingesting 31 fragmented commerce source systems into one governed warehouse.", tags: ["Apache Airflow", "PostgreSQL", "Kafka"], repo: repoUrl("E-commerce", 1) },
  { id: "ecom_automated_mis_reporting", title: "Automated MIS & Daily Growth Reporting", domain: "E-commerce", impact: "Scheduled cross-channel sales reporting with same-day anomaly detection and data-quality gates.", tags: ["Airflow", "pandas", "SciPy"], repo: repoUrl("E-commerce", 2) },
  { id: "ecom_columnar_data_warehouse", title: "Columnar E-commerce Data Warehouse", domain: "E-commerce", impact: "A from-scratch columnar warehouse unifying five sales channels and powering the reporting layer.", tags: ["ClickHouse", "Python", "SQL"], repo: repoUrl("E-commerce", 3) },
  { id: "ecom_customer_intelligence_analytics", title: "Customer Intelligence & RFM Segmentation", domain: "E-commerce", impact: "RFM segmentation, cross-sell adjacency and demand forecasting on a unified customer warehouse.", tags: ["scikit-learn", "R", "Airflow"], repo: repoUrl("E-commerce", 4) },
  { id: "ecom_inventory_analytics_powerbi", title: "Inventory Analytics & Power BI Dashboard", domain: "E-commerce", impact: "Ageing, ABC classification and reorder prediction surfaced through a version-controlled dashboard.", tags: ["ClickHouse", "Power BI", "Python"], repo: repoUrl("E-commerce", 5) },
  { id: "ecom_revenue_integration_recovery", title: "Multi-Platform Revenue Integration & Recovery", domain: "E-commerce", impact: "A canonical revenue dataset across six marketplaces that recovered $1.05M lost to an encoding bug.", tags: ["Python", "pandas", "Jinja2"], repo: repoUrl("E-commerce", 6) },
  { id: "edtech_automated_omr_evaluation", title: "Automated OMR Evaluation System", domain: "EdTech", impact: "A cloud-triggered pipeline that auto-scores thousands of bubble-sheet tests against a model key.", tags: ["Python", "Mistral OCR", "Airflow"], repo: repoUrl("EdTech", 1) },
  { id: "edtech_automated_reporting_system", title: "Automated MIS & Report Generation", domain: "EdTech", impact: "Template-driven MIS, test and faculty reports delivered daily at 06:00 with real-time QA alerts.", tags: ["Python", "PostgreSQL", "Slack API"], repo: repoUrl("EdTech", 2) },
  { id: "edtech_multi_source_etl_platform", title: "Multi-Source Student Data ETL Platform", domain: "EdTech", impact: "A dual-database platform wiring seven disconnected institute source systems into one analytics layer.", tags: ["Airflow", "Selenium", "ClickHouse"], repo: repoUrl("EdTech", 3) },
  { id: "edtech_student_analytics_dashboards", title: "Student Analytics Dashboard Suite", domain: "EdTech", impact: "Six role-aware dashboards with a student-persona engine and chapter-level weakness prioritisation.", tags: ["Grafana", "ClickHouse", "SQL"], repo: repoUrl("EdTech", 4) },
  { id: "edtech_swot_question_paper_generator", title: "SWOT-Based Question Paper Generator", domain: "EdTech", impact: "Derives each student's SWOT profile from test history and generates a weak-topic-weighted practice paper.", tags: ["Python", "reportlab", "AWS S3"], repo: repoUrl("EdTech", 5) },
  { id: "energy_iot_ingestion_pipeline", title: "Solar IoT Data Ingestion Pipeline", domain: "Energy", impact: "Event-driven serverless ingestion of 5-minute telemetry from a 245-plant solar fleet into one schema.", tags: ["AWS Lambda", "Redshift", "EventBridge"], repo: repoUrl("Energy", 1) },
  { id: "energy_operations_automation", title: "Solar Operations Automation Suite", domain: "Energy", impact: "Daily generation reports, revenue invoicing and a real-time absence-based alarm engine on one data model.", tags: ["AWS Lambda", "Redshift", "SES"], repo: repoUrl("Energy", 2) },
  { id: "energy_role_based_dashboard_suite", title: "Role-Based EMS Dashboard Suite", domain: "Energy", impact: "A 13-surface EMS with query-level RBAC that scopes every SQL query to a role across a 245-plant fleet.", tags: ["Grafana", "FastAPI", "Redshift"], repo: repoUrl("Energy", 3) },
  { id: "energy_solar_kpi_engine_pr_audit", title: "IEC 61724 Solar KPI Engine & PR Audit", domain: "Energy", impact: "A root-cause audit that corrected a large Performance Ratio error and rebuilt a self-healing incremental ETL.", tags: ["AWS Lambda", "Redshift", "IEC 61724"], repo: repoUrl("Energy", 4) },
  { id: "energy_platform_overview", title: "Utility-Scale Solar EMS — Platform Overview", domain: "Energy", impact: "End-to-end cloud EMS for a 245-plant portfolio: IoT ingestion, IEC KPI engine, RBAC dashboards and ops automation.", tags: ["AWS", "Redshift", "Grafana"], repo: repoUrl("Energy", 5) },
];

const DOMAIN_FILTER: Record<string, string> = { ecommerce: "E-commerce", edtech: "EdTech", energy: "Energy" };
const ICONS: Record<string, typeof ShoppingCart> = { ecommerce: ShoppingCart, edtech: BookOpen, energy: Sun };
const FILTERS = ["All", "E-commerce", "EdTech", "Energy"] as const;

export default function FolioProjects() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [detail, setDetail] = useState<DomainDetail | null>(null);
  const selectedDomain = active === "All" ? null : DOMAINS.find((d) => DOMAIN_FILTER[d.id] === active) || null;

  useEffect(() => {
    document.body.style.overflow = detail ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [detail]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDetail(null);
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
            16 production projects across three industries. Pick an industry to
            explore its work — every number is a real, measured outcome.
          </p>
        </div>

        {/* Domain filter buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {FILTERS.map((f) => {
            const count = f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.domain === f).length;
            return (
              <button key={f} type="button" onClick={() => setActive(f)} className={`fo-pill-tab ${active === f ? "is-active" : ""}`}>
                {f} <span className="opacity-70">· {count}</span>
              </button>
            );
          })}
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
                      <button onClick={() => setDetail(selectedDomain)} className="fo-proj-btn group flex flex-col text-left cursor-pointer flex-1">
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
                          <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold fo-proj-cta" style={{ color: "var(--fo-accent)" }}>
                            View case study <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </button>
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-5 py-3 text-[13px] font-semibold fo-ink transition-colors"
                        style={{ borderTop: "1px solid var(--fo-border)", background: "var(--fo-bg-soft)" }}
                      >
                        <Github size={15} /> View code on GitHub <ArrowRight size={13} />
                      </a>
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
                    <Github size={15} /> Browse the code on GitHub <ArrowRight size={14} />
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
