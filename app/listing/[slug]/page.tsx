import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Mail,
  Star,
  Shield,
  Video,
  Clock,
  DollarSign,
} from "lucide-react";
import { getListingBySlug, getReviewsByListing } from "@/lib/supabase";
import LeadForm from "@/components/LeadForm";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import MvAdBox from "@/components/MvAdBox";
import { SITE_NAME, SITE_URL, formatCondition, formatTreatmentType } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const listing = await getListingBySlug(params.slug);
  if (!listing) return { title: "Clinic Not Found" };

  return {
    title: `${listing.business_name} - Ketamine Therapy in ${listing.city}, ${listing.state}`,
    description: `${listing.business_name} offers ketamine therapy in ${listing.city}, ${listing.state}. ${listing.description?.slice(0, 140)}`,
    openGraph: {
      title: `${listing.business_name} - ${listing.city}, ${listing.state}`,
      description: listing.description?.slice(0, 200),
      url: `${SITE_URL}/listing/${listing.slug}`,
    },
  };
}

export default async function ListingPage({ params }: { params: { slug: string } }) {
  const listing = await getListingBySlug(params.slug);
  if (!listing) notFound();

  const reviews = await getReviewsByListing(listing.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: listing.business_name,
    description: listing.description,
    url: listing.website || `${SITE_URL}/listing/${listing.slug}`,
    telephone: listing.phone,
    email: listing.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip_code,
      addressCountry: "US",
    },
    geo: listing.latitude
      ? {
          "@type": "GeoCoordinates",
          latitude: listing.latitude,
          longitude: listing.longitude,
        }
      : undefined,
    aggregateRating:
      listing.review_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: listing.rating,
            reviewCount: listing.review_count,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    priceRange: `$${listing.price_per_session_low}-$${listing.price_per_session_high}`,
    medicalSpecialty: "Psychiatry",
    availableService: (listing.treatment_types || []).map((t: string) => ({
      "@type": "MedicalTherapy",
      name: formatTreatmentType(t),
    })),
    isAcceptingNewPatients: true,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/"
        className="inline-flex items-center gap-1 text-teal text-sm mb-6 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Directory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {listing.featured && (
                <span className="bg-teal text-navy text-xs font-bold uppercase px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
              {listing.verified && (
                <span className="flex items-center gap-1 bg-teal/10 text-teal text-xs px-3 py-1 rounded-full">
                  <Shield className="w-3 h-3" /> Verified
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-soft-white mb-3">
              {listing.business_name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-soft-white/60 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-teal" />
                {listing.address && `${listing.address}, `}
                {listing.city}, {listing.state} {listing.zip_code}
              </span>
              {listing.rating > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-teal fill-teal" />
                  {listing.rating.toFixed(1)} ({listing.review_count} reviews)
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-card border border-white/5 rounded-xl p-6 mb-8">
            <h2 className="font-display text-xl text-soft-white mb-3">About This Clinic</h2>
            <p className="text-soft-white/80 leading-relaxed">{listing.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-card border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-teal" />
                <h3 className="font-display text-base text-soft-white">Pricing</h3>
              </div>
              <p className="text-soft-white/80 text-2xl font-semibold">
                ${listing.price_per_session_low}&ndash;${listing.price_per_session_high}
              </p>
              <p className="text-soft-white/50 text-sm">per session</p>
            </div>

            <div className="bg-card border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-teal" />
                <h3 className="font-display text-base text-soft-white">Insurance</h3>
              </div>
              <p className="text-soft-white/80">
                {listing.accepts_insurance
                  ? "This clinic accepts some insurance plans. Contact them for details."
                  : "Self-pay only. Some plans may cover Spravato. Ask the clinic."}
              </p>
            </div>

            <div className="bg-card border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-5 h-5 text-teal" />
                <h3 className="font-display text-base text-soft-white">Telehealth</h3>
              </div>
              <p className="text-soft-white/80">
                {listing.telehealth_available
                  ? "Telehealth consultations available for certain services."
                  : "In-person visits only at this location."}
              </p>
            </div>

            <div className="bg-card border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-teal" />
                <h3 className="font-display text-base text-soft-white">Availability</h3>
              </div>
              <p className="text-soft-white/80">
                Accepting new patients. Contact the clinic for scheduling.
              </p>
            </div>
          </div>

          {/* Treatment Types */}
          {listing.treatment_types && listing.treatment_types.length > 0 && (
            <div className="bg-card border border-white/5 rounded-xl p-6 mb-8">
              <h2 className="font-display text-xl text-soft-white mb-4">Treatment Types</h2>
              <div className="flex flex-wrap gap-2">
                {listing.treatment_types.map((t: string) => (
                  <span
                    key={t}
                    className="bg-teal/10 text-teal text-sm px-4 py-2 rounded-lg"
                  >
                    {formatTreatmentType(t)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Conditions Treated */}
          {listing.conditions_treated && listing.conditions_treated.length > 0 && (
            <div className="bg-card border border-white/5 rounded-xl p-6 mb-8">
              <h2 className="font-display text-xl text-soft-white mb-4">Conditions Treated</h2>
              <div className="flex flex-wrap gap-2">
                {listing.conditions_treated.map((c: string) => (
                  <Link
                    key={c}
                    href={`/ketamine-for-${c}`}
                    className="bg-navy border border-white/10 text-soft-white/70 text-sm px-4 py-2 rounded-lg hover:border-teal/40 hover:text-teal transition-colors"
                  >
                    {formatCondition(c)}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="mb-8">
            <h2 className="font-display text-xl text-soft-white mb-4">
              Patient Reviews ({reviews.length})
            </h2>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-card border border-white/5 rounded-xl p-5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-soft-white font-medium">
                        {review.author_name}
                      </span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-teal fill-teal"
                                : "text-soft-white/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-soft-white/70 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                    {review.is_verified && (
                      <p className="text-teal text-xs mt-2 flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Verified Patient
                      </p>
                    )}
                    <p className="text-soft-white/30 text-xs mt-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-white/5 rounded-xl p-6 text-center">
                <p className="text-soft-white/50 text-sm">
                  No reviews yet for this clinic.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-card border border-white/5 rounded-xl p-6">
            <h3 className="font-display text-lg text-soft-white mb-4">Contact</h3>
            <div className="space-y-3">
              {listing.phone && (
                <a
                  href={`tel:${listing.phone?.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-soft-white/70 hover:text-teal transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-teal" />
                  {listing.phone}
                </a>
              )}
              {listing.email && (
                <a
                  href={`mailto:${listing.email}`}
                  className="flex items-center gap-3 text-soft-white/70 hover:text-teal transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-teal" />
                  {listing.email}
                </a>
              )}
              {listing.website && (
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-soft-white/70 hover:text-teal transition-colors text-sm"
                >
                  <Globe className="w-4 h-4 text-teal" />
                  Visit Website
                </a>
              )}
            </div>
          </div>

          <LeadForm listingId={listing.id} city={listing.city} state={listing.state} />

          <MvAdBox />

          <MedicalDisclaimer />
        </div>
      </div>
    </div>
  );
}
