import type { ReactNode } from "react";
import Link from "next/link";
import { blogCategoryMeta } from "@/lib/categories";
import type { PostSummary } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import { matchTitle, type MatchRange } from "@/lib/search";

function titleContent(title: string, ranges: MatchRange[]) {
  if (ranges.length === 0) {
    return title;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;

  ranges.forEach(([start, end], index) => {
    if (start > cursor) {
      parts.push(title.slice(cursor, start));
    }

    parts.push(
      <mark key={`match-${index}`} className="title-match">
        {title.slice(start, end)}
      </mark>,
    );
    cursor = end;
  });

  if (cursor < title.length) {
    parts.push(title.slice(cursor));
  }

  return parts;
}

export function PostList({
  posts,
  highlightNew = false,
  query = "",
}: {
  posts: PostSummary[];
  highlightNew?: boolean;
  query?: string;
}) {
  const trimmedQuery = query.trim();

  return (
    <ul className="-mx-4 flex flex-col gap-1">
      {posts.map((post, index) => {
        const category = blogCategoryMeta[post.category];
        const match = trimmedQuery
          ? matchTitle(post.title, trimmedQuery)
          : null;

        return (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              title={post.title}
              className="group grid grid-cols-[4rem_minmax(0,1fr)_auto] items-center gap-x-2 rounded-2xl px-3 py-2 transition-colors duration-200 hover:bg-fill active:bg-fill-hover focus-visible:ring-2 focus-visible:ring-ink/15 sm:grid-cols-[4.25rem_minmax(0,1fr)_auto] sm:gap-x-3 sm:px-4"
            >
              <span
                className="truncate text-[0.7rem] leading-none tracking-[0.03em]"
                style={{ color: `var(--${category.tone})` }}
              >
                {category.label}
              </span>

              <span className="flex min-w-0 items-center gap-2 sm:gap-3">
                <span className="min-w-0 shrink truncate text-body leading-tight text-ink">
                  {titleContent(post.title, match?.ranges ?? [])}
                </span>
                {highlightNew && index === 0 ? (
                  <span
                    aria-hidden="true"
                    className="hidden shrink-0 -rotate-6 font-hand text-[1rem] leading-none text-clay/85 sm:inline-block"
                  >
                    new
                  </span>
                ) : null}
                <span
                  aria-hidden="true"
                  className="hidden h-px min-w-4 flex-1 bg-line/70 transition-colors duration-200 group-hover:bg-line sm:block"
                />
              </span>

              <time dateTime={post.date} className="text-meta text-muted">
                {formatDate(post.date)}
              </time>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
