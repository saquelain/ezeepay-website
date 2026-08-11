"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Smartphone, Fingerprint, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const REQUIREMENTS = [
  {
    icon: Smartphone,
    title: "Smartphone or Computer",
    desc: "Any device with an active internet connection.",
  },
  {
    icon: Fingerprint,
    title: "Biometric Device",
    desc: "An RD-certified fingerprint scanner for Aadhaar auth.",
  },
];

export default function AepsWhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".aeps-why-media", {
          scale: 0.94,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        });

        gsap.from(".aeps-why-copy > *", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* ── Left — real photo ── */}
        <div className="aeps-why-media relative order-2 min-h-[420px] lg:order-1 lg:min-h-[640px]">
          <Image
            src="/images/stats/agent-shop.png"
            alt="Ezeepay agent showing the app to a customer inside his retail shop"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-white to-transparent lg:block" />
        </div>

        {/* ── Right — copy ── */}
        <div className="aeps-why-copy order-1 flex flex-col justify-center px-6 py-20 lg:order-2 lg:px-16 lg:py-24 xl:px-20">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple shadow-sm">
            Get Started
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-purple-dark md:text-4xl">
            Why Choose <span className="text-brand-purple">Ezeepay</span> For AEPS?
          </h2>

          <h3 className="mt-8 text-lg font-bold text-brand-purple-dark">
            Activation Process
          </h3>
          <p className="mt-3 max-w-lg leading-relaxed text-brand-grey">
            Any new or existing business partner can complete free AEPS
            portal registration with simple documentation. Submit your PAN
            and Aadhaar card, fill out the registration form, and start
            earning a handsome income on every transaction.
          </p>

          <h4 className="mt-8 font-bold text-brand-purple-dark">
            Things you&apos;ll need to get started
          </h4>
          <div className="mt-4 flex flex-col gap-3">
            {REQUIREMENTS.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="flex items-center gap-4 rounded-2xl border border-border-subtle bg-white p-4 shadow-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-brand-orange">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-brand-purple-dark">{r.title}</p>
                    <p className="text-xs leading-relaxed text-brand-grey">{r.desc}</p>
                  </div>
                  <CheckCircle2 size={18} className="ml-auto shrink-0 text-green-500" />
                </div>
              );
            })}
          </div>

          <Link
            href="/join"
            className="group mt-9 inline-flex w-fit items-center gap-2.5 rounded-full bg-brand-purple px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-purple/25 transition-all duration-300 hover:bg-brand-purple-dark"
          >
            Start Your Registration
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={15} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
