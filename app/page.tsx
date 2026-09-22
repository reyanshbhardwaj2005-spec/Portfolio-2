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

/* ---------- One UI App Icon & Home Screen ---------- */

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
        <Icon name={app.icon} />
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
  const grid = apps.filter((a) => !a.dock);
  const dock = apps.filter((a) => a.dock);

  const aboutApp = apps.find((a) => a.id === "about") || apps[0];

  return (
    <div className="home">
      {/* Samsung One UI Weather & Clock Widget */}
      <div className="oneui-widget">
        <div className="widget-top-row">
          <div className="widget-time">{fmtTime(now)}</div>
          <div className="widget-weather-icon">
            <Icon name="sun" />
            <span className="widget-temp">26°</span>
          </div>
        </div>
        <div className="widget-date">{fmtDate(now)} &bull; New Delhi</div>

        <div className="widget-profile">
          <div className="widget-name">{profile.name}</div>
          <div className="widget-role">{profile.role}</div>
          <div className="widget-status-badge">
            <i /> {profile.status}
          </div>
        </div>
      </div>

      {/* Galaxy AI Quick Pill */}
      <div
        className="galaxy-ai-pill"
        onClick={(e) => onOpen(aboutApp, e.currentTarget)}
        role="button"
        tabIndex={0}
      >
        <div className="galaxy-ai-left">
          <span className="galaxy-ai-sparkle">
            <Icon name="sparkles" />
          </span>
          <span className="galaxy-ai-text">Explore Reyansh's portfolio...</span>
        </div>
        <span className="galaxy-ai-badge">Galaxy AI</span>
      </div>

      {/* App Grid */}
      <div className="grid">
        {grid.map((a) => (
          <AppIcon key={a.id} app={a} onOpen={onOpen} />
        ))}
      </div>

      {/* Screen pagination indicator */}
      <div className="dots" aria-hidden="true">
        <i className="on" />
        <i />
      </div>

      {/* Dock */}
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
  const handleEnd = (e: AnimationEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    if (closing) onClosed();
  };

  return (
    <section
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
      <div className="app-body">
        {app.blocks?.map((b, i) => (
          <BlockView block={b} key={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------- 3D Phone Stage & Inspection Studio ---------- */

const REST_RX = 12;
const REST_RY = -24;
const MAX_RX = 65;

type ViewPreset = "front" | "angle" | "back" | "right-side" | "left-side" | "spen";
type TitaniumColor = "gray" | "black" | "silverblue";

/* ---------- Seamless 3D Corner Cylinders (No Gaps) ---------- */

function CornerCylinder({
  corner,
  numFacets = 16,
}: {
  corner: "top-left" | "top-right" | "bottom-right" | "bottom-left";
  numFacets?: number;
}) {
  const facets = Array.from({ length: numFacets }, (_, i) => {
    const fraction = (i + 0.5) / numFacets;
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

  return (
    <div className={`corner-cylinder ${corner}`} aria-hidden="true">
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
  const numFacets = 32;
  const facets = Array.from({ length: numFacets }, (_, i) => ({
    id: i,
    deg: (i * 360) / numFacets,
  }));

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
      {/* Stepped Silver Base Tier Facets */}
      <div className="cam-tier base-tier" aria-hidden="true">
        {facets.map((f) => (
          <div
            key={f.id}
            className="barrel-facet base-facet"
            style={{ "--facet-deg": `${f.deg}deg` } as CSSProperties}
          />
        ))}
      </div>

      {/* Solid Polished Silver Chamfer Shelf Connecting Base Pedestal to Main Barrel */}
      <div className="cam-step-shelf" aria-hidden="true" />

      {/* Main Titanium Cylinder Facets (Solid Wall Visible In Side Profile) */}
      <div className="cam-tier main-tier" aria-hidden="true">
        {facets.map((f) => (
          <div
            key={f.id}
            className="barrel-facet main-facet"
            style={{ "--facet-deg": `${f.deg}deg` } as CSSProperties}
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

  const rot = useRef({ rx: REST_RX, ry: REST_RY });
  const drag = useRef({ active: false, x: 0, y: 0, vx: 0, vy: 0, moved: false });
  const raf = useRef<number | null>(null);
  const autoRotateRaf = useRef<number | null>(null);

  const [hint, setHint] = useState(true);
  const [activePreset, setActivePreset] = useState<ViewPreset>("angle");
  const [colorTheme, setColorTheme] = useState<TitaniumColor>("silverblue");
  const [spenEjected, setSpenEjected] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(false);

  // Apply rotation and dynamic studio lighting custom properties to DOM
  const applyTransform = useCallback((snap: boolean) => {
    const el = phoneRef.current;
    if (!el) return;

    el.style.setProperty("--rx", `${rot.current.rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${rot.current.ry.toFixed(2)}deg`);

    // Fixed Studio Key Spotlight in World Coordinates (elevated top-left-front)
    const lx_world = -0.32;
    const ly_world = -0.65;
    const lz_world = 0.69;

    const radX = (rot.current.rx * Math.PI) / 180;
    const radY = (rot.current.ry * Math.PI) / 180;

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

    // Specular highlights (exponential falloff for crisp shine)
    const frontSpec = Math.pow(frontIntensity, 2.8);
    const backSpec = Math.pow(backIntensity, 2.8);
    const lensSpec = Math.pow(backIntensity, 1.8);

    // Lens coating sheen offsets
    const sheenX = -lx * 40;
    const sheenY = -ly * 40;
    const sheenAngle = Math.atan2(ly, lx) * (180 / Math.PI);

    // Set dynamic custom properties for realistic spotlight interaction
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

    el.style.setProperty("--spec-front", frontSpec.toFixed(3));
    el.style.setProperty("--spec-back", backSpec.toFixed(3));
    el.style.setProperty("--spec-lens", lensSpec.toFixed(3));

    el.style.setProperty("--sheen-x", sheenX.toFixed(1));
    el.style.setProperty("--sheen-y", sheenY.toFixed(1));
    el.style.setProperty("--sheen-angle", `${sheenAngle.toFixed(1)}deg`);
    el.style.setProperty("--glare-opacity", (0.15 + frontIntensity * 0.85).toFixed(2));

    el.classList.toggle("snap", snap);
  }, []);

  useEffect(() => {
    applyTransform(true);
    document.documentElement.setAttribute("data-theme", colorTheme);
  }, [applyTransform, colorTheme]);

  const stopInertia = () => {
    if (raf.current !== null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  };

  const stopAutoRotate = () => {
    if (autoRotateRaf.current !== null) {
      cancelAnimationFrame(autoRotateRaf.current);
      autoRotateRaf.current = null;
    }
    setIsAutoRotate(false);
  };

  // Inertia momentum release
  const runInertia = () => {
    const step = () => {
      drag.current.vx *= 0.93;
      drag.current.vy *= 0.93;

      rot.current.ry += drag.current.vx;
      rot.current.rx = Math.max(-MAX_RX, Math.min(MAX_RX, rot.current.rx - drag.current.vy));

      applyTransform(false);

      if (Math.abs(drag.current.vx) > 0.03 || Math.abs(drag.current.vy) > 0.03) {
        raf.current = requestAnimationFrame(step);
      } else {
        raf.current = null;
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  // Auto-rotate presentation mode
  const toggleAutoRotate = () => {
    if (isAutoRotate) {
      stopAutoRotate();
    } else {
      stopInertia();
      setIsAutoRotate(true);
      phoneRef.current?.classList.remove("snap");

      const spin = () => {
        rot.current.ry = (rot.current.ry + 0.45) % 360;
        applyTransform(false);
        autoRotateRaf.current = requestAnimationFrame(spin);
      };
      autoRotateRaf.current = requestAnimationFrame(spin);
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Avoid hijacking taps on the interactive screen
    if (screenRef.current?.contains(e.target as Node)) return;

    stopInertia();
    stopAutoRotate();

    drag.current = {
      active: true,
      x: e.clientX,
      y: e.clientY,
      vx: 0,
      vy: 0,
      moved: false,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    phoneRef.current?.classList.remove("snap");
    setHint(false);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    drag.current.x = e.clientX;
    drag.current.y = e.clientY;

    if (Math.abs(dx) + Math.abs(dy) > 2) drag.current.moved = true;

    rot.current.ry += dx * 0.38;
    rot.current.rx = Math.max(-MAX_RX, Math.min(MAX_RX, rot.current.rx - dy * 0.32));
    drag.current.vx = dx * 0.38;
    drag.current.vy = dy * 0.32;

    applyTransform(false);
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (Math.abs(drag.current.vx) > 0.4 || Math.abs(drag.current.vy) > 0.4) {
      runInertia();
    }
  };

  // Quick View Preset Angles
  const setPreset = (preset: ViewPreset) => {
    stopInertia();
    stopAutoRotate();
    setActivePreset(preset);

    switch (preset) {
      case "front":
        rot.current = { rx: 0, ry: 0 };
        break;
      case "angle":
        rot.current = { rx: 12, ry: -24 };
        break;
      case "back":
        rot.current = { rx: 10, ry: 162 };
        break;
      case "right-side":
        rot.current = { rx: 2, ry: -86 };
        break;
      case "left-side":
        rot.current = { rx: 2, ry: 86 };
        break;
      case "spen":
        rot.current = { rx: -48, ry: 14 };
        break;
    }
    applyTransform(true);
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
  const onDoubleClick = () => {
    setPreset("angle");
  };

  useEffect(() => {
    return () => {
      stopInertia();
      stopAutoRotate();
    };
  }, []);

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

        <div className={`phone3d snap${isAutoRotate ? " no-float" : ""}`} ref={phoneRef}>
          {/* FRONT FACE: Razor-thin Bezel, AMOLED Screen & Infinity-O Camera */}
          <div className="face front">
            <div className="front-earpiece" aria-hidden="true" />
            <div className="front-camera" aria-hidden="true" />

            <div className="screen" ref={screenRef}>
              <div className="screen-glare" aria-hidden="true" />
              {children}
            </div>
          </div>

          {/* BACK FACE: Frosted Gorilla Armor + Signature S26 Ultra Floating Camera System */}
          <div className="face back">
            <div className="back-satin-sheen" aria-hidden="true" />

            {/* Signature 3D Floating Camera Array (Stepped Cylinders Matching Reference Photo) */}
            <div className="camera-system" aria-hidden="true">
              {/* Continuous Raised 3D Pill Island Plateau Enclosing Primary 3 Lenses */}
              <div className="cam-island-shadow" aria-hidden="true" />
              <div className="cam-island-wall" aria-hidden="true" />
              <div className="cam-island-pill" aria-hidden="true">
                <div className="cam-island-surface" />
              </div>

              {/* 1. 12MP Ultra-Wide Camera (Top Left) */}
              <CamRing3D
                className="cam-ultrawide"
                diameterPercent={17.4}
                topPercent={4.8}
                leftPercent={11.1}
                protrusionPx={6}
              />

              {/* 2. 200MP Main Wide Camera (Middle Left - Raised Bezel) */}
              <CamRing3D
                className="cam-main"
                diameterPercent={17.4}
                topPercent={13.7}
                leftPercent={11.1}
                protrusionPx={6.5}
                isMain
              />

              {/* 3. 50MP 5x Telephoto Camera (Bottom Left) */}
              <CamRing3D
                className="cam-periscope"
                diameterPercent={17.4}
                topPercent={22.6}
                leftPercent={11.1}
                protrusionPx={6}
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
                protrusionPx={5}
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
        Drag to rotate in 3D &bull; Click presets below to inspect
      </p>

      {/* Floating 3D Inspection Studio Toolbar */}
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
        </button>

        <div className="studio-divider" />

        {/* Titanium Color Finishes */}
        <div className="studio-btn-group" title="Titanium Color Finish">
          <button
            className={`color-dot dot-gray${colorTheme === "gray" ? " active" : ""}`}
            onClick={() => setColorTheme("gray")}
            aria-label="Titanium Gray"
          />
          <button
            className={`color-dot dot-black${colorTheme === "black" ? " active" : ""}`}
            onClick={() => setColorTheme("black")}
            aria-label="Titanium Black"
          />
          <button
            className={`color-dot dot-silverblue${colorTheme === "silverblue" ? " active" : ""}`}
            onClick={() => setColorTheme("silverblue")}
            aria-label="Titanium Silverblue"
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
