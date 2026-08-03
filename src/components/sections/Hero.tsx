"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Zap } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

    const sectionRef = useRef<HTMLElement>(null);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // Initial states (the offsets we removed from Tailwind)
    gsap.set(".hero-grass-left", { xPercent: -6, yPercent: 12 });
    gsap.set(".hero-grass-right", { xPercent: 6, yPercent: 12, scaleX: -1 });
    gsap.set(".hero-ground-new", { yPercent: 100 });

    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        },
      });

    tl
      // 1) Headline block drifts up and fades
      .to(".hero-headline, .hero-sub, .hero-ctas, .hero-trust", {
        yPercent: -40,
        opacity: 0,
        stagger: 0.03,
        ease: "power2.in",
      }, 0)

      // 2) Grass parts away to the sides and sinks
      .to(".hero-grass-left", { xPercent: -110, yPercent: 60, ease: "power2.inOut" }, 0)
      .to(".hero-grass-right", { xPercent: 110, yPercent: 60, ease: "power2.inOut" }, 0)

      // 3) Dashboard pops: slides up to center stage and settles slightly smaller
      .to(".hero-dashboard", {
        yPercent: -56,
        scale: 1.08,
        ease: "power2.inOut",
      }, 0.05)

      // 4) New ground rises into place
      .to(".hero-ground-new", { yPercent: 18, ease: "power2.out" }, 0.35);
  }, sectionRef);

  return () => ctx.revert();
}, []);


  return (
    <section
    ref={sectionRef}
  id="hero"
  className="relative flex h-[100svh] flex-col overflow-hidden rounded-b-[2.5rem]
           bg-gradient-to-b from-[#EDE7F8] via-[#E3D9F5] to-[#D9CCF2]"
>
<div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-14 text-center">
        {/* Headline */}
        <h1 className="hero-headline mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight text-brand-purple-dark md:text-7xl">
          Banking For The New{" "}
          <span className="text-brand-purple">डिजिटल भारत</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-grey">
          Join 5,00,000+ agents earning with AEPS, money transfer, bill
          payments, travel booking, and 60+ services — with minimum investment
          and zero working capital.
        </p>

        {/* CTAs */}
        <div className="hero-ctas mt-8 flex items-center justify-center gap-4">
          <Link
            href="/download"
            className="rounded-full bg-brand-purple px-7 py-4 text-[16px] font-medium leading-none text-white
                       shadow-lg shadow-brand-purple/30"
          >
            Download App
          </Link>
          <Link
            href="/join"
            className="rounded-full border border-black/10 bg-white px-7 py-4 text-[16px] font-medium leading-none text-black"
          >
            Become An Agent
          </Link>
        </div>

        {/* Trust strip */}
        <div className="hero-trust mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] font-medium text-brand-purple-dark">
          <span className="flex items-center gap-2">
            <Star size={18} className="fill-amber-400 text-amber-400" />
            5,00,000+ Agents
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-green-600" />
            Bank-level security
          </span>
          <span className="flex items-center gap-2">
            <Zap size={18} className="text-brand-purple" />
            60+ Services, One App
          </span>
        </div>

        {/* Dashboard — overflows the bottom edge, grass overlaps it */}
<div className="hero-dashboard relative z-10 mx-auto mt-10 w-full max-w-5xl flex-1">
  <Image
    src="/images/hero/dashboard.png"
    alt="Ezeepay agent dashboard"
    width={1600}
    height={1000}
    priority
    className="w-full rounded-t-2xl shadow-2xl shadow-brand-purple/25 ring-1 ring-black/5"
  />
</div>
      </div>

      {/* Foreground grass — overlaps the dashboard bottom */}
<div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
  <Image
    src="/images/hero/grass-right.png"
    alt=""
    width={900}
    height={600}
    priority
    className="hero-grass-left absolute bottom-0 left-0 w-[58%] max-w-none"
  />
  <Image
    src="/images/hero/grass-right.png"
    alt=""
    width={900}
    height={600}
    priority
    className="hero-grass-right absolute bottom-0 right-0 w-[58%] max-w-none"
  />
</div>

{/* New ground — slides up as the grass leaves */}
<div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]">
  <Image
    src="/images/hero/ground-new.png"
    alt=""
    width={2400}
    height={500}
    className="hero-ground-new w-full"
  />
</div>

      {/* Spacer so grass has room to overlap */}
    </section>
  );
}