"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Shield, Users, Building2, Mail, Trash2 } from "lucide-react";
import type { Listing, Lead } from "@/types/global";

function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return createClient("https://placeholder.supabase.co", "placeholder");
  }
  return createClient(url, key);
}

export default function AdminPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tab, setTab] = useState<"listings" | "leads">("listings");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const sb = getAdminSupabase();
      const [listingsRes, leadsRes] = await Promise.all([
        sb.from("kc_listings").select("*").order("created_at", { ascending: false }),
        sb.from("kc_leads").select("*").order("created_at", { ascending: false }),
      ]);
      setListings((listingsRes.data as Listing[]) || []);
      setLeads((leadsRes.data as Lead[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  async function toggleFeatured(listing: Listing) {
    const sb = getAdminSupabase();
    await sb
      .from("kc_listings")
      .update({ featured: !listing.featured })
      .eq("id", listing.id);
    setListings((prev) =>
      prev.map((l) =>
        l.id === listing.id ? { ...l, featured: !l.featured } : l
      )
    );
  }

  async function toggleVerified(listing: Listing) {
    const sb = getAdminSupabase();
    await sb
      .from("kc_listings")
      .update({ verified: !listing.verified })
      .eq("id", listing.id);
    setListings((prev) =>
      prev.map((l) =>
        l.id === listing.id ? { ...l, verified: !l.verified } : l
      )
    );
  }

  async function deleteLead(id: string) {
    const sb = getAdminSupabase();
    await sb.from("kc_leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-6 h-6 text-teal" />
        <h1 className="font-display text-3xl text-soft-white">Admin Dashboard</h1>
      </div>

      <p className="text-soft-white/40 text-sm mb-8">
        Note: This is a basic admin view. In production, protect this route with
        authentication (e.g., Supabase Auth or NextAuth).
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-white/5 rounded-xl p-5">
          <Building2 className="w-5 h-5 text-teal mb-2" />
          <p className="text-2xl text-soft-white font-semibold">{listings.length}</p>
          <p className="text-soft-white/50 text-sm">Total Listings</p>
        </div>
        <div className="bg-card border border-white/5 rounded-xl p-5">
          <Users className="w-5 h-5 text-teal mb-2" />
          <p className="text-2xl text-soft-white font-semibold">{leads.length}</p>
          <p className="text-soft-white/50 text-sm">Total Leads</p>
        </div>
        <div className="bg-card border border-white/5 rounded-xl p-5">
          <Shield className="w-5 h-5 text-teal mb-2" />
          <p className="text-2xl text-soft-white font-semibold">
            {listings.filter((l) => l.featured).length}
          </p>
          <p className="text-soft-white/50 text-sm">Featured Listings</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["listings", "leads"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t
                ? "bg-teal text-navy"
                : "bg-card text-soft-white/60 border border-white/10 hover:border-teal/40"
            }`}
          >
            {t === "listings" ? (
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Listings
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Leads
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-card border border-white/5 rounded-xl p-12 text-center">
          <p className="text-soft-white/50">Loading...</p>
        </div>
      ) : tab === "listings" ? (
        <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-teal font-display px-4 py-3">Clinic</th>
                  <th className="text-left text-teal font-display px-4 py-3">City</th>
                  <th className="text-left text-teal font-display px-4 py-3">Rating</th>
                  <th className="text-left text-teal font-display px-4 py-3">Featured</th>
                  <th className="text-left text-teal font-display px-4 py-3">Verified</th>
                  <th className="text-left text-teal font-display px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr
                    key={listing.id}
                    className="border-b border-white/5 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3 text-soft-white">{listing.business_name}</td>
                    <td className="px-4 py-3 text-soft-white/70">
                      {listing.city}, {listing.state}
                    </td>
                    <td className="px-4 py-3 text-soft-white/70">
                      {listing.rating?.toFixed(1) || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleFeatured(listing)}
                        className={`text-xs px-2 py-1 rounded ${
                          listing.featured
                            ? "bg-teal text-navy"
                            : "bg-navy text-soft-white/40 border border-white/10"
                        }`}
                      >
                        {listing.featured ? "Yes" : "No"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleVerified(listing)}
                        className={`text-xs px-2 py-1 rounded ${
                          listing.verified
                            ? "bg-teal text-navy"
                            : "bg-navy text-soft-white/40 border border-white/10"
                        }`}
                      >
                        {listing.verified ? "Yes" : "No"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-soft-white/40">
                      {new Date(listing.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {listings.length === 0 && (
            <p className="text-soft-white/40 text-center py-8">No listings found.</p>
          )}
        </div>
      ) : (
        <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-teal font-display px-4 py-3">Name</th>
                  <th className="text-left text-teal font-display px-4 py-3">Email</th>
                  <th className="text-left text-teal font-display px-4 py-3">Condition</th>
                  <th className="text-left text-teal font-display px-4 py-3">City</th>
                  <th className="text-left text-teal font-display px-4 py-3">Date</th>
                  <th className="text-left text-teal font-display px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-white/5 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3 text-soft-white">{lead.name}</td>
                    <td className="px-4 py-3 text-soft-white/70">{lead.email}</td>
                    <td className="px-4 py-3 text-soft-white/70">{lead.condition || "N/A"}</td>
                    <td className="px-4 py-3 text-soft-white/70">
                      {lead.city ? `${lead.city}, ${lead.state}` : "N/A"}
                    </td>
                    <td className="px-4 py-3 text-soft-white/40">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {leads.length === 0 && (
            <p className="text-soft-white/40 text-center py-8">No leads found.</p>
          )}
        </div>
      )}
    </div>
  );
}
