"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Building2,
  GitBranch,
  Wrench,
  Mail,
  Link2,
} from "lucide-react";
import ThemeToggle from "../ThemeToggle";

const NAV = [
  { icon: LayoutDashboard, label: "Overview",  href: "#hero",       slug: "OVR" },
  { icon: User,            label: "About",     href: "#about",      slug: "ABT" },
  { icon: Briefcase,       label: "Experience",href: "#experience", slug: "EXP" },
  { icon: Building2,       label: "Domains",   href: "#domains",    slug: "DOM" },
  { icon: GitBranch,       label: "Projects",  href: "#projects",   slug: "PRJ" },
  { icon: Wrench,          label: "Tech",      href: "#tech",       slug: "TEC" },
  { icon: Mail,            label: "Contact",   href: "#contact",    slug: "CTC" },
];

export default function Sidebar() {
  const [active, setActive] = useState<string>("#hero");

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: fixed icon rail */}
      <motion.aside
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-14 z-40 flex-col items-center py-4 gap-1"
        style={{
          background: "var(--bg-elev)",
          borderRight: "1px solid var(--border-soft)",
        }}
        aria-label="Primary navigation"
      >
        {/* Logo block */}
        <a
          href="#hero"
          className="mb-4 w-9 h-9 rounded flex items-center justify-center mono text-sm font-bold"
          style={{ background: "var(--accent)", color: "#1a0e02" }}
          aria-label="Home"
        >
          SS
        </a>

        <nav className="flex flex-col items-center gap-1 flex-1">
          {NAV.map((item) => {
            const isActive = active === item.href;
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className="relative w-10 h-10 rounded flex items-center justify-center group transition-colors"
                style={{
                  color: isActive ? "var(--accent)" : "var(--fg-muted)",
                  background: isActive ? "var(--accent-soft)" : "transparent",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1.5 bottom-1.5 w-[2px]"
                    style={{ background: "var(--accent)" }}
                  />
                )}
                <Icon size={16} />
                {/* Tooltip on hover */}
                <span
                  className="absolute left-full ml-3 px-2 py-1 rounded mono text-[10.5px] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50"
                  style={{
                    background: "var(--bg-panel)",
                    color: "var(--fg-primary)",
                    border: "1px solid var(--border-strong)",
                  }}
                >
                  <span className="theme-text-accent">{item.slug}</span>
                  <span className="theme-text-muted ml-1.5">{item.label}</span>
                </span>
              </a>
            );
          })}
        </nav>

        {/* Bottom: theme + external links */}
        <div className="flex flex-col items-center gap-2">
          <ThemeToggle compact />
          <a
            href="#"
            aria-label="GitHub"
            className="w-9 h-9 rounded flex items-center justify-center theme-text-muted hover:theme-text-accent transition-colors"
          >
            <GitBranch size={14} />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded flex items-center justify-center theme-text-muted hover:theme-text-accent transition-colors"
          >
            <Link2 size={14} />
          </a>
        </div>
      </motion.aside>
    </>
  );
}
