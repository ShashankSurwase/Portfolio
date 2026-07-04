"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 131, suffix: "", label: "Airflow DAGs in Production" },
  { value: 245, suffix: "", label: "Solar Plants Monitored" },
  { value: 40, suffix: "+", label: "Dashboards Delivered" },
  { value: 1.05, suffix: "M", prefix: "$", label: "Revenue Recovered", decimals: 2 },
  { value: 120, suffix: "+", label: "Hrs/Month Automated" },
  { value: 31, suffix: "", label: "Source Systems Integrated" },
];

function Counter({ value, suffix = "", prefix = "", decimals = 0 }: {
  value: number; suffix?: string; prefix?: string; decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(parseFloat(start.toFixed(decimals)));
    }, step);
    return () => clearInterval(timer);
  }, [inView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="py-12 border-y theme-border-soft surface-tint">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-3xl font-bold gradient-text mb-1">
                <Counter value={s.value} suffix={s.suffix} prefix={s.prefix ?? ""} decimals={s.decimals ?? 0} />
              </div>
              <div className="text-xs theme-text-muted leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
