"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Enter Details",
    desc: "Retailer enters the recipient's bank account and amount.",
  },
  {
    number: "02",
    title: "Instant Processing",
    desc: "Ezeepay routes and verifies the transaction in real time.",
  },
  {
    number: "03",
    title: "Money Delivered",
    desc: "Funds land in the recipient's account within seconds.",
  },
];

// Path from the retailer node, through the Ezeepay node, to the bank node.
const FLOW_PATH = "M 40 100 C 160 20, 260 20, 380 100 S 600 180, 720 100";

const NODES = [
    {
      key: "retailer",
      label: "Retailer",
      image: "/images/services/money-transfer-business/node-retailer.png",
      badge: "h-24 w-24 md:h-28 md:w-28",
      scale: "scale-150",
    },
    {
      key: "ezeepay",
      label: "Ezeepay",
      image: "/ezeepay-logo.png",
      badge: "h-24 w-40 md:h-28 md:w-48", // wide, not square — fits the wordmark
      scale: "scale-100",
      fit: "object-contain p-3", // no crop, just padded to breathe
    },
    {
      key: "bank",
      label: "Recipient Bank",
      image: "/images/services/money-transfer-business/node-bank.png",
      badge: "h-24 w-24 md:h-28 md:w-28",
      scale: "scale-150",
    },
  ];

export default function MoneyTransferFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotWrapRef = useRef<SVGGElement>(null);
  const [dotActive, setDotActive] = useState(false);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        setDotActive(true);
        return;
      }

      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 0.6,
          onLeave: () => setDotActive(true),
          onEnterBack: () => setDotActive(false),
        },
      });

      gsap.from(".flow-node", {
        scale: 0.6,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out(2.5)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });

      gsap.from(".flow-step", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: ".flow-steps", start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-[380px] max-w-4xl rounded-full bg-brand-purple-light blur-[130px] opacity-40"
      />

      <div className="relative mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand-purple/15 bg-white px-5 py-2 text-sm font-medium text-brand-purple shadow-sm">
            How It Works
          </span>
          <h2 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-purple-dark md:text-5xl">
            From Shop Counter to{" "}
            <span className="text-brand-orange">Bank Account</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brand-grey">
            Watch how a transfer moves through Ezeepay — verified, routed,
            and settled in seconds.
          </p>
        </div>

        {/* Diagram */}
        <div className="relative mx-auto mt-24 max-w-4xl md:mt-28">
          <svg
            viewBox="0 0 760 200"
            className="w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d={FLOW_PATH}
              stroke="url(#flowGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="flowGradient" x1="0" y1="0" x2="760" y2="0">
                <stop offset="0%" stopColor="#5B2D8E" />
                <stop offset="50%" stopColor="#5B2D8E" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
              <radialGradient id="dotGlow">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Traveling dot — native SVG motion, gated by dotActive */}
            {dotActive && (
              <g ref={dotWrapRef}>
                <circle r="14" fill="url(#dotGlow)">
                  <animateMotion
                    dur="3.2s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#flow-mpath" />
                  </animateMotion>
                </circle>
                <circle r="5" fill="#F97316">
                  <animateMotion
                    dur="3.2s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#flow-mpath" />
                  </animateMotion>
                </circle>
              </g>
            )}
            <path id="flow-mpath" d={FLOW_PATH} className="hidden" />
          </svg>

          {/* Nodes overlaid on the diagram */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
          {NODES.map((node) => (
            <div
                key={node.key}
                className="flow-node flex flex-col items-center gap-3"
            >
                <span
                className={`relative ${node.badge} shrink-0 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-brand-purple/10`}
                >
                <Image
                    src={node.image}
                    alt={node.label}
                    fill
                    sizes="192px"
                    className={node.fit ?? `object-contain ${node.scale}`}
                />
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-purple-dark shadow-sm">
                {node.label}
                </span>
            </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="flow-steps mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.number}
              className="flow-step relative rounded-2xl bg-[#F7F5FB] p-7 ring-1 ring-brand-purple/10"
            >
              <span className="text-3xl font-extrabold text-brand-purple/20">
                {s.number}
              </span>
              <h3 className="mt-3 flex items-center gap-2 text-lg font-bold text-brand-purple-dark">
                <CheckCircle2 size={18} className="text-brand-orange" />
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-grey">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}