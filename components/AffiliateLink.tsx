import { ExternalLink } from "lucide-react";

interface AffiliateLinkProps {
  href: string;
  name: string;
  description: string;
}

export default function AffiliateLink({ href, name, description }: AffiliateLinkProps) {
  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 hover:border-teal/30 transition-all">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-display text-lg text-soft-white">{name}</h4>
        <ExternalLink className="w-4 h-4 text-teal flex-shrink-0 mt-1" />
      </div>
      <p className="text-soft-white/60 text-sm mb-3">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-block bg-teal text-navy text-sm font-semibold px-4 py-2 rounded-lg hover:bg-teal/90 transition-colors"
      >
        Learn More
      </a>
      <p className="text-soft-white/30 text-xs mt-3 italic">
        Affiliate link &mdash; we may earn a commission at no extra cost to you. See our{" "}
        <a href="/disclaimer" className="underline">
          disclosure
        </a>
        .
      </p>
    </div>
  );
}
