"use client";

import Image from "next/image";
import { useState } from "react";

const PILLARS = [
    {
      id: "01",
      label: "EzeeBanking",
      headline: "Apni Dukaan Ko Banao Full Banking Point",
      body: "Cash Withdrawal, Cash Deposit, Money Transfer, Aadhaar Pay, Micro ATM, Mini Statement, and Balance Enquiry — earn commission on every transaction.",
      image: "/images/pillars/ezeebanking.png",
      bg: "bg-black",
    },
    {
      id: "02",
      label: "EzeePayments",
      headline: "One Wallet, Every Utility",
      body: "Recharge mobile, DTH, and OTT. Collect electricity, water, and gas bills — all through BBPS-secure rails.",
      image: "/images/pillars/ezeepayments.png",
      bg: "bg-black",
    },
    {
      id: "03",
      label: "EzeeGrowth",
      headline: "60+ Services, Endless Earning",
      body: "Travel booking, insurance, e-governance services, prepaid cards, and loans — services that keep customers coming back.",
      image: "/images/pillars/ezeegrowth.png",
      bg: "bg-black",
    },
  ];

export default function ProductPillars() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-[100rem] px-2">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-orange">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-brand-orange" />
              Our Products
            </div>
            <h2 className="max-w-2xl text-4xl font-bold leading-tight text-brand-purple-dark md:text-5xl">
              Ek App. Saari Services.{" "}
              <span className="text-brand-purple">
                Apni Dukaan Ko Banao Mini Bank.
              </span>
            </h2>
          </div>
        </div>

        {/* Expandable cards */}
        <div className="flex h-[680px] gap-4 overflow-hidden rounded-[2.5rem]">
          {PILLARS.map((pillar, i) => {
            const isActive = active === i;
            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActive(i)}
                className={`relative cursor-pointer overflow-hidden rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "flex-[3] bg-black" : "flex-[1] bg-[#F4F2F8]"
                }`}
              >
                {/* Label — always visible top-left */}
<div
  className={`absolute left-6 top-6 z-20 text-sm font-medium transition-colors duration-300 ${
    isActive ? "text-white/80" : "text-brand-purple-dark/70"
  }`}
>
  {pillar.label}
</div>

{/* Number — always visible top-right */}
<div
  className={`absolute right-6 top-6 z-20 text-2xl font-bold transition-colors duration-300 ${
    isActive ? "text-white/30" : "text-brand-purple-dark/20"
  }`}
>
  .{pillar.id}
</div>

{/* Headline — always visible, positioned at bottom */}
<div className="absolute bottom-8 left-6 right-6 z-20">
  <h3
    className={`text-xl font-bold leading-snug transition-colors duration-300 md:text-2xl lg:text-3xl ${
      isActive ? "text-white" : "text-brand-purple-dark"
    }`}
  >
    {pillar.headline}
  </h3>

  <p
    className={`mt-2 max-w-md text-sm transition-opacity duration-300 md:text-base ${
      isActive ? "text-white/80 opacity-100 delay-300" : "pointer-events-none h-0 opacity-0"
    }`}
  >
    {pillar.body}
  </p>
</div>

{/* Phone image — only when active */}
<div
  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
    isActive ? "opacity-100 delay-200" : "opacity-0"
  }`}
>
  <div className="relative h-[520px] w-full max-w-[420px]">
    <Image
      src={pillar.image}
      alt={pillar.label}
      fill
      className="object-contain drop-shadow-2xl"
    />
  </div>
</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}