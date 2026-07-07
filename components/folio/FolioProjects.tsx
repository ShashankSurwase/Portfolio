"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, BookOpen, Sun, X, Users, Workflow, ArrowRight } from "lucide-react";
import { DOMAINS, DomainDetail } from "@/lib/domains";

const PROJECTS = [
  {
    title: "Multi-Marketplace Pipeline Platform",
    domain: "E-commerce",
    metric: "131 pipelines · 31 sources",
    impact: "Adding a new marketplace used to take 2–5 days of coding. Now it takes 2–4 hours with a spreadsheet update.",
    tags: ["Airflow", "Python", "ClickHouse"],
  },
  {
    title: "Revenue Recovery & Reconciliation",
    domain: "E-commerce",
    metric: "$1.05M recovered",
    impact: "Found the hidden bug that was losing marketplace revenue. Match rate went from 0% to 99.8%; $3.78M reconciled across 6 platforms.",
    tags: ["Python", "Pandas", "SQL"],
  },
  {
    title: "Solar Monitoring Platform",
    domain: "Energy",
    metric: "245 plants · −99% cloud cost",
    impact: "Rebuilt the ingestion that was about to fail at scale, and fixed KPIs that were 6–17× wrong — now accurate to ±2% of the international standard.",
    tags: ["AWS Lambda", "Redshift", "Grafana"],
  },
  {
    title: "Analytics Warehouse",
    domain: "E-commerce",
    metric: "₹5.79 Cr tracked · 27 reports",
    impact: "Built a warehouse from scratch that automated every recurring report a human used to prepare — 27 of them, every day.",
    tags: ["ClickHouse", "SQL", "Power BI"],
  },
  {
    title: "Student Analytics & Report Automation",
    domain: "EdTech",
    metric: "10–15 days → same-day",
    impact: "Test results that took two weeks now arrive the same day, at 99%+ accuracy, for 1,000+ students per test. Staff got 30–40 hours a week back.",
    tags: ["Python", "PostgreSQL", "Grafana"],
  },
  {
    title: "Personalised Question Paper Generator",
    domain: "EdTech",
    metric: "500+ papers per test cycle",
    impact: "Each student gets a question paper built for their weak areas — generated, branded and delivered automatically, with zero teacher time.",
    tags: ["Python", "ClickHouse", "PDF Automation"],
  },
  {
    title: "Real-Time Fault Alarm Engine",
    domain: "Energy",
    metric: "Detection in ≤10 minutes",
    impact: "Solar plant faults used to be found the next morning. Now they're flagged within 10 minutes — protecting ~₹2.8 lakh per incident.",
    tags: ["SQL", "AWS", "Alerting"],
  },
  {
    title: "Customer Segmentation & Forecasting",
    domain: "E-commerce",
    metric: "Top 20% = 70–80% of revenue",
    impact: "Segmentation that identified which customers matter most, plus demand forecasting that drives real purchase orders.",
    tags: ["scikit-learn", "R", "Python"],
  },
  {
    title: "Automated Billing & Reports",
    domain: "Energy",
    metric: "95+ hours/month saved",
    impact: "Daily generation reports and customer invoices that took a full morning each are now one click — with billing disputes eliminated.",
    tags: ["Python", "SQL", "PDF Automation"],
  },
];

// domain.id in lib/domains → the label used on project cards / filters
const DOMAIN_FILTER: Record<string, string> = {
  ecommerce: "E-commerce",
  edtech: "EdTech",
  energy: "Energy",
};
const ICONS: Record<string, typeof ShoppingCart> = {
  ecommerce: ShoppingCart,
  edtech: BookOpen,
  energy: Sun,
};

const FILTERS = ["All", "E-commerce", "EdTech", "Energy"] as const;

export default function FolioProjects() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [detail, setDetail] = useState<DomainDetail | null>(null);
  // The domain object matching the currently selected filter (null while on "All")
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
            Pick an industry to explore its projects — every one is running in
            production today, with real, measured outcomes.
          </p>
        </div>

        {/* Domain filter buttons (double as the way into each domain's full story) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {FILTERS.map((f) => {
            const count = f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.domain === f).length;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`fo-pill-tab ${active === f ? "is-active" : ""}`}
              >
                {f} <span className="opacity-70">· {count}</span>
              </button>
            );
          })}
        </div>

        {active === "All" ? (
          /* ── ALL view: only the three domain cards. Click one to see its projects ── */
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
                    <span className="fo-chip !text-[11px] !py-1 !px-2.5">
                      <Users size={11} /> {d.clients}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[19px] font-bold fo-ink">{d.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed fo-muted flex-1">{d.tagline}</p>
                  <div className="mt-5 flex items-center gap-2.5">
                    <button
                      onClick={() => setActive(label as (typeof FILTERS)[number])}
                      className="fo-btn !py-2.5 !px-4 !text-[13px]"
                    >
                      View {count} projects <ArrowRight size={14} />
                    </button>
                    <button
                      onClick={() => setDetail(d)}
                      className="fo-btn-light !py-2.5 !px-4 !text-[13px]"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── DOMAIN view: that domain's header + its projects ── */
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
                    <p className="text-[13px] fo-muted mt-0.5">{selectedDomain.clients} · {items.length} project{items.length > 1 ? "s" : ""}</p>
                  </div>
                  <button
                    onClick={() => setDetail(selectedDomain)}
                    className="fo-btn-light !py-2 !px-3.5 !text-[12.5px] flex-shrink-0"
                  >
                    <span className="hidden sm:inline">View full details</span>
                    <span className="sm:hidden">Details</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p, i) => (
                    <button
                      key={p.title}
                      onClick={() => setDetail(selectedDomain)}
                      className="fo-card fo-card-hover fo-fade-up p-6 flex flex-col text-left cursor-pointer"
                      style={{ animationDelay: `${i * 55}ms` }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[13px] font-bold" style={{ color: "var(--fo-accent)" }}>{p.metric}</span>
                        <span className="fo-tag !text-[10.5px]">{p.domain}</span>
                      </div>
                      <h3 className="mt-2.5 text-[16.5px] font-bold leading-snug fo-ink">{p.title}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed fo-muted flex-1">{p.impact}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span key={t} className="fo-tag">{t}</span>
                        ))}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            style={{ background: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(4px)" }}
            onClick={() => setDetail(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="folio w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
              style={{ background: "var(--fo-card)" }}
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 pb-4" style={{ background: "var(--fo-card)", borderBottom: "1px solid var(--fo-border)" }}>
                <div>
                  <div className="fo-chip !text-[11px] !py-1 !px-2.5 mb-2">
                    <Users size={11} /> {detail.clients}
                  </div>
                  <h3 className="text-[22px] sm:text-[26px] font-bold leading-tight fo-ink">{detail.name}</h3>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setDetail(null)}
                  className="fo-btn-light !p-2.5 !rounded-full flex-shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-6 sm:px-8 py-6 space-y-7">
                <p className="text-[15px] leading-relaxed">{detail.overview}</p>

                <div>
                  <div className="fo-kicker mb-3">Results</div>
                  <div className="flex flex-wrap gap-2">
                    {detail.metrics.map((m) => (
                      <span key={m} className="fo-chip">{m}</span>
                    ))}
                  </div>
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
                  <div className="flex items-center gap-2 fo-kicker mb-2">
                    <Workflow size={13} /> How the data flows
                  </div>
                  <p className="mono text-[12.5px] leading-relaxed fo-muted">{detail.dataFlow}</p>
                </div>

                <div className="pb-2">
                  <div className="fo-kicker mb-3">Tools used</div>
                  <div className="flex flex-wrap gap-1.5">
                    {detail.stack.map((t) => (
                      <span key={t} className="fo-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
