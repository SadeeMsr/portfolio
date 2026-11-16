"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring, type Variants } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { CATEGORIES, education, experience, profile, projects, projectsBy, skills, workPath, type Project } from "@/data/resume";
import { DeviceShowcase } from "@/components/devices";
import { ProjectLinks, ProjectStory } from "@/components/ProjectStory";
import { gmailComposeUrl, useCopyEmail } from "@/os/apps/Mail";
import { IconClose, IconDownload, IconGithub, IconLinkedin, IconMail, IconMoon } from "@/os/icons";
import { SettingsProvider, useSettings } from "@/os/settings";

/* ---------- motion presets ---------- */
const ease = [0.22, 1, 0.36, 1] as const;
const stagger: Variants = { show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const inView = { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-80px" } } as const;

/* ---------- small glyphs ---------- */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const TileIcons = {
  projects: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <path d="M3 7.5A1.5 1.5 0 014.5 6H9l2 2h8.5A1.5 1.5 0 0121 9.5v8a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5z" />
      <path d="M12 16.2s-2.6-1.5-2.6-3.2a1.4 1.4 0 012.6-.7 1.4 1.4 0 012.6.7c0 1.7-2.6 3.2-2.6 3.2z" />
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7M3 12.5h18M11 12.5v1.5h2v-1.5" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <path d="M12 2.8l7.8 4.5v9.4L12 21.2l-7.8-4.5V7.3z" />
      <circle cx="12" cy="10.2" r="2.4" />
      <path d="M8.2 16.4c.8-1.7 2.2-2.6 3.8-2.6s3 .9 3.8 2.6" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6.2L20.5 7" />
    </svg>
  ),
};
const IconSun = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} {...stroke}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </svg>
);

const NAV = [
  { id: "ai", label: "AI workflow" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/* ---------- shared bits ---------- */
export function SwitchToOS({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/os"
      aria-label="Try RohanOS, the interactive version"
      onClick={() => {
        try {
          localStorage.setItem("rohanos.mode", "os");
        } catch {
          /* ignore */
        }
      }}
      className={`group inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:-rotate-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 8h18M7 13l2 2-2 2M12 17h4M9 21h6" />
      </svg>
      <span className={compact ? "hidden sm:inline" : ""}>Try RohanOS</span>
    </Link>
  );
}

function Section({ id, n, title, kicker, children }: { id: string; n: string; title: string; kicker?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 py-20 md:py-28">
      <motion.header variants={stagger} {...inView} className="mb-10 flex items-end gap-4 md:mb-14">
        <motion.span
          variants={rise}
          className="font-mono text-6xl leading-none font-bold text-fg/10 select-none md:text-8xl"
          aria-hidden
        >
          {n}
        </motion.span>
        <div className="pb-1 md:pb-2">
          {kicker && (
            <motion.p variants={rise} className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              {kicker}
            </motion.p>
          )}
          <motion.h2 variants={rise} className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </motion.h2>
        </div>
      </motion.header>
      {children}
    </section>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-md border border-line bg-hover px-2 py-0.5 font-mono text-[11px] text-fg/80">{children}</span>;
}

/* ---------- top bar ---------- */
/** offPage: used on /pro/work pages, where section links jump back to /pro */
export function ProTopBar({ offPage = false }: { offPage?: boolean }) {
  const { resolvedTheme, set } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color] duration-300 ${
        scrolled ? "glass border-b border-line bg-bg/95" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 md:px-8">
        {offPage ? (
          <Link href="/pro" className="text-lg font-bold tracking-tight">
            rohan<span className="text-accent">.</span>
          </Link>
        ) : (
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-lg font-bold tracking-tight">
            rohan<span className="text-accent">.</span>
          </button>
        )}
        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {NAV.map((n) =>
            offPage ? (
              <Link
                key={n.id}
                href={`/pro#${n.id}`}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-hover hover:text-fg"
              >
                {n.label}
              </Link>
            ) : (
              <button
                key={n.id}
                type="button"
                onClick={() => scrollTo(n.id)}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-hover hover:text-fg"
              >
                {n.label}
              </button>
            ),
          )}
          <Link href="/pro/work" className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-hover hover:text-fg">
            Case studies
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => set({ theme: resolvedTheme === "dark" ? "light" : "dark" })}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line hover:bg-hover"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={resolvedTheme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {resolvedTheme === "dark" ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <SwitchToOS compact className="max-sm:h-9 max-sm:w-9 max-sm:justify-center max-sm:px-0" />
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-0.5 origin-left bg-accent" />
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  const { copied, copy } = useCopyEmail();
  const tiles = [
    { id: "projects", label: "Projects", sub: `${projects.length} case studies` },
    { id: "experience", label: "Experience", sub: "2+ years shipping" },
    { id: "about", label: "About me", sub: "skills & story" },
    { id: "contact", label: "Contact", sub: "let's talk" },
  ] as const;

  return (
    <section className="relative flex min-h-[100svh] items-center pt-24 pb-16">
      {/* soft background glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/20 blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative grid w-full items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={rise} className="flex items-center gap-3">
            <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-accent/50">
              <Image src={profile.photo} alt={profile.name} fill sizes="44px" className="object-cover object-[50%_35%]" priority />
            </span>
            <span className="font-semibold text-accent">Hello</span>
            <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> AI-native engineer
            </span>
          </motion.div>
          <motion.h1 variants={rise} className="mt-5 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
            I’m {profile.shortName}.
            <br />
            <span className="text-muted">{profile.title}.</span>
          </motion.h1>
          <motion.p variants={rise} className="mt-6 max-w-xl text-lg leading-relaxed text-fg/80">
            {profile.pitch}
          </motion.p>
          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={profile.resumePdf}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-fg shadow-lg shadow-accent/25"
            >
              <IconDownload className="h-4 w-4" /> Download Resume
            </motion.a>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-semibold hover:bg-hover"
            >
              <IconMail className="h-4 w-4" /> {copied ? "Email copied ✓" : "Copy email"}
            </motion.button>
          </motion.div>
          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {profile.status}
            </span>
            <span>{profile.location}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } } }}
          initial="hidden"
          animate="show"
        >
          {tiles.map((t) => (
            <motion.button
              key={t.id}
              type="button"
              variants={{ hidden: { opacity: 0, scale: 0.9, y: 20 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease } } }}
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo(t.id)}
              className="group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-line bg-surface-2/60 p-4 text-center transition-colors hover:border-accent"
            >
              <motion.span
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <motion.span
                variants={{ hover: { y: -4, rotate: -6, scale: 1.08 } }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-bg text-fg group-hover:text-accent"
              >
                {TileIcons[t.id]}
              </motion.span>
              <span className="relative">
                <span className="block font-semibold">{t.label}</span>
                <span className="block text-xs text-muted">{t.sub}</span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <motion.button
        type="button"
        aria-label="Scroll to projects"
        onClick={() => scrollTo("projects")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        ↓
      </motion.button>
    </section>
  );
}

/* ---------- highlights ---------- */
function Highlights() {
  return (
    <motion.div variants={stagger} {...inView} className="grid grid-cols-1 divide-y divide-line rounded-2xl border border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {profile.highlights.map((h) => (
        <motion.div key={h.label} variants={rise} className="p-6 text-center">
          <div className="text-3xl font-bold tracking-tight">{h.value}</div>
          <div className="mt-1 text-sm text-muted">{h.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ---------- AI workflow ---------- */
const AI_LOOP = [
  { k: "Spec", t: "Brief before code", d: "Clear specs plus project rules files (AGENTS.md, CLAUDE.md) so agents follow each codebase's conventions." },
  { k: "Build", t: "Pair with agents", d: "Claude Code for multi-file features, refactors and migrations; Cursor for in-editor edits and fast iteration." },
  { k: "Review", t: "Own every line", d: "I read every diff, tighten types, cut what isn't needed and keep the architecture mine." },
  { k: "Verify", t: "Tests gate it all", d: "Typecheck, unit and end-to-end tests and CI decide what ships, not the model." },
];
const AI_TOOLS = [
  { name: "Claude Code", role: "Agentic coding in the terminal", use: "Features end to end, refactors, tests, docs" },
  { name: "Cursor", role: "AI-first editor", use: "Inline edits, codebase-aware chat, quick fixes" },
  { name: "Claude & GPT", role: "Models I use every day", use: "Reasoning, research and writing, plus AI features inside products" },
];
const AI_USES = [
  ["Architecture & planning", "Reasoning models to compare approaches and write the plan first"],
  ["Large refactors & migrations", "Agents work through many files; I review in small diffs"],
  ["Tests, fixtures & docs", "Generated fast, then checked by hand and by CI"],
  ["Product features", "Claude and GPT calls with structured output for generation, extraction and assistants"],
];

function AIWorkflow() {
  return (
    <Section id="ai" n="01" kicker="AI-native engineering" title="How I build with AI">
      <motion.p variants={rise} {...inView} className="-mt-4 mb-10 max-w-2xl text-lg text-fg/80">
        It&apos;s 2026, I ship with AI agents every day, and I&apos;m accountable for every line they write. AI makes me faster &amp; my engineering judgement keeps it correct.
      </motion.p>

      <motion.ol variants={stagger} {...inView} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {AI_LOOP.map((s, i) => (
          <motion.li
            key={s.k}
            variants={rise}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl border border-line bg-surface-2/50 p-5"
          >
            <span className="font-mono text-xs text-muted">0{i + 1}</span>
            <span className="ml-2 rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-accent-fg uppercase">{s.k}</span>
            <h3 className="mt-4 font-semibold">{s.t}</h3>
            <p className="mt-1 text-sm text-muted">{s.d}</p>
            {i < AI_LOOP.length - 1 && <span aria-hidden className="absolute top-6 right-4 hidden text-muted lg:block">→</span>}
          </motion.li>
        ))}
      </motion.ol>

      <motion.div
        variants={rise}
        {...inView}
        className="mt-6 flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="font-semibold">The workflow I follow, step by step</p>
          <p className="mt-0.5 text-sm text-muted">Matt Pocock’s AI coding workflow, plus the steps I’ve added on top of it.</p>
        </div>
        <Link
          href="/pro/workflow"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg shadow-lg shadow-accent/25 transition hover:brightness-110"
        >
          Read how I work <span aria-hidden>→</span>
        </Link>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <motion.div variants={stagger} {...inView} className="space-y-3">
          <motion.h3 variants={rise} className="text-sm font-semibold tracking-wider text-muted uppercase">
            Daily toolkit
          </motion.h3>
          {AI_TOOLS.map((t) => (
            <motion.div key={t.name} variants={rise} className="flex items-start gap-4 rounded-2xl border border-line p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 font-mono text-sm font-bold text-accent">
                {t.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <span>
                <span className="block font-semibold">{t.name}</span>
                <span className="block text-sm text-muted">{t.role}</span>
                <span className="mt-1 block text-sm">{t.use}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={rise} {...inView} className="overflow-hidden rounded-2xl border border-line bg-[#0c0c0e] font-mono text-[13px] text-white/85">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 text-xs text-white/45">where-models-fit.md</span>
          </div>
          <div className="space-y-4 p-5">
            {AI_USES.map(([a, b]) => (
              <div key={a}>
                <div>
                  <span className="text-accent">##</span> {a}
                </div>
                <div className="text-white/55">{b}</div>
              </div>
            ))}
            <div className="text-white/45">
              <span className="text-accent">$</span> ship --only-if tests.pass <span className="cursor-blink">▍</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------- projects ---------- */
function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap text-accent">{children}</span>;
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease }}
        className="relative flex max-h-[94svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-2xl sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="glass absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
        >
          <IconClose className="h-4 w-4" />
        </button>
        <div className="pretty-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div
          className="px-6 pt-10 pb-6 sm:px-12"
          style={{ background: `radial-gradient(120% 90% at 50% 0%, ${p.color}40, transparent 70%)` }}
        >
          <motion.div layoutId={`dev-${p.slug}`}>
            <DeviceShowcase desktop={p.shots.desktop} mobile={p.shots.mobile} name={p.name} priority laptopSizes="760px" />
          </motion.div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-bold tracking-tight">{p.name}</h3>
            {p.badge && <Badge>{p.badge}</Badge>}
          </div>
          <p className="mt-1 text-muted">{p.tagline}</p>
          <Link href={workPath(p)} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            Open full case study page <span aria-hidden>↗</span>
          </Link>
          {p.video && (
            <video src={p.video} autoPlay muted loop playsInline className="mt-6 w-full rounded-xl border border-line bg-black" aria-label={`${p.name} product demo`} />
          )}
          <div className="mt-6">
            <ProjectStory p={p} />
          </div>
        </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/** Big alternating row: device mockup on one side, story on the other. */
function FeatureRow({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  const flip = i % 2 === 1;
  return (
    <motion.article variants={rise} className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
      <motion.button
        type="button"
        onClick={onOpen}
        layoutId={`dev-${p.slug}`}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        aria-label={`Open ${p.name} case study`}
        className={`relative rounded-3xl p-5 sm:p-8 ${flip ? "lg:order-2" : ""}`}
        style={{ background: `radial-gradient(110% 90% at 50% 10%, ${p.color}38, transparent 72%)` }}
      >
        <DeviceShowcase desktop={p.shots.desktop} mobile={p.shots.mobile} name={p.name} laptopSizes="(max-width: 1024px) 85vw, 600px" />
      </motion.button>
      <div className={flip ? "lg:order-1" : ""}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
          <span className="h-px w-10 bg-line" />
          {p.badge && <Badge>{p.badge}</Badge>}
        </div>
        <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">{p.name}</h3>
        <p className="mt-2 text-lg text-fg/80">{p.tagline}</p>
        <p className="mt-2 text-sm text-muted">
          {p.timeline}
          {p.org && (
            <>
              {" "}· at{" "}
              <a href={p.org.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                {p.org.name}
              </a>
            </>
          )}
          {p.client && <> · {p.client}</>}
        </p>
        <ul className="mt-5 space-y-2 text-sm leading-relaxed text-fg/85">
          {p.features.slice(0, 3).map((f) => (
            <li key={f} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color }} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        {p.stats && (
          <div className="mt-5 flex flex-wrap gap-6">
            {p.stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold tracking-tight">{s.value}</div>
                <div className="text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 6).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <motion.button
            type="button"
            onClick={onOpen}
            whileHover="hover"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:bg-hover"
          >
            Read case study <motion.span variants={{ hover: { x: 4 } }}>→</motion.span>
          </motion.button>
          <ProjectLinks p={p} />
        </div>
      </div>
    </motion.article>
  );
}

/** Compact card with the device mockup on top. */
function CompactCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      variants={rise}
      onClick={onOpen}
      whileHover="hover"
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-2/40 text-left transition-colors hover:border-accent/60"
    >
      <motion.div
        layoutId={`dev-${p.slug}`}
        variants={{ hover: { y: -4 } }}
        className="px-5 pt-6 pb-2"
        style={{ background: `radial-gradient(110% 100% at 50% 0%, ${p.color}33, transparent 75%)` }}
      >
        <DeviceShowcase desktop={p.shots.desktop} mobile={p.shots.mobile} name={p.name} laptopSizes="(max-width: 768px) 85vw, 360px" />
      </motion.div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold">{p.name}</h3>
          {p.badge && <Badge>{p.badge}</Badge>}
        </div>
        <p className="mt-1 text-sm text-muted">{p.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <span className="mt-auto pt-5 text-sm font-medium text-accent">
          Read case study <motion.span className="inline-block" variants={{ hover: { x: 4 } }}>→</motion.span>
        </span>
      </div>
    </motion.button>
  );
}

/** Code showcase: numbers and repos first, mockup second. */
function CodeShowcase({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <motion.article
      variants={rise}
      className="relative overflow-hidden rounded-3xl border border-line bg-surface-2/40 p-6 md:p-10"
    >
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl" style={{ background: `${p.color}40` }} />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-fg/10 px-2 py-0.5 font-mono text-xs">{"</>"}</span>
            {p.badge && <Badge>{p.badge}</Badge>}
          </div>
          <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">{p.name}</h3>
          <p className="mt-2 text-fg/80">{p.tagline}</p>
          {p.stats && (
            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              {p.stats.map((s) => (
                <div key={s.label} className="min-w-0 rounded-xl border border-line bg-bg/60 p-2.5 sm:p-3">
                  <div className="text-base font-bold tracking-tight break-words sm:text-xl md:text-2xl">{s.value}</div>
                  <div className="text-[11px] leading-tight text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          )}
          <ul className="mt-6 space-y-2 text-sm leading-relaxed text-fg/85">
            {p.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex gap-2.5">
                <span className="mt-[7px] h-1 w-3 shrink-0 rounded-full bg-accent/70" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <ProjectLinks p={p} />
            <button type="button" onClick={onOpen} className="rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:bg-hover">
              Engineering notes →
            </button>
          </div>
        </div>
        <motion.button type="button" onClick={onOpen} layoutId={`dev-${p.slug}`} whileHover={{ y: -6 }} aria-label={`Open ${p.name} details`}>
          <DeviceShowcase desktop={p.shots.desktop} mobile={p.shots.mobile} name={p.name} laptopSizes="(max-width: 1024px) 85vw, 560px" />
        </motion.button>
      </div>
    </motion.article>
  );
}

function GroupHeader({ title, blurb }: { title: string; blurb: string }) {
  return (
    <motion.div variants={rise} {...inView} className="mb-8 flex flex-col gap-1 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-muted">{blurb}</p>
    </motion.div>
  );
}

function Projects() {
  const [open, setOpen] = useState<string | null>(null);
  const production = projectsBy("production");
  const big = production.slice(0, 4);
  const rest = production.slice(4);
  const code = projectsBy("code");
  const design = projectsBy("design");
  const selected = projects.find((p) => p.slug === open);

  return (
    <Section id="projects" n="02" kicker="Selected work" title="Projects & case studies">
      <GroupHeader title={CATEGORIES.production.label} blurb={CATEGORIES.production.blurb} />
      <motion.div variants={stagger} {...inView} className="space-y-20 md:space-y-28">
        {big.map((p, i) => (
          <FeatureRow key={p.slug} p={p} i={i} onOpen={() => setOpen(p.slug)} />
        ))}
      </motion.div>
      <motion.div variants={stagger} {...inView} className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((p) => (
          <CompactCard key={p.slug} p={p} onOpen={() => setOpen(p.slug)} />
        ))}
      </motion.div>

      <div className="mt-24">
        <GroupHeader title={CATEGORIES.code.label} blurb={CATEGORIES.code.blurb} />
        <motion.div variants={stagger} {...inView}>
          {code.map((p) => (
            <CodeShowcase key={p.slug} p={p} onOpen={() => setOpen(p.slug)} />
          ))}
        </motion.div>
      </div>

      <div className="mt-24">
        <GroupHeader title={CATEGORIES.design.label} blurb={CATEGORIES.design.blurb} />
        <motion.div variants={stagger} {...inView} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {design.map((p) => (
            <CompactCard key={p.slug} p={p} onOpen={() => setOpen(p.slug)} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>{selected && <ProjectModal key={selected.slug} p={selected} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  );
}

/* ---------- experience ---------- */
function Experience() {
  return (
    <Section id="experience" n="03" kicker="Where I’ve worked" title="Experience">
      <div className="relative">
        <motion.div
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-line md:left-[calc(12rem+7px)]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        />
        <motion.ol variants={stagger} {...inView} className="space-y-12">
          {experience.map((j, i) => (
            <motion.li key={j.company} variants={rise} className="relative grid gap-2 pl-8 md:grid-cols-[12rem_1fr] md:gap-10 md:pl-0">
              <div className="text-sm text-muted md:pt-0.5 md:text-right">
                <div className="font-medium text-fg/80">{j.period}</div>
                <div>{j.location}</div>
              </div>
              <span
                className={`absolute top-1.5 left-0 h-[15px] w-[15px] rounded-full border-2 border-bg md:left-[12rem] ${i === 0 ? "bg-accent" : "bg-muted"}`}
              />
              <div className="md:pl-10">
                <h3 className="text-xl font-semibold">
                  {j.role}{" "}
                  <span className="text-muted">
                    ·{" "}
                    {j.url ? (
                      <a href={j.url} target="_blank" rel="noopener noreferrer" className="text-fg/80 underline decoration-accent/50 underline-offset-4 hover:text-accent">
                        {j.company}
                      </a>
                    ) : (
                      j.company
                    )}
                  </span>
                </h3>
                <ul className="mt-3 space-y-2 leading-relaxed text-fg/85">
                  {j.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-accent/70" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {j.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Section>
  );
}

/* ---------- about ---------- */
const FOCUS = [
  { title: "Product front ends", body: "Fast, accessible interfaces and dashboards people enjoy using.", icon: TileIcons.projects },
  { title: "APIs & data", body: "Clean, tested back ends with solid data models, auth and payments.", icon: TileIcons.experience },
  { title: "Cloud & shipping", body: "Storage, video pipelines, CI, analytics and smooth deployments.", icon: TileIcons.about },
];

function About() {
  const groups = Object.entries(
    skills.reduce<Record<string, string[]>>((acc, s) => ({ ...acc, [s.group]: [...(acc[s.group] ?? []), s.name] }), {}),
  );
  return (
    <Section id="about" n="04" kicker="Who I am" title="About me">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <motion.div variants={stagger} {...inView}>
          <motion.div variants={rise} className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-3xl border border-line">
            <Image src={profile.photo} alt={profile.name} fill sizes="(max-width: 1024px) 80vw, 384px" className="object-cover object-[50%_35%]" />
          </motion.div>
          <motion.p variants={rise} className="mt-6 max-w-md leading-relaxed text-fg/85">
            I studied Computer Science with a minor in Finance at {education.school}, interned on AWS serverless at{" "}
            <a href={experience.find((j) => j.company.startsWith("Doodle"))?.url} target="_blank" rel="noopener noreferrer" className="underline decoration-accent/50 underline-offset-4 hover:text-accent">
              Doodle
            </a>
            ,
            then spent two years at Spade Digital shipping a marketplace used by around 1,000 people. Today I run my own SaaS,
            TruckerPaperwork, and take on client builds.
          </motion.p>
          <motion.p variants={rise} className="mt-4 max-w-md leading-relaxed text-fg/85">
            I like owning a product end to end: the data model, the API, the interface and the deploy, and making sure it is
            tested before it ships.
          </motion.p>
          <motion.div variants={rise} className="mt-6 max-w-md rounded-2xl border border-line p-5">
            <p className="text-xs font-semibold tracking-wider text-muted uppercase">Education</p>
            <p className="mt-2 font-semibold">{education.school}</p>
            <p className="text-sm text-fg/80">{education.degree}</p>
            <p className="text-sm text-muted">{education.period}</p>
          </motion.div>
        </motion.div>

        <div>
          <motion.div variants={stagger} {...inView} className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {FOCUS.map((f) => (
              <motion.div key={f.title} variants={rise} whileHover={{ y: -4 }} className="rounded-2xl border border-line bg-surface-2/50 p-5">
                <span className="text-accent">{f.icon}</span>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted">{f.body}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={stagger} {...inView} className="mt-10 space-y-5">
            {groups.map(([g, names]) => (
              <motion.div key={g} variants={rise} className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:items-baseline">
                <span className="text-sm font-medium text-muted">{g}</span>
                <div className="flex flex-wrap gap-1.5">
                  {names.map((n) => (
                    <motion.span
                      key={n}
                      whileHover={{ y: -2 }}
                      className="rounded-full border border-line px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      {n}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- contact ---------- */
function Contact() {
  const { copied, copy } = useCopyEmail();
  return (
    <Section id="contact" n="05" kicker="Get in touch" title="Let’s build something">
      <motion.div
        variants={stagger}
        {...inView}
        className="relative overflow-hidden rounded-3xl border border-line bg-surface-2/50 p-8 md:p-12"
      >
        <div aria-hidden className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <motion.p variants={rise} className="relative max-w-xl text-lg text-fg/85">
          I’m open to software engineering roles and selected freelance work. The quickest way to reach me is email.
        </motion.p>
        <motion.div variants={rise} className="relative mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="font-mono text-xl font-semibold break-all md:text-3xl">{profile.email}</span>
          <motion.button
            type="button"
            onClick={copy}
            whileTap={{ scale: 0.95 }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-fg"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copied ? "y" : "n"} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}>
                {copied ? "Copied ✓" : "Copy email"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
        <motion.div variants={rise} className="relative mt-8 flex flex-wrap gap-3">
          {[
            { href: gmailComposeUrl(), label: "Open in Gmail", icon: <IconMail className="h-4 w-4" /> },
            { href: profile.links.linkedin, label: "LinkedIn", icon: <IconLinkedin className="h-4 w-4" /> },
            { href: profile.links.github, label: "GitHub", icon: <IconGithub className="h-4 w-4" /> },
          ].map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium hover:bg-hover"
            >
              {l.icon} {l.label}
            </motion.a>
          ))}
          <motion.a
            href={profile.resumePdf}
            download
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium hover:bg-hover"
          >
            <IconDownload className="h-4 w-4" /> Resume
          </motion.a>
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ---------- page ---------- */
function Inner() {
  return (
    <div className="min-h-screen overflow-x-clip bg-bg text-fg">
      <ProTopBar />
      <main className="mx-auto max-w-6xl px-5 md:px-8">
        <Hero />
        <Highlights />
        <AIWorkflow />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row md:px-8">
          <span>
            © {profile.name} · {profile.title}
          </span>
          <span className="flex items-center gap-3">
            Want the fun version? <SwitchToOS />
          </span>
        </div>
      </footer>
    </div>
  );
}

/** Theme + motion providers shared by /pro and /pro/work pages. */
export function ProShell({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SettingsProvider>
  );
}

export default function ProPage() {
  useEffect(() => {
    try {
      localStorage.setItem("rohanos.mode", "pro");
    } catch {
      /* ignore */
    }
  }, []);
  return (
    <SettingsProvider>
      <MotionConfig reducedMotion="user">
        <Inner />
      </MotionConfig>
    </SettingsProvider>
  );
}
