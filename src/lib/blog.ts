import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const blogDirectory = path.join(process.cwd(), "content/blog");

const frontmatterSchema = z.object({
  title: z.string().trim().min(1, "title is required"),
  description: z.string().trim().min(1, "description is required"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date must use YYYY-MM-DD"),
  readingTime: z.string().trim().min(1, "readingTime is required"),
});

export type PostMeta = z.infer<typeof frontmatterSchema>;

export type PostSummary = PostMeta & {
  slug: string;
  hasTranslation: boolean;
};

export type PostVariant = PostMeta & {
  lang: "en" | "zh-CN";
  content: string;
};

export type BlogPost = {
  slug: string;
  en: PostVariant;
  zh?: PostVariant;
};

function readVariant(slug: string, fileName: string): PostVariant | null {
  const filePath = path.join(blogDirectory, slug, fileName);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const result = frontmatterSchema.safeParse(parsed.data);

  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in ${path.relative(process.cwd(), filePath)}: ${result.error.issues
        .map((issue) => `${issue.path.join(".")} ${issue.message}`)
        .join(", ")}`,
    );
  }

  return {
    ...result.data,
    lang: fileName === "zh.mdx" ? "zh-CN" : "en",
    content: parsed.content.trim(),
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        fs.existsSync(path.join(blogDirectory, entry.name, "en.mdx")),
    )
    .map((entry) => entry.name);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const en = readVariant(slug, "en.mdx");

  if (!en) {
    return null;
  }

  return {
    slug,
    en,
    zh: readVariant(slug, "zh.mdx") ?? undefined,
  };
}

export function getAllPosts(): PostSummary[] {
  return getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);

      if (!post) {
        return null;
      }

      return {
        title: post.en.title,
        description: post.en.description,
        date: post.en.date,
        readingTime: post.en.readingTime,
        slug: post.slug,
        hasTranslation: Boolean(post.zh),
      };
    })
    .filter((post): post is PostSummary => post !== null)
    .sort((a, b) => {
      if (a.date === b.date) {
        return a.title.localeCompare(b.title);
      }

      return b.date.localeCompare(a.date);
    });
}

export function getMorePosts(slug: string, limit = 3): PostSummary[] {
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}
