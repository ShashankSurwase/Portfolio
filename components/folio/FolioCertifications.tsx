"use client";
import React from "react";
import { Sparkles } from "lucide-react";

interface CourseItem {
  name: string;
  issuer: string;
  category: string;
  keyPoints: string[];
  skills: string[];
  iconSvg: React.ReactNode;
}

function AwsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path
        d="M6.5 15.5c3.2 2.2 7.8 2.2 11 0"
        stroke="#FF9900"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17.5 15.5l-1.2-1.8M17.5 15.5l-2.1.4"
        stroke="#FF9900"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.2 11.2c-.4-.7-.8-1.9-.8-2.7 0-1.8 1.1-2.9 2.7-2.9 1.4 0 2.4.9 2.7 2.1l-1.2.4c-.2-.7-.7-1.2-1.5-1.2-.9 0-1.5.7-1.5 1.7 0 .5.2 1.3.5 1.8l-1.4.8zm6.3-5.4h1.4l1.6 6h-1.3l-.3-1.4h-1.6l-.3 1.4h-1.2l1.7-6zm1.1 3.5l-.6-2.5-.6 2.5h1.2z"
        fill="#FF9900"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path
        fill="#4285F4"
        d="M23.7 12.3c0-.8-.1-1.5-.2-2.2H12v4.5h6.6c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.6-5.2 3.6-9.1z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3.1c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.8-2.1-6.7-4.9H1.3v3.1C3.3 21.4 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 14.3c-.3-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.3C.5 8.2 0 10 0 12s.5 3.8 1.3 5.4l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.4 0 3.3 2.6 1.3 6.6l4 3.1c.9-2.8 3.6-4.9 6.7-4.9z"
      />
    </svg>
  );
}

function DbtIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path
        fill="#FF694B"
        d="M12 1.5L2.5 7v10L12 22.5l9.5-5.5V7L12 1.5zm0 3.1l6.7 3.9v7.8L12 20.2l-6.7-3.9V8.5L12 4.6zm-1.8 3.8v3.2l2.8 1.6v3.2l-5.6-3.2v-3.2l2.8-1.6zm3.6 0l2.8 1.6v3.2l-2.8-1.6V8.4z"
      />
    </svg>
  );
}

function LinuxIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <rect x="2" y="3" width="20" height="18" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
      <path d="M6 8l4 4-4 4" stroke="#e4e4e7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 16h6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LlmIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <circle cx="12" cy="12" r="9" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" strokeWidth="1.6" />
      <path
        d="M8 12h8M12 8v8M9 9l6 6M15 9l-6 6"
        stroke="#10b981"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2.5" fill="#10b981" />
    </svg>
  );
}

function AgentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <circle cx="12" cy="12" r="9" fill="rgba(168, 85, 247, 0.12)" stroke="#a855f7" strokeWidth="1.6" />
      <rect x="7" y="8" width="10" height="8" rx="2" stroke="#a855f7" strokeWidth="1.6" />
      <circle cx="10" cy="12" r="1" fill="#a855f7" />
      <circle cx="14" cy="12" r="1" fill="#a855f7" />
      <path d="M12 5v3M9 19l1-3M15 19l-1-3" stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const COURSES: CourseItem[] = [
  {
    name: "AWS Data Engineering Training (Digital)",
    issuer: "Amazon Web Services",
    category: "Cloud Data Engineering",
    iconSvg: <AwsIcon />,
    keyPoints: [
      "Serverless ETL pipelines with AWS Glue & automated Glue Data Catalog.",
      "Warehouse design & high-speed columnar analytics on Amazon Redshift Serverless.",
      "Real-time event streaming architectures with Amazon Kinesis & Lambda.",
      "S3 Lakehouse governance, partition pruning & Lake Formation policies.",
    ],
    skills: ["AWS Glue", "Redshift Serverless", "Kinesis", "S3 Lakehouse", "IAM"],
  },
  {
    name: "Google Data Analytics Certificate (Audit)",
    issuer: "Google / Coursera",
    category: "Analytics & BI",
    iconSvg: <GoogleIcon />,
    keyPoints: [
      "Structured analysis lifecycle: Ask, Prepare, Process, Analyze, Share, and Act.",
      "Complex SQL transformations, data hygiene & integrity in Google BigQuery.",
      "Executive visual storytelling & dashboard architecture with Tableau.",
      "Reproducible statistical programming in R for automated data preparation.",
    ],
    skills: ["Google BigQuery", "SQL Cleaning", "Tableau", "R Programming", "EDA"],
  },
  {
    name: "dbt Fundamentals",
    issuer: "dbt Labs",
    category: "Analytics Engineering",
    iconSvg: <DbtIcon />,
    keyPoints: [
      "Modular SQL transformations & DAG-based analytical dependency modeling.",
      "Jinja templating, custom macro libraries & incremental table loads.",
      "Automated schema tests, generic assertions & freshness SLAs.",
      "Auto-generated interactive lineage graphs & comprehensive documentation.",
    ],
    skills: ["dbt Core", "Jinja Macros", "Data Modeling", "Schema Testing", "Lineage DAGs"],
  },
  {
    name: "Introduction to Linux (LFS101x)",
    issuer: "The Linux Foundation",
    category: "Systems & Automation",
    iconSvg: <LinuxIcon />,
    keyPoints: [
      "Core Linux OS architecture, file system hierarchy & terminal administration.",
      "Bash scripting automation, stream editing (grep, awk, sed) & I/O pipelines.",
      "Process control, systemd daemon management, cron scheduling & permissions.",
      "Network socket diagnostics, SSH tunneling & remote server troubleshooting.",
    ],
    skills: ["Linux CLI", "Bash Automation", "Cron Jobs", "systemd", "SSH Tunneling"],
  },
  {
    name: "LLM Zoomcamp (DataTalks.Club)",
    issuer: "DataTalks.Club",
    category: "AI & RAG Engineering",
    iconSvg: <LlmIcon />,
    keyPoints: [
      "End-to-end Retrieval-Augmented Generation (RAG) system engineering.",
      "Dense vector embeddings, indexing & hybrid search with vector databases.",
      "LLM evaluation frameworks (RAGAS, hit rate, and MRR metrics).",
      "Containerized microservice deployment with Docker & vector retrieval monitoring.",
    ],
    skills: ["RAG Systems", "Vector DBs", "pgvector", "Embeddings ETL", "Docker"],
  },
  {
    name: "AI Agents Course",
    issuer: "Hugging Face / DeepLearning.AI",
    category: "Autonomous AI Systems",
    iconSvg: <AgentIcon />,
    keyPoints: [
      "ReAct (Reason + Act) loops & multi-step autonomous planning workflows.",
      "Tool-calling integration & schema-enforced structured LLM outputs.",
      "Multi-agent orchestration architectures (LangGraph / CrewAI) for automation.",
      "Agent memory systems: short-term context buffers & vector episodic memory.",
    ],
    skills: ["AI Agents", "LangGraph", "Tool Calling", "ReAct Loops", "Agent Memory"],
  },
];

function CourseCard({ c }: { c: CourseItem }) {
  return (
    <div
      className="w-[340px] sm:w-[380px] flex-shrink-0 fo-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg select-none"
      style={{
        border: "1px solid var(--fo-border)",
        background: "var(--fo-card)",
      }}
    >
      <div>
        {/* Top Header Row: Brand Logo + Issuer on Left, Blue Coming Soon Tag on Right */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "var(--fo-bg-soft)",
                border: "1px solid var(--fo-border)",
              }}
            >
              {c.iconSvg}
            </div>
            <div className="min-w-0">
              <p className="text-[12px] fo-muted font-medium truncate">{c.issuer}</p>
              <span className="inline-block text-[11px] font-semibold text-[var(--fo-accent)] uppercase tracking-wider">
                {c.category}
              </span>
            </div>
          </div>

          {/* BLUE COMING SOON TAG — LOCATED ABOVE THE NAME */}
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide flex-shrink-0"
            style={{
              background: "rgba(59, 130, 246, 0.12)",
              border: "1px solid rgba(59, 130, 246, 0.35)",
              color: "#3b82f6",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Coming Soon 🔓
          </span>
        </div>

        {/* Course / Certification Name */}
        <h3 className="mt-4 text-[16px] sm:text-[17px] font-bold fo-ink leading-snug min-h-[46px]">
          {c.name}
        </h3>

        {/* Impactful Key Curriculum Points */}
        <div className="mt-3 space-y-1.5 text-[12.5px] sm:text-[13px] leading-relaxed">
          {c.keyPoints.map((pt, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-blue-500 font-bold select-none text-[12px] mt-0.5">•</span>
              <span className="fo-muted">{pt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Tech Pills */}
      <div
        className="mt-4 pt-3 flex flex-wrap gap-1.5"
        style={{ borderTop: "1px solid var(--fo-border)" }}
      >
        {c.skills.map((s) => (
          <span
            key={s}
            className="text-[11px] font-medium px-2 py-0.5 rounded-md"
            style={{
              background: "var(--fo-bg-soft)",
              color: "var(--fo-body)",
              border: "1px solid var(--fo-border)",
            }}
          >
            {s}
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
          <Sparkles size={13} /> Continuous Upskilling &amp; Active Learning
        </div>
        <h2 className="text-[32px] sm:text-[40px] font-bold">
          Learning New Things &amp; Certifications Coming Soon
        </h2>
        <div className="fo-underline fo-underline-center" />
        <p className="mt-3.5 text-[15px] sm:text-[16px] fo-muted max-w-2xl mx-auto">
          Technical programs, official curriculums, and certifications I am actively taking and unlocking soon to engineer production data systems.
        </p>
      </div>

      {/* Rolling Right-to-Left Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right gradient fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-r from-[var(--fo-bg)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-[var(--fo-bg)] to-transparent" />

        {/* Double-loop track ensures seamless infinite right-to-left scroll */}
        <div className="fo-marquee-track">
          {COURSES.map((c, i) => (
            <CourseCard key={`course-a-${i}`} c={c} />
          ))}
          {COURSES.map((c, i) => (
            <CourseCard key={`course-b-${i}`} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
