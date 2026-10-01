"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  ShieldCheck,
  Layers,
  Repeat,
  Sparkles,
  KeyRound,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  Search,
  FileText,
  Users,
  Activity,
  Coffee,
  Wrench,
  DollarSign,
} from "lucide-react";

type TabKey = "models" | "patterns" | "rigor";

interface MentalModel {
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const MENTAL_MODELS: MentalModel[] = [
  {
    title: "Standards-First",
    tagline: "Benchmark before building",
    description:
      "Before writing SQL or pipeline logic, I establish the governing business standard (GAAP revenue rules, marketplace API specs, academic grading formulas). If none exists, I formalize one with stakeholders so every metric has a verifiable source of truth.",
    icon: ShieldCheck,
  },
  {
    title: "Enablement > Handoff",
    tagline: "Build tools business users can drive",
    description:
      "The best data platform is one business teams can operate without engineering intervention. I build Excel-driven ingestion configs, persona-specific dashboards, and self-serve metric layers so teams move fast without filing Jira tickets.",
    icon: Users,
  },
  {
    title: "Domain Before Stack",
    tagline: "Master the business physics first",
    description:
      "Ecommerce, EdTech, or Enterprise SaaS — I learn the domain's operational physics first (ASIN settlement logic, exam scoring schemes, inventory turnover) before choosing tools. Technology stacks are interchangeable; domain truth is not.",
    icon: Layers,
  },
  {
    title: "Reliability > Speed",
    tagline: "Speed comes from not fixing broken data",
    description:
      "Watermark + lookback windows, idempotent reprocessing, schema-fingerprint validation, and automated quality gates in CI/CD. True engineering velocity is built on never having to debug or re-run historical bad data twice.",
    icon: Repeat,
  },
  {
    title: "Systems That Outlive Me",
    tagline: "Documentation is part of the deliverable",
    description:
      "Standardized design patterns (modular ingestion, incremental upserts), exhaustive data dictionaries, and structured team onboarding. A data system that requires its original author to maintain is technical debt.",
    icon: Sparkles,
  },
];

interface TransferPattern {
  name: string;
  insight: string;
  examples: { domain: string; detail: string }[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const TRANSFER_PATTERNS: TransferPattern[] = [
  {
    name: "Identity Resolution",
    insight: "Every domain has a 'master key' problem. Solve entity identity once, reuse everywhere.",
    examples: [
      { domain: "Ecommerce", detail: "ASIN / FSN / SKU reconciliation across 12+ channel backends and inventory feeds." },
      { domain: "EdTech", detail: "Student sis_id mapping across separate LMS, batch enrollment, and exam portals." },
      { domain: "Enterprise", detail: "Account and entity mapping across CRM, ERP, and payment gateway webhooks." },
    ],
    icon: KeyRound,
  },
  {
    name: "Late-Arriving & Corrected Data",
    insight: "Watermark + lookback window + idempotent reprocessing = permanent pipeline stability.",
    examples: [
      { domain: "Ecommerce", detail: "Marketplace settlement and fee deduction files landing 7–14 days post-transaction." },
      { domain: "EdTech", detail: "Physical exam OMR sheets scanned and uploaded in batches days after test day." },
      { domain: "Enterprise", detail: "Bank reconciliation files and retroactively adjusted commission schedules." },
    ],
    icon: Clock,
  },
  {
    name: "Source of Truth Audit",
    insight: "Every business has a governing source of truth. Audit against it or drift silently.",
    examples: [
      { domain: "Ecommerce", detail: "Reconciliation against marketplace fee schedules, tax codes, and remittance records." },
      { domain: "EdTech", detail: "Algorithmic enforcement of multi-tier board exam marking and negative scoring rules." },
      { domain: "Enterprise", detail: "Financial ledger reconciliation matching transactional events against bank payouts." },
    ],
    icon: CheckCircle2,
  },
  {
    name: "Stakeholder Translation",
    insight: "Same underlying data, vastly different operational questions. Build parameterized layers, not fixed reports.",
    examples: [
      { domain: "Finance", detail: "Needs payout settlement reconciliation, tax breakdown, and gross-to-net margins." },
      { domain: "Growth & Ops", detail: "Needs real-time ad spend vs. GMV, dispatch throughput, and inventory runway." },
      { domain: "Leadership", detail: "Needs high-level unit economics, retention cohorts, and executive health KPIs." },
    ],
    icon: SlidersHorizontal,
  },
];

interface OperatingPrinciple {
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const OPERATING_PRINCIPLES: OperatingPrinciple[] = [
  {
    title: "I Go On-Site",
    tagline: "Real friction lives on the ground, not in Jira",
    description:
      "Retail headquarters, distribution centers, and campus control rooms. I sit beside inventory managers, audit physical scanning rooms, and watch team workflows firsthand. Operational bottlenecks reveal themselves in person.",
    icon: Search,
  },
  {
    title: "I Write to Think",
    tagline: "Architecture docs and data dictionaries before code",
    description:
      "Every pipeline starts with a written design doc. Every data warehouse table gets a documented data dictionary. Every unexpected edge case gets a blameless post-mortem. Writing exposes structural gaps before code is written.",
    icon: FileText,
  },
  {
    title: "Data Quality as a Product",
    tagline: "Automated schema-fingerprints and SLA alerts",
    description:
      "Schema-fingerprint hashing at ingestion. Automated match-rate monitoring (>0.5% deviation triggers instant alerts). Quality gates and integration tests baked into CI/CD prevent downstream dashboard errors.",
    icon: ShieldCheck,
  },
  {
    title: "I Teach What I Build",
    tagline: "Systems scale through people and documentation",
    description:
      "Designed a 1-month intern curriculum (Python, SQL, Airflow, ClickHouse, Grafana) that took newcomers to production readiness in 30 days. Created shadow projects and guided training so platforms run independently.",
    icon: Users,
  },
  {
    title: "Cost & Correctness Co-Optimized",
    tagline: "The cheapest pipeline is the one that never needs rework",
    description:
      "Cloud efficiency is an architectural discipline. Cut serverless compute invocations by -99% through smart batching and event scheduling. High engineering standards minimize expensive compute and eliminate rework.",
    icon: DollarSign,
  },
];

const BEYOND_WORK = [
  {
    icon: Activity,
    title: "Marathon Discipline",
    desc: "Long-distance running mirrors pipeline engineering: consistent pacing, early warning signals, and deliberate recovery.",
  },
  {
    icon: Coffee,
    title: "The 2-Minute Rule",
    desc: "If I cannot explain a metric or data model to a non-technical stakeholder in 2 minutes, I don't understand it well enough.",
  },
  {
    icon: Wrench,
    title: "Hardware & Home Lab",
    desc: "Building custom mechanical keyboards and home servers. Respecting physical hardware constraints sharpens software intuition.",
  },
];

export default function FolioAbout() {
  const [activeTab, setActiveTab] = useState<TabKey>("models");

  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="fo-kicker">Engineering Philosophy &amp; Approach</div>
          <h2 className="text-[32px] sm:text-[42px] font-bold mt-1">About Me</h2>
          <div className="fo-underline fo-underline-center" />
        </div>

        {/* Executive Manifesto Hook */}
        <div
          className="mt-10 p-6 sm:p-9 rounded-2xl relative overflow-hidden transition-all shadow-sm"
          style={{
            background: "var(--fo-card)",
            border: "1px solid var(--fo-border)",
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 sm:gap-6">
            <span
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "var(--fo-accent-soft)",
                color: "var(--fo-accent)",
              }}
            >
              <Quote size={26} className="rotate-180" />
            </span>
            <div className="space-y-2">
              <h3 className="text-[19px] sm:text-[23px] font-bold fo-ink leading-snug">
                &ldquo;My measure of success isn&apos;t &lsquo;does the pipeline run?&rsquo; —
                it&apos;s &lsquo;can the CFO defend this number in a board meeting?&rsquo;&rdquo;
              </h3>
              <p className="text-[15px] sm:text-[16px] fo-muted leading-relaxed">
                <strong className="fo-ink font-semibold">Core belief:</strong> Trustworthy data requires
                audit-grade pipelines, domain-deep business logic, and self-serve interfaces non-technical
                stakeholders can operate themselves.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab("models")}
            className="px-5 py-2.5 rounded-xl text-[14px] sm:text-[14.5px] font-semibold transition-all cursor-pointer flex items-center gap-2"
            style={{
              background: activeTab === "models" ? "var(--fo-accent)" : "var(--fo-card)",
              color: activeTab === "models" ? "#ffffff" : "var(--fo-muted)",
              border: `1px solid ${activeTab === "models" ? "var(--fo-accent)" : "var(--fo-border)"}`,
              boxShadow: activeTab === "models" ? "0 4px 12px rgba(67, 97, 238, 0.25)" : "none",
            }}
          >
            <ShieldCheck size={16} />
            <span>How I Think (Mental Models)</span>
          </button>

          <button
            onClick={() => setActiveTab("patterns")}
            className="px-5 py-2.5 rounded-xl text-[14px] sm:text-[14.5px] font-semibold transition-all cursor-pointer flex items-center gap-2"
            style={{
              background: activeTab === "patterns" ? "var(--fo-accent)" : "var(--fo-card)",
              color: activeTab === "patterns" ? "#ffffff" : "var(--fo-muted)",
              border: `1px solid ${activeTab === "patterns" ? "var(--fo-accent)" : "var(--fo-border)"}`,
              boxShadow: activeTab === "patterns" ? "0 4px 12px rgba(67, 97, 238, 0.25)" : "none",
            }}
          >
            <Repeat size={16} />
            <span>Patterns That Transfer</span>
          </button>

          <button
            onClick={() => setActiveTab("rigor")}
            className="px-5 py-2.5 rounded-xl text-[14px] sm:text-[14.5px] font-semibold transition-all cursor-pointer flex items-center gap-2"
            style={{
              background: activeTab === "rigor" ? "var(--fo-accent)" : "var(--fo-card)",
              color: activeTab === "rigor" ? "#ffffff" : "var(--fo-muted)",
              border: `1px solid ${activeTab === "rigor" ? "var(--fo-accent)" : "var(--fo-border)"}`,
              boxShadow: activeTab === "rigor" ? "0 4px 12px rgba(67, 97, 238, 0.25)" : "none",
            }}
          >
            <SlidersHorizontal size={16} />
            <span>How I Operate (Rigor)</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {/* Tab 1: Mental Models */}
            {activeTab === "models" && (
              <motion.div
                key="models"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {MENTAL_MODELS.map((m) => (
                  <div
                    key={m.title}
                    className="fo-card fo-card-hover p-6 rounded-2xl flex flex-col justify-between transition-all"
                    style={{
                      background: "var(--fo-card)",
                      border: "1px solid var(--fo-border)",
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "var(--fo-accent-soft)",
                            color: "var(--fo-accent)",
                          }}
                        >
                          <m.icon size={19} />
                        </span>
                        <div>
                          <h4 className="text-[16px] font-bold fo-ink leading-tight">{m.title}</h4>
                          <span className="text-[12px] font-medium" style={{ color: "var(--fo-accent)" }}>
                            {m.tagline}
                          </span>
                        </div>
                      </div>
                      <p className="text-[13.5px] fo-muted leading-relaxed mt-2">{m.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tab 2: Patterns That Transfer */}
            {activeTab === "patterns" && (
              <motion.div
                key="patterns"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {TRANSFER_PATTERNS.map((p) => (
                  <div
                    key={p.name}
                    className="fo-card fo-card-hover p-6 rounded-2xl flex flex-col justify-between transition-all"
                    style={{
                      background: "var(--fo-card)",
                      border: "1px solid var(--fo-border)",
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "var(--fo-accent-soft)",
                            color: "var(--fo-accent)",
                          }}
                        >
                          <p.icon size={19} />
                        </span>
                        <div>
                          <h4 className="text-[17px] font-bold fo-ink leading-tight">{p.name}</h4>
                          <span className="text-[11.5px] uppercase tracking-wider fo-muted font-semibold">
                            Universal Architecture Pattern
                          </span>
                        </div>
                      </div>

                      {/* Insight Callout */}
                      <div
                        className="p-3 rounded-xl text-[13px] font-medium my-3"
                        style={{
                          background: "var(--fo-bg-soft)",
                          borderLeft: "3px solid var(--fo-accent)",
                          color: "var(--fo-ink)",
                        }}
                      >
                        {p.insight}
                      </div>

                      {/* Domain Examples */}
                      <div className="space-y-2 mt-4 text-[13px]">
                        {p.examples.map((ex) => (
                          <div key={ex.domain} className="flex items-start gap-2">
                            <span
                              className="px-2 py-0.5 rounded text-[11px] font-bold flex-shrink-0"
                              style={{
                                background: "var(--fo-accent-soft)",
                                color: "var(--fo-accent)",
                              }}
                            >
                              {ex.domain}
                            </span>
                            <span className="fo-muted leading-snug">{ex.detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tab 3: Engineering Rigor */}
            {activeTab === "rigor" && (
              <motion.div
                key="rigor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {OPERATING_PRINCIPLES.map((r) => (
                  <div
                    key={r.title}
                    className="fo-card fo-card-hover p-6 rounded-2xl flex flex-col justify-between transition-all"
                    style={{
                      background: "var(--fo-card)",
                      border: "1px solid var(--fo-border)",
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "var(--fo-accent-soft)",
                            color: "var(--fo-accent)",
                          }}
                        >
                          <r.icon size={19} />
                        </span>
                        <div>
                          <h4 className="text-[16px] font-bold fo-ink leading-tight">{r.title}</h4>
                          <span className="text-[12px] font-medium" style={{ color: "var(--fo-accent)" }}>
                            {r.tagline}
                          </span>
                        </div>
                      </div>
                      <p className="text-[13.5px] fo-muted leading-relaxed mt-2">{r.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Beyond the Terminal - Lightweight Human Row */}
        <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--fo-border)" }}>
          <div className="text-center mb-6">
            <span className="text-[12px] font-bold uppercase tracking-widest fo-muted">
              Beyond the Terminal · Personal Discipline
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BEYOND_WORK.map((b) => (
              <div
                key={b.title}
                className="p-4 rounded-xl flex items-start gap-3.5 transition-all"
                style={{
                  background: "var(--fo-card)",
                  border: "1px solid var(--fo-border)",
                }}
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "var(--fo-bg-soft)",
                    border: "1px solid var(--fo-border)",
                    color: "var(--fo-accent)",
                  }}
                >
                  <b.icon size={17} />
                </span>
                <div className="min-w-0">
                  <h5 className="text-[14px] font-bold fo-ink">{b.title}</h5>
                  <p className="text-[12.5px] fo-muted leading-snug mt-1">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
