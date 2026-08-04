"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, Phone } from "lucide-react";

const RESOURCES = [
  {
    title: "Blogs",
    desc: "Guides on AEPS, digital payments, and growing your shop's income. Written for agents and distributors.",
    href: "/blog",
    image: "/images/resources/blog.png", // add this file, or leave null
    gradient: "from-brand-purple to-brand-purple-dark",
  },
  {
    title: "New Updates",
    desc: "New services, commission changes, and app improvements — shipped regularly for all partners.",
    href: "/updates",
    image: "/images/resources/updates.png",
    gradient: "from-brand-orange to-[#C25E15]",
  },
  {
    title: "Certificates",
    desc: "Our registrations, certifications, and compliance documents — full transparency, always available.",
    href: "/certificates",
    image: "/images/resources/certificates.png",
    gradient: "from-brand-purple-dark to-[#1A0F33]",
  },
];

export default function Resources() {
    const [phone, setPhone] = useState("");
  
    return (
    <section className="bg-[#F7F5FB] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold leading-tight text-brand-purple-dark md:text-5xl">
              Seekho, Samjho,{" "}
              <span className="text-brand-purple">Aage Badho</span>
            </h2>
          </div>
  
          {/* Cards */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {RESOURCES.map((r) => (
              <Link
                key={r.title}
                href={r.href}
                className="group rounded-3xl border border-black/5 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <div
                  className={`relative h-40 overflow-hidden rounded-2xl bg-gradient-to-br ${r.gradient}`}
                >
                  {r.image && (
                    <Image src={r.image} alt={r.title} fill className="object-cover" />
                  )}
                  <ArrowUpRight
                    size={22}
                    className="absolute right-4 top-4 z-10 text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                  />
                </div>
                <div className="px-3 py-6">
                  <h3 className="text-2xl font-bold text-brand-purple-dark">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-grey">{r.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* ← max-w-6xl wrapper closes HERE, before the CTA */}
  
        {/* ── Final CTA — now a sibling, own wider max-width ── */}
        <div className="relative mx-auto mt-16 max-w-[90rem] overflow-hidden rounded-[2.5rem] bg-white px-6 py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(91,45,142,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(91,45,142,0.08) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            }}
          />
  
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold leading-tight text-brand-purple-dark md:text-5xl">
              Shuruaat Karein?
              <br />
              <span className="text-brand-purple">Download EzeePay Now</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-brand-grey">
              Get all kinds of banking benefits from anywhere — take charge of
              your transactions and grow your business.
            </p>
  
            <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-b from-[#FF9142] to-brand-orange px-8 py-4 text-[16px] font-medium leading-none text-white shadow-lg shadow-brand-orange/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-brand-orange/40"
            >
            Contact Us
            <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    );
  }