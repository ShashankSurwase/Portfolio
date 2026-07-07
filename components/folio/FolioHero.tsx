"use client";
import { ArrowRight, Mail, GraduationCap } from "lucide-react";
import { PROFILE } from "@/lib/profile";

// Site is served under /Portfolio (see next.config.ts basePath); static assets need the prefix.
const BASE = "/Portfolio";

// Brand logos (lucide has no brand icons in this version) — inline SVG marks.
function LinkedInIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function GithubIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.2 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.24 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.22.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
    </svg>
  );
}

const SOCIALS = [
  { icon: LinkedInIcon, label: "LinkedIn", href: PROFILE.linkedinHref },
  { icon: GithubIcon, label: "GitHub", href: PROFILE.githubHref },
  { icon: Mail, label: "Email", href: PROFILE.emailHref },
];

export default function FolioHero() {
  return (
    <section id="top" className="pt-32 pb-14 sm:pt-36 sm:pb-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-14 items-center">
        <div className="min-w-0">
          <p className="text-[17px] font-medium" style={{ color: "var(--fo-accent)", fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
            Hello, I&apos;m
          </p>
          <h1 className="mt-1 text-[34px] sm:text-[54px] leading-[1.1] font-bold break-words">
            {PROFILE.name}
          </h1>
          <p className="mt-2.5 text-[21px] sm:text-[25px] font-semibold" style={{ color: "var(--fo-accent)" }}>
            {PROFILE.title}
          </p>

          <p className="mt-6 text-[17px] leading-[1.75] max-w-2xl">
            I build complete data systems — pipelines, warehouses, dashboards,
            and automation — that businesses run on every day. Over 5+ years, as
            the data engineer inside a data-analytics consultancy, I&apos;ve built the
            full stack for <strong className="fo-ink">6 client companies across 3 industries</strong>,
            recovered <strong className="fo-ink">$1.05M in lost revenue</strong>, and eliminated{" "}
            <strong className="fo-ink">120+ hours of manual work every month</strong>.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#projects" className="fo-btn">
              See my work <ArrowRight size={15} />
            </a>
            <a href="#contact" className="fo-btn-light">
              <Mail size={15} /> Contact me
            </a>
          </div>

          {/* Social icons */}
          <div className="mt-8 flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full transition-all"
                style={{ background: "var(--fo-card)", border: "1px solid var(--fo-border)", color: "var(--fo-ink)" }}
              >
                <s.icon size={19} />
              </a>
            ))}
          </div>

          {/* Education — side by side */}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14.5px] fo-muted">
            <span className="inline-flex items-center gap-2">
              <GraduationCap size={15} /> PG-DBDA, C-DAC Pune
            </span>
            <span className="inline-flex items-center gap-2">
              <GraduationCap size={15} /> B.E. Electronics, MIT Pune
            </span>
          </div>
        </div>

        {/* Photo */}
        <div className="w-full max-w-[380px] mx-auto lg:mx-0 lg:ml-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/profile.jpg`}
            alt={`Portrait of ${PROFILE.name}`}
            width={420}
            height={520}
            className="fo-photo w-full"
            style={{ aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "top center" }}
          />
        </div>
      </div>
    </section>
  );
}
