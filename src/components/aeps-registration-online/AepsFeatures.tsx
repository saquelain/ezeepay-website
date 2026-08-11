"use client";

import { useEffect, useRef, useState } from "react";
import { Wallet, ShieldCheck, Fingerprint, Timer, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Wallet,
    title: "Real-Time Commission Settlement",
    description:
      "Enjoy real-time transaction settlement, so your commission lands the moment you complete a transaction.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure System",
    description:
      "Robust security measures protect sensitive data and keep every financial transaction safe.",
  },
  {
    icon: Fingerprint,
    title: "Convenient Aadhaar Authentication",
    description:
      "No debit or credit cards needed — just an Aadhaar number and a fingerprint for seamless, secure transactions.",
  },
  {
    icon: Timer,
    title: "Easy Money Withdrawal",
    description:
      "No long queues at banks or ATMs — customers withdraw cash right at your counter, hassle-free.",
  },
  {
    icon: Zap,
    title: "Quick Transactions",
    description:
      "Every transaction takes less than a minute, so you can serve more customers, faster.",
  },
];

export default function AepsFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const headerEl = sectionRef.current?.querySelector(".aeps-feat-header");
    const gridEl = sectionRef.current?.querySelector(".aeps-feat-grid");

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true);
          gridObserver.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    if (headerEl) headerObserver.observe(headerEl);
    if (gridEl) gridObserver.observe(gridEl);

    return () => {
      headerObserver.disconnect();
      gridObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        <div
          className={`aeps-feat-header mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple shadow-sm">
            Why It Works
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-purple-dark md:text-4xl">
            Top <span className="text-brand-purple">Features</span> Of The Service
          </h2>
        </div>

        <div className="aeps-feat-grid mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const wide = i === FEATURES.length - 1 && FEATURES.length % 3 === 2;
            return (
              <div
                key={f.title}
                style={{ transitionDelay: gridVisible ? `${i * 80}ms` : "0ms" }}
                className={`aeps-feat-card group relative overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-black/5 shadow-sm transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-xl ${
                  gridVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                } ${wide ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-orange to-brand-purple transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-bold text-brand-purple-dark">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-grey">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}