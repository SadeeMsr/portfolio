"use client";

import { useState } from "react";
import { ACCENTS, WALLPAPERS, useSettings, type Accent, type ThemePref, type Wallpaper } from "../settings";
import { RohanLogo } from "../icons";

type Page = "appearance" | "privacy" | "about";

function Appearance() {
  const { theme, accent, wallpaper, set } = useSettings();
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 font-semibold">Style</h3>
        <div className="grid grid-cols-3 gap-3">
          {(["light", "dark", "auto"] as ThemePref[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set({ theme: t })}
              aria-pressed={theme === t}
              className={`overflow-hidden rounded-xl border-2 text-sm capitalize ${theme === t ? "border-accent" : "border-line hover:border-muted"}`}
            >
              <div
                className={`h-14 ${t === "light" ? "bg-[#f4f4f4]" : t === "dark" ? "bg-[#2a2a2a]" : "bg-[linear-gradient(90deg,#f4f4f4_50%,#2a2a2a_50%)]"}`}
              />
              <div className="py-1.5">{t === "auto" ? "Follow system" : t}</div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 font-semibold">Accent colour</h3>
        <div className="flex flex-wrap gap-3">
          {(Object.keys(ACCENTS) as Accent[]).map((a) => (
            <button
              key={a}
              type="button"
              aria-label={a}
              aria-pressed={accent === a}
              onClick={() => set({ accent: a })}
              className={`h-8 w-8 rounded-full ring-offset-2 ring-offset-surface transition ${accent === a ? "ring-2 ring-fg" : "hover:scale-110"}`}
              style={{ background: ACCENTS[a] }}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 font-semibold">Background</h3>
        <div className="grid grid-cols-2 gap-3 @lg:grid-cols-4">
          {(Object.keys(WALLPAPERS) as Wallpaper[]).map((w) => (
            <button
              key={w}
              type="button"
              aria-pressed={wallpaper === w}
              onClick={() => set({ wallpaper: w })}
              className={`overflow-hidden rounded-xl border-2 text-xs ${wallpaper === w ? "border-accent" : "border-line hover:border-muted"}`}
            >
              <div className={`h-16 ${WALLPAPERS[w].className}`} />
              <div className="py-1.5">{WALLPAPERS[w].label}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-2.5 text-sm">
      <span className="text-muted">{k}</span>
      <span className="text-right">{v}</span>
    </div>
  );
}

function About() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-2 py-4">
        <RohanLogo size={72} />
        <h3 className="text-xl font-bold">
          Rohan<span className="text-accent">OS</span>
        </h3>
        <p className="text-sm text-muted">2.0 LTS · “Caffeinated Coder”</p>
      </div>
      <div className="divide-y divide-line rounded-xl border border-line bg-surface-2">
        <Row k="Device name" v="rohan-portfolio" />
        <Row k="Processor" v="1× human brain @ deadline GHz" />
        <Row k="Memory" v="Remembers every API contract" />
        <Row k="Graphics" v="Tailwind CSS, hardware-accelerated" />
        <Row k="Disk" v="node_modules: 98% full" />
        <Row k="Kernel" v="Next.js 16 + React 19" />
        <Row k="Uptime" v="Since 2019, no unplanned downtime" />
      </div>
    </div>
  );
}

function Privacy() {
  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-surface-2">
      <Row k="Cookies" v="None. Not even the edible kind." />
      <Row k="Tracking" v="Zero. I only track bugs." />
      <Row k="Stored locally" v="Your theme & game high score" />
    </div>
  );
}

const PAGES: { id: Page; label: string }[] = [
  { id: "appearance", label: "Appearance" },
  { id: "privacy", label: "Privacy" },
  { id: "about", label: "About" },
];

export default function Settings() {
  const [page, setPage] = useState<Page>("appearance");
  return (
    <div className="@container flex h-full flex-col @xl:flex-row">
      <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-sidebar p-2 @xl:w-44 @xl:flex-col @xl:border-r @xl:border-b-0">
        {PAGES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPage(p.id)}
            className={`rounded-lg px-3 py-1.5 text-left text-sm whitespace-nowrap ${page === p.id ? "bg-accent/15 font-medium text-accent" : "hover:bg-hover"}`}
          >
            {p.label}
          </button>
        ))}
      </nav>
      <div className="min-h-0 flex-1 overflow-auto os-scroll p-5 @md:p-7">
        {page === "appearance" ? <Appearance /> : page === "privacy" ? <Privacy /> : <About />}
      </div>
    </div>
  );
}
