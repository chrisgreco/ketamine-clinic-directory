import Link from "next/link";

export default function Logo({ size = "default" }: { size?: "default" | "small" }) {
  const h = size === "small" ? "h-7" : "h-9";
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg
        className={`${h} w-auto`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Brain outline with spark — neural/medical */}
        <path
          d="M20 6C13 6 8 11 8 18C8 22 10 25 13 27L13 34H19V28"
          stroke="#00C9C8"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M20 6C27 6 32 11 32 18C32 22 30 25 27 27L27 34H21V28"
          stroke="#A78BFA"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Neural spark */}
        <circle cx="20" cy="16" r="2" fill="#00C9C8" />
        <line x1="20" y1="12" x2="20" y2="10" stroke="#00C9C8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="14" x2="14.5" y2="12.5" stroke="#00C9C8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="14" x2="25.5" y2="12.5" stroke="#00C9C8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold text-soft-white">
          Clarity<span className="text-teal">Path</span>
        </span>
        {size === "default" && (
          <span className="text-[10px] font-medium tracking-widest text-soft-white/40 uppercase">
            Ketamine Clinics
          </span>
        )}
      </div>
    </Link>
  );
}
