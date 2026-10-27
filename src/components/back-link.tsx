import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeftIcon } from "@/components/icons";

export function BackLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1.5 text-meta text-muted transition-colors duration-200 hover:text-ink focus-visible:rounded-xs"
    >
      <ArrowLeftIcon className="-ml-0.5 size-3.75 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
      <span className="relative after:absolute after:inset-x-0 after:-bottom-[0.1em] after:h-[0.14em] after:rounded-full after:bg-line after:transition-colors after:duration-200 group-hover:after:bg-ink/30">
        {children}
      </span>
    </Link>
  );
}
