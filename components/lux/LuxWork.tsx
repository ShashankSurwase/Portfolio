"use client";
import { motion } from "framer-motion";
import { Building2, GraduationCap, ShoppingCart, BookOpen, Sun } from "lucide-react";
import { PROFILE } from "@/lib/profile";

const ENGAGEMENTS = [
  {
    icon: ShoppingCart,
    domain: "E-commerce & Retail",
    period: "2022 → present",
    summary:
      "Full data stacks for three brands — D2C apparel (India), personal-care (India + UAE), and K-beauty — selling one SKU across up to 31 channels: Amazon, Flipkart, Myntra, Shopify, Noon, quick-commerce and general trade.",
    points: [
      "131 production Airflow DAGs, 31 source systems, 1,400+ SQL transformations — one reliable cross-channel number for every business team.",
      "Recovered $1.05M in UAE marketplace revenue by root-causing an ASIN encoding bug (0% → 99.8% match); $3.78M reconciled across 6 platforms at ~15,000 records/sec.",
      "ClickHouse warehouse (30+ tables, 27 automated reports, ₹5.79 Cr tracked) + real-time cross-channel inventory visibility in Grafana.",
    ],
  },
  {
    icon: BookOpen,
    domain: "EdTech",
    period: "2023 → present",
    summary:
      "End-to-end analytics platform for two coaching institutes (~2,200 students/year, board · JEE · NEET prep) — including scraping a coaching tool that has no API.",
    points: [
      "7 disconnected sources → 70+ pipelines into a dual PostgreSQL + ClickHouse warehouse feeding 6 role-tailored Grafana dashboards.",
      "OMR evaluation cycle cut from 10–15 days to same-day; manual MIS of 30–40 hrs/week eliminated, accuracy 80% → 99%+.",
      "5-type student persona engine + 500+ personalised SWOT question papers per test cycle, generated and delivered automatically.",
    ],
  },
  {
    icon: Sun,
    domain: "Renewable Energy",
    period: "2024 → present",
    summary:
      "Cloud EMS for a utility-scale solar IPP — 245 plants across India streaming ~70,000 datapoints per metric daily, plant-to-dashboard in ≤10 minutes.",
    points: [
      "Re-architected ingestion: 864,000 → 8,600 Lambda invocations/month (−99%), zero connection-limit failures, headroom for 1,000+ plants.",
      "Audited and corrected KPIs that were silently 6–17× wrong across 13 dashboards — validated to ±2% of the IEC 61724 standard.",
      "Real-time alarm engine (fault detection 8–12 hrs → ≤10 min) + automated DGR reports and PDF invoicing: 95+ hrs/month returned to the ops team.",
    ],
  },
];

export default function LuxWork() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <span className="lx-kicker">Work Experience</span>
        <h2 className="lx-serif lx-ink mt-3 text-[32px] sm:text-[40px] font-bold tracking-tight leading-tight">
          One employer. Three industries. <em className="lx-accent">Production impact</em> in each.
        </h2>

        {/* Role banner */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="lx-card mt-10 p-6 sm:p-7 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <span
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--lx-navy)", color: "var(--lx-bg)" }}
            >
              <Building2 size={18} />
            </span>
            <div>
              <div className="lx-ink text-[17px] font-semibold">
                Senior Data Analyst &amp; Engineer — {PROFILE.company}
              </div>
              <div className="text-[13px] lx-muted mt-0.5">
                Jul 2021 – Present · Remote · Pune, India
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-[13px] lx-muted">
            <GraduationCap size={15} />
            PG-DBDA, C-DAC Pune (2021) · B.E., MIT Academy of Engineering (2019)
          </div>
        </motion.div>

        {/* Engagement cards */}
        <div className="mt-6 grid lg:grid-cols-3 gap-5">
          {ENGAGEMENTS.map((e, i) => (
            <motion.div
              key={e.domain}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="lx-card lx-card-hover p-6 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--lx-accent-soft)", color: "var(--lx-accent)" }}
                >
                  <e.icon size={16} />
                </span>
                <span className="mono text-[10.5px] tracking-widest uppercase lx-muted">{e.period}</span>
              </div>
              <h3 className="lx-serif lx-ink mt-4 text-[20px] font-bold">{e.domain}</h3>
              <p className="mt-2 text-[13px] leading-relaxed lx-muted">{e.summary}</p>
              <ul className="mt-4 space-y-2.5">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[13px] leading-relaxed">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--lx-accent)" }} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
