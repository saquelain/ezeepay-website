"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 100, suffix: "+", label: "District Franchises" },
  { value: 2490, suffix: "+", label: "Super Distributors" },
  { value: 8382, suffix: "+", label: "Distributors" },
  { value: 400000, suffix: "+", label: "Merchant Outlets" },
];

function formatIndian(n: number) {
  return n.toLocaleString("en-IN");
}

export default function StatsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = STATS[i];
        const counter = { val: 0 };

        gsap.to(counter, {
          val: stat.value,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = formatIndian(Math.floor(counter.val)) + stat.suffix;
          },
        });
      });

      gsap.from(".stat-row", {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
    ref={sectionRef}
    className="mx-4 rounded-[2.5rem] bg-brand-purple-light/40 px-6 py-24"
    >
      <div className="mx-auto max-w-[100rem]">
        {/* Header row */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-orange">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-brand-orange" />
              Know Us
            </div>
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-brand-purple-dark md:text-5xl">
              Real Numbers Behind{" "}
              <span className="text-brand-purple">Har Gaon Mein Ezeepay</span>
            </h2>
          </div>
          <p className="max-w-sm text-right text-brand-grey lg:text-lg">
            Built to bring banking, payments, and 60+ services to every
            corner of India — one agent, one shop at a time.
          </p>
        </div>

        {/* Body: image / stats / image */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr_1fr]">
          {/* Left image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/images/stats/agent-shop.png"
              alt="Ezeepay agent at his kirana shop"
              fill
              className="object-cover"
            />
          </div>

          {/* Stats column */}
          <div className="flex flex-col divide-y divide-brand-purple/10 overflow-hidden rounded-3xl bg-white shadow-sm">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-row flex items-center justify-between px-8 py-9"
              >
                <span
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                  className="text-4xl font-bold text-brand-purple-dark md:text-5xl"
                >
                  0
                </span>
                <span className="text-sm font-medium uppercase tracking-wide text-brand-grey">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Right image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/images/stats/agent-helping.png"
              alt="Ezeepay kiosk in a local market"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}