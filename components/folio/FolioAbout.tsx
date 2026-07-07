"use client";
import { MapPin, Layers, Boxes } from "lucide-react";

const FACTS = [
  { icon: Boxes, label: "Industries", value: "E-commerce · EdTech · Renewable Energy" },
  { icon: Layers, label: "Core stack", value: "Python · SQL · Airflow · AWS" },
  { icon: MapPin, label: "Based in", value: "Pune, India · remote-first" },
];

export default function FolioAbout() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-[32px] sm:text-[40px] font-bold">About Me</h2>
          <div className="fo-underline fo-underline-center" />
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
          {/* Story */}
          <div className="space-y-5 text-[17px] leading-[1.8]">
            <p>
              I&apos;m a <strong className="fo-ink">Data Engineer &amp; Analytics Engineer</strong> who
              has spent the last five years building data systems for{" "}
              <strong className="fo-ink">fast-growing startups</strong> across e-commerce,
              edtech, and renewable energy. In each one the story was the same: the
              business was scaling fast but couldn&apos;t trust its numbers — so I built
              the whole stack that fixed that.
            </p>
            <p>
              I own <strong className="fo-ink">every layer</strong> — from raw API, IoT and
              file ingestion, through <strong className="fo-ink">Airflow orchestration and
              SQL warehouses</strong>, to the <strong className="fo-ink">Grafana, Power BI and
              Superset dashboards</strong> business teams make decisions on. What I care about
              most is <strong className="fo-ink">reliable, traceable numbers</strong>:
              schema-validated pipelines, match-rate monitoring and standards-audited KPIs,
              so every figure on the dashboard holds up.
            </p>
            <p>
              Along the way I&apos;ve <strong className="fo-ink">recovered $1.05M in lost
              revenue</strong>, cut new-source onboarding from days to hours, and taken
              <strong className="fo-ink"> 120+ hours of manual work off the table every month</strong> —
              the kind of impact that comes from owning problems end to end in a startup.
            </p>
          </div>

          {/* Quick facts */}
          <div className="fo-card p-6 sm:p-7">
            <div className="fo-kicker">Quick facts</div>
            <div className="mt-5 space-y-5">
              {FACTS.map((f) => (
                <div key={f.label} className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--fo-accent-soft)", color: "var(--fo-accent)" }}>
                    <f.icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[12.5px] fo-muted">{f.label}</div>
                    <div className="text-[15px] font-semibold fo-ink leading-snug">{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
