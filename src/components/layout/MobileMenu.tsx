"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { NAV_LINKS, SERVICES_MENU, RESOURCES_MENU } from "@/lib/constants/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  onButtonClick: () => void;
};

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.EzeePay_DigitalBharat&pli=1";

export default function MobileMenu({ open, onClose, onButtonClick }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (label: string) =>
    setExpanded((prev) => (prev === label ? null : label));

  return (
    <div
      className={`fixed inset-x-0 top-20 bottom-0 z-40 bg-white lg:hidden
                  transition-transform duration-300 ease-in-out
                  ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-4">
        <ul className="divide-y divide-black/5">
          {NAV_LINKS.map((link) =>
            link.hasMegaMenu ? (
              <li key={link.label}>
                <button
                  onClick={() => toggle(link.label)}
                  className="flex w-full items-center justify-between py-4 text-lg font-medium text-brand-purple-dark"
                >
                  {link.label}
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${
                      expanded === link.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion content */}
                {expanded === link.label && (
                  <div className="pb-4">
                    {link.label === "Services" &&
                      SERVICES_MENU.map((cat) => (
                        <div key={cat.slug} className="mb-4">
                          <Link
                            href={`/services/${cat.slug}`}
                            onClick={onClose}
                            className="mb-2 block text-[15px] font-bold text-brand-purple"
                          >
                            {cat.category}
                          </Link>
                          <ul className="space-y-2 pl-3">
                            {cat.items.map((item) => (
                              <li key={item.slug}>
                                <Link
                                  href={`/services/${cat.slug}/${item.slug}`}
                                  onClick={onClose}
                                  className="flex items-center gap-1.5 text-[15px] text-brand-grey"
                                >
                                  {item.label}
                                  <ArrowRight size={13} />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                    {link.label === "Resources" && (
                      <ul className="space-y-2 pl-3">
                        {RESOURCES_MENU.map((res) => (
                          <li key={res.href}>
                            <Link
                              href={res.href}
                              onClick={onClose}
                              className="flex items-center gap-1.5 text-[15px] text-brand-grey"
                            >
                              {res.label}
                              <ArrowRight size={13} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-4 text-lg font-medium text-brand-purple-dark"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Buttons pinned at the bottom */}
        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Link
            href="https://login.ezeepay.app"
            onClick={() => { onButtonClick(); onClose(); }}
            className="flex items-center justify-center rounded-[5px] border border-black/10
                       bg-white py-4 text-[16px] font-medium text-black"
          >
            Partner Login
          </Link>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { onButtonClick(); onClose(); }}
            className="flex items-center justify-center rounded-full bg-black py-4
                       text-[16px] font-medium text-white"
          >
            Download App
          </a>
        </div>
      </div>
    </div>
  );
}