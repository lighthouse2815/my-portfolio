import { motion } from "framer-motion";
import type { SkillGroup } from "../types";
import { SectionHeader } from "./SectionHeader";

interface SkillsSectionProps {
  groups: SkillGroup[];
}

export const SkillsSection = ({ groups }: SkillsSectionProps) => (
  <motion.section
    id="skills"
    className="section-container"
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.16 }}
    transition={{ duration: 0.65 }}
  >
    <SectionHeader
      eyebrow="SKILLS"
      title="Tech Arsenal"
      description="Animated cards with practical confidence levels based on real project usage."
    />

    <div className="skills-grid">
      {groups.map((group) => (
        <article className="panel skill-card" key={group.title}>
          <h3>{group.title}</h3>

          <ul>
            {group.items.map((skill) => (
              <li key={skill.name}>
                <div className="skill-meta">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>

                <div className="skill-track">
                  <motion.div
                    className="skill-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </motion.section>
);
