"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { getCategories } from "@/lib/api/blog";
import type { Category } from "@/lib/types/blog";

export default function BlogSidebar({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories(true).then(setCategories).catch(console.error);
  }, []);

  return (
    <aside className="space-y-6">
      {/* Popular Categories */}
      <div className="rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-brand-purple-dark">
          <span className="h-4 w-1 rounded-full bg-brand-purple" />
          Categories
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat._id}>
              <button
                type="button"
                onClick={() => onCategoryChange(cat.slug)}
                className={`flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-[14px] font-medium transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-brand-purple-light text-brand-purple-dark"
                    : "text-brand-grey hover:bg-brand-purple-light hover:text-brand-purple-dark"
                }`}
              >
                <span>{cat.name}</span>
                <span className="rounded-full bg-brand-purple-light px-2.5 py-0.5 text-xs font-semibold text-brand-purple">
                  {cat.postCount ?? 0}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {activeCategory !== "all" && (
          <button
            type="button"
            onClick={() => onCategoryChange("all")}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple hover:text-brand-purple-dark"
          >
            View All Categories
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-brand-purple-dark">
          <span className="h-4 w-1 rounded-full bg-brand-purple" />
          Sort By
        </h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-xl border border-brand-purple/15 bg-white px-4 py-3 text-[14px] font-medium text-brand-purple-dark focus:outline-none focus:ring-2 focus:ring-brand-purple/30"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Stay Updated */}
      <div className="rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-sm">
        <h3 className="mb-2 flex items-center gap-2 text-[15px] font-bold text-brand-purple-dark">
          <span className="h-4 w-1 rounded-full bg-brand-purple" />
          Stay Updated
        </h3>
        <p className="mb-4 text-[13px] leading-relaxed text-brand-grey">
          Subscribe to our newsletter and get the latest insights and
          updates delivered to your inbox.
        </p>
        <div className="relative mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full rounded-xl border border-brand-purple/15 bg-white px-4 py-3 pr-10 text-[14px] text-brand-purple-dark placeholder:text-brand-grey/70 focus:outline-none focus:ring-2 focus:ring-brand-purple/30"
          />
          <Mail
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-grey/60"
          />
        </div>
        <button
          type="button"
          className="w-full rounded-xl bg-brand-purple-dark px-5 py-3 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-purple"
        >
          Subscribe Now
        </button>
        <p className="mt-3 flex items-center gap-1.5 text-[11px] leading-relaxed text-brand-grey/70">
          <Lock size={12} className="shrink-0" />
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </aside>
  );
}