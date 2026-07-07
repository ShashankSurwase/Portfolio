"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ChevronDown } from "lucide-react";
import { PROFILE } from "@/lib/profile";

// One company (Delphi Analytics), Jun 2021 → present — five-step growth.
// Titles supplied by Shashank; period dates are approximate — confirm before publishing.
// Listed most-recent first (current role on top).
const ROLES = [
  {
    title: "Senior Data Analyst & Engineer",
    period: "Jun 2025 – Present",
    focus: "Solar EMS",
    points: [
      "Own the cloud Energy Management System end-to-end for a utility-scale solar producer — 245 plants monitored in real time to the IEC 61724 standard.",
      "Re-architected serverless IoT ingestion (SFTP → S3 → Lambda → Redshift): cut Lambda invocations 864k → 8.6k/month (−99%) and eliminated Redshift connection-limit failures.",
      "Rebuilt the KPI engine — Performance Ratio was silently 6–17× wrong across 13 dashboards — to within ±2% of IEC 61724, and added a real-time alarm engine cutting fault detection from T+1 day to ≤10 minutes.",
      "Automated Daily Generation Reports and tariff-based invoicing (95+ hrs/month saved); optimised databases and Airflow DAGs to cut infrastructure cost 20–30%.",
      "Own client requirements and delivery end-to-end across solar, e-commerce and edtech (Jira / Bitrix24).",
    ],
  },
  {
    title: "Senior Data Analyst",
    period: "Oct 2024 – Jun 2025",
    focus: "Leadership & Cost Optimization",
    points: [
      "Led and managed teams, accelerating project timelines by 30% using Jira.",
      "Delivered analytics solutions and cost optimisation for edtech, e-commerce and manufacturing clients.",
      "Contributed to front-end analytics tools, resolving database issues and delivering insights.",
      "Optimised databases and Airflow DAGs, reducing costs by 20–30%.",
      "Owned client relationships, ensuring clear communication and project alignment.",
    ],
  },
  {
    title: "Data Analyst II",
    period: "Jun 2023 – Sep 2024",
    focus: "EdTech & Student Analytics",
    points: [
      "Automated data pipelines from Google Drive for edtech clients, reducing manual effort by 70%.",
      "Built ETL and dashboards for real-time student data visibility — 100% accuracy within 1 hour of an exam.",
      "Implemented alerting systems and customised PDF reports, cutting operational time by 80%.",
      "Developed a question bank that streamlined question creation and tagging.",
      "Optimised marketing dashboards, saving 20% of budget through real-time reporting and alerts.",
    ],
  },
  {
    title: "Data Analyst I",
    period: "Jun 2022 – May 2023",
    focus: "BI & Automation",
    points: [
      "Built SQL ETL for sales, marketing and inventory reports — 80% less manual effort at 100% accuracy.",
      "Developed real-time dashboards in Apache Superset, reducing team dependency.",
      "Set up daily email and Slack reporting, supporting 40% business growth.",
      "Automated GA4 clickstream from BigQuery into the warehouse, cutting costs by 50%.",
      "Contributed to front-end development and webhook integration for seamless analytics access.",
    ],
  },
  {
    title: "Data Analyst",
    period: "Jun 2021 – May 2022",
    focus: "Foundation",
    points: [
      "Extracted marketplace reports (Amazon, Flipkart, Myntra) via Selenium and APIs, reducing manual effort by 90%.",
      "Automated report generation with cron and Apache Airflow, ensuring real-time data sync at 100% accuracy.",
      "Hosted and monitored databases on Docker containerised cloud hosting, cutting deployment time to ~10 minutes.",
      "Collaborated with the networking team on system setup, deepening backend architecture and network knowledge.",
    ],
  },
];

export default function FolioJourney() {
  const [open, setOpen] = useState(0); // current role expanded by default; -1 = all closed

  return (
    <section id="experience" className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-[32px] sm:text-[40px] font-bold">Work Experience</h2>
          <div className="fo-underline fo-underline-center" />
          <p className="mt-4 text-[16px] fo-muted max-w-2xl mx-auto">
            Five years of growth in one place — tap any role to see what it involved.
          </p>
        </div>

        {/* One unified card: company header + role accordion inside it */}
        <div className="mt-10 fo-card overflow-hidden">
          {/* Company header */}
          <div className="flex items-center gap-4 p-5 sm:p-6" style={{ background: "var(--fo-bg-soft)", borderBottom: "1px solid var(--fo-border)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Portfolio/delphi-logo.jpg"
              alt="Delphi Analytics logo"
              width={52}
              height={52}
              className="rounded-xl flex-shrink-0"
              style={{ width: 52, height: 52, objectFit: "contain", background: "#ffffff", border: "1px solid var(--fo-border)", padding: 4 }}
            />
            <div className="min-w-0">
              <h3 className="text-[19px] sm:text-[22px] font-bold fo-ink leading-tight">{PROFILE.company}</h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13.5px] fo-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} /> {PROFILE.companyLocation}
                </span>
                <span>Jun 2021 – Present · 5 roles</span>
              </div>
            </div>
          </div>

          {/* Role accordion (most recent first) */}
          <div>
            {ROLES.map((r, i) => {
              const isOpen = open === i;
              return (
                <div key={r.title} style={{ borderTop: i === 0 ? "none" : "1px solid var(--fo-border)" }}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-3 sm:gap-4 text-left px-5 sm:px-6 py-4 transition-colors"
                    style={{ background: isOpen ? "var(--fo-accent-soft)" : "transparent" }}
                  >
                    <span
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        background: isOpen ? "var(--fo-accent)" : "var(--fo-accent-soft)",
                        color: isOpen ? "#fff" : "var(--fo-accent)",
                      }}
                    >
                      <Briefcase size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px] sm:text-[17.5px] font-bold fo-ink leading-tight break-words">{r.title}</span>
                      <span
                        className="block text-[13px] font-semibold mt-0.5"
                        style={{ color: "var(--fo-accent)", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                      >
                        {r.period}
                      </span>
                      <span className="fo-tag !text-[11px] mt-2 inline-flex max-w-full">{r.focus}</span>
                    </span>
                    <ChevronDown
                      size={19}
                      className="flex-shrink-0 transition-transform duration-300"
                      style={{ color: "var(--fo-muted)", transform: isOpen ? "rotate(180deg)" : "none" }}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 pl-[68px] sm:pl-[76px]">
                          <ul className="space-y-3">
                            {r.points.map((p) => (
                              <li key={p} className="flex gap-3 text-[15px] leading-[1.7] fo-body">
                                <span className="mt-[9px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--fo-accent)" }} />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
