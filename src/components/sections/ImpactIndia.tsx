"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAP_W, MAP_H, DOTS, CITIES } from "./india-dots";

gsap.registerPlugin(ScrollTrigger);

/* Tweak freely — value animates from 0, prefix/suffix render around it */
const STATS = [
  { value: 5, suffix: " Lakhs+", label: "Total Retailers" },
  { value: 8382, suffix: "+", label: "Total Distributors" },
  { value: 2, suffix: " Lakhs/day", label: "Transaction Volume" },
  { value: 5, suffix: " Cr+", label: "Customers Served" },
  { value: 10, suffix: " Cr+", label: "Lives Impacted" },
  { value: 28, suffix: "+", label: "States & UTs Covered" },
];

export default function ImpactIndia() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        /* Count-ups — fail-safe: per-element trigger, never pre-hidden */
        gsap.utils.toArray<HTMLElement>(".impact-num").forEach((el) => {
          const target = Number(el.dataset.value || 0);
          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: target,
              duration: 1.8,
              ease: "power2.out",
              snap: { textContent: 1 },
              immediateRender: false,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
              onUpdate() {
                el.textContent = Number(el.textContent).toLocaleString("en-IN");
              },
            }
          );
        });

        /* Stat cards rise in */
        gsap.utils.toArray<HTMLElement>(".impact-stat").forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power3.out",
              delay: (i % 2) * 0.08,
              immediateRender: false,
              clearProps: "all",
              scrollTrigger: { trigger: card, start: "top 90%", once: true },
            }
          );
        });

        /* Map fades up as one piece; city markers pop after */
        gsap.fromTo(
          ".impact-map",
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: ".impact-map", start: "top 80%", once: true },
          }
        );
        gsap.fromTo(
          ".impact-city",
          { scale: 0, transformOrigin: "center" },
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(2.5)",
            stagger: 0.07,
            immediateRender: false,
            scrollTrigger: { trigger: ".impact-map", start: "top 70%", once: true },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    });

    /* Reduced motion — final numbers, everything visible */
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.utils.toArray<HTMLElement>(".impact-num").forEach((el) => {
        el.textContent = Number(el.dataset.value || 0).toLocaleString("en-IN");
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-4 my-8 overflow-hidden rounded-[2.5rem] bg-[#120B22] px-6 py-20 text-white md:py-24"
    >
      {/* Quiet atmosphere */}
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-brand-purple/25 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
        {/* ── Left: heading + stats ── */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange" />
            Impact Across India
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
            Kashmir se Kanyakumari —{" "}
            <span className="text-[#C4B5FD]">har jagah Ezeepay</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/60">
            A growing network bringing digital banking to every corner of the
            country, one shop at a time.
          </p>

          {/* Stats grid */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="impact-stat rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-brand-orange/40"
              >
                <p className="text-3xl font-bold tracking-tight text-white">
                  <span className="impact-num" data-value={s.value}>
                    0
                  </span>
                  <span className="text-brand-orange">{s.suffix}</span>
                </p>
                <p className="mt-1.5 text-sm text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: dot-matrix India map ── */}
        <div className="impact-map relative mx-auto w-full max-w-2xl">
          {/* Soft glow behind the country */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/20 blur-[90px]"
          />

          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="relative h-auto w-full"
            role="img"
            aria-label="Map of India showing Ezeepay presence across the country"
          >
            {/* Country dots — subtle size/opacity texture */}
            <g fill="#C4B5FD">
              {DOTS.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={1.5 + ((i * 7) % 5) * 0.12}
                  opacity={0.22 + ((i * 13) % 7) * 0.035}
                />
              ))}
            </g>

            {/* Presence markers */}
            {CITIES.map((c, i) => (
              <g key={c.name} className="impact-city">
                {/* CSS pulse ring, staggered */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="8"
                  fill="none"
                  stroke="#F47B20"
                  strokeWidth="1.3"
                  opacity="0.55"
                  className="animate-ping"
                  style={{
                    transformOrigin: `${c.x}px ${c.y}px`,
                    animationDuration: "2.6s",
                    animationDelay: `${(i % 6) * 0.45}s`,
                  }}
                />
                <circle cx={c.x} cy={c.y} r="3.8" fill="#F47B20" />
                <circle cx={c.x} cy={c.y} r="1.5" fill="#fff" />
                <title>{c.name}</title>
              </g>
            ))}
          </svg>

          {/* Legend */}
          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-white/50">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
            Active presence · 28+ states &amp; UTs · 24 major cities
          </p>
        </div>
      </div>
    </section>
  );
}