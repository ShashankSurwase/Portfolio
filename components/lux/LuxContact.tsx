"use client";
import { motion } from "framer-motion";
import { Mail, Phone, Link2, GitBranch, MapPin, Clock } from "lucide-react";
import { PROFILE } from "@/lib/profile";

const CHANNELS = [
  { icon: Mail, label: "Email", value: PROFILE.email, href: PROFILE.emailHref },
  { icon: Phone, label: "Phone / WhatsApp", value: PROFILE.phone, href: PROFILE.phoneHref },
  { icon: Link2, label: "LinkedIn", value: PROFILE.linkedin, href: PROFILE.linkedinHref },
  { icon: GitBranch, label: "GitHub", value: PROFILE.github, href: PROFILE.githubHref },
];

export default function LuxContact() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28"
      style={{ background: "var(--lx-bg-soft)", borderTop: "1px solid var(--lx-border)" }}
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <span className="lx-kicker">Contact</span>
        <h2 className="lx-serif lx-ink mt-3 text-[32px] sm:text-[44px] font-bold tracking-tight leading-tight">
          Have a data problem worth solving?{" "}
          <em className="lx-accent">Let&apos;s talk.</em>
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed max-w-xl mx-auto">
          Open to full-time roles and consulting engagements — data engineering,
          analytics engineering, and BI. I reply within 24 hours.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4 text-left">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="lx-card lx-card-hover flex items-center gap-4 p-5"
            >
              <span
                className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--lx-accent-soft)", color: "var(--lx-accent)" }}
              >
                <c.icon size={18} />
              </span>
              <span className="min-w-0">
                <span className="block mono text-[10px] font-semibold tracking-[0.16em] uppercase lx-muted">
                  {c.label}
                </span>
                <span className="block lx-ink text-[14.5px] font-medium truncate mt-0.5">{c.value}</span>
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[13px] lx-muted">
          <span className="inline-flex items-center gap-2"><MapPin size={13} /> {PROFILE.location}</span>
          <span className="inline-flex items-center gap-2"><Clock size={13} /> Response within 24 hours</span>
        </div>
      </div>
    </section>
  );
}
