import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";
import { cities } from "@/data/cities";
import { conditions, getConditionBySlug } from "@/data/conditions";
import { getListingsByCity, getListingsByCondition } from "@/lib/supabase";
import ClinicCard from "@/components/ClinicCard";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import MvAdBox from "@/components/MvAdBox";
import { SITE_NAME, SITE_URL, formatCondition } from "@/lib/utils";
import type { City, Condition, Listing } from "@/types/global";

/* ─── Static Params ─── */

export async function generateStaticParams() {
  const cityParams = cities.map((c) => ({ slug: c.slug }));
  const conditionParams = conditions.map((c) => ({ slug: `ketamine-for-${c.slug}` }));
  return [...cityParams, ...conditionParams];
}

/* ─── Helpers ─── */

function findCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

function findCondition(slug: string): Condition | undefined {
  if (!slug.startsWith("ketamine-for-")) return undefined;
  const condSlug = slug.replace("ketamine-for-", "");
  return getConditionBySlug(condSlug);
}

/* ─── Metadata ─── */

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const city = findCity(params.slug);
  if (city) {
    return {
      title: `Ketamine Clinics in ${city.name}, ${city.stateAbbr} - Find Providers Near You`,
      description: `Find top-rated ketamine therapy clinics in ${city.name}, ${city.stateAbbr}. Compare pricing, read patient reviews, and request consultation information from verified providers.`,
      openGraph: {
        title: `Ketamine Clinics in ${city.name}, ${city.stateAbbr}`,
        description: `Browse verified ketamine therapy providers in ${city.name}. IV infusions, Spravato, and more.`,
        url: `${SITE_URL}/${city.slug}`,
      },
    };
  }

  const condition = findCondition(params.slug);
  if (condition) {
    return {
      title: `Ketamine for ${condition.name} - Treatment Information & Clinics`,
      description: `Learn how ketamine therapy may help with ${condition.name}. Find clinics specializing in ketamine treatment for ${condition.name.toLowerCase()}, understand protocols, and ask the right questions.`,
      openGraph: {
        title: `Ketamine for ${condition.name}`,
        description: `Research-backed information about ketamine therapy for ${condition.name.toLowerCase()}.`,
        url: `${SITE_URL}/${params.slug}`,
      },
    };
  }

  return { title: "Page Not Found" };
}

/* ─── City Page Component ─── */

function CityFAQs({ city }: { city: City }) {
  return [
    {
      question: `How much does ketamine therapy cost in ${city.name}?`,
      answer: `In ${city.name}, ${city.stateAbbr}, a single IV ketamine infusion typically costs between $400 and $800. An initial series of six infusions may range from $2,400 to $4,800. Pricing varies by clinic, treatment type, and whether the provider offers Spravato (esketamine), which may be partially covered by insurance. Always consult your chosen provider for current pricing.`,
    },
    {
      question: `Does insurance cover ketamine treatment in ${city.name}?`,
      answer: `Most commercial insurance plans do not cover off-label IV ketamine infusions. However, Spravato (esketamine nasal spray) is FDA-approved for treatment-resistant depression and may be covered by many insurers including Medicare. Some ${city.name} clinics offer payment plans or financing. Check with your provider and insurance company for details.`,
    },
    {
      question: `How do I find a reputable ketamine clinic in ${city.name}?`,
      answer: `Look for clinics with board-certified physicians (anesthesiologists, psychiatrists, or emergency medicine doctors), proper monitoring equipment, established safety protocols, and transparent pricing. Our directory lists verified providers in ${city.name} to help you compare options. Always schedule a consultation before committing to treatment.`,
    },
    {
      question: `What conditions do ${city.name} ketamine clinics treat?`,
      answer: `Ketamine clinics in ${city.name} commonly treat depression (including treatment-resistant depression), PTSD, anxiety disorders, chronic pain (CRPS, fibromyalgia, neuropathic pain), bipolar depression, OCD, and suicidal ideation. Each clinic may specialize in different conditions. Consult your physician to determine if ketamine therapy is appropriate for your situation.`,
    },
    {
      question: `Is telehealth ketamine therapy available in ${city.stateAbbr}?`,
      answer: `Some ketamine providers in ${city.stateAbbr} offer telehealth consultations for initial evaluations, follow-up appointments, and ketamine-assisted psychotherapy (KAP) with at-home sublingual tablets. However, IV and IM ketamine infusions require in-person visits. Telehealth availability varies by clinic and state regulations.`,
    },
  ];
}

async function CityPage({ city }: { city: City }) {
  const listings = await getListingsByCity(city.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center gap-1 text-teal text-sm mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-5 h-5 text-teal" />
        <span className="text-teal text-sm uppercase tracking-wider">
          {city.stateAbbr}
        </span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl text-soft-white mb-6">
        Ketamine Clinics in {city.name}, {city.stateAbbr}
      </h1>

      <div className="prose-ketamine max-w-3xl mb-10">
        <p>
          If you are searching for ketamine therapy in {city.name}, {city.stateAbbr}, you
          are not alone. Thousands of patients across the {city.name} metro area are
          exploring ketamine infusions and Spravato (esketamine) as potential treatment
          options for depression, PTSD, anxiety, chronic pain, and other conditions that
          have not responded to conventional therapies.
        </p>
        <p>
          Ketamine therapy is administered under medical supervision, typically via IV
          infusion, intramuscular injection, or intranasal spray. In {city.name}, clinics
          staffed by board-certified anesthesiologists, psychiatrists, and pain specialists
          offer these services in monitored clinical settings. Treatment protocols generally
          involve an initial series of six infusions over two to three weeks, followed by
          maintenance sessions as needed.
        </p>
        <p>
          Before choosing a provider in {city.name}, patients should verify the clinic&apos;s
          medical credentials, ask about safety monitoring protocols, and understand the full
          cost of treatment. We recommend consulting your primary care physician or
          psychiatrist before beginning ketamine therapy to discuss whether it may be
          appropriate for your specific medical situation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listings.map((listing) => (
                <ClinicCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-white/5 rounded-xl p-8 text-center">
              <p className="text-soft-white/60 mb-4">
                No clinics listed in {city.name} yet. Check back soon or submit your clinic.
              </p>
              <Link
                href="/add-listing"
                className="inline-block bg-teal text-navy font-semibold px-6 py-2.5 rounded-lg hover:bg-teal/90 transition-colors"
              >
                Add Your Clinic
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <LeadForm city={city.name} state={city.stateAbbr} />
          <MvAdBox />
        </div>
      </div>

      <FAQSection faqs={CityFAQs({ city })} />

      <div className="mt-12">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}

/* ─── Condition Page Component ─── */

function ConditionFAQs({ condition }: { condition: Condition }) {
  return [
    {
      question: `Is ketamine FDA-approved for ${condition.name.toLowerCase()}?`,
      answer: `Esketamine (Spravato) is FDA-approved specifically for treatment-resistant depression and major depressive disorder with suicidal ideation. IV racemic ketamine is used off-label for ${condition.name.toLowerCase()} and other conditions. Off-label use is legal and common in medicine, but it means the specific use has not gone through the full FDA approval process for that indication. Consult your physician for guidance.`,
    },
    {
      question: `How quickly does ketamine work for ${condition.name.toLowerCase()}?`,
      answer: `Many patients report symptom improvement within hours to days of their first ketamine infusion, though response times vary by individual and condition. For ${condition.name.toLowerCase()}, clinicians typically evaluate response after two to three sessions. Some patients require the full initial series of six infusions before experiencing meaningful relief. Your provider will monitor your progress and adjust the treatment plan accordingly.`,
    },
    {
      question: `What are the side effects of ketamine therapy for ${condition.name.toLowerCase()}?`,
      answer: `Common side effects during and shortly after infusion include dissociation, dizziness, nausea, increased blood pressure, and blurred vision. These typically resolve within one to two hours. Serious side effects are rare when treatment is administered by qualified medical professionals in a monitored setting. Discuss your complete medical history and current medications with your provider before starting treatment.`,
    },
    {
      question: `How much does ketamine treatment for ${condition.name.toLowerCase()} cost?`,
      answer: `A single IV ketamine infusion typically costs $400 to $800. An initial treatment series of six infusions ranges from $2,400 to $4,800. Spravato (esketamine) may be partially covered by insurance. Costs vary by clinic, location, and treatment protocol. Many providers offer payment plans or financing options.`,
    },
    {
      question: `Can I take my current medications while receiving ketamine therapy?`,
      answer: `Most patients can continue their existing medications during ketamine therapy, but some drug interactions exist. MAOIs, benzodiazepines, and certain other medications may need adjustment. It is essential to provide your ketamine provider with a complete list of all medications and supplements you are taking. Never adjust medications without consulting your prescribing physician.`,
    },
  ];
}

function QuestionsToAsk({ condition }: { condition: Condition }) {
  const questions = [
    `What is your experience treating ${condition.name.toLowerCase()} with ketamine specifically?`,
    "What medical credentials and board certifications do you and your staff hold?",
    "What monitoring equipment and safety protocols are in place during infusions?",
    `What treatment protocol do you recommend for ${condition.name.toLowerCase()}, and how many sessions are typically needed?`,
    "What happens if I do not respond to the initial treatment series?",
    "Do you coordinate with my existing psychiatrist or primary care physician?",
    "What is your pricing structure, and do you offer financing or accept any insurance for Spravato?",
  ];

  return (
    <section className="mb-12">
      <h2 className="font-display text-2xl text-soft-white mb-6">
        Questions to Ask Your Ketamine Provider
      </h2>
      <div className="bg-card border border-white/5 rounded-xl p-6">
        <ol className="space-y-4">
          {questions.map((q, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-teal/10 text-teal rounded-full flex items-center justify-center text-sm font-semibold">
                {i + 1}
              </span>
              <p className="text-soft-white/80 text-sm leading-relaxed pt-0.5">{q}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

async function ConditionPage({ condition, slug }: { condition: Condition; slug: string }) {
  const listings = await getListingsByCondition(condition.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `Ketamine for ${condition.name}`,
    about: {
      "@type": "MedicalCondition",
      name: condition.name,
      code: {
        "@type": "MedicalCode",
        codeValue: condition.icdCode,
        codingSystem: "ICD-10",
      },
    },
    lastReviewed: new Date().toISOString().split("T")[0],
    mainContentOfPage: {
      "@type": "WebPageElement",
      cssSelector: ".condition-content",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/" className="inline-flex items-center gap-1 text-teal text-sm mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <p className="text-teal text-sm uppercase tracking-wider mb-2">Condition Guide</p>

      <h1 className="font-display text-3xl md:text-4xl text-soft-white mb-8">
        Ketamine Therapy for {condition.name}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 condition-content">
          <div className="prose-ketamine mb-10">
            <h2>Understanding {condition.name}</h2>
            <p>{condition.description}</p>
            <p>
              {condition.name} affects millions of people in the United States, and for many
              patients, first-line treatments such as SSRIs, SNRIs, therapy, or other conventional
              approaches provide insufficient relief. When standard treatments have not produced
              adequate results, clinicians may consider ketamine therapy as an alternative or
              adjunctive treatment option. Research into ketamine&apos;s effects on {condition.name.toLowerCase()} continues
              to expand, with studies published in peer-reviewed journals suggesting promising outcomes
              for certain patient populations.
            </p>

            <h2>How Ketamine Therapy Works for {condition.name}</h2>
            <p>
              Ketamine is believed to work primarily through modulation of the NMDA (N-methyl-D-aspartate)
              glutamate receptor system, which differs fundamentally from the serotonin-based mechanism
              of most traditional psychiatric medications. This distinct mechanism of action is one reason
              ketamine may help patients who have not responded to other treatments. Studies suggest
              that ketamine promotes synaptic plasticity and the formation of new neural connections,
              potentially helping to reverse some of the neurological changes associated with
              {" "}{condition.name.toLowerCase()}.
            </p>

            <h2>Treatment Protocol</h2>
            <p>{condition.ketamineApproach}</p>
            <p>
              During each session, patients are monitored by medical staff who track vital signs
              including blood pressure, heart rate, and oxygen saturation. Sessions typically last
              40 to 60 minutes for mood-related conditions, with an additional 30 to 60 minutes of
              post-infusion observation. Patients should not drive for at least several hours after
              treatment and should arrange transportation in advance.
            </p>

            <h2>What Research Says</h2>
            <p>
              Published studies suggest that ketamine therapy may produce meaningful symptom improvement
              in a significant percentage of patients with {condition.name.toLowerCase()}. However,
              individual results vary considerably, and ketamine is not effective for everyone. It is
              important to have realistic expectations and to discuss the current evidence with your
              healthcare provider. Research in this area is ongoing, and new findings continue to
              refine clinical understanding of who may benefit most.
            </p>

            <h2>Important Considerations</h2>
            <p>
              Ketamine therapy is a medical procedure that should only be administered by qualified
              healthcare professionals in an appropriate clinical setting. Before pursuing ketamine
              treatment for {condition.name.toLowerCase()}, consult your primary care physician or
              psychiatrist. Certain medical conditions, medications, and personal history factors may
              affect whether ketamine therapy is appropriate for you. This information is provided for
              educational purposes and should not be interpreted as medical advice or a recommendation
              for treatment.
            </p>
          </div>

          <QuestionsToAsk condition={condition} />

          {listings.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl text-soft-white mb-6">
                Clinics Treating {condition.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listings.slice(0, 6).map((listing) => (
                  <ClinicCard key={listing.id} listing={listing} />
                ))}
              </div>
            </section>
          )}

          <FAQSection faqs={ConditionFAQs({ condition })} />
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-white/5 rounded-xl p-6">
            <h3 className="font-display text-lg text-soft-white mb-3">Condition Details</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-soft-white/50">ICD-10 Code</dt>
                <dd className="text-soft-white font-mono">{condition.icdCode}</dd>
              </div>
              <div>
                <dt className="text-soft-white/50">Common Names</dt>
                <dd className="text-soft-white">{condition.name}</dd>
              </div>
            </dl>
          </div>

          <LeadForm />

          <div className="bg-card border border-white/5 rounded-xl p-6">
            <h3 className="font-display text-lg text-soft-white mb-3">Related Conditions</h3>
            <ul className="space-y-2">
              {conditions
                .filter((c) => c.slug !== condition.slug)
                .slice(0, 5)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/ketamine-for-${c.slug}`}
                      className="text-sm text-soft-white/70 hover:text-teal transition-colors"
                    >
                      Ketamine for {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <MvAdBox />
        </div>
      </div>

      <div className="mt-12">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}

/* ─── Page Component ─── */

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const city = findCity(params.slug);
  if (city) return <CityPage city={city} />;

  const condition = findCondition(params.slug);
  if (condition) return <ConditionPage condition={condition} slug={params.slug} />;

  notFound();
}
