"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { profile } from "@/data/resume";
import { APPS, searchApps, type AppId } from "../apps";
import { OSContext, type OSApi } from "../context";
import { fmtLong, fmtTime, useNow } from "../hooks";
import { IconBack, IconBattery, IconBriefcase, IconMoon, IconSearch, IconWifi } from "../icons";
import { ACCENTS, WALLPAPERS, useSettings, type Accent } from "../settings";

const GRID: AppId[] = ["about", "experience", "skills", "game", "settings", "readme", "trash"];
const DOCK: AppId[] = ["mail", "terminal", "projects", "resume"];

const LOCK_NOTICES = [
  { app: "Rohan", body: "Available for new opportunities 🚀", time: "now" },
  { app: "Stripe", body: "Payments integrated successfully. Again.", time: "2m" },
  { app: "Terminal", body: "Tip: try `sudo hire-me`", time: "5m" },
];

function StatusBar({ now, onPull, light }: { now: Date; onPull: () => void; light?: boolean }) {
  const startY = useRef<number | null>(null);
  return (
    <button
      type="button"
      aria-label="Open quick settings"
      onClick={onPull}
      onPointerDown={(e) => (startY.current = e.clientY)}
      onPointerUp={(e) => {
        if (startY.current !== null && e.clientY - startY.current > 30) onPull();
        startY.current = null;
      }}
      className={`relative z-20 flex h-8 w-full shrink-0 items-center justify-between px-5 text-[13px] font-medium ${light ? "text-fg" : "text-white"}`}
    >
      <span suppressHydrationWarning>{fmtTime(now)}</span>
      <span className="flex items-center gap-1.5">
        <IconWifi className="h-4 w-4" />
        <IconBattery className="h-4 w-4" />
        <span className="text-xs">87%</span>
      </span>
    </button>
  );
}

function LockScreen({ now, onUnlock }: { now: Date; onUnlock: () => void }) {
  const [dy, setDy] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<number | null>(null);
  const down = (e: RPointerEvent) => {
    start.current = e.clientY;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const move = (e: RPointerEvent) => start.current !== null && setDy(Math.min(0, e.clientY - start.current));
  const up = () => {
    if (dy < -80 || Math.abs(dy) < 5) onUnlock();
    setDy(0);
    setDragging(false);
    start.current = null;
  };
  return (
    <div
      className="absolute inset-0 z-30 flex touch-none flex-col items-center bg-black/30 text-white backdrop-blur-sm"
      style={{ transform: `translateY(${dy}px)`, opacity: 1 + dy / 400, transition: dragging ? "none" : "all 200ms" }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
    >
      <div className="mt-20 text-center">
        <p className="text-7xl font-light tracking-tight" suppressHydrationWarning>
          {fmtTime(now)}
        </p>
        <p className="mt-1 text-lg" suppressHydrationWarning>
          {fmtLong(now)}
        </p>
      </div>
      <ul className="mt-10 w-full max-w-sm space-y-2 px-4">
        {LOCK_NOTICES.map((n) => (
          <li key={n.app} className="glass rounded-2xl bg-white/15 px-4 py-3">
            <div className="flex justify-between text-xs text-white/70">
              <span className="font-semibold">{n.app}</span>
              <span>{n.time}</span>
            </div>
            <p className="mt-0.5 text-sm">{n.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-auto mb-10 flex flex-col items-center gap-2 text-sm text-white/80">
        <span className="animate-bounce text-xl">⌃</span>
        Swipe up to unlock
      </div>
    </div>
  );
}

function QuickSettings({ onClose }: { onClose: () => void }) {
  const settings = useSettings();
  const now = useNow();
  const dark = settings.resolvedTheme === "dark";
  const accents = Object.keys(ACCENTS) as Accent[];
  const tile = (on: boolean) =>
    `flex items-center gap-3 rounded-3xl px-4 py-4 text-left text-sm ${on ? "bg-accent text-accent-fg" : "bg-hover"}`;
  return (
    <div className="absolute inset-0 z-40 bg-black/40" onClick={onClose}>
      <div
        className="anim-pop rounded-b-[28px] bg-surface p-4 pt-3 text-fg shadow-window"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-baseline justify-between px-1">
          <span className="text-3xl font-light" suppressHydrationWarning>
            {fmtTime(now)}
          </span>
          <span className="text-sm text-muted" suppressHydrationWarning>
            {fmtLong(now)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className={tile(true)}>
            <IconWifi className="h-5 w-5" />
            <span>
              <span className="block font-semibold">Wi-Fi</span>
              <span className="block text-xs opacity-80">Opportunities</span>
            </span>
          </button>
          <button type="button" className={tile(dark)} onClick={() => settings.set({ theme: dark ? "light" : "dark" })}>
            <IconMoon className="h-5 w-5" />
            <span>
              <span className="block font-semibold">Dark theme</span>
              <span className="block text-xs opacity-80">{dark ? "On" : "Off"}</span>
            </span>
          </button>
          <button
            type="button"
            className={tile(false)}
            onClick={() => settings.set({ accent: accents[(accents.indexOf(settings.accent) + 1) % accents.length] })}
          >
            <span className="h-5 w-5 rounded-full" style={{ background: ACCENTS[settings.accent] }} />
            <span>
              <span className="block font-semibold">Accent</span>
              <span className="block text-xs capitalize opacity-80">{settings.accent}</span>
            </span>
          </button>
          <a href="/resume" className={tile(false)}>
            <IconBriefcase className="h-5 w-5" />
            <span>
              <span className="block font-semibold">Recruiter Mode</span>
              <span className="block text-xs opacity-80">Plain resume</span>
            </span>
          </a>
        </div>
        <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-muted/50" />
      </div>
    </div>
  );
}

export function Phone() {
  const settings = useSettings();
  const now = useNow();
  const [locked, setLocked] = useState(true);
  const [app, setApp] = useState<AppId | null>(null);
  const [qs, setQs] = useState(false);
  const [q, setQ] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Android back button / browser back closes the app
  useEffect(() => {
    const onPop = () => setApp(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const openApp = (id: AppId) => {
    if (!app) window.history.pushState({ app: id }, "");
    setApp(id);
    setQ("");
  };

  const goHome = () => {
    if (app && window.history.state?.app) window.history.back();
    else setApp(null);
  };

  const api: OSApi = {
    mode: "mobile",
    openApp,
    closeApp: () => goHome(),
    notify: (message) => {
      setToast(message);
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 3000);
    },
    restart: () => window.location.reload(),
    lock: () => setLocked(true),
    powerOff: () => setLocked(true),
  };

  const results = searchApps(q);
  const current = app ? APPS[app] : null;

  const icon = (id: AppId, showLabel = true) => (
    <button key={id} type="button" onClick={() => openApp(id)} className="flex flex-col items-center gap-1.5 active:scale-95">
      <span className="h-14 w-14">{APPS[id].icon}</span>
      {showLabel && (
        <span className="max-w-[4.5rem] truncate text-xs text-white [text-shadow:0_1px_2px_rgba(0,0,0,.7)]">{APPS[id].label}</span>
      )}
    </button>
  );

  return (
    <OSContext.Provider value={api}>
      <div className={`fixed inset-0 flex flex-col overflow-hidden ${WALLPAPERS[settings.wallpaper].className}`}>
        <StatusBar now={now} onPull={() => setQs(true)} light={!!current && settings.resolvedTheme === "light"} />

        {/* home screen */}
        <div className="flex min-h-0 flex-1 flex-col px-5 pb-3">
          <div className="glass mt-4 flex items-center gap-4 rounded-3xl bg-black/25 p-4 text-white">
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-white/50">
              <Image src={profile.photo} alt={profile.name} fill sizes="64px" className="object-cover object-[50%_40%]" priority />
            </span>
            <div className="min-w-0">
              <p className="text-lg leading-tight font-semibold">Hi, I’m {profile.shortName} 👋</p>
              <p className="text-sm text-white/80">{profile.title}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-green-300">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> {profile.status}
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-white [text-shadow:0_1px_3px_rgba(0,0,0,.6)]">
            <span className="block text-sm opacity-80" suppressHydrationWarning>{fmtLong(now)}</span>
            <span className="text-xs opacity-70">Currently: building things with Next.js</span>
          </p>

          <div className="mt-8 grid grid-cols-4 gap-y-6">{GRID.map((id) => icon(id))}</div>

          <div className="mt-auto">
            <label className="glass mb-4 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2.5 text-[#333] dark:bg-black/40 dark:text-white">
              <IconSearch className="h-4 w-4 opacity-70" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && results[0] && openApp(results[0].id)}
                placeholder="Search apps, skills, projects…"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-current placeholder:opacity-60"
              />
            </label>
            {q && (
              <div className="glass anim-pop mb-3 rounded-3xl bg-black/50 p-3">
                {results.length ? (
                  <div className="grid grid-cols-4 gap-y-3">{results.map((r) => icon(r.id))}</div>
                ) : (
                  <p className="text-center text-sm text-white/80">Nothing found. Try “aws” or “game”.</p>
                )}
              </div>
            )}
            <div className="glass grid grid-cols-4 rounded-[28px] bg-white/15 px-2 py-3">{DOCK.map((id) => icon(id, false))}</div>
          </div>
        </div>

        {/* open app */}
        {current && (
          <div key={current.id} className="anim-slide-up absolute inset-0 z-10 flex flex-col bg-surface pt-8 text-fg">
            <header className="flex h-12 shrink-0 items-center gap-2 border-b border-line px-2">
              <button type="button" aria-label="Back" onClick={goHome} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-hover">
                <IconBack className="h-5 w-5" />
              </button>
              <h1 className="truncate text-base font-medium">{current.label}</h1>
            </header>
            <div className="min-h-0 flex-1">
              <current.Component />
            </div>
          </div>
        )}

        {/* gesture bar */}
        <button
          type="button"
          aria-label="Home"
          onClick={goHome}
          className="absolute inset-x-0 bottom-0 z-20 flex h-5 items-center justify-center"
        >
          <span className={`h-1 w-28 rounded-full ${current && settings.resolvedTheme === "light" ? "bg-black/60" : "bg-white/80"}`} />
        </button>

        {toast && (
          <div className="anim-pop fixed inset-x-4 bottom-10 z-50 rounded-2xl bg-[#222] px-4 py-3 text-center text-sm text-white shadow-lg">
            {toast}
          </div>
        )}
        {qs && <QuickSettings onClose={() => setQs(false)} />}
        {locked && <LockScreen now={now} onUnlock={() => setLocked(false)} />}
      </div>
    </OSContext.Provider>
  );
}
