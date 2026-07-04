"use client";
import { motion } from "framer-motion";

interface Props {
  data: number[];
  width?: number;
  height?: number;
  variant?: "accent" | "info";
  area?: boolean;
}

export default function Sparkline({
  data,
  width = 120,
  height = 36,
  variant = "accent",
  area = true,
}: Props) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });

  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const areaPath = `${path} L${width},${height} L0,${height} Z`;

  const lineClass = variant === "info" ? "spark-line spark-line-info" : "spark-line";
  const areaClass = variant === "info" ? "spark-area spark-area-info" : "spark-area";

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {area && (
        <motion.path
          d={areaPath}
          className={areaClass}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      )}
      <motion.path
        d={path}
        className={lineClass}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Last-point dot */}
      <circle
        cx={points[points.length - 1][0]}
        cy={points[points.length - 1][1]}
        r="2"
        fill={variant === "info" ? "var(--info)" : "var(--accent)"}
      />
    </svg>
  );
}
