import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AmbientBackground } from "@/components/ambient-background";
import { BackLink } from "@/components/back-link";
import { PostList } from "@/components/post-list";
import { RevealGroup, RevealItem } from "@/components/reveal";
import {
  formatPostDate,
  getMorePosts,
  getPostBySlug,
  posts,
  type PostBlock,
} from "@/data/posts";
import { siteConfig } from "@/data/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: `${post.title} — ${siteConfig.name}`,
      description: post.description,
      publishedTime: post.date,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — ${siteConfig.name}`,
      description: post.description,
    },
  };
}

function PostBody({ content }: { content: PostBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {content.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="mt-2 text-[1.02rem] font-medium leading-snug text-ink"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l border-clay/50 pl-4 text-[1.04rem] italic leading-[1.6] text-ink/75"
              >
                {block.text}
              </blockquote>
            );
          case "list":
            return (
              <ul
                key={index}
                className="flex list-disc flex-col gap-1.5 pl-5 text-body text-secondary marker:text-clay/70"
              >
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={index} className="text-body text-pretty text-secondary">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const morePosts = getMorePosts(post.slug);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
    inLanguage: "en-US",
  };

  return (
    <main
      id="main"
      tabIndex={-1}
      className="relative flex min-h-svh justify-center overflow-hidden px-6 py-14 outline-none sm:py-20"
    >
      <AmbientBackground />

      <div className="relative z-10 w-full max-w-[34rem]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <RevealGroup className="flex flex-col gap-10 sm:gap-12">
          <RevealItem>
            <article className="flex flex-col gap-7">
              <BackLink href="/blog">blog</BackLink>

              <header className="flex flex-col gap-3">
                <h1 className="text-[1.2rem] leading-[1.35] tracking-[-0.01em] text-ink">
                  {post.title}
                </h1>
                <div className="flex items-center gap-2 text-meta text-muted">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span
                    aria-hidden="true"
                    className="size-0.5 rounded-full bg-muted/50"
                  />
                  <span>{post.readingTime}</span>
                </div>
              </header>

              <PostBody content={post.content} />
            </article>
          </RevealItem>

          <RevealItem>
            <section
              aria-labelledby="more-posts"
              className="flex flex-col gap-4 border-t border-line pt-7"
            >
              <h2 id="more-posts" className="text-meta text-muted">
                more posts
              </h2>
              <PostList posts={morePosts} />
            </section>
          </RevealItem>
        </RevealGroup>
      </div>
    </main>
  );
}
