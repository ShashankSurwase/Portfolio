"use client";

type Status = "LIVE" | "PROD" | "ACTIVE" | "OK" | "WARN" | "ERROR" | "BETA" | "DRAFT";

const STYLE: Record<Status, { fg: string; bg: string; border: string; dot: string }> = {
  LIVE:   { fg: "var(--success)", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.30)",  dot: "var(--success)" },
  PROD:   { fg: "var(--info)",    bg: "var(--info-soft)",       border: "rgba(2,132,199,0.28)", dot: "var(--info)" },
  ACTIVE: { fg: "var(--accent)",  bg: "var(--accent-soft)",     border: "var(--border-accent)", dot: "var(--accent)" },
  OK:     { fg: "var(--success)", bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.20)", dot: "var(--success)" },
  WARN:   { fg: "var(--warning)", bg: "rgba(202,138,4,0.10)",   border: "rgba(202,138,4,0.30)", dot: "var(--warning)" },
  ERROR:  { fg: "var(--danger)",  bg: "rgba(220,38,38,0.10)",   border: "rgba(220,38,38,0.30)", dot: "var(--danger)" },
  BETA:   { fg: "var(--accent)",  bg: "var(--accent-soft)",     border: "var(--border-accent)", dot: "var(--accent)" },
  DRAFT:  { fg: "var(--fg-muted)",bg: "rgba(148,163,184,0.10)", border: "rgba(148,163,184,0.30)",dot: "var(--fg-muted)" },
};

export default function StatusPill({
  status,
  pulse = false,
}: {
  status: Status;
  pulse?: boolean;
}) {
  const s = STYLE[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 mono text-[10px] tracking-wider px-2 py-0.5 rounded-sm border tnum"
      style={{ color: s.fg, background: s.bg, borderColor: s.border }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${pulse ? "animate-pulse" : ""}`}
        style={{ background: s.dot, boxShadow: pulse ? `0 0 6px ${s.dot}` : undefined }}
      />
      {status}
    </span>
  );
}
