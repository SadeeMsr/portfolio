"use client";

import { useEffect, useRef, useState } from "react";
import { useOS } from "../context";
import { fmtLong, fmtTopbar, useNow } from "../hooks";
import { IconBattery, IconGear, IconLock, IconMoon, IconPower, IconVolume, IconWifi } from "../icons";
import { ACCENTS, useSettings, type Accent } from "../settings";

export type Notice = { id: number; title: string; body: string };

type Props = {
  onActivities: () => void;
  activitiesOpen: boolean;
  notices: Notice[];
  dismissNotice: (id: number) => void;
};

function Calendar({ now }: { now: Date }) {
  const y = now.getFullYear();
  const m = now.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div>
      <p className="text-xs text-muted">{now.toLocaleDateString([], { weekday: "long" })}</p>
      <p className="text-lg font-semibold">{now.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" })}</p>
      <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="text-muted">
            {d}
          </span>
        ))}
        {cells.map((d, i) => (
          <span
            key={i}
            className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${d === now.getDate() ? "bg-accent font-bold text-accent-fg" : ""}`}
          >
            {d ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TopBar({ onActivities, activitiesOpen, notices, dismissNotice }: Props) {
  const now = useNow();
  const os = useOS();
  const settings = useSettings();
  const [menu, setMenu] = useState<"calendar" | "system" | null>(null);
  const [powerOpen, setPowerOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setMenu(null);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", esc);
    };
  }, [menu]);

  const pill = "rounded-full px-3 h-6 flex items-center gap-2 transition-colors hover:bg-white/15";
  const dark = settings.resolvedTheme === "dark";

  return (
    <div ref={ref} className="absolute inset-x-0 top-0 z-[9000] flex h-8 items-center bg-panel px-1.5 text-[13px] font-medium text-white select-none">
      <button type="button" onClick={onActivities} className={`${pill} ${activitiesOpen ? "bg-white/20" : ""}`}>
        Activities
      </button>

      <button
        type="button"
        onClick={() => setMenu(menu === "calendar" ? null : "calendar")}
        className={`${pill} absolute left-1/2 -translate-x-1/2 ${menu === "calendar" ? "bg-white/20" : ""}`}
      >
        <span suppressHydrationWarning>{fmtTopbar(now)}</span>
        {notices.length > 0 && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
      </button>

      <button
        type="button"
        aria-label="System menu"
        onClick={() => {
          setMenu(menu === "system" ? null : "system");
          setPowerOpen(false);
        }}
        className={`${pill} ml-auto ${menu === "system" ? "bg-white/20" : ""}`}
      >
        <IconWifi className="h-4 w-4" />
        <IconVolume className="h-4 w-4" />
        <IconBattery className="h-4 w-4" />
      </button>

      {menu === "calendar" && (
        <div className="anim-pop glass absolute top-9 left-1/2 flex w-[min(640px,calc(100vw-24px))] -translate-x-1/2 gap-4 rounded-2xl bg-popover p-4 text-popover-fg shadow-window">
          <div className="min-w-0 flex-1">
            {notices.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-1 py-10 text-muted">
                <span className="text-3xl">🔕</span>
                <span className="text-sm">No notifications. Inbox zero, finally.</span>
              </div>
            ) : (
              <ul className="space-y-2">
                {notices.map((n) => (
                  <li key={n.id} className="group relative rounded-xl bg-hover p-3">
                    <p className="text-sm font-semibold">{n.title}</p>
                    <p className="text-sm text-muted">{n.body}</p>
                    <button
                      type="button"
                      aria-label="Dismiss"
                      onClick={() => dismissNotice(n.id)}
                      className="absolute top-2 right-2 rounded-full px-1.5 text-muted opacity-0 group-hover:opacity-100 hover:bg-hover"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="w-60 shrink-0 border-l border-line pl-4">
            <Calendar now={now} />
          </div>
        </div>
      )}

      {menu === "system" && (
        <div className="anim-pop glass absolute top-9 right-1.5 w-80 rounded-2xl bg-popover p-3.5 text-popover-fg shadow-window">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-hover px-3 py-1.5 text-xs">
              <IconBattery className="h-4 w-4" /> 87% caffeinated
            </span>
            <button
              type="button"
              aria-label="Settings"
              onClick={() => {
                os.openApp("settings");
                setMenu(null);
              }}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-hover hover:bg-fg/15"
            >
              <IconGear className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Lock"
              onClick={() => {
                os.lock();
                setMenu(null);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-hover hover:bg-fg/15"
            >
              <IconLock className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Power"
              onClick={() => setPowerOpen((p) => !p)}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${powerOpen ? "bg-accent text-accent-fg" : "bg-hover hover:bg-fg/15"}`}
            >
              <IconPower className="h-4 w-4" />
            </button>
          </div>

          {powerOpen && (
            <div className="anim-pop mt-3 overflow-hidden rounded-xl bg-hover text-sm">
              {[
                { label: "Restart…", act: () => os.restart() },
                { label: "Power Off…", act: () => os.powerOff() },
                { label: "Log Out", act: () => os.notify("Log out is disabled. You just got here!", "Session") },
              ].map((i) => (
                <button
                  key={i.label}
                  type="button"
                  onClick={() => {
                    setMenu(null);
                    i.act();
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-fg/10"
                >
                  {i.label}
                </button>
              ))}
            </div>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => os.notify("Wi-Fi can't be turned off. Opportunities must keep flowing.", "Network")}
              className="flex items-center gap-2 rounded-full bg-accent px-3 py-2.5 text-left text-xs text-accent-fg"
            >
              <IconWifi className="h-4 w-4 shrink-0" />
              <span className="min-w-0">
                <span className="block font-semibold">Wi-Fi</span>
                <span className="block truncate opacity-85">Opportunities</span>
              </span>
            </button>
            <button
              type="button"
              aria-pressed={dark}
              onClick={() => settings.set({ theme: dark ? "light" : "dark" })}
              className={`flex items-center gap-2 rounded-full px-3 py-2.5 text-left text-xs ${dark ? "bg-accent text-accent-fg" : "bg-hover"}`}
            >
              <IconMoon className="h-4 w-4 shrink-0" />
              <span>
                <span className="block font-semibold">Dark Style</span>
                <span className="block opacity-85">{dark ? "On" : "Off"}</span>
              </span>
            </button>
          </div>

          <div className="mt-3">
            <p className="mb-2 text-xs text-muted">Accent colour</p>
            <div className="flex justify-between">
              {(Object.keys(ACCENTS) as Accent[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-label={`${a} accent`}
                  onClick={() => settings.set({ accent: a })}
                  className={`h-6 w-6 rounded-full ${settings.accent === a ? "ring-2 ring-popover-fg ring-offset-2 ring-offset-popover" : ""}`}
                  style={{ background: ACCENTS[a] }}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs">
            <IconVolume className="h-4 w-4 shrink-0" />
            <div className="h-1.5 flex-1 rounded-full bg-hover">
              <div className="h-full w-[70%] rounded-full bg-accent" />
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] text-muted" suppressHydrationWarning>
            {fmtLong(now)}
          </p>
        </div>
      )}
    </div>
  );
}
