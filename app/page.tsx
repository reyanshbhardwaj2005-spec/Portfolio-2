"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type {
  AnimationEvent,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  RefObject,
} from "react";
import { apps, profile, settingsProfile, initialPhotos } from "./data";
import type { AppDef, Block, PhotoItem } from "./data";
import { Icon } from "./icons";
import type { IconName } from "./icons";
import { GitHubAppView, useHorizontalScroll } from "./github-app";
import { YouTubeAppView } from "./youtube-app";

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
    /* ---- About: Custom Duo Avatar (Midnight Navy & Amber Orange) on clean white squircle ---- */
    case "about":
      return (
        <svg viewBox="0 0 60 60" className="app-svg" aria-hidden="true">
          <rect width="60" height="60" rx="14" fill="#ffffff" />
          <g transform="translate(6.5, 6.5) scale(0.091796875)">
            {/* Orange companion figure (cutout arc hugging the navy body) */}
            <circle cx="332" cy="175.5" r="47" fill="#FFA523" />
            <path
              fill="#FFA523"
              d="M 323 252 L 344 252 L 363 254 L 374 256 L 382 258 L 389 260 L 395 262 L 401 264 L 406 266 L 410 268 L 414 270 L 418 272 L 422 274 L 425 276 L 429 278 L 432 280 L 434 282 L 437 284 L 440 286 L 442 288 L 444 290 L 446 292 L 448 294 L 450 296 L 452 298 L 454 300 L 456 302 L 457 304 L 459 306 L 460 308 L 461 310 L 463 312 L 464 314 L 465 316 L 466 318 L 467 320 L 468 322 L 468 324 L 469 326 L 470 328 L 471 330 L 471 332 L 472 334 L 472 336 L 472 338 L 473 340 L 473 342 L 473 344 L 473 346 L 474 348 L 474 350 L 474 352 L 473 354 L 473 356 L 473 358 L 473 360 L 473 362 L 472 364 L 472 366 L 472 368 L 472 370 L 472 372 L 471 374 L 471 376 L 471 378 L 471 380 L 471 382 L 470 384 L 470 386 L 470 388 L 470 390 L 469 392 L 469 394 L 468 396 L 467 398 L 467 400 L 466 402 L 465 404 L 464 406 L 463 408 L 461 410 L 460 412 L 459 414 L 457 416 L 455 418 L 453 420 L 451 422 L 449 424 L 446 426 L 443 428 L 440 430 L 435 432 L 430 434 L 421 436 L 329 436 L 330 434 L 332 432 L 333 430 L 335 428 L 336 426 L 337 424 L 338 422 L 339 420 L 340 418 L 341 416 L 342 414 L 343 412 L 344 410 L 345 408 L 345 406 L 346 404 L 346 402 L 347 400 L 347 398 L 348 396 L 348 394 L 349 392 L 349 390 L 349 388 L 349 386 L 349 384 L 350 382 L 350 380 L 350 378 L 350 376 L 350 374 L 350 372 L 351 370 L 351 368 L 351 366 L 351 364 L 351 362 L 351 360 L 352 358 L 352 356 L 352 354 L 352 352 L 352 350 L 352 348 L 353 346 L 353 344 L 353 342 L 353 340 L 353 338 L 353 336 L 353 334 L 353 332 L 353 330 L 353 328 L 353 326 L 353 324 L 352 322 L 352 320 L 352 318 L 352 316 L 351 314 L 351 312 L 350 310 L 350 308 L 349 306 L 349 304 L 348 302 L 348 300 L 347 298 L 347 296 L 346 294 L 345 292 L 344 290 L 344 288 L 343 286 L 342 284 L 341 282 L 340 280 L 339 278 L 338 276 L 337 274 L 336 272 L 335 270 L 333 268 L 332 266 L 331 264 L 330 262 L 328 260 L 327 258 L 325 256 L 324 254 L 323 252 Z"
            />
            {/* Midnight Navy foreground figure */}
            <circle cx="178.5" cy="134" r="58" fill="#000034" />
            <path
              fill="#000034"
              d="M 168 220 L 190 220 L 207 222 L 217 224 L 225 226 L 231 228 L 237 230 L 242 232 L 247 234 L 251 236 L 255 238 L 258 240 L 262 242 L 265 244 L 268 246 L 271 248 L 274 250 L 276 252 L 279 254 L 281 256 L 283 258 L 286 260 L 288 262 L 290 264 L 291 266 L 293 268 L 295 270 L 297 272 L 298 274 L 300 276 L 301 278 L 302 280 L 304 282 L 305 284 L 306 286 L 307 288 L 308 290 L 310 292 L 310 294 L 311 296 L 312 298 L 313 300 L 314 302 L 315 304 L 315 306 L 316 308 L 317 310 L 317 312 L 318 314 L 318 316 L 318 318 L 319 320 L 319 322 L 319 324 L 320 326 L 320 328 L 320 330 L 320 332 L 320 334 L 320 336 L 320 338 L 320 340 L 320 342 L 320 344 L 320 346 L 319 348 L 319 350 L 319 352 L 319 354 L 319 356 L 319 358 L 318 360 L 318 362 L 318 364 L 318 366 L 318 368 L 318 370 L 317 372 L 317 374 L 317 376 L 317 378 L 317 380 L 317 382 L 316 384 L 316 386 L 316 388 L 315 390 L 315 392 L 314 394 L 314 396 L 313 398 L 312 400 L 312 402 L 311 404 L 310 406 L 308 408 L 307 410 L 306 412 L 304 414 L 303 416 L 301 418 L 299 420 L 297 422 L 295 424 L 292 426 L 289 428 L 285 430 L 281 432 L 276 434 L 267 436 L 90 436 L 82 434 L 76 432 L 72 430 L 69 428 L 66 426 L 63 424 L 61 422 L 58 420 L 57 418 L 55 416 L 53 414 L 52 412 L 50 410 L 49 408 L 48 406 L 47 404 L 46 402 L 45 400 L 44 398 L 44 396 L 43 394 L 43 392 L 42 390 L 42 388 L 41 386 L 41 384 L 41 382 L 41 380 L 41 378 L 41 376 L 40 374 L 40 372 L 40 370 L 40 368 L 40 366 L 40 364 L 39 362 L 39 360 L 39 358 L 39 356 L 39 354 L 38 352 L 38 350 L 38 348 L 38 346 L 38 344 L 38 342 L 38 340 L 37 338 L 37 336 L 37 334 L 37 332 L 38 330 L 38 328 L 38 326 L 38 324 L 38 322 L 39 320 L 39 318 L 40 316 L 40 314 L 40 312 L 41 310 L 42 308 L 42 306 L 43 304 L 44 302 L 44 300 L 45 298 L 46 296 L 47 294 L 48 292 L 49 290 L 50 288 L 51 286 L 53 284 L 54 282 L 55 280 L 56 278 L 58 276 L 59 274 L 61 272 L 63 270 L 64 268 L 66 266 L 68 264 L 70 262 L 72 260 L 74 258 L 77 256 L 79 254 L 81 252 L 84 250 L 87 248 L 90 246 L 93 244 L 96 242 L 99 240 L 103 238 L 107 236 L 111 234 L 116 232 L 121 230 L 127 228 L 133 226 L 141 224 L 150 222 L 168 220 Z"
            />
          </g>
          {/* High-res asset overlay */}
          <image
            href="/about-icon.png"
            x="6.5"
            y="6.5"
            width="47"
            height="47"
            preserveAspectRatio="xMidYMid meet"
          />
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
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen(githubApp, e.currentTarget);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Open GitHub Application"
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
              <span className="weather-city">Meerut</span>
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

function ElsewhereCard({ heading }: { heading?: string }) {
  return (
    <div className="settings-section elsewhere-section scroll-reveal-item">
      {heading && <span className="settings-section-title">{heading}</span>}
      <div className="settings-card settings-grouped-card">
        {/* LinkedIn */}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="settings-grouped-row scroll-reveal-child"
          style={{ "--child-idx": 0 } as CSSProperties}
        >
          <div className="settings-row-left">
            <div className="settings-icon-box settings-icon-linkedin">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 0-3.3 1.66 1.66 0 0 0 0 3.3m1.4 9.74V9.92H5.06v8.58h2.8z"/>
              </svg>
            </div>
            <span className="settings-row-label">LinkedIn</span>
          </div>
          <div className="settings-chevron">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </a>

        {/* X */}
        <a
          href={profile.x || "https://x.com/ReyanshB292"}
          target="_blank"
          rel="noreferrer"
          className="settings-grouped-row scroll-reveal-child"
          style={{ "--child-idx": 1 } as CSSProperties}
        >
          <div className="settings-row-left">
            <div className="settings-icon-box settings-icon-x">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <span className="settings-row-label">X</span>
          </div>
          <div className="settings-chevron">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </a>

        {/* GitHub */}
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="settings-grouped-row scroll-reveal-child"
          style={{ "--child-idx": 2 } as CSSProperties}
        >
          <div className="settings-row-left">
            <div className="settings-icon-box settings-icon-github">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <span className="settings-row-label">GitHub</span>
          </div>
          <div className="settings-chevron">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </a>

        {/* Email */}
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("open-portfolio-app", { detail: "mail" }));
          }}
          className="settings-grouped-row scroll-reveal-child"
          style={{ "--child-idx": 3 } as CSSProperties}
        >
          <div className="settings-row-left">
            <div className="settings-icon-box settings-icon-email">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <span className="settings-row-label">Email</span>
          </div>
          <div className="settings-chevron">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <div className="card scroll-reveal-item">
          <p className="body">{block.body}</p>
        </div>
      );
    case "items":
      return (
        <div className="card list scroll-reveal-item">
          {block.heading && <h2>{block.heading}</h2>}
          {block.items.map((it, i) => (
            <div className="row scroll-reveal-child" key={i} style={{ "--child-idx": i } as CSSProperties}>
              <div>
                <div className="t">{it.title}</div>
                {it.sub && <div className="s">{it.sub}</div>}
                {it.image && (
                  <div className="cert-preview-card">
                    <a href={it.image} target="_blank" rel="noreferrer" className="cert-preview-link" title="Click to view full certificate">
                      <img src={it.image} alt={it.title} className="cert-preview-thumb" loading="lazy" />
                      <div className="cert-preview-overlay">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h6v6" />
                          <path d="M10 14L21 3" />
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        </svg>
                        <span>View Full Certificate</span>
                      </div>
                    </a>
                  </div>
                )}
              </div>
              {it.meta && <div className="m">{it.meta}</div>}
            </div>
          ))}
        </div>
      );
    case "chips":
      return (
        <div className="card scroll-reveal-item">
          <h2>{block.heading}</h2>
          <div className="chips">
            {block.chips.map((c, i) => (
              <span className="chip scroll-reveal-chip" key={c} style={{ "--chip-idx": i } as CSSProperties}>
                {c}
              </span>
            ))}
          </div>
        </div>
      );
    case "links":
      return (
        <div className="card list scroll-reveal-item">
          {block.heading ? <h2>{block.heading}</h2> : null}
          {block.links.map((l, i) => (
            <a className="row link scroll-reveal-child" key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ "--child-idx": i } as CSSProperties}>
              <div className="t">{l.label}</div>
              {l.hint && <div className="m">{l.hint}</div>}
            </a>
          ))}
        </div>
      );
    case "spen-canvas":
      return (
        <div className="card scroll-reveal-item">
          {block.heading && <h2>{block.heading}</h2>}
          <SpenCanvas />
        </div>
      );
    case "elsewhere":
      return <ElsewhereCard heading={block.heading} />;
  }
}

/* ---------- Ultra-Smooth Kinetic Scroll & Entrance Reveal Engine ---------- */

function useSmoothAppScroll(options?: {
  onScroll?: (e: Event | React.UIEvent<HTMLDivElement>) => void;
  threshold?: number;
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
    const items = container.querySelectorAll<HTMLElement>(
      ".scroll-reveal-item, .card, .settings-section, .photos-timeline-group, .photos-grid-item, .photos-album-card"
    );

    const threshold = options?.threshold ?? 20;

    items.forEach((item) => {
      if (item.classList.contains("is-revealed")) return;

      const rect = item.getBoundingClientRect();
      const isEntering = rect.top <= containerRect.bottom + threshold && rect.bottom >= containerRect.top - threshold;

      if (isEntering) {
        item.classList.add("is-revealed");
      }
    });
  }, [options?.threshold]);

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
    }, 45);

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
        "button, a, input, canvas, .spen-canvas-box, .spen-draw-area, .spen-ink-dot, .settings-toggle-switch, .photos-reset-btn, .photos-filter-bar, .photos-chip, [data-horizontal-scroll]"
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

    // NOTE: Pointer capture is deferred until actual movement > 6px,
    // so clicks/taps on child items like photos and albums trigger cleanly!
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragData.current.active) return;
    const el = scrollRef.current;
    if (!el) return;

    const dx = e.clientX - dragData.current.startX;
    const dy = e.clientY - dragData.current.startY;
    const dist = Math.hypot(dx, dy);

    // Only initiate drag scroll if pointer moved beyond click threshold (6px)
    if (!dragData.current.moved) {
      if (dist < 6) {
        return;
      }
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

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragData.current.moved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return {
    scrollRef,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onClickCapture,
    },
    smoothScrollBy,
    checkReveals,
  };
}

function ScrollableAppBody({ children }: { children: ReactNode }) {
  const { scrollRef, pointerHandlers } = useSmoothAppScroll();

  return (
    <div
      className="app-body"
      ref={scrollRef}
      {...pointerHandlers}
    >
      {children}
    </div>
  );
}

function SettingsAppView({
  onBack,
  isDarkMode,
  onToggleDarkMode,
  onOpenAbout,
}: {
  onBack: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAbout?: () => void;
}) {
  const { scrollRef, pointerHandlers } = useSmoothAppScroll();

  return (
    <div className="settings-window-body" ref={scrollRef} {...pointerHandlers}>
      <div className="settings-app-view">
        {/* Upper Header: Circular Back Button on top with blue chevron, Title below */}
        <div className="settings-header scroll-reveal-item">
          <button className="settings-back-btn" onClick={onBack} aria-label="Back" title="Back">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="#007aff" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="settings-header-title">Settings</h1>
        </div>

        {/* Profile Card (Click to open About app) */}
        <button
          type="button"
          className="settings-card settings-profile-card scroll-reveal-item"
          onClick={() => {
            onOpenAbout?.();
          }}
          aria-label={`Open About ${settingsProfile.name}`}
        >
          <img
            src={settingsProfile.avatar}
            alt={settingsProfile.name}
            className="settings-profile-avatar"
          />
          <div className="settings-profile-info">
            <h2 className="settings-profile-name">{settingsProfile.name}</h2>
            <p className="settings-profile-sub">{settingsProfile.subtitle}</p>
          </div>
          <div className="settings-chevron">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>

        {/* APPEARANCE SECTION */}
        <div className="settings-section scroll-reveal-item">
          <span className="settings-section-title">APPEARANCE</span>
          <div className="settings-card settings-appearance-card">
            <div className="settings-row-left">
              <div className="settings-icon-box settings-icon-appearance">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </div>
              <span className="settings-row-label">Dark mode</span>
            </div>
            <button
              type="button"
              className={`settings-toggle-switch${isDarkMode ? " active" : ""}`}
              onClick={onToggleDarkMode}
              aria-label="Toggle dark mode"
              role="switch"
              aria-checked={isDarkMode}
            >
              <span className="settings-toggle-knob" />
            </button>
          </div>
        </div>

        {/* ELSEWHERE SECTION */}
        <ElsewhereCard heading="ELSEWHERE" />

        {/* ABOUT THIS SITE SECTION (Grouped card with 2 rows matching reference) */}
        <div className="settings-section scroll-reveal-item">
          <span className="settings-section-title">ABOUT THIS SITE</span>
          <div className="settings-card settings-grouped-card">
            {/* Row 1: Built with */}
            <div className="settings-grouped-row scroll-reveal-child" style={{ "--child-idx": 0 } as CSSProperties}>
              <div className="settings-row-left">
                <div className="settings-icon-box settings-icon-build">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                    <path d="M19.7 5.3l-2.4-2.4a1 1 0 0 0-1.4 0l-1.6 1.6 3.8 3.8 1.6-1.6a1 1 0 0 0 0-1.4zM4.3 19.7a1 1 0 0 0 1.4 1.4l9.9-9.9-1.4-1.4-9.9 9.9zM12.9 8.5l-1.4-1.4 2.1-2.1 1.4 1.4-2.1 2.1z"/>
                  </svg>
                </div>
                <div className="settings-about-site-text">
                  <div className="settings-about-site-title">Built with</div>
                  <div className="settings-about-site-sub">Next.js · React · Framer Motion</div>
                </div>
              </div>
            </div>

            {/* Row 2: Designed & built by */}
            <button
              type="button"
              className="settings-grouped-row scroll-reveal-child"
              style={{ "--child-idx": 1 } as CSSProperties}
              onClick={() => {
                onOpenAbout?.();
              }}
              aria-label={`Designed and built by ${settingsProfile.name}`}
            >
              <div className="settings-row-left">
                <div className="settings-icon-box settings-icon-creator">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="settings-about-site-text">
                  <div className="settings-about-site-title">Designed & built by</div>
                  <div className="settings-about-site-sub">{settingsProfile.name}</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutAppView({
  onBack,
  isDarkMode,
}: {
  onBack: () => void;
  isDarkMode: boolean;
}) {
  const { scrollRef, pointerHandlers } = useSmoothAppScroll();

  const aboutApp = apps.find((a) => a.id === "about");
  const expBlock = aboutApp?.blocks?.find(
    (b) => b.kind === "items" && b.heading === "Professional Experience"
  );
  const experienceItems = expBlock && expBlock.kind === "items" ? expBlock.items : [];

  return (
    <div className="settings-window-body about-window-body" ref={scrollRef} {...pointerHandlers}>
      <div className="settings-app-view about-app-view">
        {/* Upper Header: Circular Back Button with orange chevron, Large About Title, and Bio Text */}
        <div className="about-header scroll-reveal-item">
          <button
            className="settings-back-btn about-back-btn"
            onClick={onBack}
            aria-label="Back"
            title="Back"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="#ff6b35"
              strokeWidth="2.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="about-title">About</h1>
          <p className="about-bio">
            I build software, chase half marathons, and answer to two cats named Gin & Tonic.
          </p>
        </div>

        {/* PROFESSIONAL EXPERIENCE SECTION */}
        {experienceItems.length > 0 && (
          <div className="settings-section scroll-reveal-item">
            <span className="settings-section-title">PROFESSIONAL EXPERIENCE</span>
            <div className="settings-card settings-grouped-card">
              {experienceItems.map((item, idx) => (
                <div key={idx} className="settings-grouped-row about-exp-row scroll-reveal-child" style={{ "--child-idx": idx } as CSSProperties}>
                  <div className="about-exp-info">
                    <div className="about-exp-title-row">
                      <span className="about-exp-role">{item.title}</span>
                      {item.meta && <span className="about-exp-meta">{item.meta}</span>}
                    </div>
                    {item.sub && <p className="about-exp-desc">{item.sub}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ELSEWHERE SECTION */}
        <ElsewhereCard heading="ELSEWHERE" />
      </div>
    </div>
  );
}

function ResumeAppView({
  onBack,
  isDarkMode,
}: {
  onBack: () => void;
  isDarkMode: boolean;
}) {
  const { scrollRef, pointerHandlers } = useSmoothAppScroll();
  const [downloadToast, setDownloadToast] = useState(false);
  const filesApp = apps.find((a) => a.id === "files");

  const handleDownload = () => {
    setDownloadToast(true);
    setTimeout(() => {
      setDownloadToast(false);
    }, 2800);
  };

  return (
    <div className="settings-window-body resume-window-body" ref={scrollRef} {...pointerHandlers}>
      <div className="settings-app-view resume-app-view">
        {/* Upper Header: Circular Back (orange chevron) on left, Circular Download (orange icon) on right, Large Resume Title, and Name/Subtitle */}
        <div className="resume-header scroll-reveal-item">
          <div className="resume-top-actions">
            <button
              className="settings-back-btn resume-circle-btn"
              onClick={onBack}
              aria-label="Back"
              title="Back"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="#ff6433"
                strokeWidth="2.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <a
              href="/resume.pdf"
              download="Reyansh_Bhardwaj_Resume.pdf"
              className="settings-back-btn resume-circle-btn"
              onClick={handleDownload}
              aria-label="Download Resume"
              title="Download Resume"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="#ff6433"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>

          <h1 className="resume-main-title">Resume</h1>

          <div className="resume-author-info">
            <span className="resume-author-name">{profile.name}</span>
            <span className="resume-author-sub">{settingsProfile.subtitle}</span>
          </div>
        </div>

        {/* Content Blocks (Education, Technical Skills, Core Tech, Certifications, Links) */}
        <div className="resume-blocks">
          {filesApp?.blocks?.map((b, i) => (
            <BlockView block={b} key={i} />
          ))}
        </div>

        {/* Bottom Button to Download Resume */}
        <div className="resume-bottom-action scroll-reveal-item">
          <a
            href="/resume.pdf"
            download="Reyansh_Bhardwaj_Resume.pdf"
            className="resume-bottom-download-btn"
            onClick={handleDownload}
          >
            <span className="resume-btn-icon-wrap">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
            <span className="resume-btn-label">Download Resume</span>
            <span className="resume-btn-badge">PDF</span>
          </a>
        </div>
      </div>

      {/* Floating Download Toast */}
      {downloadToast && (
        <div className="resume-toast" role="status">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Downloading Reyansh_Bhardwaj_Resume.pdf</span>
        </div>
      )}
    </div>
  );
}

function GooglePhotosIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} aria-hidden="true">
      <path d="M30 11c-5 0-9 4-9 9h9V11z" fill="#EA4335" />
      <path d="M30 20h9c0-5-4-9-9-9v9z" fill="#EA4335" />
      <path d="M39 30c0-5 4-9 9-9v9H39z" fill="#34A853" />
      <path d="M39 30v9c5 0 9-4 9-9h-9z" fill="#34A853" />
      <path d="M30 39c5 0 9-4 9-9h-9v9z" fill="#4285F4" />
      <path d="M30 39h-9c0 5 4 9 9 9v-9z" fill="#4285F4" />
      <path d="M21 30c0 5-4 9-9 9v-9h9z" fill="#FBBC04" />
      <path d="M21 30v-9c-5 0-9 4-9 9h9z" fill="#FBBC04" />
    </svg>
  );
}

function PhotosAppView({
  onBack,
  isDarkMode,
}: {
  onBack: () => void;
  isDarkMode: boolean;
}) {
  const [photosList, setPhotosList] = useState<PhotoItem[]>(initialPhotos);
  const [activeTab, setActiveTab] = useState<"photos" | "albums" | "favorites" | "search">("photos");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isClosingLightbox, setIsClosingLightbox] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | "none">("none");
  const [heartAnim, setHeartAnim] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement> | Event) => {
    const target = (e as any).currentTarget || (e as any).target;
    if (!target) return;
    const top = target.scrollTop;
    if (top > 8 && !isScrolled) setIsScrolled(true);
    else if (top <= 8 && isScrolled) setIsScrolled(false);
  };

  const { scrollRef, pointerHandlers, checkReveals } = useSmoothAppScroll({
    onScroll: handleScroll,
  });

  const photosFilterRef = useHorizontalScroll<HTMLDivElement>();

  useEffect(() => {
    const timer = setTimeout(() => {
      checkReveals();
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab, activeCategory, searchQuery, checkReveals]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 550);
    setPhotosList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = !p.favorite;
          showToast(updated ? "Added to Favorites ⭐" : "Removed from Favorites");
          return { ...p, favorite: updated };
        }
        return p;
      })
    );
  };

  // Close photo lightbox with smooth exit animation
  const closePhoto = useCallback(() => {
    if (activePhotoIndex === null || isClosingLightbox) return;
    setIsClosingLightbox(true);
    setShowInfo(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActivePhotoIndex(null);
      setIsClosingLightbox(false);
      setSlideDirection("none");
    }, 260);
  }, [activePhotoIndex, isClosingLightbox]);

  // Cleanup pending close timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Filter photos based on category, tab, and search query
  const filteredPhotos = photosList.filter((p) => {
    if (activeTab === "favorites" && !p.favorite) return false;
    if (activeCategory === "favorites" && !p.favorite) return false;
    if (activeCategory === "cats" && p.album !== "Gin & Tonic 🐱") return false;
    if (activeCategory === "running" && p.album !== "Running & Races") return false;
    if (activeCategory === "workspaces" && p.album !== "Workspaces") return false;
    if (activeCategory === "architecture" && p.album !== "Architecture") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.album.toLowerCase().includes(q) ||
        p.group.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Group photos into timeline sections (Google Photos style)
  const groupsOrder = ["Today", "Yesterday", "October 2026", "September 2026"];
  const groupedPhotos: { group: string; items: PhotoItem[] }[] = [];
  groupsOrder.forEach((grp) => {
    const items = filteredPhotos.filter((p) => p.group === grp);
    if (items.length > 0) {
      groupedPhotos.push({ group: grp, items });
    }
  });
  const otherItems = filteredPhotos.filter((p) => !groupsOrder.includes(p.group));
  if (otherItems.length > 0) {
    groupedPhotos.push({ group: "Earlier", items: otherItems });
  }

  // Active photo for full-screen viewer
  const currentPhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isClosingLightbox) return;
    setSlideDirection("next");
    if (activePhotoIndex !== null && activePhotoIndex < filteredPhotos.length - 1) {
      setActivePhotoIndex(activePhotoIndex + 1);
    } else {
      setActivePhotoIndex(0);
    }
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isClosingLightbox) return;
    setSlideDirection("prev");
    if (activePhotoIndex !== null && activePhotoIndex > 0) {
      setActivePhotoIndex(activePhotoIndex - 1);
    } else {
      setActivePhotoIndex(filteredPhotos.length - 1);
    }
  };

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        e.stopImmediatePropagation();
        closePhoto();
      } else if (!isClosingLightbox) {
        if (e.key === "ArrowRight") {
          setActivePhotoIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
        } else if (e.key === "ArrowLeft") {
          setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [activePhotoIndex, filteredPhotos.length, closePhoto, isClosingLightbox]);

  // Albums collection
  const albums = [
    {
      name: "Camera",
      count: photosList.filter((p) => p.album === "Camera" || p.album === "Workspaces").length,
      cover: photosList.find((p) => p.album === "Workspaces")?.url || photosList[0]?.url,
      categoryKey: "all",
    },
    {
      name: "Gin & Tonic 🐱",
      count: photosList.filter((p) => p.album === "Gin & Tonic 🐱").length,
      cover: photosList.find((p) => p.album === "Gin & Tonic 🐱")?.url || photosList[1]?.url,
      categoryKey: "cats",
    },
    {
      name: "Running & Races 🏃",
      count: photosList.filter((p) => p.album === "Running & Races").length,
      cover: photosList.find((p) => p.album === "Running & Races")?.url || photosList[2]?.url,
      categoryKey: "running",
    },
    {
      name: "Workspaces & Code 💻",
      count: photosList.filter((p) => p.album === "Workspaces").length,
      cover: photosList.find((p) => p.album === "Workspaces")?.url || photosList[4]?.url,
      categoryKey: "workspaces",
    },
    {
      name: "Architecture & Travel 🏙️",
      count: photosList.filter((p) => p.album === "Architecture").length,
      cover: photosList.find((p) => p.album === "Architecture")?.url || photosList[5]?.url,
      categoryKey: "architecture",
    },
    {
      name: "Favorites ⭐",
      count: photosList.filter((p) => p.favorite).length,
      cover: photosList.find((p) => p.favorite)?.url || photosList[0]?.url,
      categoryKey: "favorites",
    },
  ];

  return (
    <div className="photos-app-container">
      {/* Top Header: Circular Back Button with blue chevron and Large Title below */}
      <div className="photos-header">
        <button
          className="settings-back-btn"
          onClick={onBack}
          aria-label="Back to Home"
          title="Back to Home"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="photos-header-title">Photos</h1>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="photos-filter-bar" ref={photosFilterRef} data-horizontal-scroll="true">
        {[
          { key: "all", label: "All Photos" },
          { key: "favorites", label: "⭐ Favorites" },
          { key: "cats", label: "🐱 Gin & Tonic" },
          { key: "running", label: "🏃 Running" },
          { key: "workspaces", label: "💻 Workspaces" },
          { key: "architecture", label: "🏙️ Architecture" },
        ].map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={`photos-chip${activeCategory === cat.key ? " active" : ""}`}
            onClick={() => {
              setActiveCategory(cat.key);
              if (activeTab === "albums") setActiveTab("photos");
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Scrollable Photos Body */}
      <div className="photos-scroll-content" ref={scrollRef} {...pointerHandlers} onScroll={handleScroll}>
        {activeTab === "albums" ? (
          /* Albums Tab View */
          <div className="photos-albums-view photos-view-enter" key="albums-view">
            <h2 className="photos-albums-heading scroll-reveal-item">Albums</h2>
            <div className="photos-albums-grid">
              {albums.map((alb, idx) => (
                <div
                  key={alb.name}
                  className="photos-album-card scroll-reveal-item"
                  style={{ "--album-idx": idx % 2 } as CSSProperties}
                  onClick={() => {
                    setActiveCategory(alb.categoryKey);
                    setActiveTab("photos");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveCategory(alb.categoryKey);
                      setActiveTab("photos");
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="photos-album-cover-wrap">
                    <img src={alb.cover} alt={alb.name} className="photos-album-cover" loading="lazy" draggable={false} />
                  </div>
                  <div className="photos-album-meta">
                    <span className="photos-album-title">{alb.name}</span>
                    <span className="photos-album-count">{alb.count} photos</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Timeline Photos Grid View */
          <div className="photos-timeline-wrap photos-view-enter" key={`grid-${activeCategory}`}>
            {filteredPhotos.length === 0 ? (
              <div className="photos-empty-state">
                <div className="photos-empty-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="8" y1="15" x2="16" y2="15" />
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
                  </svg>
                </div>
                <h3>No photos found</h3>
                <p>Try searching for cats, marathons, workspaces, or clear your filters.</p>
                <button
                  type="button"
                  className="photos-reset-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    setActiveTab("photos");
                  }}
                >
                  Show All Photos
                </button>
              </div>
            ) : (
              groupedPhotos.map((grp) => (
                <div key={grp.group} className="photos-timeline-group scroll-reveal-item">
                  <div className="photos-group-header">
                    <span className="photos-group-title">{grp.group}</span>
                    <span className="photos-group-meta">
                      {grp.items[0]?.location || "Captured"} • {grp.items.length} items
                    </span>
                  </div>

                  <div className="photos-grid">
                    {grp.items.map((photo, pIdx) => {
                      const globalIdx = filteredPhotos.findIndex((p) => p.id === photo.id);
                      return (
                        <div
                          key={photo.id}
                          className="photos-grid-item scroll-reveal-item"
                          style={{ "--photo-idx": pIdx % 3 } as CSSProperties}
                          onClick={() => {
                            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
                            setIsClosingLightbox(false);
                            setActivePhotoIndex(globalIdx >= 0 ? globalIdx : 0);
                            setShowInfo(false);
                            setSlideDirection("none");
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
                              setIsClosingLightbox(false);
                              setActivePhotoIndex(globalIdx >= 0 ? globalIdx : 0);
                              setShowInfo(false);
                              setSlideDirection("none");
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={photo.title}
                        >
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="photos-grid-thumb"
                            loading="lazy"
                            draggable={false}
                          />
                          {photo.favorite && (
                            <span className="photos-fav-star" aria-label="Favorite">
                              ★
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Android Google Photos Style Bottom Navigation Bar */}
      <div className="photos-bottom-nav">
        <button
          className={`photos-nav-tab${activeTab === "photos" ? " active" : ""}`}
          onClick={() => setActiveTab("photos")}
          type="button"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Photos</span>
        </button>

        <button
          className={`photos-nav-tab${activeTab === "albums" ? " active" : ""}`}
          onClick={() => setActiveTab("albums")}
          type="button"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <span>Albums</span>
        </button>

        <button
          className={`photos-nav-tab${activeTab === "favorites" ? " active" : ""}`}
          onClick={() => {
            setActiveTab("favorites");
            setActiveCategory("favorites");
          }}
          type="button"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill={activeTab === "favorites" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>Favorites</span>
        </button>

        <button
          className={`photos-nav-tab${activeTab === "search" ? " active" : ""}`}
          onClick={() => {
            setActiveTab("photos");
            const input = document.querySelector(".photos-search-input") as HTMLInputElement | null;
            input?.focus();
          }}
          type="button"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Search</span>
        </button>
      </div>

      {/* Full-Screen Android Lightbox / Photo Viewer */}
      {currentPhoto && (
        <div
          className={`photos-lightbox${isClosingLightbox ? " closing" : " opening"}`}
          role="dialog"
          aria-label={currentPhoto.title}
        >
          {/* Top Control Bar */}
          <div className="photos-lightbox-top">
            <button
              className="photos-lightbox-btn"
              onClick={closePhoto}
              aria-label="Close photo viewer"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="white" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="photos-lightbox-date">
              <span>{currentPhoto.date}</span>
              <span className="photos-lightbox-time">{currentPhoto.time || "12:00 PM"}</span>
            </div>

            <div className="photos-lightbox-top-actions">
              <button
                className={`photos-lightbox-btn${currentPhoto.favorite ? " active-fav" : ""}${heartAnim ? " heart-popping" : ""}`}
                onClick={(e) => toggleFavorite(currentPhoto.id, e)}
                aria-label="Toggle Favorite"
                title="Toggle Favorite"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill={currentPhoto.favorite ? "#ff3b30" : "none"} stroke={currentPhoto.favorite ? "#ff3b30" : "white"} strokeWidth="2.2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              <button
                className={`photos-lightbox-btn${showInfo ? " active" : ""}`}
                onClick={() => setShowInfo(!showInfo)}
                aria-label="Photo Details"
                title="Photo Details"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2.2" fill="none">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="3" />
                </svg>
              </button>

              <button
                className="photos-lightbox-btn"
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(currentPhoto.url);
                    showToast("Photo link copied! 📋");
                  } catch {
                    showToast("Share: " + currentPhoto.title);
                  }
                }}
                aria-label="Share photo"
                title="Share"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
            </div>
          </div>

          {/* Center Stage with Current Photo and Navigation Arrows */}
          <div
            className="photos-lightbox-stage"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closePhoto();
              }
            }}
          >
            <button
              className="photos-nav-arrow photos-arrow-prev"
              onClick={handlePrevPhoto}
              aria-label="Previous photo"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div
              className="photos-lightbox-img-wrap"
              key={`${currentPhoto.id}-${slideDirection}`}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title}
                className={`photos-lightbox-img slide-${slideDirection}`}
              />
            </div>

            <button
              className="photos-nav-arrow photos-arrow-next"
              onClick={handleNextPhoto}
              aria-label="Next photo"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Counter Pill */}
            <div className="photos-counter-pill">
              {activePhotoIndex! + 1} / {filteredPhotos.length}
            </div>
          </div>

          {/* Bottom Toolbar (Google Photos 4-icon action bar) */}
          <div className="photos-lightbox-bottom">
            <button
              type="button"
              className="photos-action-btn"
              onClick={() => {
                try {
                  navigator.clipboard.writeText(currentPhoto.url);
                  showToast("Photo link copied! 📋");
                } catch {
                  showToast("Sharing photo...");
                }
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span>Share</span>
            </button>

            <button
              type="button"
              className="photos-action-btn"
              onClick={() => showToast("Filters ready for your custom photos 🎨")}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              <span>Edit</span>
            </button>

            <button
              type="button"
              className={`photos-action-btn${showInfo ? " active" : ""}`}
              onClick={() => setShowInfo(!showInfo)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2.5" />
              </svg>
              <span>Details</span>
            </button>

            <button
              type="button"
              className="photos-action-btn"
              onClick={(e) => toggleFavorite(currentPhoto.id, e)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill={currentPhoto.favorite ? "#ff3b30" : "none"} stroke={currentPhoto.favorite ? "#ff3b30" : "white"} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>Favorite</span>
            </button>
          </div>

          {/* EXIF Info Drawer (Slide Up Sheet) */}
          {showInfo && (
            <div className="photos-info-drawer">
              <div className="photos-info-handle" onClick={() => setShowInfo(false)} />
              <div className="photos-info-header">
                <h3>Details</h3>
                <button
                  type="button"
                  className="photos-info-close"
                  onClick={() => setShowInfo(false)}
                >
                  ✕
                </button>
              </div>

              <div className="photos-info-title-block">
                <h4>{currentPhoto.title}</h4>
                <p className="photos-info-sub">{currentPhoto.location}</p>
              </div>

              <div className="photos-info-meta-list">
                <div className="photos-info-meta-row">
                  <div className="photos-meta-icon">📅</div>
                  <div className="photos-meta-text">
                    <span className="photos-meta-label">Date & Time</span>
                    <span className="photos-meta-val">{currentPhoto.date} • {currentPhoto.time || "12:00 PM"}</span>
                  </div>
                </div>

                <div className="photos-info-meta-row">
                  <div className="photos-meta-icon">📱</div>
                  <div className="photos-meta-text">
                    <span className="photos-meta-label">Device</span>
                    <span className="photos-meta-val">{currentPhoto.exif?.camera || "Samsung Galaxy S26 Ultra"}</span>
                  </div>
                </div>

                <div className="photos-info-meta-row">
                  <div className="photos-meta-icon">📸</div>
                  <div className="photos-meta-text">
                    <span className="photos-meta-label">Lens & Optics</span>
                    <span className="photos-meta-val">{currentPhoto.exif?.lens || "24mm f/1.7 200MP Main Wide"}</span>
                  </div>
                </div>

                <div className="photos-info-meta-row">
                  <div className="photos-meta-icon">⚙️</div>
                  <div className="photos-meta-text">
                    <span className="photos-meta-label">EXIF Exposure</span>
                    <span className="photos-meta-val">{currentPhoto.exif?.settings || "ISO 50 • 1/250s"}</span>
                  </div>
                </div>

                <div className="photos-info-meta-row">
                  <div className="photos-meta-icon">📁</div>
                  <div className="photos-meta-text">
                    <span className="photos-meta-label">Resolution & Size</span>
                    <span className="photos-meta-val">{currentPhoto.exif?.resolution || "12.0 MP (3000 x 4000)"} • {currentPhoto.exif?.size || "4.8 MB"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="photos-toast" role="status">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

/* ---------- Direct Mail / "New Message" App View ---------- */

function MailAppView({
  onBack,
  isDarkMode,
}: {
  onBack: () => void;
  isDarkMode: boolean;
}) {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { scrollRef, pointerHandlers, checkReveals } = useSmoothAppScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      checkReveals();
    }, 60);
    return () => clearTimeout(timer);
  }, [checkReveals]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isSending || isSent) return;

    if (!senderName.trim()) {
      showToast("Please enter your name");
      return;
    }
    if (!senderEmail.trim() || !senderEmail.includes("@")) {
      showToast("Please enter a valid email address");
      return;
    }
    if (!message.trim()) {
      showToast("Please write your message");
      return;
    }

    setIsSending(true);

    try {
      // Secure server-side dispatch: email address is never exposed to client
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: senderName.trim(),
          email: senderEmail.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success || res.ok) {
        setIsSending(false);
        setIsSent(true);
        showToast("✓ Message delivered successfully!");
        setTimeout(() => {
          setIsSent(false);
          setSenderName("");
          setSenderEmail("");
          setMessage("");
        }, 4000);
      } else {
        throw new Error(data.error || "Failed to send");
      }
    } catch (err) {
      console.error("Message send error:", err);
      setIsSending(false);
      showToast("Message could not be sent. Please try again.");
    }
  };

  return (
    <div className="mail-app-container" ref={scrollRef} {...pointerHandlers}>
      <div className="mail-app-content">
        {/* Top Left: Circular Back Button with Coral Arrow */}
        <div className="mail-header-row scroll-reveal-item">
          <button
            type="button"
            className="mail-back-btn"
            onClick={onBack}
            aria-label="Back"
            title="Back"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="#e06843"
              strokeWidth="2.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* Large "New Message" Bold Heading */}
        <h1 className="mail-title scroll-reveal-item">New Message</h1>

        <form onSubmit={handleSend} className="mail-form" noValidate>
          {/* Top Rounded Card: To / Name / Email */}
          <div className="mail-card mail-details-card scroll-reveal-item">
            {/* Row 1: To */}
            <div className="mail-row">
              <span className="mail-row-label">To</span>
              <span className="mail-recipient-name">{profile.name}</span>
            </div>

            {/* Row 2: Name */}
            <div className="mail-row">
              <label htmlFor="mail-name-input" className="mail-row-label">Name</label>
              <input
                id="mail-name-input"
                type="text"
                className="mail-row-input"
                placeholder="Your name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                autoComplete="name"
              />
            </div>

            {/* Row 3: Email */}
            <div className="mail-row mail-row-last">
              <label htmlFor="mail-email-input" className="mail-row-label">Email</label>
              <input
                id="mail-email-input"
                type="email"
                className="mail-row-input"
                placeholder="Your email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Message Textarea Card */}
          <div className="mail-card mail-message-card scroll-reveal-item">
            <textarea
              className="mail-textarea"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={7}
              aria-label="Write your message"
            />
          </div>

          {/* Bottom Send Pill Button */}
          <div className="mail-action-wrap scroll-reveal-item">
            <button
              type="submit"
              className={`mail-send-btn${isSending ? " sending" : ""}${isSent ? " sent" : ""}`}
              disabled={isSending}
              aria-label="Send message"
            >
              {isSending ? (
                <span className="mail-send-loading">
                  <span className="mail-spinner" />
                  Sending...
                </span>
              ) : isSent ? (
                <span className="mail-send-success">Message Sent! ✓</span>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="mail-toast" role="status">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

function AppWindow({
  app,
  origin,
  closing,
  onBack,
  onClosed,
  isDarkMode = false,
  onToggleDarkMode = () => {},
  onOpenApp,
}: {
  app: AppDef;
  origin: { x: string; y: string };
  closing: boolean;
  onBack: () => void;
  onClosed: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onOpenApp?: (appId: string) => void;
}) {
  const windowRef = useRef<HTMLElement | null>(null);
  const [opened, setOpened] = useState(false);

  // Wheel listener on the window wrapper so spinning wheel over header/margins also scrolls the app smoothly
  useEffect(() => {
    const win = windowRef.current;
    if (!win) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const scrollEl = (win.querySelector(".settings-window-body") ||
        win.querySelector(".photos-scroll-content") ||
        win.querySelector(".mail-app-container") ||
        win.querySelector(".github-scroll-body") ||
        win.querySelector(".yt-main-scrollable") ||
        win.querySelector(".app-body")) as any;
      if (!scrollEl) return;

      // If target is inside scrollEl, scrollEl already handles its own scroll events
      if (!scrollEl.contains(e.target as Node)) {
        if (typeof scrollEl.__smoothScrollBy === "function") {
          scrollEl.__smoothScrollBy(e.deltaY);
        } else {
          scrollEl.scrollBy({ top: e.deltaY, behavior: "smooth" });
        }
      }
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
      className={`app-window${closing ? " closing" : ""}${opened && !closing ? " opened" : ""}${app.id === "settings" || app.id === "about" || app.id === "files" ? " is-settings-app is-about-app is-resume-app" : ""}${app.id === "photos" ? " is-photos-app" : ""}${app.id === "mail" ? " is-mail-app" : ""}${app.id === "github" ? " is-github-app" : ""}${app.id === "tv" ? " is-youtube-app" : ""}`}
      style={{ "--ox": origin.x, "--oy": origin.y } as CSSProperties}
      onAnimationEnd={handleEnd}
      role="dialog"
      aria-label={app.title ?? app.label}
    >
      {app.id === "settings" ? (
        <SettingsAppView
          onBack={onBack}
          isDarkMode={isDarkMode}
          onToggleDarkMode={onToggleDarkMode}
          onOpenAbout={() => onOpenApp?.("about")}
        />
      ) : app.id === "about" ? (
        <AboutAppView
          onBack={onBack}
          isDarkMode={isDarkMode}
        />
      ) : app.id === "photos" ? (
        <PhotosAppView
          onBack={onBack}
          isDarkMode={isDarkMode}
        />
      ) : app.id === "mail" ? (
        <MailAppView
          onBack={onBack}
          isDarkMode={isDarkMode}
        />
      ) : app.id === "github" ? (
        <GitHubAppView
          onBack={onBack}
          isDarkMode={isDarkMode}
          onOpenApp={onOpenApp}
        />
      ) : app.id === "files" ? (
        <ResumeAppView
          onBack={onBack}
          isDarkMode={isDarkMode}
        />
      ) : app.id === "tv" ? (
        <YouTubeAppView
          onBack={onBack}
          isDarkMode={isDarkMode}
        />
      ) : (
        <>
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
        </>
      )}
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
                const scrollEl = (screenRef.current?.querySelector(".settings-window-body") ||
                  screenRef.current?.querySelector(".photos-scroll-content") ||
                  screenRef.current?.querySelector(".mail-app-container") ||
                  screenRef.current?.querySelector(".github-scroll-body") ||
                  screenRef.current?.querySelector(".app-body")) as any;
                if (scrollEl && !scrollEl.contains(e.target as Node)) {
                  if (typeof scrollEl.__smoothScrollBy === "function") {
                    scrollEl.__smoothScrollBy(e.deltaY);
                  } else {
                    scrollEl.scrollBy({ top: e.deltaY, behavior: "smooth" });
                  }
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [prevAppId, setPrevAppId] = useState<string | null>(null);
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
    setPrevAppId(null);
    setClosing(false);
    setOpenId(app.id);
  };

  const goHome = () => {
    setPrevAppId(null);
    if (openId && !closing) setClosing(true);
  };

  const handleAppBack = () => {
    if (prevAppId) {
      setOrigin({ x: "50%", y: "22%" });
      setClosing(false);
      setOpenId(prevAppId);
      setPrevAppId(null);
    } else {
      goHome();
    }
  };

  const handleOpenSpenNotes = () => {
    const spenApp = apps.find((a) => a.id === "spen-notes");
    if (spenApp) {
      setPrevAppId(null);
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

  useEffect(() => {
    const handlePortfolioAppOpen = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const targetId = customEvent.detail;
      if (targetId) {
        setPrevAppId(openId);
        setOrigin({ x: "50%", y: "50%" });
        setClosing(false);
        setOpenId(targetId);
      }
    };
    window.addEventListener("open-portfolio-app", handlePortfolioAppOpen);
    return () => window.removeEventListener("open-portfolio-app", handlePortfolioAppOpen);
  }, [openId]);

  return (
    <main className="stage">
      <PhoneStage onOpenSpen={handleOpenSpenNotes} isAppOpen={Boolean(openId)}>
        <div
          className={`ui${openId ? " has-open-app" : ""}${closing ? " app-closing" : ""}${isDarkMode ? " dark-theme-active" : ""}`}
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
              key={openApp.id}
              app={openApp}
              origin={origin}
              closing={closing}
              onBack={handleAppBack}
              onClosed={() => {
                setOpenId(null);
                setClosing(false);
                setPrevAppId(null);
              }}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
              onOpenApp={(appId) => {
                setPrevAppId(openId);
                setOrigin({ x: "50%", y: "22%" });
                setClosing(false);
                setOpenId(appId);
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
