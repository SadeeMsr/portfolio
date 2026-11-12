"use client";

import { profile } from "@/data/resume";
import { useOS } from "../context";
import { IconDownload, IconExternal } from "../icons";
import { LinkButton } from "../ui";

export default function ResumeViewer() {
  const { mode } = useOS();
  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-line bg-sidebar px-3 py-2">
        <span className="mr-auto truncate font-mono text-xs text-muted">Md_Shadi_Rohan_Resume.pdf</span>
        <LinkButton href="/resume" className="!py-1.5">
          <IconExternal className="h-4 w-4" /> Recruiter Mode
        </LinkButton>
        <LinkButton href={profile.resumePdf} download variant="accent" className="!py-1.5">
          <IconDownload className="h-4 w-4" /> Download
        </LinkButton>
      </div>
      {mode === "desktop" ? (
        <iframe src={`${profile.resumePdf}#view=FitH`} title="Resume PDF" className="min-h-0 flex-1 bg-white" />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="text-sm text-muted">PDFs and phone screens don’t get along. Pick your format:</p>
          <LinkButton href="/resume" variant="accent">Open Recruiter Mode</LinkButton>
          <LinkButton href={profile.resumePdf} download>Download PDF</LinkButton>
        </div>
      )}
    </div>
  );
}
