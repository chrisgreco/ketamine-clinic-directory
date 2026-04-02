import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Medical Disclaimer & Legal Notice",
  description:
    "Full medical disclaimer, legal notice, and terms of use for KetamineClinics.com. This website provides informational content only and is not a substitute for professional medical advice.",
  openGraph: {
    title: "Medical Disclaimer & Legal Notice",
    url: `${SITE_URL}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-teal text-sm mb-8 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="font-display text-3xl md:text-4xl text-soft-white mb-8">
        Medical Disclaimer &amp; Legal Notice
      </h1>

      <p className="text-soft-white/50 text-sm mb-10">
        Last updated: April 1, 2026
      </p>

      <div className="prose-ketamine space-y-10">
        {/* Section 1 */}
        <section>
          <h2>1. General Medical Disclaimer</h2>
          <p>
            The information provided on {SITE_NAME} (the &quot;Website&quot;) is for
            general informational and educational purposes only. It is not intended
            to be, and should not be construed as, medical advice, diagnosis, or
            treatment. The content on this Website does not establish a
            physician-patient or therapist-patient relationship between you and
            {" "}{SITE_NAME}, its owners, contributors, or any healthcare providers
            listed in the directory.
          </p>
          <p>
            Always seek the advice of your physician, psychiatrist, or other
            qualified healthcare provider with any questions you may have regarding
            a medical condition. Never disregard professional medical advice or
            delay in seeking it because of something you have read on this Website.
            If you think you may have a medical emergency, call your doctor, go to
            the emergency department, or call 911 immediately.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2>2. Ketamine Therapy Information</h2>
          <p>
            Ketamine is a controlled substance (Schedule III) in the United States.
            Racemic ketamine (IV, IM, sublingual) is used off-label for various
            psychiatric and pain conditions. Off-label use means the medication is
            being prescribed for a condition or in a manner not specifically approved
            by the U.S. Food and Drug Administration (FDA). Off-label prescribing is
            legal and common in medical practice, but it is important that patients
            understand this distinction.
          </p>
          <p>
            Esketamine (Spravato) nasal spray is FDA-approved for treatment-resistant
            depression (TRD) and major depressive disorder with suicidal ideation
            (MDSI) in adults. It must be administered under the supervision of a
            healthcare provider in a certified healthcare setting through the Spravato
            REMS (Risk Evaluation and Mitigation Strategy) program.
          </p>
          <p>
            The efficacy and safety of ketamine therapy vary by individual. Results
            described on this Website, including those referenced from published
            studies, may not be representative of all patients. Individual results
            depend on numerous factors including but not limited to: the specific
            condition being treated, severity, medical history, concurrent
            medications, treatment protocol, and individual biology.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2>3. No Endorsement of Providers</h2>
          <p>
            {SITE_NAME} is a directory and informational resource. Inclusion of a
            clinic or healthcare provider in this directory does not constitute an
            endorsement, recommendation, or guarantee of the quality, safety, or
            effectiveness of their services. We do not verify medical outcomes, and
            we are not responsible for the care provided by any listed provider.
          </p>
          <p>
            While we make reasonable efforts to verify that listed providers hold
            appropriate licenses and credentials, we cannot guarantee the accuracy,
            completeness, or currency of any provider&apos;s information. Patients are
            strongly encouraged to independently verify the credentials, licensing
            status, and malpractice history of any healthcare provider before
            beginning treatment.
          </p>
          <p>
            Ratings and reviews displayed on this Website are submitted by users and
            do not represent the views of {SITE_NAME}. We do not verify the identity
            of reviewers or the accuracy of their statements. Reviews should not be
            the sole basis for choosing a healthcare provider.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2>4. Crisis &amp; Emergency Resources</h2>
          <p>
            If you are experiencing a mental health crisis, suicidal thoughts, or a
            medical emergency, do not use this Website to seek help. Instead, contact
            emergency services immediately:
          </p>
          <ul>
            <li>
              <strong>988 Suicide &amp; Crisis Lifeline:</strong> Call or text{" "}
              <a href="tel:988">988</a> (available 24/7)
            </li>
            <li>
              <strong>Crisis Text Line:</strong> Text HOME to{" "}
              <strong>741741</strong>
            </li>
            <li>
              <strong>SAMHSA National Helpline:</strong>{" "}
              <a href="tel:1-800-662-4357">1-800-662-4357</a> (free, confidential,
              24/7)
            </li>
            <li>
              <strong>Emergency Services:</strong> Call <a href="tel:911">911</a>{" "}
              or go to your nearest emergency room
            </li>
            <li>
              <strong>Veterans Crisis Line:</strong> Call{" "}
              <a href="tel:988">988</a>, then press 1
            </li>
          </ul>
          <p>
            This Website is not a crisis resource and should never be used as a
            substitute for immediate professional help in an emergency situation.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2>5. Accuracy of Information &amp; Limitations</h2>
          <p>
            We strive to provide accurate, up-to-date information based on published
            research and reputable medical sources. However, medical knowledge
            evolves rapidly, and information on this Website may become outdated. We
            make no warranties or representations about the accuracy, reliability, or
            completeness of any information provided.
          </p>
          <p>
            Pricing information displayed on this Website is provided by clinics and
            third-party sources and may not reflect current rates. Actual treatment
            costs may vary based on your specific treatment plan, insurance coverage,
            geographic location, and other factors. Always confirm pricing directly
            with your chosen provider.
          </p>
          <p>
            References to clinical studies, research findings, and statistics are
            provided for informational purposes and should not be interpreted as
            guarantees of treatment outcomes. The phrases &quot;studies suggest,&quot;
            &quot;research indicates,&quot; and similar language are used intentionally
            to reflect the evolving nature of medical evidence.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2>6. Affiliate Disclosure &amp; Advertising</h2>
          <p>
            {SITE_NAME} may contain affiliate links, sponsored content, and paid
            advertisements. When you click on an affiliate link and make a purchase
            or sign up for a service, we may receive a commission at no additional
            cost to you. Sponsored listings and advertisements are clearly marked.
          </p>
          <p>
            The presence of advertising or affiliate relationships does not influence
            our editorial content or provider listings. However, featured or
            sponsored listings may receive preferential placement in search results
            or directory pages. We are committed to transparency and will always
            disclose material relationships.
          </p>
          <p>
            Lead generation forms on this Website collect contact information that
            may be shared with ketamine clinics for the purpose of facilitating
            consultation requests. By submitting a lead form, you consent to being
            contacted by the relevant provider. Your information will be handled in
            accordance with applicable privacy laws.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {SITE_NAME}, its owners,
            operators, contributors, affiliates, and partners shall not be liable for
            any direct, indirect, incidental, special, consequential, or punitive
            damages arising from or related to your use of this Website, reliance on
            any information provided, or any interactions with healthcare providers
            listed in the directory.
          </p>
          <p>
            This limitation applies regardless of whether the damages arise from
            breach of contract, tort (including negligence), strict liability, or any
            other legal theory, even if {SITE_NAME} has been advised of the
            possibility of such damages.
          </p>
          <p>
            By using this Website, you acknowledge that you have read, understood,
            and agree to be bound by this disclaimer. If you do not agree with any
            part of this disclaimer, please discontinue use of the Website
            immediately.
          </p>
          <p>
            This disclaimer is governed by the laws of the State of Delaware, United
            States. Any disputes arising from or related to this disclaimer or your
            use of the Website shall be resolved in the courts of Delaware.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5">
        <p className="text-soft-white/30 text-xs">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved. For
          questions about this disclaimer, contact{" "}
          <a
            href="mailto:legal@ketamineclinics.com"
            className="text-teal hover:underline"
          >
            legal@ketamineclinics.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
