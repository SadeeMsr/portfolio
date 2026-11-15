import type { MetadataRoute } from "next";
import { SITE_URL, projects, workPath } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/pro`, priority: 0.9 },
    { url: `${SITE_URL}/work`, priority: 0.8 },
    { url: `${SITE_URL}/os`, priority: 0.6 },
    ...projects.map((p) => ({ url: `${SITE_URL}${workPath(p)}`, priority: 0.7 })),
  ];
}
