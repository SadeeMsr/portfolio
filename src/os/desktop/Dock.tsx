"use client";

import { APPS, DOCK, type AppId } from "../apps";
import { IconGrid } from "../icons";
import type { Win } from "./windows";

type Props = {
  windows: Win[];
  focusedId: AppId | undefined;
  onApp: (id: AppId) => void;
  onShowApps: () => void;
  showAppsActive: boolean;
};

export function Dock({ windows, focusedId, onApp, onShowApps, showAppsActive }: Props) {
  const extra = windows.map((w) => w.id).filter((id) => !DOCK.includes(id));
  const items = [...DOCK, ...extra, "trash" as AppId].filter((v, i, a) => a.indexOf(v) === i);

  const renderItem = (id: AppId) => {
    const running = windows.some((w) => w.id === id);
    const app = APPS[id];
    return (
      <div key={id} className="group relative flex items-center">
        {running && (
          <span className={`absolute -left-1.5 rounded-full bg-accent ${focusedId === id ? "h-2 w-2" : "h-1.5 w-1.5"}`} />
        )}
        <button
          type="button"
          onClick={() => onApp(id)}
          aria-label={app.label}
          className={`h-12 w-12 rounded-xl p-1 transition-[background,transform] hover:bg-white/15 active:scale-95 ${focusedId === id ? "bg-white/10" : ""}`}
        >
          {app.icon}
        </button>
        <span className="pointer-events-none absolute left-full ml-3 rounded-lg bg-[#222]/95 px-2.5 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          {app.label}
        </span>
      </div>
    );
  };

  return (
    <nav
      aria-label="Dock"
      className="glass absolute top-8 bottom-0 left-0 z-[8000] flex w-16 flex-col items-center gap-1.5 bg-dock py-2"
    >
      {items.map((id) => (
        renderItem(id)
      ))}
      <div className="flex-1" />
      <button
        type="button"
        onClick={onShowApps}
        aria-label="Show Applications"
        title="Show Applications"
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-white hover:bg-white/15 ${showAppsActive ? "bg-white/20" : ""}`}
      >
        <IconGrid className="h-6 w-6" />
      </button>
    </nav>
  );
}
