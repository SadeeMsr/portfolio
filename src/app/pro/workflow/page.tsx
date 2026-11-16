import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_URL, profile, projectByPage, workPath } from "@/data/resume";
import { ProShell, ProTopBar } from "@/pro/ProPage";

const TITLE = "The AI coding workflow I follow";
const DESCRIPTION = "Matt Pocock’s end-to-end workflow for building with AI agents, and the steps I’ve added on top.";
const SOURCE = "https://www.youtube.com/watch?v=-QFHIoCo-Ko";
const SOURCE_TITLE = "Full Walkthrough: Workflow for AI Coding";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} · ${profile.name}` },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/pro/workflow` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: `${SITE_URL}/pro/workflow`,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const TOC = [
  ["constraints", "The two constraints behind it"],
  ["workflow", "The workflow, stage by stage"],
  ["align", "1 · Align: get grilled"],
  ["spec", "2 · Spec: write the destination"],
  ["slice", "3 · Slice: vertical tickets"],
  ["build", "4 · Build: agents work AFK"],
  ["qa", "5 · QA: my taste, my call"],
  ["codebase", "Keeping the codebase agent-friendly"],
  ["summary", "The whole thing on one table"],
] as const;

/* ---------- small building blocks ---------- */

function Mode({ afk = false }: { afk?: boolean }) {
  return afk ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-fg/5 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide whitespace-nowrap text-fg/80 uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-fg/50" /> AFK · agents
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide whitespace-nowrap text-accent uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Human in the loop
    </span>
  );
}

const Cmd = ({ children }: { children: ReactNode }) => (
  <code className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-accent">{children}</code>
);

const H2 = ({ id, kicker, children }: { id: string; kicker: string; children: ReactNode }) => (
  <div id={id} className="scroll-mt-24 pt-16">
    <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">{kicker}</p>
    <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{children}</h2>
  </div>
);

const P = ({ children }: { children: ReactNode }) => <p className="mt-4 leading-relaxed text-fg/85">{children}</p>;

const MineTag = () => (
  <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-accent/60 px-2 py-0.5 text-[10px] font-bold tracking-wider whitespace-nowrap text-accent uppercase">
    + My addition
  </span>
);

const MattTag = () => (
  <span className="inline-flex items-center rounded-full bg-fg/10 px-2 py-0.5 text-[10px] font-bold tracking-wider whitespace-nowrap text-fg/80 uppercase">
    Matt’s workflow
  </span>
);

function Mine({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-5 rounded-xl border border-dashed border-accent/50 bg-accent/5 px-4 py-3">
      <MineTag />
      <p className="mt-2 text-[15px] leading-relaxed text-fg/90">{children}</p>
    </aside>
  );
}

function Stage({
  id,
  n,
  title,
  afk = false,
  cmd,
  output,
  mine,
  children,
}: {
  id: string;
  n: number;
  title: string;
  afk?: boolean;
  cmd: ReactNode;
  output: string;
  mine?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 pt-12 pl-12 md:pl-16">
      <span
        className={`absolute top-12 left-0 flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm font-bold md:h-11 md:w-11 ${
          afk ? "border border-line bg-surface-2 text-fg" : "bg-accent text-accent-fg"
        }`}
      >
        {n}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <Mode afk={afk} />
        <span className="text-xs text-muted">{cmd}</span>
      </div>
      <h3 className="mt-3 text-xl font-bold tracking-tight md:text-2xl">{title}</h3>
      {children}
      {mine && <Mine>{mine}</Mine>}
      <p className="mt-5 rounded-xl border border-line bg-surface-2/50 px-4 py-3 text-sm">
        <span className="font-semibold text-accent">Output · </span>
        {output}
      </p>
    </section>
  );
}

/* ---------- diagrams (pure CSS, theme-aware) ---------- */

function ContextMeter() {
  return (
    <figure className="mt-6 rounded-2xl border border-line bg-surface-2/40 p-5">
      <div className="flex justify-between font-mono text-[11px] text-muted">
        <span>0</span>
        <span>~100k tokens</span>
        <span>200k+</span>
      </div>
      <div className="relative mt-2 flex h-10 overflow-hidden rounded-lg border border-line">
        <div className="flex w-[42%] items-center justify-center bg-accent/80 text-xs font-bold text-accent-fg">smart zone</div>
        <div className="flex flex-1 items-center justify-center bg-[repeating-linear-gradient(135deg,var(--color-line)_0_6px,transparent_6px_12px)] text-xs font-semibold text-muted">
          dumb zone
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        Attention thins out as a session fills up. Every ticket I hand to an agent is sized to finish on the left side of this bar.
      </figcaption>
    </figure>
  );
}

const LAYERS = ["UI", "API", "DB"];

function SliceGrid({ vertical }: { vertical: boolean }) {
  return (
    <div className="grid grid-cols-[2.5rem_repeat(4,1fr)] gap-1.5">
      {LAYERS.map((l, r) => (
        <div key={l} className="contents">
          <span className="flex items-center font-mono text-[11px] text-muted">{l}</span>
          {[0, 1, 2, 3].map((c) => {
            const order = vertical ? c : r;
            const lit = vertical ? c === 0 : r === 2;
            return (
              <span
                key={c}
                className={`flex h-8 items-center justify-center rounded-md font-mono text-[11px] font-semibold ${
                  lit ? "bg-accent text-accent-fg" : "border border-line bg-bg/60 text-muted"
                }`}
              >
                #{order + 1}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function SliceDiagram() {
  return (
    <figure className="mt-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-line bg-surface-2/40 p-4">
        <p className="mb-3 text-sm font-semibold">
          Horizontal <span className="font-normal text-muted">· what agents do by default</span>
        </p>
        <SliceGrid vertical={false} />
        <p className="mt-3 text-xs text-muted">All schemas, then all endpoints, then all screens. Nothing works until the last ticket lands.</p>
      </div>
      <div className="rounded-2xl border border-accent/40 bg-accent/5 p-4">
        <p className="mb-3 text-sm font-semibold">
          Vertical <span className="font-normal text-muted">· what I ask for</span>
        </p>
        <SliceGrid vertical />
        <p className="mt-3 text-xs text-muted">Each ticket cuts through every layer, so ticket #1 is already something I can click.</p>
      </div>
    </figure>
  );
}

function Board() {
  const tickets = [
    {
      id: 1,
      t: "Invite a teammate by email (form → API → table)",
      afk: true,
      blocked: null,
    },
    {
      id: 2,
      t: "Accept invite and land on the dashboard",
      afk: true,
      blocked: 1,
    },
    {
      id: 3,
      t: "Pick the copy and empty states for invites",
      afk: false,
      blocked: null,
    },
    { id: 4, t: "Revoke a pending invite", afk: true, blocked: 1 },
  ];
  return (
    <figure className="mt-6 overflow-hidden rounded-2xl border border-line">
      <div className="flex items-center justify-between border-b border-line bg-surface-2/60 px-4 py-2.5 text-xs text-muted">
        <span className="font-mono">backlog · team-invites</span>
        <span>4 tickets · 2 ready now</span>
      </div>
      <ul className="divide-y divide-line">
        {tickets.map((k) => (
          <li key={k.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm">
              <span className="mr-2 font-mono text-muted">#{k.id}</span>
              {k.t}
            </span>
            <span className="flex shrink-0 flex-wrap items-center gap-2">
              {k.blocked ? (
                <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted">blocked by #{k.blocked}</span>
              ) : (
                <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] text-accent">ready</span>
              )}
              <Mode afk={k.afk} />
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="border-t border-line px-4 py-2.5 text-xs text-muted">
        #1 and #3 can start in parallel: an agent takes #1 while I make the call on #3.
      </figcaption>
    </figure>
  );
}

function Loop() {
  const lines: [string, string?][] = [
    ["# pseudocode: the AFK loop", "c"],
    ["while ticket=$(next_unblocked --mode afk); do"],
    ["  git worktree add ../wt-$ticket            # isolated copy, my tree stays clean"],
    ['  agent "implement $ticket, red → green → refactor"'],
    ["  pnpm typecheck && pnpm test || continue   # gates, not vibes"],
    ["  reviewer --fresh-context --rules CODING.md # new session reads the diff"],
    ['  git commit -m "$ticket"'],
    ["done"],
  ];
  return (
    <figure className="mt-6 overflow-hidden rounded-2xl border border-line bg-[#0c0c0e] font-mono text-[12px] text-white/85 md:text-[13px]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 text-xs text-white/45">night-shift.sh</span>
      </div>
      <pre className="overflow-x-auto p-5 leading-relaxed">
        {lines.map(([l, c], i) => {
          const [code, comment] = c ? ["", l] : l.split(/(?=#\s)/);
          return (
            <div key={i}>
              {code}
              {comment && <span className="text-white/40">{comment}</span>}
            </div>
          );
        })}
      </pre>
    </figure>
  );
}

function Modules() {
  return (
    <figure className="mt-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-line bg-surface-2/40 p-4">
        <p className="text-sm font-semibold">
          Shallow <span className="font-normal text-muted">· many tiny files</span>
        </p>
        <div className="mt-4 grid grid-cols-6 gap-1.5">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={i} className="h-6 rounded border border-line bg-bg/60" />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">Wide interfaces, logic everywhere. An agent burns context just finding things.</p>
      </div>
      <div className="rounded-2xl border border-accent/40 bg-accent/5 p-4">
        <p className="text-sm font-semibold">
          Deep <span className="font-normal text-muted">· small interface, lots inside</span>
        </p>
        <div className="mt-4">
          <span className="mx-auto block h-3 w-2/5 rounded-t-md bg-accent" />
          <span className="flex h-[66px] items-center justify-center rounded-lg border border-accent/50 bg-bg/60 font-mono text-[11px] text-muted">
            invites.service
          </span>
        </div>
        <p className="mt-3 text-xs text-muted">One door in. Tests wrap the whole flow, and agents can change the inside safely.</p>
      </div>
    </figure>
  );
}

const SUMMARY: [string, boolean, string, string, string][] = [
  ["Align", false, "/grill-me", "Shared understanding of scope and edge cases", "Rules files loaded first"],
  ["Spec", false, "/write-a-prd", "PRD and a map of modules to touch", "A verification plan"],
  ["Slice", false, "/prd-to-issues", "Backlog of vertical-slice tickets with blockers", "Done = commands pass"],
  ["Build & review", true, "AFK loop + TDD", "Tested, type-checked commits from worktrees", "I read every diff, CI gates"],
  ["QA", false, "Me, the running app", "Follow-up tickets back on the board", "Phone widths, both themes"],
];

/* ---------- page ---------- */

export default function WorkflowPage() {
  const doctor = projectByPage("doctor-tracker");
  const trucker = projectByPage("truckerpaperwork");

  return (
    <ProShell>
      <div className="min-h-screen overflow-x-clip bg-bg text-fg">
        <ProTopBar offPage />

        {/* header */}
        <header className="relative border-b border-line pt-28 pb-12 md:pt-36 md:pb-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
          />
          <div className="relative mx-auto max-w-6xl px-5 md:px-8">
            <div className="max-w-3xl">
              <Link href="/pro#ai" className="text-sm text-muted hover:text-fg">
                ← Back to the portfolio
              </Link>
              <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-accent uppercase">Engineering notes · Workflow</p>
              <h1 className="mt-3 text-4xl leading-[1.1] font-bold tracking-tight text-balance md:text-6xl">{TITLE}</h1>
              <p className="mt-5 text-lg leading-relaxed text-fg/80 md:text-xl">
                This is Matt Pocock’s end-to-end workflow for building software with AI agents. I follow it on my projects, and I’ve layered a few
                steps of my own on top. His thesis, and the reason it works: the boring fundamentals (small tasks, vertical slices, tests first, deep
                modules) are exactly what make agents reliable.
              </p>
              <div className="mt-6 flex flex-col gap-1 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
                <span>
                  Workflow by{" "}
                  <a
                    href={SOURCE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-fg underline decoration-accent/50 underline-offset-4 hover:text-accent"
                  >
                    Matt Pocock
                  </a>
                </span>
                <span aria-hidden className="hidden sm:inline">·</span>
                <span>
                  notes &amp; additions by <span className="font-medium text-fg">{profile.name}</span>
                </span>
                <span aria-hidden className="hidden sm:inline">·</span>
                <span>Nov 2026</span>
                <span aria-hidden className="hidden sm:inline">·</span>
                <span>8 min read</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_15rem]">
          <article className="mx-auto w-full max-w-3xl min-w-0 pb-16 lg:mx-0">
            {/* source */}
            <a
              href={SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 flex flex-col gap-3 rounded-2xl border border-line p-5 transition-colors hover:border-accent/60 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <span className="block text-xs font-semibold tracking-[0.2em] text-muted uppercase">Source · video</span>
                <span className="mt-1 block font-semibold group-hover:text-accent">
                  {SOURCE_TITLE} <span className="font-normal text-muted">by Matt Pocock</span> ↗
                </span>
              </span>
              <span className="flex shrink-0 flex-wrap items-center gap-2 text-xs text-muted">
                <MattTag /> his stages &amp; skills
                <MineTag /> how I extend it
              </span>
            </a>

            {/* TL;DR */}
            <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/5 p-5 md:p-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">TL;DR</p>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed">
                <li>
                  <span className="font-semibold">Day shift (me + agent):</span> get interviewed until the design is clear, turn it into a PRD, split
                  it into thin end-to-end tickets.
                </li>
                <li>
                  <span className="font-semibold">Night shift (agents):</span> pick an unblocked ticket, build it test-first in an isolated worktree,
                  get reviewed by a fresh session, commit.
                </li>
                <li>
                  <span className="font-semibold">Back to me:</span> I QA the running app. Anything off becomes a new ticket.
                </li>
              </ul>
            </div>

            {/* constraints */}
            <H2 id="constraints" kicker="Mental model">
              The two constraints behind it
            </H2>
            <P>
              Matt builds the whole workflow around two limits of today’s models. Once they clicked for me, most of the stages explained themselves.
            </P>
            <h3 className="mt-6 text-lg font-semibold">The smart zone and the dumb zone</h3>
            <P>
              A 200k or 1M token window doesn’t mean 1M tokens of good decisions. As a session fills up, the model’s attention spreads thinner. Past
              roughly 100k tokens it starts missing things it handled perfectly an hour ago. So I don’t try to cram a whole feature into one session.
              I make the work small enough to finish while the model is sharp.
            </P>
            <ContextMeter />

            <h3 className="mt-10 text-lg font-semibold">Clear, don’t compact</h3>
            <P>
              Every fresh session starts with no memory, like the guy in <em>Memento</em>. That sounds like a weakness, but it’s actually the feature
              I lean on. Summarising a long, messy chat leaves sediment behind: half-abandoned ideas and stale assumptions the model keeps tripping
              over. Instead I clear the context between stages and hand the next session a clean artifact (a PRD, a ticket, a diff). Each stage starts
              back in the smart zone.
            </P>

            {/* workflow */}
            <H2 id="workflow" kicker="The process">
              The workflow, stage by stage
            </H2>
            <P>
              Matt splits the work into two shifts. In the <span className="font-semibold text-accent">day shift</span> I’m at the keyboard, making
              decisions with the agent. In the <span className="font-semibold">night shift</span> agents execute on their own, away from keyboard,
              while I do something else, often the next day-shift task.
            </P>

            <div className="relative">
              <span aria-hidden className="absolute top-14 bottom-8 left-[17px] w-px bg-line md:left-[21px]" />

              <Stage
                id="align"
                n={1}
                title="Align: let the agent grill me"
                cmd={<Cmd>/grill-me</Cmd>}
                output="A shared design concept: scope, edge cases and the assumptions we both agree on."
                mine={
                  <>
                    Before any grilling, every repo I work in carries an <Cmd>AGENTS.md</Cmd> / <Cmd>CLAUDE.md</Cmd> with its stack, conventions and
                    commands. The sub-agent explores with the house rules already loaded, so its recommended answers fit the codebase instead of a
                    generic one.
                  </>
                }
              >
                <P>
                  The worst thing an agent can do is start coding the moment I finish a sentence. Matt’s fix is to flip it: with his{" "}
                  <Cmd>/grill-me</Cmd> skill, the agent interviews me instead. A sub-agent explores the codebase first, so the main session doesn’t
                  spend its context reading files. Then the agent asks me one question at a time, each with its own recommended answer: what happens
                  on a duplicate invite? who can revoke? what about expired links?
                </P>
                <P>
                  We keep going until there’s nothing left to ask. This is where most of my engineering judgement goes, and it’s the cheapest place to
                  catch a bad idea.
                </P>
              </Stage>

              <Stage
                id="spec"
                n={2}
                title="Spec: write the destination document"
                cmd={<Cmd>/write-a-prd</Cmd>}
                output="A PRD with the problem, user stories, what’s out of scope, key decisions and the modules to touch."
                mine={
                  <>
                    I add a <span className="font-semibold">“How we’ll verify it”</span> section: which flows get unit tests, which get a Playwright
                    end-to-end test and what I’ll check by hand. Every ticket inherits it as acceptance criteria.
                  </>
                }
              >
                <P>
                  Once we agree, the agent turns the conversation into a product requirements doc: problem statement, user stories, out-of-scope
                  boundaries, implementation decisions and the exact modules it expects to change.
                </P>
                <P>
                  I skim it, but I don’t polish it line by line. The alignment already happened in the grilling, and models are genuinely good at
                  summarising. The PRD is a destination, not a contract.
                </P>
              </Stage>

              <Stage
                id="slice"
                n={3}
                title="Slice: break it into vertical tickets"
                cmd={<Cmd>/prd-to-issues</Cmd>}
                output="A backlog of small tickets, each tagged AFK or human, with explicit blockers between them."
                mine={
                  <>
                    Each ticket ends with the exact commands that prove it’s done: the typecheck, the test file, the e2e spec. “Done” becomes
                    something a script can check, not something an agent claims.
                  </>
                }
              >
                <P>
                  Left alone, an agent plans horizontally: every schema, then every endpoint, then every screen. Feedback arrives at the very end,
                  when it’s most expensive. I push back on that and ask for <span className="font-semibold">vertical slices</span>, or tracer bullets:
                  thin features that touch the database, the API and the UI together, so every finished ticket is something I can actually use.
                </P>
                <SliceDiagram />
                <P>
                  Each ticket gets a mode (can an agent do it alone, or does it need my taste?) and its blockers. That dependency graph is what lets
                  several agents work in parallel without stepping on each other.
                </P>
                <Board />
              </Stage>

              <Stage
                id="build"
                n={4}
                afk
                title="Build: agents work the backlog, test-first"
                cmd={
                  <>
                    <Cmd>Claude Code</Cmd> in a loop · git worktrees
                  </>
                }
                output="Small, tested, type-checked commits, one ticket each, already reviewed."
                mine={
                  <>
                    The reviewer agent is a filter, not the final word. I still read every diff myself before it merges, and CI runs typecheck, unit
                    and Playwright tests on every push. Nothing ships on an agent’s say-so.
                  </>
                }
              >
                <P>
                  A simple loop picks the next unblocked AFK ticket, creates an isolated git worktree and lets the agent implement it. Isolation
                  matters: a bad run never touches my working tree, and I can throw it away in one command.
                </P>
                <Loop />
                <P>
                  The agent works <span className="font-semibold">red → green → refactor</span>: write a failing test, watch it fail, then write the
                  code that passes it. Seeing the test fail first is the point. Otherwise it’s easy for a model to write a test that passes no matter
                  what the code does.
                </P>
                <P>
                  Before anything is committed, a separate reviewer session reads the diff with a cleared context and our coding standards in its
                  prompt. It reviews from the smart zone, not from the bottom of the implementer’s very long chat.
                </P>
              </Stage>

              <Stage
                id="qa"
                n={5}
                title="QA: my taste, my call"
                cmd={
                  <>
                    the running app · <Cmd>Cursor</Cmd> for quick fixes
                  </>
                }
                output="Follow-up tickets on the board, and planning docs deleted once the feature ships."
                mine={
                  <>
                    I QA at real phone widths (360 and 390px) in light and dark mode. A small Playwright script screenshots every page, modal and
                    state and flags anything that overflows, so I review a contact sheet instead of clicking around for an hour.
                  </>
                }
              >
                <P>
                  Agents are still weak at judging whether a screen <em>feels</em> right. So I test the running app myself, on desktop and on my
                  phone. Spacing, copy, empty states, the flow between screens. Tiny tweaks I make directly. Anything bigger goes back on the board as
                  a new ticket for the night shift.
                </P>
                <P>
                  When the feature is done, I close the PRD and delete the temporary planning files. Stale docs rot, and a future agent will happily
                  trust a plan that stopped being true weeks ago.
                </P>
              </Stage>
            </div>

            {/* codebase */}
            <H2 id="codebase" kicker="Long-term health">
              Keeping the codebase agent-friendly
            </H2>
            <P>
              The workflow only stays fast if the code stays easy to navigate. Matt leans on an idea from John Ousterhout’s{" "}
              <em>A Philosophy of Software Design</em>: prefer <span className="font-semibold">deep modules</span>, meaning a lot of behaviour behind
              a small, simple interface, over dozens of shallow files that each do a little.
            </P>
            <Modules />
            <P>
              Deep modules help agents in two ways: there’s less to read to find the right place, and I can put broad, high-value tests around a whole
              flow instead of mocking every tiny piece. Every so often I run his architecture pass (<Cmd>/improve-codebase-architecture</Cmd>) that
              looks for clusters of tightly coupled files and folds them into one testable module.
            </P>
            <Mine>
              When an agent makes the same mistake twice, the fix goes into <Cmd>AGENTS.md</Cmd>, not just the code. The rules file is the one piece
              of memory that survives clearing the context, so it’s where lessons have to live.
            </Mine>

            {/* summary */}
            <H2 id="summary" kicker="Cheat sheet">
              The whole thing on one table
            </H2>
            <ol className="mt-6 space-y-3 sm:hidden">
              {SUMMARY.map(([s, afk, tool, out, mine], i) => (
                <li key={s} className="rounded-2xl border border-line p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">
                      <span className="mr-2 font-mono text-muted">{i + 1}</span>
                      {s}
                    </span>
                    <Mode afk={afk} />
                  </div>
                  <p className="mt-2 font-mono text-xs text-accent">{tool}</p>
                  <p className="mt-1 text-sm text-fg/80">{out}</p>
                  <p className="mt-2 text-xs text-accent">+ {mine}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-line sm:block">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <thead className="bg-surface-2/60 text-xs tracking-wider text-muted uppercase">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Stage</th>
                    <th className="px-4 py-3 font-semibold">Mode</th>
                    <th className="px-4 py-3 font-semibold">Tool</th>
                    <th className="px-4 py-3 font-semibold">Output</th>
                    <th className="px-4 py-3 font-semibold text-accent">+ I add</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {SUMMARY.map(([s, afk, tool, out, mine], i) => (
                    <tr key={s}>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap">
                        <span className="mr-2 font-mono text-muted">{i + 1}</span>
                        {s}
                      </td>
                      <td className="px-4 py-3">
                        <Mode afk={afk} />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-accent">{tool}</td>
                      <td className="px-4 py-3 text-fg/80">{out}</td>
                      <td className="px-4 py-3 text-fg/80">{mine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* proof */}
            <section className="mt-16">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Where it shows</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">See it in real projects</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {doctor && (
                  <Link href={workPath(doctor)} className="group rounded-2xl border border-line p-5 transition-colors hover:border-accent/60">
                    <span className="block font-semibold group-hover:text-accent">{doctor.name} →</span>
                    <span className="mt-1 block text-sm text-muted">
                      140 automated tests and a 122-check walkthrough of every screen. Small modules, documented decisions.
                    </span>
                  </Link>
                )}
                {trucker && (
                  <Link href={workPath(trucker)} className="group rounded-2xl border border-line p-5 transition-colors hover:border-accent/60">
                    <span className="block font-semibold group-hover:text-accent">{trucker.name} →</span>
                    <span className="mt-1 block text-sm text-muted">
                      My own SaaS, with unit and Playwright end-to-end tests gating every push in CI.
                    </span>
                  </Link>
                )}
              </div>
            </section>

            {/* credit */}
            <p className="mt-12 border-t border-line pt-6 text-sm text-muted">
              The workflow, the smart-zone model and the skills (<Cmd>/grill-me</Cmd>, <Cmd>/write-a-prd</Cmd>, <Cmd>/prd-to-issues</Cmd>,{" "}
              <Cmd>/improve-codebase-architecture</Cmd>) are Matt Pocock’s, from{" "}
              <a href={SOURCE} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                {SOURCE_TITLE}
              </a>
              . Watch it, it’s worth the time. The notes marked “My addition” are how I extend it on my own projects.
            </p>

            {/* CTA */}
            <section className="relative mt-12 overflow-hidden rounded-3xl border border-accent/30 bg-surface-2/50 p-6 md:p-10">
              <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
              <h2 className="relative text-2xl font-bold tracking-tight md:text-3xl">Want this on your team?</h2>
              <p className="relative mt-2 max-w-lg text-muted">
                I’m open to software engineering roles and selected freelance work. Happy to walk through any of it live.
              </p>
              <div className="relative mt-6 flex flex-wrap gap-3">
                <Link
                  href="/pro"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-fg shadow-lg shadow-accent/25 transition hover:brightness-110"
                >
                  See the full portfolio <span aria-hidden>→</span>
                </Link>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center rounded-lg border border-line px-6 py-3 font-semibold hover:bg-hover"
                >
                  Email me
                </a>
              </div>
            </section>
          </article>

          {/* table of contents (desktop) */}
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-24 mt-10 border-l border-line pl-4 text-sm">
              <p className="mb-3 text-xs font-semibold tracking-wider text-muted uppercase">On this page</p>
              <ul className="space-y-2">
                {TOC.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className={`text-muted hover:text-accent ${/^\d/.test(label) ? "pl-3" : ""} block`}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

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
