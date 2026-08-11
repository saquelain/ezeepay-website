"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fingerprint, IndianRupee, Landmark } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { icon: Fingerprint, value: "1", label: "Fingerprint" },
  { icon: IndianRupee, value: "0", label: "Cards Needed" },
  { icon: Landmark, value: "All", label: "Major Banks" },
];

export default function AepsWhatIsAeps() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".aeps-what-copy > *", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });

        gsap.from(".aeps-what-media", {
          scale: 0.92,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });

        gsap.to(".aeps-what-media-inner", {
          y: -16,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* ── Left — real product photo ── */}
        <div className="aeps-what-media relative order-2 mx-auto w-full max-w-md lg:order-1">
          <div className="aeps-what-media-inner relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F1] p-10 ring-1 ring-black/5">
            <div className="relative aspect-square w-full">
              <Image
                src="/products/biometric-device.png"
                alt="Mantra biometric fingerprint scanner used for AePS authentication"
                fill
                sizes="(min-width: 1024px) 36vw, 80vw"
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Floating device chip */}
          <div className="absolute -bottom-5 -right-4 flex items-center gap-2.5 rounded-2xl bg-brand-purple-dark px-4 py-3 shadow-xl sm:-right-8">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
              <Fingerprint size={16} />
            </span>
            <span className="text-xs font-semibold leading-tight text-white">
              RD-Certified
              <br />
              Device Ready
            </span>
          </div>
        </div>

        {/* ── Right — copy ── */}
        <div className="aeps-what-copy order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple shadow-sm">
            The Basics
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-purple-dark md:text-4xl">
            What is <span className="text-brand-purple">AePS</span>?
          </h2>

          <p className="mt-6 leading-relaxed text-brand-grey">
            AePS (Aadhaar Enabled Payment System) lets any customer withdraw
            cash, check their balance, or get a mini statement using nothing
            but their Aadhaar number and a fingerprint — no bank branch, no
            debit card, no waiting in line.
          </p>
          <p className="mt-4 leading-relaxed text-brand-grey">
            As an Ezeepay AePS agent, you become the banking point for your
            neighbourhood — turning footfall into a steady stream of
            commission on every transaction you process.
          </p>

          {/* Stat row */}
          <div className="mt-9 grid grid-cols-3 gap-4">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border-subtle bg-white p-4 text-center shadow-sm"
                >
                  <Icon size={18} className="mx-auto text-brand-orange" />
                  <p className="mt-2 text-xl font-bold text-brand-purple-dark">{s.value}</p>
                  <p className="text-[11px] font-medium leading-tight text-brand-grey">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
