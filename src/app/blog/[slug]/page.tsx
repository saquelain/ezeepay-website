import { notFound } from "next/navigation";
import BlogDetailHero from "@/components/blog/BlogDetailHero";
import BlogArticleContent from "@/components/blog/BlogArticleContent";
import BlogDetailSidebar from "@/components/blog/BlogDetailSidebar";
import BlogRelatedArticles from "@/components/blog/BlogRelatedArticles";
import { BLOG_POSTS } from "@/lib/dummy-data/blog-posts";
import { BLOG_CONTENT } from "@/lib/dummy-data/blog-content";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const sections = BLOG_CONTENT[post.slug];
  const tocItems = sections?.map(({ id, heading }) => ({ id, heading }));

  return (
    <main>
      <BlogDetailHero post={post} />

      <section className="mx-auto w-full max-w-[96rem] px-6 py-10 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main content column — scrolls with the page */}
          <div>
            <BlogArticleContent post={post} />
          </div>

          {/* Sidebar column — sticky + independently scrollable */}
          <div className="lg:sticky lg:top-24">
        <BlogDetailSidebar sections={tocItems} />
        </div>
        </div>
      </section>

      <BlogRelatedArticles post={post} />
    </main>
  );
}