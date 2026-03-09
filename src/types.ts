export interface SocialLink {
  label: string;
  href: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillGroup {
  title: string;
  items: SkillItem[];
}

export interface ProjectItem {
  title: string;
  description: string;
  stack: string[];
  github: string;
  previewLabel: string;
}

export interface AchievementItem {
  title: string;
  value: number;
  suffix?: string;
  detail: string;
}

export interface VisitorDayStat {
  date: string;
  count: number;
}

export interface VisitorStats {
  total: number;
  latestVisit: string | null;
  daily: VisitorDayStat[];
}

export interface PortfolioComment {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}
