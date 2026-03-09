import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/portfolio";
import { SectionHeader } from "./SectionHeader";

export const ContactSection = () => (
  <motion.section
    id="contact"
    className="section-container contact-section"
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6 }}
  >
    <SectionHeader
      eyebrow="CONTACT"
      title="Let’s Build Something"
      description="Open for software collaboration, internships, and creative engineering projects."
    />

    <div className="contact-grid">
      <a className="panel contact-card" href={`mailto:${profile.email}`}>
        <Mail size={20} />
        <div>
          <p>Email</p>
          <span>{profile.email}</span>
        </div>
      </a>

      <a className="panel contact-card" href="https://github.com/" target="_blank" rel="noreferrer">
        <Github size={20} />
        <div>
          <p>GitHub</p>
          <span>github.com</span>
        </div>
      </a>

      <a
        className="panel contact-card"
        href="https://linkedin.com/"
        target="_blank"
        rel="noreferrer"
      >
        <Linkedin size={20} />
        <div>
          <p>LinkedIn</p>
          <span>linkedin.com</span>
        </div>
      </a>
    </div>
  </motion.section>
);
