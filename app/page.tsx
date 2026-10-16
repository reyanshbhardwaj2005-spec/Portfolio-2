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
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="15" width="3.2" height="6" rx="0.8" />
          <rect x="8" y="11" width="3.2" height="10" rx="0.8" />
          <rect x="13" y="7" width="3.2" height="14" rx="0.8" />
          <rect x="18" y="3" width="3.2" height="18" rx="0.8" />
        </svg>
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
    /* ---- Spotify: Official green squircle with 3 soundwave arcs ---- */
    case "spotify":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#1ed760" />
          <path d="M18.5 38.2c-.3 0-.5-.1-.7-.3-.4-.5-.3-1.1.2-1.5 4.6-3.2 10.4-4 15.8-2.2.6.2.9.8.7 1.4-.2.6-.8.9-1.4.7-4.7-1.5-9.8-.8-13.8 1.9-.2.1-.5.1-.8 0z" fill="#000000" />
          <path d="M17 32.8c-.3 0-.6-.1-.8-.3-.5-.5-.4-1.3.2-1.7 5.5-3.7 12.3-4.6 18.7-2.5.7.2 1 .9.8 1.6-.2.7-.9 1-1.6.8-5.6-1.8-11.6-1-16.4 2.2-.3.2-.6.2-.9-.1z" fill="#000000" />
          <path d="M15.5 27c-.3 0-.7-.1-.9-.4-.6-.6-.4-1.5.2-2 6.5-4.2 14.6-5.2 22-2.7.8.2 1.2 1.1 1 1.9-.3.8-1.1 1.2-1.9 1-6.6-2.2-13.8-1.3-19.5 2.3-.3.2-.6.2-.9-.1z" fill="#000000" />
        </svg>
      );
    /* ---- YouTube: Official Android red squircle with centered white play button ---- */
    case "tv":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#FF0000" />
          <polygon points="25,20 25,40 41,30" fill="#ffffff" />
        </svg>
      );
    /* ---- Samsung Contacts: Official warm orange One UI gradient with person silhouette ---- */
    case "about":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <defs>
            <linearGradient id="ct-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A28" />
              <stop offset="100%" stopColor="#FF5722" />
            </linearGradient>
          </defs>
          <rect width="60" height="60" rx="14" fill="url(#ct-g)" />
          <circle cx="30" cy="22" r="8.5" fill="#ffffff" />
          <path d="M16 47c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#ffffff" />
        </svg>
      );
    /* ---- Samsung Notes: Official One UI amber-orange gradient with notepad and pen ---- */
    case "blog":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <defs>
            <linearGradient id="sn-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9800" />
              <stop offset="100%" stopColor="#F57C00" />
            </linearGradient>
          </defs>
          <rect width="60" height="60" rx="14" fill="url(#sn-g)" />
          {/* Notepad sheet */}
          <rect x="15" y="12" width="30" height="36" rx="4" fill="#ffffff" />
          {/* Note text lines */}
          <line x1="21" y1="21" x2="39" y2="21" stroke="#FFB74D" strokeWidth="2" strokeLinecap="round" />
          <line x1="21" y1="27" x2="39" y2="27" stroke="#FFB74D" strokeWidth="2" strokeLinecap="round" />
          <line x1="21" y1="33" x2="34" y2="33" stroke="#FFB74D" strokeWidth="2" strokeLinecap="round" />
          <line x1="21" y1="39" x2="30" y2="39" stroke="#FFB74D" strokeWidth="2" strokeLinecap="round" />
          {/* Pencil */}
          <g transform="translate(37, 39) rotate(-45)">
            <rect x="-2" y="-14" width="4" height="12" rx="0.5" fill="#E65100" />
            <polygon points="-2,-2 2,-2 0,3" fill="#37474F" />
          </g>
        </svg>
      );
    /* ---- Samsung Settings: Official One UI slate-gray squircle with gear ---- */
    case "settings":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <defs>
            <linearGradient id="sset-g" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5E6773" />
              <stop offset="100%" stopColor="#4A525C" />
            </linearGradient>
          </defs>
          <rect width="60" height="60" rx="14" fill="url(#sset-g)" />
          <g transform="translate(30, 30)">
            {/* Gear teeth */}
            <path d="M-3.5-18h7l1.2 4.6a13 13 0 013.6 2.1l4.3-1.8 3.5 6-3.5 3a13 13 0 010 4.2l3.5 3-3.5 6-4.3-1.8a13 13 0 01-3.6 2.1l-1.2 4.6h-7l-1.2-4.6a13 13 0 01-3.6-2.1l-4.3 1.8-3.5-6 3.5-3a13 13 0 010-4.2l-3.5-3 3.5-6 4.3 1.8a13 13 0 013.6-2.1z" fill="#ffffff" />
            <circle cx="0" cy="0" r="6.5" fill="#4A525C" />
          </g>
        </svg>
      );
    /* ---- Steam: Official dark navy gradient with crosshair/crank logo ---- */
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
          <circle cx="36" cy="22" r="7.5" fill="none" stroke="#ffffff" strokeWidth="2.8" />
          <circle cx="36" cy="22" r="3.2" fill="#ffffff" />
          <circle cx="20" cy="38" r="5.5" fill="none" stroke="#ffffff" strokeWidth="2.4" />
          <circle cx="20" cy="38" r="2.2" fill="#ffffff" />
          <line x1="23" y1="35" x2="34" y2="25" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );
    /* ---- WHOOP: Matte black squircle with signature electric green waveform ---- */
    case "whoop":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#111114" />
          <circle cx="30" cy="30" r="19" fill="none" stroke="#10e868" strokeWidth="1.6" opacity="0.35" />
          <g stroke="#10e868" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <polyline points="15,30 19,23 23,37 27,19 31,41 35,23 39,37 43,30" />
          </g>
        </svg>
      );
    /* ---- Flighty: Dark navy with crisp ascending airliner ---- */
    case "flighty":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <defs>
            <linearGradient id="fly-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <rect width="60" height="60" rx="14" fill="url(#fly-g)" />
          <g transform="translate(30,30) rotate(-45) translate(-30,-30)">
            <path d="M30 11c-1.2 0-2 1.2-2 2.8v12l-15 8v4l15-4.8v10l-4 3v2.8l6-1.8 6 1.8V46l-4-3v-10l15 4.8v-4l-15-8V13.8c0-1.6-.8-2.8-2-2.8z" fill="#ffffff" />
          </g>
        </svg>
      );
    /* ---- Google Play Store: Official 4-color triangle on clean white squircle ---- */
    case "appstore":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#ffffff" />
          <defs>
            <linearGradient id="ps-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00c0ff" />
              <stop offset="100%" stopColor="#0072ff" />
            </linearGradient>
          </defs>
          <path d="M15 11v38l21-19L15 11z" fill="#00E676" />
          <path d="M15 11l21 19 6-5.5L18.5 9.5c-1.2-.7-2.6-.4-3.5 1.5z" fill="#FFD600" />
          <path d="M15 49l21-19 6 5.5-23.5 15c-.9.6-2.3.9-3.5-1.5z" fill="#FF3D00" />
          <path d="M36 30l6-5.5 4.5 3c1.3.9 1.3 2.1 0 3l-4.5 3-6-5.5z" fill="url(#ps-blue)" />
        </svg>
      );
    /* ---- Google Photos: Official 4-petal pinwheel on clean white squircle ---- */
    case "photos":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#ffffff" />
          {/* Top petal - Red */}
          <path d="M30 11c-5 0-9 4-9 9h9V11z" fill="#EA4335" />
          <path d="M30 20h9c0-5-4-9-9-9v9z" fill="#EA4335" />
          {/* Right petal - Green */}
          <path d="M39 30c0-5 4-9 9-9v9H39z" fill="#34A853" />
          <path d="M39 30v9c5 0 9-4 9-9h-9z" fill="#34A853" />
          {/* Bottom petal - Blue */}
          <path d="M30 39c5 0 9-4 9-9h-9v9z" fill="#4285F4" />
          <path d="M30 39h-9c0 5 4 9 9 9v-9z" fill="#4285F4" />
          {/* Left petal - Yellow */}
          <path d="M21 30c0 5-4 9-9 9v-9h9z" fill="#FBBC04" />
          <path d="M21 30v-9c-5 0-9 4-9 9h9z" fill="#FBBC04" />
        </svg>
      );
    /* ---- Gmail: Official Google 4-color M on clean white squircle ---- */
    case "mail":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#ffffff" />
          {/* Left blue column */}
          <rect x="12" y="24" width="7" height="23" rx="1" fill="#4285F4" />
          {/* Right green column */}
          <rect x="41" y="24" width="7" height="23" rx="1" fill="#34A853" />
          {/* Left fold - red */}
          <path d="M12 18.5c0-2.3 2.5-3.8 4.5-2.5L30 25.5l-11 9-7-5.5v-10.5z" fill="#EA4335" />
          {/* Right fold - red */}
          <path d="M48 18.5c0-2.3-2.5-3.8-4.5-2.5L30 25.5l11 9 7-5.5v-10.5z" fill="#EA4335" />
          {/* Top-right yellow accent */}
          <path d="M43.5 16c1.2-.8 2.8-.8 3.8.3l.7.7v3.5l-4.5-4.5z" fill="#FBBC04" />
        </svg>
      );
    /* ---- Samsung My Files: Official One UI orange squircle with white folder ---- */
    case "files":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <defs>
            <linearGradient id="myf-g" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF9800" />
              <stop offset="100%" stopColor="#F57C00" />
            </linearGradient>
          </defs>
          <rect width="60" height="60" rx="14" fill="url(#myf-g)" />
          {/* Folder back tab */}
          <path d="M14 19a3 3 0 013-3h8l3.5 4h14.5a3 3 0 013 3v4H14v-8z" fill="#ffffff" opacity="0.65" />
          {/* Folder front body */}
          <rect x="13" y="23" width="34" height="23" rx="3.5" fill="#ffffff" />
          {/* Accent line on folder front */}
          <line x1="19" y1="30" x2="31" y2="30" stroke="#F57C00" strokeWidth="2.2" strokeLinecap="round" />
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
      <span className="icon">
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
    } catch { }
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
      } catch { }
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
  const [opened, setOpened] = useState(false);

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

  // Guarantee transition to native 2D layout once the open animation finishes
  useEffect(() => {
    if (closing) {
      setOpened(false);
      return;
    }
    const timer = setTimeout(() => {
      setOpened(true);
    }, 390);
    return () => clearTimeout(timer);
  }, [closing]);

  const handleEnd = (e: AnimationEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    if (closing) {
      onClosed();
    } else {
      setOpened(true);
    }
  };

  return (
    <section
      ref={windowRef}
      className={`app-window${closing ? " closing" : ""}${opened && !closing ? " opened" : ""}`}
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

const REST_RX = 0;
const REST_RY = -24;
const MAX_RX = 35;

type ViewPreset = "front" | "angle" | "back" | "right-side" | "left-side" | "spen";
type TitaniumColor = "sand" | "gray" | "black" | "silverblue";

/* ---------- Seamless 3D Corner Cylinders (100% Solid Opaque Continuous Arc) ---------- */

function CornerCylinder({
  corner,
  numFacets = 28,
}: {
  corner: "top-left" | "top-right" | "bottom-right" | "bottom-left";
  numFacets?: number;
}) {
  const getDeg = (fraction: number) => {
    if (corner === "top-left") return -90 + fraction * 90;
    if (corner === "top-right") return 0 + fraction * 90;
    if (corner === "bottom-right") return 90 + fraction * 90;
    return 180 + fraction * 90;
  };

  // Outer visible facets with hairline assembly seam and chamfers
  const facets = Array.from({ length: numFacets }, (_, i) => ({
    id: i,
    deg: getDeg(i / (numFacets - 1)),
  }));

  // Staggered solid inner backing facets to completely block all light bleed & translucency
  const innerFacets = Array.from({ length: numFacets - 1 }, (_, i) => ({
    id: `in-${i}`,
    deg: getDeg((i + 0.5) / (numFacets - 1)),
  }));

  const stepRad = (Math.PI / 2) / (numFacets - 1);
  const widthFactor = (stepRad * 2.2).toFixed(5);
  const marginFactor = (-stepRad * 2.2 * 0.5).toFixed(5);

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
      {/* 100% Solid Opaque Inner Layer (Bridges all seams) */}
      {innerFacets.map((f) => (
        <div
          key={f.id}
          className="corner-facet-inner"
          style={{ "--facet-deg": `${f.deg.toFixed(2)}deg` } as CSSProperties}
        />
      ))}
      {/* Outer Styled Facets (Carries Hairline Seam, Chamfers & Curvature) */}
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
  isAppOpen,
}: {
  children: ReactNode;
  onOpenSpen: () => void;
  isAppOpen?: boolean;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  // Exact angles in degrees
  const rot = useRef({ rx: REST_RX, ry: REST_RY });
  const targetRot = useRef({ rx: REST_RX, ry: REST_RY });
  const velocity = useRef({ vx: 0, vy: 0 });

  // Physics animation modes: "idle" | "dragging" | "inertia" | "tweening" | "autorotate" | "spring"
  const mode = useRef<"idle" | "dragging" | "inertia" | "tweening" | "autorotate" | "spring">("idle");

  // Pointer drag tracking
  const dragStart = useRef({ x: 0, y: 0, time: 0, moved: false });
  const dragStartRot = useRef({ rx: REST_RX, ry: REST_RY });
  const lastPointer = useRef({ x: 0, y: 0, time: 0 });

  // High-precision critically damped spring for liquid-smooth natural return
  const spring = useRef({
    startRx: 0,
    startRy: 0,
    targetRx: 0,
    targetRy: 0,
    v0x: 0,
    v0y: 0,
    omega: 8.2,
    startTime: 0,
    duration: 750,
    onComplete: undefined as (() => void) | undefined,
  });

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

    const rxStr = currentRx.toFixed(1);
    const ryStr = currentRy.toFixed(1);

    el.style.transform = `rotateX(${rxStr}deg) rotateY(${ryStr}deg)`;

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
    const rightSpec = Math.min(1.2, Math.pow(rightIntensity, 1.8) * 1.55);
    const leftSpec = Math.min(1.2, Math.pow(leftIntensity, 1.8) * 1.55);
    const topSpec = Math.min(1.2, Math.pow(topIntensity, 1.8) * 1.55);
    const bottomSpec = Math.min(1.2, Math.pow(bottomIntensity, 1.8) * 1.55);
    const lensSpec = Math.min(1.3, Math.pow(backIntensity, 1.35) * 1.6);
    const rimLight = Math.min(1, Math.pow(1 - Math.abs(lz), 1.5) * 1.25);

    // Dynamic spot positions along perimeter edges and rails
    const spotEdgeY = Math.min(96, Math.max(4, 50 + ly * 55));
    const spotEdgeX = Math.min(96, Math.max(4, 50 - lx * 55));
    const spotEdgeDepth = Math.min(90, Math.max(10, 50 - lz * 40));

    // Lens coating sheen offsets
    const sheenX = -lx * 55;
    const sheenY = -ly * 55;
    const sheenAngle = Math.atan2(ly, lx) * (180 / Math.PI);

    // Ground shadow reacts dynamically to 3D orientation
    const shadowScaleX = Math.abs(cosY) * 0.72 + Math.abs(sinY) * 0.30 + 0.22;
    const shadowShiftX = lx * 18;
    const shadowOpacity = 0.76 + Math.abs(cosX) * 0.18;

    // Batch all CSS custom properties into a single style write to minimize reflows
    const s = el.style;
    s.setProperty("--spot-front-x", `${spotFrontX | 0}%`);
    s.setProperty("--spot-front-y", `${spotFrontY | 0}%`);
    s.setProperty("--spot-back-x", `${spotBackX | 0}%`);
    s.setProperty("--spot-back-y", `${spotBackY | 0}%`);
    s.setProperty("--spot-edge-x", `${spotEdgeX | 0}%`);
    s.setProperty("--spot-edge-y", `${spotEdgeY | 0}%`);
    s.setProperty("--spot-edge-depth", `${spotEdgeDepth | 0}%`);

    s.setProperty("--light-front", frontIntensity.toFixed(2));
    s.setProperty("--light-back", backIntensity.toFixed(2));
    s.setProperty("--light-right", rightIntensity.toFixed(2));
    s.setProperty("--light-left", leftIntensity.toFixed(2));
    s.setProperty("--light-top", topIntensity.toFixed(2));
    s.setProperty("--light-bottom", bottomIntensity.toFixed(2));
    s.setProperty("--light-rim", rimLight.toFixed(2));

    s.setProperty("--spec-front", frontSpec.toFixed(2));
    s.setProperty("--spec-back", backSpec.toFixed(2));
    s.setProperty("--spec-right", rightSpec.toFixed(2));
    s.setProperty("--spec-left", leftSpec.toFixed(2));
    s.setProperty("--spec-top", topSpec.toFixed(2));
    s.setProperty("--spec-bottom", bottomSpec.toFixed(2));
    s.setProperty("--spec-lens", lensSpec.toFixed(2));

    s.setProperty("--sheen-x", `${sheenX | 0}`);
    s.setProperty("--sheen-y", `${sheenY | 0}`);
    s.setProperty("--sheen-angle", `${sheenAngle | 0}deg`);

    if (sceneRef.current) {
      const ss = sceneRef.current.style;
      ss.setProperty("--shadow-scale-x", shadowScaleX.toFixed(2));
      ss.setProperty("--shadow-shift-x", `${shadowShiftX | 0}px`);
      ss.setProperty("--shadow-opacity", shadowOpacity.toFixed(2));
    }

    const targetFrontRy = Math.round(currentRy / 360) * 360;
    const isFront = Math.abs(currentRx) < 1.0 && Math.abs(currentRy - targetFrontRy) < 28;
    el.classList.toggle("is-front", isFront);

    const isFlatFront =
      Math.abs(currentRx) < 0.25 &&
      Math.abs(currentRy - targetFrontRy) < 0.25 &&
      mode.current !== "dragging";
    el.classList.toggle("is-flat-front", isFlatFront);
    sceneRef.current?.classList.toggle("is-flat-front", isFlatFront);
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
        // Near-instant tracking with minimal micro-cushion (lower base = less lag)
        const followFactor = 1 - Math.pow(0.02, dt);
        rot.current.rx += (targetRot.current.rx - rot.current.rx) * followFactor;
        rot.current.ry += (targetRot.current.ry - rot.current.ry) * followFactor;
        applyTransform();
        needNextFrame = true;
      } else if (mode.current === "inertia") {
        // Silky, luxurious momentum glide for continuous 360-degree rotation
        const friction = Math.pow(0.975, dt);
        velocity.current.vx *= friction;
        velocity.current.vy *= friction;

        rot.current.ry += velocity.current.vx * dt;
        // As phone coasts, gently restore vertical tilt to 0 (vertically upright)
        const restoreFactor = 1 - Math.pow(0.90, dt);
        rot.current.rx += (0 - rot.current.rx) * restoreFactor;
        targetRot.current = { ...rot.current };

        const speed = Math.abs(velocity.current.vx);
        const targetFrontRy = Math.round(rot.current.ry / 360) * 360;
        const diffRy = Math.abs(rot.current.ry - targetFrontRy);
        const diffRx = Math.abs(rot.current.rx);

        // Gentle front magnetic dock only when coasting right in front at very low speed
        if (speed < 0.28 && diffRy <= 14 && diffRx <= 10) {
          mode.current = "tweening";
          velocity.current = { vx: 0, vy: 0 };
          tween.current = {
            startRx: rot.current.rx,
            startRy: rot.current.ry,
            targetRx: 0,
            targetRy: targetFrontRy,
            startTime: performance.now(),
            duration: 480,
            onComplete: () => setActivePreset("front"),
          };
          needNextFrame = true;
        } else if (speed > 0.015 || diffRx > 0.05) {
          applyTransform();
          needNextFrame = true;
        } else {
          rot.current.rx = 0;
          applyTransform();
          mode.current = "idle";
        }
      } else if (mode.current === "spring") {
        const elapsedSec = (time - spring.current.startTime) / 1000;
        const progress = Math.min(1, (time - spring.current.startTime) / spring.current.duration);

        const omega = spring.current.omega;
        const decay = Math.exp(-omega * elapsedSec);

        // Analytical critically damped oscillator (C2 continuous: zero initial jerk, zero landing jerk)
        // x(t) = target + (diff + (v0 + omega * diff) * t) * e^(-omega * t)
        const diffX = spring.current.startRx - spring.current.targetRx;
        let diffY = spring.current.startRy - spring.current.targetRy;
        if (diffY > 180) diffY -= 360;
        if (diffY < -180) diffY += 360;

        const currentRx = spring.current.targetRx + (diffX + (spring.current.v0x + omega * diffX) * elapsedSec) * decay;
        const currentRy = spring.current.targetRy + (diffY + (spring.current.v0y + omega * diffY) * elapsedSec) * decay;

        rot.current.rx = currentRx;
        rot.current.ry = currentRy;
        targetRot.current = { ...rot.current };

        applyTransform();

        const remainingDist = Math.hypot(rot.current.rx - spring.current.targetRx, rot.current.ry - spring.current.targetRy);

        if (progress < 1 && remainingDist > 0.05) {
          needNextFrame = true;
        } else {
          rot.current.rx = spring.current.targetRx;
          rot.current.ry = spring.current.targetRy;
          applyTransform();
          mode.current = "idle";
          const cb = spring.current.onComplete;
          if (cb) cb();
        }
      } else if (mode.current === "tweening") {
        const elapsed = time - tween.current.startTime;
        const progress = Math.min(1, elapsed / tween.current.duration);

        // Perlin smootherstep (C2 continuous: smooth ease-in & cushion ease-out)
        const ease = progress * progress * progress * (progress * (progress * 6 - 15) + 10);

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

  const startSpringReturn = useCallback(
    (targetRx: number, targetRy: number, onComplete?: () => void) => {
      mode.current = "spring";
      const now = performance.now();

      // Soft velocity retention from drag release: preserves subtle flick without harshness
      const maxSpeed = 35; // degrees/sec
      const v0x = Math.max(-maxSpeed, Math.min(maxSpeed, -velocity.current.vy * 40));
      const v0y = Math.max(-maxSpeed, Math.min(maxSpeed, velocity.current.vx * 40));

      const dist = Math.hypot(targetRx - rot.current.rx, targetRy - rot.current.ry);
      // Omega 7.8 - 8.4 gives a luxurious, fluid 700ms - 800ms float with zero jerk and zero overshoot
      const omega = Math.min(8.6, Math.max(7.4, 8.2 - dist * 0.015));
      const duration = Math.min(950, Math.max(720, Math.round((6.2 / omega) * 1000)));

      spring.current = {
        startRx: rot.current.rx,
        startRy: rot.current.ry,
        targetRx,
        targetRy,
        v0x,
        v0y,
        omega,
        startTime: now,
        duration,
        onComplete,
      };

      ensureLoopRunning();
    },
    [ensureLoopRunning]
  );

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
    phoneRef.current?.classList.add("is-dragging");
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
      moved: false,
    };
    dragStartRot.current = {
      rx: rot.current.rx,
      ry: rot.current.ry,
    };
    lastPointer.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };
    velocity.current = { vx: 0, vy: 0 };
    targetRot.current = { ...rot.current };

    try {
      sceneRef.current?.setPointerCapture(e.pointerId);
    } catch {
      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }
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

    const totalDx = Math.abs(e.clientX - dragStart.current.x);
    const totalDy = Math.abs(e.clientY - dragStart.current.y);

    if (totalDx + totalDy > 2) {
      dragStart.current.moved = true;
    }

    // Continuous, silky smooth 2-axis dragging (no artificial axis-locks!)
    targetRot.current.ry += dx * 0.40;
    const nextRx = targetRot.current.rx - dy * 0.32;
    targetRot.current.rx = Math.max(-MAX_RX, Math.min(MAX_RX, nextRx));

    // Instant velocity normalized to standard 60fps frame (16.67ms)
    const instVx = (dx / deltaMs) * 16.67 * 0.40;
    const instVy = (dy / deltaMs) * 16.67 * 0.32;

    // Exponential moving average filter: responsive tracking with minimal jitter smoothing
    velocity.current.vx = velocity.current.vx * 0.18 + instVx * 0.82;
    velocity.current.vy = velocity.current.vy * 0.18 + instVy * 0.82;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (mode.current !== "dragging") return;
    phoneRef.current?.classList.remove("is-dragging");

    try {
      sceneRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already lost
      }
    }

    const speed = Math.hypot(velocity.current.vx, velocity.current.vy);
    const targetFrontRy = Math.round(rot.current.ry / 360) * 360;
    const diffRy = Math.abs(rot.current.ry - targetFrontRy);

    // If released with horizontal momentum: silky inertia glide
    if (Math.abs(velocity.current.vx) > 0.12) {
      mode.current = "inertia";
      ensureLoopRunning();
    } else {
      // Gentle release: return rx to 0 vertically upright without resetting horizontal angle!
      // Only dock to front if already pointing almost directly at front (<14 deg) and low tilt
      if (diffRy <= 14 && Math.abs(rot.current.rx) <= 12) {
        startSpringReturn(0, targetFrontRy, () => setActivePreset("front"));
      } else {
        startSpringReturn(0, rot.current.ry);
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
        targetRx = 0;
        targetRy = getClosestTargetRy(rot.current.ry, -24);
        break;
      case "back":
        targetRx = 0;
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
        targetRx = -35;
        targetRy = getClosestTargetRy(rot.current.ry, 14);
        break;
    }

    // Dynamic duration based on angular distance for optimal pacing
    const dist = Math.hypot(targetRx - rot.current.rx, targetRy - rot.current.ry);
    const duration =
      preset === "front"
        ? Math.min(380, Math.max(220, Math.round(200 + dist * 1.1)))
        : Math.min(850, Math.max(520, Math.round(480 + dist * 1.5)));

    startTween(targetRx, targetRy, duration, () => {
      if (preset === "front") {
        rot.current.rx = 0;
        rot.current.ry = targetRy;
        applyTransform();
      }
    });
  };

  // Smoothly face front when an app opens so text is read parallel to screen pixels
  useEffect(() => {
    if (isAppOpen) {
      setPreset("front");
    }
    phoneRef.current?.classList.toggle("is-app-open", Boolean(isAppOpen));
    sceneRef.current?.classList.toggle("is-app-open", Boolean(isAppOpen));
  }, [isAppOpen]);

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
            {/* Left Frame: Clean satin titanium with antenna bands & SIM tray (Matching Reference Photo) */}
            <i className="antenna-line antenna-1" />
            <i className="rail-pinhole" aria-hidden="true" />
            <div className="sim-tray-slot" aria-hidden="true">
              <div className="sim-tray-cutout" />
              <i className="sim-pinhole" />
            </div>
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
      <PhoneStage onOpenSpen={handleOpenSpenNotes} isAppOpen={Boolean(openId)}>
        <div
          className={`ui${openId ? " has-open-app" : ""}${closing ? " app-closing" : ""}`}
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
