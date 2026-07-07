"use client";
import { MapPin } from "lucide-react";
import { PROFILE } from "@/lib/profile";

const LOGO = "/Portfolio/logos";
const CHANNELS = [
  { logo: "gmail", label: "Email", value: PROFILE.email, href: PROFILE.emailHref },
  { logo: "whatsapp", label: "Phone / WhatsApp", value: PROFILE.phone, href: PROFILE.phoneHref },
  { logo: "linkedin", label: "LinkedIn", value: PROFILE.linkedin, href: PROFILE.linkedinHref },
  { logo: "github", label: "GitHub", value: PROFILE.github, href: PROFILE.githubHref },
];

export default function FolioContact() {
  return (
    <section id="contact" className="py-16 sm:py-24" style={{ background: "var(--fo-bg-soft)", borderTop: "1px solid var(--fo-border)" }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="text-[32px] sm:text-[40px] font-bold">Contact</h2>
        <div className="fo-underline fo-underline-center" />
        <p className="mt-4 text-[16px] font-medium fo-ink">Let&apos;s work together</p>
        <p className="mt-4 text-[15px] leading-relaxed max-w-lg mx-auto">
          Open to full-time roles and consulting projects in data engineering
          and analytics.
        </p>

        <div className="mt-9 grid sm:grid-cols-2 gap-4 text-left">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="fo-card fo-card-hover flex items-center gap-4 p-5"
            >
              <span className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--fo-bg-soft)", border: "1px solid var(--fo-border)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${LOGO}/${c.logo}.svg`} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "contain" }} />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold tracking-widest uppercase fo-muted">{c.label}</span>
                <span className="block fo-ink text-[14.5px] font-semibold truncate mt-0.5">{c.value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[13px] fo-muted">
          <span className="inline-flex items-center gap-2"><MapPin size={13} /> Pune, India</span>
        </div>
      </div>
    </section>
  );
}
