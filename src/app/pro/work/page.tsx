import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, SITE_URL, profile, projectsBy, workPath, type ProjectCategory } from "@/data/resume";
import { DeviceShowcase } from "@/components/devices";
import { ProShell, ProTopBar } from "@/pro/ProPage";

export const metadata: Metadata = {
  title: { absolute: `Case studies · ${profile.name}` },
  description: "Production apps, client systems and open-source work.",
  alternates: { canonical: `${SITE_URL}/pro/work` },
};

const ORDER: ProjectCategory[] = ["production", "code", "design"];

export default function WorkIndex() {
  return (
    <ProShell>
    <div className="min-h-screen overflow-x-clip bg-bg text-fg">
      <ProTopBar offPage />
      <main className="mx-auto max-w-6xl px-5 pt-28 pb-20 md:px-8 md:pt-32">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Case studies</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Things I&apos;ve built</h1>
        <p className="mt-3 max-w-2xl text-lg text-fg/80">Each project has its own page: the problem, what I built, the numbers and the screens.</p>
        <Link
          href="/pro"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg shadow-lg shadow-accent/25 hover:brightness-110"
        >
          See the full portfolio <span aria-hidden>→</span>
        </Link>

        {ORDER.map((c) => (
          <section key={c} className="mt-14">
            <div className="mb-6 flex flex-col gap-1 border-b border-line pb-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-xl font-semibold">{CATEGORIES[c].label}</h2>
              <p className="text-sm text-muted">{CATEGORIES[c].blurb}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projectsBy(c).map((p) => (
                <Link
                  key={p.slug}
                  href={workPath(p)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-2/40 transition-colors hover:border-accent/60"
                >
                  <span
                    className="block px-5 pt-6 pb-2 transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ background: `radial-gradient(110% 100% at 50% 0%, ${p.color}33, transparent 75%)` }}
                  >
                    <DeviceShowcase desktop={p.shots.desktop} mobile={p.shots.mobile} name={p.name} laptopSizes="(max-width: 768px) 85vw, 360px" />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-semibold">{p.name}</span>
                      {p.badge && <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold text-accent">{p.badge}</span>}
                    </span>
                    <span className="mt-1 text-sm text-muted">{p.tagline}</span>
                    <span className="mt-auto pt-4 font-mono text-xs text-muted group-hover:text-accent">rohanships.com{workPath(p)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
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
