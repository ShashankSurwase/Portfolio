"use client";
import React from "react";
import {
  Code2,
  Database,
  Layers,
  BarChart3,
  Cpu,
  ShoppingBag,
  Users,
} from "lucide-react";

type Skill = { name: string; logo?: string; emoji?: string };

const LOGO_BASE = "/Portfolio/logos";

interface SkillGroup {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  items: Skill[];
}

const GROUP_PROGRAMMING: SkillGroup = {
  icon: Code2,
  title: "Programming & Automation",
  items: [
    { name: "Python", logo: "python" },
    { name: "SQL", logo: "database" },
    { name: "FastAPI", emoji: "🚀" },
    { name: "REST APIs", emoji: "🔌" },
    { name: "ETL Pipelines", emoji: "🔄" },
    { name: "Selenium", logo: "selenium" },
    { name: "Playwright", emoji: "🎭" },
    { name: "HTML / Jinja2", emoji: "📄" },
  ],
};

const GROUP_DATA_ENG: SkillGroup = {
  icon: Database,
  title: "Data Engineering & Cloud",
  items: [
    { name: "Apache Airflow", logo: "airflow" },
    { name: "Apache Kafka", logo: "kafka" },
    { name: "AWS", emoji: "☁️" },
    { name: "Amazon Redshift", emoji: "🟥" },
    { name: "AWS S3", emoji: "🪣" },
    { name: "AWS Lambda", emoji: "⚡" },
    { name: "AWS EventBridge", emoji: "⏰" },
    { name: "ClickHouse", emoji: "🏎️" },
    { name: "PostgreSQL", logo: "postgresql" },
    { name: "MongoDB", logo: "mongodb" },
    { name: "Data Warehousing", emoji: "🏢" },
    { name: "Database Migration", emoji: "🚚" },
  ],
};

const GROUP_ANALYTICS: SkillGroup = {
  icon: BarChart3,
  title: "Analytics & BI",
  items: [
    { name: "Power BI", emoji: "📊" },
    { name: "Tableau", emoji: "📈" },
    { name: "Apache Superset", emoji: "📉" },
    { name: "Grafana", logo: "grafana" },
    { name: "Metabase", emoji: "🧭" },
    { name: "Redash", emoji: "📋" },
    { name: "MIS in Reporting", emoji: "📑" },
    { name: "Google BigQuery", logo: "googlecloud" },
    { name: "Google Analytics 4", emoji: "📊" },
  ],
};

const GROUP_ARCHITECTURE: SkillGroup = {
  icon: Layers,
  title: "Data Architecture & Governance",
  items: [
    { name: "Star Schema", emoji: "⭐" },
    { name: "Fact & Dimension", emoji: "📐" },
    { name: "Data Modeling", emoji: "🏗️" },
    { name: "Role-Based Access Control (RBAC)", emoji: "🔐" },
    { name: "Data Governance", emoji: "🛡️" },
    { name: "Schema-Fingerprint Hashing", emoji: "🔒" },
    { name: "Data Monitoring & SLA", emoji: "📡" },
    { name: "Database Management", emoji: "🗃️" },
    { name: "Database Optimization", emoji: "⚡" },
    { name: "Incremental ETL", emoji: "⏳" },
    { name: "Data Validation & Reconciliation", emoji: "✅" },
  ],
};

const GROUP_MARKETPLACES: SkillGroup = {
  icon: ShoppingBag,
  title: "Marketplaces & Ingestion Portals",
  items: [
    { name: "Amazon SP-API", emoji: "🛒" },
    { name: "Amazon Vendor Central", emoji: "📦" },
    { name: "Amazon Ads API", emoji: "🎯" },
    { name: "Flipkart Seller API", emoji: "🛍️" },
    { name: "Myntra", emoji: "👗" },
    { name: "Ajio", emoji: "🏷️" },
    { name: "Shopify API", emoji: "🟢" },
    { name: "Unicommerce WMS", emoji: "📦" },
    { name: "Increff WMS", emoji: "🏭" },
    { name: "Clickpost Logistics", emoji: "🚚" },
    { name: "AppsFlyer Attribution", emoji: "📱" },
    { name: "Blinkit / Swiggy / Zepto", emoji: "⚡" },
    { name: "Canvas LMS API", emoji: "🎓" },
    { name: "Modbus Protocol (IoT)", emoji: "📟" },
    { name: "SFTP / IoT Gateways", emoji: "🌐" },
  ],
};

const GROUP_AI_TOOLS: SkillGroup = {
  icon: Cpu,
  title: "AI & Developer Tools",
  items: [
    { name: "Gemini CLI", emoji: "✨" },
    { name: "Claude Code", emoji: "🤖" },
    { name: "DeepSeek", emoji: "🧠" },
    { name: "Prompt Engineering", emoji: "💡" },
    { name: "Git", logo: "github" },
    { name: "Docker", logo: "docker" },
    { name: "Linux CLI", logo: "bash" },
  ],
};

const GROUP_WORKFLOW: SkillGroup = {
  icon: Users,
  title: "Workflow & Engineering Leadership",
  items: [
    { name: "Jira", emoji: "🎯" },
    { name: "Bitrix24", emoji: "📋" },
    { name: "Advanced Excel", emoji: "📑" },
    { name: "Agile / Scrum", emoji: "🔄" },
    { name: "Client Consulting", emoji: "🤝" },
    { name: "Technical Mentorship", emoji: "👥" },
    { name: "Engineering Leadership", emoji: "🚀" },
    { name: "Technical Documentation & KT", emoji: "📚" },
    { name: "Incident RCA", emoji: "🔍" },
  ],
};

function SkillTag({ s }: { s: Skill }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] sm:text-[13.5px] font-medium transition-all duration-200 hover:border-[var(--fo-accent)] hover:translate-y-[-1px] select-none"
      style={{
        background: "var(--fo-bg-soft)",
        border: "1px solid var(--fo-border)",
        color: "var(--fo-ink)",
      }}
    >
      {s.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${LOGO_BASE}/${s.logo}.svg`}
          alt=""
          width={16}
          height={16}
          style={{ width: 16, height: 16, objectFit: "contain" }}
        />
      ) : (
        <span aria-hidden="true" className="text-[14px] leading-none">
          {s.emoji}
        </span>
      )}
      <span>{s.name}</span>
    </span>
  );
}

function SkillCard({ g }: { g: SkillGroup }) {
  const Icon = g.icon;
  return (
    <div
      className="fo-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between h-full transition-all duration-300 hover:shadow-md"
      style={{
        background: "var(--fo-card)",
        border: "1px solid var(--fo-border)",
      }}
    >
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <span
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--fo-accent-soft)",
              color: "var(--fo-accent)",
            }}
          >
            <Icon size={18} />
          </span>
          <h3 className="text-[16px] font-bold fo-ink leading-tight">
            {g.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {g.items.map((s) => (
            <SkillTag key={s.name} s={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FolioSkills() {
  return (
    <section
      id="skills"
      className="py-16 sm:py-20"
      style={{
        background: "var(--fo-bg-soft)",
        borderTop: "1px solid var(--fo-border)",
        borderBottom: "1px solid var(--fo-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-[32px] sm:text-[40px] font-bold">Skills &amp; Capabilities</h2>
          <div className="fo-underline fo-underline-center" />
          <p className="mt-4 text-[15.5px] sm:text-[16px] fo-muted max-w-2xl mx-auto">
            Core technologies, data architectures, and platforms I use to design, build, and operate production data systems.
          </p>
        </div>

        {/* Row 1: Core Technical Foundations (3 balanced columns on desktop) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCard g={GROUP_PROGRAMMING} />
          <SkillCard g={GROUP_DATA_ENG} />
          <SkillCard g={GROUP_ANALYTICS} />
        </div>

        {/* Row 2: Deep Architecture & Marketplaces (2 wide columns — keeps large content balanced) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillCard g={GROUP_ARCHITECTURE} />
          <SkillCard g={GROUP_MARKETPLACES} />
        </div>

        {/* Row 3: Modern AI Tools & Engineering Leadership (2 balanced columns — eliminates empty space) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillCard g={GROUP_AI_TOOLS} />
          <SkillCard g={GROUP_WORKFLOW} />
        </div>
      </div>
    </section>
  );
}
