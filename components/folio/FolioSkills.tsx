"use client";
import { Code2, Workflow, Database, Cloud, BarChart3, Sparkles } from "lucide-react";

type Level = "proficient" | "intermediate" | "exploring" | "familiar";
// `logo` = filename in /public/logos (real brand SVG); `emoji` = fallback when no logo exists.
type Skill = { name: string; level: Level; logo?: string; emoji?: string };

const LOGO_BASE = "/Portfolio/logos";

const GROUPS: { icon: typeof Code2; title: string; items: Skill[] }[] = [
  {
    icon: Sparkles,
    title: "Currently Learning",
    items: [
      { name: "Networking Fundamentals", level: "exploring", emoji: "🌐" },
      { name: "Server Hosting & Deployment", level: "exploring", emoji: "🖥️" },
      { name: "Proxy & Tunneling", level: "exploring", emoji: "🔀" },
      { name: "AI Prompt Engineering", level: "exploring", emoji: "🧠" },
      { name: "AI-Assisted Web Dev", level: "exploring", emoji: "🤖" },
    ],
  },
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
    ],
  },
  {
    icon: Workflow,
    title: "Orchestration & ETL",
    items: [
      { name: "Apache Airflow", level: "proficient", logo: "airflow" },
      { name: "Custom Python ETL", level: "proficient", emoji: "🔧" },
      { name: "AWS Lambda", level: "proficient", emoji: "⚡" },
      { name: "AWS EventBridge", level: "intermediate", emoji: "⏰" },
      { name: "Selenium", level: "intermediate", logo: "selenium" },
      { name: "Playwright", level: "intermediate", emoji: "🎭" },
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
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    items: [
      { name: "AWS S3", level: "proficient", emoji: "🪣" },
      { name: "Redshift Data API", level: "proficient", emoji: "🔌" },
      { name: "Docker", level: "intermediate", logo: "docker" },
      { name: "CloudWatch", level: "intermediate", emoji: "👁️" },
      { name: "IAM", level: "intermediate", emoji: "🔐" },
    ],
  },
  {
    icon: BarChart3,
    title: "BI, Dashboards & Analytics",
    items: [
      { name: "Grafana", level: "proficient", logo: "grafana" },
      { name: "Power BI", level: "proficient", emoji: "📊" },
      { name: "Apache Superset", level: "intermediate", emoji: "📉" },
      { name: "Redash", level: "intermediate", emoji: "📈" },
      { name: "Google Analytics", level: "intermediate", emoji: "📶" },
    ],
  },
];

// Shown as compact one-line strips below the grid, not as tag cards.
const WORKFLOW = ["Git", "Jira", "Bitrix24", "Excel"];
const STRENGTHS = ["Leadership", "Stakeholder Communication", "Problem-Solving", "Strategic Planning", "Adaptability"];

const LEGEND: { level: Level; label: string }[] = [
  { level: "proficient", label: "Proficient" },
  { level: "intermediate", label: "Intermediate" },
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
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {GROUPS.map((g) => (
            <div key={g.title} className="fo-card p-5">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--fo-accent-soft)", color: "var(--fo-accent)" }}>
                  <g.icon size={18} />
                </span>
                <h3 className="text-[15.5px] font-bold fo-ink leading-tight">{g.title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <SkillTag key={s.name} s={s} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Compact strips — kept out of the tag grid to reduce noise */}
        <div className="mt-8 space-y-2.5 text-center">
          <p className="text-[14.5px] fo-muted">
            <span className="font-semibold fo-ink">Workflow &amp; Tools:</span> {WORKFLOW.join(" · ")}
          </p>
          <p className="text-[14.5px] fo-muted">
            <span className="font-semibold fo-ink">Strengths:</span> {STRENGTHS.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
