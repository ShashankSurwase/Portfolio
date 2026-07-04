"use client";
import { useEffect, useState } from "react";
import { Link2, GitBranch, Download, Menu, X } from "lucide-react";
import { PROFILE } from "@/lib/profile";

const LINKS = [
  { href: "#domains", label: "Domains" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function FolioNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--fo-border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold flex-shrink-0"
            style={{ background: "var(--fo-accent-deep)", color: "#fff" }}
          >
            SS
          </span>
          <span className="fo-ink text-[16px] font-bold tracking-tight truncate">{PROFILE.name}</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="fo-navlink">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <a href={PROFILE.linkedinHref} target="_blank" rel="noopener noreferrer" className="fo-btn-light !py-2 !px-3.5 !text-[12.5px]">
            <Link2 size={14} /> LinkedIn
          </a>
          <a href={PROFILE.githubHref} target="_blank" rel="noopener noreferrer" className="fo-btn-light !py-2 !px-3.5 !text-[12.5px]">
            <GitBranch size={14} /> GitHub
          </a>
          <a href={PROFILE.resumeHref} target="_blank" rel="noopener noreferrer" className="fo-btn !py-2 !px-3.5 !text-[12.5px]">
            <Download size={14} /> Resume
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="md:hidden fo-ink p-2"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-5 pb-5 pt-2 space-y-3" style={{ background: "var(--fo-card)", borderBottom: "1px solid var(--fo-border)" }}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block fo-navlink text-[15px] py-1">
              {l.label}
            </a>
          ))}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <a href={PROFILE.linkedinHref} target="_blank" rel="noopener noreferrer" className="fo-btn-light !py-2 !px-3.5 !text-[12px]">
              <Link2 size={13} /> LinkedIn
            </a>
            <a href={PROFILE.githubHref} target="_blank" rel="noopener noreferrer" className="fo-btn-light !py-2 !px-3.5 !text-[12px]">
              <GitBranch size={13} /> GitHub
            </a>
            <a href={PROFILE.resumeHref} target="_blank" rel="noopener noreferrer" className="fo-btn !py-2 !px-3.5 !text-[12px]">
              <Download size={13} /> Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
