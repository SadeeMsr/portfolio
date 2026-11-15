import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SITE_URL, profile, projectByPage, projects, workPath } from "@/data/resume";
import { DeviceShowcase } from "@/components/devices";
import { ProjectLinks, ProjectStory } from "@/components/ProjectStory";
import { ProShell, ProTopBar } from "@/pro/ProPage";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.page ?? p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectByPage(slug);
  if (!p) return {};
  const title = `${p.name} · case study`;
  const description = p.tagline;
  return {
    title: { absolute: `${title} · ${profile.name}` },
    description,
    alternates: { canonical: `${SITE_URL}${workPath(p)}` },
    openGraph: { title, description, type: "article", url: `${SITE_URL}${workPath(p)}`, images: [{ url: p.shots.desktop }] },
    twitter: { card: "summary_large_image", title, description, images: [p.shots.desktop] },
  };
}

const FullPortfolioButton = ({ big = false }: { big?: boolean }) => (
  <Link
    href="/pro"
    className={`inline-flex items-center gap-2 rounded-lg bg-accent font-semibold text-accent-fg shadow-lg shadow-accent/25 transition hover:brightness-110 ${
      big ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"
    }`}
  >
    See the full portfolio <span aria-hidden>→</span>
  </Link>
);

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectByPage(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const more = [1, 2, 3].map((k) => projects[(i + k) % projects.length]);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <ProShell>
      <div className="min-h-screen overflow-x-clip bg-bg text-fg">
        <ProTopBar offPage />

        {/* who this is: for visitors landing straight from a resume link */}
        <div className="border-b border-line bg-surface-2/40 pt-16">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-5 py-3 md:px-8">
            <Link href="/pro" className="flex items-center gap-3">
              <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-accent/50">
                <Image src={profile.photo} alt={profile.name} fill sizes="36px" className="object-cover object-[50%_35%]" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold">{profile.name}</span>
                <span className="block text-xs text-muted">{profile.title}</span>
              </span>
            </Link>
            <span className="hidden items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> AI-native engineer
            </span>
            <span className="ml-auto flex items-center gap-2">
              <a href={profile.resumePdf} download className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium hover:bg-hover">
                Résumé
              </a>
              <FullPortfolioButton />
            </span>
          </div>
        </div>

        {/* hero */}
        <section style={{ background: `radial-gradient(90% 70% at 50% 0%, ${p.color}45, transparent 70%)` }}>
          <div className="mx-auto max-w-6xl px-5 pt-6 md:px-8 md:pt-10">
            <Link href="/pro/work" className="text-sm text-muted hover:text-fg">
              ← All case studies
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

          {/* keep them going: into the full portfolio */}
          <section className="relative mt-16 overflow-hidden rounded-3xl border border-accent/30 bg-surface-2/50 p-6 md:p-10">
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <p className="relative text-xs font-semibold tracking-[0.2em] text-accent uppercase">Keep exploring</p>
            <h2 className="relative mt-2 text-2xl font-bold tracking-tight md:text-3xl">This is one of {projects.length} projects.</h2>
            <p className="relative mt-2 max-w-lg text-muted">
              See how I work with AI, the rest of my production work, my experience and how to reach me.
            </p>
            <div className="relative mt-6 flex flex-wrap gap-3">
              <FullPortfolioButton big />
              <a href={`mailto:${profile.email}`} className="inline-flex items-center rounded-lg border border-line px-6 py-3 font-semibold hover:bg-hover">
                Email me
              </a>
            </div>
            <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
              {more.map((m) => (
                <Link key={m.slug} href={workPath(m)} className="group overflow-hidden rounded-xl border border-line bg-bg/60 transition-colors hover:border-accent/60">
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    <Image src={m.shots.desktop} alt={m.name} fill sizes="(max-width: 640px) 90vw, 260px" className="object-cover object-top transition-transform duration-300 group-hover:scale-105" />
                  </span>
                  <span className="block p-3">
                    <span className="block text-sm font-semibold group-hover:text-accent">{m.name}</span>
                    <span className="line-clamp-1 block text-xs text-muted">{m.tagline}</span>
                  </span>
                </Link>
              ))}
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

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row md:px-8">
            <span>
              © {profile.name} · {profile.title}
            </span>
            <Link href="/pro" className="font-medium text-accent hover:underline">
              rohanships.com/pro →
            </Link>
          </div>
        </footer>
      </div>
    </ProShell>
  );
}
