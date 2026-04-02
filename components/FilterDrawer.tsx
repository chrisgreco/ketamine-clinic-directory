"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { conditions } from "@/data/conditions";

const treatmentTypes = [
  "IV Infusion",
  "IM Injection",
  "Intranasal (Spravato)",
  "Sublingual/Oral",
  "Ketamine-Assisted Psychotherapy",
];

interface FilterDrawerProps {
  onFilter: (filters: {
    condition: string;
    treatmentType: string;
    insurance: boolean | null;
    telehealth: boolean | null;
  }) => void;
}

export default function FilterDrawer({ onFilter }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState("");
  const [treatmentType, setTreatmentType] = useState("");
  const [insurance, setInsurance] = useState<boolean | null>(null);
  const [telehealth, setTelehealth] = useState<boolean | null>(null);

  function apply() {
    onFilter({ condition, treatmentType, insurance, telehealth });
    setOpen(false);
  }

  function reset() {
    setCondition("");
    setTreatmentType("");
    setInsurance(null);
    setTelehealth(null);
    onFilter({ condition: "", treatmentType: "", insurance: null, telehealth: null });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-card border border-white/10 text-soft-white px-4 py-2.5 rounded-lg hover:border-teal/40 transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4 text-teal" />
        Filters
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative ml-auto w-full max-w-sm bg-navy border-l border-white/10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg text-soft-white">Filter Clinics</h3>
              <button onClick={() => setOpen(false)} className="text-soft-white/60 hover:text-soft-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-soft-white/70 mb-2">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-card border border-white/10 text-soft-white rounded-lg px-3 py-2.5 text-sm focus:border-teal focus:outline-none"
                >
                  <option value="">All Conditions</option>
                  {conditions.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-soft-white/70 mb-2">Treatment Type</label>
                <select
                  value={treatmentType}
                  onChange={(e) => setTreatmentType(e.target.value)}
                  className="w-full bg-card border border-white/10 text-soft-white rounded-lg px-3 py-2.5 text-sm focus:border-teal focus:outline-none"
                >
                  <option value="">All Types</option>
                  {treatmentTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-soft-white/70 mb-2">Insurance</label>
                <div className="flex gap-2">
                  {[
                    { label: "Any", value: null },
                    { label: "Accepted", value: true },
                    { label: "Self-Pay", value: false },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setInsurance(opt.value)}
                      className={`flex-1 text-sm py-2 rounded-lg border transition-colors ${
                        insurance === opt.value
                          ? "bg-teal text-navy border-teal"
                          : "bg-card text-soft-white/70 border-white/10 hover:border-teal/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-soft-white/70 mb-2">Telehealth</label>
                <div className="flex gap-2">
                  {[
                    { label: "Any", value: null },
                    { label: "Available", value: true },
                    { label: "In-Person Only", value: false },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setTelehealth(opt.value)}
                      className={`flex-1 text-sm py-2 rounded-lg border transition-colors ${
                        telehealth === opt.value
                          ? "bg-teal text-navy border-teal"
                          : "bg-card text-soft-white/70 border-white/10 hover:border-teal/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={reset}
                className="flex-1 text-sm text-soft-white/60 border border-white/10 rounded-lg py-2.5 hover:border-white/20"
              >
                Reset
              </button>
              <button
                onClick={apply}
                className="flex-1 text-sm bg-teal text-navy font-semibold rounded-lg py-2.5 hover:bg-teal/90"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
