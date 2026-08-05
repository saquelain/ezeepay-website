"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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

export default function ContactFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Centered heading */}
        <h2 className="text-center text-4xl font-semibold leading-tight text-brand-purple-dark md:text-5xl">
          Frequently asked questions
        </h2>

        {/* Accordion */}
        <div className="mt-14 flex flex-col gap-3">
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
                    isOpen
                      ? "mt-3 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl leading-relaxed text-brand-grey">
                      {item.a}
                    </p>
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