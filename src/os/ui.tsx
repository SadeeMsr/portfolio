import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-hover px-2.5 py-0.5 text-xs text-fg/90">
      {children}
    </span>
  );
}

const btn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";

export function Button({
  variant = "default",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "accent" | "ghost" }) {
  const v =
    variant === "accent"
      ? "bg-accent text-accent-fg hover:brightness-110"
      : variant === "ghost"
        ? "hover:bg-hover"
        : "bg-hover hover:bg-fg/10 border border-line";
  return <button type="button" className={`${btn} ${v} ${className}`} {...props} />;
}

export function LinkButton({
  variant = "default",
  className = "",
  external,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "default" | "accent"; external?: boolean }) {
  const v = variant === "accent" ? "bg-accent text-accent-fg hover:brightness-110" : "bg-hover hover:bg-fg/10 border border-line";
  return (
    <a
      className={`${btn} ${v} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="mb-2 text-xs font-semibold tracking-wider text-muted uppercase">{children}</h3>;
}
