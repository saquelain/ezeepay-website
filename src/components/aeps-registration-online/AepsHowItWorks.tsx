"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Fingerprint,
  IdCard,
  ListChecks,
  ScanFace,
  Zap,
  Receipt,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    icon: Fingerprint,
    title: "Connect & Install Biometric Device",
    description:
      "As an AEPS Agent, you will connect and install a biometric device to your computer or smartphone.",
  },
  {
    icon: IdCard,
    title: "Input Customer Aadhaar Details",
    description:
      "Enter the customer's Aadhaar number and select the bank name associated with their account.",
  },
  {
    icon: ListChecks,
    title: "Select Transaction Type",
    description:
      "Choose between Cash Withdrawal or Balance Inquiry, depending on the customer's needs.",
  },
  {
    icon: ScanFace,
    title: "Customer Authentication",
    description:
      "The customer places their fingerprint on the device to securely authenticate the transaction.",
  },
  {
    icon: Zap,
    title: "Real-Time Transaction Processing",
    description:
      "The customer's bank account is debited, your Ezeepay wallet is credited in real-time — plus your commission.",
  },
  {
    icon: Receipt,
    title: "Receipt & SMS Confirmation",
    description:
      "You get a transaction receipt, and the customer receives an SMS confirmation from their bank — full transparency, every time.",
  },
];

export default function AepsHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".aeps-step-reveal, .aeps-step-node, .aeps-how-progress", { clearProps: "all" });
        return;
      }

      gsap.from(".aeps-how-header > *", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".aeps-how-header", start: "top 82%" },
      });

      gsap.set(".aeps-how-progress", { scaleY: 0 });
      gsap.to(".aeps-how-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".aeps-how-timeline",
          start: "top 68%",
          end: "bottom 60%",
          scrub: 0.4,
        },
      });

      gsap.utils.toArray<HTMLElement>(".aeps-step").forEach((item) => {
        const content = item.querySelector(".aeps-step-reveal");
        const node = item.querySelector(".aeps-step-node");
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
        <div className="aeps-how-header mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
            The Process
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-purple-dark md:text-4xl">
            How Does It <span className="text-brand-purple">Work</span>?
          </h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-brand-grey">
            Six simple steps from fingerprint to funds — every transaction,
            start to finish, in under a minute.
          </p>
        </div>

        <div className="aeps-how-timeline relative mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-0 bottom-0 w-px bg-black/10"
          />
          <div
            aria-hidden
            className="aeps-how-progress pointer-events-none absolute left-6 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-brand-orange to-brand-purple"
          />

          <div className="flex flex-col gap-8">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="aeps-step relative flex gap-6 pl-16">
                  <span
                    className="aeps-step-node absolute left-6 top-1 z-10 flex h-9 w-9 -translate-x-1/2 items-center
                               justify-center rounded-full text-white shadow-md ring-4 ring-[#FAFAFA]"
                  >
                    <Icon size={16} />
                  </span>

                  <div className="aeps-step-reveal flex-1 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-md">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-brand-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-bold leading-snug text-brand-purple-dark">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-grey">
                      {s.description}
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
