"use client";

import Image from "next/image";
import { useCallback, useEffect, useReducer, useRef, useState, type MouseEvent as RMouseEvent } from "react";
import { profile } from "@/data/resume";
import { APPS, type AppId } from "../apps";
import { OSContext, type OSApi } from "../context";
import { fmtLong, fmtTime, useNow } from "../hooks";
import { WALLPAPERS, useSettings } from "../settings";
import { Dock } from "./Dock";
import { Overview } from "./Overview";
import { TopBar, type Notice } from "./TopBar";
import { Window } from "./Window";
import { topWindow, wmReducer } from "./windows";

const DESKTOP_ICONS: { id: AppId; label: string }[] = [
  { id: "readme", label: "README.md" },
  { id: "resume", label: "Resume.pdf" },
  { id: "game", label: "Bug Squasher" },
  { id: "trash", label: "Trash" },
];

const INITIAL_NOTICES: Notice[] = [
  { id: 1, title: "Rohan", body: "Available for new opportunities. Reply within 24h, guaranteed." },
  { id: 2, title: "Terminal", body: "Tip: try `sudo hire-me`." },
  { id: 3, title: "Bug Squasher", body: "Your high score misses you." },
];

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const now = useNow();
  useEffect(() => {
    const k = () => onUnlock();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onUnlock]);
  return (
    <button
      type="button"
      onClick={onUnlock}
      className="anim-fade absolute inset-0 z-[9500] flex flex-col items-center justify-center gap-2 bg-black/40 text-white backdrop-blur-2xl"
    >
      <span className="text-7xl font-light tracking-tight" suppressHydrationWarning>
        {fmtTime(now)}
      </span>
      <span className="text-xl" suppressHydrationWarning>
        {fmtLong(now)}
      </span>
      <span className="mt-16 flex flex-col items-center gap-3">
        <span className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-white/60">
          <Image src={profile.photo} alt="" fill sizes="80px" className="object-cover object-[50%_40%]" />
        </span>
        <span className="text-lg font-medium">{profile.name}</span>
        <span className="text-sm text-white/70">Click or press any key to unlock</span>
      </span>
    </button>
  );
}

function PowerOff({ onPowerOn }: { onPowerOn: () => void }) {
  return (
    <div className="absolute inset-0 z-[9900] flex flex-col items-center justify-center gap-6 bg-black text-center font-mono text-white/80">
      <p>It’s now safe to turn off your computer.</p>
      <p className="text-sm text-white/50">…or to hire Rohan. Both are perfectly safe.</p>
      <button type="button" onClick={onPowerOn} className="mt-4 rounded-full border border-white/30 px-5 py-2 text-sm hover:bg-white/10">
        ⏻ Power on
      </button>
    </div>
  );
}

export function Desktop({ onRestart, firstBoot }: { onRestart: () => void; firstBoot: boolean }) {
  const settings = useSettings();
  const areaRef = useRef<HTMLDivElement>(null);
  const [wm, dispatch] = useReducer(wmReducer, { windows: [], z: 10, area: { w: 1200, h: 800 } });
  const [overview, setOverview] = useState<null | "windows" | "apps">(null);
  const [snapPreview, setSnapPreview] = useState<"left" | "right" | "max" | null>(null);
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);
  const [toasts, setToasts] = useState<{ id: number; title?: string; message: string }[]>([]);
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [locked, setLocked] = useState(false);
  const [off, setOff] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<AppId | null>(null);
  const toastId = useRef(0);

  const focused = topWindow(wm);

  // measure the work area
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => dispatch({ type: "area", w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // open the welcome windows once the area is measured
  const opened = useRef(false);
  useEffect(() => {
    if (opened.current || wm.area.w === 1200) return;
    opened.current = true;
    dispatch({ type: "open", id: "about" });
    if (firstBoot) dispatch({ type: "open", id: "readme" });
  }, [wm.area.w, firstBoot]);

  // Super key toggles Activities
  useEffect(() => {
    let clean = false;
    const down = (e: KeyboardEvent) => {
      clean = e.key === "Meta" || e.key === "OS";
    };
    const up = (e: KeyboardEvent) => {
      if ((e.key === "Meta" || e.key === "OS") && clean) setOverview((o) => (o ? null : "windows"));
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const notify = useCallback((message: string, title?: string) => {
    const id = toastId.current++;
    setToasts((t) => [...t.slice(-2), { id, title, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const api: OSApi = {
    mode: "desktop",
    openApp: (id) => {
      dispatch({ type: "open", id });
      setOverview(null);
    },
    closeApp: (id) => dispatch({ type: "close", id }),
    notify,
    restart: onRestart,
    lock: () => setLocked(true),
    powerOff: () => setOff(true),
  };

  const onDockApp = (id: AppId) => {
    const w = wm.windows.find((x) => x.id === id);
    if (!w) dispatch({ type: "open", id });
    else if (focused?.id === id) dispatch({ type: "minimize", id });
    else dispatch({ type: "focus", id });
    setOverview(null);
  };

  const onContext = (e: RMouseEvent) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    setCtxMenu({ x: Math.min(e.clientX, window.innerWidth - 216), y: Math.min(e.clientY, window.innerHeight - 200) });
  };

  const CTX_ITEMS = ["New Folder", "Open in Terminal", "Show Desktop", "Change Background…", "Display Settings"] as const;
  const runCtx = (item: (typeof CTX_ITEMS)[number]) => {
    setCtxMenu(null);
    if (item === "New Folder") notify("Folder creation disabled. Rohan’s projects are already organized.", "Files");
    else if (item === "Open in Terminal") api.openApp("terminal");
    else if (item === "Show Desktop") wm.windows.forEach((w) => dispatch({ type: "minimize", id: w.id }));
    else api.openApp("settings");
  };

  return (
    <OSContext.Provider value={api}>
      <div
        className={`fixed inset-0 overflow-hidden select-none ${WALLPAPERS[settings.wallpaper].className}`}
        onClick={() => ctxMenu && setCtxMenu(null)}
      >
        <TopBar
          onActivities={() => setOverview((o) => (o ? null : "windows"))}
          activitiesOpen={!!overview}
          notices={notices}
          dismissNotice={(id) => setNotices((n) => n.filter((x) => x.id !== id))}
        />
        <Dock
          windows={wm.windows}
          focusedId={focused?.id}
          onApp={onDockApp}
          onShowApps={() => setOverview((o) => (o === "apps" ? null : "apps"))}
          showAppsActive={overview === "apps"}
        />

        <main ref={areaRef} className="absolute top-8 right-0 bottom-0 left-16" onContextMenu={onContext} onPointerDown={(e) => e.target === e.currentTarget && setSelectedIcon(null)}>
          {/* desktop icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-1" onContextMenu={(e) => e.preventDefault()}>
            {DESKTOP_ICONS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedIcon(d.id)}
                onDoubleClick={() => api.openApp(d.id)}
                onKeyDown={(e) => e.key === "Enter" && api.openApp(d.id)}
                className={`flex w-24 flex-col items-center gap-1 rounded-lg p-2 text-white ${selectedIcon === d.id ? "bg-accent/40" : "hover:bg-white/10"}`}
              >
                <span className="h-12 w-12">{APPS[d.id].icon}</span>
                <span className="text-xs leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,.8)]">{d.label}</span>
              </button>
            ))}
          </div>

          {wm.windows.map((w) => (
            <Window
              key={w.id}
              win={w}
              focused={focused?.id === w.id}
              area={wm.area}
              areaRef={areaRef}
              dispatch={dispatch}
              onSnapPreview={setSnapPreview}
            />
          ))}

          {snapPreview && (
            <div
              className="pointer-events-none absolute z-[6999] rounded-xl border-2 border-accent bg-accent/20 transition-all"
              style={
                snapPreview === "max"
                  ? { inset: 6 }
                  : snapPreview === "left"
                    ? { left: 6, top: 6, bottom: 6, width: "calc(50% - 9px)" }
                    : { right: 6, top: 6, bottom: 6, width: "calc(50% - 9px)" }
              }
            />
          )}

          {overview && (
            <Overview
              key={overview}
              initial={overview}
              windows={wm.windows}
              onOpen={(id) => dispatch({ type: "open", id })}
              onClose={() => setOverview(null)}
            />
          )}
        </main>

        {ctxMenu && (
          <div
            className="anim-pop glass fixed z-[9100] w-52 overflow-hidden rounded-xl bg-popover py-1 text-sm text-popover-fg shadow-window"
            style={{ left: ctxMenu.x, top: ctxMenu.y }}
          >
            {CTX_ITEMS.map((i) => (
              <button key={i} type="button" onClick={() => runCtx(i)} className="block w-full px-4 py-1.5 text-left hover:bg-hover">
                {i}
              </button>
            ))}
          </div>
        )}

        {/* toasts */}
        <div className="pointer-events-none fixed top-10 left-1/2 z-[9200] flex w-96 max-w-[calc(100vw-24px)] -translate-x-1/2 flex-col gap-2">
          {toasts.map((t) => (
            <div key={t.id} className="anim-pop glass rounded-2xl bg-popover px-4 py-3 text-sm text-popover-fg shadow-window">
              {t.title && <p className="font-semibold">{t.title}</p>}
              <p className="text-muted">{t.message}</p>
            </div>
          ))}
        </div>

        {locked && <LockScreen onUnlock={() => setLocked(false)} />}
        {off && <PowerOff onPowerOn={onRestart} />}
      </div>
    </OSContext.Provider>
  );
}
