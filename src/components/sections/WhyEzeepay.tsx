"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";   // merge into the existing react import

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

gsap.registerPlugin(ScrollTrigger);

const TRANSACTIONS = [
  { name: "Ramesh K.", type: "AePS Withdrawal", amount: "₹2,500" },
  { name: "Sunita D.", type: "Money Transfer", amount: "₹8,000" },
  { name: "Vikram S.", type: "Electricity Bill", amount: "₹1,340" },
  { name: "Priya M.", type: "Mobile Recharge", amount: "₹299" },
  { name: "Arjun T.", type: "Flight Booking", amount: "₹4,120" },
];

const CHAT = [
  { from: "agent", text: "Meri ID login nahi ho rahi 😟" },
  { from: "support", text: "Namaste! Abhi check karte hain." },
  { from: "support", text: "Ho gaya — dubara login kijiye ✅" },
  { from: "agent", text: "Wah, 2 minute mein solve! 🙏" },
];

const PARTNERS = [
    { name: "CredoPay", src: "/images/partners/credopay.png" },
    { name: "Mantra", src: "/images/partners/mantra.png" },
    { name: "Mentation Technologies", src: "/images/partners/mentation.png" },
    { name: "Noble Web Studio", src: "/images/partners/noble.png" },
    { name: "Protean", src: "/images/partners/protean.png" },
  ];

export default function WhyEzeepay() {
  const sectionRef = useRef<HTMLElement>(null);
  const [centerIdx, setCenterIdx] = useState(0);

    useEffect(() => {
    const id = setInterval(() => {
        setCenterIdx((i) => (i + 1) % COMMUNITY.length);
    }, 2000);
    return () => clearInterval(id);
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

      // Floating avatars — each drifts up/down on its own timing
    gsap.utils.toArray<HTMLElement>(".float-avatar").forEach((el, i) => {
        gsap.to(el, {
        y: i % 2 === 0 ? -10 : 10,
        duration: 2 + (i % 3) * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        });
    });

      // Earnings line draws itself
      const path = document.querySelector<SVGPathElement>(".earnings-path");
      if (path) {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: path, start: "top 85%" },
          }
        );
      }

      // Chat bubbles pop in one by one
      // Chat bubbles pop in like real messages — one by one, with reading pauses
        // Chat: typing dots → bubble pops in, message by message
const chatTl = gsap.timeline({
    scrollTrigger: { trigger: ".chat-card", start: "top 75%" },
  });
  
  const bubbles = gsap.utils.toArray<HTMLElement>(".chat-bubble");
  const typings = gsap.utils.toArray<HTMLElement>(".typing-dots");
  
  bubbles.forEach((bubble, i) => {
    const typing = typings[i];
    const dots = typing.querySelectorAll(".typing-dot");
  
    // Everything starts hidden
    gsap.set(bubble, { scale: 0, opacity: 0, height: 0, marginTop: 0 });
    gsap.set(typing, { scale: 0, opacity: 0 });
  
    chatTl
      // typing indicator pops in
      .to(typing, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(2)",
        transformOrigin: i % 2 === 0 ? "bottom left" : "bottom right",
      }, i === 0 ? 0.2 : "+=0.2")
      // dots bounce while "typing"
      .to(dots, {
        y: -3,
        duration: 0.18,
        ease: "sine.inOut",
        stagger: { each: 0.08, yoyo: true, repeat: 1 },
        yoyo: true,
        repeat: 1,
      }, "+=0.05")
      // typing indicator collapses away
      .to(typing, {
        scale: 0,
        opacity: 0,
        height: 0,
        padding: 0,
        duration: 0.2,
        ease: "power2.in",
      })
      // bubble pops in — extra bubbly
      .to(bubble, {
        scale: 1,
        opacity: 1,
        height: "auto",
        duration: 0.6,
        ease: "elastic.out(1, 0.55)",
      }, "-=0.05");
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
    <section ref={sectionRef} className="bg-white px-6 py-24">
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
          {/* ── A: Dark card, tall — earnings line ── */}
          <div className="bento-card relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#1C1230] p-8 text-white md:row-span-2">
            <svg
              viewBox="0 0 300 160"
              fill="none"
              className="absolute inset-x-0 top-16 w-full"
              preserveAspectRatio="none"
            >
              <path
                className="earnings-path"
                d="M0 130 C40 128, 60 120, 85 110 S120 60, 150 70 S200 95, 225 60 S270 25, 300 20"
                stroke="#A78BDA"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <p className="relative text-sm font-medium uppercase tracking-widest text-white/50">
              Agent earnings
            </p>

            <div className="relative mt-auto pt-48">
              <p className="text-6xl font-bold tracking-tight">
                ₹<span className="count-up" data-target="25000">0</span>+
              </p>
              <p className="mt-2 text-white/60">
                earned per month by agents — with ₹0 working capital
              </p>
            </div>
          </div>

          {/* ── B: Chat card — 12x7 support ── */}
          <div className="bento-card chat-card rounded-3xl border border-black/5 bg-white p-8">
          <div className="flex min-h-44 flex-col gap-2.5">
            {CHAT.map((m, i) => (
                <div key={i} className={m.from === "support" ? "self-start" : "self-end"}>
                {/* Typing dots — shown before the bubble */}
                <div
                    className={`typing-dots flex w-max items-center gap-1 rounded-2xl px-4 py-3 ${
                    m.from === "support"
                        ? "rounded-bl-md bg-[#F3EEFA]"
                        : "ml-auto rounded-br-md bg-brand-purple"
                    }`}
                >
                    {[0, 1, 2].map((d) => (
                    <span
                        key={d}
                        className={`typing-dot h-1.5 w-1.5 rounded-full ${
                        m.from === "support" ? "bg-brand-purple/40" : "bg-white/60"
                        }`}
                    />
                    ))}
                </div>

                {/* The actual message */}
                <div
                    className={`chat-bubble max-w-full rounded-2xl px-4 py-2.5 text-sm ${
                    m.from === "support"
                        ? "origin-bottom-left rounded-bl-md bg-[#F3EEFA] text-brand-purple-dark"
                        : "origin-bottom-right rounded-br-md bg-brand-purple text-white"
                    }`}
                >
                    {m.text}
                </div>
                </div>
            ))}
            </div>
            <h3 className="mt-6 text-xl font-bold text-brand-purple-dark">
              12x7 Help Desk
            </h3>
            <p className="mt-2 text-brand-grey">
              Real people, real support — in your language, every day.
            </p>
          </div>

          {/* ── C: Community — floating avatars + rotating center ── */}
        <div className="bento-card rounded-3xl border border-black/5 bg-white p-7">
        <div className="relative h-44">
            {/* Floating circle avatars */}
            {FLOAT_POSITIONS.map(([top, left, size], i) => (
            <div
                key={i}
                className="float-avatar absolute overflow-hidden rounded-full ring-2 ring-white shadow-md"
                style={{ top: `${top}%`, left: `${left}%`, width: size, height: size }}
            >
                <Image
                src={COMMUNITY[i]}
                alt=""
                fill
                sizes="60px"
                className="object-cover"
                />
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

        <h3 className="mt-5 text-xl font-bold text-brand-purple-dark">
            <span className="count-up" data-target="500000">0</span>+ Agents Across India
        </h3>
        <p className="mt-2 text-brand-grey">
            Join a family that keeps growing every single day.
        </p>
        </div>

          {/* ── D: Transaction ticker ── */}
          <div className="bento-card rounded-3xl border border-black/5 bg-white p-8">
            <div className="relative h-44 overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-white to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-white to-transparent" />
              <div className="animate-ticker flex flex-col gap-2.5">
                {[...TRANSACTIONS, ...TRANSACTIONS].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-[#F7F5FB] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-green-500" />
                      <div>
                        <p className="text-sm font-semibold text-brand-purple-dark">{t.name}</p>
                        <p className="text-xs text-brand-grey">{t.type}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-brand-purple">{t.amount}</span>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="mt-6 text-xl font-bold text-brand-purple-dark">
              Commission On Every Transaction
            </h3>
            <p className="mt-2 text-brand-grey">
              Maximum commission in the industry, tracked live in your app.
            </p>
          </div>

          {/* ── E: Compliance + partners marquee ── */}
        <div className="bento-card flex flex-col justify-between rounded-3xl border border-black/5 bg-white p-7">
        <div>
            <h3 className="mt-5 text-xl font-bold text-brand-purple-dark">
            Fully Secure & Compliant
            </h3>
            <p className="mt-2 text-brand-grey">
            <span className="font-semibold text-brand-purple-dark">D-U-N-S</span> registered,{" "}
            <span className="font-semibold text-brand-purple-dark">BBPS</span> &{" "}
            <span className="font-semibold text-brand-purple-dark">AEPS</span> rails — trusted
            partners, every rupee protected.
            </p>
        </div>
        {/* Partners marquee */}
        <div className="relative overflow-hidden py-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />
            <div className="animate-marquee flex w-max items-center gap-10">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <div
                key={`${p.name}-${i}`}
                className="relative h-9 w-24 flex-shrink-0 grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                >
                <Image src={p.src} alt={p.name} fill className="object-contain" />
                </div>
            ))}
            </div>
        </div>
        </div>

          {/* ── F: Full-width chips marquee ── */}
          {/* <div className="bento-card relative overflow-hidden rounded-3xl border border-black/5 bg-[#F7F5FB] p-8 md:col-span-3">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="text-xl font-bold text-brand-purple-dark">
                <span className="count-up" data-target="60">0</span>+ Products & Services
              </h3>
              <p className="text-brand-grey">One counter. Every need.</p>
            </div>
            <div className="relative mt-6 space-y-3 overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#F7F5FB] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#F7F5FB] to-transparent" />
              <div className="animate-marquee flex w-max gap-3">
                {[...CHIPS_A, ...CHIPS_A].map((chip, i) => (
                  <span key={i} className="whitespace-nowrap rounded-full border border-brand-purple/15 bg-white px-4 py-2 text-sm font-medium text-brand-purple-dark">
                    {chip}
                  </span>
                ))}
              </div>
              <div className="animate-marquee-reverse flex w-max gap-3">
                {[...CHIPS_B, ...CHIPS_B].map((chip, i) => (
                  <span key={i} className="whitespace-nowrap rounded-full bg-brand-purple px-4 py-2 text-sm font-medium text-white">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}