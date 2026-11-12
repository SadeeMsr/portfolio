"use client";

import { useState } from "react";
import { profile } from "@/data/resume";
import { IconGithub, IconLinkedin, IconMail } from "../icons";
import { Button, LinkButton } from "../ui";

export default function Mail() {
  const [subject, setSubject] = useState("Let's work together");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);

  const send = () => {
    const url = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the address is visible anyway */
    }
  };

  return (
    <div className="@container flex h-full flex-col overflow-auto os-scroll">
      <form
        className="flex flex-1 flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5 text-sm">
          <span className="w-14 text-muted">To</span>
          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-accent">{profile.email}</span>
          <button type="button" onClick={copy} className="ml-auto text-xs text-muted hover:text-fg">
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <label className="flex items-center gap-3 border-b border-line px-4 py-2.5 text-sm">
          <span className="w-14 text-muted">Subject</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="min-w-0 flex-1 bg-transparent outline-none"
          />
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Hi Rohan, we'd love to talk about…"
          aria-label="Message"
          className="min-h-40 flex-1 resize-none bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted"
        />
        <div className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-3">
          <Button type="submit" variant="accent">
            <IconMail className="h-4 w-4" /> Send
          </Button>
          <LinkButton href={profile.links.linkedin} external>
            <IconLinkedin className="h-4 w-4" /> LinkedIn
          </LinkButton>
          <LinkButton href={profile.links.github} external>
            <IconGithub className="h-4 w-4" /> GitHub
          </LinkButton>
          <span className="ml-auto hidden text-xs text-muted @md:inline">Opens your mail app. Average reply time: faster than CI.</span>
        </div>
      </form>
    </div>
  );
}
