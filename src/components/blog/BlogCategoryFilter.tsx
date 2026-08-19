"use client";

import { useState } from "react";

export const BLOG_CATEGORIES = [
  { label: "All", slug: "all" },
  { label: "Banking & AePS", slug: "banking-aeps" },
  { label: "UPI & Payments", slug: "upi-payments" },
  { label: "Insurance", slug: "insurance" },
  { label: "Travel Services", slug: "travel-services" },
  { label: "Government Schemes", slug: "government-schemes" },
];

export default function BlogCategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {BLOG_CATEGORIES.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <button
            key={cat.slug}
            type="button"
            onClick={() => onChange(cat.slug)}
            className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${
              isActive
                ? "bg-brand-purple-dark text-white shadow-sm"
                : "border border-brand-purple/15 bg-white text-brand-purple-dark hover:border-brand-purple/30"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}