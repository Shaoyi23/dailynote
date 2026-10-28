"use client";

import { useState } from "react";
import { BackLink } from "@/components/back-link";
import {
  formatPostDate,
  type Post,
  type PostBlock,
} from "@/data/posts";

type Language = "en" | "zh";

function highlightLine(line: string) {
  const tokens = line.split(
    /(\b(?:var|let|const|for|function|return|if|else|new)\b|\b(?:setTimeout|console\.log)\b|\b\d+\b|=>)/g,
  );

  return tokens.map((token, index) => {
    if (!token) {
      return null;
    }

    let className = "";

    if (/^(var|let|const|for|function|return|if|else|new)$/.test(token)) {
      className = "text-clay";
    } else if (/^(setTimeout|console\.log)$/.test(token)) {
      className = "text-sky";
    } else if (/^\d+$/.test(token)) {
      className = "text-sage";
    } else if (token === "=>") {
      className = "text-plum";
    }

    return (
      <span key={index} className={className || undefined}>
        {token}
      </span>
    );
  });
}

function CodeBlock({
  code,
  language = "js",
}: {
  code: string;
  language?: string;
}) {
  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <div className="overflow-hidden rounded-lg border border-line/80 bg-[#f0e8dc]/70">
      <div className="border-b border-line/70 px-4 py-2">
        <span className="font-mono text-[0.64rem] tracking-[0.12em] text-muted">
          {language}
        </span>
      </div>
      <pre
        tabIndex={0}
        aria-label={`${language} code example`}
        className="overflow-x-auto px-4 py-4 font-mono text-[0.77rem] leading-[1.85] text-ink"
      >
        <code className="block min-w-max">
          {lines.map((line, index) => (
            <span key={index} className="flex">
              <span
                aria-hidden="true"
                className="w-7 shrink-0 select-none pr-3 text-right text-muted/45"
              >
                {index + 1}
              </span>
              <span className="whitespace-pre">{highlightLine(line)}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
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
          case "code":
            return (
              <CodeBlock
                key={index}
                code={block.code}
                language={block.language}
              />
            );
          case "callout":
            return (
              <aside
                key={index}
                className="rounded-lg border border-clay/20 bg-clay/[0.055] px-4 py-3.5"
              >
                <p className="text-[0.64rem] tracking-[0.14em] text-clay">
                  {block.label}
                </p>
                <p className="mt-1 text-body normal-case text-ink">
                  {block.text}
                </p>
              </aside>
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

function LanguageToggle({
  language,
  onChange,
  translationLabel,
}: {
  language: Language;
  onChange: (language: Language) => void;
  translationLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label="Article language"
      className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-line/70 bg-fill/55 p-0.5 text-[0.68rem] normal-case"
    >
      <button
        type="button"
        aria-pressed={language === "en"}
        onClick={() => onChange("en")}
        className={`rounded-full px-2.5 py-1 leading-none transition-colors duration-150 ${
          language === "en"
            ? "bg-canvas text-ink shadow-[0_1px_1px_rgba(44,41,35,0.1)]"
            : "text-muted hover:text-ink"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={language === "zh"}
        onClick={() => onChange("zh")}
        className={`rounded-full px-2.5 py-1 leading-none transition-colors duration-150 ${
          language === "zh"
            ? "bg-canvas text-ink shadow-[0_1px_1px_rgba(44,41,35,0.1)]"
            : "text-muted hover:text-ink"
        }`}
      >
        {translationLabel}
      </button>
    </div>
  );
}

export function ArticleView({ post }: { post: Post }) {
  const [language, setLanguage] = useState<Language>("en");
  const translation = post.translation;
  const isChinese = language === "zh" && Boolean(translation);
  const copy = isChinese && translation ? translation : post;
  const articleLanguage = isChinese && translation ? translation.lang : "en";

  return (
    <article lang={articleLanguage} className="flex flex-col gap-7">
      <div className="flex items-center justify-between gap-4">
        <BackLink href="/blog">blog</BackLink>
        {translation ? (
          <LanguageToggle
            language={language}
            onChange={setLanguage}
            translationLabel={translation.label}
          />
        ) : null}
      </div>

      <header className="flex flex-col gap-3">
        <h1 className="text-[1.2rem] leading-[1.35] tracking-[-0.01em] text-ink">
          {copy.title}
        </h1>
        <div className="flex items-center gap-2 text-meta text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span
            aria-hidden="true"
            className="size-0.5 rounded-full bg-muted/50"
          />
          <span>{copy.readingTime}</span>
        </div>
      </header>

      <PostBody content={copy.content} />
    </article>
  );
}
