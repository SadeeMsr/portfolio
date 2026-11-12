"use client";

import { education, experience } from "@/data/resume";
import { Chip } from "../ui";

export default function Experience() {
  return (
    <div className="@container h-full overflow-auto os-scroll">
      <div className="mx-auto max-w-3xl p-5 @md:p-8">
        <header className="mb-6 flex items-start gap-3 rounded-xl border border-line bg-surface-2 p-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400">
            ✓
          </div>
          <div>
            <h2 className="font-semibold">Your career is up to date</h2>
            <p className="text-sm text-muted">
              Release notes for every major version. Next release: <span className="text-accent">waiting on your team</span>.
            </p>
          </div>
        </header>

        <ol className="relative border-l-2 border-line pl-6">
          {experience.map((job, i) => (
            <li key={job.company} className="mb-8">
              <span
                className={`absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-surface ${i === 0 ? "bg-accent" : "bg-muted"}`}
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-accent/15 px-2 py-0.5 font-mono text-xs font-semibold text-accent">
                  v{job.version}
                </span>
                <span className="text-xs text-muted">codename “{job.codename}”</span>
              </div>
              <h3 className="mt-1.5 text-lg font-semibold">
                {job.role} · <span className="text-fg/80">{job.company}</span>
              </h3>
              <p className="text-sm text-muted">
                {job.period} · {job.location}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-fg/90">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </li>
          ))}
          <li>
            <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-surface bg-muted/60" />
            <span className="rounded-md bg-hover px-2 py-0.5 font-mono text-xs font-semibold text-muted">v0.x beta</span>
            <h3 className="mt-1.5 text-lg font-semibold">{education.degree}</h3>
            <p className="text-sm text-muted">
              {education.school} · {education.period}
            </p>
            <p className="mt-2 text-sm text-fg/80">Compiled the fundamentals. Fixed many segfaults. Graduated.</p>
          </li>
        </ol>
      </div>
    </div>
  );
}
