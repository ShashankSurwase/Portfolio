"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "../ThemeToggle";

const links = [
  { href: "#story",     label: "Story" },
  { href: "#work",      label: "Work" },
  { href: "#stack",     label: "Stack" },
  { href: "#contact",   label: "Contact" },
];

export default function EditorialNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--ed-bg) 92%, transparent)"
          : "transparent",
        borderBottom: scrolled ? "1px solid var(--ed-rule-soft)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(10px)" : undefined,
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link
          href="/v2"
          className="serif text-xl tracking-tight flex items-baseline gap-2"
          style={{ color: "var(--ed-fg)" }}
        >
          <span>Shashank</span>
          <span style={{ color: "var(--ed-accent)" }}>·</span>
          <span style={{ color: "var(--ed-fg-soft)" }}>Surwase</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="serif text-[15px] transition-colors"
              style={{ color: "var(--ed-fg-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ed-fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ed-fg-muted)")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="label hidden sm:inline-block"
            style={{ color: "var(--ed-fg-muted)" }}
            title="Switch to dashboard view"
          >
            ↩ dashboard view
          </Link>
          <ThemeToggle compact />
        </div>
      </div>
    </motion.header>
  );
}
