import type { CSSProperties, ReactNode } from "react";

type Tone = "sage" | "clay" | "sky" | "plum";

export function TextLink({
  href,
  children,
  tone = "sage",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const isExternal = href.startsWith("http");
  const style = {
    "--link-color": `var(--${tone})`,
  } as CSSProperties;

  return (
    <a
      href={href}
      className={`text-link ${className}`}
      style={style}
      {...(isExternal
        ? { target: "_blank", rel: "noreferrer noopener" }
        : undefined)}
    >
      {children}
    </a>
  );
}
