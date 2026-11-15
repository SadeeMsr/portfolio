"use client";

import { useState } from "react";
import { CATEGORIES, projectsBy, projects, workPath, type Project, type ProjectCategory } from "@/data/resume";
import { DeviceShowcase } from "@/components/devices";
import { ProjectStory } from "@/components/ProjectStory";
import { IconBack } from "../icons";
import { TrashView } from "./Trash";

type Place = ProjectCategory | "trash";

const PLACES: { id: Place; label: string; icon: string }[] = [
  { id: "production", label: "Production", icon: "🚀" },
  { id: "code", label: "Code", icon: "🧑‍💻" },
  { id: "design", label: "Design", icon: "🎨" },
  { id: "trash", label: "Trash", icon: "🗑️" },
];

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-accent">{children}</span>;
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="mx-auto max-w-3xl p-4 @md:p-6">
      <button type="button" onClick={onBack} className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
        <IconBack className="h-4 w-4" /> All projects
      </button>
      <div
        className="rounded-2xl px-6 pt-8 pb-5 @md:px-10"
        style={{ background: `radial-gradient(120% 90% at 50% 0%, ${project.color}40, transparent 72%)` }}
      >
        <DeviceShowcase desktop={project.shots.desktop} mobile={project.shots.mobile} name={project.name} priority laptopSizes="(max-width: 900px) 90vw, 640px" />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        {project.badge && <Badge>{project.badge}</Badge>}
      </div>
      <p className="mt-1 text-sm text-muted">{project.tagline}</p>
      <a href={workPath(project)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-medium text-accent hover:underline">
        Open full case study page ↗
      </a>
      {project.video && (
        <video
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          aria-label={`${project.name} product demo`}
          className="mt-5 w-full rounded-xl border border-line bg-black"
        />
      )}
      <div className="mt-6">
        <ProjectStory p={project} />
      </div>
    </div>
  );
}

export default function Files({ initialPlace = "production" }: { initialPlace?: Place }) {
  const [place, setPlace] = useState<Place>(initialPlace);
  const [open, setOpen] = useState<string | null>(null);

  const list = place === "trash" ? [] : projectsBy(place);
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
              {pl.id !== "trash" && <span className="ml-auto text-xs text-muted">{projectsBy(pl.id).length}</span>}
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
              <div className="mb-4 px-1">
                <p className="font-mono text-xs text-muted">
                  ~/{place} · {list.length} {list.length === 1 ? "item" : "items"}
                </p>
                <p className="mt-0.5 text-sm text-muted">{CATEGORIES[place].blurb}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @4xl:grid-cols-3">
                {list.map((p, i) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setOpen(p.slug)}
                    className="group flex flex-col gap-3 rounded-2xl border border-transparent p-3 text-left transition-colors hover:border-line hover:bg-hover focus-visible:bg-accent/15 focus-visible:outline-none"
                  >
                    <span
                      className="block rounded-xl px-4 pt-5 pb-2 transition-transform duration-200 group-hover:-translate-y-0.5"
                      style={{ background: `radial-gradient(110% 100% at 50% 0%, ${p.color}33, transparent 75%)` }}
                    >
                      <DeviceShowcase
                        desktop={p.shots.desktop}
                        mobile={p.shots.mobile}
                        name={p.name}
                        priority={i < 2}
                        laptopSizes="(max-width: 700px) 85vw, 320px"
                      />
                    </span>
                    <span className="px-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{p.name}</span>
                        {p.badge && <Badge>{p.badge}</Badge>}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-xs text-muted">{p.tagline}</span>
                      <span className="mt-1.5 block text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                        Open case study →
                      </span>
                    </span>
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
