"use client";

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

export default function FolioProjects() {
  return (
    <section id="projects" className="py-16 sm:py-20" style={{ background: "var(--fo-bg-soft)", borderTop: "1px solid var(--fo-border)", borderBottom: "1px solid var(--fo-border)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-[30px] sm:text-[36px] font-bold">Projects</h2>
          <div className="fo-underline fo-underline-center" />
          <p className="mt-4 text-[14.5px] max-w-2xl mx-auto">
            Every project below is running in production today. The numbers are
            real, measured outcomes.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <div key={p.title} className="fo-card fo-card-hover p-6 flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12.5px] font-bold" style={{ color: "var(--fo-accent)" }}>{p.metric}</span>
                <span className="fo-tag !text-[10.5px]">{p.domain}</span>
              </div>
              <h3 className="mt-2.5 text-[16.5px] font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed fo-muted flex-1">{p.impact}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="fo-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
