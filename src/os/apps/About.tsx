"use client";

import Image from "next/image";
import { education, experience, profile, projects } from "@/data/resume";
import { useOS } from "../context";
import { IconDownload, IconGithub, IconLinkedin, IconMail } from "../icons";
import { useCopyEmail } from "./Mail";

const FOCUS = [
  {
    icon: "◧",
    title: "Product front ends",
    body: "Fast, accessible interfaces and dashboards people enjoy using.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    icon: "⇄",
    title: "APIs & data",
    body: "Clean, tested back ends with solid data models and auth.",
    tags: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
  },
  {
    icon: "☁",
    title: "Cloud & shipping",
    body: "Payments, storage, video pipelines, CI and deployments.",
    tags: ["AWS", "Supabase", "Stripe", "Playwright"],
  },
];

export default function About() {
  const { openApp } = useOS();
  const { copied, copy } = useCopyEmail();
  const current = experience[0];
  const flagship = projects.find((p) => p.slug === "truckerpaperwork") ?? projects[0];

  return (
    <div className="@container h-full overflow-auto os-scroll">
      {/* cover */}
      <div className="relative h-36 overflow-hidden @md:h-44">
        <div className="wallpaper-dusk absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <pre className="absolute top-4 right-5 hidden font-mono text-[11px] leading-relaxed text-white/45 @lg:block">
          {`$ whoami\n${profile.handle} · software engineer\n$ uptime\nshipping since 2019`}
        </pre>
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-8 @md:px-8">
        {/* identity */}
        <div className="flex flex-col items-center gap-x-5 gap-y-3 text-center @lg:flex-row @lg:items-start @lg:text-left">
          <div className="relative -mt-14 h-28 w-28 shrink-0 overflow-hidden rounded-full shadow-lg ring-4 ring-surface">
            <Image
              src={profile.photo}
              alt={`Photo of ${profile.name}`}
              fill
              sizes="112px"
              className="object-cover object-[50%_40%]"
              priority
            />
          </div>
          <div className="min-w-0 flex-1 @lg:pt-3">
            <h2 className="text-2xl font-bold @md:text-3xl">{profile.name}</h2>
            <p className="font-medium text-accent">{profile.title}</p>
            <p className="text-sm text-muted">
              {profile.tagline} · {profile.location}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-700 @lg:mt-4 dark:text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {profile.status}
          </span>
        </div>

        {/* actions */}
        <div className="mt-5 flex flex-wrap justify-center gap-2 @lg:justify-start">
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-accent-fg hover:brightness-110"
          >
            <IconMail className="h-4 w-4" /> {copied ? "Email copied ✓" : "Copy email"}
          </button>
          <button
            type="button"
            onClick={() => openApp("mail")}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-hover px-3.5 py-2 text-sm font-medium hover:bg-fg/10"
          >
            Contact
          </button>
          <a
            href={profile.resumePdf}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-hover px-3.5 py-2 text-sm font-medium hover:bg-fg/10"
          >
            <IconDownload className="h-4 w-4" /> Resume
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center rounded-lg border border-line bg-hover px-2.5 py-2 hover:bg-fg/10"
          >
            <IconGithub className="h-4 w-4" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center rounded-lg border border-line bg-hover px-2.5 py-2 hover:bg-fg/10"
          >
            <IconLinkedin className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-fg/90">{profile.summary}</p>

        {/* now */}
        <button
          type="button"
          onClick={() => openApp("projects")}
          className="group mt-6 flex w-full items-center gap-4 rounded-2xl border border-line bg-surface-2 p-4 text-left transition-colors hover:border-accent/60"
        >
          {flagship.shots && (
            <span className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-line @sm:block">
              <Image src={flagship.shots.desktop} alt="" fill sizes="96px" className="object-cover object-top" />
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="text-xs font-semibold tracking-wider text-accent uppercase">Now</span>
            <span className="mt-0.5 block font-semibold">
              {current.role} · building {flagship.name}
            </span>
            <span className="block truncate text-sm text-muted">{flagship.tagline}</span>
          </span>
          <span className="text-muted transition-transform group-hover:translate-x-1">→</span>
        </button>

        {/* numbers */}
        <div className="mt-3 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface-2">
          {profile.highlights.map((h) => (
            <div key={h.label} className="p-3 text-center @md:p-4">
              <div className="text-xl font-bold text-fg @md:text-2xl">{h.value}</div>
              <div className="mt-0.5 text-[11px] leading-tight text-muted @md:text-xs">{h.label}</div>
            </div>
          ))}
        </div>

        {/* focus */}
        <h3 className="mt-8 mb-3 text-xs font-semibold tracking-wider text-muted uppercase">What I work on</h3>
        <div className="grid gap-3 @lg:grid-cols-3">
          {FOCUS.map((f) => (
            <div key={f.title} className="rounded-2xl border border-line bg-surface-2 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-lg text-accent">{f.icon}</div>
              <h4 className="mt-3 font-semibold">{f.title}</h4>
              <p className="mt-1 text-sm text-muted">{f.body}</p>
              <p className="mt-3 font-mono text-[11px] text-fg/70">{f.tags.join(" · ")}</p>
            </div>
          ))}
        </div>

        {/* journey */}
        <h3 className="mt-8 mb-3 text-xs font-semibold tracking-wider text-muted uppercase">Journey</h3>
        <ol className="space-y-0">
          {[
            ...experience.map((j) => ({ when: j.period, what: `${j.role} · ${j.company}`, url: j.url })),
            { when: education.period, what: `${education.degree} · ${education.school}`, url: undefined },
          ].map((row, i, arr) => (
            <li key={row.what} className="grid grid-cols-[1rem_1fr] gap-3">
              <span className="relative flex justify-center">
                <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-accent" : "bg-muted/60"}`} />
                {i < arr.length - 1 && <span className="absolute top-5 bottom-0 w-px bg-line" />}
              </span>
              <span className="pb-4">
                {row.url ? (
                  <a href={row.url} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium hover:text-accent">
                    {row.what} ↗
                  </a>
                ) : (
                  <span className="block text-sm font-medium">{row.what}</span>
                )}
                <span className="block text-xs text-muted">{row.when}</span>
              </span>
            </li>
          ))}
        </ol>
        <button type="button" onClick={() => openApp("experience")} className="text-sm font-medium text-accent hover:underline">
          Read the full release notes →
        </button>

        <p className="mt-8 text-center text-xs text-muted">Fun fact: this whole OS is a Next.js app. No real kernels were harmed.</p>
      </div>
    </div>
  );
}
