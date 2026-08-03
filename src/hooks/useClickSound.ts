"use client";

import { useCallback, useRef } from "react";

export function useClickSound(src = "/sounds/button-click.wav") {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = 0.5;
    }
    audioRef.current.currentTime = 0; // rewind so rapid clicks retrigger
    audioRef.current.play().catch(() => {}); // ignore autoplay-policy errors
  }, [src]);
}