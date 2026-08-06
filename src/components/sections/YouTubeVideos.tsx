"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, MoreVertical } from "lucide-react";

/**
 * Fill in the real YouTube video IDs (the part after `watch?v=`).
 * Thumbnails load automatically from YouTube once the id is set.
 */
const CHANNEL_URL = "https://www.youtube.com/@ezeepay"; // ← your channel

const VIDEOS = [
  {
    id: "VIDEO_ID_1",
    title: "Digital Bharat ki disha mein Ezeepay ka ek aur kadam",
    duration: "4:32",
    meta: "Ezeepay · 12K views · 2 weeks ago",
  },
  {
    id: "VIDEO_ID_2",
    title: "Financial Freedom ka naya raasta Ezeepay ke saath",
    duration: "3:58",
    meta: "Ezeepay · 9.8K views · 3 weeks ago",
  },
  {
    id: "VIDEO_ID_3",
    title: "Har Dukaan Banegi Digital Service Point",
    duration: "5:10",
    meta: "Ezeepay · 15K views · 1 month ago",
  },
  {
    id: "VIDEO_ID_4",
    title: "Earning Opportunities Unlimited with Ezeepay",
    duration: "4:45",
    meta: "Ezeepay · 11K views · 1 month ago",
  },
  {
    id: "VIDEO_ID_5",
    title: "AEPS se cash withdrawal — step by step guide",
    duration: "6:02",
    meta: "Ezeepay · 8.2K views · 2 months ago",
  },
  {
    id: "VIDEO_ID_6",
    title: "Ezeepay agent banne ka poora process",
    duration: "7:18",
    meta: "Ezeepay · 21K views · 2 months ago",
  },
];

export default function YouTubeVideos() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const touchX = useRef<number | null>(null);

  /* 3 cards on desktop, 2 on tablet, 1 on mobile */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisible(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, VIDEOS.length - visible);
  const clamped = Math.min(index, maxIndex);

  const go = useCallback(
    (dir: number) => setIndex((i) => Math.min(maxIndex, Math.max(0, i + dir))),
    [maxIndex]
  );

  return (
    <section className="overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div className="relative text-center">
          <h2 className="text-4xl font-bold leading-tight text-brand-purple-dark md:text-5xl">
            YouTube Videos
          </h2>
          <p className="mx-auto mt-4 text-lg text-brand-grey">
            Watch, learn, and grow with our expert insights
          </p>

          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-brand-purple-dark shadow-sm ring-1 ring-brand-purple/15 transition-colors hover:bg-brand-purple-light lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2"
          >
            <span className="flex h-6 w-9 items-center justify-center rounded-lg bg-brand-purple text-white">
              <Play size={12} className="fill-white" />
            </span>
            View all on YouTube
          </a>
        </div>

        {/* ── Carousel ── */}
        <div className="relative mt-14">
          {/* Arrows */}
          <button
            onClick={() => go(-1)}
            disabled={clamped === 0}
            aria-label="Previous videos"
            className="absolute -left-2 top-1/3 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-white text-brand-purple-dark shadow-lg ring-1 ring-black/5 transition-all hover:bg-brand-purple hover:text-white disabled:pointer-events-none disabled:opacity-30 md:flex lg:-left-6"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => go(1)}
            disabled={clamped === maxIndex}
            aria-label="Next videos"
            className="absolute -right-2 top-1/3 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-white text-brand-purple-dark shadow-lg ring-1 ring-black/5 transition-all hover:bg-brand-purple hover:text-white disabled:pointer-events-none disabled:opacity-30 md:flex lg:-right-6"
          >
            <ChevronRight size={22} />
          </button>

          {/* Track — inner padding gives card shadows + hover lift room,
              negative margins cancel it out of the layout */}
          <div
            className="-mx-2 -my-8 overflow-hidden px-2 py-8"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${clamped * (100 / visible)}%)` }}
            >
              {VIDEOS.map((v) => (
                <div
                  key={v.title}
                  className="w-full flex-none px-3 sm:w-1/2 lg:w-1/3"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${v.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full rounded-3xl bg-white p-2.5 shadow-lg shadow-brand-purple/5 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-purple/10"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-purple-light">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                        alt={v.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Play button */}
                      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-purple-dark shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110">
                        <Play size={20} className="ml-0.5 fill-current" />
                      </span>
                      {/* Duration chip */}
                      <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/75 px-1.5 py-0.5 text-xs font-semibold text-white">
                        {v.duration}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="flex items-start justify-between gap-3 px-3 pb-4 pt-4">
                      <div>
                        <h3 className="font-bold leading-snug text-brand-purple-dark">
                          {v.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-brand-grey">{v.meta}</p>
                      </div>
                      <MoreVertical
                        size={18}
                        className="mt-0.5 flex-shrink-0 text-brand-grey/60"
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2.5">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === clamped
                    ? "w-6 bg-brand-purple"
                    : "w-2.5 bg-brand-purple/25 hover:bg-brand-purple/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}