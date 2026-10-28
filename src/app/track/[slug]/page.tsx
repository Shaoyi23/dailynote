import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AmbientBackground } from "@/components/ambient-background";
import { BackLink } from "@/components/back-link";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { TrackExplorer } from "@/components/track-explorer";
import { siteConfig } from "@/data/site";
import { getTrack, tracks } from "@/data/tracks";

type TrackDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }));
}

export async function generateMetadata({
  params,
}: TrackDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const track = getTrack(slug);

  if (!track) {
    return {};
  }

  return {
    title: track.shortName,
    description: track.summary,
    alternates: {
      canonical: `/track/${track.slug}`,
    },
    openGraph: {
      type: "website",
      url: `/track/${track.slug}`,
      title: `${track.shortName} — ${siteConfig.name}`,
      description: track.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: `${track.shortName} — ${siteConfig.name}`,
      description: track.summary,
    },
  };
}

export default async function TrackDetailPage({
  params,
}: TrackDetailPageProps) {
  const { slug } = await params;
  const track = getTrack(slug);

  if (!track) {
    notFound();
  }

  const trackSchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: track.name,
    description: track.summary,
    url: `${siteConfig.url}/track/${track.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: track.city,
      addressCountry: track.country,
    },
    isPartOf: {
      "@type": "CollectionPage",
      name: `Tracks — ${siteConfig.name}`,
      url: `${siteConfig.url}/track`,
    },
  };

  return (
    <main
      id="main"
      tabIndex={-1}
      className="relative flex min-h-svh justify-center overflow-hidden px-6 py-12 outline-none sm:py-16"
    >
      <AmbientBackground />

      <div className="relative z-10 flex w-full max-w-[64rem] flex-col gap-9">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(trackSchema) }}
        />

        <RevealGroup className="mx-auto flex w-full max-w-[48rem] flex-col gap-8">
          <RevealItem>
            <BackLink href="/track">tracks</BackLink>
          </RevealItem>

          <RevealItem>
            <header className="flex flex-col gap-3">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-racing">
                {track.country} · {track.city}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="text-[2.15rem] leading-none tracking-[-0.04em] text-ink sm:text-[2.5rem]">
                  {track.shortName}
                </h1>
                <p className="text-body text-muted">{track.tagline}</p>
              </div>
              <p className="max-w-[42rem] text-body text-pretty text-secondary">
                {track.summary}
              </p>
            </header>
          </RevealItem>

          <RevealItem>
            <dl className="grid grid-cols-2 border-y border-line sm:grid-cols-4">
              <div className="border-b border-line py-3.5 pr-4 sm:border-b-0 sm:border-r">
                <dt className="text-[0.58rem] uppercase tracking-[0.13em] text-muted">
                  length
                </dt>
                <dd className="mt-1 font-mono text-[0.9rem] text-ink">
                  {track.lengthKm.toFixed(3)} km
                </dd>
              </div>
              <div className="border-b border-line py-3.5 pl-4 sm:border-b-0 sm:border-r sm:pl-5">
                <dt className="text-[0.58rem] uppercase tracking-[0.13em] text-muted">
                  corners
                </dt>
                <dd className="mt-1 font-mono text-[0.9rem] text-ink">
                  {track.turnCount}
                </dd>
              </div>
              <div className="py-3.5 pr-4 sm:border-r sm:pl-5">
                <dt className="text-[0.58rem] uppercase tracking-[0.13em] text-muted">
                  direction
                </dt>
                <dd className="mt-1 font-mono text-[0.9rem] text-ink">
                  {track.direction}
                </dd>
              </div>
              <div className="py-3.5 pl-4 sm:pl-5">
                <dt className="text-[0.58rem] uppercase tracking-[0.13em] text-muted">
                  lap record
                </dt>
                <dd className="mt-1 font-mono text-[0.9rem] text-ink">
                  {track.lapRecord.time}
                </dd>
                <dd className="mt-0.5 text-[0.6rem] text-muted">
                  {track.lapRecord.driver}, {track.lapRecord.year}
                </dd>
              </div>
            </dl>
          </RevealItem>
        </RevealGroup>

        <RevealGroup>
          <RevealItem>
            <TrackExplorer track={track} />
          </RevealItem>
        </RevealGroup>

        <p className="mx-auto w-full max-w-[48rem] text-[0.6rem] text-muted/70">
          track geometry adapted from{" "}
          <a
            href="https://github.com/bacinger/f1-circuits"
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-line underline-offset-2 transition-colors hover:text-ink"
          >
            f1-circuits
          </a>{" "}
          (MIT) · corner notes are illustrative.
        </p>
      </div>
    </main>
  );
}
