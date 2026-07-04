"use client";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { PROFILE } from "@/lib/profile";

const CONSOLE_LINES: { text: string; cls: string }[] = [
  { text: "$ whoami --profile", cls: "lx-console-cmd" },
  { text: "{", cls: "lx-console-dim" },
  { text: `  "name": "Shashank Surwase",`, cls: "lx-console-dim" },
  { text: `  "role": "Data Engineer & Analyst",`, cls: "lx-console-dim" },
  { text: `  "location": "Pune, India",`, cls: "lx-console-dim" },
  { text: `  "experience": "4+ years",`, cls: "lx-console-dim" },
  { text: `  "stack": ["Airflow", "ClickHouse", "Redshift", "Python"]`, cls: "lx-console-dim" },
  { text: "}", cls: "lx-console-dim" },
  { text: "$ airflow dags list | wc -l", cls: "lx-console-cmd" },
  { text: "131", cls: "lx-console-out" },
  { text: "$ pipeline status --all", cls: "lx-console-cmd" },
  { text: "✓ revenue_reconciliation   99.8% match · $1.05M recovered", cls: "lx-console-ok" },
  { text: "✓ solar_iot_ingest         245 plants · ≤10 min freshness", cls: "lx-console-ok" },
  { text: "✓ student_analytics        99%+ accuracy · same-day MIS", cls: "lx-console-ok" },
];

export default function LuxHero() {
  return (
    <section id="top" className="pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        {/* Left — headline */}
        <div>
          <span className="lx-pill">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--lx-accent)" }} />
            Senior Data Analyst &amp; Engineer
          </span>

          <h1 className="lx-serif lx-ink mt-6 text-[40px] sm:text-[54px] lg:text-[60px] leading-[1.08] font-bold tracking-tight">
            Turning Raw Data into{" "}
            <em className="lx-accent" style={{ fontStyle: "italic" }}>
              Decisions that Pay
            </em>{" "}
            for Themselves.
          </h1>

          <p className="mt-6 text-[15.5px] leading-relaxed max-w-xl">
            {PROFILE.yearsLine} I design and run production data platforms
            end-to-end — ETL pipelines, warehouses, BI dashboards, and
            automation — across e-commerce, EdTech, and renewable energy.
            My work has recovered <strong className="lx-ink">$1.05M in lost revenue</strong> and
            eliminated <strong className="lx-ink">120+ hours of manual work every month</strong>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a href="#projects" className="lx-btn-primary">
              Explore My Work <ArrowRight size={14} />
            </a>
            <a href="#contact" className="lx-btn-outline">
              <Mail size={14} /> Get in Touch
            </a>
          </div>

          <p className="mt-7 flex items-center gap-2 text-[13px] lx-muted">
            <MapPin size={13} />
            {PROFILE.location} · open to full-time roles &amp; consulting
          </p>
        </div>

        {/* Right — console card */}
        <div className="hidden sm:block">
          <div className="lx-card overflow-hidden" style={{ boxShadow: "var(--lx-shadow-lg)" }}>
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid var(--lx-border)", background: "var(--lx-bg-soft)" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="mono text-[10px] tracking-widest uppercase lx-muted">
                shashank@production
              </span>
            </div>
            <div className="px-5 py-4 mono text-[11.5px] leading-[1.9]">
              {CONSOLE_LINES.map((l, i) => (
                <div key={i} className={l.cls} style={{ whiteSpace: "pre-wrap" }}>
                  {l.text}
                </div>
              ))}
              <span className="lx-console-cursor">█</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
