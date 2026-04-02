"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="font-display text-2xl text-soft-white mb-6">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-card border border-white/5 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-medium text-soft-white pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-teal flex-shrink-0 transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 pt-0 text-soft-white/70 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
