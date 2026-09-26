import type { IconName } from "./icons";

export const profile = {
  name: "Reyansh Bhardwaj",
  role: "Full-Stack & Mobile Engineer",
  status: "Available for hire",
  location: "Bengaluru, India",
  tagline: "Crafting fluid digital experiences & high-performance systems",
  email: "reyanshbhardwaj@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  spotify: "https://spotify.com",
  steam: "https://steamcommunity.com",
};

export type Block =
  | { kind: "text"; body: string }
  | {
      kind: "items";
      heading?: string;
      items: { title: string; sub?: string; meta?: string; badge?: string }[];
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
  /* ---------- ROW 1 APPS (EXACT ORDER FROM USER IMAGE) ---------- */
  {
    id: "spotify",
    label: "Spotify",
    icon: "play",
    c1: "#1ed760",
    c2: "#107535",
    title: "Spotify Player",
    subtitle: "Reyansh's Curated Coding Mix & Heavy Rotation",
    blocks: [
      {
        kind: "items",
        heading: "Now Playing & Rotation",
        items: [
          { title: "Midnight City", sub: "M83 • Hurry Up, We're Dreaming", meta: "4:03" },
          { title: "Resonance", sub: "HOME • Odyssey", meta: "3:32" },
          { title: "Starboy", sub: "The Weeknd, Daft Punk", meta: "3:50" },
          { title: "Solaris (Spatial Mix)", sub: "Hans Zimmer • Interstellar", meta: "4:45" },
          { title: "After Dark", sub: "Mr.Kitty • Time", meta: "4:19" },
        ],
      },
      {
        kind: "links",
        heading: "Spotify Connect",
        links: [
          { label: "Follow Reyansh on Spotify", href: profile.spotify, hint: "Open app" },
        ],
      },
    ],
  },
  {
    id: "tv",
    label: "TV",
    icon: "eye",
    c1: "#1f2937",
    c2: "#0f172a",
    title: "TV & Keynotes",
    subtitle: "Featured Showcases & Technical Demos",
    blocks: [
      {
        kind: "items",
        heading: "Featured Demos",
        items: [
          {
            title: "3D Spatial Web Architecture (2026)",
            sub: "Engineered ultra-realistic Grade 5 Titanium lighting physics with pure 60fps CSS 3D matrix math.",
            meta: "4K Keynote",
          },
          {
            title: "Pulse Mobile Engine: 120Hz Animations",
            sub: "Cross-platform real-time biometric telemetry visualization with zero jank render passes.",
            meta: "Tech Demo",
          },
          {
            title: "OmniSearch Multimodal AI",
            sub: "Real-time streaming LLM vectors with contextual semantic memory and graph navigation.",
            meta: "Dev Talk",
          },
        ],
      },
      {
        kind: "text",
        body: "Watch complete recorded project walkthroughs and interactive video breakdowns of my system architectures.",
      },
    ],
  },
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
        body: "Hello! I am a full-stack engineer and mobile application architect based in Bengaluru, India. I specialize in building ultra-refined, fluid digital products that marry deep engineering precision with world-class user experiences.",
      },
      {
        kind: "items",
        heading: "Core Highlights",
        items: [
          {
            title: "Specialization",
            sub: "Next.js, React 19, TypeScript, React Native & Flutter, WebGL",
            meta: "Web & Mobile",
          },
          {
            title: "Design Philosophy",
            sub: "Micro-interactions, 60fps gesture physics, 3D Spatial UI",
            meta: "Spatial UI",
          },
          {
            title: "Location",
            sub: "Bengaluru, Karnataka, India",
            meta: profile.status,
          },
          {
            title: "Languages",
            sub: "English, Hindi",
            meta: "Bilingual",
          },
        ],
      },
      {
        kind: "chips",
        heading: "Core Competencies",
        chips: [
          "Full-Stack Web",
          "Mobile iOS & Android",
          "3D Spatial UI",
          "Micro-Interactions",
          "Distributed APIs",
          "Performance Optimization",
        ],
      },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    icon: "file",
    c1: "#ff4500",
    c2: "#c02600",
    title: "Engineering Notes",
    subtitle: "Articles on Architecture, 3D Web & Mobile Systems",
    blocks: [
      {
        kind: "items",
        heading: "Latest Publications",
        items: [
          {
            title: "Building 60fps 3D Spatial Interfaces in Next.js",
            sub: "How to leverage CSS 3D transforms, viewport containers, and GPU acceleration for zero-lag 3D web apps.",
            meta: "5 min read",
          },
          {
            title: "The Art of Micro-interactions in iOS & Android",
            sub: "Creating tactile delight through haptic curves, spring physics, and intuitive gestural ergonomics.",
            meta: "4 min read",
          },
          {
            title: "Designing High-Throughput Event-Driven Backends",
            sub: "Lessons from handling millions of realtime metrics with Node.js, Go, Redis, and event queues.",
            meta: "7 min read",
          },
          {
            title: "Why Fluid Physics Matter in Modern Software",
            sub: "Why interfaces should feel like continuous physical material rather than static abrupt states.",
            meta: "3 min read",
          },
        ],
      },
    ],
  },

  /* ---------- ROW 2 APPS (EXACT ORDER FROM USER IMAGE) ---------- */
  {
    id: "settings",
    label: "Settings",
    icon: "sun",
    c1: "#94a3b8",
    c2: "#475569",
    title: "Settings & System",
    subtitle: "Galaxy S26 Ultra • One UI 8.0 • Reyansh's Device",
    blocks: [
      {
        kind: "items",
        heading: "Device Specifications",
        items: [
          { title: "Model Name", sub: "Samsung Galaxy S26 Ultra 5G", meta: "Titanium Sand" },
          { title: "One UI Version", sub: "One UI 8.0 • Android 16", meta: "Up to date" },
          { title: "Processor", sub: "Snapdragon 8 Elite Mobile Platform (3nm)", meta: "Octa-Core" },
          { title: "Display", sub: "6.8-inch Dynamic AMOLED 2X (1-120Hz Adaptive)", meta: "QHD+" },
          { title: "Storage", sub: "512 GB UFS 4.0", meta: "84.2 GB used" },
          { title: "Battery Health", sub: "5,000 mAh • Super Fast Charging 2.0", meta: "Optimal" },
        ],
      },
      {
        kind: "items",
        heading: "Portfolio Engineering Stack",
        items: [
          { title: "Framework", sub: "Next.js 15 App Router", meta: "Production" },
          { title: "3D Pipeline", sub: "Vanilla CSS 3D Hardware Accelerated", meta: "60 FPS" },
          { title: "Language", sub: "TypeScript Strict Mode", meta: "100% Typed" },
        ],
      },
    ],
  },
  {
    id: "steam",
    label: "Steam",
    icon: "grid",
    c1: "#1b2838",
    c2: "#171a21",
    title: "Steam Gaming Profile",
    subtitle: "Reyansh [DEV] • Level 48 • In-Game: Coding",
    blocks: [
      {
        kind: "items",
        heading: "Favorite Titles & Game Library",
        items: [
          {
            title: "Cyberpunk 2077: Phantom Liberty",
            sub: "Night City runner • Ray Traced Overdrive Mode",
            meta: "210 hrs",
          },
          {
            title: "Elden Ring: Shadow of the Erdtree",
            sub: "Tarnished warrior exploring the Lands Between",
            meta: "185 hrs",
          },
          {
            title: "Black Myth: Wukong",
            sub: "Destined One journeying through Chinese mythology",
            meta: "94 hrs",
          },
          {
            title: "Counter-Strike 2",
            sub: "Competitive Premier Rating: 18,500",
            meta: "540 hrs",
          },
        ],
      },
      {
        kind: "chips",
        heading: "Badges & Stats",
        chips: ["Level 48", "6+ Years of Service", "160+ Games Owned", "100% Achievements in 8 Games"],
      },
      {
        kind: "links",
        links: [
          { label: "View Steam Community Profile", href: profile.steam, hint: "steamcommunity.com" },
        ],
      },
    ],
  },
  {
    id: "whoop",
    label: "Whoop",
    icon: "palette",
    c1: "#111111",
    c2: "#000000",
    title: "Whoop 4.0 Dashboard",
    subtitle: "Recovery: 92% (Green) • Day Strain: 14.8 • Sleep: 8h 24m",
    blocks: [
      {
        kind: "items",
        heading: "Biometric Highlights",
        items: [
          { title: "Recovery Score", sub: "Prime restorative physiological state", meta: "92% Green" },
          { title: "Day Strain", sub: "Optimal target reached for cardiovascular load", meta: "14.8 Target" },
          { title: "Sleep Performance", sub: "8h 24m sleep logged (100% of sleep need met)", meta: "100%" },
          { title: "Heart Rate Variability (HRV)", sub: "+12 ms above monthly baseline", meta: "84 ms" },
          { title: "Resting Heart Rate", sub: "Cardiovascular efficiency metric", meta: "52 bpm" },
        ],
      },
      {
        kind: "items",
        heading: "Today's Strain Activities",
        items: [
          { title: "Morning 5K Outdoor Run", sub: "Avg HR: 154 bpm • Cadence 172 spm", meta: "10.4 Strain" },
          { title: "Deep Focus Engineering Sprint", sub: "3D spatial calculations & render pipeline", meta: "4.2 Strain" },
        ],
      },
    ],
  },
  {
    id: "flighty",
    label: "Flighty",
    icon: "briefcase",
    c1: "#252a34",
    c2: "#14171d",
    title: "Flighty Radar",
    subtitle: "Air India AI 504 DEL ✈ BLR • Cruising 36,000 ft",
    blocks: [
      {
        kind: "items",
        heading: "Active Flight Details",
        items: [
          { title: "Flight Number", sub: "Air India AI 504 • Star Alliance", meta: "On Time" },
          { title: "Route", sub: "DEL (Indira Gandhi Int'l) ➔ BLR (Kempegowda Int'l)", meta: "1,080 mi" },
          { title: "Aircraft", sub: "Boeing 787-9 Dreamliner • VT-EXD", meta: "36,000 ft" },
          { title: "Departure / Arrival", sub: "DEP 10:15 AM (Gate 42B) • ARR 01:00 PM (Gate 18)", meta: "42m left" },
        ],
      },
      {
        kind: "items",
        heading: "Aviation Travel Log",
        items: [
          { title: "Total Distance Flown", sub: "Equates to 1.9 trips around the globe", meta: "48,200 mi" },
          { title: "Total Flights Shipped", sub: "Domestic & International routes", meta: "26 Flights" },
          { title: "Countries Visited", sub: "India, UAE, Singapore, Japan, Germany, USA", meta: "8 Countries" },
        ],
      },
    ],
  },

  /* ---------- DOCK APPS (EXACT ORDER FROM USER IMAGE) ---------- */
  {
    id: "appstore",
    label: "App Store",
    icon: "code",
    c1: "#007aff",
    c2: "#0056b3",
    dock: true,
    title: "App Store",
    subtitle: "Featured Applications & Projects by Reyansh",
    blocks: [
      {
        kind: "items",
        heading: "Production Applications",
        items: [
          {
            title: "Galaxy S26 3D Spatial Experience",
            sub: "Interactive 3D flagship device with realistic titanium lighting, floating camera optics, and full One UI.",
            meta: "Version 2.0 • 5.0 ★",
          },
          {
            title: "Pulse Mobile Biometrics Engine",
            sub: "Cross-platform health & metrics tracking app with real-time biometric graphs and offline sync.",
            meta: "Flutter & Go • 4.9 ★",
          },
          {
            title: "OmniSearch Multimodal AI",
            sub: "Contextual semantic search engine powered by vector embeddings and streaming LLM responses.",
            meta: "Python & Next.js • 4.8 ★",
          },
          {
            title: "Aura Design System",
            sub: "Comprehensive accessible component library with tokens, dark mode physics, and fluid gestures.",
            meta: "React & CSS • 4.9 ★",
          },
        ],
      },
      {
        kind: "links",
        heading: "Source Repositories",
        links: [
          { label: "Browse All Works on GitHub", href: profile.github, hint: "github.com" },
        ],
      },
    ],
  },
  {
    id: "photos",
    label: "Photos",
    icon: "camera",
    c1: "#ffffff",
    c2: "#f8fafc",
    dock: true,
    title: "Photos Library",
    subtitle: "Setup, Architecture & Visual Explorations",
    blocks: [
      {
        kind: "items",
        heading: "Curated Albums",
        items: [
          {
            title: "Engineering Setup & Workspace",
            sub: "Minimalist dual-monitor desk, Keychron mechanical keyboard, studio lighting.",
            meta: "14 Photos",
          },
          {
            title: "Hackathons & Tech Keynotes",
            sub: "National hackathon 1st prize, speaker stage presentations, tech meetups.",
            meta: "28 Photos",
          },
          {
            title: "Bengaluru & Delhi Architecture",
            sub: "Urban geometry, dusk light, metro transit photography.",
            meta: "42 Photos",
          },
          {
            title: "UI & Spatial Design Prototypes",
            sub: "3D device models, glassmorphism interfaces, typography studies.",
            meta: "35 Photos",
          },
        ],
      },
      {
        kind: "text",
        body: "Visual explorations documenting the intersection of modern engineering, mechanical design, and travel.",
      },
    ],
  },
  {
    id: "mail",
    label: "Mail",
    icon: "message",
    c1: "#38bdf8",
    c2: "#0284c7",
    dock: true,
    title: "Direct Mail",
    subtitle: "Always open for exciting opportunities",
    blocks: [
      {
        kind: "text",
        body: "Feel free to reach out directly regarding engineering roles, contracts, architecture consulting, or creative collaborations.",
      },
      {
        kind: "links",
        heading: "Communication Channels",
        links: [
          { label: "Email Reyansh Directly", href: `mailto:${profile.email}`, hint: profile.email },
          { label: "Connect on LinkedIn", href: profile.linkedin, hint: "linkedin.com" },
          { label: "GitHub Profile", href: profile.github, hint: "github.com" },
        ],
      },
    ],
  },
  {
    id: "files",
    label: "Files",
    icon: "book",
    c1: "#ffffff",
    c2: "#f1f5f9",
    dock: true,
    title: "Files & Documents",
    subtitle: "Curriculum Vitae, Specs & Code Samples",
    blocks: [
      {
        kind: "items",
        heading: "Documents & Downloads",
        items: [
          {
            title: "Reyansh_Bhardwaj_Resume.pdf",
            sub: "Complete curriculum vitae with project histories, metrics, and academic credentials.",
            meta: "PDF • 240 KB",
          },
          {
            title: "Full_Stack_System_Architecture.pdf",
            sub: "Engineering design doc detailing distributed microservices and caching topology.",
            meta: "PDF • 1.2 MB",
          },
          {
            title: "3D_Spatial_Web_Whitepaper.pdf",
            sub: "Technical research on hardware-accelerated 3D CSS and WebGL rendering passes.",
            meta: "PDF • 890 KB",
          },
        ],
      },
      {
        kind: "links",
        heading: "Downloads & External View",
        links: [
          { label: "Download Resume (PDF)", href: "/resume.pdf", hint: "Direct PDF" },
          { label: "GitHub Repositories", href: profile.github, hint: "Open source" },
        ],
      },
    ],
  },

  /* ---------- WIDGETS & S-PEN ---------- */
  {
    id: "github",
    label: "GitHub",
    icon: "branch",
    c1: "#ffffff",
    c2: "#f3f4f6",
    title: "GitHub Contributions",
    subtitle: "Reyansh Bhardwaj • @reyanshbhardwaj",
    blocks: [
      {
        kind: "items",
        heading: "Contribution Telemetry",
        items: [
          { title: "2026 Commit Activity", sub: "Consistent daily engineering cadence", meta: "1,248 commits" },
          { title: "Longest Daily Streak", sub: "Continuous active repository contributions", meta: "42 days" },
          { title: "Public Repositories", sub: "Open source libraries, tools and starter kits", meta: "28 repos" },
        ],
      },
      {
        kind: "links",
        heading: "External Profile",
        links: [
          { label: "View Complete GitHub Profile", href: profile.github, hint: "github.com" },
        ],
      },
    ],
  },
  {
    id: "weather",
    label: "Weather",
    icon: "sun",
    c1: "#60a5fa",
    c2: "#2563eb",
    title: "Bengaluru Weather",
    subtitle: "27° Cloudy • H:29° L:20°",
    blocks: [
      {
        kind: "items",
        heading: "Atmospheric Metrics",
        items: [
          { title: "Current Temperature", sub: "Feels like 28° • Partly Cloudy", meta: "27°C" },
          { title: "Day's High / Low", sub: "Peak 2:30 PM • Low 5:00 AM", meta: "H:29° L:20°" },
          { title: "Air Quality Index", sub: "AQI 42 • Good clean air", meta: "Clean" },
          { title: "Humidity", sub: "Dew point 19°", meta: "68%" },
          { title: "Wind Speed", sub: "East-North-East gusts up to 18 km/h", meta: "12 km/h" },
          { title: "UV Index", sub: "Moderate solar radiation", meta: "5 Moderate" },
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
];
