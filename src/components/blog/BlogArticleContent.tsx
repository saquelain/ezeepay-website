import Image from "next/image";
import { Send } from "lucide-react";
import type { BlogPost } from "@/lib/dummy-data/blog-posts";
import { BLOG_CONTENT, type ArticleSection } from "@/lib/dummy-data/blog-content";

function Section({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case "intro":
      return (
        <div id={section.id} className="scroll-mt-24">
          <h2 className="mb-3 text-xl font-bold text-brand-purple-dark">
            {section.heading}
          </h2>
          <p className="leading-relaxed text-brand-grey">{section.body}</p>
        </div>
      );

    case "text":
      return (
        <div id={section.id} className="scroll-mt-24">
          <h2 className="mb-3 text-xl font-bold text-brand-purple-dark">
            {section.heading}
          </h2>
          <p className="leading-relaxed text-brand-grey">{section.body}</p>
        </div>
      );

    case "steps":
      return (
        <div id={section.id} className="scroll-mt-24">
          <h2 className="mb-5 text-xl font-bold text-brand-purple-dark">
            {section.heading}
          </h2>
          <div className="flex flex-wrap items-start gap-x-2 gap-y-6">
            {section.steps.map((step, i) => (
              <div key={step.title} className="flex items-start">
                <div className="flex w-28 flex-col items-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple-light text-sm font-bold text-brand-purple">
                    {i + 1}
                  </span>
                  <p className="mt-2 text-xs font-semibold text-brand-purple-dark">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-brand-grey">
                    {step.description}
                  </p>
                </div>
                {i < section.steps.length - 1 && (
                  <span className="mt-6 h-px w-6 shrink-0 bg-brand-purple/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case "grid":
      return (
        <div id={section.id} className="scroll-mt-24">
          <h2 className="mb-5 text-xl font-bold text-brand-purple-dark">
            {section.heading}
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-brand-purple/10 bg-white p-5 shadow-sm"
                >
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple">
                    <Icon size={20} />
                  </span>
                  <h3 className="mb-1 text-[14px] font-bold text-brand-purple-dark">
                    {item.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-brand-grey">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      );

    case "checklist":
      return (
        <div id={section.id} className="scroll-mt-24">
          <h2 className="mb-4 text-xl font-bold text-brand-purple-dark">
            {section.heading}
          </h2>
          <ul className="space-y-2.5">
            {section.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-purple/15 text-[10px] font-bold text-brand-purple">
                  ✓
                </span>
                <span className="text-[14px] leading-relaxed text-brand-grey">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return null;
  }
}

export default function BlogArticleContent({ post }: { post: BlogPost }) {
  const sections = BLOG_CONTENT[post.slug];

  return (
    <article className="rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-sm lg:p-8">
      {sections && sections.length > 0 ? (
        <div className="space-y-10">
          {sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </div>
      ) : (
        <p className="text-brand-grey">
          Full content for this article is coming soon.
        </p>
      )}

      {/* Author bio */}
      <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-brand-purple/10 bg-brand-purple-light/40 p-5">
        <div className="flex items-center gap-3">
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-brand-grey">
              About the Author
            </p>
            <p className="text-[15px] font-bold text-brand-purple-dark">
              {post.author.name}
            </p>
            <p className="text-[12px] text-brand-grey">{post.author.role}</p>
          </div>
        </div>
        <a        
        href="#"
        aria-label={`Connect with ${post.author.name}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple-dark text-white transition-colors hover:bg-brand-purple"
        >
        <Send size={16} />
        </a>
      </div>
    </article>
  );
}