"use client";
import { motion } from "framer-motion";

export default function Bio() {
  return (
    <section id="story" className="px-6 lg:px-12 py-24 sm:py-32">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="label mb-6" style={{ color: "var(--ed-accent)" }}>
            01 · The Story
          </div>
          <h2
            className="serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-tight"
            style={{ color: "var(--ed-fg)", fontWeight: 400, fontVariationSettings: '"opsz" 96' }}
          >
            How I got into building things that nobody wants to see fail.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="body-prose mt-12 drop-cap"
        >
          <p>
            I&apos;m a Data Engineer and Analytics Engineer with about four
            years at a data analytics consultancy. Most of that time has been
            spent on systems that are quiet, important, and complain loudly
            when they break — ETL pipelines that feed executive dashboards,
            warehouses that hold the only correct number a finance team will
            ever cite, IoT ingestion stacks that watch real money show up or
            not show up every five minutes.
          </p>
          <p>
            I&apos;ve worked across three industries that look nothing alike on
            the surface — apparel and beauty e-commerce, K-12 coaching
            institutes, and utility-scale solar plants — and I&apos;ve learned
            that they share the same data problems underneath. Source systems
            that won&apos;t talk to each other. KPIs that look right but
            aren&apos;t. Reports that take ten people and four days when they
            should take zero people and zero minutes. My job, regardless of
            the logo on the contract, is to make those problems go away
            without anybody having to think about them.
          </p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pullquote my-12"
        >
          &ldquo;Plausible-looking numbers are the most dangerous kind of
          wrong.&rdquo;
          <footer className="mt-3 label" style={{ color: "var(--ed-fg-muted)" }}>
            something I learned auditing a 6–17× KPI error
          </footer>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="body-prose"
        >
          <p>
            The work I&apos;m proudest of is rarely the most technically
            elaborate. It&apos;s a one-line fix that recovered a million
            dollars of revenue that was hiding in a character-encoding bug.
            It&apos;s a calculation correction that made a production
            dashboard finally tell the truth after months of plausible
            lying. It&apos;s the architectural decision that turned 864,000
            Lambda invocations a month into 8,600 — same data, same
            freshness, ninety-nine percent less infrastructure.
          </p>
          <p>
            I work on what most engineers call &ldquo;the boring layer,&rdquo;
            and I believe the boring layer is where everything important
            happens. The dashboards above it are only useful when the
            plumbing underneath is rigorous, reproducible, and self-healing.
            That&apos;s what I build.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14"
        >
          <div className="label mb-4" style={{ color: "var(--ed-fg-muted)" }}>
            Principles I work by
          </div>
          <ol className="space-y-3">
            {[
              ["Automation-first.", "If a human does it more than once, it becomes a pipeline."],
              ["Validate at the boundary.", "Schema fingerprinting and match-rate gates catch corruption before it lands."],
              ["Self-healing systems.", "Greedy watermarks, retry loops, atomic upserts — robust by design, not by hope."],
              ["Validate against the standard, not against itself.", "Dashboards consistent with their own bug for months — IEC 61724 is the reference."],
              ["Business impact, measured.", "Revenue recovered. Hours saved. Errors corrected. Not lines of code."],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span
                  className="serif text-[14px] mt-1 tabular-nums flex-shrink-0"
                  style={{ color: "var(--ed-accent)", fontVariationSettings: '"opsz" 24' }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span
                    className="serif text-[17px]"
                    style={{ color: "var(--ed-fg)", fontWeight: 500 }}
                  >
                    {title}
                  </span>{" "}
                  <span className="body-prose" style={{ fontSize: "1rem", display: "inline" }}>
                    {body}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
