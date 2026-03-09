import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { AchievementItem } from "../types";
import { SectionHeader } from "./SectionHeader";

interface AchievementsSectionProps {
  items: AchievementItem[];
}

const CountUp = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let raf = 0;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setDisplayValue(Math.round(progress * value));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <>{displayValue}</>;
};

export const AchievementsSection = ({ items }: AchievementsSectionProps) => (
  <motion.section
    id="achievements"
    className="section-container"
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
  >
    <SectionHeader
      eyebrow="ACHIEVEMENTS"
      title="Milestone Console"
      description="A compact summary of development progress and technical growth checkpoints."
    />

    <div className="achievements-grid">
      {items.map((item) => (
        <article className="panel achievement-card" key={item.title}>
          <p className="achievement-value">
            <CountUp value={item.value} />
            {item.suffix ?? ""}
          </p>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
        </article>
      ))}
    </div>
  </motion.section>
);
