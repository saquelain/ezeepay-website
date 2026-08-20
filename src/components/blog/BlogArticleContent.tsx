import Image from "next/image";
import { Send } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";

export default function BlogArticleContent({
  post,
  html,
}: {
  post: BlogPost;
  html: string;
}) {
  return (
    <article className="rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-sm lg:p-8">
      <div
        className="prose prose-sm max-w-none text-brand-purple-dark
          [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-brand-purple-dark [&_h1]:my-3 [&_h1]:scroll-mt-24
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-brand-purple-dark [&_h2]:my-4 [&_h2]:scroll-mt-24
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-brand-purple-dark [&_h3]:my-3 [&_h3]:scroll-mt-24
          [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-brand-purple-dark [&_h4]:my-2
          [&_p]:leading-relaxed [&_p]:text-brand-grey [&_p]:my-3
          [&_a]:text-brand-purple [&_a]:underline
          [&_img]:rounded-xl [&_img]:max-w-full [&_img]:my-4
          [&_blockquote]:border-l-4 [&_blockquote]:border-brand-purple/20 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-brand-grey
          [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6
          [&_li]:text-brand-grey [&_li]:leading-7
          [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
          [&_th]:border [&_th]:border-brand-purple/20 [&_th]:bg-brand-purple-light [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold
          [&_td]:border [&_td]:border-brand-purple/20 [&_td]:px-3 [&_td]:py-2
          [&_mark]:bg-yellow-200 [&_mark]:rounded [&_mark]:px-0.5
          [&_code]:bg-brand-purple-light [&_code]:rounded [&_code]:px-1 [&_code]:text-sm [&_code]:font-mono [&_code]:text-brand-orange
          [&_pre]:bg-brand-purple-dark [&_pre]:rounded-lg [&_pre]:p-4
          [&_pre_code]:text-white [&_pre_code]:bg-transparent
        "
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Author bio */}
      <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-brand-purple/10 bg-brand-purple-light/40 p-5">
        <div className="flex items-center gap-3">
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
            {post.author?.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            )}
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-brand-grey">
              About the Author
            </p>
            <p className="text-[15px] font-bold text-brand-purple-dark">
              {post.author?.name || "Ezeepay Team"}
            </p>
            <p className="text-[12px] text-brand-grey">
              {post.author?.role || ""}
            </p>
          </div>
        </div>
        <a
          href="#"
          aria-label={`Connect with ${post.author?.name || "the author"}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple-dark text-white transition-colors hover:bg-brand-purple"
        >
          <Send size={16} />
        </a>
      </div>
    </article>
  );
}