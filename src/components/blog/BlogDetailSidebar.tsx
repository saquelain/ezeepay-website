"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Mail, Link2, MessageCircle, Lock, Check } from "lucide-react";
import type { ExtractedHeading } from "@/lib/utils/extractHeadings";

export default function BlogDetailSidebar({
  headings,
}: {
  headings: ExtractedHeading[];
}) {
  const [email, setEmail] = useState("");

  return (
    <aside className="space-y-6">
      {headings.length > 0 && (
        <div className="rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-brand-purple-dark">
            <span className="h-4 w-1 rounded-full bg-brand-purple" />
            Table of Contents
          </h3>
          <ol className="space-y-2.5">
            {headings.map((h, i) => (
              <li key={h.id} className={h.level === 3 ? "ml-3" : ""}>
                <a
                  href={`#${h.id}`}
                  className="flex gap-2 text-[13px] leading-snug text-brand-grey transition-colors hover:text-brand-purple-dark"
                >
                  <span className="text-brand-purple">{i + 1}.</span>
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-brand-purple-dark">
          <span className="h-4 w-1 rounded-full bg-brand-purple" />
          Share this article
        </h3>
        <div className="flex gap-2.5">
          <a href="#" aria-label="Share on WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple-dark text-white transition-colors hover:bg-brand-purple">
            <MessageCircle size={16} />
          </a>
          <a href="#" aria-label="Share via email" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple-dark text-white transition-colors hover:bg-brand-purple">
            <Mail size={16} />
          </a>
          <a href="#" aria-label="Share" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple-dark text-white transition-colors hover:bg-brand-purple">
            <Send size={16} />
          </a>
          <a href="#" aria-label="Copy link" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple-dark text-white transition-colors hover:bg-brand-purple">
            <Link2 size={16} />
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-sm">
        <h3 className="mb-2 flex items-center gap-2 text-[15px] font-bold text-brand-purple-dark">
          <span className="h-4 w-1 rounded-full bg-brand-purple" />
          Stay Updated
        </h3>
        <p className="mb-4 text-[13px] leading-relaxed text-brand-grey">
          Subscribe to our newsletter for the latest updates, tips, and
          resources.
        </p>
        <div className="relative mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-brand-purple/15 bg-white px-4 py-3 pr-10 text-[14px] text-brand-purple-dark placeholder:text-brand-grey/70 focus:outline-none focus:ring-2 focus:ring-brand-purple/30"
          />
          <Mail size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-grey/60" />
        </div>
        <button type="button" className="w-full rounded-xl bg-brand-purple-dark px-5 py-3 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-purple">
          Subscribe Now
        </button>
        <p className="mt-3 flex items-center gap-1.5 text-[11px] leading-relaxed text-brand-grey/70">
          <Lock size={12} className="shrink-0" />
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>

      <div className="rounded-2xl border border-brand-purple/10 bg-brand-purple-light/40 p-6">
        <h3 className="mb-2 text-[16px] font-bold leading-snug text-brand-purple-dark">
          Grow Your Business with Ezeepay
        </h3>
        <p className="mb-4 text-[13px] leading-relaxed text-brand-grey">
          Join 1M+ retailers earning more with our financial services.
        </p>
        <ul className="mb-5 space-y-2">
          {["Attractive Commissions", "24/7 Support", "Trusted by Millions"].map((item) => (
            <li key={item} className="flex items-center gap-2 text-[13px] font-medium text-brand-purple-dark">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-purple text-white">
                <Check size={10} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <Link href="/join/agent" className="block w-full rounded-xl bg-brand-purple-dark px-5 py-3 text-center text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-purple">
          Join as an Agent →
        </Link>
      </div>
    </aside>
  );
}