"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, BookOpen, Sun, X, ArrowRight, Users, Workflow } from "lucide-react";
import { DOMAINS, DomainDetail } from "@/lib/domains";

const ICONS: Record<string, typeof ShoppingCart> = {
  ecommerce: ShoppingCart,
  edtech: BookOpen,
  energy: Sun,
};

export default function FolioDomains() {
  const [active, setActive] = useState<DomainDetail | null>(null);

  // lock body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="domains" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-[30px] sm:text-[36px] font-bold">Work Experience</h2>
          <div className="fo-underline fo-underline-center" />
          <p className="mt-4 text-[14.5px] max-w-2xl mx-auto">
            Delphi Analytics · I work on multiple client projects in parallel across three
            industries. <span className="fo-ink font-medium">Click any domain to see full details</span> —
            what was built, the results, and the tools used.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {DOMAINS.map((d) => {
            const Icon = ICONS[d.id];
            return (
              <button
                key={d.id}
                onClick={() => setActive(d)}
                className="fo-card fo-card-hover p-6 text-left cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--fo-accent-soft)", color: "var(--fo-accent)" }}>
                    <Icon size={18} />
                  </span>
                  <span className="fo-chip !text-[11px] !py-1 !px-2.5">
                    <Users size={11} /> {d.clients}
                  </span>
                </div>
                <h3 className="mt-4 text-[18px] font-bold">{d.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed fo-muted">{d.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {d.metrics.slice(0, 3).map((m) => (
                    <span key={m} className="fo-tag">{m}</span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-transform group-hover:translate-x-0.5" style={{ color: "var(--fo-accent)" }}>
                  View full details <ArrowRight size={14} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            style={{ background: "rgba(24, 34, 52, 0.5)", backdropFilter: "blur(4px)" }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="folio w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
              style={{ background: "var(--fo-card)" }}
            >
              {/* Modal header */}
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 pb-4" style={{ background: "var(--fo-card)", borderBottom: "1px solid var(--fo-border)" }}>
                <div>
                  <div className="fo-chip !text-[11px] !py-1 !px-2.5 mb-2">
                    <Users size={11} /> {active.clients}
                  </div>
                  <h3 className="text-[22px] sm:text-[26px] font-bold leading-tight">{active.name}</h3>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setActive(null)}
                  className="fo-btn-light !p-2.5 !rounded-full flex-shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-6 sm:px-8 py-6 space-y-7">
                {/* Overview */}
                <p className="text-[14.5px] leading-relaxed">{active.overview}</p>

                {/* Metrics */}
                <div>
                  <div className="fo-kicker mb-3">Results</div>
                  <div className="flex flex-wrap gap-2">
                    {active.metrics.map((m) => (
                      <span key={m} className="fo-chip">{m}</span>
                    ))}
                  </div>
                </div>

                {/* Engagement groups */}
                {active.engagements.map((g) => (
                  <div key={g.title}>
                    <h4 className="text-[15.5px] font-bold fo-ink mb-2.5">{g.title}</h4>
                    <ul className="space-y-2.5">
                      {g.points.map((p) => (
                        <li key={p} className="flex gap-2.5 text-[13.5px] leading-relaxed">
                          <span className="mt-[8px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--fo-accent)" }} />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Data flow */}
                <div className="fo-card !shadow-none p-4" style={{ background: "var(--fo-bg-soft)" }}>
                  <div className="flex items-center gap-2 fo-kicker mb-2">
                    <Workflow size={13} /> How the data flows
                  </div>
                  <p className="mono text-[12px] leading-relaxed fo-muted">{active.dataFlow}</p>
                </div>

                {/* Stack */}
                <div className="pb-2">
                  <div className="fo-kicker mb-3">Tools used</div>
                  <div className="flex flex-wrap gap-1.5">
                    {active.stack.map((t) => (
                      <span key={t} className="fo-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
