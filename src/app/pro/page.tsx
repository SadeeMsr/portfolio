import type { Metadata } from "next";
import { profile } from "@/data/resume";
import ProPage from "@/pro/ProPage";

export const metadata: Metadata = {
  title: { absolute: `${profile.name} · ${profile.title}` },
  description: "Projects, case studies and experience of a software engineer who ships with AI.",
};

export default function Page() {
  return <ProPage />;
}
