export const DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || "ketamineclinics.com";
export const SITE_NAME = "KetamineClinics.com";
export const SITE_URL = `https://${DOMAIN}`;

export function formatCondition(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatTreatmentType(slug: string): string {
  const map: Record<string, string> = {
    iv_infusion: "IV Infusion",
    intranasal: "Intranasal (Spravato)",
    sublingual: "Sublingual / Oral",
    im_injection: "IM Injection",
    rac_ketamine: "Racemic Ketamine",
  };
  return map[slug] || formatCondition(slug);
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
