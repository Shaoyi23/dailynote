"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { PostList } from "@/components/post-list";
import {
  blogCategoryIds,
  blogCategoryMeta,
  type BlogCategory,
} from "@/lib/categories";
import type { PostSummary } from "@/lib/blog";
import { matchTitle } from "@/lib/search";

type CategoryFilter = BlogCategory | "all";

const filters: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "all" },
  ...blogCategoryIds.map((id) => ({ id, label: blogCategoryMeta[id].label })),
];

export function BlogExplorer({ posts }: { posts: PostSummary[] }) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const searchId = useId();

  const counts = useMemo(() => {
    const next = new Map<CategoryFilter, number>([["all", posts.length]]);

    for (const id of blogCategoryIds) {
      next.set(id, 0);
    }

    for (const post of posts) {
      next.set(post.category, (next.get(post.category) ?? 0) + 1);
    }

    return next;
  }, [posts]);

  const trimmedQuery = deferredQuery.trim();

  const results = useMemo(() => {
    return posts
      .filter((post) => category === "all" || post.category === category)
      .map((post) => ({
        post,
        match: trimmedQuery ? matchTitle(post.title, trimmedQuery) : null,
      }))
      .filter((entry) => !trimmedQuery || entry.match !== null)
      .sort((a, b) => {
        if (a.match && b.match) {
          const byScore = b.match.score - a.match.score;

          if (byScore !== 0) {
            return byScore;
          }
        }

        return b.post.date.localeCompare(a.post.date);
      })
      .map((entry) => entry.post);
  }, [posts, category, trimmedQuery]);

  const isFiltered = category !== "all" || trimmedQuery !== "";

  function resetFilters() {
    setCategory("all");
    setQuery("");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5 border-b border-line pb-2.5 transition-colors duration-200 focus-within:border-ink/40">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted"
          >
            <circle cx="7" cy="7" r="4.25" />
            <path d="m10.2 10.2 3.1 3.1" />
          </svg>
          <label htmlFor={searchId} className="sr-only">
            search posts by title
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="search by title"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 appearance-none bg-transparent text-body leading-tight text-ink outline-none placeholder:text-muted/70 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="clear search"
              className="shrink-0 rounded-full p-1 text-muted transition-colors duration-200 hover:text-ink"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                aria-hidden="true"
                className="size-3"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          ) : null}
        </div>

        <div
          role="group"
          aria-label="filter posts by category"
          className="flex flex-wrap items-center gap-1 sm:gap-1.5"
        >
          {filters.map((filter) => {
            const active = category === filter.id;
            const count = counts.get(filter.id) ?? 0;

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(filter.id)}
                className={`inline-flex items-baseline gap-1.5 rounded-full px-2.5 py-1 text-meta leading-none transition-colors duration-200 ${
                  active
                    ? "bg-ink text-canvas"
                    : "text-secondary hover:bg-fill hover:text-ink"
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={
                    active
                      ? "text-canvas/60"
                      : "text-muted/70"
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {results.length} {results.length === 1 ? "post" : "posts"} shown
      </p>

      {results.length > 0 ? (
        <PostList
          posts={results}
          query={trimmedQuery}
          highlightNew={!isFiltered}
        />
      ) : (
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-line/80 bg-fill/30 px-4 py-5">
          <p className="text-body text-pretty text-secondary">
            {trimmedQuery
              ? `no titles match “${trimmedQuery}”.`
              : "no posts in this category yet."}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="text-meta text-secondary underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-ink/40"
          >
            reset filters
          </button>
        </div>
      )}
    </div>
  );
}
