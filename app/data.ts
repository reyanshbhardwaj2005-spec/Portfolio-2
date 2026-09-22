import type { IconName } from "./icons";

export const profile = {
  name: "Reyansh Bhardwaj",
  role: "Full-Stack & Mobile Engineer",
  status: "Available for hire",
  location: "New Delhi, India",
  tagline: "Crafting fluid digital experiences & high-performance systems",
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
    }
  | {
      kind: "spen-canvas";
      heading?: string;
    };

export type AppDef = {
  id: string;
  label: string;
  icon: IconName;
  c1: string;
  c2: string;
  dock?: boolean;
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
    c1: "#3b82f6",
    c2: "#1d4ed8",
    title: "About Reyansh",
    subtitle: profile.role,
    blocks: [
      {
        kind: "text",
        body: "I am a full-stack engineer and mobile developer passionate about building ultra-refined, interactive products that blend high engineering standards with cutting-edge visual design.",
      },
      {
        kind: "items",
        heading: "Core Highlights",
        items: [
          { title: "Specialization", sub: "React, Next.js, TypeScript, React Native & Flutter", meta: "Web & Mobile" },
          { title: "Design Philosophy", sub: "Micro-interactions, 3D Spatial UI, and 60fps animations", meta: "UI / UX" },
          { title: "Current Focus", sub: "Generative AI interfaces and high-fidelity 3D web applications", meta: "2026" },
          { title: "Languages", sub: "English, Hindi", meta: "Bilingual" },
        ],
      },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: "grid",
    c1: "#f97316",
    c2: "#c2410c",
    title: "Featured Works",
    subtitle: "Select production applications",
    blocks: [
      {
        kind: "items",
        items: [
          {
            title: "Galaxy S26 3D Portfolio",
            sub: "Interactive 3D flagship device with realistic titanium lighting, floating camera optics, and full One UI.",
            meta: "Next.js • 3D CSS",
          },
          {
            title: "Pulse Mobile Engine",
            sub: "Cross-platform health & metrics tracking app with real-time biometric graphs and offline sync.",
            meta: "Flutter • Go",
          },
          {
            title: "OmniSearch AI",
            sub: "Multimodal contextual semantic search engine powered by vector embeddings and streaming LLM responses.",
            meta: "TypeScript • Python",
          },
          {
            title: "Aura Design System",
            sub: "Comprehensive accessible component library with tokens, dark mode physics, and fluid gestures.",
            meta: "React • CSS",
          },
        ],
      },
      {
        kind: "links",
        heading: "Source Repositories",
        links: [
          { label: "View all projects on GitHub", href: "https://github.com", hint: "github.com" },
        ],
      },
    ],
  },
  {
    id: "spen-notes",
    label: "S-Pen Notes",
    icon: "spen",
    c1: "#06b6d4",
    c2: "#0e7490",
    title: "S-Pen Canvas",
    subtitle: "Interactive digital ink on 120Hz display",
    blocks: [
      {
        kind: "text",
        body: "Draw or write notes directly on the S26 Ultra screen using your cursor or touch.",
      },
      {
        kind: "spen-canvas",
        heading: "Quick Note Canvas",
      },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    icon: "code",
    c1: "#8b5cf6",
    c2: "#6d28d9",
    title: "Technical Arsenal",
    subtitle: "Modern languages, frameworks & platforms",
    blocks: [
      {
        kind: "chips",
        heading: "Frontend & 3D",
        chips: ["React", "Next.js", "TypeScript", "TailwindCSS", "Three.js / WebGL", "Framer Motion", "HTML5 Canvas"],
      },
      {
        kind: "chips",
        heading: "Mobile Architecture",
        chips: ["Android SDK", "React Native", "Flutter", "Kotlin", "SwiftUI", "Jetpack Compose"],
      },
      {
        kind: "chips",
        heading: "Backend & Cloud",
        chips: ["Node.js", "Express", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS"],
      },
      {
        kind: "chips",
        heading: "DevOps & Tooling",
        chips: ["Git", "GitHub Actions", "Vercel", "Figma", "Linux / Bash", "Jest", "Vite"],
      },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    icon: "briefcase",
    c1: "#10b981",
    c2: "#047857",
    title: "Career Journey",
    subtitle: "Roles & engineering accomplishments",
    blocks: [
      {
        kind: "items",
        items: [
          {
            title: "Senior Full-Stack Engineer",
            sub: "Architected high-throughput web applications, reducing bundle sizes by 42% and implementing real-time collaborative state.",
            meta: "2024 — Present",
          },
          {
            title: "Mobile Application Developer",
            sub: "Shipped Android & iOS applications with 100k+ downloads, optimizing memory footprint and 60fps animation render passes.",
            meta: "2023 — 2024",
          },
          {
            title: "Frontend Engineering Intern",
            sub: "Built reusable design system components, automated end-to-end integration tests, and improved Core Web Vitals to 98+.",
            meta: "2022 — 2023",
          },
        ],
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: "book",
    c1: "#eab308",
    c2: "#a16207",
    title: "Academic Background",
    blocks: [
      {
        kind: "items",
        items: [
          {
            title: "Bachelor of Technology in Computer Science",
            sub: "Focus on Distributed Systems, Algorithms, Computer Graphics and Mobile Computing.",
            meta: "2022 — 2026",
          },
          {
            title: "Certifications & Specializations",
            sub: "Advanced Android Development, Full-Stack Modern Web Architecture, Cloud Native Systems.",
            meta: "Verified",
          },
        ],
      },
    ],
  },
  {
    id: "resume",
    label: "Resume",
    icon: "file",
    c1: "#64748b",
    c2: "#334155",
    title: "Curriculum Vitae",
    subtitle: "Complete professional profile",
    blocks: [
      {
        kind: "text",
        body: "Download my complete resume with comprehensive project histories, metrics, and academic credentials.",
      },
      {
        kind: "links",
        heading: "Downloads & External View",
        links: [
          {
            label: "Download Resume (PDF)",
            href: "/resume.pdf",
            hint: "PDF format",
          },
          {
            label: "Open LinkedIn Profile",
            href: "https://linkedin.com",
            hint: "LinkedIn",
          },
        ],
      },
    ],
  },

  // Dock Apps
  {
    id: "contact",
    label: "Phone",
    icon: "phone",
    c1: "#22c55e",
    c2: "#15803d",
    dock: true,
    title: "Contact & Reach Out",
    subtitle: "Always open for exciting opportunities",
    blocks: [
      {
        kind: "links",
        heading: "Direct Communication",
        links: [
          { label: "Email Reyansh", href: "mailto:reyanshbhardwaj@example.com", hint: "Direct inbox" },
          { label: "GitHub Profile", href: "https://github.com", hint: "Code & contributions" },
          { label: "LinkedIn Connection", href: "https://linkedin.com", hint: "Professional network" },
        ],
      },
    ],
  },
  {
    id: "mail",
    label: "Messages",
    icon: "message",
    c1: "#0ea5e9",
    c2: "#0284c7",
    dock: true,
    href: "mailto:reyanshbhardwaj@example.com",
  },
  {
    id: "github",
    label: "GitHub",
    icon: "branch",
    c1: "#1e293b",
    c2: "#0f172a",
    dock: true,
    href: "https://github.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "link",
    c1: "#2563eb",
    c2: "#1d4ed8",
    dock: true,
    href: "https://linkedin.com",
  },
];
