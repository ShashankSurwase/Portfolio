"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Line = { text: string; color: string; delay: number };

const SEQUENCES: Line[][] = [
  [
    { delay: 0,    text: "$ airflow dags trigger ecommerce_master_sync", color: "text-emerald-400" },
    { delay: 300,  text: "[09:14:32] INFO  Created DagRun #4821 · 131 DAGs registered", color: "text-slate-400" },
    { delay: 650,  text: "[09:14:33] INFO  Task: amazon_in_orders_sync → RUNNING", color: "text-cyan-400" },
    { delay: 1050, text: "[09:14:35] INFO  Fetched 4,237 records · schema: abc3f1e9 ✓", color: "text-slate-300" },
    { delay: 1450, text: "[09:14:41] INFO  Loaded → orders_raw in 8.4s (PostgreSQL)", color: "text-slate-300" },
    { delay: 1850, text: "[09:14:42] SUCCESS  amazon_in_orders_sync", color: "text-emerald-400" },
    { delay: 2250, text: "[09:14:43] INFO  Task: flipkart_inventory_sync → RUNNING", color: "text-cyan-400" },
    { delay: 2650, text: "[09:14:47] INFO  131 DAGs · 128 SUCCESS · 3 RUNNING · 0 FAILED", color: "text-indigo-400" },
    { delay: 3100, text: "Pipeline health: ████████████ 100%   Uptime: 99.97%", color: "text-emerald-300" },
  ],
  [
    { delay: 0,    text: "$ python reconcile_revenue.py --date 2025-11-15", color: "text-emerald-400" },
    { delay: 300,  text: "Connecting via Redshift Data API (0 persistent connections)...", color: "text-slate-400" },
    { delay: 650,  text: "Platform: Amazon Vendor UAE", color: "text-slate-300" },
    { delay: 1000, text: "  ASIN normalisation: encode → strip → uppercase", color: "text-cyan-400" },
    { delay: 1350, text: "  Match rate: 0.0% → 99.8%  (recovered 14,923 ASINs)", color: "text-emerald-400" },
    { delay: 1700, text: "Platform: Noon UAE · Flipkart IN · Amazon IN · FirstCry", color: "text-slate-300" },
    { delay: 2100, text: "  Combined match rate: 96.5% ($3.65M of $3.78M tracked)", color: "text-emerald-400" },
    { delay: 2500, text: "─────────────────────────────────────────────────", color: "text-slate-700" },
    { delay: 2800, text: "RECOVERED  $1,052,841  previously untracked revenue", color: "text-indigo-300" },
    { delay: 3200, text: "Throughput: ~15,000 records/sec  (8.8× faster)", color: "text-cyan-400" },
  ],
  [
    { delay: 0,    text: "$ python solar_etl.py --trigger eventbridge", color: "text-emerald-400" },
    { delay: 300,  text: "Processing 245 solar plants...", color: "text-slate-400" },
    { delay: 650,  text: "  Watermark: 08:45:12Z → 09:00:00Z (15-min window)", color: "text-cyan-400" },
    { delay: 1050, text: "  ROW_NUMBER dedup + 56-column dynamic pivot", color: "text-slate-400" },
    { delay: 1450, text: "  IEC 61724 PR validation: all values ±2% ✓", color: "text-emerald-400" },
    { delay: 1850, text: "Lambda invocations: 286 today (baseline was 28,800) −99%", color: "text-emerald-400" },
    { delay: 2250, text: "Data freshness: 8 min  (SLA ≤10 min) ✓", color: "text-emerald-400" },
    { delay: 2650, text: "Complete: 10,284,392 rows processed · 0 errors", color: "text-indigo-400" },
    { delay: 3050, text: "Next EventBridge trigger in 14m 52s", color: "text-slate-500" },
  ],
];

const LABELS = ["Airflow ETL · E-Commerce", "Revenue Reconciliation", "Solar IoT Pipeline"];

export default function TerminalWidget() {
  const [seqIdx, setSeqIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [running, setRunning] = useState(true);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = () => { timeouts.current.forEach(clearTimeout); timeouts.current = []; };

  useEffect(() => {
    clearAll();
    setVisibleLines(0);
    setRunning(true);
    const seq = SEQUENCES[seqIdx];
    seq.forEach((line, i) => {
      const t = setTimeout(() => setVisibleLines(i + 1), line.delay);
      timeouts.current.push(t);
    });
    const last = seq[seq.length - 1];
    const done = setTimeout(() => {
      setRunning(false);
      const next = setTimeout(() => setSeqIdx((s) => (s + 1) % SEQUENCES.length), 2200);
      timeouts.current.push(next);
    }, last.delay + 1800);
    timeouts.current.push(done);
    return clearAll;
  }, [seqIdx]);

  const seq = SEQUENCES[seqIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="w-full max-w-2xl mx-auto mt-10"
    >
      {/* Window chrome */}
      <div className="rounded-2xl overflow-hidden border border-white/[0.10] shadow-2xl shadow-black/40">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d1a] border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2">
            {LABELS.map((l, i) => (
              <button
                key={l}
                onClick={() => setSeqIdx(i)}
                className={`text-[10px] px-2.5 py-1 rounded-md transition-all ${
                  i === seqIdx
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "text-slate-600 hover:text-slate-400"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${running ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
            <span className="text-[10px] text-slate-600">{running ? "running" : "idle"}</span>
          </div>
        </div>

        {/* Terminal body */}
        <div className="bg-[#090912] px-5 py-4 font-mono text-xs leading-relaxed min-h-[200px] max-h-[220px] overflow-hidden">
          {seq.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={`${seqIdx}-${i}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`${line.color} whitespace-pre-wrap break-all`}
            >
              {line.text}
            </motion.div>
          ))}
          {visibleLines < seq.length && (
            <span className="text-emerald-400 animate-pulse">█</span>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-slate-700 mt-3">
        Live simulation of production pipeline output · Click tabs to explore
      </p>
    </motion.div>
  );
}
