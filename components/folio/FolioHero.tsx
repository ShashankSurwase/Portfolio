"use client";
import { ArrowRight, Mail, MapPin, Building2, GraduationCap } from "lucide-react";
import { PROFILE } from "@/lib/profile";

const FACTS = [
  { label: "Experience", value: "5+ years" },
  { label: "E-commerce clients", value: "3 brands" },
  { label: "EdTech clients", value: "2 institutes" },
  { label: "Energy clients", value: "1 solar company (245 plants)" },
];

export default function FolioHero() {
  return (
    <section id="top" className="pt-32 pb-14 sm:pt-36 sm:pb-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
        <div>
          <span className="fo-chip">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--fo-accent)" }} />
            Open to new opportunities
          </span>

          <p className="mt-6 text-[17px] font-medium" style={{ color: "var(--fo-accent)", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
            Hello, I&apos;m
          </p>
          <h1 className="mt-1 text-[38px] sm:text-[50px] leading-[1.12] font-bold">
            {PROFILE.name}
          </h1>
          <p className="mt-2 text-[19px] sm:text-[22px] font-semibold" style={{ color: "var(--fo-accent)" }}>
            {PROFILE.title}
          </p>

          <p className="mt-5 text-[15.5px] leading-relaxed max-w-2xl">
            I build complete data systems — pipelines, warehouses, dashboards,
            and automation — that businesses run on every day. In 5+ years I
            have worked with <strong className="fo-ink">6 companies across 3 industries</strong>,
            recovered <strong className="fo-ink">$1.05M in lost revenue</strong>, and eliminated{" "}
            <strong className="fo-ink">120+ hours of manual work every month</strong>.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#domains" className="fo-btn">
              See my work <ArrowRight size={15} />
            </a>
            <a href="#contact" className="fo-btn-light">
              <Mail size={15} /> Contact me
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] fo-muted">
            <span className="inline-flex items-center gap-2">
              <Building2 size={14} /> {PROFILE.company} · {PROFILE.companyLocation}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} /> Based in Pune, India · remote
            </span>
            <span className="inline-flex items-center gap-2">
              <GraduationCap size={14} /> PG-DBDA, C-DAC Pune · B.E., MIT AoE Pune
            </span>
          </div>
        </div>

        {/* Quick facts card */}
        <div className="fo-card p-6">
          <div className="fo-kicker">At a glance</div>
          <div className="mt-4 space-y-4">
            {FACTS.map((f) => (
              <div key={f.label} className="flex items-center justify-between gap-4 pb-3.5" style={{ borderBottom: "1px solid var(--fo-border)" }}>
                <span className="text-[13px] fo-muted">{f.label}</span>
                <span className="text-[13.5px] font-semibold fo-ink text-right">{f.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4">
              <span className="text-[13px] fo-muted">Core stack</span>
              <span className="text-[13.5px] font-semibold fo-ink text-right">Python · SQL · Airflow · AWS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
