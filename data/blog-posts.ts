import { BlogPost } from "@/types/global";

export const blogPosts: BlogPost[] = [
  {
    slug: "how-much-does-ketamine-therapy-cost",
    title: "How Much Does Ketamine Therapy Cost in 2026?",
    description:
      "A comprehensive breakdown of ketamine therapy pricing including IV infusions, IM injections, intranasal, and Spravato. Learn about insurance coverage, financing options, and how to budget for treatment.",
    date: "2026-03-15",
    author: "Ketamine Clinics Editorial",
    image: "/images/blog/ketamine-cost.jpg",
    tags: ["cost", "insurance", "financing"],
  },
  {
    slug: "ketamine-for-depression-what-to-expect",
    title: "Ketamine for Depression: What to Expect from Your Treatment",
    description:
      "Learn how ketamine therapy works for treatment-resistant depression, the NMDA receptor mechanism, treatment timeline, and what a typical session feels like.",
    date: "2026-03-10",
    author: "Ketamine Clinics Editorial",
    image: "/images/blog/ketamine-depression.jpg",
    tags: ["depression", "treatment", "guide"],
  },
  {
    slug: "ketamine-vs-esketamine-spravato",
    title: "Ketamine vs. Esketamine (Spravato): Key Differences Explained",
    description:
      "Compare racemic ketamine and esketamine (Spravato) including FDA status, cost, insurance coverage, administration methods, and REMS certification requirements.",
    date: "2026-03-05",
    author: "Ketamine Clinics Editorial",
    image: "/images/blog/ketamine-vs-spravato.jpg",
    tags: ["spravato", "esketamine", "comparison"],
  },
  {
    slug: "how-to-find-ketamine-clinic-near-me",
    title: "How to Find a Ketamine Clinic Near You: 7 Questions to Ask",
    description:
      "A practical guide to evaluating ketamine clinics with seven essential questions about credentials, protocols, safety, and pricing to ask before your first appointment.",
    date: "2026-02-28",
    author: "Ketamine Clinics Editorial",
    image: "/images/blog/find-clinic.jpg",
    tags: ["guide", "clinics", "questions"],
  },
  {
    slug: "ketamine-for-chronic-pain",
    title: "Ketamine for Chronic Pain: CRPS, Fibromyalgia, and Neuropathic Pain",
    description:
      "Explore the evidence behind ketamine therapy for chronic pain conditions including CRPS, fibromyalgia, and neuropathic pain. Learn about pain-specific protocols and what patients report.",
    date: "2026-02-20",
    author: "Ketamine Clinics Editorial",
    image: "/images/blog/chronic-pain.jpg",
    tags: ["chronic-pain", "crps", "fibromyalgia"],
  },
  {
    slug: "what-happens-at-first-ketamine-session",
    title: "What Happens at Your First Ketamine Session: A Step-by-Step Guide",
    description:
      "Walk through every step of your first ketamine therapy appointment from intake paperwork to post-infusion recovery. Know what to bring, what to avoid, and what to expect.",
    date: "2026-02-15",
    author: "Ketamine Clinics Editorial",
    image: "/images/blog/first-session.jpg",
    tags: ["guide", "first-visit", "preparation"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
