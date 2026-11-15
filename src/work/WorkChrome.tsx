import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "@/data/resume";

export function WorkHeader() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-line bg-bg/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 md:px-8">
        <Link href="/pro" className="text-lg font-bold tracking-tight">
          rohan<span className="text-accent">.</span>
        </Link>
        <nav className="ml-4 hidden items-center gap-1 text-sm sm:flex">
          <Link href="/work" className="rounded-full px-3 py-1.5 text-muted hover:bg-hover hover:text-fg">
            All work
          </Link>
          <Link href="/pro" className="rounded-full px-3 py-1.5 text-muted hover:bg-hover hover:text-fg">
            Portfolio
          </Link>
          <Link href="/pro#contact" className="rounded-full px-3 py-1.5 text-muted hover:bg-hover hover:text-fg">
            Contact
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/os"
            className="hidden rounded-full border border-line px-3.5 py-1.5 text-sm font-medium hover:border-accent hover:text-accent sm:inline-flex"
          >
            Try RohanOS
          </Link>
          <a href={profile.resumePdf} download className="rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-fg hover:brightness-110">
            Résumé
          </a>
        </div>
      </div>
    </header>
  );
}

export function WorkFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted sm:flex-row md:px-8">
        <span>
          © {profile.name} · {profile.title}
        </span>
        {children}
      </div>
    </footer>
  );
}
