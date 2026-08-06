"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import FoundationLogo from "@/components/svg/FoundationLogo";

const SESSION_KEY = "ezeepay-preloader-shown";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [shouldRun, setShouldRun] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) {
      setShouldRun(false);
      setDone(true);
      return;
    }
    setShouldRun(true);
    sessionStorage.setItem(SESSION_KEY, "true");
  }, []);

  useLayoutEffect(() => {
    if (!shouldRun) return;

    document.documentElement.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>(".logo-main .draw-main");

      // Prep: hide fills, hide strokes at full dash offset, hide badge
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, {
          strokeDasharray: len,
          strokeDashoffset: len,
          fillOpacity: 0,
        });
      });
      gsap.set(".logo-badge-wrap", {
        opacity: 0,
        scale: 0.5,
        svgOrigin: "1540 200",
      });
      gsap.set(overlayRef.current, { visibility: "visible" });

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          setDone(true);
        },
      });

      tl
        // 1) Outline draws itself
        .to(paths, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power1.inOut",
          stagger: 0.05,
        })
        // 2) Fills bloom in, strokes dissolve
        .to(paths, { fillOpacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .to(paths, { strokeOpacity: 0, duration: 0.4 }, "<")
        // 3) Badge stamps in
        .to(".logo-badge-wrap", {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2.5)",
          }, "-=0.2")
        // 4) Hold a beat, then curtain lifts
        .to(overlayRef.current, {
          yPercent: -100,
          duration: 0.7,
          ease: "power3.inOut",
          delay: 0.35,
        });
    }, overlayRef);

    return () => {
      document.documentElement.style.overflow = "";
      ctx.revert();
    };
  }, [shouldRun]);

  if (shouldRun === null || done) return null;

  return (
    <div
      ref={overlayRef}
      className="invisible fixed inset-0 z-[100] flex items-center justify-center bg-[#F6F2FB]"
      aria-hidden="true"
    >
      <FoundationLogo className="w-[min(560px,80vw)]" />
    </div>
  );
}