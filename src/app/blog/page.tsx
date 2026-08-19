"use client";

import { useMemo, useState } from "react";
import BlogHero from "@/components/blog/BlogHero";
import BlogCategoryFilter, {
  BLOG_CATEGORIES,
} from "@/components/blog/BlogCategoryFilter";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogPagination from "@/components/blog/BlogPagination";
import { BLOG_POSTS } from "@/lib/dummy-data/blog-posts";

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [sortBy, setSortBy] = useState("latest");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPosts = useMemo(() => {
        let filtered =
          activeCategory === "all"
            ? [...BLOG_POSTS]
            : BLOG_POSTS.filter((post) => post.category === activeCategory);
      
        const query = searchQuery.trim().toLowerCase();
        if (query) {
          filtered = filtered.filter(
            (post) =>
              post.title.toLowerCase().includes(query) ||
              post.excerpt.toLowerCase().includes(query)
          );
        }
      
        if (sortBy === "oldest") {
          filtered.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        } else {
          // "latest" and "popular" both fall back to date-desc for now —
          // "popular" needs a real view/like count from the backend later
          filtered.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        }
      
        return filtered;
    }, [activeCategory, sortBy, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  );

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  function handleCategoryChange(slug: string) {
    setActiveCategory(slug);
    setCurrentPage(1);
  }

  function handleSortChange(value: string) {
    setSortBy(value);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  return (
    <main>
      <BlogHero searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      <section className="mx-auto w-full max-w-[96rem] px-6 py-12 lg:px-12">
        <BlogCategoryFilter
          active={activeCategory}
          onChange={handleCategoryChange}
        />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <BlogGrid posts={paginatedPosts} />
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          <BlogSidebar
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            />
        </div>
      </section>
    </main>
  );
}