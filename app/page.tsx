"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BatteryFull,
  Camera,
  Check,
  ChevronRight,
  Code2,
  Github,
  Globe2,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Music2,
  Play,
  Search,
  Send,
  Settings,
  Sparkles,
  Sun,
  UserRound,
  Wifi,
  X,
  Zap,
} from "lucide-react";

type AppName = "about" | "work" | "camera" | "music" | "contact" | "settings" | "github" | "resume";

const apps: { id: AppName; label: string; icon: typeof UserRound; color: string }[] = [
  { id: "about", label: "About", icon: UserRound, color: "about" },
  { id: "work", label: "My work", icon: Code2, color: "work" },
  { id: "camera", label: "Photos", icon: Camera, color: "photos" },
  { id: "music", label: "Music", icon: Music2, color: "music" },
  { id: "contact", label: "Contact", icon: MessageCircle, color: "contact" },
  { id: "settings", label: "Settings", icon: Settings, color: "settings" },
];

function AndroidLauncherIcon({ app }: { app: AppName }) {
  if (app === "about") return <svg className="launcher-logo" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="16" r="7" fill="#fff" /><path fill="#fff" d="M11 39c.8-8.3 5.2-12.5 13-12.5S36.2 30.7 37 39H11Z" /></svg>;
  if (app === "work") return <svg className="launcher-logo" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17" fill="none" stroke="#fff" strokeWidth="2.5" /><path fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2.5" d="M7 24h34M24 7c5 4.7 7.5 10.3 7.5 17S29 36.3 24 41c-5-4.7-7.5-10.3-7.5-17S19 11.7 24 7ZM10 15h28M10 33h28" /></svg>;
  if (app === "camera") return <img className="launcher-logo photos-image-logo" src="/photos-app-icon.png" alt="" />;
  if (app === "music") return <svg className="launcher-logo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#fff" d="M18 10h18v22.5a6.5 6.5 0 1 1-3-5.4V16H22v20.5a6.5 6.5 0 1 1-4-5.9V10Z" /><circle cx="14.5" cy="36.5" r="3.5" fill="#803cff" /><circle cx="29.5" cy="35.5" r="3.5" fill="#803cff" /></svg>;
  if (app === "contact") return <svg className="launcher-logo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#fff" d="M8 11h32v23H20l-8 6v-6H8V11Z" /><path fill="#4385f4" d="M15 19h18v3H15zm0 6h12v3H15z" /></svg>;
  return <svg className="launcher-logo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#fff" d="m39.5 27.2-4-2.3c.1-.6.1-1.3 0-1.9l4-2.3-3.2-5.5-4.5 1.7c-.5-.4-1.1-.7-1.7-1L29.5 11h-6.4l-.7 4.9c-.6.3-1.2.6-1.7 1l-4.5-1.7L13 20.7l4 2.3a12 12 0 0 0 0 1.9l-4 2.3 3.2 5.5 4.5-1.7c.5.4 1.1.7 1.7 1l.7 4.9h6.4l.7-4.9c.6-.3 1.2-.6 1.7-1l4.5 1.7 3.2-5.5Z" /><circle cx="26.3" cy="24" r="5" fill="#687080" /></svg>;
}

const projects = [
  ["Pulse Finance", "Fintech · Android", "A calmer way to understand your money, built for 4M+ moments."],
  ["Wanderly", "Travel · Android", "Tiny trips, beautifully planned. An offline-first companion for curious people."],
  ["Loop Health", "Wellness · Android", "Making everyday movement feel like a game worth returning to."],
];

function AppWindow({ app, close }: { app: AppName; close: () => void }) {
  const content = {
    about: { title: "About Arjun", icon: UserRound, body: <><p className="window-lede">I&apos;m Arjun — an Android engineer who likes turning complex systems into calm, delightful experiences.</p><p>Currently crafting mobile products in Bengaluru. When I&apos;m not in Android Studio, you&apos;ll find me collecting typefaces, making coffee, or walking a long way home.</p><div className="stats"><b>06 <small>years building</small></b><b>18 <small>apps shipped</small></b><b>∞ <small>curiosity</small></b></div></> },
    work: { title: "My work", icon: Code2, body: <div className="projects">{projects.map(([title, type, description], index) => <a href="#" className="project" key={title}><span className={`project-art art-${index}`}>{title[0]}</span><span><small>{type}</small><strong>{title}</strong><em>{description}</em></span><ArrowUpRight size={16} /></a>)}</div> },
    camera: { title: "Photos", icon: Camera, body: <div className="photos"><div className="photo p1">01</div><div className="photo p2">02</div><div className="photo p3">03</div><div className="photo p4">04</div></div> },
    music: { title: "Music", icon: Music2, body: <div className="music-player"><div className="album"><span /></div><div><small>PLAYING NOW</small><h3>Quietly ambitious</h3><p>Arjun Mehta · 2025</p></div><div className="progress"><i /></div><div className="controls"><ChevronRight className="previous" /><button><Play size={17} fill="currentColor" /></button><ChevronRight /></div></div> },
    contact: { title: "Contact", icon: MessageCircle, body: <><p className="window-lede">Have a good idea? I&apos;d love to hear it.</p><a className="email" href="mailto:hello@arjunmehta.dev">hello@arjunmehta.dev <ArrowUpRight size={16} /></a><div className="socials"><a href="https://github.com" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href="https://linkedin.com" target="_blank" rel="noreferrer"><Globe2 size={16} /> LinkedIn</a></div></> },
    settings: { title: "Settings", icon: Settings, body: <div className="preferences"><label><span><Moon size={16} /> Dark mode</span><i className="toggle on"><b /></i></label><label><span><Sparkles size={16} /> Motion effects</span><i className="toggle on"><b /></i></label><label><span><Zap size={16} /> Haptic feedback</span><i className="toggle"><b /></i></label></div> },
    github: { title: "GitHub", icon: Github, body: <><p className="window-lede">Open source, shipped often.</p><p>Browse my code, experiments, and contribution history on GitHub.</p><a className="email" href="https://github.com" target="_blank" rel="noreferrer">Open GitHub <ArrowUpRight size={16} /></a></> },
    resume: { title: "Résumé", icon: Mail, body: <><p className="window-lede">Six years of building for small screens.</p><p>Android engineering, product thinking, and a soft spot for details.</p><a className="email" href="mailto:hello@arjunmehta.dev">Request résumé <Send size={16} /></a></> },
  }[app];
  const Icon = content.icon;
  return <motion.section className="app-window" initial={{ opacity: 1, scale: 0.2 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 1, scaleY: 0 }} transition={{ type: "spring", stiffness: 360, damping: 30 }}><header><span><Icon size={16} />{content.title}</span><button onClick={close} aria-label="Close app"><X size={18} /></button></header><div className="window-content">{content.body}</div></motion.section>;
}

export default function Home() {
  const [openApp, setOpenApp] = useState<AppName | null>(null);
  return <main className="phone-stage">
    <div className="phone-hardware phone-hardware-left" />
    <div className="phone-hardware phone-hardware-right" />
    <div className="galaxy-phone">
      <div className="camera-cutout"><span /></div>
      <div className="android-home">
    <div className="wallpaper-glow glow-a" /><div className="wallpaper-glow glow-b" /><div className="wallpaper-glow glow-c" />
    <div className="home-status"><span>9:41</span><span>Sat 21 Sep</span><span className="signals"><Wifi size={14} /><span>5G</span><BatteryFull size={16} /></span></div>
    <section className="home-grid">
      <motion.div className="widget github-widget" initial={{ opacity: 1, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}><div><small>GITHUB ACTIVITY</small><strong>Building in public</strong></div><Github size={18} /><div className="contributions">{Array.from({ length: 35 }).map((_, i) => <i className={`c-${(i * 5 + i % 3) % 5}`} key={i} />)}</div></motion.div>
      <div className="welcome-copy"><span>ANDROID ENGINEER · PRODUCT BUILDER</span><h1>Building things<br /><em>worth</em> tapping.</h1><p>Explore my portfolio like an Android home screen. Open an app to see what I&apos;ve been making.</p></div>
      <div className="app-grid">{apps.map(({ id, label, color }, index) => <motion.button key={id} className="app-icon-button" onClick={() => setOpenApp(id)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 * index + .25 }} whileTap={{ scale: .92, transition: { duration: .05 } }}><span className={`app-icon ${color}`}><AndroidLauncherIcon app={id} /></span><span>{label}</span></motion.button>)}</div>
      <motion.button className="search-pill" onClick={() => setOpenApp("work")} whileHover={{ scale: 1.02 }}><Search size={16} /><span>Search portfolio</span><kbd>⌕</kbd></motion.button>
    </section>
    <footer><button onClick={() => setOpenApp("about")}><UserRound size={15} /><span>About</span></button><button onClick={() => setOpenApp("github")}><Github size={15} /><span>GitHub</span></button><button onClick={() => setOpenApp("contact")}><MessageCircle size={15} /><span>Contact</span></button><button onClick={() => setOpenApp("resume")}><Mail size={15} /><span>Résumé</span></button></footer>
    <div className="gesture"><span /></div>
      <AnimatePresence>{openApp && <div className="modal" onClick={() => setOpenApp(null)}><div onClick={(event) => event.stopPropagation()}><AppWindow app={openApp} close={() => setOpenApp(null)} /></div></div>}</AnimatePresence>
      </div>
    </div>
  </main>;
}
