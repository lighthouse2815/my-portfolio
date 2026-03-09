interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export const SectionHeader = ({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) => (
  <div className="section-header">
    <p className="section-eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {description ? <p className="section-description">{description}</p> : null}
  </div>
);
