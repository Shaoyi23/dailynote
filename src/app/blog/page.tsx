import type { Metadata } from "next";
import { AmbientBackground } from "@/components/ambient-background";
import { BackLink } from "@/components/back-link";
import { PostList } from "@/components/post-list";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { posts } from "@/data/posts";
import { siteConfig } from "@/data/site";

const description =
  "Notes on interface details, frontend craft, and the things I learn while building.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    title: `Blog — ${siteConfig.name}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog — ${siteConfig.name}`,
    description,
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: `${siteConfig.url}/blog`,
  name: `Blog — ${siteConfig.name}`,
  description,
  isPartOf: {
    "@type": "WebSite",
    url: siteConfig.url,
    name: siteConfig.name,
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/blog/${post.slug}`,
      name: post.title,
    })),
  },
};

export default function BlogPage() {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />

        <RevealGroup className="flex flex-col gap-10 sm:gap-12">
          <RevealItem>
            <div className="flex flex-col gap-8">
              <BackLink href="/">home</BackLink>
              <div className="flex flex-col gap-2">
                <h1 className="text-lead text-ink">blog</h1>
                <p className="text-body text-pretty text-secondary">
                  notes on what i’m learning, mostly interface details and the
                  web.
                </p>
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <PostList posts={posts} highlightNew />
          </RevealItem>
        </RevealGroup>
      </div>
    </main>
  );
}
