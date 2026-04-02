import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Logo from "@/components/Logo";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { Phone } from "lucide-react";

const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || "ketamineclinics.com";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${domain}`),
  title: {
    default: "Find Ketamine Therapy Clinics Near You | KetamineClinics.com",
    template: "%s | KetamineClinics.com",
  },
  description:
    "Search verified ketamine therapy clinics for depression, PTSD, anxiety, and chronic pain. Compare pricing, read reviews, and request consultation information.",
  openGraph: {
    siteName: "KetamineClinics.com",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Crisis Banner */}
        <div className="bg-lavender/10 border-b border-lavender/20 text-center py-2 px-4">
          <p className="text-sm text-soft-white/80">
            <Phone className="w-3.5 h-3.5 inline mr-1" />
            If you are in crisis, call or text{" "}
            <a href="tel:988" className="text-lavender font-semibold underline">
              988
            </a>{" "}
            (Suicide &amp; Crisis Lifeline) or text HOME to 741741
          </p>
        </div>

        {/* Header */}
        <header className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center gap-6 text-sm text-soft-white/70">
              <Link href="/" className="hover:text-teal transition-colors">
                Home
              </Link>
              <Link href="/blog" className="hover:text-teal transition-colors">
                Resources
              </Link>
              <Link href="/add-listing" className="hover:text-teal transition-colors">
                Claim Clinic
              </Link>
              <Link
                href="/add-listing"
                className="bg-teal text-navy font-semibold px-4 py-2 rounded-lg hover:bg-teal/90 transition-colors"
              >
                Claim Your Listing
              </Link>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
              <div>
                <Logo size="small" />
                <p className="text-soft-white/50 text-sm mt-3">
                  Connecting patients with verified ketamine therapy providers across the
                  United States.
                </p>
              </div>
              <div>
                <h4 className="font-display text-sm text-soft-white mb-3">Conditions</h4>
                <ul className="space-y-2 text-sm text-soft-white/50">
                  <li><Link href="/ketamine-for-depression" className="hover:text-teal">Depression</Link></li>
                  <li><Link href="/ketamine-for-ptsd" className="hover:text-teal">PTSD</Link></li>
                  <li><Link href="/ketamine-for-anxiety" className="hover:text-teal">Anxiety</Link></li>
                  <li><Link href="/ketamine-for-chronic-pain" className="hover:text-teal">Chronic Pain</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm text-soft-white mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-soft-white/50">
                  <li><Link href="/blog" className="hover:text-teal">Blog</Link></li>
                  <li><Link href="/blog/how-much-does-ketamine-therapy-cost" className="hover:text-teal">Pricing Guide</Link></li>
                  <li><Link href="/blog/how-to-find-ketamine-clinic-near-me" className="hover:text-teal">How to Find a Clinic</Link></li>
                  <li><Link href="/add-listing" className="hover:text-teal">Claim Your Listing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm text-soft-white mb-3">Crisis Resources</h4>
                <ul className="space-y-2 text-sm text-soft-white/50">
                  <li>
                    <a href="tel:988" className="text-lavender hover:text-lavender/80">
                      988 Suicide &amp; Crisis Lifeline
                    </a>
                  </li>
                  <li>
                    <a href="https://www.crisistextline.org" target="_blank" rel="noopener noreferrer" className="hover:text-teal">
                      Crisis Text Line: Text HOME to 741741
                    </a>
                  </li>
                  <li>
                    <a href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noopener noreferrer" className="hover:text-teal">
                      SAMHSA Helpline: 1-800-662-4357
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <MedicalDisclaimer />

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-soft-white/30 text-xs">
                &copy; {new Date().getFullYear()} KetamineClinics.com. All rights reserved.
              </p>
              <div className="flex gap-4 text-xs text-soft-white/30">
                <Link href="/disclaimer" className="hover:text-teal">
                  Disclaimer
                </Link>
                <span>|</span>
                <a href={`https://${domain}/sitemap.xml`} className="hover:text-teal">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
