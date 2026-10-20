import type { IconName } from "./icons";

export const profile = {
  name: "Reyansh Bhardwaj",
  role: "Full-Stack & Mobile Engineer",
  avatar: "/avatar.jpg",
  status: "Available for hire",
  location: "Meerut, India",
  tagline: "Crafting fluid digital experiences & high-performance systems",
  github: "https://github.com/reyanshbhardwaj2005-spec",
  linkedin: "https://www.linkedin.com/in/reyansh-bhardwaj-6b2b59384/",
  x: "https://x.com/ReyanshB292",
  spotify: "https://spotify.com",
  steam: "https://steamcommunity.com",
};

export const settingsProfile = {
  name: "Reyansh Bhardwaj",
  subtitle: "Engineer + Occasional Designer",
  avatar: "/avatar.jpg",
};

export type Block =
  | { kind: "text"; body: string }
  | {
      kind: "items";
      heading?: string;
      items: { title: string; sub?: string; meta?: string; badge?: string; image?: string }[];
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
    }
  | {
      kind: "elsewhere";
      heading?: string;
    };

/* =========================================================================
   PHOTOS APP DATA (REAL ANDROID GALLERY EXPERIENCE)
   👉 Easily replace any `url` below with your own images (e.g. "/my-photo.jpg"
      or any external photo URL).
   ========================================================================= */

export type PhotoItem = {
  id: string;
  url: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  group: string; // "Today" | "Yesterday" | "October 2026" | "September 2026"
  album: string; // "Camera" | "Gin & Tonic 🐱" | "Running & Races" | "Workspaces" | "Architecture"
  exif?: {
    camera: string;
    lens: string;
    settings: string;
    resolution: string;
    size: string;
  };
  favorite?: boolean;
};

export const initialPhotos: PhotoItem[] = [
  {
    id: "photo-1",
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    title: "Minimalist Dual 4K Workspace",
    date: "Today",
    time: "2:14 PM",
    group: "Today",
    location: "Bengaluru, India",
    album: "Workspaces",
    favorite: true,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "24mm f/1.7 200MP Main Wide",
      settings: "ISO 50 • 1/250s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "4.8 MB",
    },
  },
  {
    id: "photo-2",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80",
    title: "Gin resting on the warm amplifier",
    date: "Today",
    time: "11:20 AM",
    group: "Today",
    location: "Home",
    album: "Gin & Tonic 🐱",
    favorite: true,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "115mm f/3.4 5x Periscope Telephoto",
      settings: "ISO 125 • 1/160s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "3.9 MB",
    },
  },
  {
    id: "photo-3",
    url: "https://images.unsplash.com/photo-1452626212852-811d58933cae?auto=format&fit=crop&w=1200&q=80",
    title: "Morning 10K Sunrise Run",
    date: "Today",
    time: "6:45 AM",
    group: "Today",
    location: "Cubbon Park, Bengaluru",
    album: "Running & Races",
    favorite: true,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "24mm f/1.7 Main Wide",
      settings: "ISO 64 • 1/500s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "5.1 MB",
    },
  },
  {
    id: "photo-4",
    url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=80",
    title: "Tonic watching birds from the window",
    date: "Yesterday",
    time: "4:32 PM",
    group: "Yesterday",
    location: "Home",
    album: "Gin & Tonic 🐱",
    favorite: false,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "70mm f/2.4 3x Telephoto",
      settings: "ISO 80 • 1/200s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "3.7 MB",
    },
  },
  {
    id: "photo-5",
    url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
    title: "Keychron Mechanical Keyboard with Custom Caps",
    date: "Yesterday",
    time: "1:15 PM",
    group: "Yesterday",
    location: "Bengaluru, India",
    album: "Workspaces",
    favorite: false,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "24mm f/1.7 Macro",
      settings: "ISO 100 • 1/120s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "4.2 MB",
    },
  },
  {
    id: "photo-6",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    title: "Dusk over UB City Skyline",
    date: "Yesterday",
    time: "6:58 PM",
    group: "Yesterday",
    location: "Bengaluru, India",
    album: "Architecture",
    favorite: true,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "24mm f/1.7 Nightography",
      settings: "ISO 400 • 1/30s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "6.2 MB",
    },
  },
  {
    id: "photo-7",
    url: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1200&q=80",
    title: "Flat White Espresso & Dev Notes",
    date: "Oct 14, 2026",
    time: "10:10 AM",
    group: "October 2026",
    location: "Indiranagar, Bengaluru",
    album: "Camera",
    favorite: false,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "24mm f/1.7 Main Wide",
      settings: "ISO 125 • 1/180s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "4.1 MB",
    },
  },
  {
    id: "photo-8",
    url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    title: "Cruising at 36,000 ft over Western Ghats",
    date: "Oct 12, 2026",
    time: "11:42 AM",
    group: "October 2026",
    location: "Air India AI 504",
    album: "Camera",
    favorite: true,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "13mm f/2.2 Ultra-Wide",
      settings: "ISO 50 • 1/1200s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "5.5 MB",
    },
  },
  {
    id: "photo-9",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    title: "Brutalist Glass & Concrete Facade",
    date: "Oct 10, 2026",
    time: "3:30 PM",
    group: "October 2026",
    location: "New Delhi, India",
    album: "Architecture",
    favorite: false,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "13mm f/2.2 Ultra-Wide",
      settings: "ISO 80 • 1/640s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "4.9 MB",
    },
  },
  {
    id: "photo-10",
    url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=80",
    title: "Gin inspecting the S-Pen on the desk",
    date: "Oct 8, 2026",
    time: "5:15 PM",
    group: "October 2026",
    location: "Home Studio",
    album: "Gin & Tonic 🐱",
    favorite: true,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "70mm f/2.4 3x Telephoto",
      settings: "ISO 160 • 1/125s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "3.8 MB",
    },
  },
  {
    id: "photo-11",
    url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
    title: "Bengaluru Half Marathon Finish Line",
    date: "Oct 5, 2026",
    time: "8:25 AM",
    group: "October 2026",
    location: "Kanteerava Stadium",
    album: "Running & Races",
    favorite: true,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "24mm f/1.7 Main Wide",
      settings: "ISO 50 • 1/1000s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "6.0 MB",
    },
  },
  {
    id: "photo-12",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    title: "Keynote Talk: 3D Spatial Interfaces",
    date: "Sept 28, 2026",
    time: "2:00 PM",
    group: "September 2026",
    location: "React India Conference",
    album: "Workspaces",
    favorite: true,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "115mm f/3.4 5x Telephoto",
      settings: "ISO 320 • 1/200s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "4.7 MB",
    },
  },
  {
    id: "photo-13",
    url: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=80",
    title: "Late Night Code Sprint with Coffee",
    date: "Sept 24, 2026",
    time: "11:45 PM",
    group: "September 2026",
    location: "Bengaluru, India",
    album: "Workspaces",
    favorite: false,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "24mm f/1.7",
      settings: "ISO 500 • 1/40s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "5.3 MB",
    },
  },
  {
    id: "photo-14",
    url: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80",
    title: "Tonic sleeping in sunny patch",
    date: "Sept 20, 2026",
    time: "3:10 PM",
    group: "September 2026",
    location: "Home",
    album: "Gin & Tonic 🐱",
    favorite: false,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "70mm f/2.4 3x Telephoto",
      settings: "ISO 100 • 1/250s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "3.5 MB",
    },
  },
  {
    id: "photo-15",
    url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    title: "Trail Running Path at Dawn",
    date: "Sept 18, 2026",
    time: "6:15 AM",
    group: "September 2026",
    location: "Nandi Hills, Karnataka",
    album: "Running & Races",
    favorite: true,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "24mm f/1.7",
      settings: "ISO 80 • 1/400s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "5.8 MB",
    },
  },
  {
    id: "photo-16",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    title: "Modern Minimalist Concrete Geometry",
    date: "Sept 12, 2026",
    time: "1:40 PM",
    group: "September 2026",
    location: "Bengaluru, India",
    album: "Architecture",
    favorite: false,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "24mm f/1.7",
      settings: "ISO 50 • 1/800s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "4.4 MB",
    },
  },
  {
    id: "photo-17",
    url: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80",
    title: "Night Skyline City Lights Long Exposure",
    date: "Sept 5, 2026",
    time: "9:20 PM",
    group: "September 2026",
    location: "Delhi NCR",
    album: "Architecture",
    favorite: true,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "24mm f/1.7 Nightography",
      settings: "ISO 200 • 2.0s Tripod",
      resolution: "12.0 MP (3000 x 4000)",
      size: "6.8 MB",
    },
  },
  {
    id: "photo-18",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    title: "Retro Audio & Synthesizers",
    date: "Sept 1, 2026",
    time: "4:50 PM",
    group: "September 2026",
    location: "Studio",
    album: "Workspaces",
    favorite: false,
    exif: {
      camera: "Samsung Galaxy S26 Ultra",
      lens: "24mm f/1.7",
      settings: "ISO 160 • 1/100s",
      resolution: "12.0 MP (3000 x 4000)",
      size: "4.6 MB",
    },
  },
];

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
    label: "YouTube",
    icon: "play",
    c1: "#ff0000",
    c2: "#cc0000",
    title: "YouTube",
    subtitle: "Reyansh Bhardwaj • Tech & Keynotes",
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
    c1: "#000034",
    c2: "#FFA523",
    title: "About",
    subtitle: profile.role,
    blocks: [
      {
        kind: "text",
        body: "I build software, chase half marathons, and answer to two cats named Gin & Tonic.",
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
        kind: "elsewhere",
        heading: "ELSEWHERE",
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
          { title: "Physical Dimensions", sub: "163.6 x 78.1 x 7.9 mm • 218g", meta: "True 1:1" },
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
    title: "New Message",
    subtitle: "Send a direct message",
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
          { label: "Send Direct Message", href: "#mail", hint: "Direct Message" },
          { label: "Connect on LinkedIn", href: profile.linkedin, hint: "linkedin.com" },
          { label: "GitHub Profile", href: profile.github, hint: "github.com" },
          { label: "Follow on X", href: profile.x, hint: "@ReyanshB292" },
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
    title: "Resume",
    subtitle: "Reyansh Bhardwaj • Engineer + Occasional Designer",
    blocks: [
      {
        kind: "items",
        heading: "Education & Academics",
        items: [
          {
            title: "Bachelor of Technology (B.Tech) — IIIT Sonepat",
            sub: "Computer Science & Engineering • Batch 2025 - 2029 • Focus on Core Systems, Backend & Mobile Development",
            meta: "8.7 CGPA",
          },
          {
            title: "Senior Secondary (Class XII) — J.P. International",
            sub: "Central Board of Secondary Education (CBSE) • Science with Mathematics (PCM) • 92% Aggregate",
            meta: "92% Boards",
          },
          {
            title: "JEE Mains (Joint Entrance Examination)",
            sub: "98.12 Percentile • All India Rank (AIR): 28,834 • National Testing Agency (NTA)",
            meta: "AIR 28,834",
          },
          {
            title: "Core Academic Foundations",
            sub: "Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, DBMS, Computer Networks",
            meta: "Coursework",
          },
        ],
      },
      {
        kind: "items",
        heading: "Technical Skills & Competencies",
        items: [
          {
            title: "Mobile & Android Engineering",
            sub: "Android Studio, Jetpack Compose, Java, Kotlin, Room DB, BLE Telemetry, Material 3 UI",
            meta: "Android",
          },
          {
            title: "Backend & Distributed Systems",
            sub: "Spring Boot, Spring AI, Kafka, REST APIs, Microservices, Spring Security, Hibernate/JPA, Node.js",
            meta: "Backend",
          },
          {
            title: "Programming Languages",
            sub: "Java, Kotlin, Python, C, C++, JavaScript, TypeScript, Dart, SQL",
            meta: "Languages",
          },
          {
            title: "Databases & Storage Engines",
            sub: "MySQL, PostgreSQL, Redis, SQLite / Room DB, Supabase",
            meta: "Databases",
          },
          {
            title: "DevOps & Developer Tooling",
            sub: "Git, GitHub, Docker, Kubernetes, Postman, CI/CD Automation, Linux, AWS Deployment",
            meta: "DevOps",
          },
        ],
      },
      {
        kind: "chips",
        heading: "Skills & Core Technologies",
        chips: [
          "Java",
          "Android Studio",
          "Spring Boot",
          "Spring AI",
          "Kafka",
          "Kotlin",
          "Jetpack Compose",
          "Python",
          "C++",
          "MySQL",
          "PostgreSQL",
          "Redis",
          "REST APIs",
          "Room DB",
          "TypeScript",
          "Git & GitHub",
          "Docker",
          "Kubernetes",
        ],
      },
      {
        kind: "items",
        heading: "Certifications & Credentials",
        items: [
          {
            title: "Spring Boot 0 to 100 — Coding Shuttle",
            sub: "Cohort 5.0 [AI + DevOps + System Design] • Completed 15/10/2026 • Verified ID: 3K031L0B",
            meta: "Certified",
            image: "/certificate-coding-shuttle.jpg",
          },
        ],
      },
      {
        kind: "links",
        heading: "External Profiles & Repositories",
        links: [
          { label: "View Coding Shuttle Certificate", href: "/certificate-coding-shuttle.jpg", hint: "Certificate" },
          { label: "GitHub Repositories", href: profile.github, hint: "github.com" },
          { label: "LinkedIn Profile", href: profile.linkedin, hint: "linkedin.com" },
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
    title: "GitHub Mobile",
    subtitle: "Reyansh Bhardwaj • @reyanshbhardwaj2005-spec",
    blocks: [
      {
        kind: "items",
        heading: "Contribution Telemetry",
        items: [
          { title: "2026 Commit Activity", sub: "Active Android & Spring Boot engineering", meta: "17 repos" },
          { title: "Primary Languages", sub: "Java, Spring Boot, Android, Python, C++, JS", meta: "Multi-stack" },
          { title: "Public Repositories", sub: "Full-stack apps, AI models & mobile tools", meta: "17 public" },
          { title: "Followers & Network", sub: "1 following • 0 followers", meta: "Active" },
        ],
      },
      {
        kind: "items",
        heading: "Pinned Open-Source Repositories",
        items: [
          { title: "Reality-Lens-Android-Version", sub: "Screenshot authenticity verification app using custom analysis API", meta: "Java • 1 ★" },
          { title: "pyq-management-backend-SpringBoot", sub: "Spring Boot microservice REST API for academic question paper management", meta: "Java • 1 ★" },
          { title: "Offline-AI-chat-assistant", sub: "Android offline AI chat assistant with on-device LLM inference", meta: "Java • 1 ★" },
          { title: "Portfolio-2", sub: "Samsung Galaxy S26 Ultra 3D Spatial Simulator portfolio in Next.js", meta: "CSS/TS • Live" },
          { title: "water-management-system", sub: "Automated water telemetry, reservoir monitoring & sensor analytics", meta: "Python" },
          { title: "TalentNest", sub: "Full-stack talent networking platform connecting tech professionals", meta: "JavaScript" },
          { title: "PYQ-s-Android", sub: "College exam paper repository client for Android", meta: "Java" },
        ],
      },
      {
        kind: "chips",
        heading: "Languages & Distribution",
        chips: ["Java (53%)", "C++ (12%)", "Python (12%)", "JavaScript (10%)", "CSS/HTML (13%)"],
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

/* =========================================================================
   REAL GITHUB APP DATA (MAPPED FROM https://github.com/reyanshbhardwaj2005-spec)
   ========================================================================= */

export type GitHubRepoItem = {
  id: number;
  name: string;
  fullName: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
  pushedAt: string;
  htmlUrl: string;
  cloneUrl: string;
  defaultBranch: string;
  isPinned: boolean;
  isStarred?: boolean;
  size?: number;
};

export type GitHubActivityItem = {
  id: string;
  type: "push" | "star" | "create";
  repo: string;
  repoUrl: string;
  date: string;
  title: string;
  desc?: string;
  badge?: string;
};

export type GitHubProfileData = {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  tagline: string;
  location: string;
  email: string;
  linkedin: string;
  blog: string;
  followers: number;
  following: number;
  publicRepos: number;
  starredCount: number;
  totalContributions: number;
  snakeAnimationUrl: string;
  capsuleBannerUrl: string;
  skills: {
    category: string;
    items: string[];
  }[];
  repos: GitHubRepoItem[];
  pinnedRepos: GitHubRepoItem[];
  activities: GitHubActivityItem[];
};

export const githubProfileData: GitHubProfileData = {
  login: "reyanshbhardwaj2005-spec",
  name: "Reyansh Bhardwaj",
  avatarUrl: "https://avatars.githubusercontent.com/u/259818427?v=4",
  bio: "Android Developer · Java Programmer · Spring Boot Developer",
  tagline: "Building useful applications. Solving real-world problems. Growing every day.",
  location: "Meerut, India",
  email: "reyanshbhardwaj.2005@gmail.com",
  linkedin: "https://www.linkedin.com/in/reyansh-bhardwaj-6b2b59384/",
  blog: "",
  followers: 0,
  following: 1,
  publicRepos: 17,
  starredCount: 3,
  totalContributions: 156,
  snakeAnimationUrl: "https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg",
  capsuleBannerUrl: "https://capsule-render.vercel.app/api?type=waving&color=0:00C6FF,50:7B61FF,100:C850FF&height=200&section=header&text=Reyansh%20Bhardwaj&fontSize=55&fontColor=ffffff&fontAlignY=38&desc=Android%20Developer%20%7C%20Java%20Programmer%20%7C%20Backend%20Learner&descSize=16&descAlignY=60&animation=fadeIn",
  skills: [
    {
      category: "Programming Languages",
      items: ["Java", "Kotlin", "Python", "C", "C++", "Dart", "JavaScript", "TypeScript"],
    },
    {
      category: "Mobile & Android",
      items: ["Android Studio", "Jetpack Compose", "Room DB", "XML Layouts", "Material UI", "BLE Telemetry"],
    },
    {
      category: "Backend & Databases",
      items: ["Spring Boot", "Spring AI", "Kafka", "REST APIs", "MySQL", "PostgreSQL", "Redis", "Supabase", "Spring Security"],
    },
    {
      category: "DevOps & Tools",
      items: ["Git", "GitHub", "Docker", "Kubernetes", "AWS Deployment", "Postman", "CI/CD Pipelines"],
    },
  ],
  repos: [
    {
      id: 1377181589,
      name: "Portfolio-2",
      fullName: "reyanshbhardwaj2005-spec/Portfolio-2",
      description: "Flagship Samsung Galaxy S26 Ultra 3D Spatial portfolio experience engineered with hardware-accelerated CSS 3D matrix math and interactive One UI 8.0.",
      language: "CSS",
      languageColor: "#563d7c",
      stars: 0,
      forks: 0,
      updatedAt: "2026-10-19T07:50:11Z",
      pushedAt: "2026-10-18T15:37:56Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/Portfolio-2",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/Portfolio-2.git",
      defaultBranch: "main",
      isPinned: true,
      isStarred: false,
      size: 180450,
    },
    {
      id: 1253448008,
      name: "Reality-Lens-Android-Version",
      fullName: "reyanshbhardwaj2005-spec/Reality-Lens-Android-Version",
      description: "RealityLens is an application that helps users verify whether information shown in screenshots is real or fake. Users can upload a screenshot directly from their mobile device, and the app sends the image to a verification API for analysis.",
      language: "Java",
      languageColor: "#b07219",
      stars: 1,
      forks: 0,
      updatedAt: "2026-10-18T16:57:25Z",
      pushedAt: "2026-06-21T05:11:50Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/Reality-Lens-Android-Version",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/Reality-Lens-Android-Version.git",
      defaultBranch: "main",
      isPinned: true,
      isStarred: true,
      size: 27028,
    },
    {
      id: 1301657995,
      name: "pyq-management-backend-SpringBoot",
      fullName: "reyanshbhardwaj2005-spec/pyq-management-backend-SpringBoot",
      description: "Robust Spring Boot REST API microservice for academic past-year question paper indexing, search, filtering, and role-based student access.",
      language: "Java",
      languageColor: "#b07219",
      stars: 1,
      forks: 0,
      updatedAt: "2026-10-18T16:58:04Z",
      pushedAt: "2026-07-17T12:59:10Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/pyq-management-backend-SpringBoot",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/pyq-management-backend-SpringBoot.git",
      defaultBranch: "main",
      isPinned: true,
      isStarred: true,
      size: 25444,
    },
    {
      id: 1406115584,
      name: "Offline-AI-chat-assistant",
      fullName: "reyanshbhardwaj2005-spec/Offline-AI-chat-assistant",
      description: "Android mobile application featuring on-device offline LLM inference for private and zero-latency AI conversations without internet connection.",
      language: "Java",
      languageColor: "#b07219",
      stars: 1,
      forks: 0,
      updatedAt: "2026-10-18T16:57:12Z",
      pushedAt: "2026-10-12T18:26:52Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/Offline-AI-chat-assistant",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/Offline-AI-chat-assistant.git",
      defaultBranch: "main",
      isPinned: true,
      isStarred: true,
      size: 182,
    },
    {
      id: 1156939944,
      name: "water-management-system",
      fullName: "reyanshbhardwaj2005-spec/water-management-system",
      description: "Automated water telemetry, reservoir monitoring, and consumption analytics system built with Python and IoT data sensors.",
      language: "Python",
      languageColor: "#3572A5",
      stars: 0,
      forks: 0,
      updatedAt: "2026-02-13T08:38:51Z",
      pushedAt: "2026-02-13T08:38:47Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/water-management-system",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/water-management-system.git",
      defaultBranch: "main",
      isPinned: true,
      size: 154,
    },
    {
      id: 1204067154,
      name: "TalentNest",
      fullName: "reyanshbhardwaj2005-spec/TalentNest",
      description: "Full-stack talent networking platform connecting tech professionals and emerging developers with career and project opportunities.",
      language: "JavaScript",
      languageColor: "#f1e05a",
      stars: 0,
      forks: 0,
      updatedAt: "2026-05-26T08:04:09Z",
      pushedAt: "2026-05-26T08:04:05Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/TalentNest",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/TalentNest.git",
      defaultBranch: "main",
      isPinned: true,
      size: 840,
    },
    {
      id: 1209856127,
      name: "PYQ-s-Android",
      fullName: "reyanshbhardwaj2005-spec/PYQ-s-Android",
      description: "Native Android application providing college students with instant offline access and organization for previous year exam questions.",
      language: "Java",
      languageColor: "#b07219",
      stars: 0,
      forks: 0,
      updatedAt: "2026-04-15T19:06:38Z",
      pushedAt: "2026-04-15T19:06:34Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/PYQ-s-Android",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/PYQ-s-Android.git",
      defaultBranch: "master",
      isPinned: true,
      size: 320,
    },
    {
      id: 1365806503,
      name: "Offline-AI-chat-model",
      fullName: "reyanshbhardwaj2005-spec/Offline-AI-chat-model",
      description: "High-performance C++ lightweight quantized neural network runner and inference engine for local on-device chat models.",
      language: "C++",
      languageColor: "#f34b7d",
      stars: 0,
      forks: 0,
      updatedAt: "2026-10-01T16:56:04Z",
      pushedAt: "2026-10-02T10:30:15Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/Offline-AI-chat-model",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/Offline-AI-chat-model.git",
      defaultBranch: "main",
      isPinned: false,
      size: 1940,
    },
    {
      id: 1372595053,
      name: "pyq-management-android-",
      fullName: "reyanshbhardwaj2005-spec/pyq-management-android-",
      description: "Android companion client designed for the PYQ Management Spring Boot backend with clean Material UI and PDF caching.",
      language: "Java",
      languageColor: "#b07219",
      stars: 0,
      forks: 0,
      updatedAt: "2026-10-18T16:58:02Z",
      pushedAt: "2026-09-16T07:27:08Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/pyq-management-android-",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/pyq-management-android-.git",
      defaultBranch: "main",
      isPinned: false,
      size: 2394,
    },
    {
      id: 1404130419,
      name: "ecommerce-config-server",
      fullName: "reyanshbhardwaj2005-spec/ecommerce-config-server",
      description: "Centralized Spring Cloud Config Server managing dynamic configurations, property overrides, and profiles for microservice clusters.",
      language: "Java",
      languageColor: "#b07219",
      stars: 0,
      forks: 0,
      updatedAt: "2026-10-06T14:22:17Z",
      pushedAt: "2026-10-06T14:22:13Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/ecommerce-config-server",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/ecommerce-config-server.git",
      defaultBranch: "main",
      isPinned: false,
      size: 84,
    },
    {
      id: 1362983627,
      name: "employee-service",
      fullName: "reyanshbhardwaj2005-spec/employee-service",
      description: "Enterprise employee directory service built for practicing automated CI/CD deployment pipelines on AWS infrastructure.",
      language: "HTML",
      languageColor: "#e34c26",
      stars: 0,
      forks: 0,
      updatedAt: "2026-09-10T14:28:59Z",
      pushedAt: "2026-09-10T14:25:48Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/employee-service",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/employee-service.git",
      defaultBranch: "main",
      isPinned: false,
      size: 512,
    },
    {
      id: 1386244820,
      name: "Eggs-Counter",
      fullName: "reyanshbhardwaj2005-spec/Eggs-Counter",
      description: "Interactive Java tracking application for logging and analyzing production metrics, tallies, and batch inventory.",
      language: "Java",
      languageColor: "#b07219",
      stars: 0,
      forks: 0,
      updatedAt: "2026-10-08T14:13:39Z",
      pushedAt: "2026-10-08T14:13:34Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/Eggs-Counter",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/Eggs-Counter.git",
      defaultBranch: "main",
      isPinned: false,
      size: 29,
    },
    {
      id: 1253197527,
      name: "Reality-Lens-Android",
      fullName: "reyanshbhardwaj2005-spec/Reality-Lens-Android",
      description: "RealityLens initial architecture exploration allowing users to upload screenshots and verify whether displayed info is authentic.",
      language: "Java",
      languageColor: "#b07219",
      stars: 0,
      forks: 0,
      updatedAt: "2026-05-29T10:56:09Z",
      pushedAt: "2026-05-29T10:56:04Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/Reality-Lens-Android",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/Reality-Lens-Android.git",
      defaultBranch: "main",
      isPinned: false,
      size: 1540,
    },
    {
      id: 1274344801,
      name: "Talent-Nest-Android",
      fullName: "reyanshbhardwaj2005-spec/Talent-Nest-Android",
      description: "Native Android mobile client for TalentNest featuring recruiter messaging, applicant profiles, and job listings.",
      language: "Java",
      languageColor: "#b07219",
      stars: 0,
      forks: 0,
      updatedAt: "2026-06-19T15:00:19Z",
      pushedAt: "2026-06-19T15:00:08Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/Talent-Nest-Android",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/Talent-Nest-Android.git",
      defaultBranch: "main",
      isPinned: false,
      size: 2150,
    },
    {
      id: 1278392793,
      name: "Contacts-App",
      fullName: "reyanshbhardwaj2005-spec/Contacts-App",
      description: "Android contact management application implementing SQLite/Room database, CRUD operations, and fast search filtering.",
      language: "Java",
      languageColor: "#b07219",
      stars: 0,
      forks: 0,
      updatedAt: "2026-06-23T18:46:41Z",
      pushedAt: "2026-06-23T18:46:34Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/Contacts-App",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/Contacts-App.git",
      defaultBranch: "main",
      isPinned: false,
      size: 1840,
    },
    {
      id: 1345960167,
      name: "securityApp",
      fullName: "reyanshbhardwaj2005-spec/securityApp",
      description: "Spring Security authentication and authorization application demonstrating JWT token generation, role verification, and password encryption.",
      language: "Java",
      languageColor: "#b07219",
      stars: 0,
      forks: 0,
      updatedAt: "2026-08-25T10:02:04Z",
      pushedAt: "2026-08-25T10:02:04Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/securityApp",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/securityApp.git",
      defaultBranch: "main",
      isPinned: false,
      size: 620,
    },
    {
      id: 1268290873,
      name: "reyanshbhardwaj2005-spec",
      fullName: "reyanshbhardwaj2005-spec/reyanshbhardwaj2005-spec",
      description: "Special GitHub user profile README showcasing developer bio, animated snake contribution graph, waving header, and tech stack.",
      language: "Markdown",
      languageColor: "#8b949e",
      stars: 0,
      forks: 0,
      updatedAt: "2026-10-18T16:56:38Z",
      pushedAt: "2026-10-18T16:56:34Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/reyanshbhardwaj2005-spec",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/reyanshbhardwaj2005-spec.git",
      defaultBranch: "main",
      isPinned: false,
      size: 28,
    },
  ],
  pinnedRepos: [
    {
      id: 1253448008,
      name: "Reality-Lens-Android-Version",
      fullName: "reyanshbhardwaj2005-spec/Reality-Lens-Android-Version",
      description: "RealityLens is an application that helps users verify whether information shown in screenshots is real or fake. Users can upload a screenshot directly from their mobile device, and the app sends the image to a verification API for analysis.",
      language: "Java",
      languageColor: "#b07219",
      stars: 1,
      forks: 0,
      updatedAt: "2026-10-18T16:57:25Z",
      pushedAt: "2026-06-21T05:11:50Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/Reality-Lens-Android-Version",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/Reality-Lens-Android-Version.git",
      defaultBranch: "main",
      isPinned: true,
      size: 27028,
    },
    {
      id: 1301657995,
      name: "pyq-management-backend-SpringBoot",
      fullName: "reyanshbhardwaj2005-spec/pyq-management-backend-SpringBoot",
      description: "Robust Spring Boot REST API microservice for academic past-year question paper indexing, search, filtering, and role-based student access.",
      language: "Java",
      languageColor: "#b07219",
      stars: 1,
      forks: 0,
      updatedAt: "2026-10-18T16:58:04Z",
      pushedAt: "2026-07-17T12:59:10Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/pyq-management-backend-SpringBoot",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/pyq-management-backend-SpringBoot.git",
      defaultBranch: "main",
      isPinned: true,
      size: 25444,
    },
    {
      id: 1406115584,
      name: "Offline-AI-chat-assistant",
      fullName: "reyanshbhardwaj2005-spec/Offline-AI-chat-assistant",
      description: "Android mobile application featuring on-device offline LLM inference for private and zero-latency AI conversations without internet connection.",
      language: "Java",
      languageColor: "#b07219",
      stars: 1,
      forks: 0,
      updatedAt: "2026-10-18T16:57:12Z",
      pushedAt: "2026-10-12T18:26:52Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/Offline-AI-chat-assistant",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/Offline-AI-chat-assistant.git",
      defaultBranch: "main",
      isPinned: true,
      size: 182,
    },
    {
      id: 1377181589,
      name: "Portfolio-2",
      fullName: "reyanshbhardwaj2005-spec/Portfolio-2",
      description: "Flagship Samsung Galaxy S26 Ultra 3D Spatial portfolio experience engineered with hardware-accelerated CSS 3D matrix math and interactive One UI 8.0.",
      language: "CSS",
      languageColor: "#563d7c",
      stars: 0,
      forks: 0,
      updatedAt: "2026-10-19T07:50:11Z",
      pushedAt: "2026-10-18T15:37:56Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/Portfolio-2",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/Portfolio-2.git",
      defaultBranch: "main",
      isPinned: true,
      size: 180450,
    },
    {
      id: 1156939944,
      name: "water-management-system",
      fullName: "reyanshbhardwaj2005-spec/water-management-system",
      description: "Automated water telemetry, reservoir monitoring, and consumption analytics system built with Python and IoT data sensors.",
      language: "Python",
      languageColor: "#3572A5",
      stars: 0,
      forks: 0,
      updatedAt: "2026-02-13T08:38:51Z",
      pushedAt: "2026-02-13T08:38:47Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/water-management-system",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/water-management-system.git",
      defaultBranch: "main",
      isPinned: true,
      size: 154,
    },
    {
      id: 1204067154,
      name: "TalentNest",
      fullName: "reyanshbhardwaj2005-spec/TalentNest",
      description: "Full-stack talent networking platform connecting tech professionals and emerging developers with career and project opportunities.",
      language: "JavaScript",
      languageColor: "#f1e05a",
      stars: 0,
      forks: 0,
      updatedAt: "2026-05-26T08:04:09Z",
      pushedAt: "2026-05-26T08:04:05Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/TalentNest",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/TalentNest.git",
      defaultBranch: "main",
      isPinned: true,
      size: 840,
    },
    {
      id: 1209856127,
      name: "PYQ-s-Android",
      fullName: "reyanshbhardwaj2005-spec/PYQ-s-Android",
      description: "Native Android application providing college students with instant offline access and organization for previous year exam questions.",
      language: "Java",
      languageColor: "#b07219",
      stars: 0,
      forks: 0,
      updatedAt: "2026-04-15T19:06:38Z",
      pushedAt: "2026-04-15T19:06:34Z",
      htmlUrl: "https://github.com/reyanshbhardwaj2005-spec/PYQ-s-Android",
      cloneUrl: "https://github.com/reyanshbhardwaj2005-spec/PYQ-s-Android.git",
      defaultBranch: "master",
      isPinned: true,
      size: 320,
    },
  ],
  activities: [
    {
      id: "act-1",
      type: "push",
      repo: "Portfolio-2",
      repoUrl: "https://github.com/reyanshbhardwaj2005-spec/Portfolio-2",
      date: "Today",
      title: "Pushed to main branch",
      desc: "Refined 3D hardware acceleration physics and mobile interface fidelity",
      badge: "Commit 4b92c1",
    },
    {
      id: "act-2",
      type: "push",
      repo: "reyanshbhardwaj2005-spec",
      repoUrl: "https://github.com/reyanshbhardwaj2005-spec/reyanshbhardwaj2005-spec",
      date: "Yesterday",
      title: "Updated Profile README",
      desc: "Synchronized animated snake contribution graph and verified developer tech stack",
      badge: "Profile",
    },
    {
      id: "act-3",
      type: "star",
      repo: "pyq-management-backend-SpringBoot",
      repoUrl: "https://github.com/reyanshbhardwaj2005-spec/pyq-management-backend-SpringBoot",
      date: "Yesterday",
      title: "Starred repository",
      desc: "Spring Boot REST API past-year question paper microservice",
      badge: "Star ⭐",
    },
    {
      id: "act-4",
      type: "star",
      repo: "Reality-Lens-Android-Version",
      repoUrl: "https://github.com/reyanshbhardwaj2005-spec/Reality-Lens-Android-Version",
      date: "Oct 18, 2026",
      title: "Starred repository",
      desc: "Screenshot authenticity verification system with custom backend analysis API",
      badge: "Star ⭐",
    },
    {
      id: "act-5",
      type: "push",
      repo: "Offline-AI-chat-assistant",
      repoUrl: "https://github.com/reyanshbhardwaj2005-spec/Offline-AI-chat-assistant",
      date: "Oct 12, 2026",
      title: "Pushed to main branch",
      desc: "Optimized local LLM quantized inference engine parser for Android runtime",
      badge: "Commit 8e30f1",
    },
    {
      id: "act-6",
      type: "push",
      repo: "Eggs-Counter",
      repoUrl: "https://github.com/reyanshbhardwaj2005-spec/Eggs-Counter",
      date: "Oct 8, 2026",
      title: "Pushed to main branch",
      desc: "Updated batch counter math and inventory validation routines",
      badge: "Commit 7d21c4",
    },
    {
      id: "act-7",
      type: "push",
      repo: "ecommerce-config-server",
      repoUrl: "https://github.com/reyanshbhardwaj2005-spec/ecommerce-config-server",
      date: "Oct 6, 2026",
      title: "Pushed to main branch",
      desc: "Configured Spring Cloud centralized configuration properties and profiles",
      badge: "Commit 9a41e2",
    },
  ],
};
