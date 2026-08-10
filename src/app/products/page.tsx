"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PRODUCTS } from "./data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProductsPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".product-panel");

        panels.forEach((panel, i) => {
          const isLast = i === panels.length - 1;
          const fromLeft = i % 2 === 0;
          const scene = panel.querySelector<HTMLElement>(".scene");
          const sceneInner = panel.querySelector<HTMLElement>(".scene > div");
          const text = panel.querySelector<HTMLElement>(".panel-text");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: isLast ? "+=100%" : "+=200%",
              scrub: 0.6,
              pin: true,
              pinSpacing: isLast, // last panel uses normal spacing
            },
          });

          tl.fromTo(
            scene,
            { width: "100%" },
            { width: "50%", ease: "power2.inOut", duration: 1 }
          )
            .fromTo(
              sceneInner,
              { borderRadius: 0 },
              { borderRadius: 24, ease: "power2.inOut", duration: 1 },
              "<"
            )
            .fromTo(
              text,
              { autoAlpha: 0, x: fromLeft ? 80 : -80 },
              { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.6 },
              "-=0.4"
            );

          // dead time: panel holds still while the next one covers it
          if (!isLast) {
            tl.to({}, { duration: 1 });
          }
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="bg-[#F7F5FC] text-[#1D1D2B]">
      {/* Intro hero */}
      <section className="flex h-[70vh] flex-col items-center justify-center px-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F47B20]">
          Our products
        </span>
        <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-tight text-[#2D2B6B] md:text-6xl">
          Hardware that powers{" "}
          <span className="text-[#F47B20]">Digital Bharat</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-[#6B7280]">
          Four devices. Every banking service. Built for the toughest corners
          of India.
        </p>
      </section>

      {/* Product panels */}
      <div className="products-wrapper relative">
        {PRODUCTS.map((p, i) => {
          const fromLeft = i % 2 === 0; // 01 & 03 dock left, 02 & 04 dock right
          return (
            <Fragment key={p.id}>
              <section
                className="product-panel relative h-screen overflow-hidden bg-[#F7F5FC]"
                style={{ zIndex: i + 1 }}
              >
                {/* Scene (image side) */}
                <div
                  className={`scene absolute top-0 h-full w-full overflow-hidden lg:p-4 ${
                    fromLeft ? "left-0" : "right-0"
                  }`}
                >
                  <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EDE9FA] via-[#E3DDF7] to-[#D5CCF2]">
                    {/* soft glows */}
                    <div className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#F47B20]/10 blur-[100px]" />
                    <div className="pointer-events-none absolute left-0 top-0 h-[280px] w-[280px] rounded-full bg-white/60 blur-[90px]" />
                    {/* ghosted product name */}
                    <span className="pointer-events-none absolute select-none text-[16vw] font-bold leading-none text-[#2D2B6B]/[0.05] lg:text-[9vw]">
                      {p.name.split(" ")[0]}
                    </span>
                    {/* device image */}
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={520}
                      height={420}
                      className="scene-img relative z-10 w-[70%] max-w-[480px] object-contain drop-shadow-[0_30px_50px_rgba(45,43,107,0.25)]"
                    />
                    {/* index number */}
                    <span className="absolute left-8 top-8 font-mono text-sm text-[#2D2B6B]/50">
                      {p.index} / 04
                    </span>
                  </div>
                </div>

                {/* Text column */}
                <div
                  className={`panel-text absolute top-0 hidden h-full w-1/2 items-center lg:flex ${
                    fromLeft ? "right-0 justify-start" : "left-0 justify-end"
                  }`}
                >
                  <div className="max-w-md px-12 xl:px-16">
                    <span className="font-mono text-sm text-[#F47B20]">
                      {p.index}
                    </span>
                    <h2 className="mt-3 text-4xl font-bold text-[#2D2B6B] xl:text-5xl">
                      {p.name}
                    </h2>
                    <p className="mt-1 text-lg text-[#F47B20]">{p.tagline}</p>
                    <p className="mt-6 leading-relaxed text-[#4D585F]">
                      {p.description}
                    </p>
                    <ul className="mt-6 flex flex-col gap-3">
                      {p.specs.map((s) => (
                        <li
                          key={s}
                          className="flex items-start gap-3 text-[#1D1D2B]/80"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F47B20]" />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-8 rounded-full bg-[#2D2B6B] px-7 py-3.5 font-medium text-white shadow-lg shadow-[#2D2B6B]/20 transition-transform duration-300 hover:-translate-y-0.5">
                      Order now
                    </button>
                  </div>
                </div>
              </section>

              {/* scroll room for the cover effect (desktop only) */}
              {i < PRODUCTS.length - 1 && (
                <div aria-hidden className="hidden h-screen lg:block" />
              )}
            </Fragment>
          );
        })}
      </div>
    </main>
  );
}