"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const ROLES = [
  {
    id: "agent",
    tabTop: "Start Earning Today",
    tabBold: "Agent",
    headline: "Turn Your Shop Into A Mini Bank",
    body: "Kirana, medical, apparel, mobile recharge, hardware, restaurant, tailoring, insurance, or travel — any shop can offer 60+ services. No working capital needed.",
    earnings: "Earn ₹25,000+ per month. Join 5,00,000+ retailers.",
    image: "/images/roles/agent.png",
    ctas: [
      { label: "Apply Online", href: "/apply", primary: true },
      { label: "Download App", href: "/download", primary: false },
    ],
  },
  {
    id: "distributor",
    tabTop: "Build Your Network",
    tabBold: "Distributor",
    headline: "Build A Network That Earns For You",
    body: "Earn 25% commission on your network's investment — no store, no staff, no physical effort. Be among 10,000 distributors across India.",
    earnings: "Earn ₹50,000+ per month.",
    image: "/images/roles/distributor.png",
    ctas: [{ label: "Apply Online", href: "/apply", primary: true }],
  },
  {
    id: "master-distributor",
    tabTop: "Scale Your Chain",
    tabBold: "Master Distributor",
    headline: "Lead A Chain, Multiply Your Income",
    body: "Set up a chain of distributors and agents. Sell digital products, earn 25% commission on overall investment. For Griha Udyog members, Self Help Groups, and Teachers.",
    earnings: "Earn ₹1,50,000+ per month.",
    image: "/images/roles/master-distributor.png",
    ctas: [{ label: "Apply Online", href: "/apply", primary: true }],
  },
  {
    id: "district-franchise",
    tabTop: "Lead Your District",
    tabBold: "District Franchise",
    headline: "Own Your District's Digital Future",
    body: "Run the Ezeepay franchise for your district — fully digital, no godown, no staff. Use your network to earn 25% commission on total investment.",
    earnings: "Earn ₹2,00,000+ per month.",
    image: "/images/roles/district-franchise.png",
    ctas: [{ label: "Apply Online", href: "/apply", primary: true }],
  },
];

export default function RoleSelector() {
  const [active, setActive] = useState(0);
  const role = ROLES[active];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % ROLES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <section className="mx-4 rounded-[2.5rem] bg-[#F7F5FB] px-6 py-24 md:mx-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold leading-tight text-brand-purple-dark md:text-5xl">
            Built For Everyone Ready To{" "}
            <span className="text-brand-purple">Earn, Grow & Lead</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-brand-grey">
            Whether you run a kirana shop or manage a district-wide network —
            there&apos;s an Ezeepay role that fits your ambition.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {ROLES.map((r, i) => {
            const isActive = active === i;
            return (
            <button
                key={r.id}
                onClick={() => setActive(i)}
                className={`rounded-2xl px-6 py-3.5 text-center shadow-sm transition-all duration-300 ${
                isActive
                    ? "bg-brand-purple shadow-md shadow-brand-purple/20"
                    : "bg-[#F7F5FB] hover:bg-[#F0ECF8]"
                }`}
            >
                <div
                className={`text-xs font-medium ${
                    isActive ? "text-white/70" : "text-brand-grey"
                }`}
                >
                {r.tabTop}
                </div>
                <div
                className={`mt-1 text-base font-bold ${
                    isActive ? "text-white" : "text-brand-purple-dark"
                }`}
                >
                {r.tabBold}
                </div>
            </button>
            );
        })}
        </div>

        {/* Active panel */}
        <div className="mt-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — copy */}
          <div>
            <h3 className="text-3xl font-semibold leading-tight text-brand-purple-dark md:text-4xl">
              {role.headline}
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-brand-grey">
              {role.body}
            </p>
            <p className="mt-4 text-lg font-bold text-brand-purple-dark">
              {role.earnings}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {role.ctas.map((cta) =>
                cta.primary ? (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-purple px-7 py-4 text-[16px] font-medium leading-none text-white shadow-lg shadow-brand-purple/30 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
                  >
                    {cta.label}
                    <ArrowRight size={18} />
                  </Link>
                ) : (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 text-[16px] font-medium leading-none text-brand-purple-dark"
                  >
                    {cta.label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Right — illustration */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] bg-[#F7F5FB] shadow-sm">
            <Image
                key={role.id}
                src={role.image}
                alt={role.tabBold}
                fill
                className="object-contain p-10"
            />
            </div>
        </div>
      </div>
    </section>
  );
}