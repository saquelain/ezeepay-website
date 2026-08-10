"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BENEFITS: { number: string; image: string; title: string; desc: string; iconScale?: number }[] = [
    { number: "01", image: "/images/why-join/onboarding.png", title: "Instant & Easy Onboarding", desc: "Paperless onboarding in minutes.", iconScale: 1.35 },
    { number: "02", image: "/images/why-join/zero-charges.png", title: "Zero Additional Joining Charges", desc: "Join free — no hidden fees.", iconScale: 1.35 },
    { number: "03", image: "/images/why-join/success-rate.png", title: "Industry-Best Success Rate", desc: "Reliable, top-notch transaction success.", iconScale: 1.35 },
    { number: "04", image: "/images/why-join/secure-app.png", title: "Simple, Secure & User-Friendly App", desc: "Easy to use, 100% secure.", iconScale: 1.35 },
    { number: "05", image: "/images/why-join/multi-language.png", title: "Multi-Language Support", desc: "Work in your preferred language.", iconScale: 1.35 },
    { number: "06", image: "/images/why-join/relationship-manager.png", title: "Dedicated Relationship Manager", desc: "Personal support, always on call.", iconScale: 1.35 },
    { number: "07", image: "/images/why-join/distributor-support.png", title: "Strong Distributor Support", desc: "Marketing, training & guidance included.", iconScale: 1.35 },
    { number: "08", image: "/images/why-join/quick-support.png", title: "One-Tap Calling & Quick Support", desc: "Instant help, one tap away." },
    { number: "09", image: "/images/why-join/kyc.png", title: "Instant Digital & Physical KYC", desc: "KYC done in minutes, either way." },
    { number: "10", image: "/images/why-join/settlements.png", title: "Fast Settlements", desc: "Quick, transparent settlements." },
    { number: "11", image: "/images/why-join/income.png", title: "Multiple Income Opportunities", desc: "High commissions across services." },
    { number: "12", image: "/images/why-join/trusted-platform.png", title: "Trusted & Secure Fintech Platform", desc: "Built on trust & security." },
  ];

const FEATURED_BENEFIT = {
    number: "13",
    image: "/images/why-join/training-growth.png",
    imageRight: "/images/why-join/training-growth-rocket.png",
    title: "Regular Training & Business Growth Support",
    desc: "Regular training, updates & growth strategies.",
  };

export default function WhyJoinEzeepay() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".wje-header > *", {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });

        gsap.utils.toArray<HTMLElement>(".wje-card").forEach((card, i) => {
          gsap.from(card, {
            y: 28,
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
            delay: (i % 4) * 0.06,
            scrollTrigger: { trigger: card, start: "top 92%" },
          });
        });

        gsap.from(".wje-banner", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".wje-banner", start: "top 92%" },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#F3EEFA] px-4 py-24 sm:px-6 lg:px-10"
    >
      {/* Dotted grid — top-left, pure CSS */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-64 w-64 opacity-40
                   [background-image:radial-gradient(circle,#5B2D8E_1.5px,transparent_1.5px)]
                   [background-size:20px_20px]
                   [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="wje-header mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple shadow-sm">
            Why Ezeepay
          </span>
          <h2 className="mt-5 text-4xl font-bold leading-tight text-brand-purple-dark md:text-5xl">
            Why Join{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-purple bg-clip-text text-transparent">
                Ezeepay?
            </span>
            </h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-brand-grey">
            Empowering Bharat with technology, support & unlimited opportunities.
          </p>
        </div>

        {/* Grid — 12 cards, compact, up to 6 columns on larger screens */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {BENEFITS.map((b) => (
            <div
                key={b.number}
                className="wje-card relative rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
                <span className="absolute left-3 top-3 rounded-md bg-brand-purple-light px-2 py-0.5 text-[10px] font-bold text-brand-purple">
                {b.number}
                </span>

                <div className="mt-6 flex flex-col items-start gap-2.5">
                    <div className="relative h-11 w-11 flex-shrink-0 overflow-visible">
                        <div
                        className="relative h-full w-full"
                        style={{ transform: `scale(${b.iconScale || 1})` }}
                        >
                        <Image src={b.image} alt="" fill className="object-contain" />
                        </div>
                    </div>
                <div className="min-w-0">
                <h3 className="text-sm font-bold leading-snug text-[#1D1233]">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-[12px] leading-snug text-brand-grey">
                    {b.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Card 13 — half-width, two icons (left mark + right decorative illustration) */}
          <div className="wje-card relative col-span-full mx-auto w-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-2/3 lg:w-1/2">
            <span className="absolute left-4 top-4 rounded-md bg-brand-purple-light px-2 py-0.5 text-[10px] font-bold text-brand-purple">
                {FEATURED_BENEFIT.number}
            </span>

            <div className="mt-1 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 flex-shrink-0">
                <Image
                    src={FEATURED_BENEFIT.image}
                    alt=""
                    fill
                    className="object-contain"
                />
                </div>
                <div>
                    <h3 className="text-base font-bold leading-snug text-brand-purple-dark">
                    {FEATURED_BENEFIT.title}
                    </h3>
                    <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-brand-grey">
                    {FEATURED_BENEFIT.desc}
                    </p>
                </div>
                </div>

                <div className="relative hidden h-24 w-24 flex-shrink-0 sm:block">
                    <Image
                        src={FEATURED_BENEFIT.imageRight}
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
            </div>
        </div>

        {/* Bottom banner */}
        <div className="wje-banner mx-auto mt-8 flex w-fit max-w-full flex-col items-center gap-2 rounded-full bg-brand-purple px-6 py-4 text-center shadow-lg shadow-brand-purple/25 sm:flex-row sm:gap-3 sm:text-left">
          <ShieldCheck size={20} className="flex-shrink-0 text-white" />
          <p className="text-sm text-white/90 sm:text-base">
            <span className="font-bold text-white">
              Ezeepay is more than a platform, it&apos;s your growth partner.
            </span>{" "}
            Join thousands of successful partners across India.
          </p>
        </div>
      </div>
    </section>
  );
}