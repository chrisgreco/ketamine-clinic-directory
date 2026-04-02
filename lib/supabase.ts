import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      return createClient(
        "https://placeholder.supabase.co",
        "placeholder"
      );
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabase() as any)[prop];
  },
});

/* ─── Query helpers (kc_ prefixed tables) ─── */

import type { Listing, Review, Lead } from "@/types/global";

export async function getFeaturedListings(): Promise<Listing[]> {
  const { data } = await getSupabase()
    .from("kc_listings")
    .select("*")
    .eq("featured", true)
    .order("rating", { ascending: false })
    .limit(12);
  return (data as Listing[]) || [];
}

export async function getListingsByCity(citySlug: string): Promise<Listing[]> {
  // citySlug = "ketamine-clinic-denver-co" => city = "Denver", stateAbbr = "CO"
  const parts = citySlug.replace("ketamine-clinic-", "").split("-");
  const stateAbbr = parts.pop()!.toUpperCase();
  const cityName = parts.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const { data } = await getSupabase()
    .from("kc_listings")
    .select("*")
    .ilike("city", cityName)
    .ilike("state_abbr", stateAbbr)
    .order("featured", { ascending: false })
    .order("rating", { ascending: false });
  return (data as Listing[]) || [];
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const { data } = await getSupabase()
    .from("kc_listings")
    .select("*")
    .eq("slug", slug)
    .single();
  return (data as Listing) || null;
}

export async function getListingsByCondition(condition: string): Promise<Listing[]> {
  const { data } = await getSupabase()
    .from("kc_listings")
    .select("*")
    .contains("conditions_treated", [condition])
    .order("featured", { ascending: false })
    .order("rating", { ascending: false })
    .limit(24);
  return (data as Listing[]) || [];
}

export async function getReviewsByListing(listingId: string): Promise<Review[]> {
  const { data } = await getSupabase()
    .from("kc_reviews")
    .select("*")
    .eq("listing_id", listingId)
    .order("created_at", { ascending: false });
  return (data as Review[]) || [];
}

export async function getAllListings(): Promise<Listing[]> {
  const { data } = await getSupabase()
    .from("kc_listings")
    .select("*")
    .order("featured", { ascending: false })
    .order("rating", { ascending: false });
  return (data as Listing[]) || [];
}

export async function insertLead(lead: Omit<Lead, "id" | "created_at">): Promise<{ error: any }> {
  const { error } = await getSupabase().from("kc_leads").insert(lead);
  return { error };
}

export async function insertListing(listing: Record<string, any>): Promise<{ data: any; error: any }> {
  const { data, error } = await getSupabase().from("kc_listings").insert(listing).select().single();
  return { data, error };
}

export async function getLeads(): Promise<Lead[]> {
  const { data } = await getSupabase()
    .from("kc_leads")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Lead[]) || [];
}
