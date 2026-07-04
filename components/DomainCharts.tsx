"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── E-Commerce: 12-channel stacked source breakdown ──────── */
const ECOM_CHANNELS = [
  { key: "Amazon",        color: "bg-indigo-500",  share: 28 },
  { key: "Flipkart",      color: "bg-cyan-500/80", share: 14 },
  { key: "Myntra",        color: "bg-violet-500/80", share: 10 },
  { key: "D2C Website",   color: "bg-emerald-500/80", share: 12 },
  { key: "Quick-comm",    color: "bg-amber-500/70", share: 6 },
  { key: "General Trade", color: "bg-rose-500/70", share: 9 },
  { key: "EBO Retail",    color: "bg-pink-500/70", share: 5 },
  { key: "Offline Pop-up",color: "bg-sky-500/70", share: 3 },
  { key: "MENA (Noon/FC)",color: "bg-orange-500/70", share: 8 },
  { key: "B2B (Reliance)",color: "bg-teal-500/70", share: 5 },
];

// Monthly stacked bar — 8 months across an apparel brand's calendar
const ECOM_MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
const ECOM_GROWTH = [42, 47, 52, 58, 64, 71, 79, 88]; // index value, normalised
function EcomChart({ active }: { active: boolean }) {
  const maxVal = 100;
  return (
    <div>
      {/* Stacked monthly bar */}
      <div className="flex items-end gap-2 h-44 mb-3 px-2">
        {ECOM_MONTHS.map((m, i) => {
          const total = ECOM_GROWTH[i];
          // distribute across channels proportionally to their share
          return (
            <div key={m} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full flex flex-col-reverse rounded-md overflow-hidden"
                style={{ height: `${(total / maxVal) * 150}px` }}
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: active ? 1 : 0 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              >
                {ECOM_CHANNELS.map((c) => (
                  <div
                    key={c.key}
                    className={c.color}
                    style={{ height: `${c.share}%`, minHeight: 1 }}
                  />
                ))}
              </motion.div>
              <span className="text-[10px] theme-text-faint">{m}</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-4 text-[10px] theme-text-muted">
        {ECOM_CHANNELS.map((c) => (
          <span key={c.key} className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-sm ${c.color}`} />
            {c.key}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4 text-[11px]">
        <span className="theme-text-muted">12+ channels unified into one fact table</span>
        <span className="text-emerald-500 dark:text-emerald-400 font-medium">↑ 110% growth across 8 months</span>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Source Systems", value: "31",   sub: "automated" },
          { label: "Airflow DAGs",   value: "131",  sub: "production" },
          { label: "Revenue Recovered", value: "$1.05M", sub: "UAE-ASIN fix" },
          { label: "K-beauty Reports", value: "27", sub: "automated" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-base font-bold theme-text-primary">{s.value}</div>
            <div className="text-[10px] theme-text-faint">{s.label}</div>
            <div className="text-[9px] text-indigo-500 dark:text-indigo-400">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── EdTech: before/after across 6 dimensions ─────────────── */
const EDTECH_ROWS = [
  { label: "OMR Turnaround",       beforeText: "10–15 days",    afterText: "same-day",    delta: 100 },
  { label: "Data Accuracy",         beforeText: "~80%",          afterText: "99%+",        delta: 19 },
  { label: "Weekly Manual Work",    beforeText: "30–40 hrs",     afterText: "~2 hrs",      delta: 95 },
  { label: "Faculty Insight Lag",   beforeText: "monthly mock",  afterText: "next morning",delta: 85 },
  { label: "Personalised Papers",   beforeText: "0",             afterText: "per student", delta: 100 },
  { label: "Source Coverage",       beforeText: "manual silos",  afterText: "7 unified",   delta: 100 },
];

function EdtechChart({ active }: { active: boolean }) {
  return (
    <div>
      <div className="space-y-3 mb-5">
        {EDTECH_ROWS.map((row, i) => (
          <div key={row.label}>
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="theme-text-secondary font-medium">{row.label}</span>
              <span className="theme-text-faint">
                <span className="text-rose-500 dark:text-rose-400/80">{row.beforeText}</span>
                <span className="mx-1 theme-text-faint">→</span>
                <span className="text-emerald-600 dark:text-emerald-400">{row.afterText}</span>
              </span>
            </div>
            <div className="relative h-4 rounded-full bg-black/[0.04] dark:bg-white/[0.04] overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/80 to-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: active ? `${row.delta}%` : 0 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-y-0 right-2 flex items-center text-[9px] font-bold text-white drop-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ delay: i * 0.08 + 0.4 }}
              >
                {row.delta}%
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 text-[10px] theme-text-muted mb-4">
        <span className="flex items-center gap-1">
          <span className="w-3 h-1 rounded-full bg-rose-500/40" />
          Before
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-1 rounded-full bg-emerald-500" />
          After (improvement %)
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-2">
        {[
          { label: "Students Tracked", value: "~1,200/yr" },
          { label: "ETL Pipelines",    value: "70+" },
          { label: "Source Systems",   value: "7+" },
          { label: "Grafana Dashboards", value: "6" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-base font-bold theme-text-primary">{s.value}</div>
            <div className="text-[10px] theme-text-faint">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Solar: PR audit visualised with IEC 61724 band ──────── */
const SOLAR_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const SOLAR_CORRECT = [74, 76, 79, 77, 80, 78, 82, 81];   // healthy range 75-85%
const SOLAR_INFLATED = [112, 124, 135, 118, 141, 126, 138, 121]; // 6-17× inflated

function SolarChart({ active }: { active: boolean }) {
  const W = 540, H = 130, pad = { l: 36, r: 18, t: 14, b: 30 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const maxVal = 150;
  const minVal = 0;
  const toY = (v: number) => pad.t + innerH - ((v - minVal) / (maxVal - minVal)) * innerH;
  const toX = (i: number) => pad.l + (i / (SOLAR_CORRECT.length - 1)) * innerW;

  const pathCorrect  = SOLAR_CORRECT.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
  const pathInflated = SOLAR_INFLATED.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");

  // IEC reference band at 75-85%
  const iecTop = toY(85), iecBot = toY(75);

  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-xl glass p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {/* IEC band */}
          <rect x={pad.l} y={iecTop} width={innerW} height={iecBot - iecTop}
            fill="rgba(16,185,129,0.10)" stroke="rgba(16,185,129,0.3)" strokeDasharray="4,4" strokeWidth="1" />
          <text x={pad.l + 6} y={iecTop + 11} fontSize="9" fill="currentColor" className="text-emerald-700 dark:text-emerald-300 opacity-70">
            IEC 61724 target band (75–85%)
          </text>

          {/* Y-axis lines + labels */}
          {[0, 50, 100, 140].map((v) => (
            <g key={v}>
              <line x1={pad.l} y1={toY(v)} x2={W - pad.r} y2={toY(v)}
                stroke="currentColor" strokeWidth="1" className="opacity-10" />
              <text x={pad.l - 6} y={toY(v) + 3} fontSize="8" fill="currentColor" className="opacity-50" textAnchor="end">
                {v}%
              </text>
            </g>
          ))}

          {/* Month labels */}
          {SOLAR_MONTHS.map((m, i) => (
            <text key={m} x={toX(i)} y={H - 8} fontSize="9" fill="currentColor" className="opacity-50" textAnchor="middle">{m}</text>
          ))}

          {/* Inflated (pre-fix) — dashed red */}
          <motion.path
            d={pathInflated}
            fill="none"
            stroke="rgb(244, 63, 94)"
            strokeWidth="1.8"
            strokeDasharray="5,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            opacity={0.65}
          />

          {/* Corrected (post-fix) — solid green */}
          <motion.path
            d={pathCorrect}
            fill="none"
            stroke="rgb(16, 185, 129)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />

          {/* Dots on corrected line */}
          {active && SOLAR_CORRECT.map((v, i) => (
            <motion.circle
              key={i}
              cx={toX(i)}
              cy={toY(v)}
              r="3.5"
              fill="rgb(16, 185, 129)"
              stroke="currentColor"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-white dark:text-[#090912]"
            />
          ))}
        </svg>
      </div>

      <div className="flex items-center gap-4 text-[11px] theme-text-muted mt-3 mb-4">
        <span className="flex items-center gap-1">
          <span className="inline-block w-4 border-t-2 border-rose-500/60 border-dashed" />
          Pre-fix (inflated 6–17×)
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-4 border-t-2 border-emerald-500" />
          Post-fix (IEC 61724 compliant)
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Solar Plants",  value: "245" },
          { label: "PR Accuracy",   value: "±2%" },
          { label: "Lambda Reduction", value: "−99%" },
          { label: "Data Freshness",value: "≤10 min" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-base font-bold theme-text-primary">{s.value}</div>
            <div className="text-[10px] theme-text-faint">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main ─────────────────────────────────────────────────── */
const TABS = [
  { id: "ecom",   label: "E-Commerce",      color: "text-indigo-500 dark:text-indigo-400",  dot: "bg-indigo-500 dark:bg-indigo-400" },
  { id: "edtech", label: "EdTech",          color: "text-violet-500 dark:text-violet-400",  dot: "bg-violet-500 dark:bg-violet-400" },
  { id: "solar",  label: "Renewable Energy",color: "text-emerald-500 dark:text-emerald-400",dot: "bg-emerald-500 dark:bg-emerald-400" },
];

export default function DomainCharts() {
  const [active, setActive] = useState("ecom");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-pad surface-tint" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-4">
            Impact Metrics
          </div>
          <h2 className="text-3xl md:text-4xl font-bold theme-text-primary mb-4">
            Domain-Wise Results
          </h2>
          <p className="theme-text-muted max-w-xl mx-auto text-sm">
            Production numbers from three industries — grounded in the latest domain READMEs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-strong rounded-2xl overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b theme-border-soft">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                  active === t.id
                    ? `${t.color} border-b-2 border-current theme-bg-card`
                    : "theme-text-faint hover:theme-text-secondary"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${active === t.id ? t.dot : "bg-slate-400 dark:bg-slate-700"}`} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Chart area */}
          <div className="p-6 md:p-8 min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {active === "ecom"   && <EcomChart   active={inView} />}
                {active === "edtech" && <EdtechChart active={inView} />}
                {active === "solar"  && <SolarChart  active={inView} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
