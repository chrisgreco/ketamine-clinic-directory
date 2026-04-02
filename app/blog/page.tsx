import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ketamine Therapy Resources & Guides",
  description:
    "Evidence-based articles about ketamine therapy for depression, PTSD, chronic pain, and more. Pricing guides, treatment expectations, and how to find a clinic.",
  openGraph: {
    title: "Ketamine Therapy Resources & Guides",
    description:
      "Educational articles about ketamine therapy, treatment costs, what to expect, and how to find a provider.",
    url: `${SITE_URL}/blog`,
  },
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <p className="text-teal text-sm uppercase tracking-wider mb-2">Resources</p>
        <h1 className="font-display text-3xl md:text-4xl text-soft-white mb-4">
          Ketamine Therapy Guides &amp; Articles
        </h1>
        <p className="text-soft-white/60 max-w-2xl mx-auto">
          Evidence-based information about ketamine therapy to help you make informed decisions.
          Always consult your physician before beginning any treatment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-card border border-white/5 rounded-xl p-6 hover:border-teal/30 transition-all group flex flex-col"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-teal text-xs uppercase tracking-wider bg-teal/5 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-display text-lg text-soft-white group-hover:text-teal transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-soft-white/50 text-sm line-clamp-3 flex-1">
              {post.description}
            </p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <p className="text-soft-white/30 text-xs">{post.date}</p>
              <span className="text-teal text-sm flex items-center gap-1">
                Read <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
