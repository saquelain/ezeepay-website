"use client";

import { Play, ArrowUpRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EDE7F8] via-[#F3EEFA] to-white px-6 pb-24 pt-40">
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
        <div className="relative aspect-video overflow-hidden rounded-[2.5rem] bg-brand-purple-dark shadow-2xl shadow-brand-purple/20">
            <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/about-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/about-hero-poster.jpg"
            />

            {/* Floating stat card — bottom-left */}
            <div className="absolute bottom-6 left-6 hidden rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm sm:block">
            <p className="text-2xl font-bold text-brand-purple-dark">9+</p>
            <p className="text-xs text-brand-grey">Years Of Impact</p>
            </div>
        </div>

        {/* Floating CTA badge */}
        <a
            href="/download"
            className="absolute -bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-purple-dark shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105 sm:right-10"
        >
            Download App
            <ArrowUpRight size={16} />
        </a>
        </div>
    </section>
  );
}