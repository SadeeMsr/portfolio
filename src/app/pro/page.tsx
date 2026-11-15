import type { Metadata } from "next";
import { profile } from "@/data/resume";
import ProPage from "@/pro/ProPage";

export const metadata: Metadata = {
  title: { absolute: `${profile.name} · ${profile.title}` },
  description: profile.summary,
};

export default function Page() {
  return <ProPage />;
}
