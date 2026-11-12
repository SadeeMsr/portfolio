"use client";

import { useState } from "react";
import { Button } from "../ui";

const ITEMS = [
  { name: "jquery-spaghetti-2019.js", note: "It worked. Nobody knew why." },
  { name: "final_FINAL_v3_real.psd", note: "There was a v4." },
  { name: "my-first-todo-app/", note: "Had 0 todos. Peak productivity." },
  { name: "sleep-schedule.txt", note: "File is empty." },
  { name: "console.log('here').js", note: "Debugging, artisanal edition." },
];

export function TrashView() {
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-mono text-xs text-muted">~/.local/share/Trash</p>
        <Button onClick={() => setMsg("Some things can't be deleted. Like node_modules.")}>Empty Trash</Button>
      </div>
      {msg && <p className="anim-pop mb-3 rounded-lg bg-accent/15 px-3 py-2 text-sm text-accent">{msg}</p>}
      <ul className="divide-y divide-line rounded-xl border border-line">
        {ITEMS.map((it) => (
          <li key={it.name} className="flex flex-wrap items-baseline justify-between gap-2 px-3 py-2.5">
            <span className="font-mono text-sm">{it.name}</span>
            <span className="text-xs text-muted">{it.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Trash() {
  return (
    <div className="h-full overflow-auto os-scroll">
      <TrashView />
    </div>
  );
}
