"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, ShieldCheck, Scale, RotateCcw } from "lucide-react";

export type LegalSection = {
  id: string;
  heading: string;
  body: string[]; // paragraphs
};

/* Map string keys → icons here (components can't cross the server/client boundary) */
const ICONS = {
  shield: ShieldCheck,
  scale: Scale,
  refund: RotateCcw,
} as const;

type Props = {
  icon: keyof typeof ICONS;
  eyebrow: string;
  title: string;
  accent: string; // the word rendered in purple
  updated: string;
  sections: LegalSection[];
};

export default function LegalPageLayout({
  icon,
  eyebrow,
  title,
  accent,
  updated,
  sections,
}: Props) {
  const Icon = ICONS[icon];
  const [activeId, setActiveId] = useState(sections[0]?.id);

  /* Scrollspy — highlight the TOC item for the section in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <main className="bg-white">
      {/* ── Hero band ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EDE7F8] to-white px-6 pb-16 pt-32 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand-purple/15 blur-[100px]"
        />
        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-purple/15 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple backdrop-blur">
            <Icon size={13} />
            {eyebrow}
          </span>
          <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight text-brand-purple-dark md:text-6xl">
            {title} <span className="text-brand-purple">{accent}</span>
          </h1>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm text-brand-grey shadow-sm ring-1 ring-black/5">
            Last updated: <span className="font-semibold text-brand-purple-dark">{updated}</span>
          </p>
        </div>
      </section>

      {/* ── Body: sticky TOC + sections ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[260px_1fr]">
          {/* Table of contents */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl bg-[#F7F5FB] p-6 ring-1 ring-black/5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-grey">
                On this page
              </p>
              <ul className="mt-4 space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        activeId === s.id
                          ? "bg-white font-semibold text-brand-purple shadow-sm"
                          : "text-brand-grey hover:text-brand-purple-dark"
                      }`}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Sections */}
          <div>
            {sections.map((s, i) => (
              <article key={s.id} id={s.id} className="scroll-mt-28 pt-10 first:pt-0">
                <div className="flex items-baseline gap-4">
                  <span className="flex-shrink-0 text-sm font-bold text-brand-purple/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl font-bold text-brand-purple-dark md:text-3xl">
                    {s.heading}
                  </h2>
                </div>
                <div className="mt-4 space-y-4 border-l-2 border-brand-purple/10 pl-[calc(1rem+14px)]">
                  {s.body.map((p, j) => (
                    <p key={j} className="leading-relaxed text-brand-grey">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}

            {/* Contact card */}
            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-[#120B22] p-8 text-white md:p-10">
              <div>
                <h3 className="text-xl font-bold">Questions about this policy?</h3>
                <p className="mt-1.5 text-white/60">
                  Our team is happy to help — reach out anytime.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:support@ezeepay.app"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-purple-dark transition-opacity hover:opacity-90"
                >
                  <Mail size={15} />
                  support@ezeepay.app
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}