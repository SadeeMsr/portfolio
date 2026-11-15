"use client";

import { useEffect, useState } from "react";
import { RohanLogo } from "../icons";

const LOG = [
  "Mounting /home/rohan/experience…",
  "Starting coffee.service…",
  "Loading projects…",
  "Welcome.",
];

/** Short boot splash shown once per session when entering RohanOS. Click or any key skips it. */
export function Boot({ onDone }: { onDone: () => void }) {
  const [logIdx, setLogIdx] = useState(0);

  useEffect(() => {
    if (logIdx >= LOG.length - 1) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLogIdx((i) => i + 1), 320);
    return () => clearTimeout(t);
  }, [logIdx, onDone]);

  useEffect(() => {
    const skip = () => onDone();
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [onDone]);

  return (
    <div
      className="anim-fade fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#140611] text-white"
      onClick={onDone}
    >
      <RohanLogo size={88} />
      <p className="mt-5 text-2xl font-light tracking-wide">
        Rohan<span className="font-bold text-accent">OS</span>
      </p>
      <svg className="mt-9 h-7 w-7 animate-[spin_0.9s_linear_infinite]" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="3" />
        <path d="M12 3a9 9 0 019 9" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <p className="mt-6 h-5 font-mono text-xs text-white/60">{LOG[logIdx]}</p>
      <p className="absolute bottom-6 text-xs text-white/30">click to skip</p>
    </div>
  );
}
