import { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { blogPosts } from "@/data/blog-posts";
import { conditions } from "@/data/conditions";

const SITE_URL = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN || "ketamineclinics.com"}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/add-listing`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: city.tier === "metro" ? 0.9 : city.tier === "mid" ? 0.7 : 0.5,
  }));

  const conditionPages: MetadataRoute.Sitemap = conditions.map((condition) => ({
    url: `${SITE_URL}/ketamine-for-${condition.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...cityPages, ...conditionPages, ...blogPages];
}
