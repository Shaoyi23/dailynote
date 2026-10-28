import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AmbientBackground } from "@/components/ambient-background";
import { BackLink } from "@/components/back-link";
import { ArrowUpRightIcon } from "@/components/icons";
import { LabDemo } from "@/components/lab-demos";
import { LabMoreList } from "@/components/lab-more-list";
import { RevealGroup, RevealItem } from "@/components/reveal";
import {
  formatLabDate,
  getLabExperiment,
  getMoreLabExperiments,
  labAccentTints,
  labExperiments,
  labSourceUrl,
} from "@/data/lab";
import { siteConfig } from "@/data/site";

type UxLabExperimentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return labExperiments.map((experiment) => ({
    slug: experiment.slug,
  }));
}

export async function generateMetadata({
  params,
}: UxLabExperimentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getLabExperiment(slug);

  if (!experiment) {
    return {};
  }

  const description = experiment.description[0];

  return {
    title: experiment.title,
    description,
    alternates: {
      canonical: `/ux-lab/${experiment.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/ux-lab/${experiment.slug}`,
      title: `${experiment.title} — ${siteConfig.name}`,
      description,
      publishedTime: experiment.date,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${experiment.title} — ${siteConfig.name}`,
      description,
    },
  };
}

export default async function UxLabExperimentPage({
  params,
}: UxLabExperimentPageProps) {
  const { slug } = await params;
  const experiment = getLabExperiment(slug);

  if (!experiment) {
    notFound();
  }

  const moreExperiments = getMoreLabExperiments(experiment.slug);
  const experimentSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: experiment.title,
    description: experiment.description.join(" "),
    dateCreated: experiment.date,
    url: `${siteConfig.url}/ux-lab/${experiment.slug}`,
    codeRepository: labSourceUrl,
    programmingLanguage: "TypeScript",
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    isPartOf: {
      "@type": "CollectionPage",
      name: `UX Lab — ${siteConfig.name}`,
      url: `${siteConfig.url}/ux-lab`,
    },
  };

  return (
    <main
      id="main"
      tabIndex={-1}
      className="relative flex min-h-svh justify-center overflow-hidden px-6 py-14 outline-none sm:py-20"
    >
      <AmbientBackground />

      <div className="relative z-10 w-full max-w-[33.6rem]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(experimentSchema) }}
        />

        <RevealGroup className="flex flex-col gap-10 sm:gap-12">
          <RevealItem>
            <div className="flex flex-col gap-8">
              <BackLink href="/ux-lab">ux lab</BackLink>
              <div className="flex flex-col gap-2">
                <h1 className="text-lead text-ink">{experiment.title}</h1>
                <time
                  dateTime={experiment.date}
                  className="text-meta text-muted"
                >
                  {formatLabDate(experiment.date)}
                </time>
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="flex flex-col gap-2">
              <div
                className="relative flex min-h-[20rem] items-center justify-center overflow-hidden rounded-lg border border-line/70 px-6 py-10 sm:min-h-[22rem]"
                style={{
                  background: labAccentTints[experiment.accent],
                }}
              >
                <LabDemo kind={experiment.demo} />
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-canvas/60 px-2.5 py-1 text-[0.62rem] leading-none text-muted ring-1 ring-line/60 backdrop-blur-sm"
                >
                  <span className="size-1.5 rounded-full bg-sage/80" />
                  live
                </span>
              </div>

              <div className="flex items-center gap-x-4 text-meta text-muted">
                <p className="min-w-0 text-pretty">{experiment.caption}</p>
                <a
                  href={labSourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group ml-auto inline-flex shrink-0 items-center gap-1 rounded-sm transition-colors duration-200 hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/15"
                >
                  <span className="relative after:absolute after:inset-x-0 after:-bottom-[0.1em] after:h-[0.14em] after:rounded-full after:bg-line after:transition-colors after:duration-200 group-hover:after:bg-ink/30">
                    source
                  </span>
                  <ArrowUpRightIcon className="size-2.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="flex flex-col gap-4">
              {experiment.description.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-body text-pretty text-secondary"
                >
                  {paragraph}
                </p>
              ))}
              <p className="text-body text-pretty text-secondary">
                <span className="text-ink">key insight:</span>{" "}
                {experiment.insight}
              </p>
            </div>
          </RevealItem>

          <RevealItem>
            <section
              aria-labelledby="more-experiments"
              className="flex flex-col gap-4 border-t border-line pt-7"
            >
              <h2 id="more-experiments" className="text-meta text-muted">
                more experiments
              </h2>
              <LabMoreList experiments={moreExperiments} />
            </section>
          </RevealItem>
        </RevealGroup>
      </div>
    </main>
  );
}
