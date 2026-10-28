import type { Metadata } from "next";
import Link from "next/link";
import { AmbientBackground } from "@/components/ambient-background";
import { BackLink } from "@/components/back-link";
import { ArrowUpRightIcon } from "@/components/icons";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { siteConfig } from "@/data/site";
import { tracks, type Track } from "@/data/tracks";

const description =
  "Three Formula 1 circuits, explored corner by corner through their lines, stories, and the moments that decide a lap.";

export const metadata: Metadata = {
  title: "Tracks",
  description,
  alternates: {
    canonical: "/track",
  },
  openGraph: {
    type: "website",
    url: "/track",
    title: `Tracks — ${siteConfig.name}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `Tracks — ${siteConfig.name}`,
    description,
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: `${siteConfig.url}/track`,
  name: `Tracks — ${siteConfig.name}`,
  description,
  isPartOf: {
    "@type": "WebSite",
    url: siteConfig.url,
    name: siteConfig.name,
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: tracks.length,
    itemListElement: tracks.map((track, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/track/${track.slug}`,
      name: track.name,
    })),
  },
};

function TrackCard({ track, index }: { track: Track; index: number }) {
  return (
    <Link
      href={`/track/${track.slug}`}
      className="group flex flex-col gap-4 focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-ink/15"
    >
      <div className="track-surface relative aspect-[8/5] overflow-hidden rounded-xl border border-carbon/25">
        <span className="absolute left-4 top-4 z-10 rounded-full bg-carbon/55 px-2 py-1 font-mono text-[0.6rem] tracking-[0.14em] text-track/60 backdrop-blur-sm">
          0{index + 1} / {track.country.toLowerCase()}
        </span>

        <svg
          viewBox="0 0 1000 640"
          aria-hidden="true"
          className="absolute inset-0 size-full"
        >
          <path
            d={track.path}
            fill="none"
            className="stroke-track/10 transition-colors duration-300 group-hover:stroke-track/15"
            strokeWidth="18"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d={track.path}
            fill="none"
            className="stroke-track transition-colors duration-300 group-hover:stroke-hivis"
            strokeWidth="7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle
            cx={track.turns[0].x}
            cy={track.turns[0].y}
            r="7"
            className="fill-racing"
          />
        </svg>

        <span className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full border border-track/15 bg-carbon/40 text-track/70 backdrop-blur-sm transition-colors duration-300 group-hover:border-hivis/40 group-hover:text-hivis">
          <ArrowUpRightIcon className="size-3" />
        </span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">
            {track.city} · {track.country}
          </p>
          <h2 className="mt-1 text-[1.3rem] leading-none text-ink">
            {track.shortName}
          </h2>
          <p className="mt-1.5 text-[0.72rem] text-muted">{track.tagline}</p>
        </div>
        <p className="shrink-0 text-right font-mono text-[0.62rem] leading-relaxed text-muted">
          {track.lengthKm.toFixed(3)} km
          <br />
          {track.turnCount} turns
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line/70 pt-3">
        <p className="text-[0.65rem] text-muted/75">
          lap record {track.lapRecord.time} · {track.lapRecord.driver}
        </p>
        <span className="shrink-0 text-[0.6rem] text-muted/60 transition-colors duration-200 group-hover:text-ink">
          explore
        </span>
      </div>
    </Link>
  );
}

export default function TrackPage() {
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
                <h1 className="text-lead text-ink">tracks</h1>
                <p className="max-w-[34rem] text-body text-pretty text-secondary">
                  three circuits i keep coming back to. pick one and explore it
                  corner by corner.
                </p>
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {tracks.map((track, index) => (
                <li key={track.slug}>
                  <TrackCard track={track} index={index} />
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
      </div>
    </main>
  );
}
