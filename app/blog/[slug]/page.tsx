import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/data/blog-posts";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { SITE_URL, SITE_NAME } from "@/lib/utils";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

function getMdxContent(slug: string): { content: string; data: Record<string, any> } | null {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(raw);
    return { content, data };
  } catch {
    return null;
  }
}

/* Simple MDX-to-HTML converter for static rendering */
function renderMdxToHtml(content: string): string {
  let html = content;

  // Remove import statements
  html = html.replace(/^import\s+.*$/gm, "");

  // Convert headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");

  // Convert bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Convert italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert unordered lists
  html = html.replace(
    /(?:^- .+\n?)+/gm,
    (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((l) => `<li>${l.replace(/^- /, "")}</li>`)
        .join("\n");
      return `<ul>${items}</ul>`;
    }
  );

  // Convert ordered lists
  html = html.replace(
    /(?:^\d+\. .+\n?)+/gm,
    (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((l) => `<li>${l.replace(/^\d+\. /, "")}</li>`)
        .join("\n");
      return `<ol>${items}</ol>`;
    }
  );

  // Convert blockquotes
  html = html.replace(
    /(?:^> .+\n?)+/gm,
    (match) => {
      const text = match.replace(/^> /gm, "").trim();
      return `<blockquote><p>${text}</p></blockquote>`;
    }
  );

  // Convert tables
  html = html.replace(
    /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g,
    (_, header, body) => {
      const ths = header
        .split("|")
        .filter((c: string) => c.trim())
        .map((c: string) => `<th>${c.trim()}</th>`)
        .join("");
      const rows = body
        .trim()
        .split("\n")
        .map((row: string) => {
          const tds = row
            .split("|")
            .filter((c: string) => c.trim())
            .map((c: string) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${tds}</tr>`;
        })
        .join("\n");
      return `<table><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
    }
  );

  // Convert horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Wrap remaining paragraphs
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<p")
      ) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .join("\n\n");

  return html;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const mdx = getMdxContent(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-teal text-sm mb-8 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> All Articles
      </Link>

      <article>
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-teal text-xs uppercase tracking-wider bg-teal/5 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl md:text-4xl text-soft-white mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-soft-white/60 text-lg mb-6">{post.description}</p>

          <div className="flex items-center gap-6 text-soft-white/40 text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
          </div>
        </header>

        {mdx ? (
          <div
            className="prose-ketamine"
            dangerouslySetInnerHTML={{ __html: renderMdxToHtml(mdx.content) }}
          />
        ) : (
          <div className="prose-ketamine">
            <p>
              This article is coming soon. Please check back later for the full content.
            </p>
          </div>
        )}
      </article>

      {/* Related Articles */}
      <section className="mt-16 pt-10 border-t border-white/5">
        <h2 className="font-display text-2xl text-soft-white mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogPosts
            .filter((p) => p.slug !== params.slug)
            .slice(0, 2)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="bg-card border border-white/5 rounded-xl p-5 hover:border-teal/30 transition-all group"
              >
                <h3 className="font-display text-base text-soft-white group-hover:text-teal transition-colors mb-1">
                  {p.title}
                </h3>
                <p className="text-soft-white/50 text-sm line-clamp-2">{p.description}</p>
              </Link>
            ))}
        </div>
      </section>

      <div className="mt-12">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
