"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export function useNow(intervalMs = 15_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export function useMediaQuery(query: string): boolean | null {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => null,
  );
}

export const fmtTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
export const fmtTopbar = (d: Date) =>
  `${d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}  ${fmtTime(d)}`;
export const fmtLong = (d: Date) => d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
