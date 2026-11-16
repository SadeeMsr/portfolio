"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Project, Shot } from "@/data/resume";
import { Laptop, Phone } from "./devices";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function H({ children }: { children: ReactNode }) {
  return <h4 className="mb-3 text-xs font-semibold tracking-[0.16em] text-muted uppercase">{children}</h4>;
}

export function ProjectLinks({ p, size = "md" }: { p: Project; size?: "sm" | "md" }) {
  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  return (
    <div className="flex flex-wrap gap-2">
      {p.url && (
        <a href={p.url} {...ext} className={`inline-flex items-center gap-1.5 rounded-lg bg-accent font-semibold text-accent-fg hover:brightness-110 ${pad}`}>
          {p.urlLabel ?? "Visit site"} <span aria-hidden>↗</span>
        </a>
      )}
      {p.repos?.map((r) => (
        <a key={r.url} href={r.url} {...ext} className={`inline-flex items-center gap-1.5 rounded-lg border border-line font-semibold hover:bg-hover ${pad}`}>
          {r.label} <span aria-hidden>↗</span>
        </a>
      ))}
    </div>
  );
}

function Lightbox({ shot, onClose }: { shot: Shot; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shot.label}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
    >
      <div className="flex max-h-full w-full max-w-6xl flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex w-full items-center justify-between text-white">
          <span className="font-semibold">{shot.label}</span>
          <button type="button" onClick={onClose} className="rounded-full bg-white/10 px-3 py-1 text-sm hover:bg-white/20">
            Close
          </button>
        </div>
        <div className="flex w-full items-end justify-center gap-6">
          <div className={`w-full max-w-4xl ${shot.mobile ? "hidden sm:block" : ""}`}>
            <Laptop src={shot.desktop} alt={`${shot.label}, desktop`} sizes="(max-width: 1200px) 90vw, 900px" />
          </div>
          {shot.mobile && (
            <div className="w-[min(60vw,240px)] shrink-0 sm:w-[18%]">
              <Phone src={shot.mobile} alt={`${shot.label}, mobile`} sizes="260px" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Full case study body: shared by Pro mode's modal and RohanOS's Files app. */
export function ProjectStory({ p, showLinks = true }: { p: Project; showLinks?: boolean }) {
  const [shot, setShot] = useState<Shot | null>(null);
  return (
    <div className="@container">
      <dl className="grid gap-3 text-sm @md:grid-cols-3">
        <div className="rounded-xl border border-line p-3">
          <dt className="text-xs text-muted">Role</dt>
          <dd className="mt-0.5 font-medium">{p.role}</dd>
        </div>
        <div className="rounded-xl border border-line p-3">
          <dt className="text-xs text-muted">Timeline</dt>
          <dd className="mt-0.5 font-medium">{p.timeline}</dd>
        </div>
        <div className="rounded-xl border border-line p-3">
          <dt className="text-xs text-muted">{p.client ? "Client" : p.org ? "Built at" : "Type"}</dt>
          <dd className="mt-0.5 font-medium">
            {p.client ??
              (p.org ? (
                <a href={p.org.url} {...ext} className="text-accent hover:underline">
                  {p.org.name} ↗
                </a>
              ) : p.category === "code" ? (
                "Open-source showcase"
              ) : p.category === "design" ? (
                "Design & front-end"
              ) : (
                "Own product"
              ))}
          </dd>
        </div>
      </dl>

      {showLinks && (
        <div className="mt-4">
          <ProjectLinks p={p} />
          {p.demoNote && <p className="mt-2 text-xs text-muted">Demo: {p.demoNote}</p>}
          {!p.repos && <p className="mt-2 text-xs text-muted">Private repository · code walkthrough available on request</p>}
        </div>
      )}

      {/* three stats sit in one row even on phones, so none is left orphaned */}
      {p.stats && (
        <div className={`mt-6 grid gap-2 @md:grid-cols-3 @md:gap-3 ${p.stats.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {p.stats.map((s) => (
            <div key={s.label} className="min-w-0 rounded-xl border border-line bg-surface-2/60 p-3 @md:p-4">
              <div className="text-lg font-bold tracking-tight break-words @md:text-2xl">{s.value}</div>
              <div className="text-xs text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {p.problem && (
        <section className="mt-8">
          <H>The problem</H>
          <p className="leading-relaxed text-fg/90">{p.problem}</p>
        </section>
      )}

      {p.flow && (
        <section className="mt-8">
          <H>How it flows</H>
          <ol className="grid gap-3 @lg:grid-cols-2">
            {p.flow.map((f, i) => (
              <li key={f.title} className="flex gap-3 rounded-xl border border-line p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">{i + 1}</span>
                <span>
                  <span className="block font-semibold">{f.title}</span>
                  <span className="block text-sm text-muted">{f.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="mt-8 grid gap-8 @3xl:grid-cols-2">
        <section>
          <H>What I built</H>
          <ul className="space-y-2.5 text-sm leading-relaxed">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <H>Engineering highlights</H>
          <ul className="space-y-2.5 text-sm leading-relaxed">
            {p.highlights.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span className="mt-[7px] h-1 w-3 shrink-0 rounded-full bg-accent/70" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {p.impact && (
        <section className="mt-8 rounded-xl border-l-4 border-accent bg-accent/10 p-4">
          <H>Impact</H>
          <p className="text-sm font-medium">{p.impact}</p>
        </section>
      )}

      <section className="mt-8">
        <H>Stack</H>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="rounded-md border border-line bg-hover px-2 py-0.5 font-mono text-[11px]">
              {s}
            </span>
          ))}
        </div>
      </section>

      {p.gallery && p.gallery.length > 0 && (
        <section className="mt-8">
          <H>More screens</H>
          <div className="grid grid-cols-2 gap-3 @2xl:grid-cols-3">
            {p.gallery.map((g) => (
              <button
                key={g.label}
                type="button"
                onClick={() => setShot(g)}
                className="group overflow-hidden rounded-xl border border-line text-left transition-colors hover:border-accent"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-hover">
                  <Image
                    src={g.desktop}
                    alt={g.label}
                    fill
                    sizes="(max-width: 700px) 45vw, 260px"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="block px-3 py-2 text-xs font-medium">{g.label}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {shot && createPortal(<Lightbox shot={shot} onClose={() => setShot(null)} />, document.body)}
    </div>
  );
}
