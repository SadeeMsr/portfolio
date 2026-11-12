"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ACCENTS, SETTINGS_KEY as KEY, WALLPAPERS, type Accent, type Wallpaper } from "./theme";

export { ACCENTS, WALLPAPERS, type Accent, type Wallpaper };

export type ThemePref = "light" | "dark" | "auto";

type Settings = {
  theme: ThemePref;
  accent: Accent;
  wallpaper: Wallpaper;
};

const DEFAULTS: Settings = { theme: "dark", accent: "orange", wallpaper: "dusk" };

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
    root.style.setProperty("--accent", ACCENTS[settings.accent]);
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
