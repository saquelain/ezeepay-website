"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, PlayCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Replace VIDEO_ID with the actual YouTube video id (the part after v= in the URL)
const YOUTUBE_VIDEO_ID = "2eQMA-kgljY";

export default function AepsVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".aeps-video-copy > *", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        });

        gsap.from(".aeps-video-frame", {
          scale: 0.94,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        });

        gsap.from(".aeps-video-strip", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".aeps-video-strip", start: "top 88%" },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy */}
          <div className="aeps-video-copy">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
              <PlayCircle size={13} />
              See It In Action
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-brand-purple-dark md:text-4xl">
              Simplify AePS Registration
              <br />
              Process <span className="text-brand-purple">With Ezeepay</span>
            </h2>

            <p className="mt-6 max-w-xl leading-relaxed text-brand-grey">
              Say goodbye to complicated procedures and paperwork. Our
              user-friendly interface and easy steps guide you effortlessly
              through the entire registration process — watch how simple it
              really is.
            </p>
          </div>

          {/* Right — YouTube embed */}
          <div className="aeps-video-frame relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl shadow-black/10 ring-1 ring-black/5">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="AEPS Services with Ezeepay"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>

        {/* ── Sign-up strip ── */}
        <div className="aeps-video-strip relative mt-16 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-purple via-brand-purple-dark to-[#120B22] px-8 py-8 md:flex-row md:items-center md:px-12 md:py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 right-10 h-56 w-56 rounded-full bg-brand-orange/20 blur-[100px]"
          />
          <div className="relative">
            <h3 className="text-xl font-bold text-white md:text-2xl">
              Become an AePS Agent With Ezeepay
            </h3>
            <p className="mt-1.5 text-sm text-white/80">
              Become a retailer and earn up to &#8377;1 Lakh per month.
            </p>
          </div>

          <a
            href="#"
            className="relative inline-flex shrink-0 items-center gap-2.5 rounded-full bg-brand-orange px-7 py-3.5 text-[15px] font-semibold leading-none text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
          >
            Sign Up Now
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
