"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 10, suffix: "s", prefix: "< ", label: "Avg. Transfer Time" },
  { value: 500, suffix: "+", label: "Districts Covered" },
  { value: 50, suffix: "+", label: "Partner Banks" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
];

function useCountUp(target: number, active: boolean, decimals = 0, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return decimals ? value.toFixed(decimals) : Math.floor(value).toLocaleString("en-IN");
}

function StatBlock({
  stat,
  active,
  featured = false,
}: {
  stat: (typeof STATS)[number];
  active: boolean;
  featured?: boolean;
}) {
  const display = useCountUp(stat.value, active, stat.decimals);

  return (
    <div className="flex flex-col justify-end">
      <span
        className={`flex items-baseline whitespace-nowrap font-extrabold leading-none tracking-tight tabular-nums ${
          featured
            ? "text-5xl text-brand-orange sm:text-6xl md:text-7xl xl:text-8xl"
            : "text-5xl text-white md:text-6xl"
        }`}
      >
        {stat.prefix && <span className="mr-2">{stat.prefix.trim()}</span>}
        {display}
        {stat.suffix}
      </span>
      <span
        className={`mt-4 text-sm font-medium uppercase tracking-[0.14em] ${
          featured ? "text-white/70" : "text-white/50"
        }`}
      >
        {stat.label}
      </span>
    </div>
  );
}

export default function MoneyTransferStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [featuredStat, ...restStats] = STATS;

  return (
    <section
      ref={sectionRef}
      className="relative mx-4 my-6 overflow-hidden rounded-[2.5rem] bg-[#120B22] px-8 py-20 md:my-10 md:px-16 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#ffffff_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-purple/40 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-brand-orange">
          <span className="h-1.5 w-6 rounded-full bg-brand-orange" />
          Trusted at Scale
        </div>

        <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl">
          Every number here is a promise we keep on every transfer.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-y-14 border-t border-white/10 pt-14 md:grid-cols-4 md:gap-x-10 md:gap-y-0">
          <div
            className={`transition-all duration-700 ease-out md:pr-6 ${
              active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <StatBlock stat={featuredStat} active={active} featured />
          </div>

          {restStats.map((stat, i) => (
            <div
              key={stat.label}
              style={{ transitionDelay: active ? `${140 + i * 110}ms` : "0ms" }}
              className={`border-white/10 pt-8 transition-all duration-700 ease-out first:border-t-0 md:border-l md:border-t-0 md:pl-8 md:pt-0 ${
                active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <StatBlock stat={stat} active={active} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}