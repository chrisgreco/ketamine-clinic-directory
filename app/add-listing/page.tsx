"use client";

import { useState } from "react";
import { Send, CheckCircle, ShieldCheck } from "lucide-react";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";

export default function ClaimListingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "claim_request",
          ...formData,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <CheckCircle className="w-16 h-16 text-teal mx-auto mb-6" />
        <h1 className="font-display text-3xl text-soft-white mb-4">
          Claim Request Submitted
        </h1>
        <p className="text-soft-white/60 mb-2">
          Your claim request has been submitted. We&apos;ll verify and connect
          you within 48 hours.
        </p>
        <p className="text-soft-white/40 text-sm">
          You will receive a confirmation email at the address provided.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10">
          <ShieldCheck className="h-6 w-6 text-teal" />
        </div>
        <p className="text-teal text-sm uppercase tracking-wider mb-2">
          For Providers
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-soft-white mb-4">
          Claim Your Clinic Listing
        </h1>
        <p className="text-soft-white/60 max-w-xl mx-auto">
          We&apos;ve already listed your clinic based on public information.
          Claim your listing to update your description, add photos, and respond
          to reviews.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-white/5 rounded-xl p-6 md:p-8 space-y-6"
      >
        <fieldset>
          <legend className="font-display text-lg text-soft-white mb-4">
            Claim Details
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="Clinic / Business Name *"
              value={formData.business_name}
              onChange={(e) =>
                setFormData({ ...formData, business_name: e.target.value })
              }
              className="sm:col-span-2 bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            />
            <input
              required
              type="text"
              placeholder="Your Name *"
              value={formData.contact_name}
              onChange={(e) =>
                setFormData({ ...formData, contact_name: e.target.value })
              }
              className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            />
            <select
              required
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="bg-navy border border-white/10 text-soft-white rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            >
              <option value="">Your Role *</option>
              <option value="owner">Owner</option>
              <option value="medical_director">Medical Director</option>
              <option value="manager">Manager</option>
              <option value="authorized_rep">Authorized Representative</option>
            </select>
            <input
              required
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-lg text-soft-white mb-4">
            What would you like to update?
          </legend>
          <textarea
            placeholder="Tell us what information you'd like to correct or add — updated description, treatment types, pricing, photos, etc."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            rows={5}
            className="w-full bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none resize-none"
          />
        </fieldset>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 bg-teal text-navy font-semibold py-3 rounded-lg hover:bg-teal/90 transition-colors disabled:opacity-50"
        >
          <ShieldCheck className="w-4 h-4" />
          {status === "loading" ? "Submitting..." : "Submit Claim Request"}
        </button>

        {status === "error" && (
          <p className="text-red-400 text-sm text-center">
            Something went wrong. Please try again or email us directly.
          </p>
        )}
      </form>

      <div className="mt-8">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
