"use client";

import { useState, type ReactNode } from "react";
import { BackLink } from "@/components/back-link";

type ArticleVariant = {
  lang: "en" | "zh-CN";
  title: string;
  readingTime: string;
  content: ReactNode;
};

type Props = {
  date: string;
  dateLabel: string;
  english: ArticleVariant;
  chinese?: ArticleVariant & { label: string };
};

export function ArticleView({ date, dateLabel, english, chinese }: Props) {
  const [language, setLanguage] = useState<"en" | "zh">("en");
  const isChinese = language === "zh" && Boolean(chinese);
  const copy = isChinese && chinese ? chinese : english;

  return (
    <article lang={copy.lang} className="flex flex-col gap-7">
      <div className="flex items-center justify-between gap-4">
        <BackLink href="/blog">blog</BackLink>

        {chinese ? (
          <div
            role="group"
            aria-label="Article language"
            className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-line/70 bg-fill/55 p-0.5 text-[0.68rem] normal-case"
          >
            <button
              type="button"
              aria-pressed={!isChinese}
              onClick={() => setLanguage("en")}
              className={`rounded-full px-2.5 py-1 leading-none transition-colors duration-150 ${
                !isChinese
                  ? "bg-canvas text-ink shadow-[0_1px_1px_rgba(44,41,35,0.1)]"
                  : "text-muted hover:text-ink"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              aria-pressed={isChinese}
              onClick={() => setLanguage("zh")}
              className={`rounded-full px-2.5 py-1 leading-none transition-colors duration-150 ${
                isChinese
                  ? "bg-canvas text-ink shadow-[0_1px_1px_rgba(44,41,35,0.1)]"
                  : "text-muted hover:text-ink"
              }`}
            >
              {chinese.label}
            </button>
          </div>
        ) : null}
      </div>

      <header className="flex flex-col gap-3">
        <h1 className="text-[1.2rem] leading-[1.35] tracking-[-0.01em] text-ink">
          {copy.title}
        </h1>
        <div className="flex items-center gap-2 text-meta text-muted">
          <time dateTime={date}>{dateLabel}</time>
          <span
            aria-hidden="true"
            className="size-0.5 rounded-full bg-muted/50"
          />
          <span>{copy.readingTime}</span>
        </div>
      </header>

      <div className="article-mdx">{copy.content}</div>
    </article>
  );
}
