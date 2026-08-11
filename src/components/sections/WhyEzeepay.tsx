"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  BellRing,
  CheckCircle2,
  Wallet,
  Zap,
  PlusCircle,
  ShieldCheck,
  Lock,
  Fingerprint,
  BadgeCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────── data ────────────────────────── */

const COMMUNITY = [
  "/images/community/agent-1.png",
  "/images/community/agent-2.png",
  "/images/community/agent-3.png",
  "/images/community/agent-4.png",
  "/images/community/agent-5.png",
  "/images/community/agent-6.png",
];

// [top%, left%, size px] — corners & edges only; center stays clear
const FLOAT_POSITIONS: [number, number, number][] = [
  [2, 6, 50],
  [0, 78, 46],
  [38, 0, 44],
  [40, 86, 46],
  [74, 12, 46],
  [72, 72, 50],
];

const PARTNERS = [
  { name: "CredoPay", src: "/images/partners/credopay.png" },
  { name: "Mantra", src: "/images/partners/mantra.png" },
  { name: "Mentation Technologies", src: "/images/partners/mentation.png" },
  { name: "Noble Web Studio", src: "/images/partners/noble.png" },
  { name: "Protean", src: "/images/partners/protean.png" },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "RBI Compliant" },
  { icon: Lock, label: "256-bit SSL" },
  { icon: Fingerprint, label: "Aadhaar Secure" },
  { icon: BadgeCheck, label: "ISO 27001" },
];

const CYCLE_WORDS = [
  { text: "EARN", color: "#4ADE80" },
  { text: "GROW", color: "#FBBF24" },
  { text: "LEAD", color: "#C4B5FD" },
];

const ALERTS = [
  { icon: Wallet, title: "Commission received", desc: "₹110 — Shop Insurance policy", time: "just now" },
  { icon: CheckCircle2, title: "AePS successful", desc: "₹2,500 withdrawal • Ramesh K.", time: "2 min ago" },
  { icon: Zap, title: "New service live", desc: "OTT Recharge now available", time: "14 min ago" },
  { icon: PlusCircle, title: "Wallet topped up", desc: "₹5,000 added instantly", time: "31 min ago" },
];

const WEEK_BARS = [
  ["Mon", 42],
  ["Tue", 66],
  ["Wed", 48],
  ["Thu", 82],
  ["Fri", 58],
  ["Sat", 100],
  ["Sun", 74],
] as const;

/* ────────────────────────── component ────────────────────────── */

export default function WhyEzeepay() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [centerIdx, setCenterIdx] = useState(0);
  const [alertIdx, setAlertIdx] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const a = setInterval(() => setCenterIdx((i) => (i + 1) % COMMUNITY.length), 2000);
    const b = setInterval(() => setAlertIdx((i) => (i + 1) % ALERTS.length), 2600);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [isVisible]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        /* Cards rise in */
        gsap.from(".bento-card", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });

        /* Floating avatars drift */
        gsap.utils.toArray<HTMLElement>(".float-avatar").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -10 : 10,
            duration: 2 + (i % 3) * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        /* Dashed orbit spins slowly */
        gsap.to(".orbit-ring", {
          rotate: 360,
          duration: 40,
          ease: "none",
          repeat: -1,
        });

        /* Dark card — words cycle; glow orb re-tints per word */
        const words = gsap.utils.toArray<HTMLElement>(".cycle-word");
        const cycleTl = gsap.timeline({ repeat: -1 });
        words.forEach((w, i) => {
          cycleTl
            .call(() => {
              if (glowRef.current) {
                glowRef.current.style.background = `radial-gradient(circle at 50% 45%, ${CYCLE_WORDS[i].color}2e 0%, transparent 65%)`;
              }
            })
            .fromTo(
              w,
              { yPercent: 110, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
            )
            .to(
              w,
              { yPercent: -110, opacity: 0, duration: 0.55, ease: "power3.in" },
              "+=1.3"
            );
        });

        /* Security shield ring sweeps once on enter */
        gsap.fromTo(
          ".shield-ring",
          { rotate: -90, opacity: 0, scale: 0.8 },
          {
            rotate: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".secure-card", start: "top 80%" },
          }
        );
        gsap.from(".trust-badge", {
          y: 14,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".secure-card", start: "top 78%" },
        });

        /* Showcase — mini app pages pop in once, then settle */
        gsap.from(".slide-card", {
          y: 80,
          opacity: 0,
          scale: 0.92,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".showcase-card", start: "top 70%" },
        });

        /* Floating chips drift gently */
        gsap.utils.toArray<HTMLElement>(".float-chip").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -8 : 8,
            duration: 2.4 + i * 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        /* Weekly bars grow when visible */
        gsap.from(".week-bar", {
          scaleY: 0,
          transformOrigin: "bottom",
          stagger: 0.06,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".earnings-mini", start: "top 90%" },
        });

        /* Bell wiggles when the alerts card enters */
        gsap.to(".alert-bell", {
          rotate: 12,
          duration: 0.12,
          yoyo: true,
          repeat: 5,
          ease: "sine.inOut",
          scrollTrigger: { trigger: ".alerts-card", start: "top 80%" },
        });

        /* Count-ups */
        gsap.utils.toArray<HTMLElement>(".count-up").forEach((el) => {
          const target = Number(el.dataset.target || 0);
          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: "power1.out",
              snap: { textContent: 1 },
              scrollTrigger: { trigger: el, start: "top 85%" },
              onUpdate() {
                el.textContent = Number(el.textContent).toLocaleString("en-IN");
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    /* Reduced motion — just show the final numbers */
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.utils.toArray<HTMLElement>(".count-up").forEach((el) => {
        el.textContent = Number(el.dataset.target || 0).toLocaleString("en-IN");
      });
    });

    return () => mm.revert();
  }, []);

  /* Mouse-follow spotlight per card */
  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-6 py-12 md:py-14">
      {/* Soft ambient wash behind the grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-32 -z-0 mx-auto h-[480px] max-w-5xl rounded-full bg-gray-100 blur-[120px] opacity-60"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-gray-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange" />
            Why Ezeepay
          </span>

          <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-purple-dark md:text-4xl">
            Kuch Bhi Pay Karo —{" "}
            <span className="relative inline-block whitespace-nowrap text-brand-purple">
              Ezeepay Karo
              {/* hand-drawn underline */}
              <svg
                aria-hidden
                viewBox="0 0 220 14"
                className="absolute -bottom-2 left-0 w-full text-brand-orange"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 10 C 60 2, 160 2, 216 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-grey">
            Built to make digital banking easy, convenient, and accessible in
            every village of India.
          </p>
        </div>

        {/* ── Bento grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* A — Fully Secure & Compliant */}
          <div
            onMouseMove={handleSpotlight}
            className="secure-card bento-card card-glow group flex flex-col rounded-3xl bg-gradient-to-b from-[#FAFAFA] to-white p-6 ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-purple/10"
          >
            <h3 className="text-center text-xl font-bold text-brand-purple-dark">
              Fully Secure &amp; Compliant
            </h3>

            {/* Shield + sweep ring */}
            <div className="relative mx-auto mt-4 flex h-16 w-16 items-center justify-center">
              <div
                className="shield-ring absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #5B2D8E 0%, #F47B20 30%, transparent 60%)",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
                }}
              />
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-purple shadow-md shadow-brand-purple/15">
                <ShieldCheck size={24} strokeWidth={2.2} />
              </span>
            </div>

            {/* Compliance chips */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="trust-badge inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-white px-3 py-1.5 text-[11px] font-semibold text-brand-purple-dark shadow-sm"
                >
                  <Icon size={13} className="text-brand-orange" />
                  {label}
                </span>
              ))}
            </div>

            {/* Partners marquee */}
            <div className="relative mt-auto overflow-hidden pt-4">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-grey">
                Our Trusted Partners
              </p>
              <div className="marquee-mask overflow-hidden">
                <div className="animate-marquee flex w-max items-center gap-10 py-3">
                  {[...PARTNERS, ...PARTNERS].map((p, i) => (
                    <div
                      key={`${p.name}-${i}`}
                      className="relative h-10 w-28 flex-shrink-0 opacity-70 mix-blend-multiply grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                    >
                      <Image src={p.src} alt={p.name} fill className="object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* B — Community */}
          <div
            onMouseMove={handleSpotlight}
            className="bento-card card-glow rounded-3xl bg-gradient-to-b from-white to-[#FAFAFA] p-6 ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-purple/10"
          >
            <h3 className="text-center text-xl font-bold text-brand-purple-dark">
              <span className="count-up" data-target="1000000">0</span>+ Agents
              Across India
            </h3>

            <div className="relative mt-3 h-40">
              {/* Slow dashed orbit */}
              <div
                aria-hidden
                className="orbit-ring absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border-subtle"
              />

              {FLOAT_POSITIONS.map(([top, left, size], i) => (
                <div
                  key={i}
                  className="float-avatar absolute overflow-hidden rounded-full shadow-md ring-2 ring-white"
                  style={{ top: `${top}%`, left: `${left}%`, width: size, height: size }}
                >
                  <Image src={COMMUNITY[i]} alt="" fill sizes="60px" className="object-cover" />
                </div>
              ))}

              {/* Center avatar — pulsing halo + crossfade */}
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden
                  className="absolute -inset-2 animate-ping rounded-full bg-brand-purple/10"
                  style={{ animationDuration: "2.4s" }}
                />
                {COMMUNITY.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    fill
                    sizes="96px"
                    className={`rounded-full object-cover drop-shadow-xl transition-opacity duration-700 ${
                      i === centerIdx ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="mt-2 text-center text-sm text-brand-grey">
              A growing family of digital sahayaks — from Kashmir to
              Kanyakumari.
            </p>
          </div>

          {/* C — Dark card (tall) */}
          <div
            onMouseMove={handleSpotlight}
            className="bento-card card-glow-dark relative flex flex-col overflow-hidden rounded-3xl bg-[#120B22] p-6 text-white ring-1 ring-white/10 md:row-span-2"
          >
            {/* Dot grid + tinted glow */}
            <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
            <div
              ref={glowRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 transition-[background] duration-700"
            />

            <h3 className="relative text-center text-xl font-bold">
              Apna Business, Apni Raftaar
            </h3>

            <div className="relative my-auto h-24 overflow-hidden">
              {CYCLE_WORDS.map((w) => (
                <div
                  key={w.text}
                  className="cycle-word absolute inset-0 flex items-center justify-center opacity-0"
                >
                  <span
                    className="text-6xl font-black tracking-tight"
                    style={{ color: w.color, textShadow: `0 0 60px ${w.color}55` }}
                  >
                    {w.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative">
              <p className="text-center text-sm text-white/60">
                Real earnings, from day one — ₹
                <span className="count-up" data-target="25000">0</span>+ per
                month with ₹0 working capital.
              </p>

              {/* Quiet proof row */}
              <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 py-3 text-center backdrop-blur-sm">
                {[
                  ["60+", "Services"],
                  ["₹0", "Investment"],
                  ["24×7", "Support"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <p className="text-sm font-bold text-white">{v}</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/40">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* D — Wide showcase (tall) */}
          <div
            onMouseMove={handleSpotlight}
            className="showcase-card bento-card card-glow relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-[#FAFAFA] to-[#F0F0F1] p-6 ring-1 ring-black/5 md:col-span-2 md:row-span-2"
          >
            {/* Header */}
            <div className="relative z-20 flex items-center justify-center gap-3">
              <h3 className="text-center text-xl font-bold text-brand-purple-dark">
                One App, Pura Business
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-600 shadow-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                Live
              </span>
            </div>
            <p className="relative z-20 mx-auto mt-2 max-w-md text-center text-brand-grey">
              Track services, commissions, and growth — sab kuch ek jagah.
            </p>

            {/* Stage — fills the tall card, everything centers in it */}
            <div className="relative mt-3 flex min-h-[320px] flex-1 items-center justify-center">
              {/* Concentric backdrop rings */}
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-[240px] w-[240px] rounded-full border border-white/60 sm:h-[300px] sm:w-[300px]" />
                <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 sm:h-[420px] sm:w-[420px]" />
                <div className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-2xl" />
              </div>

              {/* Overlapping fan of app pages */}
              <div className="relative flex items-center justify-center">
                {/* Mini page 1 — services donut (back left) */}
                <div className="slide-card relative z-0 w-48 -rotate-6 translate-y-4 rounded-2xl bg-white/95 p-4 shadow-xl shadow-brand-purple/20 backdrop-blur transition-transform duration-300 hover:z-30 hover:-translate-y-2 hover:rotate-0 sm:-mr-10">
                  <p className="text-sm font-semibold text-brand-purple-dark">Services Used</p>
                  <div
                    className="relative mx-auto mt-3 h-20 w-20 rounded-full"
                    style={{
                      background:
                        "conic-gradient(#5B2D8E 0 55%, #F47B20 55% 78%, #4ADE80 78% 92%, #E5E7EB 92% 100%)",
                    }}
                  >
                    <div className="absolute inset-2.5 flex flex-col items-center justify-center rounded-full bg-white">
                      <span className="text-base font-bold text-brand-purple-dark">60+</span>
                      <span className="text-[9px] text-brand-grey">services</span>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 text-[11px] text-brand-grey">
                    <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-purple" />Banking · 55%</p>
                    <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-orange" />Recharge · 23%</p>
                    <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-400" />Travel · 14%</p>
                  </div>
                </div>

                {/* Mini page 2 — commissions list (front center, hero of the fan) */}
                <div className="slide-card relative z-20 w-60 rounded-2xl bg-white p-4 shadow-2xl shadow-brand-purple/30 ring-1 ring-brand-purple/10 transition-transform duration-300 hover:-translate-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-brand-purple-dark">
                      Today&apos;s Commissions
                    </p>
                    <span className="rounded-md bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-600">
                      +₹350
                    </span>
                  </div>
                  <div className="mt-2.5 space-y-1.5">
                    {[
                      ["AePS Withdrawal", "+₹12"],
                      ["Shop Insurance", "+₹110"],
                      ["Flight Booking", "+₹210"],
                      ["Money Transfer", "+₹18"],
                    ].map(([s, a]) => (
                      <div
                        key={s}
                        className="flex items-center justify-between rounded-lg bg-[#F7F5FB] px-3 py-1.5 text-xs"
                      >
                        <span className="text-brand-purple-dark">{s}</span>
                        <span className="font-bold text-green-600">{a}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-2.5 w-full rounded-lg bg-brand-purple py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-purple-dark">
                    View all earnings
                  </button>
                </div>

                {/* Mini page 3 — weekly earnings bars (back right) */}
                <div className="slide-card earnings-mini relative z-0 hidden w-44 rotate-6 translate-y-4 rounded-2xl bg-white/95 p-4 shadow-xl shadow-brand-purple/20 backdrop-blur transition-transform duration-300 hover:z-30 hover:-translate-y-2 hover:rotate-0 sm:-ml-10 sm:block">
                  <p className="text-sm font-semibold text-brand-purple-dark">This Week</p>
                  <p className="mt-0.5 text-lg font-bold text-brand-purple">₹4,120</p>
                  <div className="mt-3 flex h-16 items-end justify-between gap-1.5">
                    {WEEK_BARS.map(([day, h]) => (
                      <div key={day} className="flex flex-1 flex-col items-center gap-1">
                        <div
                          className={`week-bar w-full rounded-full ${
                            h === 100 ? "bg-brand-orange" : "bg-brand-purple/25"
                          }`}
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-[8px] text-brand-grey">{day[0]}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-center text-[10px] text-brand-grey">
                    Best day: <span className="font-semibold text-brand-orange">Saturday</span>
                  </p>
                </div>
              </div>

              {/* Floating notification chips fill the empty corners */}
              <div className="float-chip absolute left-2 top-6 z-10 hidden items-center gap-2 rounded-full bg-white px-3 py-2 shadow-lg shadow-brand-purple/10 md:flex">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Zap size={12} />
                </span>
                <span className="text-[11px] font-semibold text-brand-purple-dark">
                  Instant settlement
                </span>
              </div>

              <div className="float-chip absolute right-2 top-14 z-10 hidden items-center gap-2 rounded-full bg-white px-3 py-2 shadow-lg shadow-brand-purple/10 md:flex">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple">
                  <Wallet size={12} />
                </span>
                <span className="text-[11px] font-semibold text-brand-purple-dark">
                  ₹210 · Flight booking
                </span>
              </div>

              <div className="float-chip absolute bottom-8 left-6 z-10 hidden items-center gap-2 rounded-full bg-white px-3 py-2 shadow-lg shadow-brand-purple/10 lg:flex">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-brand-orange">
                  <CheckCircle2 size={12} />
                </span>
                <span className="text-[11px] font-semibold text-brand-purple-dark">
                  KYC verified
                </span>
              </div>

              <div className="float-chip absolute bottom-10 right-4 z-10 hidden items-center gap-2 rounded-full bg-white px-3 py-2 shadow-lg shadow-brand-purple/10 lg:flex">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <PlusCircle size={12} />
                </span>
                <span className="text-[11px] font-semibold text-brand-purple-dark">
                  Wallet topped up
                </span>
              </div>
            </div>
          </div>

          {/* E — Live alerts */}
          <div
            onMouseMove={handleSpotlight}
            className="alerts-card bento-card card-glow flex flex-col rounded-3xl bg-gradient-to-b from-[#FFF6EC] to-white p-6 ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-orange/10"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-brand-purple-dark">Live Alerts</h3>
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-orange/10">
                <BellRing size={20} className="alert-bell text-brand-orange" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-orange" />
              </span>
            </div>

            <div className="relative mt-auto h-28">
              {ALERTS.map((a, i) => {
                const offset = (i - alertIdx + ALERTS.length) % ALERTS.length;
                const Icon = a.icon;
                return (
                  <div
                    key={a.title}
                    className={`absolute inset-x-0 bottom-0 flex items-center gap-3 overflow-hidden rounded-2xl
                                border border-black/5 bg-white p-4 shadow-lg transition-all duration-500 ${
                      offset === 0
                        ? "z-30 translate-y-0 scale-100 opacity-100"
                        : offset === 1
                        ? "z-20 -translate-y-3 scale-[0.94] opacity-100"
                        : offset === 2
                        ? "z-10 -translate-y-6 scale-[0.88] opacity-100"
                        : "z-0 -translate-y-6 scale-[0.88] opacity-0"
                    }`}
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple">
                      <Icon size={20} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-brand-purple-dark">
                          {a.title}
                        </p>
                        <span className="flex-shrink-0 text-[10px] text-brand-grey/70">
                          {a.time}
                        </span>
                      </div>
                      <p className="truncate text-xs text-brand-grey">{a.desc}</p>
                    </div>

                    {/* Progress bar — how long until the next alert */}
                    {offset === 0 && (
                      <span
                        key={alertIdx}
                        className="animate-alert-progress absolute bottom-0 left-0 h-0.5 rounded-full bg-brand-orange/60"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <p className="mt-3 text-sm text-brand-grey">
              Every transaction, tracked live in your app.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}