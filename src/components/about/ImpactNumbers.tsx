"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Store, Users, MapPin, ArrowLeftRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const IMPACT_CARDS: {
  icon: LucideIcon;
  label: [string, string];
  value: string;
  desc: string;
}[] = [
  {
    icon: Store,
    label: ["No of", "retailers"],
    value: "5 Lakhs+",
    desc: "Retail partners serving their communities on Ezeepay across India.",
  },
  {
    icon: Users,
    label: ["Customers", "served"],
    value: "5 Cr+",
    desc: "People who've accessed banking and payments through our network.",
  },
  {
    icon: MapPin,
    label: ["PIN codes", "served"],
    value: "10,000+",
    desc: "From metro lanes to remote villages — we're already there.",
  },
  {
    icon: ArrowLeftRight,
    label: ["Avg. transactions", "per day"],
    value: "2 Lakhs",
    desc: "Financial transactions processed every single day, on average.",
  },
];

function ImpactCard({
  icon: Icon,
  label,
  value,
  desc,
  className = "",
}: (typeof IMPACT_CARDS)[number] & { className?: string }) {
  return (
    <div
      className={`impact-card flex min-h-[280px] flex-col rounded-3xl bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1.5 ${className}`}
    >
      {/* Label + icon */}
      <div className="flex items-start justify-between gap-4">
        <p className="text-lg font-medium leading-snug text-[#1D1D1D]">
          {label[0]}
          <br />
          {label[1]}
        </p>
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-purple-dark text-white">
          <Icon size={19} />
        </span>
      </div>

      {/* Number sits low, like a footing */}
      <p className="mt-auto text-5xl font-bold tracking-tight text-[#1D1D1D]">
        {value}
      </p>
      <p className="mt-3 leading-relaxed text-brand-grey">{desc}</p>
    </div>
  );
}

export default function ImpactNumbers() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".impact-header", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });

        gsap.from(".impact-card", {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-24">
      {/* ── Background image with soft white fades top & bottom ── */}
      {/* Drop your image at /public/images/impact/meadow.png (or update the src) */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/impact/meadow.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Legibility washes */}
        <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-white via-white/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* ── Row 1: header text (2 cols) + first card right beside it ── */}
          <div className="impact-header flex flex-col items-start justify-center md:col-span-1 lg:col-span-2 lg:pr-20">
            <h2 className="text-4xl font-bold leading-tight text-[#1D1D1D] md:text-5xl">
              Our impact in numbers
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-grey">
              Our platform is designed to help investors make smarter financial
              decisions. These numbers reflect the growing community and the
              insights powering their investment strategies.
            </p>

            <a
              href="#services"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-brand-purple px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-purple/30 transition-all duration-300 hover:bg-brand-purple-dark hover:shadow-brand-purple/40"
            >
              Explore services
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={15} />
              </span>
            </a>
          </div>

          <ImpactCard {...IMPACT_CARDS[0]} />

          {/* ── Row 2: three cards, flush with the title's left edge ── */}
          <ImpactCard {...IMPACT_CARDS[1]} />
          <ImpactCard {...IMPACT_CARDS[2]} />
          <ImpactCard {...IMPACT_CARDS[3]} />
        </div>
      </div>
    </section>
  );
}