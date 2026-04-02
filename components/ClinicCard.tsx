import Link from "next/link";
import { MapPin, Shield, Video, Star } from "lucide-react";
import { Listing } from "@/types/global";

interface ClinicCardProps {
  listing: Listing;
}

export default function ClinicCard({ listing }: ClinicCardProps) {
  return (
    <div className="bg-card rounded-xl border border-white/5 p-6 hover:border-teal/30 transition-all group">
      {listing.featured && (
        <span className="inline-block bg-teal text-navy text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
          Featured
        </span>
      )}

      <Link href={`/listing/${listing.slug}`}>
        <h3 className="font-display text-xl text-soft-white group-hover:text-teal transition-colors mb-2">
          {listing.business_name}
        </h3>
      </Link>

      <div className="flex items-center text-soft-white/60 text-sm mb-3">
        <MapPin className="w-4 h-4 mr-1 text-teal" />
        {listing.city}, {listing.state}
      </div>

      {listing.rating > 0 && (
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 text-teal fill-teal" />
          <span className="text-soft-white text-sm font-medium">{listing.rating.toFixed(1)}</span>
          <span className="text-soft-white/50 text-sm">({listing.review_count} reviews)</span>
        </div>
      )}

      <p className="text-soft-white/70 text-sm mb-4 line-clamp-2">{listing.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {listing.accepts_insurance && (
          <span className="flex items-center gap-1 bg-teal/10 text-teal text-xs px-2.5 py-1 rounded-full">
            <Shield className="w-3 h-3" /> Insurance Accepted
          </span>
        )}
        {listing.telehealth_available && (
          <span className="flex items-center gap-1 bg-lavender/10 text-lavender text-xs px-2.5 py-1 rounded-full">
            <Video className="w-3 h-3" /> Telehealth
          </span>
        )}
      </div>

      {listing.conditions_treated && listing.conditions_treated.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {listing.conditions_treated.slice(0, 4).map((condition) => (
            <span
              key={condition}
              className="text-xs bg-navy text-soft-white/60 px-2 py-0.5 rounded border border-white/5"
            >
              {condition}
            </span>
          ))}
          {listing.conditions_treated.length > 4 && (
            <span className="text-xs text-soft-white/40">
              +{listing.conditions_treated.length - 4} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-soft-white/60 text-sm">
          ${listing.price_per_session_low}&ndash;${listing.price_per_session_high}/session
        </span>
        <Link
          href={`/listing/${listing.slug}`}
          className="text-teal text-sm font-medium hover:underline"
        >
          View Clinic &rarr;
        </Link>
      </div>
    </div>
  );
}
