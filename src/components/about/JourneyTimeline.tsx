"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Flag, MoveRight, Store, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Content extracted from the client's Our Journey PDF ── */
type Stat = { label: string; value: number; prefix?: string; suffix?: string };
type Milestone = {
  year: string;
  title: string;
  desc: string;
  stats: Stat[];
  image: string;
  projected?: boolean;
};

const MILESTONES: Milestone[] = [
    {
      year: "2018",
      title: "The Beginning of a Revolutionary Journey",
      desc: "MJ Digital Services Private Limited launched its flagship brand, Ezeepay — onboarding over 1,500 retailers and introducing essential services like AEPS and Money Transfer, with a vision to bridge financial gaps in rural areas and create additional income for rural shopkeepers.",
      stats: [
        { label: "Active Retailers", value: 1300 },
        { label: "Transaction Volume", value: 12, prefix: "₹", suffix: " Cr" },
      ],
      image: "/images/journey/2018-beginning.png",
    },
    {
      year: "2019",
      title: "Expanding Horizons with New Services",
      desc: "A year of growth and innovation — the network expanded to over 6,500 retailers, we introduced Recharge, Flight & Hotel Booking, strengthened our rural presence, and launched our distributor network with 200 active distributors.",
      stats: [
        { label: "Active Retailers", value: 5000 },
        { label: "Transaction Volume", value: 60, prefix: "₹", suffix: " Cr" },
      ],
      image: "/images/journey/2019-expanding.png",
    },
    {
      year: "2020",
      title: "Empowering Retailers and Customers Alike",
      desc: "During the pandemic, rush-free banking became essential in rural areas. Ezeepay answered with zero-touch banking, crossed 100,000 retailers, introduced the Ezeepay Micro ATM, and empowered 1,000 dedicated distributors.",
      stats: [
        { label: "Active Retailers", value: 49550 },
        { label: "Transaction Volume", value: 300, prefix: "₹", suffix: " Cr" },
      ],
      image: "/images/journey/2020-empowering.png",
    },
    {
      year: "2021",
      title: "Scaling New Heights with Innovation",
      desc: "Another challenging pandemic year became a period of scaling and diversification — 300,000+ retailers, new offerings like Micro Finance and E-Governance, and a presence across 5,000 pincodes made Ezeepay a trusted name in rural India.",
      stats: [
        { label: "Active Retailers", value: 70000 },
        { label: "Transaction Volume", value: 900, prefix: "₹", suffix: " Cr" },
      ],
      image: "/images/journey/2021-scaling.png",
    },
    {
      year: "2022",
      title: "Commitment to Growth and Excellence",
      desc: "The retailer network crossed 500,000 with advanced distributor modules and PAN card services, setting new transaction records — and actor Mr. Jimmy Shergill signed on as brand ambassador, strengthening our brand presence.",
      stats: [
        { label: "Active Retailers", value: 98000 },
        { label: "Transaction Volume", value: 2200, prefix: "₹", suffix: " Cr" },
      ],
      image: "/images/journey/2022-commitment.png",
    },
    {
      year: "2023",
      title: "Strengthening Our Leadership Position",
      desc: "An impressive milestone of 650,000 retailers, the launch of the Block Level Franchise to empower rural business owners, 5,000+ distributors, and record-breaking transaction volume backed by campaigns with our brand ambassador.",
      stats: [
        { label: "Active Retailers", value: 120000 },
        { label: "Transaction Volume", value: 3000, prefix: "₹", suffix: " Cr" },
      ],
      image: "/images/journey/2023-leadership.png",
    },
    {
      year: "2024",
      title: "Achieving Unparalleled Success Across India",
      desc: "A historic year — Ezeepay surpassed 750,000 retailers, opened multiple offices nationwide, and introduced the Physical Verification Team for the new KYC model, reinforcing our position as a leading fintech service provider.",
      stats: [
        { label: "Active Retailers", value: 160000 },
        { label: "Transaction Volume", value: 5400, prefix: "₹", suffix: " Cr" },
      ],
      image: "/images/journey/2024-success.png",
    },
    {
      year: "2025",
      title: "Reaching Every Corner of India",
      desc: "Ezeepay aims to cover all 19,000 pincodes across India and expand to over 1.5 million retailers — integrating AI banking features to revolutionise how banking services reach rural communities.",
      stats: [{ label: "Expected Transaction Volume", value: 7500, prefix: "₹", suffix: " Cr" }],
      image: "/images/journey/2025-reaching.png",
      projected: true,
    },
    {
      year: "2026",
      title: "Advancing with Technology and Innovation",
      desc: "A major technological leap — advanced technologies and upgraded services for greater operational efficiency, with a retailer base exceeding 3 million delivering smarter, faster financial solutions nationwide.",
      stats: [{ label: "Expected Transaction Volume", value: 10000, prefix: "₹", suffix: " Cr" }],
      image: "/images/journey/2026-advancing.png",
      projected: true,
    },
    {
      year: "2027",
      title: "Dominating the Fintech Landscape",
      desc: "Ezeepay is set to become a dominant force in Indian fintech — an all-encompassing range of financial services making us the go-to platform for every financial need, impacting millions of lives.",
      stats: [{ label: "Expected Transaction Volume", value: 15000, prefix: "₹", suffix: " Cr" }],
      image: "/images/journey/2027-dominating.png",
      projected: true,
    },
  ];

/* ── Layout constants (shared by panels and the road SVG) ── */
const INTRO_W = 560;
const PANEL_W = 620;
const STAGE_H = 520;

/* Hand-tuned so the road meanders organically instead of a strict zig-zag
   (deterministic — same on server and client) */
const NODE_YS = [150, 360, 205, 395, 140, 330, 255, 405, 165, 345];
const NODE_XJ = [0, -45, 35, -20, 50, -35, 15, -50, 40, 0];

const TRACK_W = INTRO_W + PANEL_W * MILESTONES.length;

/* Node positions + smooth road path through them */
const points = MILESTONES.map((_, i) => ({
  x: INTRO_W + i * PANEL_W + PANEL_W / 2 + NODE_XJ[i % NODE_XJ.length],
  y: NODE_YS[i % NODE_YS.length],
}));

function roadPath() {
  const pts = [{ x: -80, y: points[0].y }, ...points, { x: TRACK_W + 80, y: points[points.length - 1].y }];
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1];
    const q = pts[i];
    const dx = (q.x - p.x) * 0.5;
    d += ` C ${p.x + dx} ${p.y}, ${q.x - dx} ${q.y}, ${q.x} ${q.y}`;
  }
  return d;
}
const ROAD_D = roadPath();

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const track = trackRef.current!;
        let activeIdx = -1;

        /* Pin the section; vertical scroll drives horizontal travel */
        const horiz = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
            onUpdate(self) {
              /* Progress bar + active year */
              if (barRef.current) gsap.set(barRef.current, { scaleX: self.progress });
              const idx = Math.min(
                MILESTONES.length - 1,
                Math.floor(self.progress * MILESTONES.length)
              );
              if (idx !== activeIdx) {
                activeIdx = idx;
                yearRefs.current.forEach((el, i) => {
                  if (!el) return;
                  el.classList.toggle("text-brand-orange", i === idx);
                  el.classList.toggle("font-bold", i === idx);
                  el.classList.toggle("text-brand-grey", i !== idx);
                });
              }
            },
          },
        });

        /* Per-card reveals + stat count-ups inside the moving track */
        gsap.utils.toArray<HTMLElement>(".jt-card").forEach((card) => {
          /* Grow out of the road marker: origin faces the node */
          const origin =
            card.dataset.origin === "top" ? "50% -40px" : "50% calc(100% + 40px)";
          /* Hidden from the start — this only runs in the pinned desktop context,
             so cards are never visible before their pop */
          gsap.set(card, { autoAlpha: 0, scale: 0, transformOrigin: origin });
          gsap.to(card, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horiz,
              start: "left 82%",
              once: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".jt-num").forEach((el) => {
          const value = Number(el.dataset.value || 0);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: value,
              duration: 1.4,
              ease: "power1.out",
              snap: { textContent: 1 },
              immediateRender: false,
              scrollTrigger: {
                trigger: el,
                containerAnimation: horiz,
                start: "left 80%",
                once: true,
              },
              onUpdate() {
                el.textContent = prefix + fmt(Number(el.textContent)) + suffix;
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* ════════ Desktop: pinned horizontal road ════════ */}
      <section
        ref={sectionRef}
        className="relative hidden overflow-hidden bg-[#F7F5FB] lg:flex lg:h-screen lg:flex-col lg:justify-center"
        >
        {/* Doodle background — tiled, low opacity, purple bg shows through */}
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.14]"
            style={{
            backgroundImage: "url('/images/journey/doodle-bg.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "420px auto",
            }}
        />

        {/* Header + progress (stays put while the road travels) */}
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple">
                <Flag size={13} />
                Our Journey
              </span>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-brand-purple-dark md:text-5xl">
                From Vision to <span className="text-brand-purple">Victory</span>
              </h2>
            </div>
            <p className="hidden max-w-sm pb-2 text-right text-brand-grey xl:block">
              Revolutionizing fintech, one milestone at a time — scroll to travel
              the road from 2018 to 2027.
            </p>
          </div>

          {/* Year rail + progress bar */}
          <div className="mt-8">
            <div className="flex justify-between">
              {MILESTONES.map((m, i) => (
                <button
                  key={m.year}
                  ref={(el) => {
                    yearRefs.current[i] = el;
                  }}
                  className="text-sm text-brand-grey transition-colors"
                  tabIndex={-1}
                >
                  {m.year}
                </button>
              ))}
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-brand-purple/10">
              <div
                ref={barRef}
                className="h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-purple to-brand-orange"
              />
            </div>
          </div>
          </div>

        {/* The travelling road */}
        <div className="relative z-10 mt-10">
          <div ref={trackRef} className="relative flex" style={{ width: TRACK_W, height: STAGE_H }}>
            {/* Road SVG spanning the whole track */}
            <svg
              width={TRACK_W}
              height={STAGE_H}
              viewBox={`0 0 ${TRACK_W} ${STAGE_H}`}
              className="pointer-events-none absolute inset-0"
              aria-hidden
            >
              {/* Asphalt */}
              <path d={ROAD_D} fill="none" stroke="#1D1D2E" strokeWidth="46" strokeLinecap="round" />
              {/* Center dashes */}
              <path
                d={ROAD_D}
                fill="none"
                stroke="#fff"
                strokeWidth="3.5"
                strokeDasharray="20 26"
                strokeLinecap="round"
              />
              {/* Milestone markers */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="15" fill="#F47B20" stroke="#fff" strokeWidth="4" />
                  <circle cx={p.x} cy={p.y} r="5" fill="#fff" />
                  {MILESTONES[i].projected && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="24"
                      fill="none"
                      stroke="#F47B20"
                      strokeWidth="2"
                      strokeDasharray="5 6"
                      opacity="0.7"
                    />
                  )}
                </g>
              ))}
            </svg>

            {/* Intro panel */}
            <div
              className="relative flex flex-shrink-0 flex-col justify-center pl-10 pr-6"
              style={{ width: INTRO_W }}
            >
              <p className="text-6xl font-black leading-none text-brand-purple-dark/10">2018 → 2027</p>
              <p className="mt-4 max-w-xs text-lg font-semibold text-brand-purple-dark">
                Ten years. One road. Har gaon tak.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange">
                Scroll to begin the journey <MoveRight size={16} />
              </p>
            </div>

            {/* Milestone panels */}
            {MILESTONES.map((m, i) => {
              const node = points[i];
              const cardBelow = node.y < STAGE_H / 2; // node rides high → card below
              const jitter = NODE_XJ[i % NODE_XJ.length];
              return (
                <div
                  key={m.year}
                  className="relative flex-shrink-0"
                  style={{ width: PANEL_W }}
                >
                  {/* Big year beside the marker */}
                  <p
                    className={`absolute left-1/2 -translate-x-1/2 text-3xl font-black tracking-tight ${
                      m.projected ? "text-brand-orange" : "text-brand-purple-dark"
                    }`}
                    style={{
                      top: cardBelow ? node.y - 74 : node.y + 32,
                      marginLeft: jitter,
                    }}
                  >
                    {m.year}
                  </p>

                  {/* Card on the opposite side of the road */}
                  <div
                    className="jt-card absolute left-1/2 w-[560px] -translate-x-1/2 rounded-3xl bg-white p-7 shadow-xl shadow-brand-purple/10 ring-1 ring-black/5"
                    data-origin={cardBelow ? "top" : "bottom"}
                    style={
                        cardBelow
                        ? { top: node.y + 52, marginLeft: jitter }
                        : { bottom: STAGE_H - node.y + 52, marginLeft: jitter }
                    }
                    >
                    <div className="flex gap-5">
                        {/* Milestone image */}
                        <span className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-brand-orange/10">
                            <Image src={m.image} alt={m.title} fill className="object-cover" />
                        </span>

                        <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                            <h3 className="text-lg font-bold uppercase leading-snug tracking-tight text-brand-purple-dark">
                            {m.title}
                            </h3>
                            {m.projected && (
                            <span className="flex-shrink-0 rounded-full bg-brand-orange/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-orange">
                                Projected
                            </span>
                            )}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-brand-grey">{m.desc}</p>
                        </div>
                    </div>

                    {/* Stat pills — circular icon badge + label/value, matching reference */}
                    <div className="mt-5 flex flex-wrap gap-3">
                        {m.stats.map((s) => (
                        <span
                            key={s.label}
                            className="inline-flex items-center gap-2.5 rounded-full bg-[#F7F5FB] py-1.5 pl-1.5 pr-4"
                        >
                            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white ring-2 ring-brand-orange/30 text-brand-purple">
                            {s.label.includes("Retailer") ? <Store size={16} /> : <TrendingUp size={16} />}
                            </span>
                            <span className="flex flex-col leading-tight">
                            <span className="text-[11px] font-medium text-brand-grey">{s.label}</span>
                            <span
                                className="jt-num text-sm font-bold text-brand-purple-dark"
                                data-value={s.value}
                                data-prefix={s.prefix || ""}
                                data-suffix={s.suffix || ""}
                            >
                                {(s.prefix || "") + fmt(s.value) + (s.suffix || "")}
                            </span>
                            </span>
                        </span>
                        ))}
                    </div>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ Mobile / tablet: simple vertical timeline ════════ */}
      <section className="relative overflow-hidden bg-[#F7F5FB] px-6 py-16 lg:hidden">
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.14]"
            style={{
            backgroundImage: "url('/images/journey/doodle-bg.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "280px auto",
            }}
        />
        <div className="relative z-10 mx-auto max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple">
            <Flag size={13} />
            Our Journey
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-brand-purple-dark">
            From Vision to <span className="text-brand-purple">Victory</span>
          </h2>

          <div className="relative mt-10 border-l-2 border-brand-purple/15 pl-8">
            {MILESTONES.map((m) => (
              <div key={m.year} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white bg-brand-orange shadow" />
                <p className="text-2xl font-black text-brand-purple-dark">
                  {m.year}
                  {m.projected && (
                    <span className="ml-2 align-middle rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-orange">
                      Projected
                    </span>
                  )}
                </p>
                <h3 className="mt-1 font-bold text-brand-purple-dark">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-grey">{m.desc}</p>
                <p className="mt-2 text-sm font-semibold text-brand-purple">
                  {m.stats
                    .map((s) => `${s.label}: ${(s.prefix || "") + fmt(s.value) + (s.suffix || "")}`)
                    .join("  ·  ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}