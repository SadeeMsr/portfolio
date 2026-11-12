// Shared (server + client) theme constants. No "use client" here, so the
// root layout can import the boot script as a plain string.

export const ACCENTS = {
  orange: "#E95420",
  red: "#DA3450",
  magenta: "#B34CB3",
  purple: "#7764D8",
  blue: "#0073E5",
  teal: "#308280",
  green: "#3E9B4F",
} as const;
export type Accent = keyof typeof ACCENTS;

export const WALLPAPERS = {
  dusk: { label: "Aubergine Dusk", className: "wallpaper-dusk" },
  ember: { label: "Ember", className: "wallpaper-ember" },
  grid: { label: "Midnight Grid", className: "wallpaper-grid" },
  daylight: { label: "Daylight", className: "wallpaper-daylight" },
} as const;
export type Wallpaper = keyof typeof WALLPAPERS;

export const SETTINGS_KEY = "rohanos.settings";

/** Inline script for <head> so the saved theme applies before first paint. */
export const themeBootScript = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(
  SETTINGS_KEY,
)})||"{}");var t=s.theme||"dark";if(t==="auto")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t;var a=${JSON.stringify(
  ACCENTS,
)}[s.accent];if(a)document.documentElement.style.setProperty("--accent",a);}catch(e){document.documentElement.dataset.theme="dark";}})();`;
