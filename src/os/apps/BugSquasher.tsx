"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui";

type Bug = { id: number; x: number; y: number; label: string; born: number; ttl: number; kind: "bug" | "coffee" };
type Splat = { id: number; x: number; y: number; text: string };
type Phase = "idle" | "playing" | "over";

const LABELS = ["NaN", "undefined", "null", "404", "CORS", "off-by-1", "race cond.", "memory leak", "500", "typo", "flaky test", "z-index"];
const CODE = [
  "export async function deploy(env) {",
  "  const build = await compile(src);",
  "  if (!tests.pass()) throw new Error('no');",
  "  // TODO: fix before Friday",
  "  return ship(build, { env, yolo: false });",
  "}",
  "",
  "function getUser(id: string) {",
  "  return db.users.findUnique({ where: { id } });",
  "}",
  "",
  "const total = items.reduce((a, b) => a + b.price, 0);",
  "useEffect(() => { /* trust me */ }, []);",
];
const HS_KEY = "rohanos.bugsquasher.hs";
const GAME_MS = 45_000;

function overMessage(score: number) {
  if (score >= 400) return "Senior engineer energy. Ship it.";
  if (score >= 250) return "Code review approved, with only minor nits.";
  if (score >= 120) return "Not bad. QA still found a few.";
  return "Shipped on a Friday, didn't you?";
}

export default function BugSquasher() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [splats, setSplats] = useState<Splat[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(GAME_MS);
  const [high, setHigh] = useState(0);
  const idRef = useRef(0);
  const startRef = useRef(0);
  const bugsRef = useRef<Bug[]>([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read stored high score once
      setHigh(Number(localStorage.getItem(HS_KEY)) || 0);
    } catch {
      /* no storage */
    }
  }, []);

  // game loop
  useEffect(() => {
    if (phase !== "playing") return;
    let spawnAcc = 0;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const elapsed = now - startRef.current;
      const remaining = Math.max(0, GAME_MS - elapsed);
      setTimeLeft(remaining);
      const difficulty = elapsed / GAME_MS; // 0 → 1
      const spawnEvery = 900 - 550 * difficulty;
      spawnAcc += dt;
      let changed = false;
      if (spawnAcc > spawnEvery) {
        spawnAcc = 0;
        const coffee = Math.random() < 0.06;
        bugsRef.current = [
          ...bugsRef.current,
          {
            id: idRef.current++,
            x: 8 + Math.random() * 84,
            y: 10 + Math.random() * 78,
            label: coffee ? "☕ coffee" : LABELS[Math.floor(Math.random() * LABELS.length)],
            born: now,
            ttl: coffee ? 1800 : 2600 - 1300 * difficulty,
            kind: coffee ? "coffee" : "bug",
          },
        ];
        changed = true;
      }
      // expired bugs "ship to prod"
      const alive = bugsRef.current.filter((b) => now - b.born <= b.ttl);
      if (alive.length !== bugsRef.current.length) {
        const escaped = bugsRef.current.filter((b) => b.kind === "bug" && now - b.born > b.ttl).length;
        bugsRef.current = alive;
        changed = true;
        if (escaped) setLives((l) => l - escaped);
      }
      if (changed) setBugs(bugsRef.current);
      if (remaining <= 0) {
        setPhase("over");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- end the round when prod goes down
    if (phase === "playing" && lives <= 0) setPhase("over");
  }, [lives, phase]);

  useEffect(() => {
    if (phase === "over" && score > high) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- persist new record
      setHigh(score);
      try {
        localStorage.setItem(HS_KEY, String(score));
      } catch {
        /* no storage */
      }
    }
  }, [phase, score, high]);

  const start = () => {
    bugsRef.current = [];
    setBugs([]);
    setSplats([]);
    setScore(0);
    setLives(3);
    setTimeLeft(GAME_MS);
    startRef.current = performance.now();
    setPhase("playing");
  };

  const squash = (bug: Bug) => {
    if (!bugsRef.current.some((x) => x.id === bug.id)) return;
    bugsRef.current = bugsRef.current.filter((x) => x.id !== bug.id);
    setBugs(bugsRef.current);
    if (bug.kind === "coffee") {
      setLives((l) => Math.min(3, l + 1));
    } else {
      setScore((s) => s + 10);
    }
    const id = idRef.current++;
    setSplats((s) => [...s, { id, x: bug.x, y: bug.y, text: bug.kind === "coffee" ? "+1 ❤" : "+10" }]);
    setTimeout(() => setSplats((s) => s.filter((x) => x.id !== id)), 450);
  };

  return (
    <div className="flex h-full flex-col bg-[#1e1e2a] text-white select-none">
      <div className="flex shrink-0 items-center gap-4 border-b border-white/10 px-4 py-2 font-mono text-sm">
        <span>
          score <b className="text-accent">{score}</b>
        </span>
        <span title="Production health">prod {"❤".repeat(Math.max(0, lives))}{"♡".repeat(Math.max(0, 3 - lives))}</span>
        <span className="ml-auto text-white/60">⏱ {Math.ceil(timeLeft / 1000)}s</span>
        <span className="text-white/60">best {high}</span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        {/* fake editor background */}
        <pre className="pointer-events-none absolute inset-0 p-4 font-mono text-[12px] leading-6 text-white/15">
          {CODE.map((l, i) => (
            <div key={i}>
              <span className="mr-4 inline-block w-5 text-right text-white/10">{i + 1}</span>
              {l}
            </div>
          ))}
        </pre>

        {phase === "playing" &&
          bugs.map((b) => (
            <button
              key={b.id}
              type="button"
              onPointerDown={() => squash(b)}
              aria-label={`Squash ${b.label}`}
              className="absolute flex flex-col items-center"
              style={{ left: `${b.x}%`, top: `${b.y}%`, animation: "bug-wiggle 0.35s ease-in-out infinite" }}
            >
              <span className="text-3xl leading-none drop-shadow">{b.kind === "coffee" ? "☕" : "🐛"}</span>
              <span
                className={`mt-0.5 rounded px-1.5 font-mono text-[10px] whitespace-nowrap ${b.kind === "coffee" ? "bg-amber-500/90" : "bg-red-500/85"}`}
              >
                {b.label}
              </span>
            </button>
          ))}
        {splats.map((s) => (
          <span
            key={s.id}
            className="pointer-events-none absolute font-mono text-lg font-bold text-accent"
            style={{ left: `${s.x}%`, top: `${s.y}%`, animation: "splat 450ms ease-out forwards" }}
          >
            {s.text}
          </span>
        ))}

        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 p-6 text-center">
            <div className="text-5xl">🐛</div>
            <h2 className="text-2xl font-bold">{phase === "over" ? `Score: ${score}` : "Bug Squasher"}</h2>
            <p className="max-w-sm text-sm text-white/75">
              {phase === "over"
                ? lives <= 0
                  ? "Prod is down. Three bugs made it to production. " + overMessage(score)
                  : overMessage(score)
                : "Bugs are crawling into the codebase. Squash them before they ship to prod. Coffee restores production health."}
            </p>
            {phase === "over" && score >= high && score > 0 && <p className="text-sm text-accent">New personal best! 🎉</p>}
            <Button variant="accent" onClick={start} className="mt-2">
              {phase === "over" ? "Hotfix & retry" : "Start debugging"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
