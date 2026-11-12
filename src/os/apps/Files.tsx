"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/resume";
import { IconBack, IconExternal, IconGithub } from "../icons";
import { Chip, LinkButton } from "../ui";
import { TrashView } from "./Trash";

type Place = "projects" | "research" | "trash";

const PLACES: { id: Place; label: string; icon: string }[] = [
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "research", label: "Research", icon: "🔬" },
  { id: "trash", label: "Trash", icon: "🗑️" },
];

function Folder({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 52" className="h-14 w-16" aria-hidden>
      <path d="M2 8a4 4 0 014-4h16l6 6h30a4 4 0 014 4v32a4 4 0 01-4 4H6a4 4 0 01-4-4z" fill={color} opacity="0.85" />
      <path d="M2 18a4 4 0 014-4h52a4 4 0 014 4v28a4 4 0 01-4 4H6a4 4 0 01-4-4z" fill={color} />
      <path d="M2 18a4 4 0 014-4h52a4 4 0 014 4v4H2z" fill="#fff" opacity="0.18" />
    </svg>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="mx-auto max-w-2xl p-5 @md:p-7">
      <button type="button" onClick={onBack} className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
        <IconBack className="h-4 w-4" /> Back
      </button>
      <div className="flex items-center gap-4">
        <Folder color={project.color} />
        <div>
          <h2 className="text-xl font-bold">{project.name}</h2>
          <p className="text-sm text-muted">
            {project.tagline} · {project.year}
          </p>
        </div>
      </div>
      <ul className="mt-5 space-y-2 text-sm leading-relaxed">
        {project.points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.color }} />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.url && (
          <LinkButton href={project.url} external variant="accent">
            <IconExternal className="h-4 w-4" /> Visit live site
          </LinkButton>
        )}
        {project.repo && (
          <LinkButton href={project.repo} external>
            <IconGithub className="h-4 w-4" /> View on GitHub
          </LinkButton>
        )}
        {!project.url && !project.repo && (
          <p className="text-xs text-muted">Private client project: the code lives behind an NDA, not in a drawer.</p>
        )}
      </div>
    </div>
  );
}

export default function Files({ initialPlace = "projects" }: { initialPlace?: Place }) {
  const [place, setPlace] = useState<Place>(initialPlace);
  const [open, setOpen] = useState<string | null>(null);

  const list = projects.filter((p) => (place === "research" ? p.kind === "research" : p.kind === "project"));
  const selected = projects.find((p) => p.slug === open);

  return (
    <div className="@container flex h-full flex-col @xl:flex-row">
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
            <p className="mb-3 px-1 font-mono text-xs text-muted">~/{place}</p>
            <div className="grid grid-cols-2 gap-2 @md:grid-cols-3 @3xl:grid-cols-4">
              {list.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setOpen(p.slug)}
                  className="flex flex-col items-center gap-1 rounded-xl p-3 text-center hover:bg-hover focus-visible:bg-accent/15 focus-visible:outline-none"
                >
                  <Folder color={p.color} />
                  <span className="text-sm leading-tight font-medium">{p.name}</span>
                  <span className="line-clamp-2 text-xs text-muted">{p.tagline}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
