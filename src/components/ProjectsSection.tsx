import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "../types";
import { SectionHeader } from "./SectionHeader";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => (
  <motion.section
    id="projects"
    className="section-container"
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.16 }}
    transition={{ duration: 0.6 }}
  >
    <SectionHeader
      eyebrow="PROJECTS"
      title="Mission Logs"
      description="Selected builds with practical architecture decisions and iterative delivery."
    />

    <div className="projects-grid">
      {projects.map((project) => (
        <motion.article
          key={project.title}
          className="panel project-card"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
        >
          <div className="project-preview">
            <span>{project.previewLabel}</span>
          </div>

          <div className="project-content">
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className="project-stack">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <a href={project.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  </motion.section>
);
