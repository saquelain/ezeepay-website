"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Download, Fingerprint, ShieldCheck, Zap } from "lucide-react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.EzeePay_DigitalBharat&pli=1";

const HIGHLIGHTS = [
  { icon: Fingerprint, label: "Instant Fingerprint Auth" },
  { icon: Zap, label: "Real-Time Commission" },
  { icon: ShieldCheck, label: "Bank-Grade Security" },
];

export default function AepsHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".aeps-hero-badge", { y: 16, opacity: 0, duration: 0.5 })
        .from(".aeps-hero-title span", { y: 28, opacity: 0, duration: 0.7, stagger: 0.06 }, "-=0.25")
        .from(".aeps-hero-sub", { y: 18, opacity: 0, duration: 0.6 }, "-=0.35")
        .from(".aeps-hero-chip", { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3")
        .from(".aeps-hero-cta", { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.35")
        .from(
          ".aeps-hero-media",
          { xPercent: 4, opacity: 0, duration: 0.9, ease: "power2.out" },
          "-=0.9"
        )
        .from(
          ".aeps-hero-float",
          { y: 20, opacity: 0, scale: 0.9, duration: 0.6, ease: "back.out(1.8)" },
          "-=0.4"
        );

      // Gentle continuous float on the stat card
      gsap.to(".aeps-hero-float", {
        y: -10,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ["Aadhaar-Powered", "Banking,", "Right", "At", "Your", "Counter"];

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:min-h-[92vh] lg:grid-cols-2">
        {/* ── Left — copy, white ── */}
        <div className="relative flex flex-col justify-center px-6 pb-14 pt-28 lg:px-14 lg:py-24 xl:px-20">
          {/* Faint dot texture, top-left only */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-72 w-72 opacity-40
                       [background-image:radial-gradient(circle,#9CA3AF_1.5px,transparent_1.5px)]
                       [background-size:20px_20px]
                       [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
          />

          <Link
            href="/services"
            className="aeps-hero-badge relative inline-flex w-fit items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-1.5 text-sm font-medium text-brand-grey shadow-sm transition-colors hover:border-brand-orange/40 hover:text-brand-orange"
          >
            <ArrowRight size={13} className="rotate-180" />
            Back to Services
          </Link>

          <p className="relative mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-brand-orange">
            AePS &middot; Aadhaar Enabled Payment System
          </p>

          <h1 className="aeps-hero-title relative mt-4 max-w-xl text-5xl font-extrabold leading-[1.08] tracking-tight text-brand-purple-dark md:text-6xl">
            {titleWords.map((w, i) => (
              <span key={i} className="inline-block">
                {w === "Counter" ? (
                  <span className="relative inline-block text-brand-orange">
                    {w}
                    <svg
                      aria-hidden
                      viewBox="0 0 160 18"
                      className="absolute left-0 top-full mt-1 h-3 w-full text-brand-orange"
                      fill="none"
                    >
                      <path
                        d="M2 12C40 2 120 2 158 12"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                ) : (
                  w
                )}
                {i < titleWords.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p className="aeps-hero-sub relative mt-7 max-w-lg text-lg leading-relaxed text-brand-grey">
            Become an Ezeepay AePS agent and offer cash withdrawal, balance
            enquiry, and mini statements with nothing but a fingerprint — no
            cards, no queues, no hassle for your customers.
          </p>

          {/* Highlight chips */}
          <div className="relative mt-9 flex flex-wrap gap-3">
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.label}
                  className="aeps-hero-chip flex items-center gap-2.5 rounded-full border border-border-subtle bg-white px-4 py-2.5 shadow-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-brand-orange">
                    <Icon size={16} />
                  </span>
                  <span className="text-sm font-semibold text-brand-purple-dark">
                    {h.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="relative mt-10 flex flex-wrap items-center gap-4">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="aeps-hero-cta inline-flex items-center gap-2.5 rounded-full bg-brand-orange px-7 py-4 text-[15px] font-semibold leading-none text-white shadow-lg shadow-brand-orange/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              <Download size={17} />
              Download App
            </a>
            <Link
              href="/join"
              className="aeps-hero-cta inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-white px-7 py-4 text-[15px] font-semibold leading-none text-brand-purple-dark transition-all duration-300 hover:border-brand-purple/30 hover:bg-brand-purple-light/40"
            >
              Become an AePS Agent
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* ── Right — real photo, full bleed ── */}
        <div className="aeps-hero-media relative min-h-[420px] lg:min-h-0">
          <Image
            src="/images/stats/agent-helping.png"
            alt="An Ezeepay agent helping a customer complete an AePS fingerprint transaction at a retail counter"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          {/* Soft edge blend into the white panel on desktop */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-white to-transparent lg:block" />

          {/* Floating stat card */}
          <div className="aeps-hero-float absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur-sm sm:bottom-10 sm:left-10">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
              <Zap size={20} />
            </span>
            <div className="leading-tight">
              <p className="text-lg font-bold text-brand-purple-dark">
                Earn up to &#8377;1 Lakh/mo
              </p>
              <p className="text-xs text-brand-grey">On AePS commissions alone</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
