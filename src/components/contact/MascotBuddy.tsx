"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

/**
 * MascotBuddy — layered-asset version with eyebrows.
 *
 * Assets (all transparent PNGs) in /public/images/contact/:
 *   mascot-body.png  — mascot with eyes removed
 *   eye-left.png, eye-right.png    — the glossy eyes (they track the cursor + blink)
 *   brow-left.png, brow-right.png  — the eyebrows (static, above the eyes)
 *
 * All positions/sizes below were measured by compositing against your assets.
 */

const EYES = [
  { left: "39.6%", top: "43.8%", src: "/images/contact/eye-left.png" },
  { left: "61.6%", top: "44.6%", src: "/images/contact/eye-right.png" },
];
const EYE_SIZE = "9.8%"; // of image width

const BROWS = [
  { left: "37.9%", top: "36.9%", src: "/images/contact/brow-left.png" },
  { left: "63.6%", top: "37.4%", src: "/images/contact/brow-right.png" },
];
const BROW_W = "4%"; // of image width
const BROW_RATIO = "80 / 45"; // width / height of the brow crops

export default function MascotBuddy() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const eyeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const head = headRef.current;
    if (!wrap || !head) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;

    const setters = eyeRefs.current.map((el) =>
      el
        ? {
            x: gsap.quickTo(el, "x", { duration: 0.25, ease: "power2.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.25, ease: "power2.out" }),
          }
        : null
    );
    const setRotX = gsap.quickTo(head, "rotationX", { duration: 0.6, ease: "power2.out" });
    const setRotY = gsap.quickTo(head, "rotationY", { duration: 0.6, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      eyeRefs.current.forEach((eye, i) => {
        const set = setters[i];
        if (!eye || !set) return;
        const rect = eye.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const max = rect.width * 0.12;
        const dist = Math.min(max, Math.hypot(dx, dy) / 40);
        const angle = Math.atan2(dy, dx);
        set.x(Math.cos(angle) * dist);
        set.y(Math.sin(angle) * dist);
      });

      /* Subtle perspective tilt toward the cursor (smooth, not jerky) */
      const r = wrap.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      setRotY(nx * 6);
      setRotX(-ny * 4);
    };

    /* Blink — eyes squash flat against the fur behind them */
    const blink = () => {
      const eyes = eyeRefs.current.filter(Boolean);
      gsap.to(eyes, {
        scaleY: 0.06,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
        transformOrigin: "center 60%",
      });
    };
    let blinkTimer: ReturnType<typeof setInterval> | undefined;
    if (!reduceMotion) blinkTimer = setInterval(blink, 4200);

    /* Touch devices: idle wander instead of tracking */
    let idle: gsap.core.Timeline | undefined;
    if (reduceMotion) {
      // stays still
    } else if (noHover) {
      const eyes = eyeRefs.current.filter(Boolean);
      idle = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 1.4, ease: "sine.inOut" } });
      idle.to(eyes, { x: 4, y: 1.5 }).to(eyes, { x: -4, y: 2 }).to(eyes, { x: 0, y: -2 });
    } else {
      window.addEventListener("mousemove", onMove);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (blinkTimer) clearInterval(blinkTimer);
      idle?.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} className="mt-10 w-fit" style={{ perspective: "700px" }}>
      <div ref={headRef} className="relative" style={{ transformStyle: "preserve-3d" }}>
        {/* Ground shadow — sits at the feet baseline, behind the body */}
        <div
          aria-hidden
          className="absolute rounded-[50%]"
          style={{
            left: "48%", // centered under the feet (28.5%–68% band)
            top: "83.9%", // measured baseline of the body image
            width: "52%",
            height: "5.5%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(59,30,102,0.28) 0%, rgba(59,30,102,0.12) 45%, transparent 72%)",
            filter: "blur(3px)",
          }}
        />

        {/* Body (eyeless) */}
        <Image
          src="/images/contact/mascot-body.png"
          alt="Ezeepay mascot"
          width={288}
          height={360}
          className="h-auto w-56 select-none md:w-64"
          draggable={false}
          priority
        />

        {/* Eyebrows — static */}
        {BROWS.map((pos, i) => (
          <div
            key={`brow-${i}`}
            className="pointer-events-none absolute"
            style={{
              left: pos.left,
              top: pos.top,
              width: BROW_W,
              aspectRatio: BROW_RATIO,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Image src={pos.src} alt="" fill sizes="20px" className="select-none object-contain" draggable={false} />
          </div>
        ))}

        {/* Eyes — track the cursor + blink */}
        {EYES.map((pos, i) => (
          <div
            key={`eye-${i}`}
            ref={(el) => {
              eyeRefs.current[i] = el;
            }}
            className="pointer-events-none absolute"
            style={{
              left: pos.left,
              top: pos.top,
              width: EYE_SIZE,
              aspectRatio: "1",
              marginLeft: `calc(${EYE_SIZE} / -2)`,
              marginTop: `calc(${EYE_SIZE} / -2)`,
            }}
          >
            <Image src={pos.src} alt="" fill sizes="40px" className="select-none object-contain" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}