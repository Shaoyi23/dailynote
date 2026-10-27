import Link from "next/link";
import { AmbientBackground } from "@/components/ambient-background";
import { RevealGroup, RevealItem } from "@/components/reveal";

export default function NotFound() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-16 outline-none"
    >
      <AmbientBackground />
      <div className="relative z-10 w-full max-w-[34rem]">
        <RevealGroup className="flex flex-col gap-5">
          <RevealItem>
            <p className="font-mono text-[0.7rem] tracking-[0.16em] text-muted">
              404
            </p>
          </RevealItem>
          <RevealItem>
            <h1 className="text-lead text-ink">this page wandered off.</h1>
          </RevealItem>
          <RevealItem>
            <p className="text-body text-pretty text-secondary">
              the link might be old, or the page might not exist yet.{" "}
              <Link href="/" className="text-link text-sage [--link-color:var(--sage)]">
                head back home
              </Link>
              .
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </main>
  );
}
