"use client";

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-8">
      <div className="panel">
        <div className="panel-header">
          <span><span className="theme-text-accent">footer</span> · build_info</span>
          <span className="theme-text-faint mono">v1.0 · 2026</span>
        </div>
        <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-3 mono text-[11px] theme-text-muted">
          <span className="flex items-center gap-2">
            <span className="live-dot" />
            uptime · 100%
          </span>
          <span className="theme-text-secondary">
            © {new Date().getFullYear()} Shashank Surwase ·
            <span className="theme-text-faint"> built with Next.js + Tailwind + Framer Motion</span>
          </span>
          <a href="#hero" className="hover:theme-text-accent transition-colors">
            return.to.top()
          </a>
        </div>
      </div>
    </footer>
  );
}
