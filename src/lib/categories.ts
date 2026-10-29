export const blogCategoryIds = ["ai", "typescript", "node", "design"] as const;

export type BlogCategory = (typeof blogCategoryIds)[number];

export const blogCategoryMeta: Record<
  BlogCategory,
  { label: string; tone: "plum" | "sky" | "sage" | "clay" }
> = {
  ai: { label: "AI", tone: "plum" },
  typescript: { label: "TypeScript", tone: "sky" },
  node: { label: "Node", tone: "sage" },
  design: { label: "design", tone: "clay" },
};
