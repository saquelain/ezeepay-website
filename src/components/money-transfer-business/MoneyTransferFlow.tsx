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

// How many fading circles trail behind the coin.
const TRAIL_COUNT = 4;

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
  const glowPathRef = useRef<SVGPathElement>(null);
  const coinRef = useRef<SVGGElement>(null);
  const trailRefs = useRef<(SVGCircleElement | null)[]>([]);
  const pulseRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const deliveredRef = useRef<HTMLSpanElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const glow = glowPathRef.current;
      const coin = coinRef.current;
      if (!path || !glow || !coin) return;

      if (reduceMotion) {
        // Path renders fully drawn by default; keep everything static.
        return;
      }

      const length = path.getTotalLength();

      // Ring ripple on a node + card highlight, called as the coin arrives.
      const pulseNode = (i: number) => {
        setActiveStep(i);
        const ring = pulseRefs.current[i];
        const badge = badgeRefs.current[i];
        if (ring) {
          gsap.fromTo(
            ring,
            { scale: 0.7, opacity: 0.8 },
            { scale: 2, opacity: 0, duration: 0.9, ease: "power2.out" }
          );
        }
        if (badge) {
          gsap.fromTo(
            badge,
            { scale: 1 },
            {
              scale: 1.08,
              duration: 0.16,
              yoyo: true,
              repeat: 1,
              ease: "power2.out",
            }
          );
        }
      };

      // "Delivered" chip that pops above the bank node on arrival.
      const deliveredFlash = () => {
        const chip = deliveredRef.current;
        if (!chip) return;
        gsap
          .timeline()
          .fromTo(
            chip,
            { opacity: 0, y: 10, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(2)" }
          )
          .to(chip, { opacity: 0, y: -6, duration: 0.4, delay: 1 });
      };

      // Place the coin (and its fading trail) at progress p along the path.
      const prog = { p: 0 };
      const setCoin = (p: number) => {
        const pt = path.getPointAtLength(p * length);
        gsap.set(coin, { x: pt.x, y: pt.y });
        trailRefs.current.forEach((c, i) => {
          if (!c) return;
          const tp = p - (i + 1) * 0.028;
          if (tp <= 0) {
            gsap.set(c, { opacity: 0 });
            return;
          }
          const tpt = path.getPointAtLength(tp * length);
          gsap.set(c, {
            attr: { cx: tpt.x, cy: tpt.y },
            opacity: 0.35 - i * 0.08,
          });
        });
      };
      setCoin(0);

      // The looping journey: retailer → (verify at Ezeepay) → bank.
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1 });
      loop
        .set(prog, { p: 0 })
        .call(() => {
          setCoin(0);
          pulseNode(0);
        })
        .fromTo(
          coin,
          { scale: 0, opacity: 0, transformOrigin: "center" },
          { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.5)" },
          0
        )
        .to(
          prog,
          {
            p: 0.5,
            duration: 1.3,
            ease: "power1.inOut",
            onUpdate: () => setCoin(prog.p),
          },
          0.3
        )
        .call(() => pulseNode(1))
        // Quick heartbeat while Ezeepay verifies the transaction.
        .to(coin, {
          scale: 1.3,
          duration: 0.16,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut",
        })
        .to(prog, {
          p: 1,
          duration: 1.3,
          ease: "power1.inOut",
          onUpdate: () => setCoin(prog.p),
        })
        .call(() => {
          pulseNode(2);
          deliveredFlash();
        })
        .to(coin, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          delay: 0.4,
          ease: "power2.in",
        });

      // Draw the line (and its soft glow) as the section scrolls in,
      // then hand off to the looping coin.
      gsap.set([path, glow], {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to([path, glow], {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 0.6,
          onLeave: () => loop.restart(),
          onEnterBack: () => {
            loop.pause(0);
            gsap.set(coin, { opacity: 0 });
            trailRefs.current.forEach((c) => c && gsap.set(c, { opacity: 0 }));
            setActiveStep(null);
          },
        },
      });

      // Nodes pop in, then float gently so the diagram feels alive.
      gsap.from(".flow-node", {
        scale: 0.6,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out(2.5)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
      gsap.to(".node-float", {
        y: -6,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.45 },
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
            className="w-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="flowGradient" x1="0" y1="0" x2="760" y2="0">
                <stop offset="0%" stopColor="#5B2D8E" />
                <stop offset="50%" stopColor="#5B2D8E" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
              <radialGradient id="coinFill" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="55%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" />
              </radialGradient>
              <radialGradient id="coinGlow">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
              </radialGradient>
              <filter id="pathBlur" x="-20%" y="-100%" width="140%" height="300%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* Faint dashed track — visible before the line draws itself */}
            <path
              d={FLOW_PATH}
              stroke="#5B2D8E"
              strokeOpacity="0.12"
              strokeWidth="2"
              strokeDasharray="3 8"
              strokeLinecap="round"
            />

            {/* Soft glow under the drawn line */}
            <path
              ref={glowPathRef}
              d={FLOW_PATH}
              stroke="url(#flowGradient)"
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.25"
              filter="url(#pathBlur)"
            />

            {/* The drawn line itself */}
            <path
              ref={pathRef}
              d={FLOW_PATH}
              stroke="url(#flowGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Comet trail behind the coin */}
            {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
              <circle
                key={i}
                ref={(el) => {
                  trailRefs.current[i] = el;
                }}
                r={4.5 - i * 0.8}
                fill="#F97316"
                opacity="0"
              />
            ))}

            {/* The ₹ coin that carries the transfer */}
            <g ref={coinRef} opacity="0">
              <circle r="20" fill="url(#coinGlow)" />
              <circle r="9.5" fill="url(#coinFill)" />
              <circle
                r="9.5"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.55"
                strokeWidth="1"
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="10"
                fontWeight="800"
                fill="#FFFFFF"
              >
                ₹
              </text>
            </g>
          </svg>

          {/* Nodes overlaid on the diagram */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
            {NODES.map((node, i) => (
              <div
                key={node.key}
                className="flow-node flex flex-col items-center gap-3"
              >
                <span className="node-float relative flex flex-col items-center">
                  {/* Ripple ring fired when the coin arrives */}
                  <span
                    ref={(el) => {
                      pulseRefs.current[i] = el;
                    }}
                    aria-hidden
                    className="absolute inset-0 rounded-2xl ring-2 ring-brand-orange opacity-0"
                  />
                  <span
                    ref={(el) => {
                      badgeRefs.current[i] = el;
                    }}
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
                  {/* "Delivered" chip — only rendered over the bank node */}
                  {node.key === "bank" && (
                    <span
                      ref={deliveredRef}
                      className="absolute -top-9 flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-md opacity-0"
                    >
                      <CheckCircle2 size={13} />
                      Delivered
                    </span>
                  )}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-purple-dark shadow-sm">
                  {node.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps — each card lights up as the coin reaches its node */}
        <div className="flow-steps mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const isActive = activeStep === i;
            return (
              <div
                key={s.number}
                className={`flow-step relative rounded-2xl bg-[#F7F5FB] p-7 transition-all duration-500 ${
                  isActive
                    ? "-translate-y-1 shadow-lg ring-2 ring-brand-orange/50"
                    : "ring-1 ring-brand-purple/10"
                }`}
              >
                <span
                  className={`text-3xl font-extrabold transition-colors duration-500 ${
                    isActive ? "text-brand-orange" : "text-brand-purple/20"
                  }`}
                >
                  {s.number}
                </span>
                <h3 className="mt-3 flex items-center gap-2 text-lg font-bold text-brand-purple-dark">
                  <CheckCircle2
                    size={18}
                    className={`transition-colors duration-500 ${
                      isActive ? "text-green-600" : "text-brand-orange"
                    }`}
                  />
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-grey">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}