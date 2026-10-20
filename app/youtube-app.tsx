"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { profile } from "./data";
import { useHorizontalScroll } from "./github-app";

/* =========================================================================
   YOUTUBE MOBILE DATA TYPES & CURATED REPO CONTENT
   ========================================================================= */

export interface YouTubeVideo {
  id: string;
  title: string;
  category: "All" | "Spring Boot" | "Android" | "3D Web" | "DevOps" | "Keynotes";
  duration: string;
  views: string;
  timeAgo: string;
  badge?: string;
  channelName: string;
  channelAvatar: string;
  verified: boolean;
  themeColor: string;
  accentColor: string;
  tags: string[];
  description: string;
  likes: string;
  likeCount: number;
  commentsCount: number;
  githubUrl?: string;
  liveUrl?: string;
  comments: {
    id: string;
    author: string;
    avatarBg: string;
    timeAgo: string;
    text: string;
    likes: number;
  }[];
}

export interface YouTubeShort {
  id: string;
  title: string;
  views: string;
  themeColor: string;
  accentColor: string;
  likes: string;
  tag: string;
}

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: "yt-1",
    title: "Spring Boot 3.4 Microservices & Kafka Event-Driven Architecture",
    category: "Spring Boot",
    duration: "24:18",
    views: "28.4K views",
    timeAgo: "3 days ago",
    badge: "4K 60fps",
    channelName: "Reyansh Bhardwaj",
    channelAvatar: "/avatar.jpg",
    verified: true,
    themeColor: "#0f2e1a",
    accentColor: "#22c55e",
    tags: ["#SpringBoot", "#Kafka", "#SystemDesign", "#Microservices", "#Java"],
    description:
      "Deep dive into architecting resilient, event-driven microservices using Spring Boot 3.4, Apache Kafka distributed event streaming, Redis caching hierarchies, and Docker container orchestration. Verified Coding Shuttle Cohort 5.0 project implementation.",
    likes: "2.4K",
    likeCount: 2419,
    commentsCount: 48,
    githubUrl: "https://github.com/reyanshbhardwaj2005-spec/pyq-management-backend-SpringBoot",
    comments: [
      {
        id: "c-1",
        author: "DevArchitect_Pro",
        avatarBg: "#3b82f6",
        timeAgo: "1 day ago",
        text: "The explanation of Kafka partition rebalancing and Redis distributed caching in Spring Boot was insane! Best systems tutorial on the internet 🔥",
        likes: 142,
      },
      {
        id: "c-2",
        author: "Priya Sharma",
        avatarBg: "#ec4899",
        timeAgo: "2 days ago",
        text: "Watched this right before my backend interview and cleared it! Congratulations on completing Cohort 5.0 at Coding Shuttle!",
        likes: 89,
      },
      {
        id: "c-3",
        author: "Karan Verma",
        avatarBg: "#10b981",
        timeAgo: "3 days ago",
        text: "Clean code structure and production-ready error handling. Starred the repo on GitHub!",
        likes: 34,
      },
    ],
  },
  {
    id: "yt-2",
    title: "Samsung Galaxy S26 Ultra: Building 3D Spatial CSS Matrix in 60fps",
    category: "3D Web",
    duration: "18:42",
    views: "45.1K views",
    timeAgo: "1 week ago",
    badge: "4K HDR",
    channelName: "Reyansh Bhardwaj",
    channelAvatar: "/avatar.jpg",
    verified: true,
    themeColor: "#18181b",
    accentColor: "#f59e0b",
    tags: ["#NextJS", "#CSS3D", "#SamsungS26Ultra", "#WebGL", "#HardwareAccel"],
    description:
      "How I built a pure hardware-accelerated 3D Samsung Galaxy S26 Ultra simulator in Next.js. Exploring 3D matrix math, dynamic lighting reflections on Grade 5 Titanium frames, and kinetic touch inertia without external heavy engines.",
    likes: "4.8K",
    likeCount: 4830,
    commentsCount: 92,
    githubUrl: "https://github.com/reyanshbhardwaj2005-spec/Portfolio-2",
    liveUrl: "https://github.com/reyanshbhardwaj2005-spec/Portfolio-2",
    comments: [
      {
        id: "c-4",
        author: "FrontendNinja",
        avatarBg: "#8b5cf6",
        timeAgo: "4 days ago",
        text: "The smooth physics on that phone rotation and the S-Pen drawing canvas is mind-blowing! Outstanding craft.",
        likes: 215,
      },
      {
        id: "c-5",
        author: "Marcus Vance",
        avatarBg: "#f97316",
        timeAgo: "6 days ago",
        text: "The titanium bezel reflections and One UI haptics are so tactile. Best creative portfolio of 2026.",
        likes: 120,
      },
    ],
  },
  {
    id: "yt-3",
    title: "Reality Lens Android: Screenshot Authenticity & Image Forensics",
    category: "Android",
    duration: "15:05",
    views: "19.8K views",
    timeAgo: "2 weeks ago",
    badge: "1080p 60fps",
    channelName: "Reyansh Bhardwaj",
    channelAvatar: "/avatar.jpg",
    verified: true,
    themeColor: "#082f49",
    accentColor: "#0284c7",
    tags: ["#AndroidDev", "#JetpackCompose", "#Java", "#CyberSecurity", "#Forensics"],
    description:
      "Technical walkthrough of Reality Lens Android app: detecting digital manipulations, analyzing screenshot compression artifacts, verifying EXIF metadata signatures, and integrating high-speed verification APIs.",
    likes: "1.9K",
    likeCount: 1942,
    commentsCount: 36,
    githubUrl: "https://github.com/reyanshbhardwaj2005-spec/Reality-Lens-Android-Version",
    comments: [
      {
        id: "c-6",
        author: "SecOps_Engineer",
        avatarBg: "#06b6d4",
        timeAgo: "1 week ago",
        text: "Crucial project given the surge in spoofed payment screenshots and altered documents. Great work on the verification pipeline!",
        likes: 77,
      },
    ],
  },
  {
    id: "yt-4",
    title: "Offline AI Chat Assistant: On-Device LLM Inference in Java & Room DB",
    category: "Android",
    duration: "21:30",
    views: "32.6K views",
    timeAgo: "3 weeks ago",
    badge: "4K",
    channelName: "Reyansh Bhardwaj",
    channelAvatar: "/avatar.jpg",
    verified: true,
    themeColor: "#2e1065",
    accentColor: "#a855f7",
    tags: ["#LocalAI", "#Android", "#Java", "#EdgeComputing", "#RoomDB"],
    description:
      "Running quantized language models directly on Android mobile chips with zero network connection. Local vector indexing, token streaming, SQLite / Room persistence, and low memory consumption.",
    likes: "3.1K",
    likeCount: 3120,
    commentsCount: 64,
    githubUrl: "https://github.com/reyanshbhardwaj2005-spec/Offline-AI-chat-assistant",
    comments: [
      {
        id: "c-7",
        author: "EdgeAI_Dev",
        avatarBg: "#a855f7",
        timeAgo: "2 weeks ago",
        text: "The latency is so snappy! Running LLMs on-device without telemetry is definitely the future.",
        likes: 114,
      },
    ],
  },
  {
    id: "yt-5",
    title: "React India Keynote: Distributed Microservices & Edge Performance",
    category: "Keynotes",
    duration: "35:45",
    views: "58.2K views",
    timeAgo: "1 month ago",
    badge: "4K UHD",
    channelName: "Reyansh Bhardwaj",
    channelAvatar: "/avatar.jpg",
    verified: true,
    themeColor: "#4c0519",
    accentColor: "#f43f5e",
    tags: ["#ReactIndia", "#NextJS", "#Architecture", "#Conference", "#Microservices"],
    description:
      "Complete recorded keynote at React India: optimizing distributed microservice payloads, edge streaming, sub-10ms response times at scale, and high-concurrency systems.",
    likes: "5.6K",
    likeCount: 5612,
    commentsCount: 118,
    comments: [
      {
        id: "c-8",
        author: "TechLead_Global",
        avatarBg: "#e11d48",
        timeAgo: "3 weeks ago",
        text: "Attended this live in Bengaluru! The breakdown of edge streaming and server component caching was masterclass.",
        likes: 312,
      },
    ],
  },
  {
    id: "yt-6",
    title: "Kubernetes & Docker CI/CD: Automated Pipeline Deployment",
    category: "DevOps",
    duration: "16:20",
    views: "21.9K views",
    timeAgo: "1 month ago",
    badge: "1080p",
    channelName: "Reyansh Bhardwaj",
    channelAvatar: "/avatar.jpg",
    verified: true,
    themeColor: "#1e1b4b",
    accentColor: "#6366f1",
    tags: ["#Kubernetes", "#Docker", "#DevOps", "#CICD", "#CloudNative"],
    description:
      "Building a production automated CI/CD pipeline with GitHub Actions, Docker multi-stage builds, Kubernetes pod autoscaling, and zero-downtime rolling updates.",
    likes: "2.1K",
    likeCount: 2150,
    commentsCount: 42,
    comments: [
      {
        id: "c-9",
        author: "CloudGuy99",
        avatarBg: "#6366f1",
        timeAgo: "3 weeks ago",
        text: "The Docker layer caching optimization alone shaved 8 minutes off our deployment cycle. Kudos!",
        likes: 64,
      },
    ],
  },
];

export const YOUTUBE_SHORTS: YouTubeShort[] = [
  {
    id: "s-1",
    title: "120Hz Animation Physics with Zero Jank ⚡",
    views: "85K views",
    themeColor: "#1e1b4b",
    accentColor: "#818cf8",
    likes: "9.2K",
    tag: "#CSS3D #Animation",
  },
  {
    id: "s-2",
    title: "Kafka Partitioning Explained in 60s 🚀",
    views: "142K views",
    themeColor: "#064e3b",
    accentColor: "#34d399",
    likes: "15.4K",
    tag: "#SpringBoot #Kafka",
  },
  {
    id: "s-3",
    title: "On-Device AI with Zero Internet 🧠",
    views: "98K views",
    themeColor: "#3b0764",
    accentColor: "#c084fc",
    likes: "11.1K",
    tag: "#Android #LocalAI",
  },
  {
    id: "s-4",
    title: "Why IIIT Sonepat for Systems Engineering? 🎓",
    views: "64K views",
    themeColor: "#7c2d12",
    accentColor: "#fb923c",
    likes: "7.8K",
    tag: "#IIITSonepat #Tech",
  },
  {
    id: "s-5",
    title: "Kubernetes Pod Autoscaling Under 10K RPS ⚙️",
    views: "110K views",
    themeColor: "#172554",
    accentColor: "#60a5fa",
    likes: "12.3K",
    tag: "#DevOps #K8s",
  },
];

/* =========================================================================
   YOUTUBE ICONS (OFFICIAL SVG PATHS)
   ========================================================================= */

export function YouTubeLogo({ className = "yt-logo-svg" }: { className?: string }) {
  return (
    <div className="yt-logo-container">
      <svg viewBox="0 0 90 20" height="20" className={className} aria-label="YouTube">
        {/* Red rounded rectangle badge */}
        <g>
          <path
            d="M27.97 3.12C27.64 1.89 26.68.93 25.45.6 23.23 0 14.28 0 14.28 0S5.33 0 3.11.6C1.88.93.92 1.89.59 3.12 0 5.34 0 10 0 10s0 4.66.59 6.88c.33 1.23 1.29 2.19 2.52 2.52 2.22.6 11.17.6 11.17.6s8.95 0 11.17-.6c1.23-.33 2.19-1.29 2.52-2.52.59-2.22.59-6.88.59-6.88s0-4.66-.59-6.88z"
            fill="#FF0000"
          />
          {/* White play triangle */}
          <polygon points="11.42 14.28 19 10 11.42 5.72" fill="#FFFFFF" />
        </g>
        {/* YouTube Wordmark Text */}
        <text
          x="33"
          y="15.2"
          fontFamily="system-ui, -apple-system, Roboto, sans-serif"
          fontWeight="750"
          fontSize="14.5"
          letterSpacing="-0.04em"
          fill="currentColor"
        >
          YouTube
        </text>
      </svg>
      <span className="yt-country-badge">IN</span>
    </div>
  );
}

export function YtCastIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 20h.01" />
    </svg>
  );
}

export function YtBellIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export function YtSearchIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function YtShortsIcon({ size = 24, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.77 10.32l-1.2-.5 1.1-2.2a3.6 3.6 0 0 0-4.7-4.7L6.5 6.2a3.6 3.6 0 0 0-1.7 4.7l1.2.5-1.1 2.2a3.6 3.6 0 0 0 4.7 4.7l6.47-3.28a3.6 3.6 0 0 0 1.7-4.7z" />
      <polygon points="10 9.5 15 12 10 14.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YtHomeIcon({ size = 24, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.85"} strokeLinecap="round" strokeLinejoin="round">
      {active ? (
        <path d="M12 3.2L3 11.2h2.5V20.5a.5.5 0 0 0 .5.5H10v-6h4v6h4a.5.5 0 0 0 .5-.5V11.2h2.5L12 3.2z" fill="currentColor" />
      ) : (
        <path d="M4 11.5L12 4.5l8 7V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-8.5z" />
      )}
    </svg>
  );
}

export function YtSubscriptionsIcon({ size = 24, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor">
      <line x1="5" y1="3.5" x2="19" y2="3.5" strokeWidth="1.85" strokeLinecap="round" />
      <line x1="3" y1="6.5" x2="21" y2="6.5" strokeWidth="1.85" strokeLinecap="round" />
      <rect x="2" y="9.2" width="20" height="11.8" rx="2.2" fill="currentColor" stroke="currentColor" strokeWidth="1.85" />
      <polygon points="10 12.2 15.5 15.1 10 18" fill="var(--yt-bg, #ffffff)" stroke="none" />
    </svg>
  );
}

export function YtThumbUpIcon({ size = 18, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? "#ff0000" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

export function YtThumbDownIcon({ size = 18, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? "#ff0000" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}

export function YtShareIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

export function YtDownloadIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/* =========================================================================
   MAIN YOUTUBE APP VIEW COMPONENT
   ========================================================================= */

export function YouTubeAppView({
  onBack,
  isDarkMode = true,
}: {
  onBack: () => void;
  isDarkMode?: boolean;
}) {
  // Navigation & View States
  const [activeNavTab, setActiveNavTab] = useState<"home" | "shorts" | "create" | "subscriptions" | "you">("home");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Video Player States
  const [activePlayingVideo, setActivePlayingVideo] = useState<YouTubeVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(28); // percentage (0-100)
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [isDisliked, setIsDisliked] = useState<Record<string, boolean>>({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [userCommentText, setUserCommentText] = useState("");
  const [videoComments, setVideoComments] = useState(YOUTUBE_VIDEOS);

  // Shorts State
  const [activeShortIndex, setActiveShortIndex] = useState(0);

  // Horizontal scroll hook for category chips
  const categoryScrollRef = useHorizontalScroll<HTMLDivElement>();
  const shortsShelfScrollRef = useHorizontalScroll<HTMLDivElement>();

  // Filter Categories
  const categories = ["All", "Spring Boot", "Android", "3D Web", "DevOps", "Keynotes"];

  // Filtered video list
  const filteredVideos = useMemo(() => {
    return YOUTUBE_VIDEOS.filter((v) => {
      const matchCat = activeCategory === "All" || v.category === activeCategory;
      const matchSearch =
        !searchQuery.trim() ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Toast notification helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  }, []);

  // Player progress simulation when video is playing
  useEffect(() => {
    if (!activePlayingVideo || !isPlaying) return;
    const interval = setInterval(() => {
      setPlayerProgress((prev) => {
        if (prev >= 99) return 0;
        return prev + 0.5;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activePlayingVideo, isPlaying]);

  // Play a video
  const handlePlayVideo = (video: YouTubeVideo) => {
    setActivePlayingVideo(video);
    setIsPlaying(true);
    setPlayerProgress(8);
    setIsMiniPlayer(false);
    setIsDescriptionOpen(false);
    setIsCommentsOpen(false);
  };

  // Toggle Like
  const handleToggleLike = (vidId: string) => {
    setIsLiked((prev) => {
      const next = !prev[vidId];
      if (next) {
        showToast("Added to Liked videos");
      }
      return { ...prev, [vidId]: next };
    });
    if (isDisliked[vidId]) {
      setIsDisliked((prev) => ({ ...prev, [vidId]: false }));
    }
  };

  // Toggle Dislike
  const handleToggleDislike = (vidId: string) => {
    setIsDisliked((prev) => ({ ...prev, [vidId]: !prev[vidId] }));
    if (isLiked[vidId]) {
      setIsLiked((prev) => ({ ...prev, [vidId]: false }));
    }
  };

  // Toggle Subscribe
  const handleToggleSubscribe = () => {
    setIsSubscribed((prev) => {
      const next = !prev;
      showToast(next ? "Subscribed to Reyansh Bhardwaj! 🔔" : "Subscription removed");
      return next;
    });
  };

  // Share action
  const handleShare = (vidTitle: string) => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Link copied to clipboard!");
  };

  // Download action
  const handleDownload = () => {
    showToast("Video downloaded for offline viewing! ✓");
  };

  // Post comment
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCommentText.trim() || !activePlayingVideo) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: "You (Developer)",
      avatarBg: "#ff0000",
      timeAgo: "Just now",
      text: userCommentText.trim(),
      likes: 1,
    };
    activePlayingVideo.comments.unshift(newComment);
    activePlayingVideo.commentsCount += 1;
    setUserCommentText("");
    showToast("Comment posted!");
  };

  return (
    <div className={`yt-app-root ${isDarkMode ? "yt-dark" : "yt-light"}`}>
      {/* =========================================================================
         TOP APP HEADER (AUTHENTIC YOUTUBE MOBILE APP BAR)
         ========================================================================= */}
      <header className="yt-top-bar">
        <div className="yt-top-left">
          <button className="yt-icon-btn yt-back-btn" onClick={onBack} aria-label="Go back to Home">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <YouTubeLogo />
        </div>

        <div className="yt-top-right">
          <button className="yt-icon-btn" onClick={() => showToast("Searching for cast devices...")} aria-label="Cast to TV" title="Cast to screen">
            <YtCastIcon size={20} />
          </button>
          <button className="yt-icon-btn yt-bell-btn" onClick={() => showToast("No new notifications")} aria-label="Notifications" title="Notifications">
            <YtBellIcon size={20} />
            <span className="yt-badge-dot" />
          </button>
          <button
            className={`yt-icon-btn ${isSearchOpen ? "active" : ""}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search YouTube"
            title="Search"
          >
            <YtSearchIcon size={20} />
          </button>
          <button
            className="yt-profile-avatar-btn"
            onClick={() => setActiveNavTab("you")}
            aria-label="Your Profile"
            title="You"
          >
            <img src={profile.avatar || "/avatar.jpg"} alt={profile.name} className="yt-top-avatar" />
          </button>
        </div>
      </header>

      {/* =========================================================================
         LIVE SEARCH INPUT DRAWER (COLLAPSIBLE)
         ========================================================================= */}
      {isSearchOpen && (
        <div className="yt-search-drawer">
          <div className="yt-search-input-wrap">
            <YtSearchIcon size={18} />
            <input
              type="text"
              className="yt-search-input"
              placeholder="Search videos, Spring Boot, 3D Web..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button className="yt-search-clear" onClick={() => setSearchQuery("")} aria-label="Clear search">
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
         MAIN CONTENT AREA (BASED ON ACTIVE TAB)
         ========================================================================= */}
      <main className="yt-main-scrollable">
        {activeNavTab === "home" && (
          <>
            {/* Category / Filter Chips Bar */}
            <div className="yt-chips-container" ref={categoryScrollRef}>
              <div className="yt-chips-inner">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`yt-chip-pill ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Reyansh Bhardwaj Verified Channel Showcase Banner */}
            <section className="yt-channel-banner">
              <div className="yt-channel-banner-bg">
                <div className="yt-channel-banner-glow" />
              </div>
              <div className="yt-channel-info-row">
                <img src={profile.avatar || "/avatar.jpg"} alt={profile.name} className="yt-channel-avatar-lg" />
                <div className="yt-channel-meta">
                  <div className="yt-channel-name-line">
                    <span className="yt-channel-title">{profile.name}</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#3b82f6" aria-label="Verified channel">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <span className="yt-channel-handle">@ReyanshBhardwaj • 12 videos • 1.42K subs</span>
                  <p className="yt-channel-tagline">Systems, Microservices & 3D Web Architecture</p>
                </div>
                <button
                  className={`yt-subscribe-btn ${isSubscribed ? "subscribed" : ""}`}
                  onClick={handleToggleSubscribe}
                >
                  {isSubscribed ? "Subscribed 🔔" : "Subscribe"}
                </button>
              </div>
            </section>

            {/* Video Feed */}
            <div className="yt-video-feed">
              {filteredVideos.map((video, idx) => (
                <article
                  key={video.id}
                  className="yt-video-card"
                  onClick={() => handlePlayVideo(video)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play video: ${video.title}`}
                >
                  {/* Video Thumbnail (16:9) */}
                  <div
                    className="yt-thumb-wrapper"
                    style={{
                      background: `linear-gradient(135deg, ${video.themeColor} 0%, #000000 100%)`,
                    }}
                  >
                    {/* Simulated High-Production Graphic Mockup */}
                    <div className="yt-thumb-art">
                      <div className="yt-thumb-art-grid" />
                      <div className="yt-thumb-art-badge" style={{ borderColor: video.accentColor, color: video.accentColor }}>
                        {video.category.toUpperCase()}
                      </div>
                      <div className="yt-thumb-art-glow" style={{ background: video.accentColor }} />
                      <div className="yt-thumb-title-preview">{video.title}</div>
                      {/* Play Hover Overlay */}
                      <div className="yt-thumb-play-overlay">
                        <div className="yt-thumb-play-circle">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="#ffffff">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <span className="yt-duration-badge">{video.duration}</span>
                    {video.badge && <span className="yt-quality-badge">{video.badge}</span>}
                  </div>

                  {/* Video Details Row */}
                  <div className="yt-video-info">
                    <img src={video.channelAvatar} alt={video.channelName} className="yt-author-avatar" />
                    <div className="yt-video-meta">
                      <h3 className="yt-video-title">{video.title}</h3>
                      <div className="yt-video-subline">
                        <span>{video.channelName}</span>
                        {video.verified && (
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" className="yt-check-icon">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        )}
                        <span className="yt-dot">•</span>
                        <span>{video.views}</span>
                        <span className="yt-dot">•</span>
                        <span>{video.timeAgo}</span>
                      </div>
                    </div>
                    <button
                      className="yt-kebab-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast("Saved to Watch later");
                      }}
                      aria-label="More options"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}

              {/* YouTube Shorts Shelf */}
              <section className="yt-shorts-shelf">
                <div className="yt-shorts-header">
                  <div className="yt-shorts-title-group">
                    <YtShortsIcon size={22} active />
                    <span className="yt-shorts-shelf-title">Shorts</span>
                  </div>
                </div>

                <div className="yt-shorts-scroll-row" ref={shortsShelfScrollRef}>
                  {YOUTUBE_SHORTS.map((short, idx) => (
                    <div
                      key={short.id}
                      className="yt-short-card"
                      style={{
                        background: `linear-gradient(180deg, ${short.themeColor} 0%, #000000 100%)`,
                      }}
                      onClick={() => {
                        setActiveShortIndex(idx);
                        setActiveNavTab("shorts");
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="yt-short-glow" style={{ background: short.accentColor }} />
                      <div className="yt-short-badge">SHORTS</div>
                      <div className="yt-short-bottom-info">
                        <h4 className="yt-short-title">{short.title}</h4>
                        <span className="yt-short-views">{short.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}

        {/* =========================================================================
           SHORTS FULLSCREEN TAB VIEW
           ========================================================================= */}
        {activeNavTab === "shorts" && (
          <div className="yt-shorts-full-container">
            {YOUTUBE_SHORTS.map((short, idx) => {
              if (idx !== activeShortIndex) return null;
              return (
                <div
                  key={short.id}
                  className="yt-short-player-view"
                  style={{
                    background: `linear-gradient(180deg, ${short.themeColor} 0%, #050505 100%)`,
                  }}
                >
                  <div className="yt-short-video-sim">
                    <div className="yt-short-canvas-glow" style={{ background: short.accentColor }} />
                    <div className="yt-short-center-title">{short.title}</div>
                  </div>

                  {/* Right Action Rail */}
                  <div className="yt-short-actions-rail">
                    <button
                      className="yt-short-rail-btn"
                      onClick={() => showToast("Liked short! 👍")}
                      aria-label="Like short"
                    >
                      <YtThumbUpIcon size={22} />
                      <span>{short.likes}</span>
                    </button>
                    <button
                      className="yt-short-rail-btn"
                      onClick={() => showToast("Disliked")}
                      aria-label="Dislike short"
                    >
                      <YtThumbDownIcon size={22} />
                      <span>Dislike</span>
                    </button>
                    <button
                      className="yt-short-rail-btn"
                      onClick={() => showToast("Comments (32)")}
                      aria-label="Comments"
                    >
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>142</span>
                    </button>
                    <button
                      className="yt-short-rail-btn"
                      onClick={() => handleShare(short.title)}
                      aria-label="Share short"
                    >
                      <YtShareIcon size={22} />
                      <span>Share</span>
                    </button>
                    <button
                      className="yt-short-rail-btn"
                      onClick={() => {
                        const next = (activeShortIndex + 1) % YOUTUBE_SHORTS.length;
                        setActiveShortIndex(next);
                      }}
                      aria-label="Next short"
                    >
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <polyline points="7 13 12 18 17 13" />
                        <polyline points="7 6 12 11 17 6" />
                      </svg>
                      <span>Next</span>
                    </button>
                  </div>

                  {/* Bottom Meta */}
                  <div className="yt-short-bottom-meta">
                    <div className="yt-short-author-row">
                      <img src={profile.avatar || "/avatar.jpg"} alt={profile.name} className="yt-short-author-avatar" />
                      <span className="yt-short-author-name">@ReyanshBhardwaj</span>
                      <button
                        className="yt-short-sub-btn"
                        onClick={handleToggleSubscribe}
                      >
                        {isSubscribed ? "Subscribed" : "Subscribe"}
                      </button>
                    </div>
                    <p className="yt-short-caption">{short.title}</p>
                    <div className="yt-short-music-tag">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                      </svg>
                      <span>Reyansh Bhardwaj • Original Audio</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
           SUBSCRIPTIONS TAB VIEW
           ========================================================================= */}
        {activeNavTab === "subscriptions" && (
          <div className="yt-subs-tab-view">
            <h2 className="yt-section-heading">Subscribed Channels</h2>
            <div className="yt-subs-carousel">
              <div className="yt-sub-channel-card active">
                <img src="/avatar.jpg" alt="Reyansh Bhardwaj" className="yt-sub-avatar" />
                <span className="yt-sub-name">Reyansh Bhardwaj</span>
                <span className="yt-sub-badge">Official</span>
              </div>
              <div className="yt-sub-channel-card">
                <div className="yt-sub-avatar-placeholder" style={{ background: "#22c55e" }}>CS</div>
                <span className="yt-sub-name">Coding Shuttle</span>
                <span className="yt-sub-badge">Cohort 5.0</span>
              </div>
              <div className="yt-sub-channel-card">
                <div className="yt-sub-avatar-placeholder" style={{ background: "#0284c7" }}>IIIT</div>
                <span className="yt-sub-name">IIIT Sonepat</span>
                <span className="yt-sub-badge">CSE Batch</span>
              </div>
            </div>

            <h3 className="yt-section-subheading">Latest Community Posts</h3>
            <div className="yt-community-card">
              <div className="yt-comm-head">
                <img src="/avatar.jpg" alt="Reyansh Bhardwaj" className="yt-comm-avatar" />
                <div>
                  <div className="yt-comm-author">Reyansh Bhardwaj</div>
                  <div className="yt-comm-time">Yesterday</div>
                </div>
              </div>
              <p className="yt-comm-text">
                Just completed the Spring Boot 0 to 100 Cohort 5.0 course at Coding Shuttle! Built production-ready microservices with Kafka, Docker, and Spring Security. Verified ID: 3K031L0B. Check out the project repos! 🚀
              </p>
              <div className="yt-comm-actions">
                <button className="yt-comm-btn" onClick={() => showToast("Liked post! ❤️")}>
                  <YtThumbUpIcon size={16} /> 342
                </button>
                <button className="yt-comm-btn" onClick={() => showToast("Comments (52)")}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>{" "}
                  52
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           YOU / PROFILE TAB VIEW
           ========================================================================= */}
        {activeNavTab === "you" && (
          <div className="yt-you-tab-view">
            <div className="yt-you-header">
              <img src={profile.avatar || "/avatar.jpg"} alt={profile.name} className="yt-you-avatar" />
              <div>
                <h2 className="yt-you-name">{profile.name}</h2>
                <p className="yt-you-sub">{profile.role} • @ReyanshBhardwaj</p>
              </div>
            </div>

            <div className="yt-you-row-action">
              <button className="yt-you-pill-btn" onClick={() => showToast("Channel stats: 1.42K subscribers, 185K total views")}>
                View Channel Analytics
              </button>
              <button className="yt-you-pill-btn" onClick={() => showToast("Switched account")}>
                Switch Account
              </button>
            </div>

            <div className="yt-you-section">
              <h3 className="yt-section-heading">History</h3>
              <div className="yt-you-history-carousel">
                {YOUTUBE_VIDEOS.slice(0, 3).map((v) => (
                  <div key={v.id} className="yt-you-history-card" onClick={() => handlePlayVideo(v)}>
                    <div className="yt-you-history-thumb" style={{ background: v.themeColor }}>
                      <span className="yt-duration-badge">{v.duration}</span>
                    </div>
                    <h5 className="yt-you-history-title">{v.title}</h5>
                    <span className="yt-you-history-author">{v.channelName}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="yt-you-list">
              <div className="yt-you-item" onClick={() => showToast("Playlists: 4 created")}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 10h16M4 14h10" />
                  <polygon points="18 13 22 15.5 18 18" />
                </svg>
                <span>Playlists (4)</span>
              </div>
              <div className="yt-you-item" onClick={() => showToast("Watch later: 12 videos")}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Watch Later (12)</span>
              </div>
              <div className="yt-you-item" onClick={() => showToast("Liked videos: 85")}>
                <YtThumbUpIcon size={20} />
                <span>Liked Videos (85)</span>
              </div>
              <div className="yt-you-item" onClick={() => showToast("Downloads: All ready offline")}>
                <YtDownloadIcon size={20} />
                <span>Downloads (6)</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
         FULLSCREEN INTERACTIVE VIDEO PLAYER OVERLAY
         ========================================================================= */}
      {activePlayingVideo && !isMiniPlayer && (
        <div className="yt-player-modal">
          {/* Top Video Screen (16:9) */}
          <div
            className="yt-player-screen"
            style={{
              background: `linear-gradient(135deg, ${activePlayingVideo.themeColor} 0%, #000000 100%)`,
            }}
          >
            {/* Ambient Mode Backdrop Glow */}
            <div className="yt-player-ambient-glow" style={{ background: activePlayingVideo.accentColor }} />

            {/* Video Graphic Canvas Simulation */}
            <div className="yt-player-visual">
              <div className="yt-player-waveform" />
              <div className="yt-player-badge-top" style={{ color: activePlayingVideo.accentColor }}>
                {activePlayingVideo.category.toUpperCase()} • {activePlayingVideo.badge || "4K 60FPS"}
              </div>
              <div className="yt-player-visual-title">{activePlayingVideo.title}</div>
            </div>

            {/* Top Player Action Bar */}
            <div className="yt-player-screen-top">
              <button
                className="yt-player-top-btn"
                onClick={() => setIsMiniPlayer(true)}
                aria-label="Minimize player"
                title="Minimize"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="yt-player-screen-top-right">
                <button
                  className="yt-player-top-btn"
                  onClick={() => setIsMuted(!isMuted)}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
                <button
                  className="yt-player-top-btn"
                  onClick={() => showToast("Playback Quality: 2160p 4K 60fps (Auto)")}
                  aria-label="Settings"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Center Play / Pause Button */}
            <div className="yt-player-center-controls">
              <button
                className="yt-player-play-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="#ffffff">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="#ffffff">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Scrubber Progress Bar */}
            <div className="yt-player-scrubber-bar">
              <div className="yt-player-progress-bg">
                <div className="yt-player-progress-fill" style={{ width: `${playerProgress}%` }} />
                <div className="yt-player-progress-knob" style={{ left: `${playerProgress}%` }} />
              </div>
              <div className="yt-player-time-row">
                <span>06:48 / {activePlayingVideo.duration}</span>
                <span className="yt-player-badge-live">HD 60</span>
              </div>
            </div>
          </div>

          {/* Bottom Player Details & Engagement */}
          <div className="yt-player-body">
            {/* Title & Tags */}
            <div className="yt-player-meta-section">
              <div className="yt-player-tags">
                {activePlayingVideo.tags.map((t) => (
                  <span key={t} className="yt-player-tag">
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="yt-player-title">{activePlayingVideo.title}</h2>
              <div className="yt-player-view-line">
                <span>{activePlayingVideo.views}</span>
                <span className="yt-dot">•</span>
                <span>Premiered {activePlayingVideo.timeAgo}</span>
                <button
                  className="yt-desc-toggle-btn"
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                >
                  {isDescriptionOpen ? "Show less" : "...more"}
                </button>
              </div>

              {/* Expandable Description Box */}
              {isDescriptionOpen && (
                <div className="yt-expanded-description">
                  <p>{activePlayingVideo.description}</p>
                  {activePlayingVideo.githubUrl && (
                    <div className="yt-desc-links">
                      <a
                        href={activePlayingVideo.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="yt-desc-link-btn"
                      >
                        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        <span>View Source Code on GitHub</span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Channel Info Row */}
            <div className="yt-player-channel-row">
              <div className="yt-player-channel-left">
                <img src={activePlayingVideo.channelAvatar} alt={activePlayingVideo.channelName} className="yt-player-avatar" />
                <div className="yt-player-channel-meta">
                  <div className="yt-player-channel-name">
                    <span>{activePlayingVideo.channelName}</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="#3b82f6">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <span className="yt-player-sub-count">1.42K subscribers</span>
                </div>
              </div>
              <button
                className={`yt-player-sub-btn ${isSubscribed ? "subscribed" : ""}`}
                onClick={handleToggleSubscribe}
              >
                {isSubscribed ? "Subscribed ✓" : "Subscribe"}
              </button>
            </div>

            {/* Action Bar (Like, Dislike, Share, Download, Remix, Clip) */}
            <div className="yt-action-bar-scroll">
              <div className="yt-action-pill-group">
                <button
                  className={`yt-action-pill-btn ${isLiked[activePlayingVideo.id] ? "active" : ""}`}
                  onClick={() => handleToggleLike(activePlayingVideo.id)}
                >
                  <YtThumbUpIcon size={18} filled={isLiked[activePlayingVideo.id]} />
                  <span>{isLiked[activePlayingVideo.id] ? activePlayingVideo.likeCount + 1 : activePlayingVideo.likes}</span>
                </button>
                <div className="yt-action-pill-divider" />
                <button
                  className={`yt-action-pill-btn ${isDisliked[activePlayingVideo.id] ? "active" : ""}`}
                  onClick={() => handleToggleDislike(activePlayingVideo.id)}
                  aria-label="Dislike"
                >
                  <YtThumbDownIcon size={18} filled={isDisliked[activePlayingVideo.id]} />
                </button>
              </div>

              <button className="yt-action-pill-single" onClick={() => handleShare(activePlayingVideo.title)}>
                <YtShareIcon size={18} />
                <span>Share</span>
              </button>

              <button className="yt-action-pill-single" onClick={handleDownload}>
                <YtDownloadIcon size={18} />
                <span>Download</span>
              </button>

              <button className="yt-action-pill-single" onClick={() => showToast("Saved to Watch Later")}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span>Save</span>
              </button>
            </div>

            {/* Comments Card Section */}
            <div className="yt-comments-preview-card" onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
              <div className="yt-comments-head">
                <div className="yt-comments-title">
                  <span>Comments</span>
                  <span className="yt-comments-counter">{activePlayingVideo.commentsCount}</span>
                </div>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 15l-4-4h8l-4 4z" />
                </svg>
              </div>

              {activePlayingVideo.comments.length > 0 && (
                <div className="yt-top-comment-row">
                  <div className="yt-comment-author-avatar" style={{ background: activePlayingVideo.comments[0].avatarBg }}>
                    {activePlayingVideo.comments[0].author[0]}
                  </div>
                  <p className="yt-comment-snippet">{activePlayingVideo.comments[0].text}</p>
                </div>
              )}
            </div>

            {/* Expandable Comments Drawer */}
            {isCommentsOpen && (
              <div className="yt-expanded-comments-drawer">
                <form className="yt-add-comment-row" onSubmit={handlePostComment}>
                  <img src={profile.avatar || "/avatar.jpg"} alt="You" className="yt-my-comment-avatar" />
                  <input
                    type="text"
                    className="yt-comment-input"
                    placeholder="Add a public comment..."
                    value={userCommentText}
                    onChange={(e) => setUserCommentText(e.target.value)}
                  />
                  <button type="submit" className="yt-comment-submit-btn" disabled={!userCommentText.trim()}>
                    Comment
                  </button>
                </form>

                <div className="yt-comments-list">
                  {activePlayingVideo.comments.map((c) => (
                    <div key={c.id} className="yt-comment-item">
                      <div className="yt-comment-avatar" style={{ background: c.avatarBg }}>
                        {c.author[0]}
                      </div>
                      <div className="yt-comment-content">
                        <div className="yt-comment-user-row">
                          <span className="yt-comment-username">{c.author}</span>
                          <span className="yt-comment-time">{c.timeAgo}</span>
                        </div>
                        <p className="yt-comment-text">{c.text}</p>
                        <div className="yt-comment-actions">
                          <button className="yt-comment-like-btn" onClick={() => showToast("Liked comment")}>
                            <YtThumbUpIcon size={14} /> {c.likes}
                          </button>
                          <button className="yt-comment-dislike-btn">
                            <YtThumbDownIcon size={14} />
                          </button>
                          <button className="yt-comment-reply-btn" onClick={() => showToast("Reply feature")}>
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Up Next / Recommended Videos */}
            <div className="yt-up-next-section">
              <h4 className="yt-up-next-heading">Up Next</h4>
              {YOUTUBE_VIDEOS.filter((v) => v.id !== activePlayingVideo.id).map((v) => (
                <div
                  key={v.id}
                  className="yt-recommended-card"
                  onClick={() => handlePlayVideo(v)}
                >
                  <div className="yt-rec-thumb" style={{ background: v.themeColor }}>
                    <span className="yt-duration-badge">{v.duration}</span>
                  </div>
                  <div className="yt-rec-info">
                    <h5 className="yt-rec-title">{v.title}</h5>
                    <span className="yt-rec-author">{v.channelName}</span>
                    <span className="yt-rec-stats">{v.views} • {v.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         FLOATING MINI-PLAYER (WHEN MINIMIZED)
         ========================================================================= */}
      {activePlayingVideo && isMiniPlayer && (
        <div className="yt-mini-player" onClick={() => setIsMiniPlayer(false)}>
          <div className="yt-mini-thumb" style={{ background: activePlayingVideo.themeColor }}>
            <div className="yt-mini-progress-fill" style={{ width: `${playerProgress}%` }} />
          </div>
          <div className="yt-mini-info">
            <div className="yt-mini-title">{activePlayingVideo.title}</div>
            <div className="yt-mini-author">{activePlayingVideo.channelName}</div>
          </div>
          <button
            className="yt-mini-ctrl-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
          <button
            className="yt-mini-ctrl-btn"
            onClick={(e) => {
              e.stopPropagation();
              setActivePlayingVideo(null);
            }}
            aria-label="Close player"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* =========================================================================
         BOTTOM NAVIGATION BAR (5 TABS YOUTUBE STYLE)
      {/* =========================================================================
         BOTTOM NAVIGATION BAR (EXACT MATCH OF USER REFERENCE DESIGN)
         ========================================================================= */}
      <nav className="yt-bottom-nav">
        <div className="yt-nav-row">
          <button
            className={`yt-nav-item ${activeNavTab === "home" ? "active" : ""}`}
            onClick={() => setActiveNavTab("home")}
            aria-label="Home"
          >
            <YtHomeIcon size={24} active={activeNavTab === "home"} />
            <span>Home</span>
          </button>

          <button
            className={`yt-nav-item ${activeNavTab === "shorts" ? "active" : ""}`}
            onClick={() => setActiveNavTab("shorts")}
            aria-label="Shorts"
          >
            <YtShortsIcon size={24} active={activeNavTab === "shorts"} />
            <span>Shorts</span>
          </button>

          <div className="yt-nav-create-wrap">
            <button
              className="yt-nav-create-btn"
              onClick={() => showToast("Create: Upload Video or Create Short")}
              aria-label="Create"
              title="Create"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          <button
            className={`yt-nav-item ${activeNavTab === "subscriptions" ? "active" : ""}`}
            onClick={() => setActiveNavTab("subscriptions")}
            aria-label="Subscriptions"
          >
            <YtSubscriptionsIcon size={24} active={activeNavTab === "subscriptions"} />
            <span>Subscriptions</span>
          </button>

          <button
            className={`yt-nav-item ${activeNavTab === "you" ? "active" : ""}`}
            onClick={() => setActiveNavTab("you")}
            aria-label="You"
          >
            <div className={`yt-nav-avatar-wrap ${activeNavTab === "you" ? "active" : ""}`}>
              <img src={profile.avatar || "/avatar.jpg"} alt="You" className="yt-nav-avatar" />
            </div>
            <span>You</span>
          </button>
        </div>
      </nav>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="yt-toast">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
