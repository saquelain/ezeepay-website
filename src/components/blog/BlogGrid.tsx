import BlogCard from "./BlogCard";
import type { BlogPost } from "@/lib/types/blog";

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-brand-grey">
        No blog posts found in this category yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}