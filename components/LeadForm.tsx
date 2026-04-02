"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { conditions } from "@/data/conditions";

interface LeadFormProps {
  listingId?: string;
  city?: string;
  state?: string;
}

export default function LeadForm({ listingId, city, state }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    condition: "",
    insurance_type: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          listing_id: listingId || null,
          city: city || "",
          state: state || "",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", condition: "", insurance_type: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-card border border-teal/30 rounded-xl p-8 text-center">
        <CheckCircle className="w-12 h-12 text-teal mx-auto mb-4" />
        <h3 className="font-display text-xl text-soft-white mb-2">Request Received</h3>
        <p className="text-soft-white/60 text-sm">
          Thank you for your inquiry. A representative will reach out within 24&ndash;48 hours.
          This is not a medical consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-white/5 rounded-xl p-6">
      <h3 className="font-display text-xl text-soft-white mb-1">Request Consultation Info</h3>
      <p className="text-soft-white/50 text-sm mb-6">
        Get connected with a clinic near you. This is an information request, not a medical consultation.
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            required
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
          />
          <input
            required
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
          />
        </div>

        <input
          type="tel"
          placeholder="Phone Number (optional)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            className="bg-navy border border-white/10 text-soft-white rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
          >
            <option value="">Select Condition</option>
            {conditions.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={formData.insurance_type}
            onChange={(e) => setFormData({ ...formData, insurance_type: e.target.value })}
            className="bg-navy border border-white/10 text-soft-white rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
          >
            <option value="">Insurance Type</option>
            <option value="private">Private Insurance</option>
            <option value="medicare">Medicare</option>
            <option value="medicaid">Medicaid</option>
            <option value="tricare">TRICARE</option>
            <option value="self-pay">Self-Pay</option>
            <option value="other">Other</option>
          </select>
        </div>

        <textarea
          placeholder="Tell us about your situation (optional)"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          className="w-full bg-navy border border-white/10 text-soft-white placeholder:text-soft-white/30 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:outline-none resize-none"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 bg-teal text-navy font-semibold py-3 rounded-lg hover:bg-teal/90 transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {status === "loading" ? "Sending..." : "Request Information"}
        </button>

        {status === "error" && (
          <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
}
