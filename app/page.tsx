"use client";

import { useEffect, useRef, useState } from "react";
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

/* ---------- helpers ---------- */

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
    : "\u2009";

const fmtDate = (d: Date | null) =>
  d ? d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" }) : "\u2009";

/* ---------- status bar ---------- */

function StatusBar({ now }: { now: Date | null }) {
  return (
    <div className="status" aria-hidden="true">
      <span className="status-time">{fmtTime(now)}</span>
      <span className="status-icons">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="15" width="3.2" height="6" rx="1" />
          <rect x="8" y="11" width="3.2" height="10" rx="1" />
          <rect x="13" y="7" width="3.2" height="14" rx="1" />
          <rect x="18" y="3" width="3.2" height="18" rx="1" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M2.5 9a14 14 0 0119 0" />
          <path d="M5.8 12.6a9.4 9.4 0 0112.4 0" />
          <path d="M9 16.1a4.8 4.8 0 016 0" />
          <circle cx="12" cy="19.4" r="0.9" fill="currentColor" />
        </svg>
        <span className="battery">
          <i style={{ width: "82%" }} />
        </span>
        <span className="battery-pct">82%</span>
      </span>
    </div>
  );
}

/* ---------- home screen ---------- */

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

function Home({ now, onOpen }: { now: Date | null; onOpen: (app: AppDef, el: HTMLElement) => void }) {
  const grid = apps.filter((a) => !a.dock);
  const dock = apps.filter((a) => a.dock);

  return (
    <div className="home">
      <div className="widget">
        <div className="time">{fmtTime(now)}</div>
        <div className="date">{fmtDate(now)}</div>
        <div className="who">{profile.name}</div>
        <div className="role">{profile.role}</div>
        <div className="badge">
          <i /> {profile.status}
        </div>
      </div>

      <div className="grid">
        {grid.map((a) => (
          <AppIcon key={a.id} app={a} onOpen={onOpen} />
        ))}
      </div>

      <div className="dots" aria-hidden="true">
        <i className="on" />
        <i />
      </div>

      <div className="dock">
        {dock.map((a) => (
          <AppIcon key={a.id} app={a} onOpen={onOpen} showLabel={false} />
        ))}
      </div>
    </div>
  );
}

/* ---------- app window ---------- */

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
          {block.heading && <h2>{block.heading}</h2>}
          {block.links.map((l) => (
            <a className="row link" key={l.label} href={l.href} target="_blank" rel="noreferrer">
              <div className="t">{l.label}</div>
              {l.hint && <div className="m">{l.hint}</div>}
            </a>
          ))}
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

/* ---------- 3D phone stage ----------
   .scene provides perspective. .phone3d is the rotated cube: its
   transform is driven by --rx/--ry custom properties, written
   directly to the DOM node (not React state) while dragging, so
   dragging stays smooth. Faces are positioned with the standard
   CSS-cube recipe: translateZ(half the box's own size) then rotate. */

const REST_RX = 10;
const REST_RY = -22;
const MAX_RX = 26;

function PhoneStage({
  children,
}: {
  children: (screenRef: RefObject<HTMLDivElement | null>) => ReactNode;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const rot = useRef({ rx: REST_RX, ry: REST_RY });
  const drag = useRef({ active: false, x: 0, y: 0, vx: 0, moved: false });
  const raf = useRef<number | null>(null);
  const [hint, setHint] = useState(true);

  const apply = (snap: boolean) => {
    const el = phoneRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `${rot.current.rx}deg`);
    el.style.setProperty("--ry", `${rot.current.ry}deg`);
    el.classList.toggle("snap", snap);
  };

  useEffect(() => {
    apply(true);
  }, []);

  const stopInertia = () => {
    if (raf.current !== null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  };

  const runInertia = () => {
    const step = () => {
      drag.current.vx *= 0.94;
      rot.current.ry += drag.current.vx;
      apply(false);
      if (Math.abs(drag.current.vx) > 0.02) {
        raf.current = requestAnimationFrame(step);
      } else {
        raf.current = null;
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Let taps/scrolls on the live screen behave normally.
    if (screenRef.current?.contains(e.target as Node)) return;
    if (window.matchMedia("(max-width: 520px)").matches) return;

    stopInertia();
    drag.current = { active: true, x: e.clientX, y: e.clientY, vx: 0, moved: false };
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

    rot.current.ry += dx * 0.35;
    rot.current.rx = Math.max(-MAX_RX, Math.min(MAX_RX, rot.current.rx - dy * 0.28));
    drag.current.vx = dx * 0.35;
    apply(false);
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (Math.abs(drag.current.vx) > 0.5) runInertia();
  };

  const onDoubleClick = () => {
    stopInertia();
    drag.current.vx = 0;
    rot.current = { rx: REST_RX, ry: REST_RY };
    apply(true);
  };

  useEffect(() => stopInertia, []);

  return (
    <>
      <div
        className="scene"
        ref={sceneRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={onDoubleClick}
      >
        <div className="ground-shadow" aria-hidden="true" />
        <div className="phone3d snap" ref={phoneRef}>
          <div className="face front">{children(screenRef)}</div>

          <div className="face back">
            <div className="lens lens-tele">
              <i className="glass" />
            </div>
            <div className="lens lens-ultra">
              <i className="glass" />
            </div>
            <div className="lens lens-main">
              <i className="glass" />
            </div>
            <span className="laser" />
            <span className="flash" />
            <div className="brand">SAMSUNG</div>
          </div>

          <div className="edge edge-top">
            <i className="hole" />
          </div>
          <div className="edge edge-bottom">
            <i className="port" />
            <i className="grille" />
            <i className="grille" />
          </div>
          <div className="edge edge-left">
            <i className="tray" />
          </div>
          <div className="edge edge-right">
            <i className="key power" />
            <i className="key volume" />
          </div>
        </div>
      </div>
      <p className={`hint${hint ? "" : " hidden"}`}>Drag to rotate &middot; double-click to reset</p>
    </>
  );
}

/* ---------- page ---------- */

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") goHome();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <main className="stage">
      <PhoneStage>
        {(screenRef) => (
          <>
            <i className="hole-front" aria-hidden="true" />
            <div
              className="screen"
              ref={(node) => {
                screenRef.current = node;
                screenElRef.current = node;
              }}
            >
              <div className="ui">
                <div className="wallpaper" />
                <StatusBar now={now} />

                <Home now={now} onOpen={handleOpen} />

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

                <button className="navbar" onClick={goHome} aria-label="Home">
                  <span className="pill" />
                </button>
              </div>
            </div>
          </>
        )}
      </PhoneStage>
    </main>
  );
}
