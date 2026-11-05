import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  icon?: ReactNode;
  external?: boolean;
  className?: string;
};

/**
 * Pill-shaped link with a fill that rises from the bottom on hover.
 */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  icon,
  external = false,
  className = "",
}: ButtonLinkProps) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition-colors duration-500 ease-cinema";
  const styles =
    variant === "solid"
      ? "bg-paper text-ink hover:text-paper"
      : "border border-white/20 text-paper hover:text-ink";
  const fill = variant === "solid" ? "bg-ink-raised" : "bg-paper";

  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-full rounded-full ${fill} transition-transform duration-500 ease-cinema group-hover:translate-y-0`}
      />
      <span className="relative">{children}</span>
      {icon ? (
        <span className="relative transition-transform duration-500 ease-cinema group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      ) : null}
    </a>
  );
}
