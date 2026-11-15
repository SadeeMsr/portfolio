"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ACCENTS, DEFAULT_ACCENT, SETTINGS_KEY as KEY, WALLPAPERS, accentVars, type Accent, type Wallpaper } from "./theme";

export { ACCENTS, WALLPAPERS, type Accent, type Wallpaper };

export type ThemePref = "light" | "dark" | "auto";

type Settings = {
  theme: ThemePref;
  accent: Accent;
  wallpaper: Wallpaper;
};

const DEFAULTS: Settings = { theme: "dark", accent: DEFAULT_ACCENT, wallpaper: "dusk" };

type Ctx = Settings & {
  resolvedTheme: "light" | "dark";
  set: (patch: Partial<Settings>) => void;
};

const SettingsContext = createContext<Ctx | null>(null);

function read(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      theme: parsed.theme && ["light", "dark", "auto"].includes(parsed.theme) ? parsed.theme : DEFAULTS.theme,
      accent: parsed.accent && parsed.accent in ACCENTS ? parsed.accent : DEFAULTS.accent,
      wallpaper: parsed.wallpaper && parsed.wallpaper in WALLPAPERS ? parsed.wallpaper : DEFAULTS.wallpaper,
    };
  } catch {
    return DEFAULTS;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [systemDark, setSystemDark] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage once
    setSettings(read());
    setLoaded(true);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme = settings.theme === "auto" ? (systemDark ? "dark" : "light") : settings.theme;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    const v = accentVars(settings.accent, resolvedTheme);
    root.style.setProperty("--accent", v.accent);
    root.style.setProperty("--accent-fg", v.fg);
    if (loaded) {
      try {
        localStorage.setItem(KEY, JSON.stringify(settings));
      } catch {
        /* storage unavailable: settings just won't persist */
      }
    }
  }, [settings, resolvedTheme, loaded]);

  const value: Ctx = {
    ...settings,
    resolvedTheme,
    set: (patch) => setSettings((s) => ({ ...s, ...patch })),
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
