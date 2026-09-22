import type { IconName } from "./icons";

export const profile = {
  name: "Your Name",
  role: "Full-stack developer",
  status: "Open to work",
};

export type Block =
  | { kind: "text"; body: string }
  | {
      kind: "items";
      heading?: string;
      items: { title: string; sub?: string; meta?: string }[];
    }
  | { kind: "chips"; heading: string; chips: string[] }
  | {
      kind: "links";
      heading?: string;
      links: { label: string; href: string; hint?: string }[];
    };

export type AppDef = {
  id: string;
  label: string;
  icon: IconName;
  /** gradient colours for the icon tile */
  c1: string;
  c2: string;
  /** shown in the dock instead of the grid */
  dock?: boolean;
  /** if set, tapping the icon opens this URL instead of an in-phone app */
  href?: string;
  title?: string;
  subtitle?: string;
  blocks?: Block[];
};

export const apps: AppDef[] = [
  {
    id: "about",
    label: "About",
    icon: "user",
    c1: "#5b9bff",
    c2: "#2b5bd7",
    title: "About me",
    subtitle: profile.role,
    blocks: [
      {
        kind: "text",
        body: "Write two or three sentences here: what you build, what you care about, and what you want to work on next.",
      },
      {
        kind: "items",
        heading: "Quick facts",
        items: [
          { title: "Focus", sub: "Web apps, APIs and interfaces" },
          { title: "Currently", sub: "Building this portfolio in Next.js" },
          { title: "Languages", sub: "English, Hindi" },
        ],
      },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: "grid",
    c1: "#ff9a6b",
    c2: "#e0503a",
    title: "Projects",
    subtitle: "Things I have built",
    blocks: [
      {
        kind: "items",
        items: [
          {
            title: "Project one",
            sub: "One line on what it does and the stack behind it.",
            meta: "2026",
          },
          {
            title: "Project two",
            sub: "One line on what it does and the stack behind it.",
            meta: "2025",
          },
          {
            title: "Project three",
            sub: "One line on what it does and the stack behind it.",
            meta: "2025",
          },
        ],
      },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    icon: "code",
    c1: "#a37bff",
    c2: "#5b3fd1",
    title: "Skills",
    subtitle: "Tools I use most",
    blocks: [
      {
        kind: "chips",
        heading: "Frontend",
        chips: ["React", "Next.js", "TypeScript", "CSS", "Tailwind"],
      },
      {
        kind: "chips",
        heading: "Backend",
        chips: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
      },
      {
        kind: "chips",
        heading: "Tools",
        chips: ["Git", "Docker", "Figma", "Linux"],
      },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    icon: "briefcase",
    c1: "#3fd39a",
    c2: "#178a5f",
    title: "Experience",
    subtitle: "Where I have worked",
    blocks: [
      {
        kind: "items",
        items: [
          {
            title: "Role title",
            sub: "Company name. Describe one result you delivered.",
            meta: "2025 to now",
          },
          {
            title: "Role title",
            sub: "Company name. Describe one result you delivered.",
            meta: "2024",
          },
        ],
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: "book",
    c1: "#ffc857",
    c2: "#e08a1b",
    title: "Education",
    blocks: [
      {
        kind: "items",
        items: [
          {
            title: "Degree name",
            sub: "University or college",
            meta: "2022 to 2026",
          },
        ],
      },
    ],
  },
  {
    id: "resume",
    label: "Resume",
    icon: "file",
    c1: "#7f8ea0",
    c2: "#3b4551",
    title: "Resume",
    subtitle: "PDF, one page",
    blocks: [
      {
        kind: "links",
        links: [
          {
            label: "Open resume",
            href: "/resume.pdf",
            hint: "Put resume.pdf in /public",
          },
        ],
      },
    ],
  },

  // Dock
  {
    id: "contact",
    label: "Contact",
    icon: "phone",
    c1: "#45e08f",
    c2: "#1aa35a",
    dock: true,
    title: "Contact",
    subtitle: "Best way to reach me is email",
    blocks: [
      {
        kind: "links",
        links: [
          { label: "Email", href: "mailto:you@example.com", hint: "you@example.com" },
          { label: "GitHub", href: "https://github.com/your-username", hint: "your-username" },
          { label: "LinkedIn", href: "https://linkedin.com/in/your-username", hint: "your-username" },
        ],
      },
    ],
  },
  {
    id: "mail",
    label: "Email",
    icon: "message",
    c1: "#5cb8ff",
    c2: "#1d78d6",
    dock: true,
    href: "mailto:you@example.com",
  },
  {
    id: "github",
    label: "GitHub",
    icon: "branch",
    c1: "#333941",
    c2: "#0f1114",
    dock: true,
    href: "https://github.com/your-username",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "link",
    c1: "#3a93f0",
    c2: "#185bb3",
    dock: true,
    href: "https://linkedin.com/in/your-username",
  },
];
