import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-brand-purple/10 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-purple-light">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center gap-3 text-xs">
          <span className="rounded-full bg-brand-purple-light px-3 py-1 font-semibold text-brand-purple">
            {post.category?.name || "General"}
          </span>
          <span className="text-brand-grey">
            {formatDate(post.publishedAt)}
          </span>
        </div>

        <h3 className="mb-2 text-[17px] font-bold leading-snug text-brand-purple-dark group-hover:text-brand-purple">
          {post.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-[14px] leading-relaxed text-brand-grey">
          {post.excerpt}
        </p>

        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple">
          Read More
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}