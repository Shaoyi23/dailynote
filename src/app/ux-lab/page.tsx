import type { Metadata } from "next";
import Link from "next/link";
import { AmbientBackground } from "@/components/ambient-background";
import { BackLink } from "@/components/back-link";
import { LabPreview } from "@/components/lab-preview";
import { RevealGroup, RevealItem } from "@/components/reveal";
import {
  formatLabDate,
  labAccentTints,
  labExperiments,
} from "@/data/lab";
import { siteConfig } from "@/data/site";

const description =
  "Small UX experiments rebuilt to understand how interactions feel.";

export const metadata: Metadata = {
  title: "UX Lab",
  description,
  alternates: {
    canonical: "/ux-lab",
  },
  openGraph: {
    type: "website",
    url: "/ux-lab",
    title: `UX Lab — ${siteConfig.name}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `UX Lab — ${siteConfig.name}`,
    description,
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: `${siteConfig.url}/ux-lab`,
  name: `UX Lab — ${siteConfig.name}`,
  description,
  isPartOf: {
    "@type": "WebSite",
    url: siteConfig.url,
    name: siteConfig.name,
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: labExperiments.length,
    itemListElement: labExperiments.map((experiment, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/ux-lab/${experiment.slug}`,
      name: experiment.title,
    })),
  },
};

export default function UxLabPage() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="relative flex min-h-svh justify-center overflow-hidden px-6 py-14 outline-none sm:py-20"
    >
      <AmbientBackground />

      <div className="relative z-10 w-full max-w-[64rem]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />

        <RevealGroup className="flex flex-col gap-10 sm:gap-12">
          <RevealItem>
            <div className="flex flex-col gap-8">
              <BackLink href="/">home</BackLink>
              <div className="flex flex-col gap-2">
                <h1 className="text-lead text-ink">ux lab</h1>
                <p className="text-body text-pretty text-secondary">
                  {description.toLowerCase()}
                </p>
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {labExperiments.map((experiment, index) => (
                <li key={experiment.slug}>
                  <Link
                    href={`/ux-lab/${experiment.slug}`}
                    className="group -m-2 flex flex-col gap-3 rounded-[0.8rem] p-2 transition-colors duration-200 hover:bg-fill/55 focus-visible:ring-2 focus-visible:ring-ink/15"
                  >
                    <div
                      className="relative aspect-[8/5] overflow-hidden rounded-lg border border-line/70"
                      style={{
                        background: labAccentTints[experiment.accent],
                      }}
                    >
                      <LabPreview kind={experiment.demo} />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-ink/[0.035] transition-[box-shadow] duration-200 group-hover:ring-ink/[0.09]"
                      />
                    </div>

                    <div className="relative flex items-baseline justify-between gap-3">
                      {index === 0 ? (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute left-0 top-1/2 hidden -translate-x-[calc(100%+0.65rem)] -translate-y-1/2 -rotate-6 xl:block"
                        >
                          <span className="relative inline-flex items-center justify-center px-2.5 py-1 font-hand text-[1.15rem] leading-none text-clay/85">
                            new
                            <svg
                              viewBox="0 0 62 40"
                              preserveAspectRatio="none"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              className="pointer-events-none absolute -inset-x-1 -inset-y-1 h-[calc(100%+0.5rem)] w-[calc(100%+0.5rem)]"
                            >
                              <path d="M29 36.5C34 37.5 41 37 46 35.5C52.5 34 58 30.5 58.2 25C59.8 17 55.5 8 47 5.5C39 3.5 30 2.8 22 4C13 5.5 4.5 9.5 3.5 17C2.8 26 10 33.5 24 36C30 37 37 36.5 44 34.2" />
                            </svg>
                          </span>
                        </span>
                      ) : null}

                      <span className="min-w-0 truncate text-body leading-tight text-ink">
                        {experiment.title}
                      </span>
                      <time
                        dateTime={experiment.date}
                        className="shrink-0 text-meta text-muted"
                      >
                        {formatLabDate(experiment.date)}
                      </time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
      </div>
    </main>
  );
}
