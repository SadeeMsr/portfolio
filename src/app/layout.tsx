import type { Metadata, Viewport } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import { profile } from "@/data/resume";
import { themeBootScript } from "@/os/theme";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name}: ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: `${profile.summary} Explore my portfolio as RohanOS, a tiny operating system in your browser.`,
  authors: [{ name: profile.name, url: profile.links.github }],
  keywords: ["Md Shadi Rohan", "full-stack developer", "Next.js", "TypeScript", "Node.js", "AWS", "portfolio", "Dhaka"],
  openGraph: {
    title: `${profile.name}: ${profile.title}`,
    description: profile.summary,
    type: "website",
    images: [{ url: profile.photo }],
  },
};

export const viewport: Viewport = {
  themeColor: "#140611",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" className={`${ubuntu.variable} ${ubuntuMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
