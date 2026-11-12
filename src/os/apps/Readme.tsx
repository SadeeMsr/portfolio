"use client";

import { profile } from "@/data/resume";
import type { AppId } from "../apps";
import { useOS } from "../context";

const LINKS: { id: AppId; label: string; hint: string }[] = [
  { id: "about", label: "About Me", hint: "who I am" },
  { id: "experience", label: "Release Notes", hint: "work experience" },
  { id: "projects", label: "Files", hint: "projects & research" },
  { id: "terminal", label: "Terminal", hint: "try `help`" },
  { id: "game", label: "Bug Squasher", hint: "you've earned a break" },
];

export default function Readme() {
  const { openApp, mode } = useOS();
  return (
    <div className="h-full overflow-auto os-scroll bg-surface-2">
      <article className="mx-auto max-w-2xl p-6 font-mono text-sm leading-relaxed">
        <p className="text-muted"># README.md</p>
        <h1 className="mt-2 font-sans text-2xl font-bold">
          Welcome to Rohan<span className="text-accent">OS</span> 👋
        </h1>
        <p className="mt-3 font-sans text-base">
          I’m <strong>{profile.name}</strong>, a {profile.title.toLowerCase()} from {profile.location}. This portfolio is a
          tiny operating system. Everything you see is an app you can open.
        </p>

        <p className="mt-5 text-muted">## Quick start</p>
        <ul className="mt-2 space-y-1.5">
          {LINKS.map((l) => (
            <li key={l.id}>
              <span className="text-muted">- </span>
              <button type="button" onClick={() => openApp(l.id)} className="text-accent underline-offset-2 hover:underline">
                {l.label}
              </button>
              <span className="text-muted"> · {l.hint}</span>
            </li>
          ))}
          <li>
            <span className="text-muted">- </span>
            <a href="/resume" className="text-accent underline-offset-2 hover:underline">
              Recruiter Mode
            </a>
            <span className="text-muted"> · in a hurry? one plain page, no fun allowed</span>
          </li>
        </ul>

        <p className="mt-5 text-muted">## Tips</p>
        <ul className="mt-2 space-y-1.5 text-fg/80">
          {mode === "desktop" ? (
            <>
              <li>- Drag windows by their title bar. Double-click to maximise.</li>
              <li>- Drag a window to a screen edge to snap it.</li>
              <li>
                - Press <kbd className="rounded border border-line px-1">Super</kbd> or click <em>Activities</em> to search.
              </li>
              <li>- Right-click the desktop. Just to see.</li>
            </>
          ) : (
            <>
              <li>- Tap an app to open it. Swipe up the bottom bar to go home.</li>
              <li>- Pull down the status bar for quick settings.</li>
            </>
          )}
        </ul>
        <p className="mt-6 text-muted">
          <span className="cursor-blink">▍</span>
        </p>
      </article>
    </div>
  );
}
