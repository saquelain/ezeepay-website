"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fingerprint } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function MicroAtmWhyNeeded() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".micro-atm-why-copy > *", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });

        gsap.from(".micro-atm-why-media", {
          scale: 0.92,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });

        gsap.to(".micro-atm-why-media-inner", {
          y: -16,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* ── Left — device photo ── */}
        <div className="micro-atm-why-media relative order-2 mx-auto w-full max-w-md lg:order-1">
          <div className="micro-atm-why-media-inner relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F1] p-10 ring-1 ring-black/5">
            <div className="relative aspect-square w-full">
              <Image
                src="/images/services/micro-atm/why-needed-device.png"
                alt="Ezeepay Micro ATM device"
                fill
                sizes="(min-width: 1024px) 36vw, 80vw"
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Floating device chip */}
          <div className="absolute -bottom-5 -right-4 flex items-center gap-2.5 rounded-2xl bg-brand-purple-dark px-4 py-3 shadow-xl sm:-right-8">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
              <Fingerprint size={16} />
            </span>
            <span className="text-xs font-semibold leading-tight text-white">
              Aadhaar Enabled
              <br />
              Device Ready
            </span>
          </div>
        </div>

        {/* ── Right — copy ── */}
        <div className="micro-atm-why-copy order-1 lg:order-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-purple-dark md:text-4xl">
            Why is there a growing need for{" "}
            <span className="text-brand-purple">micro ATMs?</span>
          </h2>

          <p className="mt-6 leading-relaxed text-brand-grey">
            The way we perform banking transactions is changing thanks to
            micro ATMs. Due to these mobile devices, even the most remote
            places are now convenient and reachable, which closes the
            accessibility gap between traditional banking services and
            underserved people. Users of Micro ATMs may do fundamental
            banking operations, including cash withdrawals, balance
            inquiries, and money transfers, without going to a real branch
            using these devices. Customers may access various financial
            services from the comfort of their smartphones due to the smooth
            and user-friendly interface provided by the Ezeepay banking
            services app. We allow people to manage their funds wherever and
            whenever they want due to its safe and effective features.
          </p>
        </div>
      </div>
    </section>
  );
}