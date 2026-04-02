"use client";

import Link from "next/link";

interface MedicalDisclaimerProps {
  sticky?: boolean;
}

export default function MedicalDisclaimer({ sticky = false }: MedicalDisclaimerProps) {
  return (
    <div
      className={`bg-card border-l-4 border-teal rounded-r-lg p-4 text-sm text-soft-white/80 ${
        sticky ? "md:static fixed bottom-0 left-0 right-0 z-50 rounded-none border-l-0 border-t-4" : ""
      }`}
    >
      <p className="font-display text-xs uppercase tracking-wider text-teal mb-1">
        Medical Disclaimer
      </p>
      <p>
        This website provides general information about ketamine therapy for educational
        purposes only. It is not a substitute for professional medical advice, diagnosis,
        or treatment. Always consult a qualified healthcare provider before beginning any
        treatment.{" "}
        <Link href="/disclaimer" className="text-teal underline hover:text-teal/80">
          Read full disclaimer
        </Link>
        .
      </p>
    </div>
  );
}
