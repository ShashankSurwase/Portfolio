"use client";
import { motion } from "framer-motion";

export type StoryProps = {
  number: string;          // "I", "II", "III"
  domain: string;          // "Renewable Energy"
  title: string;           // "The day the dashboards were lying"
  dek: string;             // single-sentence summary
  body: string[];          // paragraphs
  pullquote?: string;
  stats: { v: string; k: string }[];
  tech: string[];
  reverse?: boolean;
};

export default function Story({
  number,
  domain,
  title,
  dek,
  body,
  pullquote,
  stats,
  tech,
  reverse,
}: StoryProps) {
  return (
    <article className="px-6 lg:px-12 py-20 sm:py-28 border-t" style={{ borderColor: "var(--ed-rule-soft)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header line */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-baseline">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-baseline gap-3"
            >
              <span
                className="serif italic"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 400,
                  color: "var(--ed-accent)",
                  fontVariationSettings: '"opsz" 96',
                }}
              >
                {number}
              </span>
              <span className="label" style={{ color: "var(--ed-fg-muted)" }}>
                {domain}
              </span>
            </motion.div>
          </div>
          <div className="lg:col-span-9">
            <hr className="rule" />
          </div>
        </div>

        {/* Title + dek */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2
            className="serif tracking-tight leading-[1.05]"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 400,
              color: "var(--ed-fg)",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {title}
          </h2>
          <p className="lede mt-5">{dek}</p>
        </motion.div>

        {/* Body grid */}
        <div className={`mt-12 grid lg:grid-cols-12 gap-10 lg:gap-14 ${reverse ? "lg:[direction:rtl]" : ""}`}>
          {/* Prose */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 [direction:ltr] body-prose"
          >
            {body.map((p, i) => (
              <p key={i} className={i === 0 ? "drop-cap" : ""}>{p}</p>
            ))}

            {pullquote && (
              <blockquote className="pullquote my-10">{pullquote}</blockquote>
            )}

            <div className="mt-10 pt-6 border-t" style={{ borderColor: "var(--ed-rule-soft)" }}>
              <div className="label mb-3">Tooling</div>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {tech.map((t) => (
                  <span key={t} className="text-[13px]" style={{ color: "var(--ed-fg-muted)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Side: stat block */}
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 [direction:ltr]"
          >
            <div
              className="ed-card p-7"
              style={{ background: "var(--ed-highlight)" }}
            >
              <div className="label mb-5" style={{ color: "var(--ed-accent)" }}>
                Outcomes
              </div>
              <dl className="space-y-5">
                {stats.map((s) => (
                  <div key={s.k} className="flex items-baseline gap-4 border-b pb-4 last:border-0 last:pb-0"
                    style={{ borderColor: "var(--ed-rule-soft)" }}
                  >
                    <dt
                      className="serif flex-shrink-0"
                      style={{
                        fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                        fontWeight: 400,
                        color: "var(--ed-fg)",
                        lineHeight: 1,
                        fontVariationSettings: '"opsz" 72',
                        minWidth: "5ch",
                      }}
                    >
                      {s.v}
                    </dt>
                    <dd
                      className="text-[14px] leading-snug"
                      style={{ color: "var(--ed-fg-soft)" }}
                    >
                      {s.k}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.aside>
        </div>
      </div>
    </article>
  );
}
