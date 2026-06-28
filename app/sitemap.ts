import type { MetadataRoute } from "next";
import { COMPETITORS } from "@/lib/competitors";
import { BLOG_POSTS } from "@/lib/blog/posts";

const SITE_URL = "https://virello.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/features",
    "/pricing",
    "/vs",
    "/blog",
    "/about",
    "/contact",
    "/use-cases/creators",
    "/use-cases/agencies",
    "/use-cases/small-business",
    "/signup",
    "/login",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const vsRoutes = COMPETITORS.map((c) => ({
    url: `${SITE_URL}/vs/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...vsRoutes, ...blogRoutes];
}
