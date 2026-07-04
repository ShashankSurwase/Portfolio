"use client";
import { motion } from "framer-motion";
import { Activity, ArrowRight, Mail } from "lucide-react";
import Panel from "./dashboard/Panel";
import MetricTile from "./dashboard/MetricTile";
import StatusPill from "./dashboard/StatusPill";
import Sparkline from "./dashboard/Sparkline";

// Mock-but-grounded time series for sparklines (the numbers reflect real
// engagement metrics from the README data)
const SPARK_DAGS         = [62, 68, 71, 78, 83, 95, 104, 121, 131];
const SPARK_PLANTS       = [110, 142, 168, 189, 204, 218, 232, 240, 245];
const SPARK_HOURS        = [60, 65, 72, 80, 90, 105, 110, 118, 120];
const SPARK_PROJECTS     = [2, 3, 5, 7, 9, 12, 18, 24, 31];
const SPARK_REVENUE      = [0, 50, 200, 480, 720, 850, 940, 1010, 1052];
const SPARK_REPORTS      = [3, 6, 11, 15, 19, 22, 24, 26, 27];

const ENGAGEMENTS = [
  {
    code: "ECOM",
    name: "Multi-channel commerce stack",
    industry: "D2C / Marketplace / GT",
    status: "LIVE" as const,
    metrics: "131 DAGs · 31 sources · ₹5.79 Cr",
  },
  {
    code: "EDU",
    name: "Coaching analytics platform",
    industry: "EdTech — K12 exam prep",
    status: "PROD" as const,
    metrics: "70+ pipelines · 6 dashboards · 1,200 students/yr",
  },
  {
    code: "EMS",
    name: "Solar EMS — 245 plants",
    industry: "Renewable Energy",
    status: "LIVE" as const,
    metrics: "10M+ rows · ≤10 min freshness · ±2% IEC 61724",
  },
];

export default function Hero() {
  return (
    <section id="hero" className="px-4 sm:px-6 pt-6 pb-10 space-y-6">
      {/* TOP PANEL — Overview banner */}
      <Panel
        name="panel.overview"
        meta="last refreshed: just now"
        live
        actions={
          <span className="chip">
            <span className="theme-text-accent">env:</span>
            <span className="theme-text-secondary">production</span>
          </span>
        }
      >
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
          {/* Left: hero text */}
          <div className="flex flex-col justify-center">
            <p className="mono text-[11px] uppercase tracking-[0.2em] theme-text-accent flex items-center gap-2">
              <Activity size={11} />
              data-engineer.dashboard
              <span className="theme-text-faint">·</span>
              <StatusPill status="LIVE" pulse />
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold theme-text-primary leading-[1.05] tracking-tight">
              Shashank Surwase
            </h1>
            <h2 className="mt-3 text-xl sm:text-2xl lg:text-3xl theme-text-secondary font-medium leading-tight">
              Data Engineer · Analytics Engineer
            </h2>

            <p className="mt-5 theme-text-muted max-w-xl leading-relaxed text-sm sm:text-base">
              I build production data systems end-to-end — ingestion,
              warehousing, BI, and automation — across{" "}
              <span className="theme-text-accent">e-commerce</span>,{" "}
              <span className="theme-text-accent">EdTech</span>, and{" "}
              <span className="theme-text-accent">renewable&nbsp;energy</span>{" "}
              domains. 3–4 years at a data analytics consultancy.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-accent">
                <ArrowRight size={13} />
                view.projects()
              </a>
              <a href="#contact" className="btn-ghost">
                <Mail size={13} />
                get_in_touch()
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="chip"><span className="theme-text-muted">role:</span> open to new opportunities</span>
              <span className="chip"><span className="theme-text-muted">location:</span> India · remote-first</span>
              <span className="chip"><span className="theme-text-muted">stack:</span> Python · SQL · Airflow · ClickHouse</span>
            </div>
          </div>

          {/* Right: domain sparklines stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <MetricTile
              label="Source systems"
              value="31"
              delta="+25"
              deltaDirection="up"
              sub="across 3 industries"
              sparkData={SPARK_DAGS}
            />
            <MetricTile
              label="Plants monitored"
              value="245"
              delta="+135"
              deltaDirection="up"
              sub="solar IoT"
              sparkData={SPARK_PLANTS}
              variant="info"
            />
            <MetricTile
              label="Hrs/mo automated"
              value="120+"
              delta="+85%"
              deltaDirection="up"
              sub="manual MIS eliminated"
              sparkData={SPARK_HOURS}
            />
            <MetricTile
              label="Projects shipped"
              value="31"
              delta="+12"
              deltaDirection="up"
              sub="production"
              sparkData={SPARK_PROJECTS}
              variant="info"
            />
          </div>
        </div>
      </Panel>

      {/* SECOND ROW — wider KPI strip + engagements */}
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
        {/* Revenue recovery panel */}
        <Panel
          name="panel.headline_metric"
          meta="acquired via uae-asin reconciliation fix"
          actions={<StatusPill status="OK" />}
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="mono text-[10.5px] uppercase tracking-wider theme-text-muted">
                Revenue recovered
              </div>
              <div className="mt-2 text-5xl sm:text-6xl font-bold theme-text-primary tnum mono leading-none">
                $1.05<span className="theme-text-accent">M</span>
              </div>
              <div className="mt-3 mono text-[11px] theme-text-success tnum">
                ↑ 0% → 99.8% match rate
              </div>
              <p className="mt-4 text-sm theme-text-muted max-w-sm">
                Diagnosed a Unicode/ASCII ASIN-encoding bug that had silently
                stranded over a million dollars of UAE Vendor Central revenue.
                One pipeline fix recovered all of it.
              </p>
            </div>
            <div className="flex-shrink-0 hidden sm:block">
              <Sparkline data={SPARK_REVENUE} variant="accent" width={180} height={70} />
            </div>
          </div>
        </Panel>

        {/* Reports panel */}
        <Panel
          name="panel.reports_shipped"
          meta="K-beauty ClickHouse warehouse"
          actions={<StatusPill status="PROD" />}
        >
          <div className="grid grid-cols-3 gap-4 items-end">
            <div className="col-span-2">
              <div className="mono text-[10.5px] uppercase tracking-wider theme-text-muted">
                Automated reports
              </div>
              <div className="mt-2 text-5xl sm:text-6xl font-bold theme-text-primary tnum mono leading-none">
                27<span className="theme-text-info">/27</span>
              </div>
              <div className="mt-3 mono text-[11px] theme-text-info tnum">
                ↑ all 27 production reports automated
              </div>
              <p className="mt-4 text-sm theme-text-muted max-w-sm">
                30+ ClickHouse tables, 3 write patterns, 27 SQL-driven reports
                tracking <span className="mono">₹5.79 Cr</span> in revenue across
                5 channel sources.
              </p>
            </div>
            <div className="flex-shrink-0 hidden sm:block">
              <Sparkline data={SPARK_REPORTS} variant="info" width={120} height={70} />
            </div>
          </div>
        </Panel>
      </div>

      {/* ENGAGEMENTS — mini table of active work */}
      <Panel
        name="panel.active_engagements"
        meta="3 active engagements · all production"
        live
        actions={<span className="chip mono">SELECT * FROM engagements</span>}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="mono text-[10.5px] uppercase tracking-wider theme-text-muted border-b theme-border-soft">
                <th className="text-left py-2 pr-4">id</th>
                <th className="text-left py-2 pr-4">engagement</th>
                <th className="text-left py-2 pr-4 hidden sm:table-cell">industry</th>
                <th className="text-left py-2 pr-4">status</th>
                <th className="text-left py-2 pr-4 hidden md:table-cell">metrics</th>
              </tr>
            </thead>
            <tbody className="mono tnum">
              {ENGAGEMENTS.map((e, i) => (
                <motion.tr
                  key={e.code}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b theme-border-soft row-hover hover:row-hover-bg"
                >
                  <td className="py-2.5 pr-4 text-[11px] theme-text-accent">{e.code}</td>
                  <td className="py-2.5 pr-4">
                    <span className="theme-text-primary text-sm">{e.name}</span>
                  </td>
                  <td className="py-2.5 pr-4 hidden sm:table-cell text-[11px] theme-text-muted">
                    {e.industry}
                  </td>
                  <td className="py-2.5 pr-4">
                    <StatusPill status={e.status} pulse={e.status === "LIVE"} />
                  </td>
                  <td className="py-2.5 pr-4 hidden md:table-cell text-[11px] theme-text-secondary">
                    {e.metrics}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </section>
  );
}
