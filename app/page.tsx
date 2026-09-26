"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type {
  AnimationEvent,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  RefObject,
} from "react";
import { apps, profile } from "./data";
import type { AppDef, Block } from "./data";
import { Icon } from "./icons";
import type { IconName } from "./icons";

/* ---------- Date & Time Hooks ---------- */

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

const fmtTime = (d: Date | null) =>
  d
    ? d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    : "12:45";

const fmtDate = (d: Date | null) =>
  d ? d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "Tue, Sep 22";

/* ---------- Samsung One UI Status Bar ---------- */

function StatusBar({ now }: { now: Date | null }) {
  return (
    <div className="status" aria-hidden="true">
      <span className="status-time">{fmtTime(now)}</span>
      <span className="status-icons">
        <span className="status-badge-5g">5G+</span>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="15" width="3.2" height="6" rx="0.8" />
          <rect x="8" y="11" width="3.2" height="10" rx="0.8" />
          <rect x="13" y="7" width="3.2" height="14" rx="0.8" />
          <rect x="18" y="3" width="3.2" height="18" rx="0.8" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M2.5 9a14 14 0 0119 0" />
          <path d="M5.8 12.6a9.4 9.4 0 0112.4 0" />
          <path d="M9 16.1a4.8 4.8 0 016 0" />
          <circle cx="12" cy="19.4" r="0.9" fill="currentColor" />
        </svg>
        <span className="battery">
          <i style={{ width: "88%" }} />
        </span>
        <span className="battery-pct">88%</span>
      </span>
    </div>
  );
}

/* ---------- S-Pen Interactive Canvas Block ---------- */

function SpenCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const [currentColor, setCurrentColor] = useState("#38bdf8");

  const colors = ["#38bdf8", "#a855f7", "#34d399", "#f59e0b", "#ffffff"];

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="spen-canvas-box">
      <div className="spen-canvas-toolbar">
        <div className="spen-colors">
          {colors.map((c) => (
            <button
              key={c}
              className={`spen-ink-dot${c === currentColor ? " active" : ""}`}
              style={{ backgroundColor: c }}
              onClick={() => setCurrentColor(c)}
              aria-label={`Select ink color ${c}`}
            />
          ))}
        </div>
        <button className="spen-clear-btn" onClick={clearCanvas}>
          Clear Ink
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={360}
        height={220}
        className="spen-draw-area"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
    </div>
  );
}

/* ---------- App Icon Graphics & Home Screen Layout (Matching Reference Image) ---------- */

const GITHUB_GRID = [
  [1, 1, 2, 3, 2, 2, 1],
  [3, 3, 3, 1, 1, 3, 3],
  [4, 3, 3, 1, 1, 1, 3],
  [3, 4, 3, 1, 1, 1, 4],
  [3, 3, 3, 1, 1, 1, 3],
  [3, 3, 3, 2, 1, 1, 1],
  [2, 3, 3, 3, 1, 0, 0],
];

function AppGraphic({ id, icon }: { id: string; icon: IconName }) {
  switch (id) {
    case "spotify":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#000000" />
          <circle cx="30" cy="30" r="23" fill="#1ed760" />
          <path d="M20 23.5c7-1.8 14-0.8 19.5 2.2" stroke="#000000" strokeWidth="3.6" strokeLinecap="round" fill="none" />
          <path d="M21.5 29.5c5.8-1.4 12-0.5 16.5 2" stroke="#000000" strokeWidth="3.1" strokeLinecap="round" fill="none" />
          <path d="M23 35.2c4.6-1.1 9.4-0.4 13.2 1.6" stroke="#000000" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "tv":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#000000" />
          <path d="M23.5 20.2c1.2-1.5 2-3.5 1.8-5.4-1.8.1-3.9 1.2-5.1 2.7-1.1 1.3-2 3.3-1.8 5.2 2 .2 3.9-1 5.1-2.5z" fill="#ffffff" />
          <path d="M25.8 28.2c-1-.6-2.4-1-4-1-2.8 0-4.6 1.6-6.2 1.6-1.6 0-3.4-1.6-5.6-1.6-3 0-6 2.2-7.4 5.6-1.6 3.8-.4 9.4 2 13.2 1.2 1.8 2.6 3.8 4.6 3.8 1.8 0 2.6-1.2 5-1.2 2.4 0 3.2 1.2 5 1.2 2 0 3.2-1.8 4.4-3.6 1.4-2 2-4 2-4.2-.2 0-4-1.6-4-6 0-3.6 3-5.4 3.2-5.6-1.8-2.6-4.2-2.8-5-3z" fill="#ffffff" transform="translate(10, -5)" />
          <text x="33" y="38" fill="#ffffff" fontFamily="-apple-system, sans-serif" fontWeight="700" fontSize="18.5" letterSpacing="-0.5">tv</text>
        </svg>
      );
    case "about":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#e5e7eb" />
          <rect x="54" y="10" width="4.5" height="11" rx="2" fill="#007aff" />
          <rect x="54" y="24" width="4.5" height="11" rx="2" fill="#ff9500" />
          <rect x="54" y="38" width="4.5" height="11" rx="2" fill="#34c759" />
          <circle cx="28" cy="30" r="17" fill="#6b7280" />
          <circle cx="28" cy="24" r="6.2" fill="#ffffff" />
          <path d="M17 40.5c1.6-5.5 5.8-8.5 11-8.5s9.4 3 11 8.5" fill="#ffffff" />
        </svg>
      );
    case "blog":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <defs>
            <linearGradient id="blg-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff5722" />
              <stop offset="100%" stopColor="#d50000" />
            </linearGradient>
          </defs>
          <rect width="60" height="60" rx="14" fill="url(#blg-g)" />
          <path d="M43 15c1.2 1.2 1.2 3.2 0 4.4L25 37.4c-.6.6-1.4 1-2.2 1.2l-6 1.4 1.4-6c.2-.8.6-1.6 1.2-2.2L37.4 13.8c1.2-1.2 3.2-1.2 4.4 0l1.2 1.2z" fill="#ffd166" />
          <path d="M18 43c4.5-1.5 11.5-1 25 1" stroke="#ffd166" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <defs>
            <linearGradient id="set-g" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
          </defs>
          <rect width="60" height="60" rx="14" fill="url(#set-g)" />
          <g transform="translate(30, 30)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <rect key={deg} x="-3" y="-19" width="6" height="6.5" rx="1.5" fill="#f3f4f6" transform={`rotate(${deg})`} />
            ))}
            <circle cx="0" cy="0" r="16" fill="#f3f4f6" />
            <circle cx="0" cy="0" r="12" fill="#6b7280" />
            <circle cx="0" cy="0" r="7.5" fill="#f3f4f6" />
            <circle cx="0" cy="0" r="4.2" fill="#4b5563" />
          </g>
        </svg>
      );
    case "steam":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <defs>
            <linearGradient id="stm-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#171a21" />
              <stop offset="50%" stopColor="#1b2838" />
              <stop offset="100%" stopColor="#2a475e" />
            </linearGradient>
          </defs>
          <rect width="60" height="60" rx="14" fill="url(#stm-g)" />
          <circle cx="36" cy="24" r="8.5" fill="none" stroke="#ffffff" strokeWidth="3.2" />
          <circle cx="36" cy="24" r="3.8" fill="#ffffff" />
          <circle cx="21" cy="38" r="6" fill="none" stroke="#ffffff" strokeWidth="2.8" />
          <circle cx="21" cy="38" r="2.6" fill="#ffffff" />
          <polygon points="34,26 19,37 23,41 38,28" fill="#ffffff" />
        </svg>
      );
    case "whoop":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#000000" />
          <circle cx="30" cy="30" r="18.5" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.9" />
          <g stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <polyline points="22 25 25.5 35 29 25" />
            <polyline points="31 25 34.5 35 38 25" />
          </g>
        </svg>
      );
    case "flighty":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#1e232a" />
          <g transform="translate(30,30) rotate(-45) translate(-30,-30)">
            <path d="M30 11c-1 0-1.8 1.2-1.8 2.6v12.2l-14 7.2v3.6l14-4.5v9.5l-3.8 2.8v2.4l5.6-1.6 5.6 1.6v-2.4l-3.8-2.8v-9.5l14 4.5v-3.6l-14-7.2V13.6c0-1.4-.8-2.6-1.8-2.6z" fill="#ffffff" />
          </g>
        </svg>
      );
    case "appstore":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <defs>
            <linearGradient id="as-g" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a9bff" />
              <stop offset="100%" stopColor="#005fd9" />
            </linearGradient>
          </defs>
          <rect width="60" height="60" rx="14" fill="url(#as-g)" />
          <g stroke="#ffffff" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <line x1="20" y1="44" x2="30" y2="16" />
            <line x1="40" y1="44" x2="30" y2="16" />
            <line x1="16" y1="36" x2="44" y2="36" />
          </g>
        </svg>
      );
    case "photos":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#ffffff" />
          <g transform="translate(30, 30)">
            <path d="M-4 -18 C-4 -22, 4 -22, 4 -18 L3 -5 C2 -2, -2 -2, -3 -5 Z" fill="#ff2d55" opacity="0.88" />
            <path d="M-4 -18 C-4 -22, 4 -22, 4 -18 L3 -5 C2 -2, -2 -2, -3 -5 Z" fill="#ff9500" opacity="0.88" transform="rotate(45)" />
            <path d="M-4 -18 C-4 -22, 4 -22, 4 -18 L3 -5 C2 -2, -2 -2, -3 -5 Z" fill="#ffcc00" opacity="0.88" transform="rotate(90)" />
            <path d="M-4 -18 C-4 -22, 4 -22, 4 -18 L3 -5 C2 -2, -2 -2, -3 -5 Z" fill="#34c759" opacity="0.88" transform="rotate(135)" />
            <path d="M-4 -18 C-4 -22, 4 -22, 4 -18 L3 -5 C2 -2, -2 -2, -3 -5 Z" fill="#00c7be" opacity="0.88" transform="rotate(180)" />
            <path d="M-4 -18 C-4 -22, 4 -22, 4 -18 L3 -5 C2 -2, -2 -2, -3 -5 Z" fill="#007aff" opacity="0.88" transform="rotate(225)" />
            <path d="M-4 -18 C-4 -22, 4 -22, 4 -18 L3 -5 C2 -2, -2 -2, -3 -5 Z" fill="#5856d6" opacity="0.88" transform="rotate(270)" />
            <path d="M-4 -18 C-4 -22, 4 -22, 4 -18 L3 -5 C2 -2, -2 -2, -3 -5 Z" fill="#af52de" opacity="0.88" transform="rotate(315)" />
            <circle cx="0" cy="0" r="3.8" fill="#ffffff" />
          </g>
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <defs>
            <linearGradient id="ml-g" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#40a4ff" />
              <stop offset="100%" stopColor="#0071e3" />
            </linearGradient>
          </defs>
          <rect width="60" height="60" rx="14" fill="url(#ml-g)" />
          <rect x="10" y="18" width="40" height="25" rx="3.5" fill="#ffffff" />
          <path d="M11 20.5L30 33L49 20.5" fill="none" stroke="#0071e3" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "files":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#ffffff" />
          <defs>
            <linearGradient id="fld-g" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#25a0ff" />
              <stop offset="100%" stopColor="#007aff" />
            </linearGradient>
          </defs>
          <path d="M13 19a3 3 0 0 1 3-3h10a3 3 0 0 1 2.2 1l2.6 3H44a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3V19z" fill="#99d1ff" />
          <rect x="13" y="24" width="34" height="20" rx="3" fill="url(#fld-g)" />
        </svg>
      );
    default:
      return <Icon name={icon} />;
  }
}

function AppIcon({
  app,
  onOpen,
  showLabel = true,
}: {
  app: AppDef;
  onOpen: (app: AppDef, el: HTMLElement) => void;
  showLabel?: boolean;
}) {
  return (
    <button
      className="app"
      onClick={(e) => onOpen(app, e.currentTarget.querySelector(".icon") as HTMLElement)}
      aria-label={app.label}
    >
      <span className="icon" style={{ "--c1": app.c1, "--c2": app.c2 } as CSSProperties}>
        <AppGraphic id={app.id} icon={app.icon} />
      </span>
      {showLabel && <span className="label">{app.label}</span>}
    </button>
  );
}

function Home({
  now,
  onOpen,
}: {
  now: Date | null;
  onOpen: (app: AppDef, el: HTMLElement) => void;
}) {
  // 8 Grid apps in the exact order from reference image:
  // Row 1: Spotify, TV, About, Blog
  // Row 2: Settings, Steam, Whoop, Flighty
  const grid = apps.filter((a) => !a.dock && a.id !== "weather" && a.id !== "github" && a.id !== "spen-notes");
  // 4 Dock apps in exact order: App Store, Photos, Mail, Files
  const dock = apps.filter((a) => a.dock);

  const githubApp = apps.find((a) => a.id === "github") || apps[0];
  const weatherApp = apps.find((a) => a.id === "weather") || apps[0];
  const aboutApp = apps.find((a) => a.id === "about") || apps[0];

  return (
    <div className="home">
      {/* Top 2x2 Widgets: GitHub Heatmap (Left) & Weather (Right) */}
      <div className="widgets-row">
        {/* Left: GitHub Contribution Heatmap Widget */}
        <div
          className="widget-col"
          onClick={(e) => onOpen(githubApp, e.currentTarget)}
          role="button"
          tabIndex={0}
        >
          <div className="home-widget widget-github">
            <div className="github-grid" aria-label="GitHub Contributions">
              {GITHUB_GRID.map((row, r) => (
                <div key={r} className="github-row">
                  {row.map((lvl, c) => (
                    <div
                      key={c}
                      className={`github-cell lvl-${lvl}`}
                      title={`${lvl > 0 ? lvl * 3 : 0} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <span className="widget-label">GitHub</span>
        </div>

        {/* Right: Bengaluru Weather Widget */}
        <div
          className="widget-col"
          onClick={(e) => onOpen(weatherApp, e.currentTarget)}
          role="button"
          tabIndex={0}
        >
          <div className="home-widget widget-weather">
            <div className="weather-header">
              <span className="weather-city">Bengaluru</span>
              <svg className="weather-arrow" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <div className="weather-temp">27°</div>
            <div className="weather-cloud">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>
            <div className="weather-desc">Cloudy</div>
            <div className="weather-hl">H:29° L:20°</div>
          </div>
          <span className="widget-label">Weather</span>
        </div>
      </div>

      {/* App Grid: 8 Apps in 2 Rows x 4 Columns in exact reference order */}
      <div className="grid">
        {grid.map((a) => (
          <AppIcon key={a.id} app={a} onOpen={onOpen} />
        ))}
      </div>

      {/* Centered Floating Search Pill */}
      <div className="search-pill-row">
        <button
          className="search-pill"
          onClick={(e) => onOpen(aboutApp, e.currentTarget)}
          title="Search Reyansh's portfolio"
        >
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16" y2="16" />
          </svg>
          <span>Search</span>
        </button>
      </div>

      {/* Dock: 4 Apps (App Store, Photos, Mail, Files) */}
      <div className="dock">
        {dock.map((a) => (
          <AppIcon key={a.id} app={a} onOpen={onOpen} showLabel={false} />
        ))}
      </div>
    </div>
  );
}

/* ---------- App Window Modal ---------- */

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <div className="card">
          <p className="body">{block.body}</p>
        </div>
      );
    case "items":
      return (
        <div className="card list">
          {block.heading && <h2>{block.heading}</h2>}
          {block.items.map((it, i) => (
            <div className="row" key={i}>
              <div>
                <div className="t">{it.title}</div>
                {it.sub && <div className="s">{it.sub}</div>}
              </div>
              {it.meta && <div className="m">{it.meta}</div>}
            </div>
          ))}
        </div>
      );
    case "chips":
      return (
        <div className="card">
          <h2>{block.heading}</h2>
          <div className="chips">
            {block.chips.map((c) => (
              <span className="chip" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>
      );
    case "links":
      return (
        <div className="card list">
          {block.heading && 2 ? <h2>{block.heading}</h2> : null}
          {block.links.map((l) => (
            <a className="row link" key={l.label} href={l.href} target="_blank" rel="noreferrer">
              <div className="t">{l.label}</div>
              {l.hint && <div className="m">{l.hint}</div>}
            </a>
          ))}
        </div>
      );
    case "spen-canvas":
      return (
        <div className="card">
          {block.heading && <h2>{block.heading}</h2>}
          <SpenCanvas />
        </div>
      );
  }
}

function ScrollableAppBody({ children }: { children: ReactNode }) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    active: false,
    startY: 0,
    scrollTop: 0,
    moved: false,
  });

  // Enable guaranteed, instant mouse scroll wheel response in all view modes (including front mode)
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.stopPropagation();
      el.scrollTop += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = bodyRef.current;
    if (!el) return;
    const target = e.target as HTMLElement;
    // Don't hijack clicks on buttons, links, or S-Pen drawing canvas
    if (target.closest("button, a, input, canvas, .spen-canvas-box, .spen-draw-area, .spen-ink-dot")) return;

    dragRef.current = {
      active: true,
      startY: e.clientY,
      scrollTop: el.scrollTop,
      moved: false,
    };
    el.classList.add("is-scrolling");
    try {
      el.setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const el = bodyRef.current;
    if (!el) return;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dy) > 3) {
      dragRef.current.moved = true;
    }
    el.scrollTop = dragRef.current.scrollTop - dy;
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    const el = bodyRef.current;
    if (el) {
      el.classList.remove("is-scrolling");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      dragRef.current.moved = false;
    }
  };

  return (
    <div
      className="app-body"
      ref={bodyRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  );
}

function AppWindow({
  app,
  origin,
  closing,
  onBack,
  onClosed,
}: {
  app: AppDef;
  origin: { x: string; y: string };
  closing: boolean;
  onBack: () => void;
  onClosed: () => void;
}) {
  const windowRef = useRef<HTMLElement | null>(null);

  // Wheel listener on the window wrapper so spinning wheel over header/margins also scrolls the app
  useEffect(() => {
    const win = windowRef.current;
    if (!win) return;

    const onWheel = (e: WheelEvent) => {
      const scrollEl = win.querySelector(".app-body") as HTMLElement | null;
      if (!scrollEl) return;
      scrollEl.scrollTop += e.deltaY;
      e.stopPropagation();
    };

    win.addEventListener("wheel", onWheel, { passive: true });
    return () => win.removeEventListener("wheel", onWheel);
  }, []);

  const handleEnd = (e: AnimationEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    if (closing) onClosed();
  };

  return (
    <section
      ref={windowRef}
      className={`app-window${closing ? " closing" : ""}`}
      style={{ "--ox": origin.x, "--oy": origin.y } as CSSProperties}
      onAnimationEnd={handleEnd}
      role="dialog"
      aria-label={app.title ?? app.label}
    >
      <header className="app-head">
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <Icon name="chevron" />
        </button>
        <h1>{app.title ?? app.label}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
      </header>
      <ScrollableAppBody>
        {app.blocks?.map((b, i) => (
          <BlockView block={b} key={i} />
        ))}
      </ScrollableAppBody>
    </section>
  );
}

/* ---------- 3D Phone Stage & Inspection Studio ---------- */

const REST_RX = 12;
const REST_RY = -24;
const MAX_RX = 65;

type ViewPreset = "front" | "angle" | "back" | "right-side" | "left-side" | "spen";
type TitaniumColor = "sand" | "gray" | "black" | "silverblue";

/* ---------- Seamless 3D Corner Cylinders (Ultra Smooth Continuous Arc) ---------- */

function CornerCylinder({
  corner,
  numFacets = 60,
}: {
  corner: "top-left" | "top-right" | "bottom-right" | "bottom-left";
  numFacets?: number;
}) {
  const facets = Array.from({ length: numFacets }, (_, i) => {
    const fraction = i / (numFacets - 1);
    let baseDeg = 0;
    if (corner === "top-left") {
      baseDeg = -90 + fraction * 90;
    } else if (corner === "top-right") {
      baseDeg = 0 + fraction * 90;
    } else if (corner === "bottom-right") {
      baseDeg = 90 + fraction * 90;
    } else if (corner === "bottom-left") {
      baseDeg = 180 + fraction * 90;
    }

    return {
      id: i,
      deg: baseDeg,
    };
  });

  const stepRad = (Math.PI / 2) / (numFacets - 1);
  const widthFactor = (stepRad * 1.35).toFixed(5);
  const marginFactor = (-stepRad * 1.35 * 0.5).toFixed(5);

  return (
    <div
      className={`corner-cylinder ${corner}`}
      style={
        {
          "--facet-w": `calc(var(--corner) * ${widthFactor})`,
          "--facet-ml": `calc(var(--corner) * ${marginFactor})`,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      {facets.map((f) => (
        <div
          key={f.id}
          className="corner-facet"
          style={{ "--facet-deg": `${f.deg.toFixed(2)}deg` } as CSSProperties}
        />
      ))}
    </div>
  );
}

/* ---------- 3D Stepped Camera Cylinders (Protrudes From Back In Side Profile!) ---------- */

function CamRing3D({
  className,
  diameterPercent,
  topPercent,
  leftPercent,
  protrusionPx,
  isPeriscope = false,
  isMain = false,
}: {
  className: string;
  diameterPercent: number;
  topPercent: number;
  leftPercent: number;
  protrusionPx: number;
  isPeriscope?: boolean;
  isMain?: boolean;
}) {
  const numFacets = 36;
  const facets = Array.from({ length: numFacets }, (_, i) => {
    const deg = (i * 360) / numFacets;
    const rad = (deg * Math.PI) / 180;
    // Directional studio lighting vector in local backplate space (-45deg top-left keylight)
    const normalX = Math.sin(rad);
    const normalY = -Math.cos(rad);
    const dot = normalX * -0.707 + normalY * -0.707;
    const facetLight = Math.max(0.18, Math.min(1.0, 0.55 + dot * 0.45));
    return {
      id: i,
      deg,
      light: facetLight.toFixed(2),
    };
  });

  return (
    <div
      className={`cam-barrel-3d ${className}`}
      style={
        {
          "--cam-diam": `calc(var(--dw) * ${diameterPercent / 100})`,
          "--cam-top": `${topPercent}%`,
          "--cam-left": `${leftPercent}%`,
          "--cam-h": `${protrusionPx}px`,
        } as CSSProperties
      }
    >
      {/* Continuous Sleek Titanium Cylinder Facets (Authentic Metallic Barrel) */}
      <div className="cam-tier" aria-hidden="true">
        {facets.map((f) => (
          <div
            key={f.id}
            className="barrel-facet"
            style={{ "--facet-deg": `${f.deg}deg`, "--facet-light": f.light } as CSSProperties}
          />
        ))}
      </div>

      {/* Top Cap at translateZ(protrusionPx) with Polished Chamfer Rim */}
      <div className="cam-cap">
        <div className="cam-rim-chamfer" />
        <div className="cam-bezel" />
        <div className="cam-glass">
          <div className="cam-pupil-iris">
            <div className="cam-pupil-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}

function getClosestTargetRy(currentRy: number, desiredOffsetFrom360: number): number {
  const k = Math.round((currentRy - desiredOffsetFrom360) / 360);
  return k * 360 + desiredOffsetFrom360;
}

function PhoneStage({
  children,
  onOpenSpen,
}: {
  children: ReactNode;
  onOpenSpen: () => void;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  // Exact angles in degrees
  const rot = useRef({ rx: REST_RX, ry: REST_RY });
  const targetRot = useRef({ rx: REST_RX, ry: REST_RY });
  const velocity = useRef({ vx: 0, vy: 0 });

  // Physics animation modes: "idle" | "dragging" | "inertia" | "tweening" | "autorotate"
  const mode = useRef<"idle" | "dragging" | "inertia" | "tweening" | "autorotate">("idle");

  // Pointer drag tracking
  const dragStart = useRef({ x: 0, y: 0, time: 0, moved: false });
  const lastPointer = useRef({ x: 0, y: 0, time: 0 });

  // High-precision tween for presets & magnetic docking
  const tween = useRef({
    startRx: 0,
    startRy: 0,
    targetRx: 0,
    targetRy: 0,
    startTime: 0,
    duration: 650,
    onComplete: undefined as (() => void) | undefined,
  });

  const rafId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const [hint, setHint] = useState(true);
  const [activePreset, setActivePreset] = useState<ViewPreset>("angle");
  const [colorTheme, setColorTheme] = useState<TitaniumColor>("sand");
  const [spenEjected, setSpenEjected] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(false);

  // Synchronously compute and update 3D rotation, dynamic reflections, and ground shadow
  const applyTransform = useCallback(() => {
    const el = phoneRef.current;
    if (!el) return;

    const currentRx = rot.current.rx;
    const currentRy = rot.current.ry;

    el.style.setProperty("--rx", `${currentRx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${currentRy.toFixed(2)}deg`);
    el.style.transform = `rotateX(${currentRx.toFixed(2)}deg) rotateY(${currentRy.toFixed(2)}deg)`;

    // Fixed Studio Key Spotlight in World Coordinates (elevated top-left-front)
    const lx_world = -0.32;
    const ly_world = -0.65;
    const lz_world = 0.69;

    const radX = (currentRx * Math.PI) / 180;
    const radY = (currentRy * Math.PI) / 180;

    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);

    // Transform world light vector into phone's local coordinates
    const y1 = ly_world * cosX + lz_world * sinX;
    const z1 = -ly_world * sinX + lz_world * cosX;
    const x1 = lx_world;

    const lx = x1 * cosY - z1 * sinY;
    const lz = x1 * sinY + z1 * cosY;
    const ly = y1;

    // Spotlight reflection center on Front and Back surfaces (% coordinates)
    const spotFrontX = Math.min(96, Math.max(4, 50 + lx * 55));
    const spotFrontY = Math.min(96, Math.max(4, 50 + ly * 55));
    const spotBackX = Math.min(96, Math.max(4, 50 - lx * 55));
    const spotBackY = Math.min(96, Math.max(4, 50 + ly * 55));

    // Surface lighting intensities (dot product with surface normals)
    const frontIntensity = Math.max(0, lz);
    const backIntensity = Math.max(0, -lz);
    const rightIntensity = Math.max(0, lx);
    const leftIntensity = Math.max(0, -lx);
    const topIntensity = Math.max(0, -ly);
    const bottomIntensity = Math.max(0, ly);

    // Specular highlights with bloom & glossy falloff
    const frontSpec = Math.min(1.2, Math.pow(frontIntensity, 1.8) * 1.45);
    const backSpec = Math.min(1.2, Math.pow(backIntensity, 1.8) * 1.55);
    const lensSpec = Math.min(1.3, Math.pow(backIntensity, 1.35) * 1.6);
    const rimLight = Math.min(1, Math.pow(1 - Math.abs(lz), 1.5) * 1.25);

    // Lens coating sheen offsets
    const sheenX = -lx * 55;
    const sheenY = -ly * 55;
    const sheenAngle = Math.atan2(ly, lx) * (180 / Math.PI);

    // Ground shadow reacts dynamically to 3D orientation
    const shadowScaleX = Math.abs(cosY) * 0.72 + Math.abs(sinY) * 0.30 + 0.22;
    const shadowShiftX = lx * 18;
    const shadowOpacity = 0.76 + Math.abs(cosX) * 0.18;

    el.style.setProperty("--spot-front-x", `${spotFrontX.toFixed(1)}%`);
    el.style.setProperty("--spot-front-y", `${spotFrontY.toFixed(1)}%`);
    el.style.setProperty("--spot-back-x", `${spotBackX.toFixed(1)}%`);
    el.style.setProperty("--spot-back-y", `${spotBackY.toFixed(1)}%`);

    el.style.setProperty("--light-front", frontIntensity.toFixed(3));
    el.style.setProperty("--light-back", backIntensity.toFixed(3));
    el.style.setProperty("--light-right", rightIntensity.toFixed(3));
    el.style.setProperty("--light-left", leftIntensity.toFixed(3));
    el.style.setProperty("--light-top", topIntensity.toFixed(3));
    el.style.setProperty("--light-bottom", bottomIntensity.toFixed(3));
    el.style.setProperty("--light-rim", rimLight.toFixed(3));

    el.style.setProperty("--spec-front", frontSpec.toFixed(3));
    el.style.setProperty("--spec-back", backSpec.toFixed(3));
    el.style.setProperty("--spec-lens", lensSpec.toFixed(3));

    el.style.setProperty("--sheen-x", sheenX.toFixed(1));
    el.style.setProperty("--sheen-y", sheenY.toFixed(1));
    el.style.setProperty("--sheen-angle", `${sheenAngle.toFixed(1)}deg`);

    if (sceneRef.current) {
      sceneRef.current.style.setProperty("--shadow-scale-x", shadowScaleX.toFixed(3));
      sceneRef.current.style.setProperty("--shadow-shift-x", `${shadowShiftX.toFixed(1)}px`);
      sceneRef.current.style.setProperty("--shadow-opacity", shadowOpacity.toFixed(3));
    }

    const targetFrontRy = Math.round(currentRy / 360) * 360;
    const isFront = Math.abs(currentRx) < 0.25 && Math.abs(currentRy - targetFrontRy) < 0.25;
    el.classList.toggle("is-front", isFront);
  }, []);

  // Main unified physics and animation frame step
  const loop = useCallback(
    (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaMs = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Normalize delta-time (1.0 = standard 60Hz 16.67ms frame)
      const dt = Math.min(2.5, Math.max(0.1, deltaMs / 16.67));

      let needNextFrame = false;

      if (mode.current === "dragging") {
        // High-end critically damped low-pass filter: eliminates input noise without perceived lag
        const followFactor = 1 - Math.pow(0.70, dt);
        rot.current.rx += (targetRot.current.rx - rot.current.rx) * followFactor;
        rot.current.ry += (targetRot.current.ry - rot.current.ry) * followFactor;
        applyTransform();
        needNextFrame = true;
      } else if (mode.current === "inertia") {
        // Silky weighted momentum glide
        const friction = Math.pow(0.963, dt);
        velocity.current.vx *= friction;
        velocity.current.vy *= friction;

        rot.current.ry += velocity.current.vx * dt;
        rot.current.rx = Math.max(-MAX_RX, Math.min(MAX_RX, rot.current.rx - velocity.current.vy * dt));
        targetRot.current = { ...rot.current };

        const speed = Math.hypot(velocity.current.vx, velocity.current.vy);
        const targetFrontRy = Math.round(rot.current.ry / 360) * 360;
        const diffRy = Math.abs(rot.current.ry - targetFrontRy);
        const diffRx = Math.abs(rot.current.rx);

        // Smooth magnetic front docking when slowing down near front screen
        if (speed < 0.70 && diffRy <= 32 && diffRx <= 22) {
          mode.current = "tweening";
          velocity.current = { vx: 0, vy: 0 };
          tween.current = {
            startRx: rot.current.rx,
            startRy: rot.current.ry,
            targetRx: 0,
            targetRy: targetFrontRy,
            startTime: performance.now(),
            duration: 450,
            onComplete: () => setActivePreset("front"),
          };
          needNextFrame = true;
        } else {
          applyTransform();

          if (speed > 0.02) {
            needNextFrame = true;
          } else {
            if (diffRy <= 26 && diffRx <= 18) {
              mode.current = "tweening";
              velocity.current = { vx: 0, vy: 0 };
              tween.current = {
                startRx: rot.current.rx,
                startRy: rot.current.ry,
                targetRx: 0,
                targetRy: targetFrontRy,
                startTime: performance.now(),
                duration: 380,
                onComplete: () => setActivePreset("front"),
              };
              needNextFrame = true;
            } else {
              mode.current = "idle";
            }
          }
        }
      } else if (mode.current === "tweening") {
        const elapsed = time - tween.current.startTime;
        const progress = Math.min(1, elapsed / tween.current.duration);

        // Apple-grade quintic ease-out curve (smooth organic landing)
        const t1 = 1 - progress;
        const ease = 1 - t1 * t1 * t1 * t1;

        rot.current.rx = tween.current.startRx + (tween.current.targetRx - tween.current.startRx) * ease;
        rot.current.ry = tween.current.startRy + (tween.current.targetRy - tween.current.startRy) * ease;
        targetRot.current = { ...rot.current };

        applyTransform();

        if (progress < 1) {
          needNextFrame = true;
        } else {
          rot.current.rx = tween.current.targetRx;
          rot.current.ry = tween.current.targetRy;
          applyTransform();
          mode.current = "idle";
          const cb = tween.current.onComplete;
          if (cb) cb();
        }
      } else if (mode.current === "autorotate") {
        rot.current.ry += 0.36 * dt;
        targetRot.current = { ...rot.current };
        applyTransform();
        needNextFrame = true;
      }

      if (needNextFrame) {
        rafId.current = requestAnimationFrame(loop);
      } else {
        rafId.current = null;
      }
    },
    [applyTransform]
  );

  const ensureLoopRunning = useCallback(() => {
    if (rafId.current === null) {
      lastTimeRef.current = performance.now();
      rafId.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  const startTween = useCallback(
    (targetRx: number, targetRy: number, duration: number = 650, onComplete?: () => void) => {
      mode.current = "tweening";
      velocity.current = { vx: 0, vy: 0 };
      tween.current = {
        startRx: rot.current.rx,
        startRy: rot.current.ry,
        targetRx,
        targetRy,
        startTime: performance.now(),
        duration,
        onComplete,
      };
      ensureLoopRunning();
    },
    [ensureLoopRunning]
  );

  useEffect(() => {
    applyTransform();
    document.documentElement.setAttribute("data-theme", colorTheme);
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [applyTransform, colorTheme]);

  // Auto-rotate presentation mode
  const toggleAutoRotate = () => {
    if (isAutoRotate) {
      setIsAutoRotate(false);
      mode.current = "idle";
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    } else {
      setIsAutoRotate(true);
      mode.current = "autorotate";
      ensureLoopRunning();
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Avoid hijacking taps on the interactive screen
    if (screenRef.current?.contains(e.target as Node)) return;

    if (isAutoRotate) {
      setIsAutoRotate(false);
    }

    mode.current = "dragging";
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
      moved: false,
    };
    lastPointer.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };
    velocity.current = { vx: 0, vy: 0 };
    targetRot.current = { ...rot.current };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setHint(false);
    ensureLoopRunning();
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (mode.current !== "dragging") {
      return;
    }

    const now = performance.now();
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    const deltaMs = Math.max(1, now - lastPointer.current.time);

    lastPointer.current = { x: e.clientX, y: e.clientY, time: now };

    if (Math.abs(e.clientX - dragStart.current.x) + Math.abs(e.clientY - dragStart.current.y) > 2) {
      dragStart.current.moved = true;
    }

    // High precision sensitivity: 0.36deg/px horizontal, 0.30deg/px vertical
    targetRot.current.ry += dx * 0.36;
    targetRot.current.rx = Math.max(-MAX_RX, Math.min(MAX_RX, targetRot.current.rx - dy * 0.30));

    // Instant velocity normalized to standard 60fps frame (16.67ms)
    const instVx = (dx / deltaMs) * 16.67 * 0.36;
    const instVy = (dy / deltaMs) * 16.67 * 0.30;

    // Exponential moving average filter: filters out USB sensor jitter and micro-stutter
    velocity.current.vx = velocity.current.vx * 0.35 + instVx * 0.65;
    velocity.current.vy = velocity.current.vy * 0.35 + instVy * 0.65;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (mode.current !== "dragging") return;

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already lost
    }

    const speed = Math.hypot(velocity.current.vx, velocity.current.vy);
    const dir = velocity.current.vx > 0.05 ? 1 : velocity.current.vx < -0.05 ? -1 : 0;

    // Target front screen in continuous direction of movement (never flips backwards)
    let targetRy = Math.round(rot.current.ry / 360) * 360;
    if (dir > 0 && rot.current.ry > targetRy) {
      targetRy += 360;
    } else if (dir < 0 && rot.current.ry < targetRy) {
      targetRy -= 360;
    }

    const diffRy = Math.abs(rot.current.ry - targetRy);
    const diffRx = Math.abs(rot.current.rx);

    // Gentle release near front screen: magnetic docking
    if (speed < 0.40 && diffRy <= 32 && diffRx <= 24) {
      startTween(0, targetRy, 420, () => setActivePreset("front"));
      return;
    }

    // Significant momentum: inertia glide
    if (speed > 0.18) {
      mode.current = "inertia";
    } else {
      if (diffRy <= 26 && diffRx <= 20) {
        startTween(0, targetRy, 360, () => setActivePreset("front"));
      } else {
        mode.current = "idle";
      }
    }
  };

  // Quick View Preset Angles (continuous shortest-path relative to current revolution)
  const setPreset = (preset: ViewPreset) => {
    if (isAutoRotate) {
      setIsAutoRotate(false);
    }
    setActivePreset(preset);

    let targetRx = 0;
    let targetRy = 0;

    switch (preset) {
      case "front":
        targetRx = 0;
        targetRy = Math.round(rot.current.ry / 360) * 360;
        break;
      case "angle":
        targetRx = 12;
        targetRy = getClosestTargetRy(rot.current.ry, -24);
        break;
      case "back":
        targetRx = 18;
        targetRy = getClosestTargetRy(rot.current.ry, 180);
        break;
      case "right-side":
        targetRx = 0;
        targetRy = getClosestTargetRy(rot.current.ry, -90);
        break;
      case "left-side":
        targetRx = 0;
        targetRy = getClosestTargetRy(rot.current.ry, 90);
        break;
      case "spen":
        targetRx = -48;
        targetRy = getClosestTargetRy(rot.current.ry, 14);
        break;
    }

    // Dynamic duration based on angular distance for optimal pacing
    const dist = Math.hypot(targetRx - rot.current.rx, targetRy - rot.current.ry);
    const duration = Math.min(850, Math.max(520, Math.round(480 + dist * 1.5)));

    startTween(targetRx, targetRy, duration, () => {
      if (preset === "front") {
        applyTransform();
      }
    });
  };

  // Interactive S-Pen toggle
  const toggleSpen = () => {
    setSpenEjected((prev) => {
      const next = !prev;
      if (next) {
        onOpenSpen();
      }
      return next;
    });
  };

  // Reset to default angle on double click
  const onDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (screenRef.current?.contains(e.target as Node)) return;
    setPreset("angle");
  };

  return (
    <>
      {/* Studio Header Brand */}
      <header className="studio-header">
        <div className="studio-brand">
          <span className="studio-title">Samsung Galaxy S26 Ultra</span>
          <span className="studio-subtitle">Titanium Grade 5 &bull; Reyansh Bhardwaj Portfolio</span>
        </div>
      </header>

      {/* 3D Scene Viewport */}
      <div
        className="scene"
        ref={sceneRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={onDoubleClick}
      >
        <div className="stage-spotlight" aria-hidden="true" />
        <div className="spotlight-floor" aria-hidden="true" />
        <div className="ground-shadow" aria-hidden="true" />

        <div className="phone3d snap" ref={phoneRef}>
          {/* FRONT FACE: Razor-thin Bezel, AMOLED Screen & Infinity-O Camera */}
          <div className="face front">
            <div className="front-earpiece" aria-hidden="true" />
            <div className="front-camera" aria-hidden="true" />

            <div
              className="screen"
              ref={screenRef}
              onWheel={(e) => {
                const scrollEl = screenRef.current?.querySelector(".app-body") as HTMLElement | null;
                if (scrollEl) {
                  scrollEl.scrollTop += e.deltaY;
                }
              }}
            >
              <div className="screen-glare" aria-hidden="true" />
              {children}
            </div>

            {/* Dynamic Light-Reflecting Shining Bezel Rim (Bezel Only) */}
            <div className="screen-bezel-shine" aria-hidden="true" />
          </div>

          {/* BACK FACE: Frosted Gorilla Armor + Signature S26 Ultra Floating Camera System */}
          <div className="face back">
            <div className="back-satin-sheen" aria-hidden="true" />
            <div className="back-edge-lining" aria-hidden="true" />

            {/* Signature 3D Floating Camera Array (Stepped Cylinders Matching Reference Photo) */}
            <div className="camera-system" aria-hidden="true">
              {/* Continuous Raised 3D Pill Island Plateau Enclosing Primary 3 Lenses */}
              <div className="cam-island-shadow" aria-hidden="true" />
              <div className="cam-island-pill" aria-hidden="true">
                <div className="cam-island-surface" />
              </div>

              {/* 1. 12MP Ultra-Wide Camera (Top Left) */}
              <CamRing3D
                className="cam-ultrawide"
                diameterPercent={17.4}
                topPercent={4.8}
                leftPercent={11.1}
                protrusionPx={7.0}
              />

              {/* 2. 200MP Main Wide Camera (Middle Left - Raised Bezel) */}
              <CamRing3D
                className="cam-main"
                diameterPercent={17.4}
                topPercent={13.7}
                leftPercent={11.1}
                protrusionPx={8.6}
                isMain
              />

              {/* 3. 50MP 5x Telephoto Camera (Bottom Left) */}
              <CamRing3D
                className="cam-periscope"
                diameterPercent={17.4}
                topPercent={22.6}
                leftPercent={11.1}
                protrusionPx={7.0}
              />

              {/* 4. Laser Auto-Focus Sensor (Top Right - Vertical Dual Sensor Diodes) */}
              <div className="cam-module cam-laser">
                <div className="laser-glass">
                  <div className="laser-diode laser-sensor-top" />
                  <div className="laser-sensor laser-sensor-bottom" />
                </div>
              </div>

              {/* 5. Clean Circular LED Flash (Middle Right) */}
              <div className="cam-module cam-flash">
                <div className="flash-core" />
              </div>

              {/* 6. 10MP 3x Portrait Telephoto Camera (Bottom Right - Protruding 3D Ring) */}
              <CamRing3D
                className="cam-telephoto"
                diameterPercent={12.0}
                topPercent={16.4}
                leftPercent={35.5}
                protrusionPx={5.2}
              />
            </div>

            {/* Samsung Wordmark Matching Reference Photo */}
            <div className="back-branding" aria-hidden="true">
              <span className="brand-samsung">SAMSUNG</span>
            </div>
          </div>

          {/* PERIMETER TITANIUM EDGES (MATCHING REFERENCE IMAGES) */}
          <div className="edge edge-left">
            {/* Left Frame: Clean satin titanium with antenna bands (Image 2) */}
            <i className="antenna-line antenna-1" />
            <i className="antenna-line antenna-2" />
          </div>

          <div className="edge edge-right">
            {/* Right Frame: Tactile 3D Volume & Power buttons with recessed trenches (Image 1) */}
            <div className="button-recess volume-recess">
              <div className="button-key volume-key" />
            </div>
            <div className="button-recess power-recess">
              <div className="button-key power-key" />
            </div>
            <i className="antenna-line antenna-1" />
            <i className="antenna-line antenna-2" />
          </div>

          <div className="edge edge-top">
            <i className="mic-hole" />
            <i className="mic-hole" />
          </div>

          <div className="edge edge-bottom">
            {/* Interactive S-Pen Silo on Bottom Left */}
            <div
              className={`spen-silo${spenEjected ? " ejected" : ""}`}
              onClick={toggleSpen}
              title="Click S-Pen to eject"
            >
              <div className="spen-cap" />
            </div>

            {/* USB Type-C Port */}
            <div className="usb-port">
              <div className="usb-pin" />
            </div>

            {/* CNC Speaker Slot Bar */}
            <div className="speaker-slot">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>

            <i className="mic-bottom" />
          </div>

          {/* 4 Seamless 3D Corner Cylinders (Completely Seals All Gaps) */}
          <CornerCylinder corner="top-left" />
          <CornerCylinder corner="top-right" />
          <CornerCylinder corner="bottom-right" />
          <CornerCylinder corner="bottom-left" />

          {/* Ejected 3D S-Pen Object */}
          <div className={`spen-3d-body${spenEjected ? "" : " hidden"}`} aria-hidden="true">
            <div className="spen-clicker" />
            <div className="spen-nib" />
          </div>
        </div>
      </div>

      {/* Interactive Helper Hint */}
      <p className={`hint${hint ? "" : " hidden"}`}>
        Drag to rotate in 3D &bull; Click presets on left to inspect
      </p>

      {/* Floating 3D Inspection Studio Toolbar (Vertical on Left Side) */}
      <div className="studio-bar">
        {/* Preset angles */}
        <div className="studio-btn-group">
          <button
            className={`studio-btn${activePreset === "front" ? " active" : ""}`}
            onClick={() => setPreset("front")}
            title="Front Display View"
          >
            <Icon name="eye" />
            <span>Front</span>
          </button>
          <button
            className={`studio-btn${activePreset === "angle" ? " active" : ""}`}
            onClick={() => setPreset("angle")}
            title="3D Tilt View"
          >
            <Icon name="rotate" />
            <span>3D Tilt</span>
          </button>
          <button
            className={`studio-btn${activePreset === "back" ? " active" : ""}`}
            onClick={() => setPreset("back")}
            title="Rear Camera View"
          >
            <Icon name="camera" />
            <span>Cameras</span>
          </button>
          <button
            className={`studio-btn${activePreset === "right-side" ? " active" : ""}`}
            onClick={() => setPreset("right-side")}
            title="Right Side Profile (Buttons & Protruding Cameras)"
          >
            <Icon name="rotate" />
            <span>Right Side</span>
          </button>
          <button
            className={`studio-btn${activePreset === "left-side" ? " active" : ""}`}
            onClick={() => setPreset("left-side")}
            title="Left Side Profile"
          >
            <Icon name="rotate" />
            <span>Left Side</span>
          </button>
          <button
            className={`studio-btn${activePreset === "spen" ? " active" : ""}`}
            onClick={() => setPreset("spen")}
            title="Bottom Edge & S-Pen"
          >
            <Icon name="spen" />
            <span>S-Pen</span>
          </button>
        </div>

        <div className="studio-divider" />

        {/* S-Pen Eject Action */}
        <button
          className={`studio-btn${spenEjected ? " active" : ""}`}
          onClick={toggleSpen}
          title={spenEjected ? "Retract S-Pen" : "Eject S-Pen"}
        >
          <Icon name="spen" />
          <span>{spenEjected ? "Dock Pen" : "Eject Pen"}</span>
        </button>

        {/* Auto Rotate Presentation Mode */}
        <button
          className={`studio-btn${isAutoRotate ? " active" : ""}`}
          onClick={toggleAutoRotate}
          title={isAutoRotate ? "Pause 3D Spin" : "Auto-Rotate 3D"}
        >
          <Icon name={isAutoRotate ? "pause" : "play"} />
          <span>{isAutoRotate ? "Pause Spin" : "Auto Spin"}</span>
        </button>

        <div className="studio-divider" />

        {/* Titanium Color Finishes */}
        <div className="studio-color-group" title="Titanium Color Finish">
          <button
            className={`color-dot dot-sand${colorTheme === "sand" ? " active" : ""}`}
            onClick={() => setColorTheme("sand")}
            aria-label="Titanium Sand"
            title="Titanium Sand (Pasted Color)"
          />
          <button
            className={`color-dot dot-gray${colorTheme === "gray" ? " active" : ""}`}
            onClick={() => setColorTheme("gray")}
            aria-label="Titanium Gray"
            title="Titanium Gray"
          />
          <button
            className={`color-dot dot-black${colorTheme === "black" ? " active" : ""}`}
            onClick={() => setColorTheme("black")}
            aria-label="Titanium Black"
            title="Titanium Black"
          />
          <button
            className={`color-dot dot-silverblue${colorTheme === "silverblue" ? " active" : ""}`}
            onClick={() => setColorTheme("silverblue")}
            aria-label="Titanium Silverblue"
            title="Titanium Silverblue"
          />
        </div>
      </div>
    </>
  );
}

/* ---------- Main Portfolio Page Component ---------- */

export default function Page() {
  const now = useNow();
  const [openId, setOpenId] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const [showEdgePanel, setShowEdgePanel] = useState(false);
  const [flashlight, setFlashlight] = useState(false);
  const [soundMode, setSoundMode] = useState<"sound" | "vibrate" | "mute">("sound");
  const screenElRef = useRef<HTMLDivElement | null>(null);

  const openApp = apps.find((a) => a.id === openId) ?? null;

  const handleOpen = (app: AppDef, el: HTMLElement) => {
    if (app.href) {
      window.open(app.href, "_blank", "noreferrer");
      return;
    }
    const s = screenElRef.current?.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (s) {
      setOrigin({
        x: `${r.left - s.left + r.width / 2}px`,
        y: `${r.top - s.top + r.height / 2}px`,
      });
    }
    setClosing(false);
    setOpenId(app.id);
  };

  const goHome = () => {
    if (openId && !closing) setClosing(true);
  };

  const handleOpenSpenNotes = () => {
    const spenApp = apps.find((a) => a.id === "spen-notes");
    if (spenApp) {
      setOrigin({ x: "12%", y: "85%" });
      setClosing(false);
      setOpenId(spenApp.id);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") goHome();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <main className="stage">
      <PhoneStage onOpenSpen={handleOpenSpenNotes}>
        <div
          className="ui"
          ref={(node) => {
            screenElRef.current = node;
          }}
        >
          {/* Dynamic Galaxy AMOLED Wallpaper */}
          <div className="wallpaper" />
          <div className="wallpaper-shapes" />

          {/* 2.5D Curved Waterfall Display Glass Highlights */}
          <div className="screen-edge-curvature" aria-hidden="true" />
          <div className="edge-lighting" aria-hidden="true" />

          {/* Samsung Edge Panel Curved Handle */}
          <button
            className="edge-panel-handle"
            onClick={() => setShowEdgePanel(!showEdgePanel)}
            aria-label="Samsung Edge Panel"
            title="Samsung Edge Panel"
          />

          {/* Interactive Samsung Edge Panel Quick Drawer */}
          {showEdgePanel && (
            <div className="edge-panel-drawer" role="dialog" aria-label="Edge Panel">
              <div className="edge-panel-header">
                <span className="edge-panel-title">Edge Tools</span>
                <button
                  className="edge-panel-close"
                  onClick={() => setShowEdgePanel(false)}
                  aria-label="Close Edge Panel"
                >
                  &times;
                </button>
              </div>

              <div className="edge-panel-tools">
                <button
                  className={`edge-tool-btn${flashlight ? " active" : ""}`}
                  onClick={() => setFlashlight(!flashlight)}
                  title="Toggle Torch"
                >
                  <Icon name="sun" />
                  <span>{flashlight ? "Torch ON" : "Torch"}</span>
                </button>

                <button
                  className={`edge-tool-btn${soundMode !== "sound" ? " active" : ""}`}
                  onClick={() =>
                    setSoundMode(
                      soundMode === "sound" ? "vibrate" : soundMode === "vibrate" ? "mute" : "sound"
                    )
                  }
                  title="Toggle Sound Profile"
                >
                  <Icon name="phone" />
                  <span>{soundMode.toUpperCase()}</span>
                </button>

                <button
                  className="edge-tool-btn"
                  onClick={() => {
                    handleOpenSpenNotes();
                    setShowEdgePanel(false);
                  }}
                  title="S-Pen Note"
                >
                  <Icon name="spen" />
                  <span>S-Pen</span>
                </button>

                <button
                  className="edge-tool-btn"
                  onClick={() => {
                    const cameraApp = apps.find((a) => a.id === "camera");
                    if (cameraApp) {
                      setOrigin({ x: "85%", y: "85%" });
                      setClosing(false);
                      setOpenId(cameraApp.id);
                      setShowEdgePanel(false);
                    }
                  }}
                  title="Camera"
                >
                  <Icon name="camera" />
                  <span>Camera</span>
                </button>
              </div>

              <div className="edge-panel-battery">
                <div className="edge-battery-row">
                  <span>Battery</span>
                  <span className="edge-battery-val">88%</span>
                </div>
                <div className="edge-battery-sub">Super Fast Charging 2.0</div>
              </div>
            </div>
          )}

          {flashlight && <div className="screen-torch-overlay" aria-hidden="true" />}

          {/* Samsung One UI Status Bar */}
          <StatusBar now={now} />

          {/* Samsung One UI Home Screen */}
          <Home now={now} onOpen={handleOpen} />

          {/* Native One UI App Windows */}
          {openApp && (
            <AppWindow
              app={openApp}
              origin={origin}
              closing={closing}
              onBack={goHome}
              onClosed={() => {
                setOpenId(null);
                setClosing(false);
              }}
            />
          )}

          {/* One UI Bottom Navigation Bar */}
          <button className="navbar" onClick={goHome} aria-label="Go to Home Screen">
            <span className="pill" />
          </button>
        </div>
      </PhoneStage>
    </main>
  );
}
