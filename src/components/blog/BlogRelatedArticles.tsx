import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/lib/dummy-data/blog-posts";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getRelatedPosts(current: BlogPost, max = 3): BlogPost[] {
  const sameCategory = BLOG_POSTS.filter(
    (p) => p.slug !== current.slug && p.category === current.category
  );
  const others = BLOG_POSTS.filter(
    (p) => p.slug !== current.slug && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, max);
}

export default function BlogRelatedArticles({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post);

  if (related.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[96rem] px-6 pb-16 lg:px-12">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-brand-purple-dark">
          Related Articles
        </h2>
        <Link
          href="/blog"
          className="flex items-center gap-1.5 text-sm font-semibold text-brand-purple hover:text-brand-purple-dark"
        >
          View all articles
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`/blog/${item.slug}`}
            className="group overflow-hidden rounded-2xl border border-brand-purple/10 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-purple-light">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-[11px] text-white/90">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 font-semibold backdrop-blur-sm">
                  {item.categoryLabel}
                </span>
                <span>{formatDate(item.date)}</span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="mb-2 text-[14px] font-bold leading-snug text-brand-purple-dark group-hover:text-brand-purple">
                {item.title}
              </h3>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-purple">
                Read More
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}