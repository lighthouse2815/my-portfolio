import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { VisitorStats } from "../types";
import { SectionHeader } from "./SectionHeader";

interface VisitorStatsSectionProps {
  stats: VisitorStats | null;
}

const AnimatedNumber = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);
  const previousValue = useRef(0);

  useEffect(() => {
    const duration = 850;
    const startValue = previousValue.current;
    const start = performance.now();
    let raf = 0;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const nextValue = Math.round(startValue + (value - startValue) * progress);
      setDisplay(nextValue);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        previousValue.current = value;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <>{display}</>;
};

export const VisitorStatsSection = ({ stats }: VisitorStatsSectionProps) => {
  const peak = useMemo(() => {
    if (!stats?.daily.length) {
      return 1;
    }

    return Math.max(1, ...stats.daily.map((item) => item.count));
  }, [stats]);

  return (
    <motion.section
      id="analytics"
      className="section-container"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65 }}
    >
      <SectionHeader
        eyebrow="ANALYTICS"
        title="Visitor Statistics"
        description="Live backend-driven traffic counter with last 7-day activity chart."
      />

      <div className="analytics-grid">
        <article className="panel total-visitors">
          <p className="analytics-label">Total Visitors</p>
          <p className="analytics-total">
            <AnimatedNumber value={stats?.total ?? 0} />
          </p>
          <p className="analytics-subtext">
            {stats?.latestVisit
              ? `Latest visit: ${new Date(stats.latestVisit).toLocaleString()}`
              : "No visits recorded yet."}
          </p>
        </article>

        <article className="panel visitors-chart">
          <p className="analytics-label">7-Day Activity</p>

          <div className="chart-bars">
            {(stats?.daily ?? []).map((point) => (
              <div key={point.date} className="chart-item">
                <motion.div
                  className="chart-bar"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(point.count / peak) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                <span>{point.date.slice(5)}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </motion.section>
  );
};
