"use client";
import { Code2, Workflow, Database, Cloud, BarChart3 } from "lucide-react";

type Level = "proficient" | "intermediate" | "exploring" | "familiar";
// `logo` = filename in /public/logos (real brand SVG); `emoji` = fallback when no logo exists.
type Skill = { name: string; level: Level; logo?: string; emoji?: string };

const LOGO_BASE = "/Portfolio/logos";

const GROUPS: { icon: typeof Code2; title: string; items: Skill[] }[] = [
  {
    icon: Code2,
    title: "Languages & Libraries",
    items: [
      { name: "Python", level: "proficient", logo: "python" },
      { name: "SQL", level: "proficient", emoji: "🗄️" },
      { name: "pandas", level: "proficient", logo: "pandas" },
      { name: "SQLAlchemy", level: "proficient", logo: "sqlalchemy" },
      { name: "R", level: "intermediate", logo: "r" },
      { name: "Bash / Shell", level: "intermediate", logo: "bash" },
      { name: "Jinja2", level: "familiar", emoji: "📝" },
    ],
  },
  {
    icon: Workflow,
    title: "Orchestration & ETL",
    items: [
      { name: "Apache Airflow", level: "proficient", logo: "airflow" },
      { name: "Custom Python ETL", level: "proficient", emoji: "🔧" },
      { name: "AWS Lambda", level: "proficient", emoji: "⚡" },
      { name: "pangres upserts", level: "proficient", emoji: "⬆️" },
      { name: "AWS EventBridge", level: "intermediate", emoji: "⏰" },
      { name: "Apache Kafka", level: "intermediate", logo: "kafka" },
      { name: "Selenium", level: "intermediate", logo: "selenium" },
    ],
  },
  {
    icon: Database,
    title: "Databases & Warehouses",
    items: [
      { name: "PostgreSQL", level: "proficient", logo: "postgresql" },
      { name: "ClickHouse", level: "proficient", emoji: "🏎️" },
      { name: "Amazon Redshift", level: "proficient", emoji: "🟥" },
      { name: "S3 Data Lake", level: "proficient", emoji: "🪣" },
      { name: "Google BigQuery", level: "intermediate", logo: "googlecloud" },
      { name: "MongoDB", level: "familiar", logo: "mongodb" },
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    items: [
      { name: "Redshift Data API", level: "proficient", emoji: "🔌" },
      { name: "AWS S3", level: "proficient", emoji: "🪣" },
      { name: "CloudWatch", level: "intermediate", emoji: "👁️" },
      { name: "IAM", level: "intermediate", emoji: "🔐" },
      { name: "Docker", level: "intermediate", logo: "docker" },
      { name: "Kubernetes / EKS", level: "familiar", logo: "kubernetes" },
      { name: "GCP (BigQuery, Functions)", level: "familiar", logo: "googlecloud" },
    ],
  },
  {
    icon: BarChart3,
    title: "BI, Dashboards & Analytics",
    items: [
      { name: "Grafana", level: "proficient", logo: "grafana" },
      { name: "Power BI", level: "proficient", emoji: "📊" },
      { name: "RFM Segmentation", level: "proficient", emoji: "🎯" },
      { name: "Apache Superset", level: "intermediate", emoji: "📉" },
      { name: "scikit-learn", level: "intermediate", logo: "scikitlearn" },
      { name: "Demand Forecasting", level: "intermediate", emoji: "🔮" },
      { name: "Metabase", level: "familiar", emoji: "📋" },
      { name: "Mistral AI OCR", level: "familiar", emoji: "🔤" },
    ],
  },
];

const LEGEND: { level: Level; label: string }[] = [
  { level: "proficient", label: "Proficient" },
  { level: "intermediate", label: "Intermediate" },
  { level: "familiar", label: "Familiar" },
  { level: "exploring", label: "Exploring" },
];

function SkillTag({ s }: { s: Skill }) {
  return (
    <span className="fo-lvl" data-level={s.level}>
      {s.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`${LOGO_BASE}/${s.logo}.svg`} alt="" width={17} height={17} style={{ width: 17, height: 17, objectFit: "contain" }} />
      ) : (
        <span aria-hidden="true">{s.emoji}</span>
      )}
      {s.name}
    </span>
  );
}

export default function FolioSkills() {
  return (
    <section id="skills" className="py-16 sm:py-20" style={{ background: "var(--fo-bg-soft)", borderTop: "1px solid var(--fo-border)", borderBottom: "1px solid var(--fo-border)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-[32px] sm:text-[40px] font-bold">Skills</h2>
          <div className="fo-underline fo-underline-center" />
          <p className="mt-4 text-[16px] fo-muted max-w-2xl mx-auto">
            Colour-coded by how deeply I work with each — tools I run in production every day down to ones I&apos;m still exploring.
          </p>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LEGEND.map((l) => (
            <span key={l.level} className="inline-flex items-center gap-2 text-[13.5px] fo-muted">
              <span className={`fo-legend-dot ${l.level}`} />
              {l.label}
            </span>
          ))}
        </div>

        {/* Category cards */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GROUPS.map((g) => (
            <div key={g.title} className="fo-card p-6">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--fo-accent-soft)", color: "var(--fo-accent)" }}>
                  <g.icon size={20} />
                </span>
                <h3 className="text-[17.5px] font-bold fo-ink">{g.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <SkillTag key={s.name} s={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
