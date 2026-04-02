import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/* ─── Types ─── */

interface SeedListing {
  slug: string;
  business_name: string;
  description: string;
  city: string;
  state: string;
  state_abbr: string;
  address: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string;
  image_url: string;
  conditions_treated: string[];
  treatment_types: string[];
  accepts_insurance: boolean;
  telehealth_available: boolean;
  price_per_session_low: number;
  price_per_session_high: number;
  rating: number;
  review_count: number;
  featured: boolean;
  verified: boolean;
  latitude: number;
  longitude: number;
}

interface SeedReview {
  listing_slug: string;
  author_name: string;
  rating: number;
  comment: string;
  is_verified: boolean;
}

/* ─── City Data ─── */

const cities = [
  { city: "Denver", state: "Colorado", abbr: "CO", lat: 39.7392, lng: -104.9903, zip: "80202" },
  { city: "Los Angeles", state: "California", abbr: "CA", lat: 34.0522, lng: -118.2437, zip: "90001" },
  { city: "New York", state: "New York", abbr: "NY", lat: 40.7128, lng: -74.006, zip: "10001" },
  { city: "Austin", state: "Texas", abbr: "TX", lat: 30.2672, lng: -97.7431, zip: "78701" },
  { city: "Chicago", state: "Illinois", abbr: "IL", lat: 41.8781, lng: -87.6298, zip: "60601" },
  { city: "Seattle", state: "Washington", abbr: "WA", lat: 47.6062, lng: -122.3321, zip: "98101" },
  { city: "Phoenix", state: "Arizona", abbr: "AZ", lat: 33.4484, lng: -112.074, zip: "85001" },
  { city: "Miami", state: "Florida", abbr: "FL", lat: 25.7617, lng: -80.1918, zip: "33101" },
  { city: "Nashville", state: "Tennessee", abbr: "TN", lat: 36.1627, lng: -86.7816, zip: "37201" },
  { city: "Boston", state: "Massachusetts", abbr: "MA", lat: 42.3601, lng: -71.0589, zip: "02101" },
];

const clinicNames = [
  "Renewal Ketamine Center",
  "Clarity Infusion Clinic",
  "Mind Path Ketamine",
  "Serenity Wellness Infusions",
  "Elevate Ketamine Therapy",
];

const conditionSets = [
  ["depression", "anxiety"],
  ["depression", "ptsd", "anxiety"],
  ["chronic_pain", "depression", "migraine"],
  ["depression", "bipolar", "ocd", "suicidal_ideation"],
  ["ptsd", "anxiety", "depression"],
  ["chronic_pain", "depression"],
  ["depression", "anxiety", "ocd"],
  ["depression", "ptsd", "chronic_pain", "anxiety"],
  ["bipolar", "depression", "anxiety"],
  ["depression", "suicidal_ideation", "ptsd"],
];

const treatmentSets = [
  ["iv_infusion", "intranasal"],
  ["iv_infusion", "im_injection", "sublingual"],
  ["iv_infusion", "rac_ketamine", "im_injection"],
  ["iv_infusion", "intranasal", "sublingual"],
  ["iv_infusion", "im_injection"],
];

const descriptions = [
  "Our clinic provides compassionate, evidence-informed ketamine therapy in a comfortable clinical setting. Our team of board-certified providers is dedicated to helping patients explore treatment options for depression, anxiety, and other conditions that have not responded to conventional therapies. We offer comprehensive evaluations and personalized treatment plans.",
  "We specialize in ketamine infusion therapy administered by experienced anesthesiologists and psychiatrists. Our state-of-the-art facility features private treatment rooms with continuous monitoring. We work closely with each patient's existing treatment team to ensure coordinated, holistic care.",
  "Our practice offers ketamine therapy as part of a multimodal approach to mental health and pain management. We combine medical expertise with a warm, supportive environment. Every patient receives a thorough evaluation and individualized protocol designed by our board-certified physicians.",
  "We are committed to providing safe, effective ketamine therapy backed by the latest research. Our clinic features advanced monitoring equipment, experienced medical staff, and a patient-centered approach. We accept patients with treatment-resistant depression, PTSD, chronic pain, and other qualifying conditions.",
  "Our integrated wellness center offers ketamine infusion therapy alongside psychiatric care and therapy services. We believe in treating the whole person, not just the symptoms. Our team includes board-certified psychiatrists, nurse practitioners, and licensed therapists who collaborate on every patient's care.",
];

/* ─── Generate Listings ─── */

function generateListings(): SeedListing[] {
  const listings: SeedListing[] = [];

  cities.forEach((c, ci) => {
    clinicNames.forEach((name, ni) => {
      const index = ci * 5 + ni;
      const slug = `${name.toLowerCase().replace(/\s+/g, "-")}-${c.city.toLowerCase().replace(/\s+/g, "-")}-${c.abbr.toLowerCase()}`;
      const isFeatured = ni < 2; // 2 featured per city
      const isTelehealth = index % 5 < 2; // ~40%
      const acceptsInsurance = index % 7 === 0; // some true

      listings.push({
        slug,
        business_name: `${name} ${c.city}`,
        description: descriptions[ni],
        city: c.city,
        state: c.state,
        state_abbr: c.abbr,
        address: `${100 + index * 10} ${["Main", "Broadway", "Oak", "Elm", "Pine"][ni]} Street, Suite ${200 + ni * 10}`,
        zip_code: c.zip,
        phone: `(${555 + ci})${100 + ni * 11}-${1000 + index * 7}`,
        email: `info@${slug.replace(/-/g, "")}.com`.slice(0, 60),
        website: `https://www.${slug}.com`,
        image_url: "",
        conditions_treated: conditionSets[index % conditionSets.length],
        treatment_types: treatmentSets[index % treatmentSets.length],
        accepts_insurance: acceptsInsurance,
        telehealth_available: isTelehealth,
        price_per_session_low: [400, 425, 450, 475, 500][ni],
        price_per_session_high: [650, 700, 725, 750, 800][ni],
        rating: Number((4.3 + (index % 8) * 0.1).toFixed(1)),
        review_count: 5 + (index % 56),
        featured: isFeatured,
        verified: true,
        latitude: c.lat + (ni - 2) * 0.01,
        longitude: c.lng + (ni - 2) * 0.01,
      });
    });
  });

  return listings;
}

/* ─── Generate Reviews ─── */

const reviewComments = [
  "After years of trying different medications, I decided to explore ketamine infusion therapy at this clinic. The staff was incredibly supportive and the medical team explained every step of the process. I felt safe and cared for throughout my treatment. I would recommend consulting with them if you are considering this option.",
  "I was nervous about my first infusion, but the team put me at ease right away. The facility is clean and modern, and the nurses monitored me closely throughout the entire session. I appreciated their thoroughness and professionalism.",
  "This clinic provided a thorough initial evaluation before recommending any treatment. They coordinated with my psychiatrist and made sure the approach was appropriate for my situation. The experience was positive and the staff was knowledgeable.",
  "The pricing was transparent and clearly explained before I committed to treatment. There were no hidden fees. The staff was responsive to my questions and the clinical environment felt safe and professional.",
  "I appreciated that this clinic takes a conservative, evidence-based approach. They did not make any unrealistic promises and set clear expectations from the start. The medical team was experienced and attentive during every session.",
  "Finding this clinic through the directory was a great experience. The consultation process was thorough and I felt heard by the medical team. They took the time to understand my complete medical history before recommending a treatment plan.",
  "Very professional clinic with experienced staff. They use continuous monitoring during infusions and have clear safety protocols in place. I felt confident in the quality of care I received.",
  "The team here is compassionate and knowledgeable. They explained the potential benefits and risks clearly, and I never felt pressured. The treatment rooms are comfortable and private.",
  "I traveled from out of town for treatment at this clinic based on recommendations and research. It was worth the trip. The staff is professional, the facility is well-equipped, and they follow evidence-based protocols.",
  "This was my first experience with ketamine therapy and the staff made the entire process as comfortable as possible. They answered all of my questions patiently and the follow-up care has been excellent.",
];

const reviewAuthors = [
  "Sarah M.", "James K.", "Michelle R.", "David L.", "Jennifer T.",
  "Robert P.", "Amanda C.", "Brian W.", "Laura H.", "Christopher S.",
  "Emily D.", "Michael B.", "Rachel G.", "Thomas A.", "Katherine N.",
  "Daniel F.", "Stephanie V.", "Andrew J.", "Nicole Z.", "Matthew E.",
];

function generateReviews(listings: SeedListing[]): SeedReview[] {
  const reviews: SeedReview[] = [];

  listings.forEach((listing, li) => {
    // 2 reviews per listing
    for (let ri = 0; ri < 2; ri++) {
      const idx = (li * 2 + ri) % reviewComments.length;
      reviews.push({
        listing_slug: listing.slug,
        author_name: reviewAuthors[(li * 2 + ri) % reviewAuthors.length],
        rating: Number((4.0 + (idx % 5) * 0.2 + (ri * 0.1)).toFixed(1)),
        comment: reviewComments[idx],
        is_verified: ri === 0, // first review verified
      });
    }
  });

  return reviews;
}

/* ─── Seed ─── */

async function seed() {
  console.log("Seeding kc_listings...");

  const listings = generateListings();

  const { error: listingsError } = await supabase
    .from("kc_listings")
    .upsert(listings, { onConflict: "slug" });

  if (listingsError) {
    console.error("Error seeding listings:", listingsError);
    return;
  }

  console.log(`Upserted ${listings.length} listings.`);

  // Fetch listings to get IDs for reviews
  const { data: dbListings, error: fetchError } = await supabase
    .from("kc_listings")
    .select("id, slug");

  if (fetchError || !dbListings) {
    console.error("Error fetching listings for reviews:", fetchError);
    return;
  }

  const slugToId = new Map(dbListings.map((l: any) => [l.slug, l.id]));

  console.log("Seeding kc_reviews...");

  const seedReviews = generateReviews(listings);
  const reviewsWithIds = seedReviews
    .map((r) => ({
      listing_id: slugToId.get(r.listing_slug),
      author_name: r.author_name,
      rating: r.rating,
      comment: r.comment,
      is_verified: r.is_verified,
    }))
    .filter((r) => r.listing_id);

  const { error: reviewsError } = await supabase
    .from("kc_reviews")
    .insert(reviewsWithIds);

  if (reviewsError) {
    console.error("Error seeding reviews:", reviewsError);
    return;
  }

  console.log(`Inserted ${reviewsWithIds.length} reviews.`);
  console.log("Seed complete.");
}

seed().catch(console.error);
