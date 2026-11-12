"use client";

import type { ComponentType, ReactNode } from "react";
import About from "./apps/About";
import BugSquasher from "./apps/BugSquasher";
import Experience from "./apps/Experience";
import Files from "./apps/Files";
import Mail from "./apps/Mail";
import Readme from "./apps/Readme";
import ResumeViewer from "./apps/ResumeViewer";
import Settings from "./apps/Settings";
import Skills from "./apps/Skills";
import Terminal from "./apps/Terminal";
import Trash from "./apps/Trash";
import { AppIcons } from "./icons";

export const APP_IDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "terminal",
  "mail",
  "game",
  "resume",
  "settings",
  "readme",
  "trash",
] as const;
export type AppId = (typeof APP_IDS)[number];

export type AppDef = {
  id: AppId;
  title: string;
  /** Short label for mobile home screen */
  label: string;
  icon: ReactNode;
  Component: ComponentType;
  size: { w: number; h: number };
  keywords: string[];
  /** dark headerbar (terminal / game) */
  darkChrome?: boolean;
};

export const APPS: Record<AppId, AppDef> = {
  about: {
    id: "about",
    title: "About Me",
    label: "About",
    icon: AppIcons.about,
    Component: About,
    size: { w: 760, h: 620 },
    keywords: ["profile", "bio", "education", "university", "photo", "contact"],
  },
  experience: {
    id: "experience",
    title: "Release Notes — Experience",
    label: "Experience",
    icon: AppIcons.experience,
    Component: Experience,
    size: { w: 720, h: 640 },
    keywords: ["work", "job", "career", "spade", "doodle", "intern", "history"],
  },
  projects: {
    id: "projects",
    title: "Files — Projects",
    label: "Projects",
    icon: AppIcons.projects,
    Component: Files,
    size: { w: 820, h: 560 },
    keywords: ["portfolio", "sonamukh", "barnyard", "erp", "billing", "wozaef", "research", "aws", "cloud"],
  },
  skills: {
    id: "skills",
    title: "System Monitor — Skills",
    label: "Skills",
    icon: AppIcons.skills,
    Component: Skills,
    size: { w: 640, h: 600 },
    keywords: ["stack", "typescript", "next", "react", "node", "postgres", "aws", "graphql", "tech"],
  },
  terminal: {
    id: "terminal",
    title: "rohan@rohanos: ~",
    label: "Terminal",
    icon: AppIcons.terminal,
    Component: Terminal,
    size: { w: 720, h: 460 },
    keywords: ["shell", "command", "cli", "bash", "console"],
    darkChrome: true,
  },
  mail: {
    id: "mail",
    title: "New Message",
    label: "Mail",
    icon: AppIcons.mail,
    Component: Mail,
    size: { w: 620, h: 480 },
    keywords: ["contact", "email", "hire", "message", "linkedin", "github"],
  },
  game: {
    id: "game",
    title: "Bug Squasher",
    label: "Bug Squasher",
    icon: AppIcons.game,
    Component: BugSquasher,
    size: { w: 680, h: 520 },
    keywords: ["game", "play", "fun", "bugs"],
    darkChrome: true,
  },
  resume: {
    id: "resume",
    title: "Document Viewer — Resume.pdf",
    label: "Resume",
    icon: AppIcons.resume,
    Component: ResumeViewer,
    size: { w: 760, h: 720 },
    keywords: ["cv", "pdf", "download", "recruiter"],
  },
  settings: {
    id: "settings",
    title: "Settings",
    label: "Settings",
    icon: AppIcons.settings,
    Component: Settings,
    size: { w: 760, h: 560 },
    keywords: ["theme", "dark", "light", "wallpaper", "background", "accent", "color", "about"],
  },
  readme: {
    id: "readme",
    title: "README.md — Text Editor",
    label: "README",
    icon: AppIcons.readme,
    Component: Readme,
    size: { w: 600, h: 560 },
    keywords: ["welcome", "help", "start", "guide"],
  },
  trash: {
    id: "trash",
    title: "Trash",
    label: "Trash",
    icon: AppIcons.trash,
    Component: Trash,
    size: { w: 560, h: 420 },
    keywords: ["deleted", "bin", "recycle"],
  },
};

export const DOCK: AppId[] = ["about", "projects", "experience", "skills", "terminal", "mail", "resume", "game", "settings"];

export function searchApps(q: string): AppDef[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return Object.values(APPS).filter(
    (a) => a.title.toLowerCase().includes(s) || a.label.toLowerCase().includes(s) || a.keywords.some((k) => k.includes(s)),
  );
}
