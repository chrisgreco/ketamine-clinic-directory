"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { conditions } from "@/data/conditions";

const treatmentOptions = [
  { value: "iv_infusion", label: "IV Infusion" },
  { value: "im_injection", label: "IM Injection" },
  { value: "intranasal", label: "Intranasal (Spravato)" },
  { value: "sublingual", label: "Sublingual / Oral" },
  { value: "rac_ketamine", label: "Racemic Ketamine" },
];

export default function AddListingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    description: "",
    conditions_treated: [] as string[],
    treatment_types: [] as string[],
    accepts_insurance: false,
    telehealth_available: false,
    price_per_session_low: "",
    price_per_session_high: "",
  });

  function toggleArrayItem(
    field: "conditions_treated" | "treatment_types",
    value: string
  ) {
    setFormData((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price_per_session_low: Number(formData.price_per_session_low) || 0,
          price_per_session_high: Number(formData.price_per_session_high) || 0,
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
          Listing Submitted
        </h1>
        <p className="text-soft-white/60 mb-2">
          Thank you for submitting your clinic. Our team will review your listing
          and it will appear in the directory once approved (typically within
          48&ndash;72 hours).
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
        <p className="text-teal text-sm uppercase tracking-wider mb-2">
          For Providers
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-soft-white mb-4">
          Add Your Ketamine Clinic
        </h1>
        <p className="text-soft-white/60 max-w-xl mx-auto">
          List your practice in our directory to reach patients searching for
          ketamine therapy. Submissions are reviewed before publication.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-white/5 rounded-xl p-6 md:p-8 space-y-6"
      >
        {/* Clinic Info */}
        <fieldset>
          <legend className="font-display text-lg text-soft-white mb-4">
            Clinic Information
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
              className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            />
            <input
              required
              type="text"
              placeholder="Contact Name *"
              value={formData.contact_name}
              onChange={(e) =>
                setFormData({ ...formData, contact_name: e.target.value })
              }
              className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            />
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
            <input
              type="url"
              placeholder="Website URL"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className="sm:col-span-2 bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            />
          </div>
        </fieldset>

        {/* Location */}
        <fieldset>
          <legend className="font-display text-lg text-soft-white mb-4">
            Location
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="Street Address *"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="sm:col-span-2 bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            />
            <input
              required
              type="text"
              placeholder="City *"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                type="text"
                placeholder="State *"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
              />
              <input
                required
                type="text"
                placeholder="ZIP *"
                value={formData.zip_code}
                onChange={(e) =>
                  setFormData({ ...formData, zip_code: e.target.value })
                }
                className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
              />
            </div>
          </div>
        </fieldset>

        {/* Services */}
        <fieldset>
          <legend className="font-display text-lg text-soft-white mb-4">
            Services
          </legend>

          <div className="mb-4">
            <p className="text-soft-white/70 text-sm mb-2">
              Conditions Treated (select all that apply)
            </p>
            <div className="flex flex-wrap gap-2">
              {conditions.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => toggleArrayItem("conditions_treated", c.slug)}
                  className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
                    formData.conditions_treated.includes(c.slug)
                      ? "bg-teal text-navy border-teal"
                      : "bg-navy text-soft-white/60 border-white/10 hover:border-teal/40"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-soft-white/70 text-sm mb-2">
              Treatment Types (select all that apply)
            </p>
            <div className="flex flex-wrap gap-2">
              {treatmentOptions.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => toggleArrayItem("treatment_types", t.value)}
                  className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
                    formData.treatment_types.includes(t.value)
                      ? "bg-teal text-navy border-teal"
                      : "bg-navy text-soft-white/60 border-white/10 hover:border-teal/40"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mb-4">
            <label className="flex items-center gap-2 text-soft-white/70 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={formData.accepts_insurance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accepts_insurance: e.target.checked,
                  })
                }
                className="accent-teal"
              />
              Accepts Insurance
            </label>
            <label className="flex items-center gap-2 text-soft-white/70 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={formData.telehealth_available}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    telehealth_available: e.target.checked,
                  })
                }
                className="accent-teal"
              />
              Telehealth Available
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price Per Session (Low)"
              value={formData.price_per_session_low}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price_per_session_low: e.target.value,
                })
              }
              className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            />
            <input
              type="number"
              placeholder="Price Per Session (High)"
              value={formData.price_per_session_high}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price_per_session_high: e.target.value,
                })
              }
              className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            />
          </div>
        </fieldset>

        {/* Description */}
        <fieldset>
          <legend className="font-display text-lg text-soft-white mb-4">
            Description
          </legend>
          <textarea
            required
            placeholder="Describe your clinic, services, team qualifications, and approach to ketamine therapy... *"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
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
          <Send className="w-4 h-4" />
          {status === "loading" ? "Submitting..." : "Submit Listing for Review"}
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
