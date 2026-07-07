"use client";

const STATS = [
  { value: "$1.05M", label: "Revenue recovered", desc: "for a client through one data fix" },
  { value: "131", label: "Automated pipelines", desc: "running in production daily" },
  { value: "245", label: "Solar plants monitored", desc: "with data ready in under 10 minutes" },
  { value: "120+", label: "Hours saved monthly", desc: "manual work replaced by automation" },
];

export default function FolioStats() {
  return (
    <section className="py-12" style={{ background: "var(--fo-bg-soft)", borderTop: "1px solid var(--fo-border)", borderBottom: "1px solid var(--fo-border)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <div className="text-[34px] sm:text-[40px] font-extrabold tracking-tight" style={{ color: "var(--fo-accent)" }}>
              {s.value}
            </div>
            <div className="mt-1 text-[15px] font-semibold fo-ink">{s.label}</div>
            <div className="mt-0.5 text-[13.5px] fo-muted">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
