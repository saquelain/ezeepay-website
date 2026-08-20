import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Eye,
  Fingerprint,
  Landmark,
  Plane,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "banking-aeps": Fingerprint,
  "upi-payments": Smartphone,
  insurance: ShieldCheck,
  "travel-services": Plane,
  "government-schemes": Landmark,
};

function formatDate(dateStr: string | null) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

function formatViews(views: number) {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
  return `${views} views`;
}

// Scales heading/description/spacing based on content length so short
// titles don't leave a sparse, awkward hero and long ones don't overflow.
function getHeroScale(title: string, excerpt: string) {
  const score = title.length + excerpt.length * 0.4;

  if (score <= 70) {
    return {
      badge: "px-4 py-2 text-sm gap-2",
      badgeIcon: 16,
      heading: "text-6xl md:text-7xl xl:text-[4.75rem]",
      description: "text-xl md:text-2xl",
      spacingTop: "mt-6",
      spacingDesc: "mt-6",
      spacingMeta: "mt-8",
    };
  }

  if (score <= 130) {
    return {
      badge: "px-3.5 py-1.5 text-[13px] gap-1.5",
      badgeIcon: 14,
      heading: "text-4xl md:text-5xl xl:text-[3.25rem]",
      description: "text-lg md:text-xl",
      spacingTop: "mt-5",
      spacingDesc: "mt-5",
      spacingMeta: "mt-7",
    };
  }

  return {
    badge: "px-3 py-1 text-xs gap-1.5",
    badgeIcon: 12,
    heading: "text-3xl md:text-4xl xl:text-[2.75rem]",
    description: "text-[15px] md:text-base",
    spacingTop: "mt-4",
    spacingDesc: "mt-4",
    spacingMeta: "mt-6",
  };
}

export default function BlogDetailHero({ post }: { post: BlogPost }) {
  const scale = getHeroScale(post.title, post.excerpt);
  const CategoryIcon = CATEGORY_ICONS[post.category?.slug] ?? Fingerprint;

  return (
    <section className="relative w-full overflow-hidden border-b border-brand-purple/15 bg-gradient-to-b from-[#EDE7F8] via-[#F3EEFA] to-white">
      <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 pb-14 pt-8 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-brand-grey">
          <Link href="/" className="hover:text-brand-purple-dark">
            Home
          </Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-brand-purple-dark">
            Blog
          </Link>
          <span>›</span>
          <span className="truncate text-brand-purple-dark">{post.title}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 items-stretch gap-10 py-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
          {/* Left — copy */}
<div className="flex flex-col justify-between py-2">
  <div>
  <span
              className={`inline-flex w-fit items-center rounded-full bg-brand-purple-light font-semibold text-brand-purple ${scale.badge}`}
            >
              <CategoryIcon size={scale.badgeIcon} />
              {post.category?.name}
            </span>

    <h1
      className={`${scale.spacingTop} font-extrabold leading-[1.1] tracking-tight text-brand-purple-dark ${scale.heading}`}
    >
      {post.title}
    </h1>

    <p
      className={`${scale.spacingDesc} max-w-2xl leading-relaxed text-brand-grey ${scale.description}`}
    >
      {post.excerpt}
    </p>
  </div>

  {/* Meta row */}
  <div
    className={`flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-brand-grey`}
  >
                            <div className="flex items-center gap-2">
                <span className="relative h-7 w-7 overflow-hidden rounded-full bg-brand-purple-light">
                  {post.author?.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </span>
                <span className="font-medium text-brand-purple-dark">
                  By {post.author?.name || "Ezeepay Team"}
                </span>
              </div>

              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(post.publishedAt)}
              </span>

              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              )}

              <span className="flex items-center gap-1.5">
                <Eye size={14} />
                {formatViews(post.views)}
              </span>
            </div>
          </div>

                    {/* Right — hero image */}
                    <div className="relative mx-auto flex aspect-[4/3] w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-white/40 lg:max-w-none">
            {post.coverImage && (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-contain p-4"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}