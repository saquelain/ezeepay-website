"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileCheck, Lock, Scale, Headset, Globe, Mail, Phone, Check } from "lucide-react";
import ShieldDoodle from "@/components/svg/ShieldDoodle";

gsap.registerPlugin(ScrollTrigger);

const COMPLIANCE_POINTS = [
  {
    icon: FileCheck,
    title: "D-U-N-S Registered",
    desc: "A registered brand of MJ Digital Services Pvt Ltd — verified business identity.",
  },
  {
    icon: Lock,
    title: "Bank-grade Encryption",
    desc: "Every transaction secured end to end, on BBPS and NPCI-certified rails.",
  },
  {
    icon: Scale,
    title: "RBI-regulated Lending Partners",
    desc: "Transparent disclosure, grievance redressal, and published portfolio data.",
  },
  {
    icon: Headset,
    title: "12x7 Help Desk",
    desc: "Real people, real support — in your language, every single day.",
  },
];

const BADGES = ["D-U-N-S", "BBPS", "AEPS / NPCI", "UPI"];

export default function TrustSecurity() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Doodle shield draws as the timeline is scrolled through ──
      const drawPaths = gsap.utils.toArray<SVGPathElement>(
        ".shield-stage .draw-path"
      );
      if (drawPaths.length) {
        drawPaths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });

        gsap.to(drawPaths, {
          strokeDashoffset: 0,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".trust-steps",     // driven by the SAME scroll range as the timeline
            start: "top 70%",
            end: "bottom 45%",
            scrub: 1,
          },
        });

        gsap.fromTo(
          ".shield-glow",
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".trust-steps",
              start: "top 55%",
              end: "bottom 45%",
              scrub: 1,
            },
          }
        );
      }

      // ── Progress line fills with scroll ──
      gsap.fromTo(
        ".trust-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".trust-steps",
            start: "top 70%",
            end: "bottom 45%",
            scrub: 1,
          },
        }
      );

      // ── Steps activate as the line reaches them ──
      gsap.utils.toArray<HTMLElement>(".trust-step").forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "top 40%",
          onEnter: () => step.classList.add("is-active"),
          onLeaveBack: () => step.classList.remove("is-active"),
        });

        gsap.from(step, {
          x: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 80%" },
        });
      });

      // Badge pills pop in
      gsap.from(".trust-pill", {
        scale: 0.6,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.8)",
        stagger: 0.1,
        scrollTrigger: { trigger: ".trust-pills", start: "top 85%" },
      });

      // Disclosure card — calm fade
      gsap.from(".disclosure-card", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".disclosure-card", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mx-4 rounded-[2.5rem] bg-[#120B22] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-2">
          {/* ── Left: sticky header + doodle shield + badges ── */}
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
              <span className="text-[#C4B5FD]">Aapka Paisa, Aapka Bharosa —</span>
              <br />
              Hamari Zimmedari
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
              Every transaction on Ezeepay runs on a robust, highly secure, and
              fully compliant framework.
            </p>

            {/* Shield draws as you scroll the timeline */}
            <div className="shield-stage relative mt-8 flex h-72 items-center justify-center">
              <div className="shield-glow absolute h-52 w-52 rounded-full bg-brand-purple/25 blur-3xl" />
              <ShieldDoodle className="relative h-64 w-auto text-[#C4B5FD]" />
            </div>

            <div className="trust-pills mt-6 flex flex-wrap justify-center gap-3">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="trust-pill rounded-full border border-white/15 bg-white/5 px-5 py-2.5
                             text-sm font-semibold text-white/90 backdrop-blur"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: verification timeline ── */}
          <div className="trust-steps relative md:py-10">
            {/* Track + scroll-filled progress line */}
            <div className="absolute bottom-8 left-[23px] top-8 w-px bg-white/10" />
            <div
              className="trust-progress absolute bottom-8 left-[22.5px] top-8 w-0.5 origin-top
                         bg-gradient-to-b from-[#C4B5FD] to-[#4ADE80]"
            />

            <div className="space-y-16">
              {COMPLIANCE_POINTS.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="trust-step group relative flex gap-6">
                    {/* Node */}
                    <div
                      className="trust-node relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center
                                 rounded-full border border-white/15 bg-[#1C1230]
                                 transition-all duration-500
                                 [.is-active_&]:border-[#4ADE80]/60 [.is-active_&]:bg-[#4ADE80]/10"
                    >
                      <Icon
                        size={20}
                        className="text-white/40 transition-colors duration-500 [.is-active_&]:text-[#4ADE80]"
                      />
                    </div>

                    <div className="pt-1.5">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-white/50 transition-colors duration-500 [.is-active_&]:text-white">
                        {p.title}
                        <Check
                          size={18}
                          className="text-[#4ADE80] opacity-0 transition-all duration-500 [.is-active_&]:opacity-100"
                        />
                      </h3>
                      <p className="mt-2 max-w-sm leading-relaxed text-white/40 transition-colors duration-500 [.is-active_&]:text-white/65">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Lending partner disclosure ── */}
        <div className="disclosure-card mx-auto mt-24 max-w-3xl rounded-3xl bg-white p-8 text-brand-purple-dark ring-1 ring-white/10 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-grey">
            Our Lending Partner
          </p>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Arthmate</h3>
              <p className="mt-1 text-sm text-brand-grey">
                Grievance Redressal Officer: Ms. Deepika Rawat
              </p>
            </div>
            <div className="space-y-1.5 text-sm text-brand-grey">
              <p className="flex items-center gap-2">
                <Globe size={15} className="text-brand-purple" />
                <a
                  href="https://www.arthmate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-purple"
                >
                  www.arthmate.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={15} className="text-brand-purple" />
                <a
                  href="mailto:statutory.compliance@arthmate.com"
                  className="hover:text-brand-purple"
                >
                  statutory.compliance@arthmate.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-brand-purple" />
                <a href="tel:+917835009643" className="hover:text-brand-purple">
                  +91 7835009643
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-black/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F7F5FB] text-left text-brand-purple-dark">
                  <th className="px-4 py-3 font-semibold">Portfolio Count</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Portfolio Amount
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">In Crores</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-black/10">
                  <td className="px-4 py-3">1</td>
                  <td className="px-4 py-3 text-right font-medium">
                    ₹38,39,603.73
                  </td>
                  <td className="px-4 py-3 text-right font-medium">₹0.38 Cr</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-brand-grey">As of 2nd July</p>
        </div>
      </div>
    </section>
  );
}