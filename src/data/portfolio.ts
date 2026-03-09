import type {
  AchievementItem,
  ProjectItem,
  SkillGroup,
  SocialLink,
} from "../types";

export const profile = {
  name: "Nguyen Hai Dang",
  title: "Full Stack Developer",
  intro:
    "We code in the dark so that our family can live in the light.",
  about: [
    "Second-year IT student focused on building production-ready software.",
    "Passionate about software development, with a strong bias for writing maintainable code.",
    "Currently exploring advanced web applications and game development workflows.",
  ],
  email: "nguyenhaidang.dev@gmail.com",
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/lighthouse2815",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
  },
  {
    label: "Email",
    href: "mailto:alexnguyena47@gmail.com",
  },
];

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "Java", level: 87 },
      { name: "Python", level: 81 },
      { name: "C++", level: 74 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 86 },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", level: 90 },
      { name: "HTML", level: 92 },
      { name: "CSS", level: 88 },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Spring Boot", level: 79 },
      { name: "REST API", level: 84 },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", level: 85 },
      { name: "MySQL", level: 83 },
      { name: "Android Studio", level: 76 },
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Book Store Management System",
    description:
      "Full CRUD management system for inventory, users, and order flows with role-based access and reporting.",
    stack: ["Java", "MySQL", "Swing"],
    github: "https://github.com/",
    previewLabel: "Inventory + Orders UI",
  },
  {
    title: "Android Chat App",
    description:
      "Real-time messaging app with channel-based conversations, clean mobile UI, and persistent local caching.",
    stack: ["Java", "Android", "REST API"],
    github: "https://github.com/lighthouse2815/chat-app",
    previewLabel: "Realtime Chat Preview",
  },
  {
    title: "Python Platformer Game",
    description:
      "2D platformer with collision detection, level progression, score systems, and responsive controls.",
    stack: ["Python", "Pygame", "Game Logic"],
    github: "https://github.com/lighthouse2815/my-profile",
    previewLabel: "Gameplay Snapshot",
  },
];

export const achievements: AchievementItem[] = [
  {
    title: "Completed Projects",
    value: 3,
    detail: "Academic and personal software projects shipped end-to-end.",
  },
  {
    title: "Technologies Learned",
    value: 15,
    detail: "Across languages, frameworks, tooling, and developer workflows.",
  },
  {
    title: "Coding Streak",
    value: 2,
    suffix: "yrs",
    detail: "Continuous improvement through daily build-test-iterate loops.",
  },
];
