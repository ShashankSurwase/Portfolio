"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Link2, GitBranch, Send, CheckCircle, MapPin, Clock } from "lucide-react";
import Panel from "./dashboard/Panel";
import StatusPill from "./dashboard/StatusPill";
import { PROFILE } from "@/lib/profile";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  // No backend on static hosting — compose the message in the visitor's own
  // email client instead of pretending to submit.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `${PROFILE.emailHref}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="px-4 sm:px-6 py-6">
      <Panel
        name="panel.contact"
        meta="status: open to opportunities · reply within 24h"
        actions={<StatusPill status="LIVE" pulse />}
      >
        <h2 className="text-2xl sm:text-3xl font-bold theme-text-primary tracking-tight mb-1">
          Contact <span className="theme-text-accent">/</span> let&apos;s build something
        </h2>
        <p className="theme-text-muted text-sm mb-6">
          Drop a message — I reply within a day. Or reach me via the links on
          the right.
        </p>

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-6">
          {/* Form panel */}
          <div className="panel">
            <div className="panel-header">
              <span><span className="theme-text-accent">POST</span> /contact/submit</span>
              <span className="theme-text-faint">application/json</span>
            </div>
            <div className="p-5">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle size={40} className="theme-text-success mb-3" />
                  <h3 className="text-base font-semibold theme-text-primary mb-1">Email draft opened</h3>
                  <p className="text-sm theme-text-muted">
                    Your email app should now have the message ready — just hit send.
                    Or write directly to <span className="theme-text-accent">{PROFILE.email}</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Field
                    label="name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="Your name"
                  />
                  <Field
                    label="email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    placeholder="you@company.com"
                  />
                  <FieldTextarea
                    label="message"
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                    placeholder="Tell me about the role, project, or opportunity…"
                  />
                  <button type="submit" className="btn-accent">
                    <Send size={12} /> send_email()
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links + meta */}
          <div className="space-y-3">
            {[
              { icon: Mail,      label: "Email",    value: PROFILE.email,    href: PROFILE.emailHref,    color: "var(--accent)" },
              { icon: Phone,     label: "Phone",    value: PROFILE.phone,    href: PROFILE.phoneHref,    color: "var(--success)" },
              { icon: Link2,     label: "LinkedIn", value: PROFILE.linkedin, href: PROFILE.linkedinHref, color: "var(--info)" },
              { icon: GitBranch, label: "GitHub",   value: PROFILE.github,   href: PROFILE.githubHref,   color: "var(--fg-secondary)" },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={`${link.label}: ${link.value}`}
                className="panel panel-hover flex items-center gap-3 px-4 py-3 group"
              >
                <div
                  className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent-soft)" }}
                >
                  <link.icon size={15} style={{ color: link.color }} />
                </div>
                <div className="min-w-0">
                  <div className="mono text-[10px] uppercase tracking-wider theme-text-muted">{link.label}</div>
                  <div className="text-[12.5px] theme-text-secondary group-hover:theme-text-accent truncate transition-colors">
                    {link.value}
                  </div>
                </div>
              </motion.a>
            ))}

            <div className="panel">
              <div className="panel-header">
                <span><span className="theme-text-accent">meta</span> / availability</span>
                <span className="theme-text-faint">snapshot</span>
              </div>
              <div className="p-4 space-y-2.5 text-[12.5px]">
                <div className="flex items-center gap-2 theme-text-secondary">
                  <MapPin size={12} className="theme-text-muted" />
                  {PROFILE.location}
                </div>
                <div className="flex items-center gap-2 theme-text-secondary">
                  <Clock size={12} className="theme-text-muted" />
                  Response time: &lt; 24h
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {["Remote-first", "Open to relocation", "Consulting OK", "Full-time"].map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mono text-[10.5px] uppercase tracking-wider theme-text-muted mb-1.5 block">
        {label}
      </label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm px-3 py-2.5 text-sm theme-text-primary placeholder:theme-text-faint focus:outline-none transition-colors"
        style={{
          background: "var(--bg-base)",
          border: "1px solid var(--border-soft)",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-soft)")}
        placeholder={placeholder}
      />
    </div>
  );
}

function FieldTextarea({ label, value, onChange, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mono text-[10.5px] uppercase tracking-wider theme-text-muted mb-1.5 block">
        {label}
      </label>
      <textarea
        required
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm px-3 py-2.5 text-sm theme-text-primary placeholder:theme-text-faint focus:outline-none transition-colors resize-none"
        style={{
          background: "var(--bg-base)",
          border: "1px solid var(--border-soft)",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-soft)")}
        placeholder={placeholder}
      />
    </div>
  );
}
