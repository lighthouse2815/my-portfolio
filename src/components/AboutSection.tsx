import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

interface AboutSectionProps {
  points: string[];
}

export const AboutSection = ({ points }: AboutSectionProps) => (
  <motion.section
    id="about"
    className="section-container"
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
  >
    <SectionHeader
      eyebrow="ABOUT"
      title="Developer Background"
      description="A quick profile snapshot, focused on growth, engineering quality, and long-term software craftsmanship."
    />

    <div className="about-grid">
      {points.map((point) => (
        <article className="panel about-item" key={point}>
          <span className="about-node" />
          <p>{point}</p>
        </article>
      ))}
    </div>
  </motion.section>
);
