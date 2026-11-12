# RohanOS: Md Shadi Rohan's portfolio

An OS-style portfolio: an Ubuntu-inspired desktop on large screens and an Android-inspired phone UI on mobile. Built with Next.js 16, React 19 and Tailwind CSS 4.

## Run

```bash
pnpm install
pnpm dev
```

## Where things live

- `src/data/resume.ts`: **all content** (profile, experience, projects, skills). Edit this file to update every view.
- `src/os/apps/*`: the apps (About, Release Notes, Files, System Monitor, Terminal, Mail, Bug Squasher, Settings, …)
- `src/os/desktop/*`: desktop shell (top bar, dock, window manager, Activities, boot screen)
- `src/os/mobile/Phone.tsx`: mobile shell (lock screen, home screen, quick settings)
- `src/app/resume/page.tsx`: Recruiter Mode, a plain one-page resume
- `public/Md_Shadi_Rohan_Resume.pdf`: the downloadable PDF

Tip: delete `rohanos.booted` from localStorage to see the boot screen again.
