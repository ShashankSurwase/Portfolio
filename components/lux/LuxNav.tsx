"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link2, GitBranch, Download, Menu, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { PROFILE } from "@/lib/profile";

const LINKS = [
  { href: "#work", label: "Work Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Tech Stack" },
  { href: "#contact", label: "Contact" },
];

export default function LuxNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "color-mix(in srgb, var(--lx-card) 88%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--lx-border)" : "1px solid transparent",
      }}
    >
      {/* scroll progress */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
        style={{ scaleX, background: "var(--lx-accent)" }}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-8 h-8 rounded-md flex items-center justify-center text-[12px] font-bold flex-shrink-0"
            style={{ background: "var(--lx-navy)", color: "var(--lx-bg)" }}
          >
            SS
          </span>
          <span className="lx-serif lx-ink text-[17px] font-semibold tracking-tight truncate">
            {PROFILE.name}
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="lx-navlink">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle compact />
          <a
            href={PROFILE.linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="lx-btn-outline !py-2 !px-3.5 !text-[11px]"
          >
            <Link2 size={13} /> LinkedIn
          </a>
          <a
            href={PROFILE.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="lx-btn-outline !py-2 !px-3.5 !text-[11px]"
          >
            <GitBranch size={13} /> GitHub
          </a>
          <a href={PROFILE.resumeHref} target="_blank" rel="noopener noreferrer" className="lx-btn-primary !py-2 !px-3.5 !text-[11px]">
            <Download size={13} /> Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle compact />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="lx-ink p-2"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-5 pb-5 pt-2 space-y-3"
          style={{ background: "var(--lx-card)", borderBottom: "1px solid var(--lx-border)" }}
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block lx-navlink text-[15px] py-1">
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-2.5 pt-2">
            <a href={PROFILE.linkedinHref} target="_blank" rel="noopener noreferrer" className="lx-btn-outline !py-2 !px-3.5 !text-[11px]">
              <Link2 size={13} /> LinkedIn
            </a>
            <a href={PROFILE.githubHref} target="_blank" rel="noopener noreferrer" className="lx-btn-outline !py-2 !px-3.5 !text-[11px]">
              <GitBranch size={13} /> GitHub
            </a>
            <a href={PROFILE.resumeHref} target="_blank" rel="noopener noreferrer" className="lx-btn-primary !py-2 !px-3.5 !text-[11px]">
              <Download size={13} /> Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
