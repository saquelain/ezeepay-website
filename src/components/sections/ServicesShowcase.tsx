"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LayoutGrid } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SERVICES: {
  icon?: LucideIcon;      // fallback Lucide icon (only for items with no custom SVG yet)
  iconSrc?: string;       // custom SVG path — takes priority over `icon` when present
  title: string;
  desc: string;
  href: string;
}[] = [
  {
    iconSrc: "/icons/services/aeps.svg",
    title: "AEPS",
    desc: "Aadhaar-based cash withdrawal & balance enquiry.",
    href: "/services/banking",
  },
  {
    iconSrc: "/icons/services/money-transfer.svg",
    title: "Money Transfer (DMT)",
    desc: "Instant domestic transfers to any bank account.",
    href: "/services/banking",
  },
  {
    iconSrc: "/icons/services/bbps-bills.svg",
    title: "BBPS Bill Payments",
    desc: "Electricity, water, gas & more on Bharat BillPay.",
    href: "/services/utility",
  },
  {
    iconSrc: "/icons/services/recharge.svg",
    title: "Mobile & DTH Recharge",
    desc: "All operators, full commission on every recharge.",
    href: "/services/utility",
  },
  {
    iconSrc: "/icons/services/micro-atm.svg",
    title: "Micro ATM",
    desc: "Card-based withdrawals right at your counter.",
    href: "/services/banking",
  },
  {
    iconSrc: "icons/services/aadhaar-pay.svg",
    title: "Aadhaar Pay",
    desc: "Accept payments with just Aadhaar & fingerprint.",
    href: "/services/banking",
  },
  {
    iconSrc: "/icons/services/account-opening.svg",
    title: "Account Opening",
    desc: "Open digital bank accounts for your customers.",
    href: "/services/account-opening",
  },
  {
    iconSrc: "/icons/services/insurance.svg",
    title: "Insurance",
    desc: "Health, motor, shop & device policies in minutes.",
    href: "/services/insurance",
  },
  {
    iconSrc: "/icons/services/loans.svg",
    title: "Loans",
    desc: "Easy credit options through trusted partners.",
    href: "/services/account-opening",
  },
  {
    iconSrc: "/icons/services/pan-card.svg",
    title: "PAN Card",
    desc: "New PAN applications & corrections, done fast.",
    href: "/services/e-governance",
  },
  {
    iconSrc: "/icons/services/travel.svg",
    title: "Travel Booking",
    desc: "IRCTC, flights, buses & hotels — one window.",
    href: "/services/travel",
  },
  {
    iconSrc: "/icons/services/upi.svg",
    title: "UPI Payments",
    desc: "Collect payments instantly with UPI & QR.",
    href: "/services/account-opening",
  },
];

export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Respect reduced-motion preference — skip straight to visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    // If the section is already on screen at mount (page loaded mid-scroll,
    // or scroll position restored on refresh), show it immediately instead
    // of waiting on an observer crossing that may never fire.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-6 py-20">
      {/* Soft ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-[500px] max-w-5xl rounded-full bg-gray-100 blur-[130px] opacity-50"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full border border-border-subtle bg-gray-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple transition-all duration-700 ease-out ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <LayoutGrid size={13} />
            60+ Services
          </span>
          <h2
            className={`mt-5 text-4xl font-bold leading-tight text-brand-purple-dark transition-all delay-[80ms] duration-700 ease-out md:text-5xl ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            One App for{" "}
            <span className="text-brand-purple">Multiple Services</span>
          </h2>
          <p
            className={`mx-auto mt-4 text-lg leading-relaxed text-brand-grey transition-all delay-[160ms] duration-700 ease-out ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Banking, payments, insurance, and more — sab kuch ek app mein, full
            commission ke saath.
          </p>
        </div>

        {/* ── Services grid ── */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map(({ icon: Icon, iconSrc, title, desc, href }, i) => (
            <Link
              key={title}
              href={href}
              style={{ transitionDelay: inView ? `${220 + (i % 4) * 70}ms` : "0ms" }}
              className={`group relative overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-black/5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-purple/10 hover:ring-brand-purple/20 ${
                inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-[0.97] opacity-0"
              }`}
            >
              {/* Top accent line grows on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-purple to-brand-orange transition-transform duration-300 group-hover:scale-x-100"
              />

              <div className="flex items-start justify-between">
                {/* Icon tile — flips to solid purple on hover */}
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple transition-all duration-300 group-hover:bg-brand-purple group-hover:text-white">
                  {iconSrc ? (
                    <Image src={iconSrc} alt="" width={34} height={34} className="h-[34px] w-[34px] object-contain" />
                  ) : Icon ? (
                    <Icon size={26} />
                  ) : null}
                </span>
                <ArrowRight
                  size={18}
                  className="mt-1 -translate-x-1 text-brand-purple opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </div>

              <h3 className="mt-4 font-bold text-brand-purple-dark">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-grey">{desc}</p>
            </Link>
          ))}
        </div>

        {/* ── Explore all ── */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 rounded-full bg-brand-purple px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand-purple/25 transition-all duration-300 hover:bg-brand-purple-dark hover:shadow-brand-purple/35"
          >
            Explore all 60+ services
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}