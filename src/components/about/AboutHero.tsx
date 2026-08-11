"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";

const YT_VIDEO_ID = "allOiLvsxN0";

// Minimal typing for the bits of the YouTube IFrame API we actually use.
type YTPlayer = {
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  playVideo: () => void;
};

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.EzeePay_DigitalBharat&pli=1";

export default function AboutHero() {
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function createPlayer() {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: YT_VIDEO_ID, // required for looping a single video
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute();
            e.target.playVideo();
            setReady(true);
          },
          // Loop safeguard: if the player ever stops (state 0 = ended),
          // restart it so playback never pauses.
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (e.data === 0) {
              e.target.playVideo();
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      playerRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    if (player.isMuted()) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#FAFAFA] px-6 pb-24 pt-10">
      <div className="mx-auto max-w-5xl text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-brand-purple-dark shadow-sm">
          <span className="h-2 w-2 rounded-full bg-brand-orange" />
          About Ezeepay
        </span>

        {/* Headline */}
        <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-brand-purple-dark md:text-6xl">
          Building Digital Bharat,
          <br />
          <span className="text-brand-purple">One Shop At A Time</span>
        </h1>
      </div>

      {/* Video block */}
        <div className="relative mx-auto mt-16 max-w-6xl">
        <div
          className="group relative aspect-video cursor-pointer overflow-hidden rounded-[2.5rem] bg-brand-purple-dark shadow-2xl shadow-brand-purple/20 ring-4 ring-red-600 ring-offset-4 ring-offset-white"
          onClick={toggleMute}
          role="button"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
            {/* YouTube player mounts into this div. Scaled up and pointer-events
                disabled so the iframe's own click targets (play/pause, etc.)
                never intercept the click — our overlay handles mute/unmute only. */}
            <div className="pointer-events-none absolute inset-0 h-[calc(100%+120px)] w-[calc(100%+120px)] -translate-x-[60px] -translate-y-[60px]">
              <div ref={containerRef} className="h-full w-full" />
            </div>

            {/* Loading state until the player reports ready */}
            {!ready && (
              <div className="absolute inset-0 flex items-center justify-center bg-brand-purple-dark">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              </div>
            )}

            {/* Mute/unmute indicator */}
            <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-purple-dark shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </div>

            {/* Floating stat card — bottom-left */}
            <div className="absolute bottom-6 left-6 hidden rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm sm:block">
            <p className="text-2xl font-bold text-brand-purple-dark">9+</p>
            <p className="text-xs text-brand-grey">Years Of Impact</p>
            </div>
        </div>

        {/* Floating CTA badge */}
        <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute -bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-purple-dark shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105 sm:right-10"
        >
            Download App
            <ArrowUpRight size={16} />
        </a>
        </div>
    </section>
  );
}