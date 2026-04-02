import { Condition } from "@/types/global";

export const conditions: Condition[] = [
  {
    slug: "depression",
    name: "Treatment-Resistant Depression",
    description:
      "Ketamine therapy has shown rapid-acting antidepressant effects for patients who have not responded to traditional medications. Research suggests it works through NMDA receptor modulation, offering relief sometimes within hours rather than weeks.",
    icdCode: "F32.9",
    ketamineApproach:
      "IV ketamine infusions typically administered as a series of six sessions over two to three weeks. Patients often report mood improvement within 24 to 72 hours of the first infusion. Maintenance sessions may be recommended monthly.",
  },
  {
    slug: "ptsd",
    name: "PTSD (Post-Traumatic Stress Disorder)",
    description:
      "Emerging research suggests ketamine may help reduce PTSD symptoms by disrupting fear-based neural pathways. Studies indicate it may facilitate reconsolidation of traumatic memories when combined with psychotherapy.",
    icdCode: "F43.1",
    ketamineApproach:
      "Ketamine-assisted psychotherapy (KAP) pairs sub-anesthetic doses with guided therapy sessions. The dissociative properties may allow patients to process trauma from a safe psychological distance. Protocols vary but typically involve three to six sessions.",
  },
  {
    slug: "anxiety",
    name: "Generalized Anxiety Disorder",
    description:
      "Preliminary studies suggest ketamine may provide rapid anxiolytic effects for patients with severe or treatment-resistant anxiety. It appears to modulate glutamate signaling pathways associated with anxiety disorders.",
    icdCode: "F41.1",
    ketamineApproach:
      "Lower-dose ketamine protocols are often used for anxiety, sometimes via intramuscular or sublingual administration. Treatment plans typically start with an initial series of sessions, with response evaluation after the third infusion.",
  },
  {
    slug: "chronic-pain",
    name: "Chronic Pain Syndromes",
    description:
      "Ketamine has been studied as a treatment for chronic pain conditions including CRPS, fibromyalgia, and neuropathic pain. It may work by resetting central sensitization and modulating NMDA receptors involved in pain signaling.",
    icdCode: "G89.4",
    ketamineApproach:
      "Pain-focused ketamine protocols often involve higher doses and longer infusion durations compared to mood disorder protocols. Multi-day infusions over four to five hours are common. Some clinics combine ketamine with lidocaine or magnesium.",
  },
  {
    slug: "bipolar-disorder",
    name: "Bipolar Depression",
    description:
      "Research indicates ketamine may help alleviate the depressive episodes of bipolar disorder without triggering mania in many patients. Studies suggest careful monitoring and dose adjustment are essential for this population.",
    icdCode: "F31.9",
    ketamineApproach:
      "Bipolar patients require additional screening and monitoring during ketamine therapy. Clinics typically require mood stabilizer maintenance and close psychiatric oversight. Sessions follow similar protocols to depression treatment with enhanced safety measures.",
  },
  {
    slug: "ocd",
    name: "Obsessive-Compulsive Disorder",
    description:
      "Early research suggests ketamine may provide rapid reduction in OCD symptoms, particularly intrusive thoughts. Studies indicate the glutamate-modulating effects may disrupt compulsive neural circuits.",
    icdCode: "F42.9",
    ketamineApproach:
      "OCD-focused ketamine treatment is often combined with exposure and response prevention (ERP) therapy. The window of reduced symptoms following infusion may enhance therapeutic gains. Protocols typically involve an initial series with ongoing maintenance.",
  },
  {
    slug: "suicidal-ideation",
    name: "Suicidal Ideation",
    description:
      "Ketamine has demonstrated some of the most rapid anti-suicidal effects of any known intervention. Research shows it may reduce suicidal thoughts within hours, providing a critical bridge while other treatments take effect.",
    icdCode: "R45.851",
    ketamineApproach:
      "Acute suicidal ideation protocols prioritize safety with continuous monitoring. Treatment is typically administered in clinical settings with emergency resources available. Rapid follow-up sessions and concurrent psychiatric care are standard.",
  },
  {
    slug: "migraine",
    name: "Chronic Migraine",
    description:
      "Studies suggest ketamine may help break the cycle of chronic migraines, particularly those resistant to conventional treatments. It appears to modulate pain pathways and reduce central sensitization associated with migraine chronification.",
    icdCode: "G43.7",
    ketamineApproach:
      "Migraine-focused protocols may involve a series of shorter infusions or intranasal administration. Some clinics offer multi-day intensive protocols for status migrainosus. Treatment is often combined with standard migraine preventive strategies.",
  },
];

export function getConditionBySlug(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}
