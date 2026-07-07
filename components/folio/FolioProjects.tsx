"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, BookOpen, Sun, X, Users, Workflow, ArrowRight } from "lucide-react";
import { DOMAINS, DomainDetail } from "@/lib/domains";

const COVER = "/Portfolio/covers";

// 16 anonymised projects (sourced from the domain folders). `id` maps to its cover art.
type Project = { id: string; title: string; domain: "E-commerce" | "EdTech" | "Energy"; impact: string; tags: string[] };
const PROJECTS: Project[] = [
  { id: "ecom_multi_marketplace_airflow_etl", title: "Multi-Marketplace Airflow ETL Platform", domain: "E-commerce", impact: "A production orchestration layer ingesting 31 fragmented commerce source systems into one governed warehouse.", tags: ["Apache Airflow", "PostgreSQL", "Kafka"] },
  { id: "ecom_automated_mis_reporting", title: "Automated MIS & Daily Growth Reporting", domain: "E-commerce", impact: "Scheduled cross-channel sales reporting with same-day anomaly detection and data-quality gates.", tags: ["Airflow", "pandas", "SciPy"] },
  { id: "ecom_columnar_data_warehouse", title: "Columnar E-commerce Data Warehouse", domain: "E-commerce", impact: "A from-scratch columnar warehouse unifying five sales channels and powering the reporting layer.", tags: ["ClickHouse", "Python", "SQL"] },
  { id: "ecom_customer_intelligence_analytics", title: "Customer Intelligence & RFM Segmentation", domain: "E-commerce", impact: "RFM segmentation, cross-sell adjacency and demand forecasting on a unified customer warehouse.", tags: ["scikit-learn", "R", "Airflow"] },
  { id: "ecom_inventory_analytics_powerbi", title: "Inventory Analytics & Power BI Dashboard", domain: "E-commerce", impact: "Ageing, ABC classification and reorder prediction surfaced through a version-controlled dashboard.", tags: ["ClickHouse", "Power BI", "Python"] },
  { id: "ecom_revenue_integration_recovery", title: "Multi-Platform Revenue Integration & Recovery", domain: "E-commerce", impact: "A canonical revenue dataset across six marketplaces that recovered $1.05M lost to an encoding bug.", tags: ["Python", "pandas", "Jinja2"] },
  { id: "edtech_automated_omr_evaluation", title: "Automated OMR Evaluation System", domain: "EdTech", impact: "A cloud-triggered pipeline that auto-scores thousands of bubble-sheet tests against a model key.", tags: ["Python", "Mistral OCR", "Airflow"] },
  { id: "edtech_automated_reporting_system", title: "Automated MIS & Report Generation", domain: "EdTech", impact: "Template-driven MIS, test and faculty reports delivered daily at 06:00 with real-time QA alerts.", tags: ["Python", "PostgreSQL", "Slack API"] },
  { id: "edtech_multi_source_etl_platform", title: "Multi-Source Student Data ETL Platform", domain: "EdTech", impact: "A dual-database platform wiring seven disconnected institute source systems into one analytics layer.", tags: ["Airflow", "Selenium", "ClickHouse"] },
  { id: "edtech_student_analytics_dashboards", title: "Student Analytics Dashboard Suite", domain: "EdTech", impact: "Six role-aware dashboards with a student-persona engine and chapter-level weakness prioritisation.", tags: ["Grafana", "ClickHouse", "SQL"] },
  { id: "edtech_swot_question_paper_generator", title: "SWOT-Based Question Paper Generator", domain: "EdTech", impact: "Derives each student's SWOT profile from test history and generates a weak-topic-weighted practice paper.", tags: ["Python", "reportlab", "AWS S3"] },
  { id: "energy_iot_ingestion_pipeline", title: "Solar IoT Data Ingestion Pipeline", domain: "Energy", impact: "Event-driven serverless ingestion of 5-minute telemetry from a 245-plant solar fleet into one schema.", tags: ["AWS Lambda", "Redshift", "EventBridge"] },
  { id: "energy_operations_automation", title: "Solar Operations Automation Suite", domain: "Energy", impact: "Daily generation reports, revenue invoicing and a real-time absence-based alarm engine on one data model.", tags: ["AWS Lambda", "Redshift", "SES"] },
  { id: "energy_role_based_dashboard_suite", title: "Role-Based EMS Dashboard Suite", domain: "Energy", impact: "A 13-surface EMS with query-level RBAC that scopes every SQL query to a role across a 245-plant fleet.", tags: ["Grafana", "FastAPI", "Redshift"] },
  { id: "energy_solar_kpi_engine_pr_audit", title: "IEC 61724 Solar KPI Engine & PR Audit", domain: "Energy", impact: "A root-cause audit that corrected a large Performance Ratio error and rebuilt a self-healing incremental ETL.", tags: ["AWS Lambda", "Redshift", "IEC 61724"] },
  { id: "energy_platform_overview", title: "Utility-Scale Solar EMS — Platform Overview", domain: "Energy", impact: "End-to-end cloud EMS for a 245-plant portfolio: IoT ingestion, IEC KPI engine, RBAC dashboards and ops automation.", tags: ["AWS", "Redshift", "Grafana"] },
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
                  <button onClick={() => setDetail(selectedDomain)} className="fo-btn-light !py-2 !px-3.5 !text-[12.5px] flex-shrink-0">
                    <span className="hidden sm:inline">View full details</span><span className="sm:hidden">Details</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setDetail(selectedDomain)}
                      className="fo-card fo-card-hover fo-fade-up flex flex-col text-left cursor-pointer overflow-hidden"
                      style={{ animationDelay: `${i * 45}ms` }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${COVER}/${p.id}.svg`} alt={p.title} width={640} height={360} className="w-full" style={{ aspectRatio: "16 / 9", objectFit: "cover" }} />
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-[16px] font-bold leading-snug fo-ink">{p.title}</h3>
                        <p className="mt-2 text-[13.5px] leading-relaxed fo-muted flex-1">{p.impact}</p>
                        <div className="mt-3.5 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (<span key={t} className="fo-tag !text-[11px]">{t}</span>))}
                        </div>
                      </div>
                    </button>
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
                <div className="pb-2">
                  <div className="fo-kicker mb-3">Tools used</div>
                  <div className="flex flex-wrap gap-1.5">{detail.stack.map((t) => (<span key={t} className="fo-tag">{t}</span>))}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
