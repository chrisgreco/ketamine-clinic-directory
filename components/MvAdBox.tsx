export default function MvAdBox() {
  return (
    <div className="bg-card border border-teal/20 rounded-xl p-6 text-center">
      <p className="text-soft-white/40 text-xs uppercase tracking-wider mb-2">Sponsored</p>
      <p className="text-soft-white/70 text-sm">
        Advertising space available. Reach thousands of patients exploring ketamine therapy.
      </p>
      <a
        href="mailto:ads@ketamineclinics.com"
        className="inline-block mt-3 text-teal text-sm font-medium hover:underline"
      >
        Contact for Advertising
      </a>
    </div>
  );
}
