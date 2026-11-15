// Shared (server + client) theme constants. No "use client" here, so the
// root layout can import the boot script as a plain string.

export const ACCENTS = {
  cyan: "#22D3EE",
  lime: "#C6F432",
  orange: "#E95420",
  red: "#DA3450",
  magenta: "#B34CB3",
  purple: "#7764D8",
  blue: "#0073E5",
  teal: "#308280",
  green: "#3E9B4F",
} as const;
export type Accent = keyof typeof ACCENTS;
export const DEFAULT_ACCENT: Accent = "cyan";

/**
 * Neon accents (cyan, lime) need dark button text, and a deeper shade in light
 * mode so text stays readable on white. Everything else uses white text.
 */
const NEON: Partial<Record<Accent, { darkFg: string; light: string }>> = {
  cyan: { darkFg: "#04141A", light: "#0E7490" },
  lime: { darkFg: "#0B0B0B", light: "#4D7C0F" },
};
export function accentVars(accent: Accent, theme: "light" | "dark") {
  const n = NEON[accent];
  if (!n) return { accent: ACCENTS[accent], fg: "#FFFFFF" };
  return theme === "dark" ? { accent: ACCENTS[accent], fg: n.darkFg } : { accent: n.light, fg: "#FFFFFF" };
}

export const WALLPAPERS = {
  dusk: { label: "Aubergine Dusk", className: "wallpaper-dusk" },
  ember: { label: "Ember", className: "wallpaper-ember" },
  grid: { label: "Midnight Grid", className: "wallpaper-grid" },
  daylight: { label: "Daylight", className: "wallpaper-daylight" },
} as const;
export type Wallpaper = keyof typeof WALLPAPERS;

export const SETTINGS_KEY = "rohanos.settings.v3";

const VARS = Object.fromEntries(
  (Object.keys(ACCENTS) as Accent[]).map((k) => [k, { dark: accentVars(k, "dark"), light: accentVars(k, "light") }]),
);

/** Inline script for <head> so the saved theme applies before first paint. */
export const themeBootScript = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(
  SETTINGS_KEY,
)})||"{}");var t=s.theme||"dark";if(t==="auto")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t;var V=${JSON.stringify(
  VARS,
)};var v=(V[s.accent]||V[${JSON.stringify(DEFAULT_ACCENT)}])[t];var r=document.documentElement.style;r.setProperty("--accent",v.accent);r.setProperty("--accent-fg",v.fg);}catch(e){document.documentElement.dataset.theme="dark";}})();
`;
