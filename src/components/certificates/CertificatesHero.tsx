"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ShieldCheck, FileCheck, Lock } from "lucide-react";

const TRUST_ITEMS = [
  { icon: ShieldCheck, title: "100%", sub: "Compliant" },
  { icon: FileCheck, title: "Verified", sub: "Documents" },
  { icon: Lock, title: "Secure &", sub: "Reliable" },
];

export default function CertificatesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".cert-hero > *", {
          y: 26,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        });
        gsap.from(".cert-docs", {
          y: 40,
          opacity: 0,
          scale: 0.96,
          duration: 1,
          ease: "power3.out",
          delay: 0.25,
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* ── Background — decorative only, safe to crop at any size ── */}
      {/* /public/images/certificates/certificates-bg.png */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/certificates/certificates-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:py-20 lg:grid-cols-2">
        {/* ── Left: content ── */}
        <div className="cert-hero">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-brand-purple-dark shadow-sm ring-1 ring-brand-purple/10 backdrop-blur">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-purple text-white">
              <ShieldCheck size={14} />
            </span>
            100% Transparent · 100% Trusted
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-[#1D1D1D] md:text-6xl">
            Certificates &amp;
            <br />
            <span className="text-brand-purple">Compliance</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-brand-grey">
            Transparency and trust are at the core of everything we do. View
            our registrations, certifications and compliance documents.
          </p>

          <div className="mt-9 inline-flex flex-wrap items-center gap-y-4 rounded-2xl bg-white/85 px-2 py-4 shadow-sm ring-1 ring-brand-purple/10 backdrop-blur sm:flex-nowrap sm:divide-x sm:divide-brand-purple/10">
            {TRUST_ITEMS.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3 px-5">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple">
                  <Icon size={20} />
                </span>
                <div className="leading-tight">
                  <p className="font-bold text-brand-purple-dark">{title}</p>
                  <p className="text-sm text-brand-grey">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: documents illustration, never cropped ── */}
        {/* /public/images/certificates/hero-documents.png */}
        <div className="cert-docs relative mx-auto w-full max-w-md lg:max-w-none">
          <Image
            src="/images/certificates/hero-documents.png"
            alt="Verified compliance documents"
            width={1402}
            height={1122}
            priority
            sizes="(min-width: 1024px) 560px, 90vw"
            className="h-auto w-full select-none drop-shadow-2xl"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}