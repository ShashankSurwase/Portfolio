"use client";
import { Sparkles, Award, Lock, ArrowUpRight, Cpu, Cloud, Database, Layers, CheckCircle2 } from "lucide-react";

interface CertItem {
  name: string;
  issuer: string;
  status: string;
  badgeStyle: {
    bg: string;
    border: string;
    text: string;
    dot: string;
  };
  category: string;
  summary: string;
  skills: string[];
  emoji: string;
}

const CERTS: CertItem[] = [
  {
    name: "AWS Certified Data Engineer – Associate",
    issuer: "Amazon Web Services",
    status: "Unlocking Soon 🔓",
    badgeStyle: {
      bg: "rgba(245, 158, 11, 0.12)",
      border: "rgba(245, 158, 11, 0.35)",
      text: "#f59e0b",
      dot: "#f59e0b",
    },
    category: "Cloud Data Engineering",
    summary: "Hands-on data ingestion, Redshift Serverless pipelines, Glue ETL & lake architecture.",
    skills: ["AWS Glue", "Redshift", "Athena", "Kinesis", "S3 Lake"],
    emoji: "☁️",
  },
  {
    name: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    status: "In Progress ⚡",
    badgeStyle: {
      bg: "rgba(239, 68, 68, 0.12)",
      border: "rgba(239, 68, 68, 0.35)",
      text: "#ef4444",
      dot: "#ef4444",
    },
    category: "Lakehouse & Spark",
    summary: "Delta Lake ingestion, PySpark transformations, Medallion Architecture, and production pipelines.",
    skills: ["PySpark", "Delta Lake", "Lakehouse", "Structured Streaming"],
    emoji: "⚡",
  },
  {
    name: "dbt Certified Developer",
    issuer: "dbt Labs",
    status: "Unlocking Soon 🔓",
    badgeStyle: {
      bg: "rgba(249, 115, 22, 0.12)",
      border: "rgba(249, 115, 22, 0.35)",
      text: "#f97316",
      dot: "#f97316",
    },
    category: "Modern Analytics Stack",
    summary: "Modular SQL transformations, Jinja templating, incremental models, semantic layer & data testing.",
    skills: ["dbt Core", "Data Modeling", "CI/CD Tests", "Semantic Layer"],
    emoji: "🛠️",
  },
  {
    name: "Snowflake SnowPro Core Certification",
    issuer: "Snowflake",
    status: "Targeting 2026 🎯",
    badgeStyle: {
      bg: "rgba(14, 165, 233, 0.12)",
      border: "rgba(14, 165, 233, 0.35)",
      text: "#0ea5e9",
      dot: "#0ea5e9",
    },
    category: "Cloud Data Warehousing",
    summary: "Multi-cluster warehouses, Snowpipe continuous loading, Time Travel, and zero-copy cloning.",
    skills: ["Snowflake", "Snowpipe", "Time Travel", "Zero-Copy"],
    emoji: "❄️",
  },
  {
    name: "Apache Airflow Certified Fundamentals",
    issuer: "Astronomer",
    status: "Production Proven · Target Cert 🚀",
    badgeStyle: {
      bg: "rgba(59, 130, 246, 0.12)",
      border: "rgba(59, 130, 246, 0.35)",
      text: "#3b82f6",
      dot: "#3b82f6",
    },
    category: "Workflow Orchestration",
    summary: "131+ production DAGs authored; dynamic task mapping, custom sensors & Docker operators.",
    skills: ["Airflow 2.x", "DAG Authoring", "Astronomer", "TaskFlow API"],
    emoji: "🌪️",
  },
  {
    name: "ClickHouse Architecture & Real-Time Analytics",
    issuer: "ClickHouse Academy",
    status: "In Production · Target Cert 🏎️",
    badgeStyle: {
      bg: "rgba(234, 179, 8, 0.12)",
      border: "rgba(234, 179, 8, 0.35)",
      text: "#eab308",
      dot: "#eab308",
    },
    category: "High-Performance OLAP",
    summary: "30+ production tables, MergeTree engines, sub-second analytical queries across 50M+ rows.",
    skills: ["ClickHouse", "MergeTree", "Real-Time OLAP", "Materialized Views"],
    emoji: "🏎️",
  },
  {
    name: "GenAI & LLM Data Engineering",
    issuer: "LangChain & Vector DBs",
    status: "Actively Exploring 🧠",
    badgeStyle: {
      bg: "rgba(168, 85, 247, 0.12)",
      border: "rgba(168, 85, 247, 0.35)",
      text: "#a855f7",
      dot: "#a855f7",
    },
    category: "AI & Emerging Tech",
    summary: "Vector embeddings, RAG pipelines with pgvector, document ingestion, and autonomous agent tools.",
    skills: ["pgvector", "LangChain", "RAG Pipelines", "Embeddings ETL"],
    emoji: "🤖",
  },
  {
    name: "Google Cloud Professional Data Engineer",
    issuer: "Google Cloud",
    status: "Targeting 🎯",
    badgeStyle: {
      bg: "rgba(66, 133, 244, 0.12)",
      border: "rgba(66, 133, 244, 0.35)",
      text: "#4285f4",
      dot: "#4285f4",
    },
    category: "Cloud Platform",
    summary: "BigQuery optimization, Cloud Storage data lakes, Pub/Sub event streaming, and Dataflow pipelines.",
    skills: ["BigQuery", "Pub/Sub", "Dataflow", "Cloud Storage"],
    emoji: "🌐",
  },
];

function CertCard({ c }: { c: CertItem }) {
  return (
    <div
      className="w-[310px] sm:w-[350px] flex-shrink-0 fo-card p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg select-none"
      style={{
        border: "1px solid var(--fo-border)",
        background: "var(--fo-card)",
      }}
    >
      <div>
        {/* Header row: category + emoji */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[11.5px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full"
            style={{
              background: "var(--fo-accent-soft)",
              color: "var(--fo-accent)",
            }}
          >
            {c.category}
          </span>
          <span className="text-xl" role="img" aria-hidden="true">
            {c.emoji}
          </span>
        </div>

        {/* Certification / Tech Name */}
        <h3 className="mt-3.5 text-[16px] sm:text-[17px] font-bold fo-ink leading-snug line-clamp-2 min-h-[46px]">
          {c.name}
        </h3>

        {/* STATUS BADGE - DIRECTLY BELOW THE NAME (Unlocking Soon / In Progress / Targeting) */}
        <div className="mt-2.5 flex items-center">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-semibold tracking-wide"
            style={{
              background: c.badgeStyle.bg,
              border: `1px solid ${c.badgeStyle.border}`,
              color: c.badgeStyle.text,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-ping"
              style={{ background: c.badgeStyle.dot }}
            />
            {c.status}
          </span>
        </div>

        {/* Issuer */}
        <p className="mt-2 text-[12.5px] fo-muted font-medium">
          Issuer / Domain: <span className="fo-ink font-semibold">{c.issuer}</span>
        </p>

        {/* Summary Description */}
        <p className="mt-2 text-[13.5px] leading-relaxed fo-muted">
          {c.summary}
        </p>
      </div>

      {/* Tech pills */}
      <div className="mt-4 pt-3 flex flex-wrap gap-1.5" style={{ borderTop: "1px solid var(--fo-border)" }}>
        {c.skills.map((skill) => (
          <span
            key={skill}
            className="text-[11.5px] px-2 py-0.5 rounded-md font-medium"
            style={{
              background: "var(--fo-bg-soft)",
              color: "var(--fo-body)",
              border: "1px solid var(--fo-border)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FolioCertifications() {
  return (
    <section id="certifications" className="py-16 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ background: "var(--fo-accent-soft)", color: "var(--fo-accent)" }}
        >
          <Sparkles size={13} /> Continuous Learning &amp; Tech Horizon
        </div>
        <h2 className="text-[32px] sm:text-[40px] font-bold">Certifications &amp; Emerging Tech</h2>
        <div className="fo-underline fo-underline-center" />
        <p className="mt-3.5 text-[15px] sm:text-[16px] fo-muted max-w-2xl mx-auto">
          Active technical horizons, emerging architectures, and target certifications I am actively mastering to engineer modern data platforms.
        </p>
      </div>

      {/* Rolling Right-to-Left Infinite Marquee */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right gradient fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-r from-[var(--fo-bg)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-[var(--fo-bg)] to-transparent" />

        {/* Marquee Track: Two identical sets loop seamlessly */}
        <div className="fo-marquee-track">
          {CERTS.map((c, i) => (
            <CertCard key={`cert-a-${i}`} c={c} />
          ))}
          {CERTS.map((c, i) => (
            <CertCard key={`cert-b-${i}`} c={c} />
          ))}
        </div>
      </div>

      {/* Interactive hover hint */}
      <div className="mt-5 text-center text-xs fo-muted flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[var(--fo-accent)] animate-pulse" />
        <span>Rolling right-to-left · Hover over any card to pause</span>
      </div>
    </section>
  );
}
