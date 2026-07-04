"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  number: string;          // "01"
  eyebrow?: string;        // tiny accent label above (optional)
  title: ReactNode;        // e.g. "About Me"
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  number,
  eyebrow,
  title,
  align = "left",
  className = "",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-10 ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-500 dark:text-emerald-400 mb-3">
          {eyebrow}
        </div>
      )}
      <div className={`flex items-baseline gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="font-mono text-base sm:text-lg text-emerald-500 dark:text-emerald-400">
          {number}.
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold theme-text-primary tracking-tight">
          {title}
        </h2>
        <span
          className={`hidden sm:block flex-1 h-px theme-bg-card ml-4 max-w-[280px]`}
          style={{ background: "var(--border-strong)" }}
        />
      </div>
    </motion.div>
  );
}
