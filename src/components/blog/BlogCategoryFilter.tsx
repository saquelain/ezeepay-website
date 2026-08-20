"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api/blog";
import type { Category } from "@/lib/types/blog";

export default function BlogCategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (slug: string) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const pills = [{ label: "All", slug: "all" }, ...categories.map((c) => ({ label: c.name, slug: c.slug }))];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {pills.map((cat) => {
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