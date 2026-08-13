"use client";

import { useEffect, useRef, useState } from "react";
import {
  Smartphone,
  Zap,
  ShieldCheck,
  Wallet,
  LayoutGrid,
  ThumbsUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ADVANTAGES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Smartphone,
    title: "Low-Cost Setup",
    desc: "A compact Micro ATM device is all it takes — no heavy investment, no complex installation.",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    desc: "Cash withdrawals complete in seconds, right at the counter — no queues, no separate bank visit.",
  },
  {
    icon: ShieldCheck,
    title: "Biometric Security",
    desc: "Aadhaar and fingerprint verification on every transaction, with bank-grade encryption throughout.",
  },
  {
    icon: Wallet,
    title: "Reliable Earnings",
    desc: "Earn commission on every withdrawal, with transparent payouts and no hidden charges.",
  },
  {
    icon: LayoutGrid,
    title: "More Foot Traffic",
    desc: "Bring more customers into your shop — many stay to shop once they've withdrawn cash.",
  },
  {
    icon: ThumbsUp,
    title: "Reaches Every Customer",
    desc: "No card, no smartphone, no internet banking needed — works for customers banks often miss.",
  },
];

export default function MicroAtmAdvantages() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;

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
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F5FB] px-6 py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-flex items-center rounded-full border border-brand-purple/15 bg-white px-5 py-2 text-sm font-medium text-brand-purple shadow-sm transition-all duration-700 ease-out ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Why It Works
          </span>
          <h2
            className={`mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-purple-dark transition-all delay-[80ms] duration-700 ease-out md:text-5xl ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Advantages of a{" "}
            <span className="text-brand-orange">Micro ATM Business</span>
          </h2>
          <p
            className={`mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brand-grey transition-all delay-[160ms] duration-700 ease-out ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Everything that makes Ezeepay's Micro ATM service a dependable
            earning stream for your shop.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              style={{
                transitionDelay: inView ? `${220 + (i % 3) * 90}ms` : "0ms",
              }}
              className={`group relative overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-black/5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-purple/10 hover:ring-brand-purple/20 ${
                inView
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-8 scale-[0.97] opacity-0"
              }`}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-purple to-brand-orange transition-transform duration-300 group-hover:scale-x-100"
              />
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple transition-all duration-300 group-hover:bg-brand-purple group-hover:text-white">
                <Icon size={26} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-brand-purple-dark">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-grey">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}