import Link from "next/link";
import type { PostSummary } from "@/lib/blog";
import { formatDate } from "@/lib/date";

export function PostList({
  posts,
  highlightNew = false,
}: {
  posts: PostSummary[];
  highlightNew?: boolean;
}) {
  return (
    <ul className="-mx-4 flex flex-col gap-1">
      {posts.map((post, index) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            title={post.title}
            className="group relative flex items-center gap-3 rounded-full px-4 py-2 transition-colors duration-200 hover:bg-fill active:bg-fill-hover focus-visible:ring-2 focus-visible:ring-ink/15"
          >
            {highlightNew && index === 0 ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 hidden -translate-x-[calc(100%+0.55rem)] -translate-y-1/2 -rotate-6 md:block"
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

            <span className="min-w-0 shrink truncate text-body leading-tight text-ink">
              {post.title}
            </span>
            <span
              aria-hidden="true"
              className="h-px min-w-4 flex-1 bg-line/70 transition-colors duration-200 group-hover:bg-line"
            />
            <time
              dateTime={post.date}
              className="shrink-0 text-meta text-muted"
            >
              {formatDate(post.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
