"use client";

import { useEffect, useRef, useState } from "react";
import {
  Fingerprint,
  Network,
  Zap,
  Layers,
  ShieldCheck,
  Headset,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const REASONS: {
  icon: LucideIcon;
  title: string;
  desc: string;
  variant: "big" | "small" | "wide";
}[] = [
  {
    icon: Fingerprint,
    title: "Biometric & Secure",
    desc: "Every withdrawal is Aadhaar and fingerprint verified — no cards, no PINs to remember, no fraud risk.",
    variant: "big",
  },
  {
    icon: Network,
    title: "Extensive Network",
    desc: "Backed by authorized Business Correspondents and partner banks across India.",
    variant: "small",
  },
  {
    icon: Zap,
    title: "Fast Cash Withdrawal",
    desc: "Customers walk in and walk out with cash in seconds — no queues, no waiting.",
    variant: "small",
  },
  {
    icon: Layers,
    title: "Low-Cost Device",
    desc: "A compact, affordable Micro ATM device is all it takes to get started.",
    variant: "small",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Reliability",
    desc: "Every transaction is processed through secure, RBI-compliant banking infrastructure.",
    variant: "small",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    desc: "Prompt, dedicated customer support for both retailers and their customers.",
    variant: "wide",
  },
];

export default function MicroAtmWhyChoose() {
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
    <section ref={sectionRef} className="relative bg-white px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-flex items-center rounded-full border border-brand-purple/15 bg-white px-5 py-2 text-sm font-medium text-brand-purple shadow-sm transition-all duration-700 ease-out ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Why Ezeepay
          </span>
          <h2
            className={`mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-purple-dark transition-all delay-[80ms] duration-700 ease-out md:text-5xl ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Built for{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-purple bg-clip-text text-transparent">
              Retailers Customers Trust
            </span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, desc, variant }, i) => {
            const isAccent = variant === "big" || variant === "wide";
            const isWide = variant === "wide";

            return (
              <div
                key={title}
                style={{ transitionDelay: inView ? `${180 + i * 90}ms` : "0ms" }}
                className={`group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-brand-purple/10 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg ${
                  variant === "big" ? "md:col-span-2 p-8" : ""
                } ${variant === "small" ? "p-8" : ""} ${
                  isWide ? "md:col-span-3 p-8 md:flex md:items-center md:gap-8" : ""
                } ${
                  isAccent
                    ? "bg-gradient-to-br from-brand-purple-dark to-brand-purple text-white"
                    : "bg-[#F7F5FB] text-brand-purple-dark"
                } ${
                  inView
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-8 scale-[0.97] opacity-0"
                }`}
              >
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                    isAccent
                      ? "bg-white/15 text-white"
                      : "bg-white text-brand-purple group-hover:bg-brand-purple group-hover:text-white"
                  }`}
                >
                  <Icon size={26} />
                </span>
                <div className={isWide ? "mt-4 md:mt-0" : "mt-5"}>
                  <h3
                    className={`text-xl font-bold ${
                      isAccent ? "text-white" : "text-brand-purple-dark"
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`mt-2 max-w-md text-sm leading-relaxed ${
                      isAccent ? "text-white/80" : "text-brand-grey"
                    }`}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}