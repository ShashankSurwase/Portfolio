"use client";
import { motion } from "framer-motion";
import { Mail, GitBranch, Link2 } from "lucide-react";
import { PROFILE } from "@/lib/profile";

const STACK_GROUPS = [
  {
    title: "Languages",
    items: ["Python", "SQL (Postgres, ClickHouse, Redshift)", "R", "Bash"],
  },
  {
    title: "Orchestration & ETL",
    items: ["Apache Airflow", "AWS Lambda", "EventBridge", "Selenium", "Playwright", "Kafka"],
  },
  {
    title: "Warehouses & Databases",
    items: ["PostgreSQL", "ClickHouse", "Amazon Redshift Serverless", "BigQuery", "MongoDB"],
  },
  {
    title: "Cloud",
    items: ["AWS S3 · Lambda · IAM · CloudWatch", "Redshift Data API", "GCP BigQuery", "Docker"],
  },
  {
    title: "Business Intelligence",
    items: ["Grafana", "Power BI", "Apache Superset", "Metabase", "FastAPI (SQL services)"],
  },
  {
    title: "Domain",
    items: ["IEC 61724 (solar performance)", "RFM & cohort analysis", "OMR / OCR pipelines", "Multi-marketplace reconciliation"],
  },
];

export default function StackAndContact() {
  return (
    <>
      {/* Stack — quiet typographic list */}
      <section
        id="stack"
        className="px-6 lg:px-12 py-24 sm:py-32 border-t"
        style={{ borderColor: "var(--ed-rule-soft)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-6 mb-12">
            <span className="label" style={{ color: "var(--ed-accent)" }}>
              04 · The Toolbox
            </span>
            <hr className="rule flex-1" />
          </div>

          <h2
            className="serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-tight max-w-3xl"
            style={{ color: "var(--ed-fg)", fontWeight: 400, fontVariationSettings: '"opsz" 96' }}
          >
            Tools that have made it to production.
          </h2>
          <p className="lede mt-5 max-w-2xl">
            Nothing here is a tutorial-completion certificate. Every tool below
            has been used to ship something that the business depended on.
          </p>

          <div className="mt-14 grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {STACK_GROUPS.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span
                    className="serif italic text-[14px]"
                    style={{ color: "var(--ed-accent)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="serif text-[20px] tracking-tight"
                    style={{ color: "var(--ed-fg)", fontWeight: 500 }}
                  >
                    {g.title}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="text-[15px]"
                      style={{ color: "var(--ed-fg-soft)" }}
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact close */}
      <section
        id="contact"
        className="px-6 lg:px-12 py-28 sm:py-40 border-t"
        style={{ borderColor: "var(--ed-rule-soft)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="label" style={{ color: "var(--ed-accent)" }}>
            05 · The Sign-off
          </span>
          <h2
            className="serif mt-6 leading-[1.05] tracking-tight"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
              color: "var(--ed-fg)",
              fontWeight: 400,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            If you have a system that needs to{" "}
            <em
              className="serif italic"
              style={{ color: "var(--ed-accent)", fontWeight: 400 }}
            >
              stop being a problem
            </em>
            , I&apos;d like to hear about it.
          </h2>

          <p className="lede mt-7 max-w-xl mx-auto">
            Open to full-time roles and consulting engagements.
            Reply within 24 hours.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={PROFILE.emailHref} className="btn-editorial-accent">
              <Mail size={14} /> Write to me
            </a>
            <a href={PROFILE.githubHref} target="_blank" rel="noopener noreferrer" className="btn-editorial">
              <GitBranch size={14} /> GitHub
            </a>
            <a href={PROFILE.linkedinHref} target="_blank" rel="noopener noreferrer" className="btn-editorial">
              <Link2 size={14} /> LinkedIn
            </a>
          </div>

          <div className="mt-20">
            <hr className="rule mb-5" />
            <p
              className="serif italic text-[13px]"
              style={{ color: "var(--ed-fg-muted)" }}
            >
              Set in Fraunces &amp; Geist Sans · 2026 · Shashank Surwase
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
