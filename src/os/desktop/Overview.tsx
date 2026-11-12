"use client";

import { useEffect, useRef, useState } from "react";
import { APPS, APP_IDS, searchApps, type AppId } from "../apps";
import { IconSearch } from "../icons";
import type { Win } from "./windows";

type Props = {
  initial: "windows" | "apps";
  windows: Win[];
  onOpen: (id: AppId) => void;
  onClose: () => void;
};

export function Overview({ initial, windows, onOpen, onClose }: Props) {
  const [q, setQ] = useState("");
  const [view, setView] = useState(initial);
  const input = useRef<HTMLInputElement>(null);
  const results = searchApps(q);

  useEffect(() => {
    input.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const open = (id: AppId) => {
    onOpen(id);
    onClose();
  };

  const appTile = (id: AppId) => (
    <button
      key={id}
      type="button"
      onClick={() => open(id)}
      className="flex w-28 flex-col items-center gap-2 rounded-2xl p-3 text-white hover:bg-white/15 focus-visible:bg-white/20 focus-visible:outline-none"
    >
      <span className="h-16 w-16">{APPS[id].icon}</span>
      <span className="text-center text-sm leading-tight">{APPS[id].label}</span>
    </button>
  );

  return (
    <div
      className="anim-fade absolute inset-0 z-[7000] flex flex-col items-center bg-black/55 px-6 pt-6 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <label className="flex w-full max-w-md items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white ring-accent focus-within:ring-2">
        <IconSearch className="h-4 w-4 opacity-70" />
        <input
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && results[0] && open(results[0].id)}
          placeholder="Type to search: try “aws”, “game” or “hire”"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/60"
        />
      </label>

      <div className="mt-8 w-full max-w-4xl flex-1 overflow-auto os-scroll" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {q ? (
          results.length ? (
            <div className="flex flex-wrap justify-center gap-2">
              {results.map((a) => (
                appTile(a.id)
              ))}
            </div>
          ) : (
            <p className="text-center text-white/70">
              No results for “{q}”. Even grep gave up.
            </p>
          )
        ) : view === "windows" && windows.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6">
            {windows.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => open(w.id)}
                className="group flex w-56 flex-col items-center gap-2"
              >
                <div className="flex h-36 w-full items-center justify-center rounded-xl bg-white/10 ring-accent transition group-hover:ring-4">
                  <span className="h-16 w-16">{APPS[w.id].icon}</span>
                </div>
                <span className="truncate text-sm text-white">{APPS[w.id].title}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            {APP_IDS.map((id) => (
              appTile(id)
            ))}
          </div>
        )}
      </div>

      {!q && windows.length > 0 && (
        <div className="mb-5 flex gap-1 rounded-full bg-white/10 p-1 text-sm text-white">
          {(["windows", "apps"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-1 capitalize ${view === v ? "bg-white/25" : "hover:bg-white/10"}`}
            >
              {v}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
