"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Zap } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RangoliMandala from "@/components/svg/RangoliMandala";
import RangoliLotus from "@/components/svg/RangoliLotus";

gsap.registerPlugin(ScrollTrigger);

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.EzeePay_DigitalBharat&pli=1";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Initial states ── */
      gsap.set(".hero-rangoli-left", {
        xPercent: -14,
        yPercent: 22,
        rotate: 12,
        opacity: 0.9,
      });
      gsap.set(".hero-rangoli-right", {
        xPercent: 14,
        yPercent: 22,
        rotate: -12,
        opacity: 0.9,
      });
      gsap.set(".hero-ground-new", { yPercent: 100 });

      /* ── Rangoli draw-on-load (from zero) ── */
      const rangoliPaths = gsap.utils.toArray<SVGPathElement>(
        ".hero-rangoli-left .draw-path, .hero-rangoli-right .draw-path"
      );

      rangoliPaths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      // Strokes are now hidden — safe to reveal the SVGs (they ship invisible
      // in the markup so the server-rendered frame never shows them complete)
      gsap.set(".hero-rangoli-left, .hero-rangoli-right", {
        visibility: "visible",
      });

      gsap.to(rangoliPaths, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: "power2.out",
        stagger: 0.04,
        delay: 0.2,
      });

      /* ── Scroll timeline (pinned + scrubbed) ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl
        // 1) Headline block drifts up and fades
        .to(
          ".hero-headline, .hero-sub, .hero-ctas, .hero-trust",
          {
            yPercent: -40,
            opacity: 0,
            stagger: 0.03,
            ease: "power2.in",
          },
          0
        )

        // 2) Rangolis wheel away to the sides
        .to(
          ".hero-rangoli-left",
          { xPercent: -130, yPercent: 70, rotate: -50, ease: "power2.inOut" },
          0
        )
        .to(
          ".hero-rangoli-right",
          { xPercent: 130, yPercent: 70, rotate: 50, ease: "power2.inOut" },
          0
        )

        // 3) Dashboard rises to center stage and grows slightly
        .to(
          ".hero-dashboard",
          { yPercent: -56, scale: 1.08, ease: "power2.inOut" },
          0.05
        )

        // 4) New ground rises into place
        .to(".hero-ground-new", { yPercent: 18, ease: "power2.out" }, 0.35);
    }, sectionRef);

    const handleLoad = () => ScrollTrigger.refresh();
  window.addEventListener("load", handleLoad);

  return () => {
    ctx.revert();
    window.removeEventListener("load", handleLoad);
  };
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
          Join 10,00,000+ agents earning with AEPS, money transfer, bill
          payments, travel booking, and 60+ services — with minimum investment
          and zero working capital.
        </p>

        {/* CTAs */}
        <div className="hero-ctas mt-8 flex items-center justify-center gap-4">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-purple px-7 py-4 text-[16px] font-medium leading-none text-white
                       shadow-lg shadow-brand-purple/30"
          >
            Download App
          </a>
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
            10,00,000+ Agents
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

        {/* Dashboard — overflows the bottom edge */}
        <div className="hero-dashboard relative z-10 mx-auto mt-10 w-full max-w-5xl flex-1">
          <Image
            src="/images/hero/dashboard.png"
            alt="Ezeepay agent dashboard"
            width={1600}
            height={1000}
            priority
            className="w-full rounded-t-2xl shadow-2xl shadow-brand-purple/25"
          />
        </div>
      </div>

      {/* Foreground rangolis — ship invisible; GSAP reveals after hiding strokes */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div className="hero-rangoli-left invisible absolute bottom-0 left-0 w-[34vw] max-w-[520px] overflow-hidden">
          <RangoliMandala className="w-full scale-110 text-brand-purple" />
        </div>
        <div className="hero-rangoli-right invisible absolute bottom-0 right-0 w-[34vw] max-w-[520px] overflow-hidden">
          <RangoliLotus className="w-full scale-110 text-brand-purple" />
        </div>
      </div>

      {/* New ground — rises as the rangolis leave */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]">
        <Image
          src="/images/hero/ground-new.png"
          alt=""
          width={2400}
          height={500}
          className="hero-ground-new w-full"
        />
      </div>
      {/* Bottom fade transition into next section */}
<div
  className="pointer-events-none absolute inset-x-0 -bottom-px z-30 h-52"
  style={{
    background:
      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 25%, rgba(255,255,255,1) 50%)",
  }}
/>
    </section>
  );
}