"use client";

import { useState } from "react";
import { profile } from "@/data/resume";
import { IconExternal, IconGithub, IconLinkedin, IconMail } from "../icons";
import { Button, LinkButton } from "../ui";

const DEFAULT_SUBJECT = "Let's work together";

export function gmailComposeUrl(subject = DEFAULT_SUBJECT, body = "") {
  const q = new URLSearchParams({ view: "cm", fs: "1", to: profile.email, su: subject, body });
  return `https://mail.google.com/mail/?${q.toString()}`;
}

export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // older browsers / blocked clipboard: fall back to a temporary input
      const input = document.createElement("input");
      input.value = profile.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
}

export default function Mail() {
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [body, setBody] = useState("");
  const { copied, copy } = useCopyEmail();

  return (
    <div className="@container h-full overflow-auto os-scroll">
      <div className="mx-auto flex max-w-xl flex-col gap-5 p-5 @md:p-8">
        <div className="text-center">
          <h2 className="text-xl font-bold">Say hello 👋</h2>
          <p className="mt-1 text-sm text-muted">Hiring, freelance work or just a question: my inbox is open.</p>
        </div>

        {/* the email itself is the hero */}
        <div className="rounded-2xl border-2 border-accent/40 bg-accent/10 p-4">
          <p className="text-xs font-medium tracking-wider text-muted uppercase">Email</p>
          <div className="mt-1 flex flex-col gap-3 @sm:flex-row @sm:items-center">
            <span className="min-w-0 flex-1 truncate font-mono text-base font-semibold @md:text-lg">{profile.email}</span>
            <Button variant="accent" onClick={copy} className="shrink-0" aria-live="polite">
              {copied ? "Copied ✓" : "Copy email"}
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <LinkButton href={gmailComposeUrl(subject, body)} external>
              <IconMail className="h-4 w-4" /> Open in Gmail
              <IconExternal className="h-3.5 w-3.5 opacity-60" />
            </LinkButton>
            <LinkButton href={profile.links.linkedin} external>
              <IconLinkedin className="h-4 w-4" /> LinkedIn
            </LinkButton>
            <LinkButton href={profile.links.github} external>
              <IconGithub className="h-4 w-4" /> GitHub
            </LinkButton>
          </div>
        </div>

        {/* optional draft that pre-fills the Gmail compose window */}
        <details className="group rounded-2xl border border-line bg-surface-2">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium select-none">
            <span className="mr-2 inline-block transition-transform group-open:rotate-90">›</span>
            Draft a message first (opens in Gmail)
          </summary>
          <div className="flex flex-col gap-3 border-t border-line p-4">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Subject</span>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="rounded-lg border border-line bg-surface px-3 py-2 outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Message</span>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                placeholder="Hi Rohan, we'd love to talk about…"
                className="resize-none rounded-lg border border-line bg-surface px-3 py-2 outline-none placeholder:text-muted focus:border-accent"
              />
            </label>
            <LinkButton href={gmailComposeUrl(subject, body)} external variant="accent" className="self-start">
              <IconMail className="h-4 w-4" /> Continue in Gmail
            </LinkButton>
          </div>
        </details>

        <p className="text-center text-xs text-muted">Average reply time: faster than your CI pipeline.</p>
      </div>
    </div>
  );
}
