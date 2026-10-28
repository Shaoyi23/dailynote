import type { Metadata } from "next";
import { AmbientBackground } from "@/components/ambient-background";
import { Avatar } from "@/components/avatar";
import { FigmaMark, ReactMark, TypeScriptMark } from "@/components/icons";
import { PillLink } from "@/components/pill-link";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { TextLink } from "@/components/text-link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location,
  },
  sameAs: siteConfig.socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href),
};

export default function Home() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-11 outline-none sm:py-20"
    >
      <AmbientBackground />

      <div className="relative z-10 w-full max-w-[34rem]">
        <div className="w-full">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />

          <h1 className="sr-only">
            {siteConfig.name} — {siteConfig.role}
          </h1>

          <RevealGroup className="flex flex-col gap-8 sm:gap-11">
            <RevealItem>
              <Avatar />
            </RevealItem>

            <div className="flex flex-col gap-5 sm:gap-7">
              <RevealItem>
                <p className="text-body text-pretty text-ink">
                  i’m{" "}
                  <span className="name-highlight">{siteConfig.name}</span>, a
                  design-minded developer based in {siteConfig.location}. i care
                  about calm interfaces, fast software, and the small details
                  that make a product feel human.
                </p>
              </RevealItem>

              <RevealItem>
                <p className="text-body text-pretty text-secondary">
                  i spend most of my time with{" "}
                  <PillLink
                    href="https://www.typescriptlang.org/"
                    icon={<TypeScriptMark />}
                    label="TypeScript"
                  >
                    TypeScript
                  </PillLink>,{" "}
                  <PillLink
                    href="https://react.dev/"
                    icon={<ReactMark />}
                    label="React"
                  >
                    React
                  </PillLink>, and{" "}
                  <PillLink
                    href="https://www.figma.com/"
                    icon={<FigmaMark />}
                    label="Figma"
                  >
                    Figma
                  </PillLink>{" "}
                  — usually somewhere between design and engineering. i like
                  working with small teams, turning fuzzy ideas into shipped
                  products, and sweating the first five seconds.
                </p>
              </RevealItem>

              <RevealItem>
                <p className="text-body text-pretty text-secondary">
                  i’m curious about{" "}
                  <TextLink
                    href="https://www.inkandswitch.com/local-first/"
                    tone="sage"
                  >
                    local-first software
                  </TextLink>
                  , ai-native tools, and the quiet parts of a product: motion,
                  typography, empty states, error messages. i keep a small pile
                  of{" "}
                  <TextLink
                    href="https://github.com/your-handle"
                    tone="sky"
                  >
                    side projects
                  </TextLink>{" "}
                  and keep a{" "}
                  <TextLink href="/ux-lab" tone="clay">
                    lab of UX experiments
                  </TextLink>{" "}
                  — small interactions rebuilt to understand how they feel. i
                  think the best interfaces are the ones you barely notice.
                </p>
              </RevealItem>

              <RevealItem>
                <p className="text-body text-pretty text-secondary">
                  i also write{" "}
                  <TextLink href="/blog" tone="plum">
                    blog
                  </TextLink>
                  . short notes on interface details, the web, and whatever i’m
                  learning.
                </p>
              </RevealItem>

              <RevealItem>
                <p className="text-body text-pretty text-secondary">
                  away from the keyboard, i’m a formula 1 fan. i love how a lap
                  becomes a story — a late brake, a kerb, one corner that
                  changes a race. i keep a small{" "}
                  <TextLink href="/track" tone="clay">
                    track guide
                  </TextLink>{" "}
                  for the circuits i can’t stop thinking about.
                </p>
              </RevealItem>

              <RevealItem>
                <p className="text-body text-pretty text-secondary">
                  i’m always up for a conversation about a good idea. if you’d
                  like to build something together,{" "}
                  <TextLink href={`mailto:${siteConfig.email}`} tone="clay">
                    say hello
                  </TextLink>
                  .
                </p>
              </RevealItem>
            </div>

            <RevealItem>
              <div className="flex flex-col gap-7">
                <hr className="border-0 border-t border-line" />
                <SiteFooter />
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </main>
  );
}
