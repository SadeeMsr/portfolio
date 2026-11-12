import type { ReactNode, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

// ---------- small UI glyphs ----------
export const IconClose = (p: P) => (
  <svg {...base(p)}><path d="M7 7l10 10M17 7L7 17" /></svg>
);
export const IconMin = (p: P) => (
  <svg {...base(p)}><path d="M7 12h10" /></svg>
);
export const IconMax = (p: P) => (
  <svg {...base(p)}><rect x="6.5" y="6.5" width="11" height="11" rx="1.5" /></svg>
);
export const IconRestore = (p: P) => (
  <svg {...base(p)}><rect x="6" y="9" width="9" height="9" rx="1.5" /><path d="M9 6h7.5A1.5 1.5 0 0118 7.5V15" /></svg>
);
export const IconBack = (p: P) => (
  <svg {...base(p)}><path d="M15 6l-6 6 6 6" /></svg>
);
export const IconWifi = (p: P) => (
  <svg {...base(p)}><path d="M2.5 9a14 14 0 0119 0M5.5 12.5a9.5 9.5 0 0113 0M8.5 16a5 5 0 017 0" /><circle cx="12" cy="19" r="1" fill="currentColor" /></svg>
);
export const IconVolume = (p: P) => (
  <svg {...base(p)}><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" /><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11" /></svg>
);
export const IconBattery = ({ level = 0.87, ...p }: P & { level?: number }) => (
  <svg {...base(p)}><rect x="2.5" y="7" width="17" height="10" rx="2" /><path d="M21.5 10.5v3" /><rect x="4.5" y="9" width={13 * level} height="6" rx="1" fill="currentColor" stroke="none" /></svg>
);
export const IconPower = (p: P) => (
  <svg {...base(p)}><path d="M12 3v8" /><path d="M6.3 6.7a8 8 0 1011.4 0" /></svg>
);
export const IconLock = (p: P) => (
  <svg {...base(p)}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
);
export const IconGear = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" /></svg>
);
export const IconMoon = (p: P) => (
  <svg {...base(p)}><path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" /></svg>
);
export const IconSearch = (p: P) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>
);
export const IconGrid = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    {[5, 12, 19].flatMap((y) => [5, 12, 19].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.9" />))}
  </svg>
);
export const IconExternal = (p: P) => (
  <svg {...base(p)}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></svg>
);
export const IconDownload = (p: P) => (
  <svg {...base(p)}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
);
export const IconBriefcase = (p: P) => (
  <svg {...base(p)}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M3 13h18" /></svg>
);
export const IconGithub = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 015 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0012 2z" /></svg>
);
export const IconLinkedin = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z" /></svg>
);
export const IconMail = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5L12 13l8.5-6.5" /></svg>
);

// ---------- RohanOS logo (original mark) ----------
export function RohanLogo({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-label="RohanOS logo">
      <defs>
        <linearGradient id="rl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff8a3d" />
          <stop offset="1" stopColor="#c2185b" />
        </linearGradient>
      </defs>
      <path d="M24 3l18 10.4v21.2L24 45 6 34.6V13.4z" fill="url(#rl)" />
      <path d="M15 31V17h6.5a4.3 4.3 0 010 8.6H15m6.5 0L26 31" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29.5 31h5" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ---------- App icons (rounded tiles, original glyphs) ----------
function Tile({ from, to, children }: { from: string; to: string; children: ReactNode }) {
  const id = `g${from.slice(1)}${to.slice(1)}`;
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="42" height="42" rx="11" fill={`url(#${id})`} />
      <g fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

export const AppIcons = {
  about: (
    <Tile from="#ff8a3d" to="#e95420">
      <circle cx="24" cy="19" r="6" />
      <path d="M13 36c1.8-6 6-8.5 11-8.5S33.2 30 35 36" />
    </Tile>
  ),
  readme: (
    <Tile from="#f5f5f5" to="#cfcfcf">
      <g stroke="#5a5a5a">
        <path d="M16 14h16M16 20h16M16 26h10M16 32h13" />
      </g>
    </Tile>
  ),
  experience: (
    <Tile from="#8f6bd8" to="#5b3fb0">
      <path d="M24 13v14M18 21l6 6 6-6" />
      <path d="M14 34h20" />
    </Tile>
  ),
  projects: (
    <Tile from="#7cb9f2" to="#2d7fd6">
      <path d="M12 17a2 2 0 012-2h7l3 3h10a2 2 0 012 2v12a2 2 0 01-2 2H14a2 2 0 01-2-2z" fill="rgba(255,255,255,0.25)" />
    </Tile>
  ),
  skills: (
    <Tile from="#5fd08a" to="#2e9a57">
      <path d="M12 30l6-7 5 4 6-9 7 6" />
      <path d="M12 36h24" />
    </Tile>
  ),
  terminal: (
    <Tile from="#4a1b3f" to="#2b0a24">
      <path d="M14 18l6 6-6 6" />
      <path d="M23 31h10" />
    </Tile>
  ),
  mail: (
    <Tile from="#5ac8fa" to="#1f8ed1">
      <rect x="12" y="15" width="24" height="18" rx="3" />
      <path d="M13 17l11 8 11-8" />
    </Tile>
  ),
  game: (
    <Tile from="#ffd34d" to="#f29b1d">
      <ellipse cx="24" cy="27" rx="6" ry="8" fill="rgba(255,255,255,0.25)" />
      <path d="M24 19v16M18 24h-5M18 30h-5M30 24h5M30 30h5M20 17l-2-3M28 17l2-3" />
    </Tile>
  ),
  settings: (
    <Tile from="#9a9a9a" to="#5f5f5f">
      <circle cx="24" cy="24" r="4" />
      <path d="M24 12v4M24 32v4M12 24h4M32 24h4M15.5 15.5l2.8 2.8M29.7 29.7l2.8 2.8M15.5 32.5l2.8-2.8M29.7 18.3l2.8-2.8" />
    </Tile>
  ),
  resume: (
    <Tile from="#ff6b6b" to="#d63a3a">
      <path d="M17 12h10l6 6v16a2 2 0 01-2 2H17a2 2 0 01-2-2V14a2 2 0 012-2z" />
      <path d="M27 12v6h6M19 26h10M19 31h7" />
    </Tile>
  ),
  trash: (
    <Tile from="#b8b8b8" to="#7a7a7a">
      <path d="M14 17h20M20 17v-3h8v3M16.5 17l1.5 18h12l1.5-18" />
    </Tile>
  ),
} as const;
