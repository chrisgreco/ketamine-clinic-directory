import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import CitySearch from "@/components/CitySearch";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { conditions } from "@/data/conditions";
import { cities } from "@/data/cities";
import { blogPosts } from "@/data/blog-posts";

export default function HomePage() {
  const metroCities = cities.filter((c) => c.tier === "metro").slice(0, 20);

  return (
    <>
      {/* Hero — asymmetric, editorial */}
      <section className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 py-16 md:py-24 items-center">
            <div>
              <p className="text-teal text-sm font-medium tracking-wide mb-4">
                200+ cities &middot; Verified providers &middot; Real patient reviews
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-soft-white leading-[1.1] mb-6">
                Find a ketamine therapy provider you can trust
              </h1>
              <p className="text-soft-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                Compare clinics offering IV ketamine and Spravato for depression, PTSD,
                anxiety, and chronic pain. Filter by insurance, telehealth, and treatment type.
              </p>
              <CitySearch />
              <div className="mt-6 flex flex-wrap gap-2">
                {conditions.slice(0, 4).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/ketamine-for-${c.slug}`}
                    className="text-xs text-soft-white/40 border border-white/10 rounded-full px-3 py-1.5 hover:border-teal/30 hover:text-teal transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="space-y-4">
                <div className="bg-card border border-white/5 rounded-2xl p-6">
                  <p className="text-teal font-display text-4xl font-bold">70%</p>
                  <p className="text-soft-white/50 text-sm mt-1">
                    of treatment-resistant depression patients report improvement with ketamine, according to published research
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card border border-white/5 rounded-xl p-5">
                    <p className="text-soft-white font-display text-2xl font-bold">24-72 hrs</p>
                    <p className="text-soft-white/40 text-xs mt-1">Typical onset of mood improvement</p>
                  </div>
                  <div className="bg-card border border-white/5 rounded-xl p-5">
                    <p className="text-soft-white font-display text-2xl font-bold">$400-800</p>
                    <p className="text-soft-white/40 text-xs mt-1">Per session, IV infusion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions — editorial layout, not a symmetric grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-soft-white mb-3">
            What ketamine therapy treats
          </h2>
          <p className="text-soft-white/50 leading-relaxed">
            Ketamine is most commonly used for conditions that haven&apos;t responded to
            conventional treatments. Here&apos;s what the research says about each.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {conditions.map((condition, i) => (
            <Link
              key={condition.slug}
              href={`/ketamine-for-${condition.slug}`}
              className="bg-navy p-6 hover:bg-card transition-colors group"
            >
              <span className="text-teal/40 text-xs font-mono">{condition.icdCode}</span>
              <h3 className="font-display text-base text-soft-white mt-2 mb-2 group-hover:text-teal transition-colors">
                {condition.name}
              </h3>
              <p className="text-soft-white/40 text-sm line-clamp-2 leading-relaxed">
                {condition.description.split(".")[0]}.
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works — horizontal, not card grid */}
      <section className="border-y border-white/5 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
              { num: "01", title: "Search your city", desc: "Browse verified ketamine clinics near you. Filter by condition, treatment type, insurance, and telehealth." },
              { num: "02", title: "Compare providers", desc: "Read patient reviews, check pricing, and see what each clinic offers before reaching out." },
              { num: "03", title: "Request a consultation", desc: "Submit an inquiry directly to the clinic. They'll follow up to discuss whether ketamine is right for you." },
            ].map((step) => (
              <div key={step.num} className="px-6 py-6 md:py-0 first:pl-0 last:pr-0">
                <span className="text-teal/30 text-xs font-mono">{step.num}</span>
                <h3 className="font-display text-lg text-soft-white mt-2 mb-2">{step.title}</h3>
                <p className="text-soft-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities — compact, left-aligned */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-2xl text-soft-white">Browse by city</h2>
            <p className="text-soft-white/40 text-sm mt-1">Ketamine clinics in major US metros</p>
          </div>
          <Link href="/sitemap-cities.xml" className="text-teal text-sm hover:underline">
            All 200+ cities &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {metroCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="flex items-center gap-2 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-soft-white/60 hover:border-teal/20 hover:text-soft-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-teal/40 shrink-0" />
              {city.name}, {city.stateAbbr}
            </Link>
          ))}
        </div>
      </section>

      {/* Resources — editorial blog section */}
      <section className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-2xl text-soft-white">Patient resources</h2>
            <Link href="/blog" className="text-teal text-sm hover:underline flex items-center gap-1">
              All guides <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="bg-card border border-white/5 rounded-xl p-5 h-full hover:border-teal/20 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-teal/60 text-[10px] font-mono uppercase tracking-wider">{post.tags?.[0]}</span>
                    <span className="text-white/10">&middot;</span>
                    <span className="text-soft-white/30 text-[10px]">{post.readingTime}</span>
                  </div>
                  <h3 className="font-display text-soft-white group-hover:text-teal transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-soft-white/40 text-sm line-clamp-2">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Provider CTA — simple, not flashy */}
      <section className="border-t border-white/5 bg-card/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-2xl text-soft-white mb-3">List your clinic</h2>
          <p className="text-soft-white/50 mb-6 max-w-md mx-auto">
            Reach patients actively searching for ketamine therapy in your area.
            Featured listings start at $49/month.
          </p>
          <Link
            href="/add-listing"
            className="inline-flex items-center gap-2 bg-teal text-navy text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-teal/90 transition-colors"
          >
            Add your clinic <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MedicalDisclaimer />
      </div>
    </>
  );
}
