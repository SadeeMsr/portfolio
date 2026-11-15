import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  redirects() {
    return [
      { source: "/resume", destination: "/pro", permanent: false },
      { source: "/work", destination: "/pro/work", permanent: true },
      { source: "/work/:slug", destination: "/pro/work/:slug", permanent: true },
      { source: "/pro/work/barnyardrecs", destination: "/pro/work/barnyard-recs", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
