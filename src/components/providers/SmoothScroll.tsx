"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
    });

    // --- DEBUG STEP 1: raw wheel input tracker ---
    const wheelLogger = (e: WheelEvent) => {
      console.log("[wheel]", "deltaY:", e.deltaY, "t:", performance.now().toFixed(0));
    };
    window.addEventListener("wheel", wheelLogger, { passive: true });

    // --- DEBUG STEP 1: Lenis internal scroll position tracker ---
    lenis.on("scroll", (e: any) => {
      console.log("[lenis scroll]", "pos:", e.scroll?.toFixed(1), "velocity:", e.velocity?.toFixed(2), "isStopped:", (lenis as any).isStopped);
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("wheel", wheelLogger);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}