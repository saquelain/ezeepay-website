import { notFound } from "next/navigation";
import BlogDetailHero from "@/components/blog/BlogDetailHero";
import BlogArticleContent from "@/components/blog/BlogArticleContent";
import BlogDetailSidebar from "@/components/blog/BlogDetailSidebar";
import BlogRelatedArticles from "@/components/blog/BlogRelatedArticles";
import { getBlogBySlug } from "@/lib/api/blog";
import { extractHeadings } from "@/lib/utils/extractHeadings";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const { html, headings } = extractHeadings(post.content || "");

  return (
    <main>
      <BlogDetailHero post={post} />

      <section className="mx-auto w-full max-w-[96rem] px-6 py-10 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <BlogArticleContent post={post} html={html} />
          </div>

          <div
            data-lenis-prevent
            className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <BlogDetailSidebar headings={headings} />
          </div>
        </div>
      </section>

      <BlogRelatedArticles post={post} />
    </main>
  );
}