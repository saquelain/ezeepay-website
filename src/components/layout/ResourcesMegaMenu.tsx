// ResourcesMegaMenu.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Newspaper, Megaphone, BadgeCheck, Radio, Images, Trophy, type LucideIcon } from "lucide-react";
import { RESOURCES_MENU, FEATURED_BLOG, FEATURED_UPDATE } from "@/lib/constants/navigation";

const RESOURCE_ICONS: Record<string, LucideIcon> = {
  blog: Newspaper,
  announcements: Megaphone,
  certificates: BadgeCheck,
  "news-coverage": Radio,
  "media-gallery": Images,
  awards: Trophy,
};

function FeaturedCard({
  item,
  tag,
  onLinkClick,
}: {
  item: typeof FEATURED_BLOG;
  tag: string;
  onLinkClick?: () => void;
}) {
  return (
    <Link href={item.href} onClick={onLinkClick} className="group/card block">
      <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-brand-purple-light">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="360px"
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-purple">
          {tag}
        </span>
      </div>
      <h4 className="mb-1.5 font-semibold leading-snug text-brand-purple-dark group-hover/card:text-brand-purple">
        {item.title}
      </h4>
      <p className="text-sm leading-relaxed text-brand-grey">{item.description}</p>
    </Link>
  );
}

export default function ResourcesMegaMenu({
  onLinkClick,
}: {
  onLinkClick?: () => void;
}) {
  return (
    <div
      className="absolute inset-x-0 top-full overflow-hidden rounded-b-2xl border-t border-black/5
                 bg-white shadow-[0_24px_48px_-12px_rgba(59,30,102,0.18)]"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-purple/10 blur-3xl" />
        <div
          className="absolute inset-y-0 left-0 w-1/4 opacity-30
                     [background-image:radial-gradient(circle,#5B2D8E_1px,transparent_1px)]
                     [background-size:22px_22px]
                     [mask-image:linear-gradient(to_right,black,transparent)]"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-[1fr_1.2fr_1.2fr] gap-x-12 px-10 py-10">
        {/* Column 1 — links */}
        <div>
          <p className="mb-5 text-sm font-medium text-brand-grey">Resources</p>
          <ul className="space-y-4">
            {RESOURCES_MENU.map((res) => {
              const Icon = RESOURCE_ICONS[res.icon];
              return (
                <li key={res.href}>
                  <Link href={res.href} onClick={onLinkClick} className="group/res flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl
                                 bg-brand-purple-light text-brand-purple transition-colors
                                 group-hover/res:bg-brand-purple group-hover/res:text-white"
                    >
                      <Icon size={20} />
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-brand-purple-dark group-hover/res:text-brand-purple">
                      {res.label}
                      <ArrowRight
                        size={15}
                        className="opacity-0 -translate-x-1 transition-all
                                   group-hover/res:opacity-100 group-hover/res:translate-x-0"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Column 2 — featured blog */}
        <div className="border-l border-black/5 pl-12">
          <FeaturedCard item={FEATURED_BLOG} tag="From the Blog" onLinkClick={onLinkClick} />
        </div>

        {/* Column 3 — featured update */}
        <div className="border-l border-black/5 pl-12">
          <FeaturedCard item={FEATURED_UPDATE} tag="New Update" onLinkClick={onLinkClick} />
        </div>
      </div>
    </div>
  );
}