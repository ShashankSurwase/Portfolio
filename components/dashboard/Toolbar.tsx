"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Clock, Download } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { PROFILE } from "@/lib/profile";

const RANGES = ["Last 24h", "Last 7d", "Last 30d", "Last 90d", "All time"];

export default function Toolbar() {
  const [now, setNow] = useState<string>("");
  const [range, setRange] = useState("All time");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(
        d.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) +
          " · " +
          d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-30 h-12 flex items-center justify-between gap-3 px-4 sm:px-6"
      style={{
        background: "color-mix(in srgb, var(--bg-base) 92%, transparent)",
        borderBottom: "1px solid var(--border-soft)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mono text-[11px] uppercase tracking-wider min-w-0">
        <span className="theme-text-muted">~</span>
        <span className="theme-text-faint">/</span>
        <span className="theme-text-secondary truncate">shashank-surwase</span>
        <span className="theme-text-faint">/</span>
        <span className="theme-text-accent truncate">portfolio.dashboard</span>
      </div>

      {/* Search (decorative) */}
      <div className="hidden md:flex items-center gap-2 px-3 h-8 rounded mono text-[11px] theme-text-faint flex-1 max-w-md"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-soft)" }}
      >
        <Search size={11} />
        <span>Search panels, metrics, projects…</span>
        <span className="ml-auto chip !py-0 !px-1.5 !text-[10px]">⌘K</span>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-2">
        {/* Time range pill */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="chip cursor-pointer hover:theme-border-strong"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <Clock size={11} />
            <span className="hidden sm:inline">{range}</span>
            <span className="theme-text-faint ml-1">▾</span>
          </button>
          {open && (
            <div
              className="absolute right-0 mt-1 w-36 py-1 z-50 rounded mono text-[11px]"
              style={{
                background: "var(--bg-panel)",
                border: "1px solid var(--border-strong)",
              }}
            >
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRange(r);
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 row-hover hover:row-hover-bg theme-text-secondary"
                  style={range === r ? { color: "var(--accent)" } : undefined}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live clock */}
        <span className="chip hidden sm:inline-flex tnum">
          <span className="live-dot" />
          {now}
        </span>

        {/* View switcher */}
        <Link href="/v2" className="chip hidden sm:inline-flex" title="Switch to editorial view">
          <span className="theme-text-muted">view:</span>
          <span className="theme-text-accent">dashboard</span>
          <span className="theme-text-faint">↻</span>
        </Link>

        {/* Theme toggle */}
        <ThemeToggle compact />

        {/* Resume export */}
        <a href={PROFILE.resumeHref} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          <Download size={12} /> Resume
        </a>
      </div>
    </motion.header>
  );
}
