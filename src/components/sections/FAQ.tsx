"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";

const COMMUNITY = [
    "/images/community/agent-1.png",
    "/images/community/agent-2.png",
    "/images/community/agent-3.png",
  ];

const FAQS = [
  {
    q: "How do I create an Ezeepay ID?",
    a: "Download the Ezeepay app, enter your mobile number, and complete Aadhaar-based KYC verification. Your ID is activated within minutes — no paperwork, no office visits.",
  },
  {
    q: "What is the customer support number?",
    a: "Our 12x7 Help Desk is available at +91 9205621622, or you can email us at info@ezeepay.app. Real people, real support — in your language, every day.",
  },
  {
    q: "What services can I offer as an agent?",
    a: "Cash withdrawal, money transfer, AEPS, mobile and DTH recharge, bill payments, travel booking, insurance, PAN card services, and 60+ more — all from a single app.",
  },
  {
    q: "How much can I earn as an agent?",
    a: "Agents typically earn ₹25,000+ per month, with commission on every single transaction. Distributors and District Franchises can earn significantly more as their network grows.",
  },
  {
    q: "Is any working capital required?",
    a: "No. Ezeepay is built on a zero working capital model — you start earning from day one with only a small one-time investment on a fully secure platform.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
        {/* Left column */}
        <div>
          <h2 className="text-4xl font-semibold leading-tight text-brand-purple-dark md:text-5xl">
            Frequently
            <br />
            asked questions
          </h2>
          <p className="mt-4 text-lg text-brand-grey">
            Find quick answers to common questions about Ezeepay, earnings,
            and security.
          </p>

          <div className="mt-10 rounded-3xl bg-[#F7F5FB] p-8">
          <div className="flex items-center">
            <div className="flex -space-x-3">
                {COMMUNITY.map((src, i) => (
                <div
                    key={src}
                    className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#F7F5FB]"
                >
                    <Image src={src} alt="" fill className="object-cover" />
                </div>
                ))}
            </div>
            <span className="mx-2 text-brand-grey">+</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-white">
                You
            </div>
          </div>

            <h3 className="mt-6 text-xl font-bold text-brand-purple-dark">
              Still have questions?
            </h3>
            <p className="mt-1 text-brand-grey">
              Reach out, and our team will guide you.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-purple-dark px-6 py-3.5 text-[15px] font-medium leading-none text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              Talk to our team
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-brand-purple-dark">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>

        {/* Right column — accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`rounded-2xl border px-6 py-5 transition-colors duration-300 ${
                  isOpen
                    ? "border-transparent bg-[#F7F5FB]"
                    : "border-black/10 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-lg font-medium text-brand-purple-dark">
                    {item.q}
                  </span>
                  <span
                    className={`ml-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      isOpen
                        ? "bg-brand-purple-dark text-white"
                        : "bg-[#F7F5FB] text-brand-purple-dark"
                    }`}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-brand-grey leading-relaxed">{item.a}</p>
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