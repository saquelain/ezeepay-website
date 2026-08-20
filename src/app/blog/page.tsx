"use client";

import { useEffect, useMemo, useState } from "react";
import BlogHero from "@/components/blog/BlogHero";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogPagination from "@/components/blog/BlogPagination";
import { getBlogs } from "@/lib/api/blog";
import { useDebounce } from "@/hooks/useDebounce";
import type { BlogPost } from "@/lib/types/blog";

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "popular">(
    "latest"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearch = useDebounce(searchQuery, 400);

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      setIsLoading(true);
      try {
        const result = await getBlogs({
          category: activeCategory === "all" ? undefined : activeCategory,
          search: debouncedSearch || undefined,
          sortBy,
          page: currentPage,
          limit: POSTS_PER_PAGE,
        });
        if (!cancelled) {
          setPosts(result.blogs);
          setTotalPages(result.pagination.totalPages || 1);
        }
      } catch (err) {
        if (!cancelled) {
          setPosts([]);
          setTotalPages(1);
        }
        console.error("Failed to load blog posts:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, [activeCategory, sortBy, debouncedSearch, currentPage]);

  function handleCategoryChange(slug: string) {
    setActiveCategory(slug);
    setCurrentPage(1);
  }

  function handleSortChange(value: string) {
    setSortBy(value as "latest" | "oldest" | "popular");
    setCurrentPage(1);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            {isLoading ? (
              <p className="py-16 text-center text-brand-grey">Loading...</p>
            ) : (
              <>
                <BlogGrid posts={posts} />
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
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