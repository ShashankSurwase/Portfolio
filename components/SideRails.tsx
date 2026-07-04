"use client";
import { motion } from "framer-motion";
import { GitBranch, Link2, Mail, FileText } from "lucide-react";

const SOCIALS = [
  { icon: GitBranch, label: "GitHub", href: "#" },
  { icon: Link2, label: "LinkedIn", href: "#" },
  { icon: FileText, label: "Resume", href: "/resume.pdf" },
];

export default function SideRails() {
  return (
    <>
      {/* Left rail — social icons */}
      <motion.aside
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="hidden lg:flex fixed left-8 bottom-0 flex-col items-center gap-6 z-30"
        aria-label="Social links"
      >
        <ul className="flex flex-col items-center gap-5">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className="theme-text-muted hover:text-emerald-500 dark:hover:text-emerald-400 hover:-translate-y-1 transition-all inline-flex items-center justify-center"
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>
        <div
          className="w-px h-28 bg-current opacity-25"
          style={{ color: "var(--fg-muted)" }}
        />
      </motion.aside>

      {/* Right rail — rotated email */}
      <motion.aside
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="hidden lg:flex fixed right-8 bottom-0 flex-col items-center gap-6 z-30"
        aria-label="Contact"
      >
        <a
          href="#contact"
          className="theme-text-muted hover:text-emerald-500 dark:hover:text-emerald-400 hover:-translate-y-1 transition-all font-mono text-xs tracking-widest"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="inline-flex items-center gap-2">
            <Mail size={14} />
            get in touch
          </span>
        </a>
        <div
          className="w-px h-28 bg-current opacity-25"
          style={{ color: "var(--fg-muted)" }}
        />
      </motion.aside>
    </>
  );
}
