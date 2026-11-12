"use client";

import { useEffect, useState } from "react";
import { RohanLogo } from "../icons";

const ENTRIES = [
  "RohanOS 2.0 LTS",
  "RohanOS 2.0 LTS (Recruiter Mode)",
  "Advanced options for RohanOS",
  "UEFI Firmware Settings",
];

const LOG = [
  "Mounting /home/rohan/education (2019–2024)…",
  "Loading experience from Doodle Inc. and Spade Digital…",
  "Starting coffee.service…",
  "Compiling 2+ years of production experience…",
  "Resolving node_modules (this may take a lifetime)…",
  "Welcome.",
];

export function Boot({ onDone, onRecruiter }: { onDone: () => void; onRecruiter: () => void }) {
  const [stage, setStage] = useState<"grub" | "splash">("grub");
  const [sel, setSel] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [note, setNote] = useState<string | null>(null);
  const [logIdx, setLogIdx] = useState(0);

  const choose = (i: number) => {
    if (i === 1) return onRecruiter();
    if (i === 2) {
      setNote("No advanced options here. Just clean code and good intentions. Booting normally…");
      setTimeout(() => setStage("splash"), 1400);
      return;
    }
    if (i === 3) {
      setNote("Firmware settings are locked. The firmware is caffeine. Booting normally…");
      setTimeout(() => setStage("splash"), 1400);
      return;
    }
    setStage("splash");
  };

  // GRUB countdown
  useEffect(() => {
    if (stage !== "grub" || countdown < 0 || note) return;
    if (countdown === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- countdown finished
      setStage("splash");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, stage, note]);

  // keyboard
  useEffect(() => {
    if (stage !== "grub") return;
    const onKey = (e: KeyboardEvent) => {
      setCountdown(-1); // any key stops the timer, like the real thing
      if (e.key === "ArrowDown") setSel((s) => (s + 1) % ENTRIES.length);
      else if (e.key === "ArrowUp") setSel((s) => (s - 1 + ENTRIES.length) % ENTRIES.length);
      else if (e.key === "Enter") choose(sel);
      else if (e.key === "Escape") onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // splash log
  useEffect(() => {
    if (stage !== "splash") return;
    if (logIdx >= LOG.length - 1) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLogIdx((i) => i + 1), 340);
    return () => clearTimeout(t);
  }, [stage, logIdx, onDone]);

  if (stage === "splash") {
    return (
      <div className="anim-fade fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#140611] text-white" onClick={onDone}>
        <RohanLogo size={96} />
        <p className="mt-5 text-2xl font-light tracking-wide">
          Rohan<span className="font-bold text-accent">OS</span>
        </p>
        <svg className="mt-10 h-8 w-8 animate-[spin_0.9s_linear_infinite]" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="3" />
          <path d="M12 3a9 9 0 019 9" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <p className="mt-6 h-5 font-mono text-xs text-white/60">{LOG[logIdx]}</p>
        <p className="absolute bottom-6 text-xs text-white/30">click to skip</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#2c001e] p-6 font-mono text-[15px] text-white/90 md:p-12">
      <p className="text-center">GNU GRUB-ish version 2.0 (RohanOS edition)</p>
      <div className="mx-auto mt-6 w-full max-w-3xl border border-white/70 p-1">
        {ENTRIES.map((e, i) => (
          <button
            key={e}
            type="button"
            onMouseEnter={() => {
              setSel(i);
              setCountdown(-1);
            }}
            onClick={() => choose(i)}
            className={`block w-full px-2 py-0.5 text-left ${sel === i ? "bg-white text-[#2c001e]" : ""}`}
          >
            {i === 2 ? "*" : " "}
            {e}
          </button>
        ))}
        <div className="h-40" />
      </div>
      <div className="mx-auto mt-4 w-full max-w-3xl text-sm text-white/80">
        {note ? (
          <p className="text-[#fce94f]">{note}</p>
        ) : (
          <>
            <p>Use the ↑ and ↓ keys (or your mouse) to select which entry is highlighted.</p>
            <p>Press enter to boot the selected OS, Esc to skip straight to the desktop.</p>
            {countdown >= 0 && <p className="mt-2">The highlighted entry will be executed automatically in {countdown}s.</p>}
          </>
        )}
      </div>
    </div>
  );
}
