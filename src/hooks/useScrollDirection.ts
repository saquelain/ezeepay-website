"use client";

import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 8) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY;

      // Ignore tiny movements (trackpad jitter)
      if (Math.abs(diff) < threshold) return;

      // Never hide while near the top of the page
      if (y < 80) {
        setHidden(false);
      } else {
        setHidden(diff > 0); // scrolling down → hide, up → show
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}