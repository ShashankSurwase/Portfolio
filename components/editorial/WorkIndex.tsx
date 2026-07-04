"use client";
import { motion } from "framer-motion";

type Project = {
  year: string;
  domain: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
};

const PROJECTS: Project[] = [
  {
    year: "2025",
    domain: "Renewable Energy",
    title: "Solar IoT ingestion & IEC 61724 KPI engine",
    summary: "End-to-end IoT pipeline for 245 plants; PR audit corrected a 6–17× error across 13 dashboards.",
    metric: "−99%",
    metricLabel: "Lambda invocations",
  },
  {
    year: "2024",
    domain: "Renewable Energy",
    title: "Solar dashboard platform & DGR automation",
    summary: "4-family / 13-surface Grafana platform with RBAC, automated DGR, real-time alarm engine.",
    metric: "80+",
    metricLabel: "hours/month reclaimed",
  },
  {
    year: "2024",
    domain: "E-commerce",
    title: "Revenue recovery & ASIN reconciliation",
    summary: "Five-step reconciliation framework recovering $1.05M unmapped vendor revenue.",
    metric: "$1.05M",
    metricLabel: "revenue recovered",
  },
  {
    year: "2023",
    domain: "E-commerce",
    title: "ClickHouse OLAP warehouse — K-beauty",
    summary: "Greenfield warehouse with 5 sources, 3 write patterns, 27 production reports.",
    metric: "₹5.79 Cr",
    metricLabel: "revenue tracked",
  },
  {
    year: "2023",
    domain: "E-commerce",
    title: "Multi-source Airflow ETL platform",
    summary: "131-DAG orchestration unifying 31 marketplace sources with schema-fingerprint validation.",
    metric: "131",
    metricLabel: "production DAGs",
  },
  {
    year: "2022",
    domain: "EdTech",
    title: "Student analytics & persona engine",
    summary: "Six-dashboard Grafana suite, automated OMR evaluation, SWOT-based question paper generator.",
    metric: "70+",
    metricLabel: "ETL pipelines",
  },
];

export default function WorkIndex() {
  return (
    <section id="work" className="px-6 lg:px-12 py-24 sm:py-32 border-t" style={{ borderColor: "var(--ed-rule-soft)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-baseline gap-6 mb-12">
          <span className="label" style={{ color: "var(--ed-accent)" }}>
            03 · The Index
          </span>
          <hr className="rule flex-1" />
        </div>

        <h2
          className="serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-tight max-w-3xl"
          style={{ color: "var(--ed-fg)", fontWeight: 400, fontVariationSettings: '"opsz" 96' }}
        >
          The full ledger of things I&apos;ve shipped.
        </h2>
        <p className="lede mt-5 max-w-2xl">
          A complete index, most-recent first. Each entry is a production
          system — not a side project — and each carries a single number that
          mattered to the business.
        </p>

        <ol className="mt-14">
          {PROJECTS.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="grid grid-cols-12 gap-4 sm:gap-8 py-7 border-t group cursor-default"
              style={{ borderColor: "var(--ed-rule-soft)" }}
            >
              <div className="col-span-3 sm:col-span-2">
                <div
                  className="serif text-[18px] sm:text-[22px] tabular-nums"
                  style={{ color: "var(--ed-fg-muted)", fontVariationSettings: '"opsz" 36' }}
                >
                  {p.year}
                </div>
                <div className="label mt-1 hidden sm:block" style={{ color: "var(--ed-fg-faint)" }}>
                  {p.domain}
                </div>
              </div>

              <div className="col-span-9 sm:col-span-7">
                <h3
                  className="serif text-[20px] sm:text-[24px] leading-tight tracking-tight"
                  style={{
                    color: "var(--ed-fg)",
                    fontWeight: 500,
                    fontVariationSettings: '"opsz" 36',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="mt-2 text-[15px] sm:text-[16px] leading-relaxed"
                  style={{ color: "var(--ed-fg-soft)" }}
                >
                  {p.summary}
                </p>
                <div className="label mt-2 sm:hidden" style={{ color: "var(--ed-fg-faint)" }}>
                  {p.domain}
                </div>
              </div>

              <div className="col-span-12 sm:col-span-3 sm:text-right">
                <div
                  className="serif text-[24px] sm:text-[28px] tabular-nums leading-none"
                  style={{
                    color: "var(--ed-accent)",
                    fontWeight: 400,
                    fontVariationSettings: '"opsz" 48',
                  }}
                >
                  {p.metric}
                </div>
                <div
                  className="text-[12px] mt-1"
                  style={{ color: "var(--ed-fg-muted)" }}
                >
                  {p.metricLabel}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <span className="label" style={{ color: "var(--ed-fg-muted)" }}>
            — end of index —
          </span>
        </div>
      </div>
    </section>
  );
}
