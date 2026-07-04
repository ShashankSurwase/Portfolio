"use client";
import { Mail, Phone, Link2, GitBranch, MapPin, Clock } from "lucide-react";
import { PROFILE } from "@/lib/profile";

const CHANNELS = [
  { icon: Mail, label: "Email", value: PROFILE.email, href: PROFILE.emailHref },
  { icon: Phone, label: "Phone / WhatsApp", value: PROFILE.phone, href: PROFILE.phoneHref },
  { icon: Link2, label: "LinkedIn", value: PROFILE.linkedin, href: PROFILE.linkedinHref },
  { icon: GitBranch, label: "GitHub", value: PROFILE.github, href: PROFILE.githubHref },
];

export default function FolioContact() {
  return (
    <section id="contact" className="py-16 sm:py-24" style={{ background: "var(--fo-bg-soft)", borderTop: "1px solid var(--fo-border)" }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="text-[30px] sm:text-[36px] font-bold">Contact</h2>
        <div className="fo-underline fo-underline-center" />
        <p className="mt-4 text-[16px] font-medium fo-ink">Let&apos;s work together</p>
        <p className="mt-4 text-[15px] leading-relaxed max-w-lg mx-auto">
          Open to full-time roles and consulting projects in data engineering
          and analytics. I reply within 24 hours.
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
              <span className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--fo-accent-soft)", color: "var(--fo-accent)" }}>
                <c.icon size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold tracking-widest uppercase fo-muted">{c.label}</span>
                <span className="block fo-ink text-[14.5px] font-semibold truncate mt-0.5">{c.value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[13px] fo-muted">
          <span className="inline-flex items-center gap-2"><MapPin size={13} /> Pune, India · remote</span>
          <span className="inline-flex items-center gap-2"><Clock size={13} /> Replies within 24 hours</span>
        </div>
      </div>
    </section>
  );
}
