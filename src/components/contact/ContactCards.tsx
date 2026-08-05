"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Row 1 — reach us ── */
const REACH_CARDS: {
  icon: LucideIcon;
  title: string;
  rows: { label: string; value: string; href: string }[];
}[] = [
  {
    icon: Mail,
    title: "Email Address",
    rows: [
      { label: "For Information", value: "info@ezeepay.app", href: "mailto:info@ezeepay.app" },
      { label: "For Support", value: "support@ezeepay.app", href: "mailto:support@ezeepay.app" },
      { label: "Legal", value: "legal@ezeepay.app", href: "mailto:legal@ezeepay.app" },
      { label: "Grievance Officer", value: "nodal@ezeepay.app", href: "mailto:nodal@ezeepay.app" },
    ],
  },
  {
    icon: Phone,
    title: "Phone Number",
    rows: [
      { label: "For Information", value: "+91 9205621622 ( Press 1 )", href: "tel:+919205621622" },
      { label: "For Support", value: "+91 9205621622 ( Press 2 )", href: "tel:+919205621622" },
    ],
  },
];

/* ── Row 2 — offices ── */
const OFFICE_CARDS = [
  {
    title: "Registered Office",
    city: "Delhi Office",
    address: "D-19, A.F.E - 1, Okhla Vihar, NFC New Delhi, Delhi 110025",
    phone: "+91 8130699931",
  },
  {
    title: "Regional Office",
    city: "Kolkata Office",
    address:
      "PS Abacus Tower, 3rd Floor, Office Number 342, Action Area IIE, New Town, Kolkata, West Bengal 700157",
    phone: "+91 8130699931",
  },
  {
    title: "Corporate Office",
    city: "Noida Office",
    address: "7th Floor, Bhutani Technopark, Tower D, Sector 127, Noida, Uttar Pradesh 201313",
    phone: "+91 11 44469751",
  },
];

/* Double-border shell shared by every card */
function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="contact-card group h-full rounded-[2rem] border-2 border-dashed border-brand-purple/20 bg-[#F7F5FB]/60 p-2 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-purple/40">
      <div className="flex h-full flex-col items-center rounded-3xl border border-brand-purple/15 bg-white px-6 py-8 text-center transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-brand-purple/10">
        {children}
      </div>
    </div>
  );
}

/* Icon badge with a cute hover wiggle */
function CardIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-purple-light text-brand-purple transition-transform duration-300 group-hover:scale-110">
      <Icon size={24} />
      {/* <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-brand-orange opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" /> */}
    </span>
  );
}

export default function ContactCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        /* Per-card trigger + immediateRender:false — cards are never
           pre-hidden, so they can't get stuck invisible if a trigger misfires */
        gsap.utils.toArray<HTMLElement>(".contact-card").forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 36, autoAlpha: 0, scale: 0.96 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.4)",
              delay: (i % 3) * 0.08,
              immediateRender: false,
              clearProps: "all",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* ── Row 1: email + phone ── */}
        <div className="grid gap-6 md:grid-cols-2">
          {REACH_CARDS.map(({ icon, title, rows }) => (
            <CardShell key={title}>
              <CardIcon icon={icon} />
              <h3 className="mt-4 text-xl font-bold text-brand-purple-dark">{title}</h3>
              <div className="mt-4 space-y-1.5 text-sm">
                {rows.map((r) => (
                  <p key={r.label + r.value} className="text-brand-grey">
                    <span className="font-semibold text-brand-purple-dark">{r.label} :</span>{" "}
                    <a
                      href={r.href}
                      className="transition-colors hover:text-brand-purple"
                    >
                      {r.value}
                    </a>
                  </p>
                ))}
              </div>
            </CardShell>
          ))}
        </div>

        {/* ── Row 2: three offices ── */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {OFFICE_CARDS.map((o) => (
            <CardShell key={o.title}>
              <CardIcon icon={MapPin} />
              <h3 className="mt-4 text-xl font-bold text-brand-purple-dark">{o.title}</h3>
              <p className="mt-3 text-sm font-semibold text-brand-purple-dark">
                MJ Digital Services Private Limited
              </p>
              <p className="text-sm font-semibold text-brand-grey">[ {o.city} ]</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-grey">{o.address}</p>
              <a
                href={`tel:${o.phone.replace(/\s/g, "")}`}
                className="mt-auto pt-3 text-sm font-semibold text-brand-purple transition-colors hover:text-brand-purple-dark"
              >
                {o.phone}
              </a>
            </CardShell>
          ))}
        </div>
      </div>
    </section>
  );
}