"use client";
import { PROFILE } from "@/lib/profile";

export default function FolioFooter() {
  return (
    <footer className="py-8" style={{ borderTop: "1px solid var(--fo-border)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12.5px] fo-muted">
          © 2026 {PROFILE.name} · All client work anonymised for confidentiality
        </p>
        <a href="#top" className="fo-navlink text-[12.5px]">Back to top ↑</a>
      </div>
    </footer>
  );
}
