"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BENEFITS: { number: string; image: string; title: string; desc: string; iconScale?: number }[] = [
    { number: "01", image: "/images/why-join/onboarding.png", title: "Instant & Easy Onboarding", desc: "Get started in minutes with a smooth and paperless onboarding process.", iconScale: 1.35 },
    { number: "02", image: "/images/why-join/zero-charges.png", title: "Zero Additional Joining Charges", desc: "Join Ezeepay absolutely free. No hidden fees, no extra charges.", iconScale: 1.35 },
    { number: "03", image: "/images/why-join/success-rate.png", title: "Industry-Best Success Rate", desc: "Experience top-notch transaction success rate you can rely on.", iconScale: 1.35 },
    { number: "04", image: "/images/why-join/secure-app.png", title: "Simple, Secure & User-Friendly App", desc: "A powerful app that is easy to use, packed with features and 100% secure.", iconScale: 1.35 },
    { number: "05", image: "/images/why-join/multi-language.png", title: "Multi-Language Support", desc: "Work in your preferred language with multi-language app support.", iconScale: 1.35 },
    { number: "06", image: "/images/why-join/relationship-manager.png", title: "Dedicated Relationship Manager", desc: "Get personal support from your dedicated relationship manager.", iconScale: 1.35 },
    { number: "07", image: "/images/why-join/distributor-support.png", title: "Strong Distributor Support", desc: "We stand by you with marketing support, training & guidance.", iconScale: 1.35 },
    { number: "08", image: "/images/why-join/quick-support.png", title: "One-Tap Calling & Quick Support", desc: "Connect with support instantly with one-tap calling & quick resolutions." },
    { number: "09", image: "/images/why-join/kyc.png", title: "Instant Digital & Physical KYC", desc: "Complete KYC digitally or physically in minutes and start transacting." },
    { number: "10", image: "/images/why-join/settlements.png", title: "Fast Settlements", desc: "Enjoy quick settlements and real-time financial transparency." },
    { number: "11", image: "/images/why-join/income.png", title: "Multiple Income Opportunities", desc: "Earn more with multiple services, high commissions & offers." },
    { number: "12", image: "/images/why-join/trusted-platform.png", title: "Trusted & Secure Fintech Platform", desc: "Built on trust with advanced security and data protection." },
  ];

const FEATURED_BENEFIT = {
    number: "13",
    image: "/images/why-join/training-growth.png",
    imageRight: "/images/why-join/training-growth-rocket.png",
    title: "Regular Training & Business Growth Support",
    desc: "Get access to regular training, product updates and business growth strategies.",
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
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#F3EEFA] px-6 py-24"
    >
      {/* Dotted grid — top-left, pure CSS */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-64 w-64 opacity-40
                   [background-image:radial-gradient(circle,#5B2D8E_1.5px,transparent_1.5px)]
                   [background-size:20px_20px]
                   [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
      />

      {/* Wavy swoosh decoration — bottom, sourced image */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 opacity-90 md:h-96"
      >
        <Image
          src="/images/why-join/swoosh-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div> */}

      <div className="relative mx-auto max-w-7xl">
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

        {/* Grid — 12 cards, 4 columns */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
            <div
                key={b.number}
                className="wje-card relative rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
                <span className="absolute left-4 top-4 rounded-lg bg-brand-purple-light px-2.5 py-1 text-xs font-bold text-brand-purple">
                {b.number}
                </span>

                <div className="mt-9 flex items-start gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-visible">
                        <div
                        className="relative h-full w-full"
                        style={{ transform: `scale(${b.iconScale || 1})` }}
                        >
                        <Image src={b.image} alt="" fill className="object-contain" />
                        </div>
                    </div>
                <div className="min-w-0">
                <h3 className="text-lg font-bold leading-snug text-[#1D1233]">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-brand-grey">
                    {b.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Card 13 — half-width, two icons (left mark + right decorative illustration) */}
          <div className="wje-card relative col-span-full mx-auto w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-1/2 lg:w-1/2">
            <span className="absolute left-5 top-5 rounded-lg bg-brand-purple-light px-2.5 py-1 text-xs font-bold text-brand-purple">
                {FEATURED_BENEFIT.number}
            </span>

            <div className="mt-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                <div className="relative h-28 w-28 flex-shrink-0">
                <Image
                    src={FEATURED_BENEFIT.image}
                    alt=""
                    fill
                    className="object-contain"
                />
                </div>
                <div>
                    <h3 className="text-lg font-bold leading-snug text-brand-purple-dark">
                    {FEATURED_BENEFIT.title}
                    </h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-brand-grey">
                    {FEATURED_BENEFIT.desc}
                    </p>
                </div>
                </div>

                <div className="relative hidden h-32 w-32 flex-shrink-0 sm:block">
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