import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { education, experience, profile, projects, skills } from "@/data/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: `${profile.name}, ${profile.title}. Experience, projects, skills and education on one page.`,
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 border-b border-line pb-1 text-sm font-bold tracking-widest text-accent uppercase">{children}</h2>;
}

export default function ResumePage() {
  const pro = skills.filter((s) => s.level === "proficient").map((s) => s.name);
  const basic = skills.filter((s) => s.level === "basic").map((s) => s.name);
  return (
    <div className="min-h-full bg-bg text-fg print:bg-white print:text-black">
      <nav className="sticky top-0 z-10 border-b border-line bg-surface/90 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2.5 text-sm">
          <Link href="/" className="rounded-lg px-2 py-1 hover:bg-hover">
            ← Back to Rohan<span className="text-accent">OS</span>
          </Link>
          <span className="ml-auto hidden text-xs text-muted sm:inline">Recruiter Mode: no fun detected</span>
          <a href={profile.resumePdf} download className="rounded-lg bg-accent px-3 py-1.5 font-medium text-accent-fg hover:brightness-110">
            Download PDF
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <header className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full print:hidden">
            <Image src={profile.photo} alt={profile.name} fill sizes="96px" className="object-cover object-[50%_40%]" priority />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-lg text-accent">{profile.title}</p>
            <p className="mt-1 text-sm text-muted">
              {profile.location} ·{" "}
              <a className="underline-offset-2 hover:underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>{" "}
              ·{" "}
              <a className="underline-offset-2 hover:underline" href={profile.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>{" "}
              ·{" "}
              <a className="underline-offset-2 hover:underline" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
          </div>
        </header>

        <p className="mt-8 leading-relaxed">{profile.summary}</p>

        <section className="mt-10">
          <H2>Experience</H2>
          <div className="space-y-7">
            {experience.map((j) => (
              <article key={j.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">
                    {j.role}, {j.company}
                  </h3>
                  <span className="text-sm text-muted">{j.period}</span>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed marker:text-accent">
                  {j.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <H2>Projects & Research</H2>
          <div className="space-y-7">
            {projects
              .filter((p) => p.slug !== "barnyard-recs" && p.slug !== "wozaef")
              .map((p) => (
                <article key={p.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-semibold">
                      {p.url || p.repo ? (
                        <a href={p.url ?? p.repo} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                          {p.name} ↗
                        </a>
                      ) : (
                        p.name
                      )}
                    </h3>
                    <span className="text-sm text-muted">{p.year}</span>
                  </div>
                  <p className="text-xs text-muted">{p.stack.join(" · ")}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed marker:text-accent">
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </article>
              ))}
          </div>
        </section>

        <section className="mt-10">
          <H2>Skills</H2>
          <p className="text-sm">
            <span className="font-semibold">Proficient:</span> {pro.join(", ")}
          </p>
          <p className="mt-1 text-sm">
            <span className="font-semibold">Basic:</span> {basic.join(", ")}
          </p>
        </section>

        <section className="mt-10">
          <H2>Education</H2>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-semibold">{education.school}</h3>
            <span className="text-sm text-muted">{education.period}</span>
          </div>
          <p className="text-sm">{education.degree}</p>
          <p className="mt-2 text-xs text-muted">Relevant courses: {education.courses.join(", ")}</p>
        </section>
      </main>
    </div>
  );
}
