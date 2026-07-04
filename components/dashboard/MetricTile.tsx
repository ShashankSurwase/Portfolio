"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import Sparkline from "./Sparkline";

interface Props {
  label: string;
  value: string;            // already formatted, e.g. "$1.05M"
  delta?: string;           // e.g. "+99.8%" or "-99%"
  deltaDirection?: "up" | "down" | "flat" | "good-down";
  sub?: string;             // small caption below
  sparkData?: number[];
  variant?: "accent" | "info";
}

export default function MetricTile({
  label,
  value,
  delta,
  deltaDirection = "up",
  sub,
  sparkData,
  variant = "accent",
}: Props) {
  const isPositive =
    deltaDirection === "up" || deltaDirection === "good-down";
  const DeltaIcon =
    deltaDirection === "flat"
      ? Minus
      : deltaDirection === "down"
      ? ArrowDownRight
      : ArrowUpRight;
  const deltaColor =
    deltaDirection === "flat"
      ? "theme-text-muted"
      : isPositive
      ? "theme-text-success"
      : "theme-text-danger";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="panel panel-hover p-4 flex flex-col gap-2 min-h-[110px]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="mono text-[10.5px] tracking-wider uppercase theme-text-muted">
          {label}
        </span>
        {delta && (
          <span className={`mono text-[10.5px] tnum flex items-center gap-0.5 ${deltaColor}`}>
            <DeltaIcon size={11} />
            {delta}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-2xl sm:text-[26px] font-bold theme-text-primary tnum leading-none mono">
            {value}
          </span>
          {sub && <span className="text-[11px] theme-text-faint mt-1.5">{sub}</span>}
        </div>
        {sparkData && (
          <div className="flex-shrink-0">
            <Sparkline data={sparkData} variant={variant} width={88} height={32} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
