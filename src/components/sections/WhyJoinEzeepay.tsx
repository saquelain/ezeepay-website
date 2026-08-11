"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".why-join-reveal, .why-join-node-dot, .why-join-progress", {
          clearProps: "all",
        });
        return;
      }

      /* ── Header ── */
      gsap.from(".why-join-header > *", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".why-join-header", start: "top 85%" },
      });

      /* ── Progress line fills as the timeline scrolls through ── */
      gsap.set(".why-join-progress", { scaleY: 0 });
      gsap.to(".why-join-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".why-join-timeline",
          start: "top 65%",
          end: "bottom 55%",
          scrub: 0.4,
        },
      });

      /* ── Each benefit reveals in sequence as it's scrolled to ── */
      const items = gsap.utils.toArray<HTMLElement>(".why-join-item");
      items.forEach((item) => {
        const content = item.querySelector(".why-join-reveal");
        const dot = item.querySelector(".why-join-node-dot");
        if (!content || !dot) return;

        gsap.set(content, { autoAlpha: 0, y: 26 });
        gsap.set(dot, { scale: 0, backgroundColor: "#ffffff" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(dot, {
          scale: 1,
          backgroundColor: "#5B2D8E",
          duration: 0.35,
          ease: "back.out(3)",
        }).to(
          content,
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.15"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#FAFAFA] px-4 py-24 sm:px-6 lg:px-10"
    >
      {/* Dotted grid — top-left, pure CSS */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-64 w-64 opacity-40
                   [background-image:radial-gradient(circle,#9CA3AF_1.5px,transparent_1.5px)]
                   [background-size:20px_20px]
                   [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="why-join-header mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple shadow-sm">
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

        {/* Scroll-sequenced benefits timeline */}
        <div className="why-join-timeline relative mt-20">
          {/* Static track */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-0 bottom-0 w-px bg-black/10 lg:left-1/2 lg:-translate-x-1/2"
          />
          {/* Animated fill that grows with scroll progress */}
          <div
            aria-hidden
            className="why-join-progress pointer-events-none absolute left-6 top-0 bottom-0 w-px origin-top
                       bg-gradient-to-b from-brand-purple via-brand-purple to-brand-orange
                       lg:left-1/2 lg:-translate-x-1/2"
          />

          <div className="flex flex-col gap-10 lg:gap-6">
            {BENEFITS.map((b, i) => {
              const onRight = i % 2 === 1;
              return (
                <div
                  key={b.number}
                  className="why-join-item relative pl-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:pl-0"
                >
                  {/* Node */}
                  <span
                    className="why-join-node-dot absolute left-6 top-1 z-10 flex h-9 w-9 -translate-x-1/2 items-center
                               justify-center rounded-full text-[11px] font-bold text-white shadow-md ring-4 ring-white
                               lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
                  >
                    {b.number}
                  </span>

                  {/* Content card — alternates sides on large screens */}
                <div
                className={`why-join-reveal mx-auto w-full max-w-[280px] rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lg lg:max-w-[300px] ${
                    onRight
                    ? "lg:col-start-2 lg:ml-0 lg:mr-auto lg:text-left"
                    : "lg:col-start-1 lg:row-start-1 lg:ml-auto lg:mr-0 lg:text-right"
                }`}
                >
                <div
                    className={`flex min-h-[160px] flex-col items-center gap-3 text-center ${
                    onRight ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right"
                    }`}
                >
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-visible">
                    <div
                        className="relative h-full w-full"
                        style={{ transform: `scale(${b.iconScale || 1})` }}
                    >
                        <Image src={b.image} alt="" fill className="object-contain" />
                    </div>
                    </div>
                    <div className="min-w-0">
                    <h3 className="text-base font-bold leading-snug text-[#1D1233]">
                        {b.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-grey">
                        {b.desc}
                    </p>
                    </div>
                </div>
                </div>
                </div>
              );
            })}

            {/* Final node — featured benefit, full width */}
            <div className="why-join-item relative pl-16 lg:pl-0">
              <span
                className="why-join-node-dot absolute left-6 top-1 z-10 flex h-9 w-9 -translate-x-1/2 items-center
                           justify-center rounded-full text-[11px] font-bold text-white shadow-md ring-4 ring-white
                           lg:left-1/2 lg:-translate-x-1/2"
              >
                {FEATURED_BENEFIT.number}
              </span>

              <div className="why-join-reveal mx-auto rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 lg:w-2/3">
                <div className="flex items-center justify-between gap-4">
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
          </div>
        </div>

        {/* Bottom banner */}
        <div className="why-join-banner mx-auto mt-12 flex w-fit max-w-full flex-col items-center gap-2 rounded-full bg-brand-purple px-6 py-4 text-center shadow-lg shadow-brand-purple/25 sm:flex-row sm:gap-3 sm:text-left">
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
