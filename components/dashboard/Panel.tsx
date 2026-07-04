"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, RefreshCw } from "lucide-react";

interface Props {
  id?: string;
  name: string;          // panel slug like "/about" or "panel.projects"
  title?: string;        // big H title shown inside body (optional)
  meta?: string;         // tiny meta on right (last-updated etc.)
  live?: boolean;
  actions?: ReactNode;   // extra right-side actions
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  eager?: boolean;       // above-the-fold: render visible immediately (no JS-gated reveal)
}

export default function Panel({
  id,
  name,
  meta,
  live,
  actions,
  children,
  className = "",
  bodyClassName = "",
  eager = false,
}: Props) {
  return (
    <motion.section
      id={id}
      initial={eager ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35 }}
      className={`panel ${className}`}
    >
      <header className="panel-header">
        <div className="flex items-center gap-2">
          {live && <span className="live-dot" />}
          <span className="theme-text-accent">{name}</span>
          {meta && (
            <>
              <span className="theme-text-faint">·</span>
              <span className="theme-text-muted normal-case tracking-normal">{meta}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <button
            aria-label="Refresh panel"
            className="theme-text-faint hover:theme-text-accent transition-colors"
            title="Refresh"
          >
            <RefreshCw size={11} />
          </button>
          <button
            aria-label="Panel menu"
            className="theme-text-faint hover:theme-text-accent transition-colors"
            title="More"
          >
            <MoreHorizontal size={13} />
          </button>
        </div>
      </header>
      <div className={`p-5 sm:p-6 ${bodyClassName}`}>{children}</div>
    </motion.section>
  );
}
