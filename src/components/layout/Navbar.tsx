// Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants/navigation";
import FlippyButton from "../ui/FlippyButton";
import ServicesMegaMenu from "@/components/layout/ServicesMegaMenu";
import ResourcesMegaMenu from "@/components/layout/ResourcesMegaMenu";
import MobileMenu from "@/components/layout/MobileMenu";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useClickSound } from "@/hooks/useClickSound";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.EzeePay_DigitalBharat&pli=1";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hidden = useScrollDirection();
  const playClick = useClickSound();

  // Used inside the mega menus specifically — plays the click sound AND
  // closes whichever mega menu is open, since clicking through to a page
  // should never leave the dropdown hanging open underneath it.
  const handleMegaMenuLinkClick = () => {
    playClick();
    setOpenMenu(null);
  };

  if (hidden && openMenu) setOpenMenu(null);

  return (
    <>
      <header
        onMouseLeave={() => setOpenMenu(null)}
        className={`fixed top-0 inset-x-0 z-50 bg-white shadow-[0_1px_12px_rgba(0,0,0,0.06)]
                    transition-transform duration-300 ease-in-out
                    ${hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" aria-label="Ezeepay home">
            <Image
              src="/ezeepay-logo.png"
              alt="Ezeepay — A brand of MJ Digital"
              width={180}
              height={44}
              priority
            />
          </Link>

          {/* Links (desktop) */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isOpen = openMenu === link.label;
              const sharedClassName = `flex items-center gap-1 py-7 font-medium transition-colors
                                        hover:text-brand-purple ${
                                          isOpen ? "text-brand-purple" : "text-brand-purple-dark"
                                        }`;
              return (
                <li
                  key={link.label}
                  onMouseEnter={() => setOpenMenu(link.hasMegaMenu ? link.label : null)}
                >
                  {link.hasMegaMenu ? (
                    <button
                      type="button"
                      onClick={playClick}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      className={sharedClassName}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link href={link.href} onClick={playClick} className={sharedClassName}>
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Buttons (desktop) */}
          <div className="hidden items-center gap-3 lg:flex">
            <FlippyButton
              href="https://login.ezeepay.app"
              label="Partner Login"
              onClick={playClick}
            />
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="inline-flex items-center justify-center whitespace-nowrap
                         rounded-full bg-gradient-to-b from-[#FF9142] to-brand-orange px-5 py-[17px]
                         text-[16px] font-medium leading-none text-white
                         shadow-lg shadow-brand-orange/30
                         transition-all duration-300 ease-out
                         hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-brand-orange/40
                         active:translate-y-0 active:scale-100"
            >
              Download App
            </a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="text-brand-purple-dark lg:hidden"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mega menus (desktop) */}
        {openMenu === "Services" && <ServicesMegaMenu onLinkClick={handleMegaMenuLinkClick} />}
        {openMenu === "Resources" && <ResourcesMegaMenu onLinkClick={handleMegaMenuLinkClick} />}
      </header>

      {/* Mobile menu — sibling of header so position:fixed works correctly */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onButtonClick={playClick}
      />
    </>
  );
}