"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { projects, type Project } from "@/data/resume";
import { IconBack, IconExternal, IconGithub } from "../icons";
import { Chip, LinkButton } from "../ui";
import { TrashView } from "./Trash";

type Place = "projects" | "side" | "research" | "trash";

const PLACES: { id: Place; label: string; icon: string }[] = [
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "side", label: "Side projects", icon: "🧪" },
  { id: "research", label: "Research", icon: "🔬" },
  { id: "trash", label: "Trash", icon: "🗑️" },
];

function Folder({ color, className = "h-14 w-16" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 52" className={className} aria-hidden>
      <path d="M2 8a4 4 0 014-4h16l6 6h30a4 4 0 014 4v32a4 4 0 01-4 4H6a4 4 0 01-4-4z" fill={color} opacity="0.85" />
      <path d="M2 18a4 4 0 014-4h52a4 4 0 014 4v28a4 4 0 01-4 4H6a4 4 0 01-4-4z" fill={color} />
      <path d="M2 18a4 4 0 014-4h52a4 4 0 014 4v4H2z" fill="#fff" opacity="0.18" />
    </svg>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-accent">{children}</span>
  );
}

/** Screenshot (or a coloured placeholder) in a small browser frame. */
function Preview({ project, sizes, priority }: { project: Project; sizes: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface-2 shadow-sm">
      <div className="flex h-5 items-center gap-1 border-b border-line bg-headerbar px-2">
        <span className="h-1.5 w-1.5 rounded-full bg-fg/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-fg/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-fg/25" />
        {project.url && (
          <span className="ml-2 truncate text-[9px] text-muted">{project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
        )}
      </div>
      <div className="relative aspect-[16/10]">
        {project.image ? (
          <Image src={project.image} alt={`${project.name} screenshot`} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        ) : (
          <div
            className="flex h-full items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${project.color}33, ${project.color}11)` }}
          >
            <Folder color={project.color} className="h-16 w-20" />
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const cs = project.caseStudy;
  return (
    <div className="mx-auto max-w-3xl p-4 @md:p-6">
      <button type="button" onClick={onBack} className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
        <IconBack className="h-4 w-4" /> All projects
      </button>

      {/* visual first */}
      {project.video ? (
        <video
          src={project.video}
          poster={project.image}
          autoPlay
          muted
          loop
          playsInline
          aria-label={`${project.name} product demo`}
          className="w-full rounded-xl border border-line bg-black shadow-sm"
        />
      ) : (
        <Preview project={project} sizes="(max-width: 900px) 100vw, 760px" priority />
      )}

      <div className="mt-5 flex flex-col gap-3 @lg:flex-row @lg:items-start @lg:justify-between">
        <div className="min-w-0">
          <h2 className="flex flex-wrap items-center gap-2 text-2xl font-bold">
            {project.name}
            {project.badge && <Badge>{project.badge}</Badge>}
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            {project.tagline} · {project.year}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          {project.url && (
            <LinkButton href={project.url} external variant="accent">
              <IconExternal className="h-4 w-4" /> {project.badge?.includes("demo") ? "Live demo" : "Visit site"}
            </LinkButton>
          )}
          {project.repo && (
            <LinkButton href={project.repo} external>
              <IconGithub className="h-4 w-4" /> Code
            </LinkButton>
          )}
        </div>
      </div>
      {project.org && (
        <p className="mt-2 text-sm text-muted">
          Built at{" "}
          <a href={project.org.url} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
            {project.org.name} ↗
          </a>
        </p>
      )}
      {!project.repo && <p className="mt-2 text-xs text-muted">Private repository · code walkthrough available on request</p>}

      {cs && (
        <div className="mt-6 grid gap-3 @lg:grid-cols-2">
          {[
            ["The problem", cs.problem],
            ["What I built", cs.solution],
            ["My role", cs.role],
            ["Outcome", cs.outcome],
          ].map(([k, v]) => (
            <section key={k} className="rounded-xl border border-line bg-surface-2 p-4">
              <h3 className="mb-1 text-xs font-semibold tracking-wider text-accent uppercase">{k}</h3>
              <p className="text-sm leading-relaxed">{v}</p>
            </section>
          ))}
        </div>
      )}

      <h3 className="mt-6 mb-2 text-xs font-semibold tracking-wider text-muted uppercase">{cs ? "Highlights" : "About"}</h3>
      <ul className="space-y-2 text-sm leading-relaxed">
        {project.points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.color }} />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <h3 className="mt-6 mb-2 text-xs font-semibold tracking-wider text-muted uppercase">Stack</h3>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
    </div>
  );
}

export default function Files({ initialPlace = "projects" }: { initialPlace?: Place }) {
  const [place, setPlace] = useState<Place>(initialPlace);
  const [open, setOpen] = useState<string | null>(null);

  const list = projects.filter((p) => p.kind === (place === "projects" ? "project" : place));
  const selected = projects.find((p) => p.slug === open);

  return (
    <div className="@container h-full">
    <div className="flex h-full flex-col @xl:flex-row">
      <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-sidebar p-2 @xl:w-44 @xl:flex-col @xl:border-r @xl:border-b-0">
        {PLACES.map((pl) => (
          <button
            key={pl.id}
            type="button"
            onClick={() => {
              setPlace(pl.id);
              setOpen(null);
            }}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm whitespace-nowrap ${
              place === pl.id ? "bg-accent/15 font-medium text-accent" : "hover:bg-hover"
            }`}
          >
            <span aria-hidden>{pl.icon}</span> {pl.label}
          </button>
        ))}
      </nav>

      <div className="min-h-0 flex-1 overflow-auto os-scroll">
        {place === "trash" ? (
          <TrashView />
        ) : selected ? (
          <ProjectDetail project={selected} onBack={() => setOpen(null)} />
        ) : (
          <div className="p-4">
            <p className="mb-3 px-1 font-mono text-xs text-muted">
              ~/{place} · {list.length} {list.length === 1 ? "item" : "items"}
            </p>
            <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @4xl:grid-cols-3">
              {list.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setOpen(p.slug)}
                  className="group flex flex-col gap-2.5 rounded-2xl p-2 text-left transition-colors hover:bg-hover focus-visible:bg-accent/15 focus-visible:outline-none"
                >
                  <div className="transition-transform duration-200 group-hover:-translate-y-0.5">
                    <Preview project={p} sizes="(max-width: 700px) 100vw, 360px" priority={i < 2} />
                  </div>
                  <div className="px-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{p.name}</span>
                      {p.badge && <Badge>{p.badge}</Badge>}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted">{p.tagline}</p>
                    <p className="mt-1.5 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      {p.caseStudy ? "Open case study →" : "View details →"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
