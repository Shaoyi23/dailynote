import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AmbientBackground } from "@/components/ambient-background";
import { ArticleView } from "@/components/article-view";
import { mdxComponents } from "@/components/mdx";
import { PostList } from "@/components/post-list";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { siteConfig } from "@/data/site";
import { getAllPosts, getMorePosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/date";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
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
    title: post.en.title,
    description: post.en.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: `${post.en.title} — ${siteConfig.name}`,
      description: post.en.description,
      publishedTime: post.en.date,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.en.title} — ${siteConfig.name}`,
      description: post.en.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const morePosts = getMorePosts(post.slug);
  const dateLabel = formatDate(post.en.date);
  const englishContent = (
    <MDXRemote source={post.en.content} components={mdxComponents} />
  );
  const chineseContent = post.zh ? (
    <MDXRemote source={post.zh.content} components={mdxComponents} />
  ) : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.en.title,
    description: post.en.description,
    datePublished: post.en.date,
    dateModified: post.en.date,
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
            <ArticleView
              date={post.en.date}
              dateLabel={dateLabel}
              english={{
                lang: "en",
                title: post.en.title,
                readingTime: post.en.readingTime,
                content: englishContent,
              }}
              chinese={
                post.zh
                  ? {
                      lang: "zh-CN",
                      label: "中文",
                      title: post.zh.title,
                      readingTime: post.zh.readingTime,
                      content: chineseContent,
                    }
                  : undefined
              }
            />
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
