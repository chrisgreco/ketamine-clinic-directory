export interface Listing {
  id: string;
  slug: string;
  clinic_name: string;
  business_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  address: string | null;
  city: string;
  state: string;
  state_abbr: string;
  zip_code: string | null;
  conditions_treated: string[];
  treatment_types: string[];
  accepts_insurance: boolean;
  telehealth_available: boolean;
  price_per_session_low: number | null;
  price_per_session_high: number | null;
  featured: boolean;
  verified: boolean;
  status: string;
  rating: number | null;
  review_count: number;
  photos: string[];
  created_at: string;
}

export interface Review {
  id: string;
  listing_id: string;
  reviewer_name: string | null;
  rating: number;
  body: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface Lead {
  id: string;
  listing_id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  condition: string | null;
  insurance_type: string | null;
  message: string | null;
  created_at: string;
}

export interface City {
  name: string;
  state: string;
  stateAbbr: string;
  slug: string;
  tier: "metro" | "mid" | "small";
  latitude?: number;
  longitude?: number;
  population?: number;
}

export interface Condition {
  name: string;
  slug: string;
  description: string;
  icdCode: string;
  ketamineApproach: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  date: string;
  author: string;
  readingTime: string;
  image: string;
  tags: string[];
}
