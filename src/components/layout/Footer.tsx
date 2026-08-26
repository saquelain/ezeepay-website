import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ShieldCheck } from "lucide-react";
import { FOOTER_LINKS, OFFICES, SOCIALS } from "@/lib/constants/navigation";
import FooterAssociations from "./FooterAssociations";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
      <path d="M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.026 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z" />
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.09em] text-white/90">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="footer-nav-link inline-block text-[14px] text-white/45 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="dot-grid relative overflow-hidden bg-brand-purple-dark text-white">
      {/* Top hairline glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-purple to-transparent"
        style={{ boxShadow: "0 0 18px rgba(91, 45, 142, 0.55)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
          {/* Left block */}
          <div>
            <Link href="/" aria-label="Ezeepay home" className="inline-block rounded-xl bg-white p-3 shadow-sm">
              <Image src="/mj-digital-logo.webp" alt="Ezeepay — A brand of MJ Digital" width={160} height={40} />
            </Link>

            <p className="mt-5 max-w-xs text-[15px] font-medium leading-relaxed tracking-[0.01em] text-white/55">
              Making Digital Banking Ezee For Every Village In{" "}
              <span className="font-bold text-brand-orange">भारत</span>
            </p>

            {/* Certifications & Associations — above the social icons */}
            <div className="mt-8">
              <FooterAssociations />
            </div>

            <div className="mt-8 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5
                            text-white/50 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
                >
                  {SOCIAL_ICONS[s.label]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <LinkColumn title="Services" links={FOOTER_LINKS.services} />
          <LinkColumn title="Company" links={FOOTER_LINKS.company} />
          <LinkColumn title="Join Us" links={FOOTER_LINKS.joinUs} />

          {/* Contact column */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.09em] text-white/90">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-white/45">
              {OFFICES.map((o) => (
                <li key={o.name}>
                  <p className="font-semibold text-white/90">{o.name}</p>
                  <p className="mt-0.5">{o.address}</p>
                </li>
              ))}
              <li className="flex items-center gap-2 pt-1">
                <Phone size={15} className="text-brand-orange" />
                <a href="tel:+919205621622" className="hover:text-white">
                  12x7 Help Desk: +91 9205621622
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-brand-orange" />
                <a href="mailto:info@ezeepay.app" className="hover:text-white">
                  info@ezeepay.app
                </a>
              </li>
            </ul>

            {/* Lodge a Complaint — below the contact section */}
            <div className="mt-6">
              <Link
                href="/lodge-complaint"
                className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/15 px-7 py-3.5 text-[15px] font-medium leading-none text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/5"
              >
                <ShieldCheck size={17} className="text-brand-orange" />
                Lodge a Complaint
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-[13px] text-white/30">
          <p>© {new Date().getFullYear()} MJ Digital Services Pvt Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            {FOOTER_LINKS.legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-white/70">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Giant watermark — outlined stroke, masked fade, matching MJ's treatment */}
      <div aria-hidden="true" className="pointer-events-none -mt-[4vw] select-none overflow-hidden pb-2">
        <p
          className="translate-y-[8%] text-center text-[18vw] font-extrabold leading-[0.8] tracking-tight text-transparent
                     [-webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,0.9),rgba(0,0,0,0.2))]
                     [mask-image:linear-gradient(180deg,rgba(0,0,0,0.9),rgba(0,0,0,0.2))]"
          style={{ WebkitTextStroke: "1.25px rgba(255,255,255,0.16)" }}
        >
          ezeepay
        </p>
      </div>
    </footer>
  );
}