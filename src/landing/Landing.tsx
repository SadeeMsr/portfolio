"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MotionConfig, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/data/resume";
import { IconDownload } from "@/os/icons";
import { RohanLogo } from "@/os/icons";

type Mode = "pro" | "os";
const MODE_KEY = "rohanos.mode";
const ease = [0.22, 1, 0.36, 1] as const;

const OPTIONS: Record<
  Mode,
  { href: string; kicker: string; title: string; body: string; cta: string; image: string; key: string }
> = {
  pro: {
    href: "/pro",
    kicker: "For recruiters & teams",
    title: "Pro mode",
    body: "Experience, projects and case studies on one clean page. Résumé one click away.",
    cta: "Enter Pro mode",
    image: "/landing/pro-mode.jpg",
    key: "P",
  },
  os: {
    href: "/os",
    kicker: "For the curious",
    title: "RohanOS",
    body: "My portfolio as a tiny operating system: draggable windows, a working terminal and a mini-game.",
    cta: "Boot RohanOS",
    image: "/landing/rohanos-desktop.jpg",
    key: "O",
  },
};

const panel: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.25 + i * 0.12 } }),
};

export default function Landing() {
  const router = useRouter();
  const [hover, setHover] = useState<Mode | null>(null);
  const [last, setLast] = useState<Mode | null>(null);

  useEffect(() => {
    try {
      const m = localStorage.getItem(MODE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read the visitor's last choice once
      if (m === "pro" || m === "os") setLast(m);
    } catch {
      /* ignore */
    }
    router.prefetch("/pro");
    router.prefetch("/os");
  }, [router]);

  const go = (m: Mode) => {
    try {
      localStorage.setItem(MODE_KEY, m);
    } catch {
      /* ignore */
    }
    router.push(OPTIONS[m].href);
  };

  // keyboard shortcuts: P and O
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "p") go("pro");
      else if (k === "o") go("os");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0e0e10] text-white">
        {/* ambient background */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-48 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[#22D3EE]/15 blur-[140px]"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />

        {/* header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-12 text-center md:pt-16"
        >
          <div className="flex items-center gap-3">
            <span className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/20">
              <Image src={profile.photo} alt={profile.name} fill sizes="48px" className="object-cover object-[50%_35%]" priority />
            </span>
            <span className="text-left">
              <span className="block font-semibold">{profile.name}</span>
              <span className="block text-sm text-white/60">{profile.title}</span>
            </span>
          </div>
          <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Two ways to see my work.
          </h1>
          <p className="mt-3 text-white/60">Same person, same projects. Pick a mood. You can switch any time.</p>
        </motion.header>

        {/* options */}
        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-5 py-10 md:flex-row md:py-12">
          {(Object.keys(OPTIONS) as Mode[]).map((m, i) => {
            const o = OPTIONS[m];
            const isOS = m === "os";
            return (
              <motion.button
                key={m}
                type="button"
                custom={i}
                variants={panel}
                initial="hidden"
                animate="show"
                onClick={() => go(m)}
                onHoverStart={() => setHover(m)}
                onHoverEnd={() => setHover(null)}
                onFocus={() => setHover(m)}
                onBlur={() => setHover(null)}
                style={{ flexGrow: hover === m ? 1.35 : hover ? 0.9 : 1 }}
                whileTap={{ scale: 0.985 }}
                className={`group relative flex shrink-0 flex-col md:min-h-[460px] md:shrink md:basis-0 overflow-hidden rounded-3xl border text-left transition-[flex-grow,border-color] duration-500 ease-out focus-visible:outline-none ${
                  isOS ? "border-[#22D3EE]/25 hover:border-[#22D3EE]/70" : "border-white/10 hover:border-white/40"
                } focus-visible:border-white`}
                aria-label={`${o.title}: ${o.body}`}
              >
                {/* backdrop */}
                <div
                  className={`absolute inset-0 ${
                    isOS ? "wallpaper-dusk" : "bg-[linear-gradient(160deg,#1d1d20_0%,#141416_100%)]"
                  }`}
                />

                {/* preview image */}
                <motion.div
                  className="relative mx-6 mt-6 aspect-[16/10] shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-2xl md:mx-10 md:mt-10 md:aspect-auto md:min-h-[200px] md:flex-1"
                  animate={hover === m ? { y: -6, scale: 1.02, rotate: isOS ? -1 : 1 } : { y: 0, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <Image src={o.image} alt="" fill sizes="(max-width: 768px) 90vw, 560px" className="object-cover object-top" priority />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                </motion.div>

                {/* text */}
                <div className="relative p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                    {isOS ? <RohanLogo size={22} /> : <span className="h-2.5 w-2.5 rounded-full bg-white" />}
                    <span className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">{o.kicker}</span>
                    {last === m && (
                      <span className="shrink-0 whitespace-nowrap rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] leading-4 font-semibold tracking-wide text-white/90 uppercase">
                        Last visited
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{o.title}</h2>
                  <p className="mt-2 max-w-md text-white/70">{o.body}</p>
                  <span
                    className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                      isOS ? "bg-[#22D3EE] text-[#04141A]" : "bg-white text-[#111]"
                    }`}
                  >
                    {o.cta}
                    <motion.span animate={hover === m ? { x: 4 } : { x: 0 }}>→</motion.span>
                  </span>
                  <kbd className="absolute right-6 bottom-6 hidden rounded-md border border-white/20 px-2 py-0.5 font-mono text-xs text-white/50 md:right-10 md:bottom-10 md:block">
                    {o.key}
                  </kbd>
                </div>
              </motion.button>
            );
          })}
        </main>

        {/* footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative z-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 pb-8 text-sm text-white/55"
        >
          <a href={profile.resumePdf} download className="inline-flex items-center gap-1.5 hover:text-white">
            <IconDownload className="h-4 w-4" /> Download résumé
          </a>
          <span aria-hidden>·</span>
          <span>{profile.email}</span>
          <span aria-hidden className="hidden md:inline">·</span>
          <span className="hidden md:inline">
            Tip: press <kbd className="rounded border border-white/20 px-1 font-mono">P</kbd> or{" "}
            <kbd className="rounded border border-white/20 px-1 font-mono">O</kbd>
          </span>
        </motion.footer>
      </div>
    </MotionConfig>
  );
}
