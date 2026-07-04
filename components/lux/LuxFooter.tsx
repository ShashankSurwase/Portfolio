"use client";
import Link from "next/link";
import { PROFILE } from "@/lib/profile";

export default function LuxFooter() {
  return (
    <footer className="py-10" style={{ borderTop: "1px solid var(--lx-border)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[12.5px] lx-muted">
          © 2026 {PROFILE.name} · Built with Next.js · All client work anonymised
        </p>
        <div className="flex items-center gap-5 text-[12.5px]">
          <Link href="/v2" className="lx-navlink">Story mode</Link>
          <Link href="/dashboard" className="lx-navlink">Dashboard mode</Link>
          <a href="#top" className="lx-navlink">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
