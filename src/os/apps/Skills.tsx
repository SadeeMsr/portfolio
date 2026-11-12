"use client";

import { useEffect, useState } from "react";
import { skills } from "@/data/resume";

const EXTRA = [
  { name: "coffee.service", group: "System", status: "Running", note: "Critical. Do not kill." },
  { name: "stackoverflow-tab", group: "System", status: "Running", note: "Always open." },
];

function useGraph(points = 40) {
  const [data, setData] = useState<number[]>(() => Array.from({ length: points }, (_, i) => 40 + 20 * Math.sin(i / 3)));
  useEffect(() => {
    const t = setInterval(() => {
      setData((d) => {
        const last = d[d.length - 1];
        const next = Math.max(8, Math.min(96, last + (Math.random() - 0.45) * 18));
        return [...d.slice(1), next];
      });
    }, 900);
    return () => clearInterval(t);
  }, []);
  return data;
}

function Resources() {
  const data = useGraph();
  const path = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - v}`).join(" ");
  const groups = Object.entries(
    skills.reduce<Record<string, number>>((acc, s) => ({ ...acc, [s.group]: (acc[s.group] ?? 0) + 1 }), {}),
  );
  const max = Math.max(...groups.map(([, n]) => n));
  return (
    <div className="space-y-5 p-4 @md:p-6">
      <section>
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="font-semibold">Brain usage</h3>
          <span className="font-mono text-sm text-accent">{Math.round(data[data.length - 1])}%</span>
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-32 w-full rounded-lg border border-line bg-surface-2">
          <polyline points={`0,100 ${path} 100,100`} fill="color-mix(in oklab, var(--accent) 25%, transparent)" stroke="none" />
          <polyline points={path} fill="none" stroke="var(--accent)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="mt-1 text-xs text-muted">Spikes correlate with merge conflicts.</p>
      </section>
      <section>
        <h3 className="mb-3 font-semibold">Stack by category</h3>
        <div className="space-y-2">
          {groups.map(([g, n]) => (
            <div key={g} className="grid grid-cols-[6rem_1fr_2rem] items-center gap-3 text-sm">
              <span className="text-muted">{g}</span>
              <div className="h-2.5 overflow-hidden rounded-full bg-hover">
                <div className="h-full rounded-full bg-accent" style={{ width: `${(n / max) * 100}%` }} />
              </div>
              <span className="text-right font-mono text-xs">{n}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Processes() {
  return (
    <div className="p-2 @md:p-4">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-muted">
          <tr className="border-b border-line">
            <th className="px-3 py-2 font-medium">Process</th>
            <th className="hidden px-3 py-2 font-medium @sm:table-cell">Category</th>
            <th className="px-3 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((s) => (
            <tr key={s.name} className="border-b border-line/60 hover:bg-hover">
              <td className="px-3 py-1.5 font-medium">{s.name}</td>
              <td className="hidden px-3 py-1.5 text-muted @sm:table-cell">{s.group}</td>
              <td className="px-3 py-1.5">
                {s.level === "proficient" ? (
                  <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400">
                    <span className="h-2 w-2 rounded-full bg-green-500" /> Running
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-muted">
                    <span className="h-2 w-2 rounded-full bg-muted" /> Idle (basic)
                  </span>
                )}
              </td>
            </tr>
          ))}
          {EXTRA.map((s) => (
            <tr key={s.name} className="border-b border-line/60 text-muted hover:bg-hover" title={s.note}>
              <td className="px-3 py-1.5 font-mono text-xs">{s.name}</td>
              <td className="hidden px-3 py-1.5 @sm:table-cell">{s.group}</td>
              <td className="px-3 py-1.5 text-xs">{s.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 pt-3 text-xs text-muted">
        “Running” = use it daily in production. “Idle” = solid foundations, happy to wake them up.
      </p>
    </div>
  );
}

export default function Skills() {
  const [tab, setTab] = useState<"processes" | "resources">("processes");
  return (
    <div className="@container flex h-full flex-col">
      <div className="flex shrink-0 justify-center gap-1 border-b border-line bg-sidebar p-2" role="tablist">
        {(["processes", "resources"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-1.5 text-sm capitalize ${tab === t ? "bg-surface-2 font-medium shadow-sm" : "text-muted hover:bg-hover"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-auto os-scroll">{tab === "processes" ? <Processes /> : <Resources />}</div>
    </div>
  );
}
