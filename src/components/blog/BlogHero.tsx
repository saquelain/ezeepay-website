"use client";

import Image from "next/image";
import { Search, Smartphone, ShieldCheck } from "lucide-react";

export default function BlogHero({
    searchQuery,
    onSearchChange,
  }: {
    searchQuery: string;
    onSearchChange: (value: string) => void;
  }) {
  return (
    <section className="relative w-full overflow-hidden border-b border-brand-purple/15 bg-gradient-to-b from-[#EDE7F8] via-[#F3EEFA] to-white">
      <div className="relative z-10 mx-auto grid w-full max-w-[96rem] grid-cols-1 items-end gap-12 px-6 pb-0 pt-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8 lg:px-12 lg:pt-32">
        {/* Left — copy + search */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-purple">
            Resources
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-purple-dark md:text-5xl xl:text-6xl">
            Ezeepay Blog & Insights
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-grey">
            Your go-to resource for everything about payments, AePS, money
            transfer, digital Bharat, business growth and the latest updates
            from Ezeepay.
          </p>

          <div className="relative mt-8 mb-10 max-w-lg">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search blogs, topics, or keywords..."
                className="w-full rounded-xl border border-brand-purple/15 bg-white px-5 py-4 pr-14 text-[15px] text-brand-purple-dark placeholder:text-brand-grey shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30"
            />
            <button
                type="button"
                aria-label="Search"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-brand-purple-dark text-white transition-colors hover:bg-brand-purple"
            >
                <Search size={18} />
            </button>
            </div>
        </div>

        {/* Right — phone mockup (image includes badges + skyline already) */}
<div className="relative mx-auto w-full max-w-4xl lg:max-w-none">
  <div className="relative aspect-[1988/793] w-full">
    <Image
      src="/images/blog/hero-phone.png"
      alt="Ezeepay app — wallet balance, AEPS, UPI, money transfer and more"
      fill
      priority
      sizes="(min-width: 1024px) 60vw, 95vw"
      className="object-contain"
    />
  </div>
</div>
      </div>
    </section>
  );
}