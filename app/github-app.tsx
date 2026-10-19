"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { githubProfileData } from "./data";
import type { GitHubRepoItem, GitHubActivityItem, GitHubProfileData } from "./data";

/* ---------- Octicon Helper Components ---------- */

function OcticonRepo({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h6.5a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-6.5a.25.25 0 0 1-.25-.25Z" />
    </svg>
  );
}

function OcticonStar({ size = 15, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill={filled ? "#e3b341" : "currentColor"} aria-hidden="true">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  );
}

function OcticonFork({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h4.5A2.25 2.25 0 0 0 12.5 6.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878Zm6.75-2.122a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM8.75 10.5a.75.75 0 0 1 .75.75v.878a2.25 2.25 0 1 1-1.5 0v-.878a.75.75 0 0 1 .75-.75Zm-.75 3.128a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
    </svg>
  );
}

function OcticonCommit({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
    </svg>
  );
}

function OcticonMarkGithub({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function OcticonPin({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12.68 1.47a.75.75 0 0 1 1.06 1.06l-.01.01-1.07 1.07 1.85 1.85a.75.75 0 0 1-.22 1.23l-3.37 1.12-2.58 2.58a.75.75 0 0 1-1.06-1.06l2.58-2.58-1.12-3.37a.75.75 0 0 1 1.23-.22l1.85 1.85 1.07-1.07ZM4.5 10.25a.75.75 0 0 1 .75.75v3.25a.75.75 0 0 1-1.5 0V11a.75.75 0 0 1 .75-.75Z" />
    </svg>
  );
}

/* ---------- Horizontal Smooth Drag & Wheel Hook ---------- */

export function useHorizontalScroll<T extends HTMLElement>() {
  const cleanupRef = useRef<(() => void) | null>(null);

  const ref = useCallback((el: T | null) => {
    // 1. Clean up any previous listener from a previously mounted node
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (!el) return;

    // 2. Wheel event: ONLY handle horizontal gestures (trackpad deltaX or Shift+wheel).
    // NEVER intercept vertical wheel turns so the page scrolls vertically smoothly without stopping!
    const onWheel = (e: WheelEvent) => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 1) return;

      const isHorizontalIntent = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!isHorizontalIntent) {
        // Pure vertical wheel: DO NOT intercept! Allow page to scroll vertically without stopping!
        return;
      }

      const delta = e.shiftKey ? e.deltaY : e.deltaX;
      if (Math.abs(delta) > 0) {
        const canScrollRight = delta > 0 && el.scrollLeft < maxScroll - 1;
        const canScrollLeft = delta < 0 && el.scrollLeft > 1;

        if (canScrollRight || canScrollLeft) {
          e.preventDefault();
          e.stopPropagation();
          el.scrollLeft += delta;
        }
      }
    };

    // 3. Mouse drag-to-scroll with pointer capture & native scrollbar bypass
    let isDown = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let captured = false;
    let hasMoved = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // Touch screens use native momentum pan
      if (e.button !== 0) return; // Only primary mouse button

      // CRITICAL: Did the user click directly on the native scrollbar?
      // In CSS/DOM, clientWidth/clientHeight do NOT include scrollbars.
      // So if the click coordinate is beyond clientHeight or clientWidth, it's on the scrollbar!
      const rect = el.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const isScrollbarClick = clickY >= el.clientHeight || clickX >= el.clientWidth;
      if (isScrollbarClick) {
        // DO NOT intercept! Let native browser scrollbar handle track clicks and thumb drag.
        return;
      }

      isDown = true;
      hasMoved = false;
      captured = false;
      startX = e.clientX;
      startY = e.clientY;
      scrollLeft = el.scrollLeft;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!hasMoved) {
        // Wait until pointer moved at least 4px horizontally before capturing pointer
        if (Math.abs(dx) > 4 && Math.abs(dx) > Math.abs(dy)) {
          hasMoved = true;
          try {
            el.setPointerCapture(e.pointerId);
            captured = true;
          } catch {}
        } else if (Math.abs(dy) > 7) {
          // Dominant vertical gesture, cancel drag so user can scroll page vertically
          isDown = false;
          return;
        }
      }

      if (hasMoved) {
        el.scrollLeft = scrollLeft - dx;
        e.preventDefault();
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDown) {
        isDown = false;
        if (captured) {
          try {
            el.releasePointerCapture(e.pointerId);
          } catch {}
          captured = false;
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    cleanupRef.current = () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  return ref;
}

/* ---------- 52-Week Contribution Grid Data (156 Contributions) ---------- */

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

function buildContributionWeeks(): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  const baseDate = new Date("2025-10-19T00:00:00Z");

  const burstDays: Record<string, number> = {
    // Feb 2026: water-management, employee-service, ecommerce-config-server
    "2026-02-12": 6,
    "2026-02-13": 8,
    "2026-02-14": 4,
    "2026-02-15": 5,
    "2026-02-16": 7,
    "2026-02-17": 5,
    "2026-02-20": 3,
    // June 2026: Reality-Lens-Android-Version
    "2026-06-18": 6,
    "2026-06-19": 7,
    "2026-06-20": 8,
    "2026-06-21": 7,
    // July 2026: pyq-management-backend-SpringBoot & Android
    "2026-07-14": 4,
    "2026-07-15": 8,
    "2026-07-16": 9,
    "2026-07-17": 6,
    // August - Sept 2026: TalentNest, PYQ-s-Android
    "2026-08-05": 3,
    "2026-08-12": 4,
    "2026-08-25": 4,
    "2026-09-02": 3,
    "2026-09-14": 4,
    // October 2026: Portfolio-2, Offline-AI-chat-assistant, Offline-AI-chat-model
    "2026-10-11": 5,
    "2026-10-12": 7,
    "2026-10-13": 6,
    "2026-10-14": 8,
    "2026-10-15": 4,
    "2026-10-17": 3,
    "2026-10-18": 2,
  };

  const occasionalDays = new Set([
    "2025-11-14", "2025-12-05", "2026-01-12", "2026-01-26",
    "2026-03-04", "2026-03-18", "2026-04-10", "2026-04-22",
    "2026-05-08", "2026-05-20"
  ]);

  for (let w = 0; w < 52; w++) {
    const week: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const curDate = new Date(baseDate);
      curDate.setUTCDate(curDate.getUTCDate() + (w * 7 + d));
      const iso = curDate.toISOString().slice(0, 10);
      const dateStr = curDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

      const count = burstDays[iso] || (occasionalDays.has(iso) ? 1 : 0);
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count >= 10) level = 4;
      else if (count >= 7) level = 3;
      else if (count >= 4) level = 2;
      else if (count >= 1) level = 1;

      week.push({ date: dateStr, count, level });
    }
    weeks.push(week);
  }

  return weeks;
}

const CONTRIBUTION_WEEKS = buildContributionWeeks();

/* ---------- Kinetic Smooth Scroll Hook ---------- */

function useSmoothGithubScroll(options?: {
  onScroll?: (e: Event | React.UIEvent<HTMLDivElement>) => void;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inertiaRafId = useRef<number | null>(null);

  const dragData = useRef({
    active: false,
    startX: 0,
    startY: 0,
    scrollTop: 0,
    moved: false,
    captured: false,
    pointerId: 0,
    history: [] as { y: number; time: number }[],
  });

  const stopAllScrollPhysics = useCallback(() => {
    if (inertiaRafId.current !== null) {
      cancelAnimationFrame(inertiaRafId.current);
      inertiaRafId.current = null;
    }
  }, []);

  const checkReveals = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const items = container.querySelectorAll<HTMLElement>(".scroll-reveal-item, .github-card, .github-repo-card");

    items.forEach((item) => {
      if (item.classList.contains("is-revealed")) return;
      const rect = item.getBoundingClientRect();
      const isEntering = rect.top <= containerRect.bottom + 40 && rect.bottom >= containerRect.top - 40;
      if (isEntering) {
        item.classList.add("is-revealed");
      }
    });
  }, []);

  const lastRevealTime = useRef(0);
  const throttledCheckReveals = useCallback((force = false) => {
    const now = performance.now();
    if (!force && now - lastRevealTime.current < 80) return;
    lastRevealTime.current = now;
    checkReveals();
  }, [checkReveals]);

  const smoothScrollBy = useCallback((deltaY: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ top: deltaY, behavior: "smooth" });
  }, []);

  const launchInertia = useCallback((initialVy: number) => {
    const el = scrollRef.current;
    if (!el) return;

    let velocity = Math.max(-3.5, Math.min(3.5, initialVy));
    let lastInertiaTime = performance.now();

    const inertiaLoop = (now: number) => {
      const node = scrollRef.current;
      if (!node) {
        inertiaRafId.current = null;
        return;
      }

      const dt = Math.min(32, Math.max(1, now - lastInertiaTime));
      lastInertiaTime = now;

      const friction = Math.pow(0.935, dt / 16.67);
      velocity *= friction;

      const maxScroll = node.scrollHeight - node.clientHeight;
      node.scrollTop += velocity * dt;
      throttledCheckReveals(false);

      if (node.scrollTop <= 0 || node.scrollTop >= maxScroll || Math.abs(velocity) < 0.02) {
        inertiaRafId.current = null;
        throttledCheckReveals(true);
      } else {
        inertiaRafId.current = requestAnimationFrame(inertiaLoop);
      }
    };

    stopAllScrollPhysics();
    inertiaRafId.current = requestAnimationFrame(inertiaLoop);
  }, [throttledCheckReveals, stopAllScrollPhysics]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    (el as any).__smoothScrollBy = smoothScrollBy;

    const timer = setTimeout(() => {
      checkReveals();
    }, 50);

    const onScroll = (e: Event) => {
      throttledCheckReveals();
      options?.onScroll?.(e);
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
      stopAllScrollPhysics();
      delete (el as any).__smoothScrollBy;
    };
  }, [smoothScrollBy, checkReveals, throttledCheckReveals, options, stopAllScrollPhysics]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = e.target as HTMLElement;

    if (
      target.closest(
        "button, a, input, select, .github-action-btn, .github-chip, .github-subnav-tab, .github-drawer-sheet"
      )
    ) {
      return;
    }

    stopAllScrollPhysics();

    dragData.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      scrollTop: el.scrollTop,
      moved: false,
      captured: false,
      pointerId: e.pointerId,
      history: [{ y: e.clientY, time: performance.now() }],
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragData.current.active) return;
    const el = scrollRef.current;
    if (!el) return;

    const dx = e.clientX - dragData.current.startX;
    const dy = e.clientY - dragData.current.startY;
    const dist = Math.hypot(dx, dy);

    if (!dragData.current.moved) {
      if (dist < 6) return;
      dragData.current.moved = true;
      el.classList.add("is-scrolling");
      if (!dragData.current.captured) {
        try {
          el.setPointerCapture(e.pointerId);
          dragData.current.captured = true;
        } catch {}
      }
    }

    const now = performance.now();
    dragData.current.history.push({ y: e.clientY, time: now });
    dragData.current.history = dragData.current.history.filter((p) => now - p.time <= 100);

    el.scrollTop = dragData.current.scrollTop - dy;
    throttledCheckReveals();
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragData.current.active) return;
    dragData.current.active = false;

    const el = scrollRef.current;
    if (el) {
      el.classList.remove("is-scrolling");
      if (dragData.current.captured) {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {}
        dragData.current.captured = false;
      }

      if (dragData.current.moved) {
        const history = dragData.current.history;
        if (history.length >= 2) {
          const now = performance.now();
          const recent = history.filter((p) => now - p.time <= 80);
          if (recent.length >= 2) {
            const first = recent[0];
            const last = recent[recent.length - 1];
            const dt = last.time - first.time;
            if (dt > 8) {
              const dy = last.y - first.y;
              const vy = -dy / dt;
              if (Math.abs(vy) > 0.15) {
                launchInertia(vy);
              }
            }
          }
        }
        setTimeout(() => {
          dragData.current.moved = false;
        }, 60);
      }
    }
  };

  return {
    scrollRef,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
    smoothScrollBy,
    checkReveals,
  };
}

/* =========================================================================
   MAIN GITHUB MOBILE APPLICATION COMPONENT
   ========================================================================= */

export function GitHubAppView({
  onBack,
  isDarkMode = false,
  onOpenApp,
}: {
  onBack: () => void;
  isDarkMode?: boolean;
  onOpenApp?: (appId: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "repositories" | "activity" | "readme">("overview");
  const [contribViewMode, setContribViewMode] = useState<"calendar" | "snake">("calendar");
  const [repos, setRepos] = useState<GitHubRepoItem[]>(githubProfileData.repos);
  const [pinnedRepos, setPinnedRepos] = useState<GitHubRepoItem[]>(githubProfileData.pinnedRepos);
  const [profileData, setProfileData] = useState<GitHubProfileData>(githubProfileData);
  const [isFetchingLive, setIsFetchingLive] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>("Just now");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"updated" | "name" | "stars">("updated");
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepoItem | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isProfileStarred, setIsProfileStarred] = useState(false);
  const [repoFilter, setRepoFilter] = useState<"all" | "starred">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const subnavRef = useHorizontalScroll<HTMLDivElement>();
  const calendarScrollRef = useHorizontalScroll<HTMLDivElement>();
  const filterChipsRef = useHorizontalScroll<HTMLDivElement>();
  const iconsRowRef1 = useHorizontalScroll<HTMLDivElement>();
  const iconsRowRef2 = useHorizontalScroll<HTMLDivElement>();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  /* ---- Live GitHub API Integration ---- */
  const fetchFromGitHub = useCallback(async (manual = false) => {
    setIsFetchingLive(true);
    try {
      // 1. Fetch user profile
      const userRes = await fetch("https://api.github.com/users/reyanshbhardwaj2005-spec");
      if (userRes.ok) {
        const u = await userRes.json();
        setProfileData((prev) => ({
          ...prev,
          name: u.name || prev.name,
          bio: u.bio || prev.bio,
          avatarUrl: u.avatar_url || prev.avatarUrl,
          publicRepos: u.public_repos !== undefined ? u.public_repos : prev.publicRepos,
          followers: u.followers !== undefined ? u.followers : prev.followers,
          following: u.following !== undefined ? u.following : prev.following,
          location: "Meerut, India",
        }));
      }

      // 2. Fetch starred repos to know which ones Reyansh has starred
      let starredNames: string[] = [
        "Reality-Lens-Android-Version",
        "pyq-management-backend-SpringBoot",
        "Offline-AI-chat-assistant",
      ];
      try {
        const starRes = await fetch("https://api.github.com/users/reyanshbhardwaj2005-spec/starred");
        if (starRes.ok) {
          const liveStarred = await starRes.json();
          if (Array.isArray(liveStarred) && liveStarred.length > 0) {
            starredNames = liveStarred.map((s: any) => s.name);
            setProfileData((prev) => ({ ...prev, starredCount: liveStarred.length }));
          }
        }
      } catch {}

      // 3. Fetch all public repos
      const reposRes = await fetch("https://api.github.com/users/reyanshbhardwaj2005-spec/repos?sort=updated&per_page=100");
      if (reposRes.ok) {
        const liveRepos = await reposRes.json();
        if (Array.isArray(liveRepos) && liveRepos.length > 0) {
          const getLangColor = (lang: string) => {
            switch (lang) {
              case "Java": return "#b07219";
              case "JavaScript": return "#f1e05a";
              case "TypeScript": return "#3178c6";
              case "Python": return "#3572A5";
              case "C++": return "#f34b7d";
              case "CSS": return "#563d7c";
              case "HTML": return "#e34c26";
              default: return "#8b949e";
            }
          };

          const pinnedNames = [
            "Reality-Lens-Android-Version",
            "pyq-management-backend-SpringBoot",
            "Offline-AI-chat-assistant",
            "Portfolio-2",
            "water-management-system",
            "TalentNest",
            "PYQ-s-Android",
          ];

          const formatted: GitHubRepoItem[] = liveRepos.map((r: any) => ({
            id: r.id,
            name: r.name,
            fullName: r.full_name,
            description: r.description || "Open source repository by Reyansh Bhardwaj.",
            language: r.language || "Other",
            languageColor: getLangColor(r.language),
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            updatedAt: r.updated_at,
            pushedAt: r.pushed_at,
            htmlUrl: r.html_url,
            cloneUrl: r.clone_url || `https://github.com/${r.full_name}.git`,
            defaultBranch: r.default_branch || "main",
            isPinned: pinnedNames.includes(r.name),
            isStarred: starredNames.includes(r.name) || (r.stargazers_count > 0 && r.stargazers_count !== undefined),
            size: r.size,
          }));

          setRepos(formatted);
          setPinnedRepos(formatted.filter((r) => r.isPinned));
        }
      }

      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      if (manual) {
        showToast("✓ Live GitHub data synchronized!");
      }
    } catch (err) {
      console.warn("GitHub live sync used pre-cached mapped fallback:", err);
      if (manual) {
        showToast("Synced with local repository cache");
      }
    } finally {
      setIsFetchingLive(false);
    }
  }, []);

  useEffect(() => {
    fetchFromGitHub(false);
  }, [fetchFromGitHub]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement> | Event) => {
    const target = (e as any).currentTarget || (e as any).target;
    if (!target) return;
    const top = target.scrollTop;
    if (top > 12 && !isScrolled) setIsScrolled(true);
    else if (top <= 12 && isScrolled) setIsScrolled(false);
  };

  const { scrollRef, pointerHandlers, checkReveals } = useSmoothGithubScroll({
    onScroll: handleScroll,
  });

  useEffect(() => {
    const timer = setTimeout(() => checkReveals(), 40);
    return () => clearTimeout(timer);
  }, [activeTab, searchQuery, selectedLanguage, sortBy, repoFilter, checkReveals]);

  const starredReposList = repos.filter((r) => r.isStarred);

  /* ---- Filter and Sort Repositories ---- */
  const filteredRepos = repos.filter((r) => {
    if (repoFilter === "starred" && !r.isStarred) {
      return false;
    }
    if (selectedLanguage !== "all" && r.language.toLowerCase() !== selectedLanguage.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.language.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "stars") return b.stars - a.stars;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  // Calculate languages distribution for the activity tab
  const langCount: Record<string, number> = {};
  repos.forEach((r) => {
    const lang = r.language || "Other";
    langCount[lang] = (langCount[lang] || 0) + 1;
  });
  const totalReposCount = repos.length || 1;
  const langBreakdown = Object.entries(langCount)
    .map(([lang, count]) => ({
      lang,
      count,
      pct: Math.round((count / totalReposCount) * 100),
      color: repos.find((r) => r.language === lang)?.languageColor || "#8b949e",
    }))
    .sort((a, b) => b.count - a.count);

  const copyToClipboard = (text: string, label: string) => {
    try {
      navigator.clipboard.writeText(text);
      showToast(`✓ Copied ${label} to clipboard!`);
    } catch {
      showToast(`Selected: ${text}`);
    }
  };

  return (
    <div className={`github-app-container${isDarkMode ? " dark" : " light"}`}>
      {/* Top GitHub App Bar */}
      <header className={`github-top-bar${isScrolled ? " scrolled" : ""}`}>
        <button
          type="button"
          className="github-back-btn"
          onClick={onBack}
          aria-label="Back to home screen"
          title="Back to home screen"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="github-brand-lockup">
          <OcticonMarkGithub size={22} />
          <div className="github-brand-text">
            <span className="github-brand-title">GitHub</span>
            <span className="github-brand-user">@{profileData.login}</span>
          </div>
        </div>

        <div className="github-top-actions">
          {/* Live Sync Refresh Button */}
          <button
            type="button"
            className={`github-icon-btn${isFetchingLive ? " spinning" : ""}`}
            onClick={() => fetchFromGitHub(true)}
            aria-label="Refresh from GitHub API"
            title="Refresh from GitHub API"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.002 7.002 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.002 7.002 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z" />
            </svg>
          </button>

          {/* External Web Link to GitHub Profile */}
          <a
            href={`https://github.com/${profileData.login}`}
            target="_blank"
            rel="noreferrer"
            className="github-icon-btn"
            aria-label="Open on GitHub.com"
            title="Open on GitHub.com"
          >
            <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor">
              <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
            </svg>
          </a>

          {/* Share Profile */}
          <button
            type="button"
            className="github-icon-btn"
            onClick={() => copyToClipboard(`https://github.com/${profileData.login}`, "Profile URL")}
            aria-label="Share Profile"
            title="Share Profile"
          >
            <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor">
              <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488 1.416l-6.718-3.12a2.5 2.5 0 1 1 0-4.336l6.718-3.12A2.49 2.49 0 0 1 11 2.5Z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Scrollable Body */}
      <div
        className="github-scroll-body"
        ref={scrollRef}
        {...pointerHandlers}
        onScroll={handleScroll}
      >
        {/* Profile Card Header */}
        <section className="github-profile-card scroll-reveal-item">
          <div className="github-profile-top-row">
            <div className="github-avatar-wrap">
              <img
                src={profileData.avatarUrl}
                alt={profileData.name}
                className="github-avatar-img"
              />
              <span className="github-status-online" title="Active Developer" />
            </div>

            <div className="github-profile-info">
              <h1 className="github-profile-fullname">{profileData.name}</h1>
              <span className="github-profile-handle">@{profileData.login}</span>
              <div className="github-badge-row">
                <span className="github-pill-badge pro">PRO</span>
                <span className="github-pill-badge dev">Android Developer</span>
                <span className="github-pill-badge spring">Spring Boot</span>
              </div>
            </div>
          </div>

          <p className="github-profile-bio">{profileData.bio}</p>
          <p className="github-profile-tagline">“{profileData.tagline}”</p>

          {/* Meta Attributes */}
          <div className="github-meta-items">
            <span className="github-meta-tag">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
                <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z" />
              </svg>
              {profileData.location}
            </span>

            <span className="github-meta-tag sync-tag" title="Last API Sync">
              <span className={`github-sync-dot${isFetchingLive ? " pulse" : ""}`} />
              Live Sync: {lastSyncedTime}
            </span>
          </div>

          {/* Social Stats Row */}
          <div className="github-stats-row">
            <button
              type="button"
              className="github-stat-pill"
              onClick={() => setActiveTab("repositories")}
            >
              <OcticonRepo size={14} />
              <strong className="github-stat-num">{repos.length}</strong>
              <span className="github-stat-lbl">repositories</span>
            </button>

            <div className="github-stat-pill">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 4.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z" />
              </svg>
              <strong className="github-stat-num">{profileData.followers}</strong>
              <span className="github-stat-lbl">followers</span>
              <span className="github-stat-dot">·</span>
              <strong className="github-stat-num">{profileData.following}</strong>
              <span className="github-stat-lbl">following</span>
            </div>
          </div>

          {/* Profile CTA Buttons */}
          <div className="github-profile-btns">
            <button
              type="button"
              className={`github-action-btn primary${isFollowing ? " following" : ""}`}
              onClick={() => {
                const nextState = !isFollowing;
                setIsFollowing(nextState);
                showToast(nextState ? "✓ Followed @reyanshbhardwaj2005-spec" : "Unfollowed");
              }}
            >
              {isFollowing ? "✓ Following" : "+ Follow"}
            </button>

            <button
              type="button"
              className={`github-action-btn secondary${isProfileStarred ? " starred" : ""}`}
              onClick={() => {
                const next = !isProfileStarred;
                setIsProfileStarred(next);
                showToast(next ? "⭐ Starred profile!" : "Star removed");
              }}
            >
              <OcticonStar size={14} filled={isProfileStarred} />
              {isProfileStarred ? "Starred" : "Star"}
            </button>

            <button
              type="button"
              className="github-action-btn secondary"
              onClick={() => {
                if (onOpenApp) {
                  onOpenApp("mail");
                } else {
                  window.location.href = `mailto:${profileData.email}`;
                }
              }}
            >
              ✉ Message
            </button>
          </div>
        </section>

        {/* Navigation Tabs Pill Bar */}
        <div className="github-subnav-bar-wrapper">
          <div className="github-subnav-bar" ref={subnavRef} data-horizontal-scroll="true">
            <button
              type="button"
              className={`github-subnav-tab${activeTab === "overview" ? " active" : ""}`}
              onClick={(e) => {
                setActiveTab("overview");
                const p = e.currentTarget.parentElement;
                if (p) p.scrollTo({ left: 0, behavior: "smooth" });
              }}
            >
              Overview
            </button>
            <button
              type="button"
              className={`github-subnav-tab${activeTab === "repositories" ? " active" : ""}`}
              onClick={(e) => {
                setActiveTab("repositories");
                setRepoFilter("all");
                const btn = e.currentTarget;
                const p = btn.parentElement;
                if (p) {
                  const left = btn.offsetLeft - p.offsetLeft - (p.clientWidth - btn.clientWidth) / 2;
                  p.scrollTo({ left, behavior: "smooth" });
                }
              }}
            >
              Repositories
              <span className="github-tab-counter">{repos.length}</span>
            </button>
            <button
              type="button"
              className={`github-subnav-tab${activeTab === "activity" ? " active" : ""}`}
              onClick={(e) => {
                setActiveTab("activity");
                const btn = e.currentTarget;
                const p = btn.parentElement;
                if (p) {
                  const left = btn.offsetLeft - p.offsetLeft - (p.clientWidth - btn.clientWidth) / 2;
                  p.scrollTo({ left, behavior: "smooth" });
                }
              }}
            >
              Activity
            </button>
            <button
              type="button"
              className={`github-subnav-tab${activeTab === "readme" ? " active" : ""}`}
              onClick={(e) => {
                setActiveTab("readme");
                const btn = e.currentTarget;
                const p = btn.parentElement;
                if (p) {
                  const left = btn.offsetLeft - p.offsetLeft - (p.clientWidth - btn.clientWidth) / 2;
                  p.scrollTo({ left, behavior: "smooth" });
                }
              }}
            >
              README.md
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="github-tab-content github-fade-in" key="tab-overview">
            {/* Pinned Repositories Section */}
            <div className="github-section-head">
              <h2 className="github-section-title">
                <OcticonPin size={15} />
                Pinned
              </h2>
              <span className="github-section-sub">{pinnedRepos.length} featured</span>
            </div>

            <div className="github-pinned-grid">
              {pinnedRepos.map((repo, i) => (
                <div
                  key={repo.id}
                  className="github-pinned-card scroll-reveal-item"
                  style={{ "--child-idx": i } as CSSProperties}
                  onClick={() => setSelectedRepo(repo)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="github-pinned-top">
                    <span className="github-pinned-repo-icon">
                      <OcticonRepo size={16} />
                    </span>
                    <span className="github-pinned-title">{repo.name}</span>
                    <span className="github-visibility-pill">Public</span>
                  </div>

                  <p className="github-pinned-desc">{repo.description}</p>

                  <div className="github-pinned-footer">
                    <div className="github-lang-pill">
                      <span className="github-lang-dot" style={{ backgroundColor: repo.languageColor }} />
                      <span className="github-lang-name">{repo.language}</span>
                    </div>

                    <div className="github-pinned-meta-right">
                      {repo.stars > 0 && (
                        <span className="github-star-count">
                          <OcticonStar size={12} filled />
                          {repo.stars}
                        </span>
                      )}
                      <span className="github-branch-tag">⑂ {repo.defaultBranch}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Official GitHub Contributions Section (156 Contributions in the Last Year) */}
            <div className="github-card github-contrib-card scroll-reveal-item">
              <div className="github-contrib-header">
                <div className="github-contrib-header-left">
                  <h3 className="github-contrib-title">
                    <span className="github-contrib-count">{profileData.totalContributions || 156}</span> contributions
                  </h3>
                  <span className="github-contrib-sub">in the last year (Oct 2025 – Oct 2026)</span>
                </div>

                <div className="github-contrib-header-right">
                  <div className="github-contrib-mode-tabs">
                    <button
                      type="button"
                      className={`github-contrib-mode-btn${contribViewMode === "calendar" ? " active" : ""}`}
                      onClick={() => setContribViewMode("calendar")}
                      title="View GitHub Contribution Calendar"
                    >
                      Calendar
                    </button>
                    <button
                      type="button"
                      className={`github-contrib-mode-btn${contribViewMode === "snake" ? " active" : ""}`}
                      onClick={() => setContribViewMode("snake")}
                      title="View Contribution Snake Animation"
                    >
                      Snake
                    </button>
                  </div>

                  <span className="github-contrib-year-pill">2026</span>
                </div>
              </div>

              {/* Horizontally scrollable Primer Contribution Calendar Grid */}
              <div
                className="github-calendar-view-container"
                style={{ display: contribViewMode === "calendar" ? "block" : "none" }}
              >
                <div className="github-calendar-scroll-wrap" ref={calendarScrollRef} data-horizontal-scroll="true">
                  <div className="github-calendar-table-wrap">
                    {/* Months Row */}
                    <div className="github-calendar-months-row">
                      <span className="github-cal-month" style={{ gridColumn: "span 2" }}>Oct</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 5" }}>Nov</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 4" }}>Dec</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 4" }}>Jan</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 4" }}>Feb</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 5" }}>Mar</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 4" }}>Apr</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 5" }}>May</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 4" }}>Jun</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 4" }}>Jul</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 5" }}>Aug</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 4" }}>Sep</span>
                      <span className="github-cal-month" style={{ gridColumn: "span 3" }}>Oct</span>
                    </div>

                    {/* Main Grid: Days on Left, 52 Week Columns */}
                    <div className="github-calendar-body">
                      <div className="github-calendar-days-col">
                        <span></span>
                        <span>Mon</span>
                        <span></span>
                        <span>Wed</span>
                        <span></span>
                        <span>Fri</span>
                        <span></span>
                      </div>

                      <div className="github-calendar-weeks-grid">
                        {CONTRIBUTION_WEEKS.map((week, wIdx) => (
                          <div key={wIdx} className="github-cal-week-col">
                            {week.map((day, dIdx) => (
                              <div
                                key={dIdx}
                                className={`github-cal-cell lvl-${day.level}`}
                                title={day.count > 0 ? `${day.count} contributions on ${day.date}` : `No contributions on ${day.date}`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contribution Snake Animation */}
              <div
                className="github-snake-wrap"
                style={{ display: contribViewMode === "snake" ? "flex" : "none" }}
              >
                <img
                  src={profileData.snakeAnimationUrl}
                  alt="GitHub Contribution Snake Animation"
                  className="github-snake-img"
                  loading="lazy"
                />
                <p className="github-snake-caption">
                  Generated from @reyanshbhardwaj2005-spec's 156 contributions grid.
                </p>
              </div>

              {/* Real Metrics Row matching real GitHub profile */}
              <div className="github-contrib-metrics">
                <div className="github-contrib-metric-col">
                  <span className="github-metric-val">156</span>
                  <span className="github-metric-lbl">Total Contributions</span>
                </div>
                <div className="github-contrib-metric-col">
                  <span className="github-metric-val">17</span>
                  <span className="github-metric-lbl">Public Repositories</span>
                </div>
                <div
                  className="github-contrib-metric-col"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setRepoFilter("starred");
                    setSelectedLanguage("all");
                    setSearchQuery("");
                    setActiveTab("repositories");
                  }}
                  title="View Starred Repositories"
                >
                  <span className="github-metric-val">{starredReposList.length || 3}</span>
                  <span className="github-metric-lbl">Starred Repos</span>
                </div>
              </div>
            </div>

            {/* Quick Shortcuts */}
            <div className="github-card github-shortcuts-card scroll-reveal-item">
              <button
                type="button"
                className="github-shortcut-row"
                onClick={() => {
                  setRepoFilter("all");
                  setSelectedLanguage("all");
                  setActiveTab("repositories");
                }}
              >
                <div className="github-shortcut-left">
                  <div className="github-shortcut-icon repo">
                    <OcticonRepo size={16} />
                  </div>
                  <span className="github-shortcut-label">Repositories</span>
                </div>
                <div className="github-shortcut-right">
                  <span className="github-shortcut-counter">{repos.length}</span>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                    <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                </div>
              </button>

              <button
                type="button"
                className="github-shortcut-row"
                onClick={() => {
                  setRepoFilter("starred");
                  setSelectedLanguage("all");
                  setSearchQuery("");
                  setActiveTab("repositories");
                }}
              >
                <div className="github-shortcut-left">
                  <div className="github-shortcut-icon star">
                    <OcticonStar size={16} filled />
                  </div>
                  <span className="github-shortcut-label">Starred Repositories</span>
                </div>
                <div className="github-shortcut-right">
                  <span className="github-shortcut-counter">{starredReposList.length || 3}</span>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                    <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                </div>
              </button>

              <button
                type="button"
                className="github-shortcut-row"
                onClick={() => setActiveTab("activity")}
              >
                <div className="github-shortcut-left">
                  <div className="github-shortcut-icon activity">
                    <OcticonCommit size={16} />
                  </div>
                  <span className="github-shortcut-label">Activity & Commits</span>
                </div>
                <div className="github-shortcut-right">
                  <span className="github-shortcut-counter">Active</span>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                    <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: REPOSITORIES */}
        {activeTab === "repositories" && (
          <div className="github-tab-content github-fade-in" key="tab-repos">
            {/* Category Segmented Control: All Repositories vs Starred */}
            <div className="github-repo-filter-tabs scroll-reveal-item">
              <button
                type="button"
                className={`github-repo-filter-tab${repoFilter === "all" ? " active" : ""}`}
                onClick={() => setRepoFilter("all")}
              >
                <OcticonRepo size={14} />
                All Repositories ({repos.length})
              </button>
              <button
                type="button"
                className={`github-repo-filter-tab${repoFilter === "starred" ? " active" : ""}`}
                onClick={() => setRepoFilter("starred")}
              >
                <OcticonStar size={14} filled={repoFilter === "starred"} />
                Starred ({starredReposList.length || 3})
              </button>
            </div>

            {/* Active Starred Filter Notification Banner */}
            {repoFilter === "starred" && (
              <div className="github-starred-active-banner scroll-reveal-item">
                <div className="github-starred-banner-left">
                  <OcticonStar size={14} filled />
                  <span>Showing <strong>{filteredRepos.length}</strong> Starred {filteredRepos.length === 1 ? "Repository" : "Repositories"}</span>
                </div>
                <button
                  type="button"
                  className="github-starred-banner-clear"
                  onClick={() => setRepoFilter("all")}
                >
                  View All ({repos.length})
                </button>
              </div>
            )}

            {/* Search and Filter Row */}
            <div className="github-repo-search-box scroll-reveal-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="github-search-icon">
                <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
              </svg>
              <input
                type="text"
                className="github-search-input"
                placeholder="Find a repository by name or language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Find a repository"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="github-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Language Filter Chips */}
            <div className="github-filter-chips-row scroll-reveal-item" ref={filterChipsRef} data-horizontal-scroll="true">
              {["all", "Java", "Python", "JavaScript", "C++", "CSS", "Other"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`github-chip${selectedLanguage.toLowerCase() === lang.toLowerCase() ? " active" : ""}`}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang === "all" ? `All (${repos.length})` : lang}
                </button>
              ))}
            </div>

            {/* Sort & Results Count Bar */}
            <div className="github-results-meta-bar scroll-reveal-item">
              <span className="github-results-count">
                <strong>{filteredRepos.length}</strong> {repoFilter === "starred" ? (filteredRepos.length === 1 ? "starred repository" : "starred repositories") : (filteredRepos.length === 1 ? "repository" : "repositories")}
              </span>

              <div className="github-sort-group">
                <span className="github-sort-label">Sort:</span>
                <select
                  className="github-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort repositories"
                >
                  <option value="updated">Recently Updated</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="stars">Stars</option>
                </select>
              </div>
            </div>

            {/* Repository List Items */}
            <div className="github-repos-list">
              {filteredRepos.length === 0 ? (
                <div className="github-empty-box scroll-reveal-item">
                  <OcticonStar size={32} filled={repoFilter === "starred"} />
                  <h3>{repoFilter === "starred" ? "No starred repositories found" : "No matching repositories"}</h3>
                  <p>
                    {repoFilter === "starred"
                      ? "No starred repositories match your active search or language filter."
                      : "Try clearing your filter or searching for a different keyword."}
                  </p>
                  <button
                    type="button"
                    className="github-reset-filter-btn"
                    onClick={() => {
                      setRepoFilter("all");
                      setSearchQuery("");
                      setSelectedLanguage("all");
                    }}
                  >
                    View All Repositories
                  </button>
                </div>
              ) : (
                filteredRepos.map((repo, i) => (
                  <div
                    key={repo.id}
                    className="github-repo-card scroll-reveal-item"
                    style={{ "--child-idx": i % 6 } as CSSProperties}
                    onClick={() => setSelectedRepo(repo)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="github-repo-card-head">
                      <div className="github-repo-name-group">
                        <OcticonRepo size={16} />
                        <h3 className="github-repo-title">{repo.name}</h3>
                      </div>
                      <div className="github-repo-card-badges">
                        {repo.isStarred && (
                          <span className="github-starred-pill" title="Starred repository">
                            <OcticonStar size={11} filled />
                            Starred
                          </span>
                        )}
                        <span className="github-visibility-pill">Public</span>
                      </div>
                    </div>

                    <p className="github-repo-desc">{repo.description}</p>

                    <div className="github-repo-meta-row">
                      <div className="github-lang-pill">
                        <span className="github-lang-dot" style={{ backgroundColor: repo.languageColor }} />
                        <span className="github-lang-name">{repo.language}</span>
                      </div>

                      {repo.stars > 0 && (
                        <span className="github-repo-stat">
                          <OcticonStar size={13} filled />
                          {repo.stars}
                        </span>
                      )}

                      {repo.forks > 0 && (
                        <span className="github-repo-stat">
                          <OcticonFork size={13} />
                          {repo.forks}
                        </span>
                      )}

                      <span className="github-repo-branch">⑂ {repo.defaultBranch}</span>

                      <span className="github-repo-updated">
                        Updated {new Date(repo.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ACTIVITY & COMMITS */}
        {activeTab === "activity" && (
          <div className="github-tab-content github-fade-in" key="tab-activity">
            {/* Language Breakdown Section */}
            <div className="github-card scroll-reveal-item">
              <h3 className="github-card-title">Languages & Distribution</h3>
              <p className="github-card-sub">Calculated across all {repos.length} public repositories</p>

              {/* Progress bar */}
              <div className="github-lang-bar-container">
                {langBreakdown.map((l) => (
                  <div
                    key={l.lang}
                    className="github-lang-bar-slice"
                    style={{ width: `${l.pct}%`, backgroundColor: l.color }}
                    title={`${l.lang}: ${l.count} repos (${l.pct}%)`}
                  />
                ))}
              </div>

              {/* Legend Grid */}
              <div className="github-lang-legend-grid">
                {langBreakdown.map((l) => (
                  <div key={l.lang} className="github-lang-legend-item">
                    <span className="github-lang-dot" style={{ backgroundColor: l.color }} />
                    <span className="github-legend-name">{l.lang}</span>
                    <span className="github-legend-pct">{l.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Git Telemetry Timeline */}
            <div className="github-activity-stream">
              <h3 className="github-stream-heading scroll-reveal-item">Recent Engineering Timeline</h3>

              {profileData.activities.map((act, i) => (
                <div
                  key={act.id}
                  className="github-activity-item scroll-reveal-item"
                  style={{ "--child-idx": i } as CSSProperties}
                >
                  <div className="github-activity-node">
                    {act.type === "push" ? (
                      <OcticonCommit size={15} />
                    ) : (
                      <OcticonStar size={15} filled />
                    )}
                  </div>

                  <div className="github-activity-body">
                    <div className="github-activity-top-row">
                      <span className="github-activity-repo">{act.repo}</span>
                      <span className="github-activity-date">{act.date}</span>
                    </div>

                    <div className="github-activity-title">{act.title}</div>
                    {act.desc && <p className="github-activity-desc">{act.desc}</p>}

                    {act.badge && (
                      <span className="github-activity-badge">{act.badge}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: README & TECH STACK */}
        {activeTab === "readme" && (
          <div className="github-tab-content github-fade-in" key="tab-readme">
            {/* Waving Capsule Header Banner */}
            <div className="github-readme-banner-wrap scroll-reveal-item">
              <img
                src={profileData.capsuleBannerUrl}
                alt="Reyansh Bhardwaj Neon Capsule Banner"
                className="github-readme-banner"
              />
            </div>

            {/* Profile Intro Card */}
            <div className="github-card github-readme-card scroll-reveal-item">
              <h2 className="github-readme-greeting">Hey there, I'm Reyansh Bhardwaj 👋</h2>
              <div className="github-readme-role-pills">
                <span className="role-pill">📱 Android Developer</span>
                <span className="role-pill">☕ Java Programmer</span>
                <span className="role-pill">🚀 Spring Boot Developer</span>
              </div>
              <p className="github-readme-tagline">
                <em>Building useful applications. Solving real-world problems. Growing every day.</em>
              </p>
            </div>

            {/* About Me Highlights */}
            <div className="github-card scroll-reveal-item">
              <h3 className="github-card-title">⚡ About Me</h3>
              <ul className="github-readme-bullets">
                <li>
                  <span className="bullet-emoji">📱</span>
                  <span>Focused on <strong>Android application development</strong> and modern UI architecture.</span>
                </li>
                <li>
                  <span className="bullet-emoji">☕</span>
                  <span>Building solid programming foundations with <strong>Java & Object-Oriented Design</strong>.</span>
                </li>
                <li>
                  <span className="bullet-emoji">🚀</span>
                  <span>Building robust <strong>Spring Boot REST APIs</strong> and microservice backends.</span>
                </li>
                <li>
                  <span className="bullet-emoji">🗄️</span>
                  <span>Architecting high-performance schemas with <strong>MySQL, PostgreSQL & Redis</strong>.</span>
                </li>
                <li>
                  <span className="bullet-emoji">🧠</span>
                  <span>Passionate about clean architecture, test-driven pipelines, and problem solving.</span>
                </li>
                <li>
                  <span className="bullet-emoji">🎯</span>
                  <span>Goal: Building end-to-end full-stack applications from polished mobile client to distributed cloud services.</span>
                </li>
              </ul>
            </div>

            {/* Technical Skills & Stack Badges */}
            <div className="github-card scroll-reveal-item">
              <h3 className="github-card-title">🛠️ Technical Stack</h3>

              {profileData.skills.map((group) => (
                <div key={group.category} className="github-stack-group">
                  <h4 className="github-stack-cat-title">{group.category}</h4>
                  <div className="github-stack-chips">
                    {group.items.map((item) => (
                      <span key={item} className="github-skill-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="github-skillicons-box">
                <span className="github-skillicons-label">Language & Toolchain Icons:</span>
                <div className="github-icons-row" ref={iconsRowRef1} data-horizontal-scroll="true">
                  <img
                    src="https://skillicons.dev/icons?i=java,kotlin,python,c,cpp,dart,js,ts&theme=dark"
                    alt="Languages"
                    className="skillicons-img"
                    loading="lazy"
                  />
                </div>
                <div className="github-icons-row" ref={iconsRowRef2} data-horizontal-scroll="true">
                  <img
                    src="https://skillicons.dev/icons?i=androidstudio,spring,mysql,postgres,redis,postman,supabase,aws,git&theme=dark"
                    alt="Frameworks & Tools"
                    className="skillicons-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Real GitHub Readme Statistics Cards */}
            <div className="github-card scroll-reveal-item">
              <h3 className="github-card-title">📊 GitHub Statistics</h3>
              <div className="github-stats-cards-row">
                <img
                  src="https://github-readme-stats.vercel.app/api?username=reyanshbhardwaj2005-spec&show_icons=true&theme=default&hide_border=true&title_color=6C5CE7&icon_color=00A6FF&text_color=334155&bg_color=FFFFFF&rank_icon=github"
                  alt="GitHub statistics"
                  className="github-readme-stat-img"
                  loading="lazy"
                />
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=reyanshbhardwaj2005-spec&layout=compact&theme=default&hide_border=true&title_color=6C5CE7&text_color=334155&bg_color=FFFFFF"
                  alt="Top languages"
                  className="github-readme-stat-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* GitHub Mobile Bottom Navigation Bar */}
      <nav className="github-bottom-nav">
        <button
          type="button"
          className={`github-nav-item${activeTab === "overview" ? " active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </button>

        <button
          type="button"
          className={`github-nav-item${activeTab === "repositories" ? " active" : ""}`}
          onClick={() => setActiveTab("repositories")}
        >
          <OcticonRepo size={19} />
          <span>Repos ({repos.length})</span>
        </button>

        <button
          type="button"
          className={`github-nav-item${activeTab === "activity" ? " active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          <OcticonCommit size={19} />
          <span>Activity</span>
        </button>

        <button
          type="button"
          className={`github-nav-item${activeTab === "readme" ? " active" : ""}`}
          onClick={() => setActiveTab("readme")}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span>README</span>
        </button>
      </nav>

      {/* Interactive Repository Detail Drawer Modal */}
      {selectedRepo && (
        <div
          className="github-drawer-backdrop"
          onClick={() => setSelectedRepo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="github-drawer-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Handle */}
            <div className="github-drawer-handle" onClick={() => setSelectedRepo(null)} />

            {/* Header */}
            <div className="github-drawer-head">
              <div className="github-drawer-title-group">
                <OcticonRepo size={20} />
                <h3 className="github-drawer-repo-title">{selectedRepo.name}</h3>
              </div>
              <button
                type="button"
                className="github-drawer-close"
                onClick={() => setSelectedRepo(null)}
                aria-label="Close repository modal"
              >
                ✕
              </button>
            </div>

            <p className="github-drawer-desc">{selectedRepo.description}</p>

            {/* Stats Row */}
            <div className="github-drawer-stats">
              <div className="github-drawer-stat-item">
                <OcticonStar size={15} filled={selectedRepo.stars > 0} />
                <strong>{selectedRepo.stars}</strong>
                <span>Stars</span>
              </div>

              <div className="github-drawer-stat-item">
                <OcticonFork size={15} />
                <strong>{selectedRepo.forks}</strong>
                <span>Forks</span>
              </div>

              <div className="github-drawer-stat-item">
                <span className="github-lang-dot" style={{ backgroundColor: selectedRepo.languageColor }} />
                <strong>{selectedRepo.language}</strong>
                <span>Primary</span>
              </div>

              <div className="github-drawer-stat-item">
                <span className="branch-icon">⑂</span>
                <strong>{selectedRepo.defaultBranch}</strong>
                <span>Branch</span>
              </div>
            </div>

            {/* Quick Clone Box */}
            <div className="github-drawer-clone-box">
              <span className="github-clone-label">Clone with HTTPS</span>
              <div className="github-clone-input-row">
                <input
                  type="text"
                  readOnly
                  value={selectedRepo.cloneUrl}
                  className="github-clone-input"
                />
                <button
                  type="button"
                  className="github-clone-copy-btn"
                  onClick={() => copyToClipboard(selectedRepo.cloneUrl, "HTTPS clone command")}
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="github-drawer-actions">
              <a
                href={selectedRepo.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="github-drawer-action-btn primary"
              >
                Open on GitHub.com ↗
              </a>
              <button
                type="button"
                className="github-drawer-action-btn secondary"
                onClick={() => copyToClipboard(`git clone ${selectedRepo.cloneUrl}`, "Git Clone Command")}
              >
                Copy 'git clone'
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="github-toast" role="status">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
