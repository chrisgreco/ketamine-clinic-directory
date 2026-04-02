"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { cities } from "@/data/cities";
import { useRouter } from "next/navigation";

export default function CitySearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filtered = query.length >= 2
    ? cities
        .filter(
          (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.state.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by city or state..."
          className="w-full bg-card border border-white/10 text-soft-white placeholder:text-soft-white/40 rounded-xl pl-12 pr-4 py-3.5 text-base focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal/30"
        />
      </div>

      {isOpen && filtered.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
          {filtered.map((city) => (
            <button
              key={city.slug}
              onClick={() => {
                router.push(`/${city.slug}`);
                setIsOpen(false);
                setQuery("");
              }}
              className="w-full text-left px-4 py-3 text-sm text-soft-white hover:bg-teal/10 hover:text-teal transition-colors border-b border-white/5 last:border-0"
            >
              {city.name}, {city.stateAbbr}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
