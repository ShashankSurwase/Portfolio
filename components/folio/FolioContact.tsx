"use client";
import React, { useState } from "react";
import { MapPin, ExternalLink, Copy, Check } from "lucide-react";
import { PROFILE } from "@/lib/profile";

const LOGO = "/Portfolio/logos";

export default function FolioContact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24"
      style={{
        background: "var(--fo-bg-soft)",
        borderTop: "1px solid var(--fo-border)",
      }}
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="text-[32px] sm:text-[40px] font-bold">Contact</h2>
        <div className="fo-underline fo-underline-center" />
        <p className="mt-4 text-[16px] font-medium fo-ink">Let&apos;s work together</p>
        <p className="mt-2 text-[15px] fo-muted leading-relaxed max-w-lg mx-auto">
          Open to full-time roles and consulting projects in data engineering and analytics.
        </p>

        {/* Contact Cards Grid */}
        <div className="mt-9 grid sm:grid-cols-2 gap-4 text-left">
          {/* 1. Email (Read & Copy — No auto-redirect) */}
          <div
            className="fo-card p-5 rounded-2xl flex items-center justify-between gap-3 transition-all hover:shadow-md"
            style={{
              background: "var(--fo-card)",
              border: "1px solid var(--fo-border)",
            }}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "var(--fo-bg-soft)",
                  border: "1px solid var(--fo-border)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${LOGO}/gmail.svg`}
                  alt="Email"
                  width={20}
                  height={20}
                  style={{ width: 20, height: 20, objectFit: "contain" }}
                />
              </span>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold tracking-widest uppercase fo-muted">
                  Email
                </span>
                <span className="block fo-ink text-[14px] sm:text-[14.5px] font-semibold truncate mt-0.5 select-all">
                  {PROFILE.email}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleCopy(PROFILE.email, "email")}
              title="Copy email address"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium flex-shrink-0 transition-all cursor-pointer"
              style={{
                background: "var(--fo-bg-soft)",
                border: "1px solid var(--fo-border)",
                color: copiedField === "email" ? "#16a34a" : "var(--fo-ink)",
              }}
            >
              {copiedField === "email" ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="fo-muted" />
                  <span className="fo-muted">Copy</span>
                </>
              )}
            </button>
          </div>

          {/* 2. Phone / WhatsApp (Read & Copy — No auto-redirect) */}
          <div
            className="fo-card p-5 rounded-2xl flex items-center justify-between gap-3 transition-all hover:shadow-md"
            style={{
              background: "var(--fo-card)",
              border: "1px solid var(--fo-border)",
            }}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "var(--fo-bg-soft)",
                  border: "1px solid var(--fo-border)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${LOGO}/whatsapp.svg`}
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  style={{ width: 20, height: 20, objectFit: "contain" }}
                />
              </span>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold tracking-widest uppercase fo-muted">
                  Phone / WhatsApp
                </span>
                <span className="block fo-ink text-[14px] sm:text-[14.5px] font-semibold truncate mt-0.5 select-all">
                  {PROFILE.phone}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleCopy(PROFILE.phone, "phone")}
              title="Copy phone number"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium flex-shrink-0 transition-all cursor-pointer"
              style={{
                background: "var(--fo-bg-soft)",
                border: "1px solid var(--fo-border)",
                color: copiedField === "phone" ? "#16a34a" : "var(--fo-ink)",
              }}
            >
              {copiedField === "phone" ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="fo-muted" />
                  <span className="fo-muted">Copy</span>
                </>
              )}
            </button>
          </div>

          {/* 3. LinkedIn (Clickable Profile without raw URL) */}
          <a
            href={PROFILE.linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="fo-card fo-card-hover p-5 rounded-2xl flex items-center justify-between gap-3 transition-all hover:shadow-md group cursor-pointer"
            style={{
              background: "var(--fo-card)",
              border: "1px solid var(--fo-border)",
            }}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "var(--fo-bg-soft)",
                  border: "1px solid var(--fo-border)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${LOGO}/linkedin.svg`}
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  style={{ width: 20, height: 20, objectFit: "contain" }}
                />
              </span>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold tracking-widest uppercase fo-muted">
                  LinkedIn
                </span>
                <span className="block fo-ink text-[14.5px] font-semibold truncate mt-0.5 group-hover:text-[var(--fo-accent)] transition-colors">
                  Shashank Surwase
                </span>
              </div>
            </div>

            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[var(--fo-muted)] group-hover:text-[var(--fo-accent)] group-hover:bg-[var(--fo-accent-soft)] transition-all"
              style={{ border: "1px solid var(--fo-border)" }}
            >
              <ExternalLink size={15} />
            </span>
          </a>

          {/* 4. GitHub (Clickable Profile without raw URL) */}
          <a
            href={PROFILE.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="fo-card fo-card-hover p-5 rounded-2xl flex items-center justify-between gap-3 transition-all hover:shadow-md group cursor-pointer"
            style={{
              background: "var(--fo-card)",
              border: "1px solid var(--fo-border)",
            }}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "var(--fo-bg-soft)",
                  border: "1px solid var(--fo-border)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${LOGO}/github.svg`}
                  alt="GitHub"
                  width={20}
                  height={20}
                  style={{ width: 20, height: 20, objectFit: "contain" }}
                />
              </span>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold tracking-widest uppercase fo-muted">
                  GitHub
                </span>
                <span className="block fo-ink text-[14.5px] font-semibold truncate mt-0.5 group-hover:text-[var(--fo-accent)] transition-colors">
                  ShashankSurwase
                </span>
              </div>
            </div>

            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[var(--fo-muted)] group-hover:text-[var(--fo-accent)] group-hover:bg-[var(--fo-accent-soft)] transition-all"
              style={{ border: "1px solid var(--fo-border)" }}
            >
              <ExternalLink size={15} />
            </span>
          </a>
        </div>

        {/* Adjusted & Elevated Pune Location Tag */}
        <div className="mt-9 flex justify-center">
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13.5px] font-medium shadow-sm transition-all"
            style={{
              background: "var(--fo-card)",
              border: "1px solid var(--fo-border)",
              color: "var(--fo-ink)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <MapPin size={16} className="text-[var(--fo-accent)] flex-shrink-0" />
            <span>Based in Pune, India · Available for Remote &amp; Hybrid Roles</span>
          </div>
        </div>
      </div>
    </section>
  );
}
