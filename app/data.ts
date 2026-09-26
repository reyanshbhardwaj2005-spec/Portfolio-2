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
        heading: "Now Playing & Heavy Rotation",
        items: [
          { title: "Midnight City", sub: "M83 • Hurry Up, We're Dreaming", meta: "4:03" },
          { title: "Resonance", sub: "HOME • Odyssey", meta: "3:32" },
          { title: "Starboy", sub: "The Weeknd, Daft Punk", meta: "3:50" },
          { title: "Solaris (Spatial Mix)", sub: "Hans Zimmer • Interstellar", meta: "4:45" },
          { title: "After Dark", sub: "Mr.Kitty • Time", meta: "4:19" },
          { title: "Nightcall", sub: "Kavinsky • OutRun", meta: "4:19" },
          { title: "Veridis Quo", sub: "Daft Punk • Discovery", meta: "5:45" },
        ],
      },
      {
        kind: "items",
        heading: "Curated Coding Playlists",
        items: [
          { title: "Deep Focus Ambient", sub: "128 tracks • Zero-distraction binaural synths", meta: "8h 40m" },
          { title: "Synthwave Night Drives", sub: "94 tracks • Retrofuturistic 80s arpeggios", meta: "6h 15m" },
          { title: "Cinematic Orchestral Builds", sub: "62 tracks • Film score coding energy", meta: "4h 30m" },
        ],
      },
      {
        kind: "chips",
        heading: "Audio Engine & Hi-Fi Fidelity",
        chips: ["24-bit / 96kHz FLAC", "Dolby Atmos Spatial", "Equalizer: Studio V-Shape", "Offline Cache: 32 GB"],
      },
      {
        kind: "links",
        heading: "Spotify Connect",
        links: [
          { label: "Follow Reyansh on Spotify", href: profile.spotify, hint: "Open profile" },
          { label: "Listen to Coding Playlist", href: profile.spotify, hint: "Launch player" },
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
        heading: "Featured Architecture Demos",
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
          {
            title: "Aura Design System Micro-Physics",
            sub: "Building spring-damped gesture controllers and haptic response curves for touch screens.",
            meta: "Workshop",
          },
        ],
      },
      {
        kind: "items",
        heading: "Conference Presentations",
        items: [
          { title: "React India Keynote", sub: "Next.js App Router performance at scale • Bengaluru", meta: "2025" },
          { title: "GDG DevFest Speaker", sub: "Flutter & WebGL interoperability patterns • Delhi", meta: "2024" },
          { title: "FOSS United Meetup", sub: "Building distributed local-first sync systems • Online", meta: "2024" },
        ],
      },
      {
        kind: "text",
        body: "Recorded project walkthroughs, architectural teardowns, and interactive video breakdowns of my system architectures.",
      },
      {
        kind: "chips",
        heading: "Media Specs & Streams",
        chips: ["4K UHD 60fps", "HDR10+ Mastering", "AV1 Codec", "Spatial Audio 7.1"],
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
            sub: "Next.js 15, React 19, TypeScript, React Native & Flutter, WebGL",
            meta: "Full Stack",
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
        kind: "items",
        heading: "Professional Experience",
        items: [
          {
            title: "Senior Full-Stack Engineer",
            sub: "Leading architecture for high-concurrency cloud applications and real-time interactive interfaces.",
            meta: "2023 - Present",
          },
          {
            title: "Mobile Systems Architect",
            sub: "Engineered zero-jank iOS and Android applications with offline-first local synchronization.",
            meta: "2021 - 2023",
          },
          {
            title: "Frontend & UI/UX Specialist",
            sub: "Crafted design systems, micro-interactions, and accessible web platforms for high-growth tech startups.",
            meta: "2019 - 2021",
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
          "Cloud Infrastructure",
          "TypeScript Strict",
        ],
      },
      {
        kind: "items",
        heading: "Education & Credentials",
        items: [
          {
            title: "B.Tech in Computer Science & Engineering",
            sub: "First Class with Distinction • Focus on Distributed Systems & Graphics",
            meta: "Honors Graduate",
          },
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
          {
            title: "Mastering Subpixel Font Antialiasing in Chromium",
            sub: "Deep dive into Skia raster scales, ClearType subpixel rendering, and composited 3D planes.",
            meta: "6 min read",
          },
        ],
      },
      {
        kind: "items",
        heading: "Technical Case Studies",
        items: [
          {
            title: "Optimizing Time-To-First-Byte (TTFB) on Edge",
            sub: "Streaming SSR, edge caching, and incremental static revalidation strategies.",
            meta: "Architecture",
          },
          {
            title: "State Management Without Framework Bloat",
            sub: "Using lightweight reactive stores and URL query params as single source of truth.",
            meta: "Best Practices",
          },
        ],
      },
      {
        kind: "chips",
        heading: "Topics & Tags",
        chips: ["3D Web", "Performance", "React 19", "System Architecture", "Typography", "Gesture Physics"],
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
          { title: "RAM", sub: "16 GB LPDDR5X + 8 GB RAM Plus", meta: "High Speed" },
          { title: "Battery Health", sub: "5,000 mAh • Super Fast Charging 2.0", meta: "Optimal" },
        ],
      },
      {
        kind: "items",
        heading: "Display & Visual Engine",
        items: [
          { title: "Resolution Mode", sub: "Native Quad HD+ (3120 x 1440) Ultra Sharp", meta: "Active" },
          { title: "Motion Smoothness", sub: "Adaptive 1Hz - 120Hz LTPO Refresh Rate", meta: "120Hz" },
          { title: "Eye Comfort Shield", sub: "Adaptive blue light filter with circadian adjustment", meta: "On" },
          { title: "Peak Brightness", sub: "2,600 nits Outdoor Vision Booster", meta: "Auto" },
        ],
      },
      {
        kind: "items",
        heading: "Portfolio Engineering Stack",
        items: [
          { title: "Framework", sub: "Next.js 15 App Router", meta: "Production" },
          { title: "3D Pipeline", sub: "Vanilla CSS 3D Hardware Accelerated", meta: "60 FPS" },
          { title: "Language", sub: "TypeScript Strict Mode", meta: "100% Typed" },
          { title: "Styling Engine", sub: "Tailored Vanilla CSS Tokens & Layouts", meta: "Custom" },
        ],
      },
      {
        kind: "chips",
        heading: "Connected Radios & Peripherals",
        chips: ["Wi-Fi 7 Ready", "5G Sub-6 & mmWave", "Bluetooth 5.4 LE", "Ultra-Wideband (UWB)", "NFC"],
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
          {
            title: "Hollow Knight: Silksong",
            sub: "Anticipated indie masterpiece on wishlist",
            meta: "Wishlist #1",
          },
        ],
      },
      {
        kind: "items",
        heading: "Battle Station & Rig Hardware",
        items: [
          { title: "Graphics Card", sub: "NVIDIA GeForce RTX 4090 24GB VRAM", meta: "4K 144Hz" },
          { title: "Processor", sub: "AMD Ryzen 9 7950X3D 16-Core / 32-Thread", meta: "5.7 GHz" },
          { title: "Memory", sub: "64 GB G.Skill Trident Z5 DDR5-6000", meta: "Dual Channel" },
          { title: "Monitor", sub: "Samsung Odyssey OLED G9 49-inch Curved", meta: "240Hz 0.03ms" },
        ],
      },
      {
        kind: "chips",
        heading: "Badges & Stats",
        chips: ["Level 48", "6+ Years of Service", "160+ Games Owned", "100% Achievements in 8 Games", "Community Contributor"],
      },
      {
        kind: "links",
        heading: "Community & Steam Connect",
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
          { title: "Skin Temperature", sub: "0.2°F below baseline", meta: "Normal" },
          { title: "Blood Oxygen (SpO2)", sub: "Optimal arterial saturation", meta: "98%" },
        ],
      },
      {
        kind: "items",
        heading: "Sleep Architecture Breakdown",
        items: [
          { title: "Deep / SWS Sleep", sub: "Cellular repair and physical recovery", meta: "2h 15m (27%)" },
          { title: "REM Sleep", sub: "Mental clarity, memory consolidation, cognitive focus", meta: "2h 45m (33%)" },
          { title: "Light Sleep", sub: "Transitional restful state", meta: "3h 24m (40%)" },
          { title: "Awake Time", sub: "Minimal sleep disruptions logged", meta: "18 mins" },
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
      {
        kind: "chips",
        heading: "Weekly Trends",
        chips: ["Avg Recovery: 86%", "Weekly Strain: 98.4", "Consistency: 96%", "Sleep Debt: 0m"],
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
          { title: "Ground Speed", sub: "Tailwind boost +38 kts", meta: "542 mph" },
          { title: "Cabin Atmosphere", sub: "Cabin altitude 6,000 ft • Humidity 15%", meta: "Comfortable" },
        ],
      },
      {
        kind: "items",
        heading: "Upcoming Flights",
        items: [
          { title: "Singapore Airlines SQ 503", sub: "BLR ➔ SIN • Airbus A350-900", meta: "Dec 14" },
          { title: "Singapore Airlines SQ 32", sub: "SIN ➔ SFO • Airbus A350-900 ULR", meta: "Dec 15" },
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
      {
        kind: "chips",
        heading: "Aircraft Types Flown",
        chips: ["Boeing 787-9", "Airbus A350-900", "Boeing 777-300ER", "Airbus A321neo", "Boeing 737 MAX 8"],
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
        heading: "Featured Flagship Applications",
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
        kind: "items",
        heading: "Developer Release Notes",
        items: [
          {
            title: "S26 Spatial v2.4 Release",
            sub: "Hardware-accelerated telephoto camera perspective, touch drag scrolling, zero blur.",
            meta: "Latest Build",
          },
          {
            title: "Pulse Engine v1.8 Performance Patch",
            sub: "Reduced battery consumption during high-frequency Bluetooth sync by 45%.",
            meta: "Patch",
          },
        ],
      },
      {
        kind: "chips",
        heading: "Developer Badges",
        chips: ["Verified Developer", "150k+ Total Installs", "100% Crash-Free Rate", "Top Rated 2025"],
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
        heading: "Curated Photography Albums",
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
        kind: "items",
        heading: "S26 Ultra Camera System EXIF",
        items: [
          { title: "200MP Main Wide Sensor", sub: "1/1.3-inch sensor • f/1.7 aperture • OIS multi-directional", meta: "24mm eq" },
          { title: "50MP 5x Periscope Telephoto", sub: "Dual pixel PDAF • f/3.4 aperture • 100x Space Zoom", meta: "115mm eq" },
          { title: "12MP Ultra-Wide Macro", sub: "120° FOV • Super Steady Video stabilization", meta: "13mm eq" },
        ],
      },
      {
        kind: "text",
        body: "Visual explorations documenting the intersection of modern engineering, mechanical design, urban geometry, and travel.",
      },
      {
        kind: "chips",
        heading: "Color & Processing Profiles",
        chips: ["ProRAW 16-bit DNG", "Natural Leica Look", "Cinematic Film Grain", "ACES Color Pipeline"],
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
        body: "Feel free to reach out directly regarding engineering roles, contracts, architecture consulting, or creative collaborations. I typically respond within 24 hours.",
      },
      {
        kind: "items",
        heading: "Consulting & Role Focus",
        items: [
          { title: "Full-Stack System Architecture", sub: "Next.js, Node.js, distributed caches, high-throughput microservices", meta: "Core" },
          { title: "High-Fidelity 3D Web & Canvas", sub: "Interactive WebGL, Three.js, CSS 3D matrix math, GPU optimization", meta: "Specialty" },
          { title: "Mobile Application Engineering", sub: "React Native & Flutter architecture, gesture animations, offline sync", meta: "Mobile" },
        ],
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
      {
        kind: "chips",
        heading: "Availability & Working Hours",
        chips: ["Open for Full-Time", "Open for Contracts", "Timezone: IST (UTC+5:30)", "Remote Global Friendly"],
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
          {
            title: "Biometrics_Engine_Spec.pdf",
            sub: "Bluetooth Low Energy protocol specifications and offline sync schemas.",
            meta: "PDF • 450 KB",
          },
        ],
      },
      {
        kind: "items",
        heading: "Certifications & Credentials",
        items: [
          { title: "AWS Certified Solutions Architect", sub: "Issued by Amazon Web Services • Associate level", meta: "Certified" },
          { title: "Google Cloud Professional Architect", sub: "Cloud infrastructure, distributed databases, security", meta: "Certified" },
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
      {
        kind: "chips",
        heading: "Storage Metrics",
        chips: ["Encrypted Vault AES-256", "Cloud Sync Enabled", "512 GB Total Capacity"],
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
          { title: "Pull Requests Merged", sub: "Cross-repository contributions and code reviews", meta: "114 PRs" },
          { title: "Code Reviews Submitted", sub: "Rigorous typing, unit tests, and performance audits", meta: "86 reviews" },
        ],
      },
      {
        kind: "items",
        heading: "Pinned Open-Source Repositories",
        items: [
          { title: "s26-ultra-spatial-portfolio", sub: "Zero-dependency CSS 3D mobile simulator with realistic lighting", meta: "TypeScript • 180 ★" },
          { title: "pulse-biometrics-engine", sub: "Real-time BLE telemetry visualization engine with reactive stores", meta: "Flutter/Go • 340 ★" },
          { title: "omni-vector-search", sub: "Streaming multimodal vector embedding indexing and retrieval", meta: "Python/TS • 220 ★" },
          { title: "aura-design-system", sub: "Accessible component primitives with tactile spring physics", meta: "React • 150 ★" },
        ],
      },
      {
        kind: "chips",
        heading: "Languages & Distribution",
        chips: ["TypeScript (62%)", "Go (18%)", "Rust (10%)", "Python (6%)", "CSS/GLSL (4%)"],
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
        heading: "Current Atmospheric Metrics",
        items: [
          { title: "Current Temperature", sub: "Feels like 28° • Partly Cloudy", meta: "27°C" },
          { title: "Day's High / Low", sub: "Peak 2:30 PM • Low 5:00 AM", meta: "H:29° L:20°" },
          { title: "Air Quality Index", sub: "AQI 42 • Good clean air", meta: "Clean" },
          { title: "Humidity", sub: "Dew point 19°", meta: "68%" },
          { title: "Wind Speed", sub: "East-North-East gusts up to 18 km/h", meta: "12 km/h" },
          { title: "Barometric Pressure", sub: "Stable atmospheric pressure", meta: "1012 hPa" },
          { title: "UV Index", sub: "Moderate solar radiation", meta: "5 Moderate" },
          { title: "Visibility", sub: "Clear horizon line", meta: "10 km" },
        ],
      },
      {
        kind: "items",
        heading: "7-Day Extended Forecast",
        items: [
          { title: "Today (Tuesday)", sub: "Partly cloudy with pleasant evening breeze", meta: "29° / 20°" },
          { title: "Wednesday", sub: "Scattered clouds with sunshine intervals", meta: "28° / 19°" },
          { title: "Thursday", sub: "Passing afternoon rain shower", meta: "26° / 19°" },
          { title: "Friday", sub: "Clear skies with bright sunny morning", meta: "29° / 20°" },
          { title: "Saturday", sub: "Pleasant weekend weather", meta: "28° / 18°" },
          { title: "Sunday", sub: "Partly cloudy, mild breeze", meta: "27° / 19°" },
          { title: "Monday", sub: "Sunny conditions throughout the day", meta: "29° / 20°" },
        ],
      },
      {
        kind: "items",
        heading: "Sun & Astronomy Cycle",
        items: [
          { title: "Sunrise", sub: "First light at dawn", meta: "06:08 AM" },
          { title: "Sunset", sub: "Golden hour twilight", meta: "06:19 PM" },
          { title: "Moon Phase", sub: "Illumination 34%", meta: "Waxing Crescent" },
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
        body: "Draw or write notes directly on the S26 Ultra screen using your cursor or touch. Select colors below and tap Clear to wipe the canvas.",
      },
      {
        kind: "spen-canvas",
        heading: "Quick Note Canvas",
      },
      {
        kind: "items",
        heading: "Recent Notes & Sketches",
        items: [
          { title: "3D Lighting Vector Equations", sub: "World-to-local matrix transformation dot products", meta: "2h ago" },
          { title: "Pulse App Navigation Architecture", sub: "Bottom tab bar flow with gesture dismiss modals", meta: "Yesterday" },
          { title: "Coffee & Meeting Checklist", sub: "Coffee roasters meetup in Indiranagar, Bengaluru", meta: "3 days ago" },
          { title: "S26 Ultra S-Pen Protrusion Geometry", sub: "Side profile bevel angles and titanium silo clearance", meta: "Sep 22" },
        ],
      },
      {
        kind: "chips",
        heading: "S-Pen Air Actions & Features",
        chips: ["4,096 Pressure Levels", "2.8ms Latency", "Air Command Menu", "Screen Off Memo", "Bluetooth Remote"],
      },
    ],
  },
];
