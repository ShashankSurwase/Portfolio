"use client";
import { motion } from "framer-motion";

export default function EditorialHero() {
  return (
    <section className="pt-44 sm:pt-52 pb-24 sm:pb-32 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="label mb-8"
          style={{ color: "var(--ed-accent)" }}
        >
          A portfolio · Issue No. 01 · 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="serif text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] tracking-tight"
          style={{
            color: "var(--ed-fg)",
            fontWeight: 400,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          A data engineer who&apos;s spent four years
          {" "}
          <em
            className="serif italic"
            style={{ color: "var(--ed-accent)", fontWeight: 400 }}
          >
            untangling
          </em>
          {" "}
          the kind of systems most
          companies pretend don&apos;t exist.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="lede mt-10 max-w-2xl"
        >
          I build data systems end-to-end — pipelines, warehouses, BI, and
          automation — across e-commerce, EdTech, and renewable energy. This
          is the long version: three industries, a few good stories, and the
          principles I work by.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a href="#story" className="btn-editorial-accent">
            Read the story
            <span aria-hidden>↓</span>
          </a>
          <a href="#contact" className="btn-editorial">
            Get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 flex items-center gap-6"
        >
          <span className="label" style={{ color: "var(--ed-fg-muted)" }}>
            By the numbers
          </span>
          <hr className="rule flex-1" />
        </motion.div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
          {[
            { v: "245",    k: "solar plants monitored" },
            { v: "$1.05M", k: "revenue recovered" },
            { v: "131",    k: "production DAGs" },
            { v: "27",     k: "automated reports" },
          ].map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.06 }}
            >
              <div
                className="serif"
                style={{
                  fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)",
                  fontWeight: 400,
                  color: "var(--ed-fg)",
                  lineHeight: 1.05,
                  fontVariationSettings: '"opsz" 72',
                }}
              >
                {s.v}
              </div>
              <div
                className="mt-1 text-[12px]"
                style={{ color: "var(--ed-fg-muted)" }}
              >
                {s.k}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
