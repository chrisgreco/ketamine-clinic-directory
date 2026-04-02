import Link from "next/link";
import { ArrowRight, Brain, Shield, Clock, Search, MapPin, Star } from "lucide-react";
import CitySearch from "@/components/CitySearch";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { conditions } from "@/data/conditions";
import { cities } from "@/data/cities";
import { blogPosts } from "@/data/blog-posts";

export default function HomePage() {
  const metroCities = cities.filter((c) => c.tier === "metro").slice(0, 20);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-teal/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-soft-white mb-6 leading-tight">
            Find{" "}
            <span className="text-teal">Ketamine Therapy</span>{" "}
            Clinics Near You
          </h1>
          <p className="text-soft-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Search verified providers offering ketamine infusions and Spravato for
            depression, PTSD, anxiety, chronic pain, and more. Compare pricing, read
            patient reviews, and request consultation information.
          </p>
          <div className="flex justify-center mb-8">
            <CitySearch />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {conditions.slice(0, 5).map((condition) => (
              <Link
                key={condition.slug}
                href={`/ketamine-for-${condition.slug}`}
                className="bg-card border border-white/5 text-soft-white/70 text-sm px-4 py-2 rounded-full hover:border-teal/40 hover:text-teal transition-colors"
              >
                {condition.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="font-display text-3xl text-soft-white text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Search,
              title: "Search Clinics",
              desc: "Browse verified ketamine therapy providers by city, condition, or treatment type.",
            },
            {
              icon: Star,
              title: "Compare Options",
              desc: "Read patient reviews, compare pricing, and filter by insurance, telehealth, and more.",
            },
            {
              icon: ArrowRight,
              title: "Request Info",
              desc: "Submit a consultation request directly to clinics. A representative will follow up within 48 hours.",
            },
          ].map((step, i) => (
            <div key={i} className="bg-card rounded-xl border border-white/5 p-8 text-center">
              <div className="w-14 h-14 bg-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-7 h-7 text-teal" />
              </div>
              <h3 className="font-display text-lg text-soft-white mb-3">{step.title}</h3>
              <p className="text-soft-white/60 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl text-soft-white text-center mb-4">
          Conditions Treated with Ketamine
        </h2>
        <p className="text-soft-white/60 text-center max-w-2xl mx-auto mb-12">
          Research suggests ketamine therapy may help with a range of mental health and pain
          conditions. Explore each condition to learn more.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {conditions.map((condition) => (
            <Link
              key={condition.slug}
              href={`/ketamine-for-${condition.slug}`}
              className="bg-card border border-white/5 rounded-xl p-6 hover:border-teal/30 transition-all group"
            >
              <Brain className="w-8 h-8 text-teal mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-base text-soft-white mb-2">{condition.name}</h3>
              <p className="text-soft-white/50 text-sm line-clamp-2">{condition.description}</p>
              <span className="text-teal text-sm mt-3 inline-flex items-center gap-1">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Key Stats */}
      <section className="border-y border-white/5 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { stat: "70%", label: "of patients with treatment-resistant depression report improvement with ketamine (studies suggest)" },
              { stat: "24-72 hrs", label: "rapid onset of mood improvement reported by many patients after first infusion" },
              { stat: "$400-800", label: "typical per-session cost for IV ketamine infusion therapy" },
            ].map((item, i) => (
              <div key={i}>
                <p className="font-display text-4xl text-teal font-bold mb-2">{item.stat}</p>
                <p className="text-soft-white/60 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="font-display text-3xl text-soft-white text-center mb-4">
          Browse Clinics by City
        </h2>
        <p className="text-soft-white/60 text-center max-w-xl mx-auto mb-10">
          Find ketamine therapy providers in major cities across the United States.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {metroCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="flex items-center gap-2 bg-card border border-white/5 rounded-lg px-4 py-3 text-sm text-soft-white/70 hover:border-teal/30 hover:text-teal transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-teal flex-shrink-0" />
              {city.name}, {city.stateAbbr}
            </Link>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-3xl text-soft-white">Latest Resources</h2>
          <Link href="/blog" className="text-teal text-sm hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-card border border-white/5 rounded-xl p-6 hover:border-teal/30 transition-all group"
            >
              <p className="text-teal text-xs uppercase tracking-wider mb-2">{post.tags[0]}</p>
              <h3 className="font-display text-lg text-soft-white group-hover:text-teal transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-soft-white/50 text-sm line-clamp-2">{post.description}</p>
              <p className="text-soft-white/30 text-xs mt-4">{post.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-card border border-white/5 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Providers",
                desc: "Every clinic in our directory is reviewed for proper licensing, credentials, and safety protocols.",
              },
              {
                icon: Brain,
                title: "Evidence-Based Info",
                desc: "Our content references published research and is reviewed for medical accuracy. We never make unsupported claims.",
              },
              {
                icon: Clock,
                title: "Updated Regularly",
                desc: "Clinic information, pricing, and availability are updated regularly to ensure accuracy.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h3 className="font-display text-base text-soft-white mb-1">{item.title}</h3>
                  <p className="text-soft-white/50 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-teal/10 to-lavender/10 border border-teal/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-display text-3xl text-soft-white mb-4">
            Are You a Ketamine Provider?
          </h2>
          <p className="text-soft-white/60 max-w-xl mx-auto mb-8">
            List your clinic on KetamineClinics.com to reach patients actively searching for
            ketamine therapy in your area.
          </p>
          <Link
            href="/add-listing"
            className="inline-flex items-center gap-2 bg-teal text-navy font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
          >
            Add Your Clinic <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <MedicalDisclaimer />
      </div>
    </>
  );
}
