import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SITE_URL, profile, projectByPage, projects, workPath } from "@/data/resume";
import { DeviceShowcase } from "@/components/devices";
import { ProjectLinks, ProjectStory } from "@/components/ProjectStory";
import { WorkFooter, WorkHeader } from "@/work/WorkChrome";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.page ?? p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectByPage(slug);
  if (!p) return {};
  const title = `${p.name} · case study`;
  const description = `${p.tagline}. ${p.role}.`;
  return {
    title: { absolute: `${title} · ${profile.name}` },
    description,
    alternates: { canonical: `${SITE_URL}${workPath(p)}` },
    openGraph: { title, description, type: "article", url: `${SITE_URL}${workPath(p)}`, images: [{ url: p.shots.desktop }] },
    twitter: { card: "summary_large_image", title, description, images: [p.shots.desktop] },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectByPage(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <div className="min-h-screen overflow-x-clip bg-bg text-fg">
      <WorkHeader />

      {/* hero */}
      <section style={{ background: `radial-gradient(90% 70% at 50% 0%, ${p.color}45, transparent 70%)` }}>
        <div className="mx-auto max-w-6xl px-5 pt-8 md:px-8 md:pt-12">
          <Link href="/work" className="text-sm text-muted hover:text-fg">
            ← All work
          </Link>
          <div className="mx-auto mt-8 max-w-4xl">
            <DeviceShowcase desktop={p.shots.desktop} mobile={p.shots.mobile} name={p.name} priority laptopSizes="(max-width: 1024px) 90vw, 860px" />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-5 pt-12 pb-20 md:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">{CATEGORIES[p.category].label}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{p.name}</h1>
          {p.badge && (
            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold whitespace-nowrap text-accent">{p.badge}</span>
          )}
        </div>
        <p className="mt-3 text-lg text-fg/80 md:text-xl">{p.tagline}</p>
        <div className="mt-6">
          <ProjectLinks p={p} />
          {p.demoNote && <p className="mt-2 text-xs text-muted">Demo: {p.demoNote}</p>}
          {!p.repos && <p className="mt-2 text-xs text-muted">Private repository · code walkthrough available on request</p>}
        </div>

        {p.video && (
          <video
            src={p.video}
            autoPlay
            muted
            loop
            playsInline
            aria-label={`${p.name} product demo`}
            className="mt-10 w-full rounded-2xl border border-line bg-black"
          />
        )}

        <div className="mt-10">
          <ProjectStory p={p} showLinks={false} />
        </div>

        {/* next steps */}
        <section className="mt-16 rounded-3xl border border-line bg-surface-2/50 p-6 text-center md:p-10">
          <h2 className="text-2xl font-bold tracking-tight">Want something like this built?</h2>
          <p className="mx-auto mt-2 max-w-md text-muted">I&apos;m open to software engineering roles and selected freelance work.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg hover:brightness-110">
              Email me
            </a>
            <Link href="/pro" className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold hover:bg-hover">
              See the full portfolio
            </Link>
          </div>
        </section>

        <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="More projects">
          <Link href={workPath(prev)} className="group rounded-2xl border border-line p-4 hover:border-accent/60">
            <span className="text-xs text-muted">← Previous</span>
            <span className="mt-1 block font-semibold group-hover:text-accent">{prev.name}</span>
          </Link>
          <Link href={workPath(next)} className="group rounded-2xl border border-line p-4 text-right hover:border-accent/60">
            <span className="text-xs text-muted">Next →</span>
            <span className="mt-1 block font-semibold group-hover:text-accent">{next.name}</span>
          </Link>
        </nav>
      </main>

      <WorkFooter>
        <Link href="/work" className="hover:text-fg">
          All case studies →
        </Link>
      </WorkFooter>
    </div>
  );
}
