"use client";

import Image from "next/image";
import { education, profile } from "@/data/resume";
import { useOS } from "../context";
import { IconDownload, IconGithub, IconLinkedin, IconMail } from "../icons";
import { Button, Chip, LinkButton, SectionTitle } from "../ui";

export default function About() {
  const { openApp } = useOS();
  return (
    <div className="@container h-full overflow-auto os-scroll">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 p-5 @md:p-8">
        <div className="flex flex-col items-center gap-5 text-center @lg:flex-row @lg:text-left">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-accent/70">
            <Image
              src={profile.photo}
              alt={`Photo of ${profile.name}`}
              fill
              sizes="112px"
              className="object-cover object-[50%_40%]"
              priority
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-bold @md:text-3xl">{profile.name}</h2>
            <p className="text-accent font-medium">{profile.title}</p>
            <p className="mt-1 text-sm text-muted">{profile.location}</p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-500" /> {profile.status}
            </div>
          </div>
        </div>

        <p className="leading-relaxed text-fg/90">{profile.summary}</p>

        <div className="grid grid-cols-1 gap-3 @sm:grid-cols-3">
          {profile.highlights.map((h) => (
            <div key={h.label} className="rounded-xl border border-line bg-surface-2 p-4">
              <div className="text-2xl font-bold text-accent">{h.value}</div>
              <div className="text-sm text-muted">{h.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 @lg:justify-start">
          <Button variant="accent" onClick={() => openApp("mail")}>
            <IconMail className="h-4 w-4" /> Contact me
          </Button>
          <LinkButton href={profile.resumePdf} download>
            <IconDownload className="h-4 w-4" /> Resume PDF
          </LinkButton>
          <LinkButton href={profile.links.github} external>
            <IconGithub className="h-4 w-4" /> GitHub
          </LinkButton>
          <LinkButton href={profile.links.linkedin} external>
            <IconLinkedin className="h-4 w-4" /> LinkedIn
          </LinkButton>
        </div>

        <div className="rounded-xl border border-line bg-surface-2 p-4">
          <SectionTitle>Education</SectionTitle>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h4 className="font-semibold">{education.school}</h4>
            <span className="text-sm text-muted">{education.period}</span>
          </div>
          <p className="text-sm text-fg/80">{education.degree}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {education.courses.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted">
          Fun fact: this whole OS was built with Next.js. No real kernels were harmed.
        </p>
      </div>
    </div>
  );
}
