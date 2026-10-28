import type { MetadataRoute } from "next";
import { labExperiments } from "@/data/lab";
import { siteConfig } from "@/data/site";
import { tracks } from "@/data/tracks";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const labEntries: MetadataRoute.Sitemap = labExperiments.map(
    (experiment) => ({
      url: `${siteConfig.url}/ux-lab/${experiment.slug}`,
      lastModified: new Date(`${experiment.date}T12:00:00Z`),
      changeFrequency: "yearly",
      priority: 0.6,
    }),
  );

  const trackEntries: MetadataRoute.Sitemap = tracks.map((track) => ({
    url: `${siteConfig.url}/track/${track.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postEntries,
    {
      url: `${siteConfig.url}/ux-lab`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...labEntries,
    {
      url: `${siteConfig.url}/track`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...trackEntries,
  ];
}
