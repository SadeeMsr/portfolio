"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { education, experience, profile, projects, skills } from "@/data/resume";
import { APP_IDS, type AppId } from "../apps";
import { useOS } from "../context";
import { ACCENTS, useSettings, type Accent } from "../settings";

type Line = { id: number; node: ReactNode };

const PROMPT = (
  <>
    <span className="font-bold text-[#8ae234]">rohan@rohanos</span>
    <span className="text-white">:</span>
    <span className="font-bold text-[#729fcf]">~</span>
    <span className="text-white">$ </span>
  </>
);

const FILES: Record<string, string> = {
  "about.txt": profile.summary,
  "contact.txt": `email:    ${profile.email}\ngithub:   ${profile.links.github}\nlinkedin: ${profile.links.linkedin}`,
  "resume.pdf": "Binary file. Try `resume` to download it, or `open resume`.",
  ".secrets": "Nice try. The only secret is that I write tests. Sometimes first.",
};

const COMMANDS = [
  "help", "whoami", "about", "experience", "projects", "skills", "education", "contact", "resume",
  "open", "theme", "accent", "neofetch", "ls", "cat", "pwd", "date", "echo", "history", "clear", "exit", "coffee", "sudo",
];

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#729fcf] underline">
    {children}
  </a>
);

const WELCOME = (
  <span className="text-white/70">
    Welcome to RohanOS 2.0 LTS (GNU/Next.js 16 x86_64)
    {"\n\n"} * Documentation: type <span className="text-[#fce94f]">help</span>
    {"\n"} * Support:       you’re looking at him
    {"\n\n"}0 updates can be applied immediately. 1 developer can be hired immediately.
  </span>
);

const LOGO = String.raw`
    ____        __
   / __ \____  / /_  ____ _____
  / /_/ / __ \/ __ \/ __ \`/ __ \
 / _, _/ /_/ / / / / /_/ / / / /
/_/ |_|\____/_/ /_/\__,_/_/ /_/
`;

export default function Terminal() {
  const os = useOS();
  const settings = useSettings();
  const [lines, setLines] = useState<Line[]>([{ id: 0, node: WELCOME }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const idRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const push = (...nodes: ReactNode[]) =>
    setLines((ls) => [...ls, ...nodes.map((node) => ({ id: idRef.current++, node }))]);


  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const run = (raw: string) => {
    const cmdline = raw.trim();
    push(
      <span>
        {PROMPT}
        {raw}
      </span>,
    );
    if (!cmdline) return;
    setHistory((h) => [...h, cmdline]);
    const [cmd, ...args] = cmdline.split(/\s+/);
    const arg = args.join(" ");

    switch (cmd) {
      case "help":
        push(
          <span>
            Available commands:{"\n"}
            {[
              ["whoami", "who is this guy"],
              ["about", "short bio"],
              ["experience", "work history"],
              ["projects", "things I've built"],
              ["skills", "tech stack"],
              ["education", "degree & courses"],
              ["contact", "how to reach me"],
              ["resume", "download the PDF"],
              ["open <app>", `open an app (${APP_IDS.join(", ")})`],
              ["theme <light|dark|auto>", "change the theme"],
              ["accent <color>", `change accent (${Object.keys(ACCENTS).join(", ")})`],
              ["neofetch", "system info, but make it pretty"],
              ["ls, cat, pwd, date, echo, history, clear, exit", ""],
            ].map(([c, d]) => (
              <span key={c}>
                {"  "}
                <span className="text-[#fce94f]">{c.padEnd(26)}</span>
                {d}
                {"\n"}
              </span>
            ))}
            <span className="text-white/50">{"\n"}There may also be some undocumented commands. Real devs read the source.</span>
          </span>,
        );
        break;
      case "whoami":
        push(`${profile.name}: ${profile.title} · ${profile.location} · ${profile.status.toLowerCase()}`);
        break;
      case "about":
        push(profile.summary);
        break;
      case "experience":
        push(
          <span>
            {experience.map((j) => (
              <span key={j.company}>
                <span className="text-[#8ae234]">{j.role}</span> @ <span className="font-bold">{j.company}</span>{" "}
                <span className="text-white/50">({j.period})</span>
                {"\n"}
                {j.points.map((p) => `  • ${p}\n`)}
                {"\n"}
              </span>
            ))}
          </span>,
        );
        break;
      case "projects":
        push(
          <span>
            {projects.map((p) => (
              <span key={p.slug}>
                <span className="text-[#fce94f]">{p.name}</span> <span className="text-white/50">[{p.year}]</span> — {p.tagline}
                {"\n"}
                {"  "}
                {p.stack.join(" · ")}
                {(p.url || p.repo) && (
                  <>
                    {"\n  "}
                    <A href={(p.url ?? p.repo)!}>{p.url ?? p.repo}</A>
                  </>
                )}
                {"\n\n"}
              </span>
            ))}
          </span>,
        );
        break;
      case "skills": {
        const pro = skills.filter((s) => s.level === "proficient").map((s) => s.name);
        const basic = skills.filter((s) => s.level === "basic").map((s) => s.name);
        push(
          <span>
            <span className="text-[#8ae234]">proficient:</span> {pro.join(", ")}
            {"\n"}
            <span className="text-white/60">basic:</span> {basic.join(", ")}
          </span>,
        );
        break;
      }
      case "education":
        push(`${education.degree}\n${education.school} (${education.period})`);
        break;
      case "contact":
        push(
          <span>
            email:    <A href={`mailto:${profile.email}`}>{profile.email}</A>
            {"\n"}github:   <A href={profile.links.github}>{profile.links.github}</A>
            {"\n"}linkedin: <A href={profile.links.linkedin}>{profile.links.linkedin}</A>
          </span>,
        );
        break;
      case "resume": {
        const a = document.createElement("a");
        a.href = profile.resumePdf;
        a.download = "Md_Shadi_Rohan_Resume.pdf";
        a.click();
        push("Downloading Md_Shadi_Rohan_Resume.pdf… done. (That was easier than apt.)");
        break;
      }
      case "open": {
        if (!arg) {
          push(`usage: open <app>. Apps: ${APP_IDS.join(", ")}`);
        } else if ((APP_IDS as readonly string[]).includes(arg)) {
          os.openApp(arg as AppId);
          push(`Opening ${arg}…`);
        } else {
          push(`open: ${arg}: no such app`);
        }
        break;
      }
      case "theme":
        if (arg === "light" || arg === "dark" || arg === "auto") {
          settings.set({ theme: arg });
          push(`Theme set to ${arg}.`);
        } else push("usage: theme <light|dark|auto>");
        break;
      case "accent":
        if (arg in ACCENTS) {
          settings.set({ accent: arg as Accent });
          push(`Accent set to ${arg}. Looking sharp.`);
        } else push(`usage: accent <${Object.keys(ACCENTS).join("|")}>`);
        break;
      case "neofetch":
        push(
          <span className="flex flex-wrap gap-x-6">
            <span className="text-accent">{LOGO}</span>
            <span>
              {"\n"}
              <span className="font-bold text-accent">rohan</span>@<span className="font-bold text-accent">rohanos</span>
              {"\n"}-------------{"\n"}
              {[
                ["OS", "RohanOS 2.0 LTS x86_64"],
                ["Host", "Dhaka, Bangladesh"],
                ["Kernel", "next-16.4"],
                ["Uptime", "since 2019"],
                ["Shell", "zsh (with too many aliases)"],
                ["Theme", `${settings.resolvedTheme} / ${settings.accent}`],
                ["CPU", "Brain @ deadline GHz"],
                ["Memory", "every API contract / ∞"],
                ["Status", profile.status],
              ].map(([k, v]) => (
                <span key={k}>
                  <span className="font-bold text-accent">{k}</span>: {v}
                  {"\n"}
                </span>
              ))}
            </span>
          </span>,
        );
        break;
      case "ls":
        push(
          <span>
            {Object.keys(FILES)
              .filter((f) => args.includes("-a") || !f.startsWith("."))
              .map((f) => (
                <span key={f} className={f.endsWith(".pdf") ? "text-[#ad7fa8]" : ""}>
                  {f}
                  {"  "}
                </span>
              ))}
            <span className="font-bold text-[#729fcf]">projects/</span>
          </span>,
        );
        break;
      case "cat":
        if (!arg) push("usage: cat <file>");
        else if (FILES[arg]) push(FILES[arg]);
        else if (arg.startsWith("projects")) push("cat: projects/: Is a directory. Try `projects`.");
        else push(`cat: ${arg}: No such file or directory`);
        break;
      case "cd":
        push(arg && arg !== "~" ? `cd: ${arg}: you're already exactly where you need to be` : "");
        break;
      case "pwd":
        push("/home/rohan");
        break;
      case "date":
        push(new Date().toString());
        break;
      case "echo":
        push(arg);
        break;
      case "history":
        push([...history, cmdline].map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join("\n"));
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        os.closeApp("terminal");
        break;
      case "coffee":
        push(
          <span className="text-[#c4a000]">
            {"   ( (\n    ) )\n  ........\n  |      |]\n  \\      /\n   `----'\n"}
            <span className="text-white/70">coffee.service restarted. Productivity +40%.</span>
          </span>,
        );
        break;
      case "sudo":
        if (arg === "hire-me" || arg === "hire rohan" || arg === "hire-rohan") {
          push(
            <span>
              [sudo] password for recruiter: ********{"\n"}
              <span className="text-[#8ae234]">✔ Access granted.</span> Opening a direct line to Rohan…
            </span>,
          );
          setTimeout(() => os.openApp("mail"), 600);
        } else if (args[0] === "apt" && args.includes("rohan")) {
          push(
            "Reading package lists... Done\nThe following NEW packages will be installed:\n  rohan (2.0-lts)\nNeed to get 1 developer. After this operation, your team will ship faster.\nRun `sudo hire-me` to continue.",
          );
        } else if (args[0] === "rm" || arg.includes("rm -rf")) {
          push("Nice try. Permission denied: this portfolio is load-bearing.");
        } else {
          push("visitor is not in the sudoers file. This incident will be reported. (Try `sudo hire-me`.)");
        }
        break;
      case "rm":
        push(arg.includes("-rf") ? "Nice try. Permission denied: this portfolio is load-bearing." : `rm: cannot remove '${arg}': it's load-bearing`);
        break;
      case "apt":
      case "apt-get":
        push(args.includes("rohan") ? "E: Could not open lock file — are you root? Try `sudo apt install rohan`." : "E: Unable to locate package. It's a portfolio, not a server.");
        break;
      case "vim":
      case "vi":
        push("You are now trapped in vim. Just kidding. Type :q! out of habit anyway.");
        break;
      case ":q":
      case ":q!":
      case ":wq":
        push("Freedom. 🎉");
        break;
      case "git":
        push(args[0] === "blame" ? "It was me. It's always me." : "fatal: not a git repository (but the rest of my work is: `contact`)");
        break;
      case "hello":
      case "hi":
        push("Hey! 👋 Type `help` to look around, or `sudo hire-me` to skip to the good part.");
        break;
      default:
        push(`${cmd}: command not found. Type \`help\` for a list.`);
    }
  };

  const complete = () => {
    const parts = input.split(" ");
    if (parts.length === 1) {
      const m = COMMANDS.filter((c) => c.startsWith(parts[0]));
      if (m.length === 1) setInput(m[0] + " ");
      else if (m.length > 1) push(<span>{PROMPT}{input}{"\n"}{m.join("  ")}</span>);
    } else if (parts[0] === "open") {
      const m = APP_IDS.filter((a) => a.startsWith(parts[1]));
      if (m.length === 1) setInput(`open ${m[0]}`);
    } else if (parts[0] === "cat") {
      const m = Object.keys(FILES).filter((f) => f.startsWith(parts[1]));
      if (m.length === 1) setInput(`cat ${m[0]}`);
    }
  };

  return (
    <div
      className="h-full overflow-auto os-scroll bg-terminal p-3 font-mono text-[13.5px] leading-snug text-white/90"
      onClick={() => {
        if (!window.getSelection()?.toString()) inputRef.current?.focus();
      }}
    >
      {lines.map((l) => (
        <div key={l.id} className="break-words whitespace-pre-wrap">
          {l.node}
        </div>
      ))}
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
          setHIndex(-1);
        }}
      >
        <span className="whitespace-pre">{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              complete();
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              if (!history.length) return;
              const i = hIndex === -1 ? history.length - 1 : Math.max(0, hIndex - 1);
              setHIndex(i);
              setInput(history[i]);
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              if (hIndex === -1) return;
              const i = hIndex + 1;
              if (i >= history.length) {
                setHIndex(-1);
                setInput("");
              } else {
                setHIndex(i);
                setInput(history[i]);
              }
            } else if (e.key === "l" && e.ctrlKey) {
              e.preventDefault();
              setLines([]);
            }
          }}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          aria-label="Terminal input"
          className="min-w-0 flex-1 bg-transparent caret-white outline-none"
        />
      </form>
      <div ref={endRef} />
    </div>
  );
}
