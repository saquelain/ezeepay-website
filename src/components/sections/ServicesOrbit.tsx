"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  Fingerprint,
  Send,
  ReceiptText,
  Smartphone,
  CreditCard,
  ScanLine,
  Landmark,
  ShieldCheck,
  HandCoins,
  IdCard,
  Plane,
  QrCode,
  ArrowRight,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SERVICES: { icon: LucideIcon; title: string; desc: string; href: string }[] = [
  { icon: Fingerprint, title: "AEPS", desc: "Aadhaar-based cash withdrawal and balance enquiry with just a fingerprint.", href: "/services/banking" },
  { icon: Send, title: "Money Transfer", desc: "Instant domestic money transfers to any bank account across India.", href: "/services/banking" },
  { icon: ReceiptText, title: "BBPS Bills", desc: "Electricity, water, gas and more — every bill on Bharat BillPay.", href: "/services/utility" },
  { icon: Smartphone, title: "Recharge", desc: "Mobile and DTH recharges for all operators, with full commission.", href: "/services/utility" },
  { icon: CreditCard, title: "Micro ATM", desc: "Card-based cash withdrawals right at your shop counter.", href: "/services/banking" },
  { icon: ScanLine, title: "Aadhaar Pay", desc: "Accept customer payments using only Aadhaar and a fingerprint.", href: "/services/banking" },
  { icon: Landmark, title: "Account Opening", desc: "Open digital bank accounts for your customers in minutes.", href: "/services/account-opening" },
  { icon: ShieldCheck, title: "Insurance", desc: "Health, motor, shop and device policies issued in minutes.", href: "/services/insurance" },
  { icon: HandCoins, title: "Loans", desc: "Easy credit options for your customers through trusted partners.", href: "/services/account-opening" },
  { icon: IdCard, title: "PAN Card", desc: "New PAN applications and corrections, processed fast.", href: "/services/e-governance" },
  { icon: Plane, title: "Travel", desc: "IRCTC trains, flights, buses and hotels — booked from one window.", href: "/services/travel" },
  { icon: QrCode, title: "UPI", desc: "Instant money transfers between bank accounts using UPI ID or QR code.", href: "/services/account-opening" },
];

/* Arc geometry: 180° = left horizon, 0° = right horizon (degrees) */
const START_DEG = 200; // start below the left horizon (hidden behind ground)
const END_DEG = -20; // end below the right horizon
const LOOP_SECONDS = 36; // one full trip for a bubble

export default function ServicesOrbit() {
  const stageRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const hoverCount = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Geometry recomputed on resize */
    let cx = 0, cy = 0, R = 0;
    const measure = () => {
      const rect = stage.getBoundingClientRect();
      cx = rect.width / 2;
      cy = rect.height - 24; // arc center sits at ground level
      R = Math.min(rect.width * 0.42, rect.height * 0.92);
    };
    measure();
    window.addEventListener("resize", measure);

    const setters = bubbleRefs.current.map((el) =>
      el
        ? {
            x: gsap.quickSetter(el, "x", "px") as (v: number) => void,
            y: gsap.quickSetter(el, "y", "px") as (v: number) => void,
            s: gsap.quickSetter(el, "scale") as (v: number) => void,
            o: gsap.quickSetter(el, "opacity") as (v: number) => void,
          }
        : null
    );

    const N = SERVICES.length;
    const interactive: boolean[] = new Array(N).fill(true);
    const place = (i: number, p: number) => {
      const set = setters[i];
      const el = bubbleRefs.current[i];
      if (!set || !el) return;
      const deg = START_DEG + (END_DEG - START_DEG) * p;
      const rad = (deg * Math.PI) / 180;
      set.x(cx + R * Math.cos(rad));
      set.y(cy - R * Math.sin(rad));
      const lift = Math.max(0, Math.sin(rad));
      set.s(0.8 + 0.25 * lift);
      set.o(0.35 + 0.65 * Math.min(1, lift * 3));

      /* Only bubbles clearly above the ground are hoverable/clickable */
      const isInteractive = lift > 0.18;
      if (interactive[i] !== isInteractive) {
        interactive[i] = isInteractive;
        el.style.pointerEvents = isInteractive ? "" : "none";
        el.tabIndex = isInteractive ? 0 : -1; // keep keyboard order sane too
      }
    };

    if (reduceMotion) {
      SERVICES.forEach((_, i) => place(i, (i + 0.5) / N));
      return () => window.removeEventListener("resize", measure);
    }

    /* Continuous round marquee — eases to a stop while any bubble is hovered */
    let progress = 0;
    let speed = 1;
    const tick = (_t: number, deltaMs: number) => {
      const target = hoverCount.current > 0 ? 0 : 1;
      speed += (target - speed) * 0.08; // smooth pause / resume
      progress = (progress + (deltaMs / 1000 / LOOP_SECONDS) * speed) % 1;
      for (let i = 0; i < N; i++) place(i, (progress + i / N) % 1);
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const pause = () => { hoverCount.current += 1; };
  const resume = () => { hoverCount.current = Math.max(0, hoverCount.current - 1); };

  return (
    <section className="relative mx-4 my-8 overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white to-[#F3EEFA] pt-24">
      {/* ── Header ── */}
      <div className="relative z-30 mx-auto max-w-2xl px-6 text-center">
        <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-purple-dark shadow-sm ring-1 ring-brand-purple/10">
          Our Services
        </span>
        <h2 className="mt-5 text-4xl font-bold leading-tight text-brand-purple-dark md:text-5xl">
          One App for{" "}
          <span className="text-brand-purple">Multiple Services</span>
        </h2>
        <p className="mx-auto mt-4 text-lg leading-relaxed text-brand-grey">
          Banking, payments, insurance, and more — sab kuch ek app mein, full
          commission ke saath.
        </p>

        <Link
          href="/services"
          className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-brand-purple px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand-purple/25 transition-all duration-300 hover:bg-brand-purple-dark"
        >
          Explore all services
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight size={15} />
          </span>
        </Link>
      </div>

      {/* ── Orbit stage ── */}
      <div ref={stageRef} className="relative mx-auto mt-15 h-[440px] max-w-6xl md:h-[500px]">
        {/* Center app tile */}
        <div className="absolute left-1/2 top-[54%] z-30 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#120B22] shadow-2xl shadow-brand-purple/30 ring-8 ring-white/60 md:h-32 md:w-32">
            <Wallet size={44} className="text-white" strokeWidth={1.8} />
          </div>
          <p className="mt-5 text-lg font-bold text-brand-purple-dark md:text-xl">
            60+ services
            <br />
            available and growing
          </p>
        </div>

        {/* Orbiting service bubbles — clickable, pause + label + color flip on hover */}
        {SERVICES.map(({ icon: Icon, title, desc, href }, i) => (
          <Link
            key={title}
            href={href}
            aria-label={title}
            ref={(el) => {
              bubbleRefs.current[i] = el;
            }}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
            className="group absolute left-0 top-0 z-0 -ml-8 -mt-8 block hover:z-40 focus-visible:z-40 md:-ml-9 md:-mt-9"
            style={{ willChange: "transform" }}
          >
            {/* Inner bubble carries the hover visuals (outer is GSAP-scaled) */}
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-brand-purple/15 ring-1 ring-black/5 transition-all duration-300 group-hover:bg-brand-purple group-hover:shadow-xl group-hover:shadow-brand-purple/30 group-hover:ring-brand-purple/30 md:h-[4.5rem] md:w-[4.5rem]">
              <Icon
                size={26}
                className="text-brand-purple transition-colors duration-300 group-hover:text-white"
              />
            </span>

            {/* Chat-bubble tooltip — pops from 0 to full size on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 w-56 origin-bottom -translate-x-1/2 scale-0 rounded-2xl bg-white p-4 text-left opacity-0 shadow-xl shadow-brand-purple/15 ring-1 ring-black/5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 md:w-64"
            >
              <span className="block text-sm font-bold text-brand-purple-dark md:text-base">
                {title}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-brand-grey md:text-sm">
                {desc}
              </span>
              {/* Tail pointing to the bubble */}
              <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-white" />
            </span>

            {/* Name — always visible below the bubble */}
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-center text-xs font-semibold text-brand-purple-dark transition-colors duration-300 group-hover:text-brand-purple md:text-sm">
              {title}
            </span>
          </Link>
        ))}
      </div>

      {/* ── Ground — full width of the panel, above the bubbles ── */}
      {/* Trimmed file at /public/images/home/ground.png */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44 md:h-60">
        <Image
          src="/images/home/ground.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}