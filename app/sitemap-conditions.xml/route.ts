import { conditions } from "@/data/conditions";

const SITE_URL = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN || "ketamineclinics.com"}`;

export async function GET() {
  const now = new Date().toISOString();

  const urls = conditions
    .map(
      (condition) => `
  <url>
    <loc>${SITE_URL}/ketamine-for-${condition.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
