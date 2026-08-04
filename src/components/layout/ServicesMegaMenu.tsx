import {
    Landmark,
    ReceiptText,
    ShieldCheck,
    Plane,
    FileBadge,
    Smartphone,
    IndianRupee,
    QrCode,
    Wallet,
    type LucideIcon,
  } from "lucide-react";
  
  const CATEGORY_ICONS: Record<string, LucideIcon> = {
    banking: Landmark,
    utility: ReceiptText,
    insurance: ShieldCheck,
    travel: Plane,
    "e-governance": FileBadge,
    "account-opening": Smartphone,
  };

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES_MENU } from "@/lib/constants/navigation";

export default function ServicesMegaMenu() {
  return (
  <div
    className="absolute inset-x-0 top-full overflow-hidden rounded-b-2xl border-t border-black/5
               bg-white shadow-[0_24px_48px_-12px_rgba(59,30,102,0.18)]"
  >
    {/* Background decoration */}
    <div className="pointer-events-none absolute inset-0">
      {/* soft purple glow, top-right */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-purple/10 blur-3xl" />
      {/* soft glow, bottom-left */}
      <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-brand-purple-light blur-2xl" />
      {/* dot grid, right side */}
      <div
        className="absolute inset-y-0 right-0 w-1/3 opacity-40
                   [background-image:radial-gradient(circle,#5B2D8E_1px,transparent_1px)]
                   [background-size:22px_22px]
                   [mask-image:linear-gradient(to_left,black,transparent)]"
      />
    </div>

    {/* dot grid, bottom-left */}
    <div
    className="absolute inset-y-0 left-0 w-1/3 opacity-40
                [background-image:radial-gradient(circle,#5B2D8E_1px,transparent_1px)]
                [background-size:22px_22px]
                [mask-image:linear-gradient(to_right,black,transparent)]"
    />

    {/* Floating icon tiles, bottom-left */}
    <div className="absolute bottom-6 left-8 flex items-end gap-3 opacity-70">
    <span className="flex h-11 w-11 -rotate-12 items-center justify-center rounded-xl
                    bg-white text-brand-purple shadow-lg shadow-brand-purple/15
                    ring-1 ring-brand-purple/10">
        <IndianRupee size={20} />
    </span>
    <span className="mb-4 flex h-12 w-12 rotate-6 items-center justify-center rounded-xl
                    bg-brand-purple text-white shadow-lg shadow-brand-purple/25">
        <QrCode size={22} />
    </span>
    <span className="flex h-10 w-10 -rotate-6 items-center justify-center rounded-xl
                    bg-white text-brand-purple shadow-lg shadow-brand-purple/15
                    ring-1 ring-brand-purple/10">
        <Wallet size={18} />
    </span>
    </div>

    <div className="relative mx-auto grid max-w-7xl grid-cols-4 gap-x-10 gap-y-10 px-10 py-10">
      {SERVICES_MENU.map((category) => {
        const Icon = CATEGORY_ICONS[category.slug];
        return (
          <div key={category.slug}>
            <Link
              href={`/services/${category.slug}`}
              className="group/cat mb-4 flex items-center gap-3"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl
                           bg-brand-purple-light text-brand-purple
                           transition-colors group-hover/cat:bg-brand-purple group-hover/cat:text-white"
              >
                <Icon size={20} />
              </span>
              <span className="text-[15px] font-bold text-brand-purple-dark group-hover/cat:text-brand-purple">
                {category.category}
              </span>
            </Link>
            <ul className="space-y-3 pl-[52px]">
              {category.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${category.slug}/${item.slug}`}
                    className="group/item flex items-center gap-1.5 text-[15px] text-brand-grey
                               transition-colors hover:text-brand-purple"
                  >
                    {item.label}
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-1 transition-all
                                 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  </div>
);
}