import type { ReactNode } from "react";

export function PillLink({
  href,
  children,
  icon,
  label,
}: {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  label?: string;
}) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      className="pill"
      aria-label={label}
      {...(isExternal
        ? { target: "_blank", rel: "noreferrer noopener" }
        : undefined)}
    >
      <span className="grid place-items-center" aria-hidden="true">
        {icon}
      </span>
      {children}
    </a>
  );
}
