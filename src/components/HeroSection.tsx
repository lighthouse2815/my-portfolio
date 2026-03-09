import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import type { SocialLink } from "../types";

interface HeroSectionProps {
  name: string;
  title: string;
  intro: string;
  socials: SocialLink[];
  onAvatarClick: () => void;
}

const iconMap: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export const HeroSection = ({
  name,
  title,
  intro,
  socials,
  onAvatarClick,
}: HeroSectionProps) => (
  <section id="hero" className="hero-section section-container">
    <motion.div
      className="hero-grid"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="hero-content panel">
        <p className="hero-badge">FULL STACK // PROFILE ONLINE</p>
        <h1>{name}</h1>
        <h2>{title}</h2>
        <p className="hero-intro">{intro}</p>

        <div className="hero-actions">
          {socials.map((social) => {
            const Icon = iconMap[social.label];

            return (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {Icon ? <Icon size={16} /> : null}
                {social.label}
              </a>
            );
          })}
        </div>
      </div>

      <motion.button
        className="avatar-module panel"
        type="button"
        onClick={onAvatarClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="avatar-core">
          <span>NHD</span>
        </div>
        <p>Click me x5 for hidden achievement</p>
      </motion.button>
    </motion.div>
  </section>
);
