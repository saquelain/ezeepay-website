"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BellRing, CheckCircle2, Wallet, Zap, PlusCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  [2, 6, 50],     // top-left
  [0, 78, 46],    // top-right
  [38, 0, 44],    // mid-left
  [40, 86, 46],   // mid-right
  [74, 12, 46],   // bottom-left
  [72, 72, 50],   // bottom-right
];

const PARTNERS = [
  { name: "CredoPay", src: "/images/partners/credopay.png" },
  { name: "Mantra", src: "/images/partners/mantra.png" },
  { name: "Mentation Technologies", src: "/images/partners/mentation.png" },
  { name: "Noble Web Studio", src: "/images/partners/noble.png" },
  { name: "Protean", src: "/images/partners/protean.png" },
];

const CYCLE_WORDS = [
  { text: "EARN", color: "#4ADE80" },
  { text: "GROW", color: "#FBBF24" },
  { text: "LEAD", color: "#C4B5FD" },
];

const ALERTS = [
  { icon: Wallet, title: "Commission received", desc: "₹110 — Shop Insurance policy" },
  { icon: CheckCircle2, title: "AePS successful", desc: "₹2,500 withdrawal • Ramesh K." },
  { icon: Zap, title: "New service live", desc: "OTT Recharge now available" },
  { icon: PlusCircle, title: "Wallet topped up", desc: "₹5,000 added instantly" },
];

export default function WhyEzeepay() {
  const sectionRef = useRef<HTMLElement>(null);
  const [centerIdx, setCenterIdx] = useState(0);
  const [alertIdx, setAlertIdx] = useState(0);

  useEffect(() => {
    const a = setInterval(() => setCenterIdx((i) => (i + 1) % COMMUNITY.length), 2000);
    const b = setInterval(() => setAlertIdx((i) => (i + 1) % ALERTS.length), 1800);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Cards rise in
      gsap.from(".bento-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Floating avatars — each drifts on its own timing
      gsap.utils.toArray<HTMLElement>(".float-avatar").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          duration: 2 + (i % 3) * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Dark card — words slide up in, hold, slide up out (infinite)
      const words = gsap.utils.toArray<HTMLElement>(".cycle-word");
      const cycleTl = gsap.timeline({ repeat: -1 });
      words.forEach((w) => {
        cycleTl
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

      // Showcase card — mini app pages slide up slowly with scroll
      gsap.from(".slide-card", {
        y: 150,
        opacity: 0,
        stagger: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: ".showcase-card",
          start: "top 85%",
          end: "top 35%",
          scrub: 1,
        },
      });

      // Bell wiggles when the alerts card enters
      gsap.to(".alert-bell", {
        rotate: 12,
        duration: 0.12,
        yoyo: true,
        repeat: 5,
        ease: "sine.inOut",
        scrollTrigger: { trigger: ".alerts-card", start: "top 80%" },
      });

      // Count-ups
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
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold leading-tight text-brand-purple-dark md:text-5xl">
            Kuch Bhi Pay Karo —{" "}
            <span className="text-brand-purple">Ezeepay Karo</span>
          </h2>
          <p className="mx-auto mt-6 text-lg leading-relaxed text-brand-grey">
            Built to make digital banking easy, convenient, and accessible in
            every village of India.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* ── A: Fully Secure & Compliant — partners marquee ── */}
          <div className="bento-card flex flex-col rounded-3xl bg-gradient-to-b from-[#F3EEFA] to-white p-7">
            <h3 className="text-center text-xl font-bold text-brand-purple-dark">
              Fully Secure &amp; Compliant
            </h3>
            <div className="relative mt-auto overflow-hidden pt-6">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-grey">
                Our Trusted Partners
            </p>
              <div className="animate-marquee flex w-max items-center gap-10 py-4">
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

          {/* ── B: Community — floating avatars + rotating center ── */}
          <div className="bento-card rounded-3xl bg-gradient-to-b from-white to-[#F3EEFA] p-7">
            <h3 className="text-center text-xl font-bold text-brand-purple-dark">
              <span className="count-up" data-target="500000">0</span>+ Agents
              Across India
            </h3>
            <div className="relative mt-4 h-44">
              {FLOAT_POSITIONS.map(([top, left, size], i) => (
                <div
                  key={i}
                  className="float-avatar absolute overflow-hidden rounded-full ring-2 ring-white shadow-md"
                  style={{ top: `${top}%`, left: `${left}%`, width: size, height: size }}
                >
                  <Image src={COMMUNITY[i]} alt="" fill sizes="60px" className="object-cover" />
                </div>
              ))}

              {/* Center avatar — cycles every 2s */}
              <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2">
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
          </div>

          {/* ── C: Dark card — cycling words (tall) ── */}
          <div className="bento-card relative flex flex-col overflow-hidden rounded-3xl bg-[#120B22] p-7 text-white md:row-span-2">
            <h3 className="text-center text-xl font-bold">
              Apna Business, Apni Raftaar
            </h3>

            <div className="relative my-auto h-28 overflow-hidden">
              {CYCLE_WORDS.map((w) => (
                <div
                  key={w.text}
                  className="cycle-word absolute inset-0 flex items-center justify-center opacity-0"
                >
                  <span
                    className="text-7xl font-black tracking-tight"
                    style={{ color: w.color, textShadow: `0 0 60px ${w.color}55` }}
                  >
                    {w.text}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-center text-white/60">
              Real earnings, from day one — ₹
              <span className="count-up" data-target="25000">0</span>+ per month
              with ₹0 working capital.
            </p>
          </div>

          {/* ── D: Wide showcase — app pages slide up on scroll (tall) ── */}
          <div className="showcase-card bento-card relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#EDE7F8] to-[#D9CCF2] p-7 md:col-span-2 md:row-span-2">
            <h3 className="text-center text-xl font-bold text-brand-purple-dark">
              One App, Pura Business
            </h3>
            <p className="mx-auto mt-2 max-w-md text-center text-brand-grey">
              Track services, commissions, and growth — sab kuch ek jagah.
            </p>

            <div className="mt-8 flex items-end justify-center gap-4">
              {/* Mini page 1 — services donut */}
              <div className="slide-card w-56 -rotate-6 rounded-2xl bg-white p-5 shadow-xl shadow-brand-purple/20">
                <p className="text-sm font-semibold text-brand-purple-dark">Services Used</p>
                <div
                  className="relative mx-auto mt-4 h-28 w-28 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#5B2D8E 0 55%, #F47B20 55% 78%, #4ADE80 78% 92%, #E5E7EB 92% 100%)",
                  }}
                >
                  <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-xl font-bold text-brand-purple-dark">60+</span>
                    <span className="text-[10px] text-brand-grey">services</span>
                  </div>
                </div>
                <div className="mt-4 space-y-1 text-[11px] text-brand-grey">
                  <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-purple" />Banking · 55%</p>
                  <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-orange" />Recharge · 23%</p>
                  <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-400" />Travel · 14%</p>
                </div>
              </div>

              {/* Mini page 2 — commissions list */}
              <div className="slide-card w-60 rotate-3 rounded-2xl bg-white p-5 shadow-xl shadow-brand-purple/20">
                <p className="text-sm font-semibold text-brand-purple-dark">
                  Today&apos;s Commissions
                </p>
                <div className="mt-3 space-y-2">
                  {[
                    ["AePS Withdrawal", "+₹12"],
                    ["Shop Insurance", "+₹110"],
                    ["Flight Booking", "+₹210"],
                    ["Money Transfer", "+₹18"],
                  ].map(([s, a]) => (
                    <div
                      key={s}
                      className="flex items-center justify-between rounded-lg bg-[#F7F5FB] px-3 py-2 text-xs"
                    >
                      <span className="text-brand-purple-dark">{s}</span>
                      <span className="font-bold text-green-600">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── E: Live alerts — rotating notification stack ── */}
          <div className="alerts-card bento-card flex flex-col rounded-3xl bg-gradient-to-b from-[#FFF6EC] to-white p-7">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-brand-purple-dark">Live Alerts</h3>
              <BellRing size={22} className="alert-bell text-brand-orange" />
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
                    <div>
                      <p className="text-sm font-semibold text-brand-purple-dark">{a.title}</p>
                      <p className="text-xs text-brand-grey">{a.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-sm text-brand-grey">
              Every transaction, tracked live in your app.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}