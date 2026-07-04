"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Experience", href: "#experience" },
  { num: "03", label: "Domains", href: "#domains" },
  { num: "04", label: "Projects", href: "#projects" },
  { num: "05", label: "Tech", href: "#tech" },
  { num: "06", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "h-14 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20"
          : "h-20"
      }`}
      style={{
        background: scrolled ? "color-mix(in srgb, var(--bg-base) 88%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border-soft)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-full">
        {/* Mono monogram */}
        <a href="#hero" className="group" aria-label="Home">
          <span className="font-mono text-emerald-600 dark:text-emerald-400 text-lg sm:text-xl border border-emerald-600/40 dark:border-emerald-400/40 px-2.5 py-1 rounded hover:bg-emerald-500/10 transition-colors">
            S<span className="theme-text-primary">.</span>S
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          <ol className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link text-sm">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 mr-1.5">{l.num}.</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ol>
          <ThemeToggle />
          <a href="/resume.pdf" className="btn-outline !py-1.5 !px-3 text-xs">
            <Download size={12} /> Resume
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle compact />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="theme-text-muted hover:text-emerald-500 dark:hover:text-emerald-400 w-9 h-9 rounded flex items-center justify-center"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-0 right-0 bottom-0 w-72 z-40"
            style={{
              background: "var(--bg-elev)",
              borderLeft: "1px solid var(--border-soft)",
              boxShadow: "0 0 40px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="theme-text-primary hover:text-emerald-500 dark:hover:text-emerald-400 text-base text-center"
                >
                  <div className="font-mono text-emerald-600 dark:text-emerald-400 text-xs">{l.num}.</div>
                  {l.label}
                </a>
              ))}
              <a href="/resume.pdf" className="btn-outline mt-4">
                <Download size={14} /> Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
