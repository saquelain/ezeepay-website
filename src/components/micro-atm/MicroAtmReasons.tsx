"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Landmark,
  MapPinned,
  ShieldCheck,
  LayoutGrid,
  Zap,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    icon: Landmark,
    title: "Financial Inclusion and Accessibility",
    description:
      "Micro ATMs bring basic financial services to rural and remote areas. Business correspondents use them to serve unbanked and underserved groups — enabling deposits, withdrawals, transfers, and access to government schemes without a trip to the bank.",
  },
  {
    icon: MapPinned,
    title: "Convenience and Mobility",
    description:
      "Lightweight and portable, Micro ATMs let BCs bring banking to villages, markets, and community centres — saving customers the time and effort of visiting distant bank branches, while covering multiple locations in a single day.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    description:
      "Biometric identification and PIN verification protect every transaction, with data transmitted over encrypted communication routes — giving customers confidence in the safety of every transaction.",
  },
  {
    icon: LayoutGrid,
    title: "Enhanced Banking Services",
    description:
      "Beyond cash withdrawals and deposits, Micro ATMs support account opening, loan applications, utility bill payments, and insurance purchases — one device for a wide range of financial needs.",
  },
  {
    icon: Zap,
    title: "Real-Time Transaction Updates",
    description:
      "Customers and BCs are notified instantly when a transaction completes, with full details of the amount debited or credited — supporting transparency and helping prevent fraud.",
  },
  {
    icon: TrendingUp,
    title: "Potential for Service Expansion",
    description:
      "As technology advances, Micro ATMs can extend further into loan applications, insurance premiums, and small investments — deepening financial inclusion for underserved communities.",
  },
  {
    icon: GraduationCap,
    title: "Digital Financial Literacy",
    description:
      "Using a Micro ATM builds comfort with digital interfaces, giving customers more confidence to adopt other digital financial tools like mobile banking and e-wallets.",
  },
];

export default function MicroAtmReasons() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".micro-atm-reason-reveal, .micro-atm-reason-node, .micro-atm-reasons-progress", {
          clearProps: "all",
        });
        return;
      }

      gsap.from(".micro-atm-reasons-header > *", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".micro-atm-reasons-header", start: "top 82%" },
      });

      gsap.set(".micro-atm-reasons-progress", { scaleY: 0 });
      gsap.to(".micro-atm-reasons-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".micro-atm-reasons-timeline",
          start: "top 68%",
          end: "bottom 60%",
          scrub: 0.4,
        },
      });

      gsap.utils.toArray<HTMLElement>(".micro-atm-reason").forEach((item) => {
        const content = item.querySelector(".micro-atm-reason-reveal");
        const node = item.querySelector(".micro-atm-reason-node");
        if (!content || !node) return;

        gsap.set(content, { autoAlpha: 0, y: 24 });
        gsap.set(node, { scale: 0, backgroundColor: "#ffffff" });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          })
          .to(node, {
            scale: 1,
            backgroundColor: "#F47B20",
            duration: 0.35,
            ease: "back.out(3)",
          })
          .to(content, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.15");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#FAFAFA] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-4xl px-6 lg:px-12">
        <div className="micro-atm-reasons-header mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
            Why It Matters
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-purple-dark md:text-4xl">
            Significant Reasons to Use{" "}
            <span className="text-brand-purple">Micro ATMs</span>
          </h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-brand-grey">
            Lightweight, user-friendly, and built to bring financial services
            closer to the public — here's how Micro ATMs are changing banking.
          </p>
        </div>

        <div className="micro-atm-reasons-timeline relative mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-0 bottom-0 w-px bg-black/10"
          />
          <div
            aria-hidden
            className="micro-atm-reasons-progress pointer-events-none absolute left-6 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-brand-orange to-brand-purple"
          />

          <div className="flex flex-col gap-8">
            {REASONS.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="micro-atm-reason relative flex gap-6 pl-16">
                  <span
                    className="micro-atm-reason-node absolute left-6 top-1 z-10 flex h-9 w-9 -translate-x-1/2 items-center
                               justify-center rounded-full text-white shadow-md ring-4 ring-[#FAFAFA]"
                  >
                    <Icon size={16} />
                  </span>

                  <div className="micro-atm-reason-reveal flex-1 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-md">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-brand-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-bold leading-snug text-brand-purple-dark">
                        {r.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-grey">
                      {r.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}