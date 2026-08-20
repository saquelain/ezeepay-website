import { apiClient } from "./client";
import type { BlogListResponse, BlogPost, Category } from "@/lib/types/blog";

export async function getBlogs(params?: {
  category?: string;
  search?: string;
  sortBy?: "latest" | "oldest" | "popular";
  page?: number;
  limit?: number;
}): Promise<BlogListResponse> {
  const res = await apiClient.get<{ success: boolean; data: BlogListResponse }>(
    "/blog",
    { params }
  );
  return res.data.data;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await apiClient.get<{ success: boolean; data: BlogPost }>(
      `/blog/${slug}`
    );
    return res.data.data;
  } catch (err: any) {
    if (err?.response?.status === 404) return null;
    throw err;
  }
}

export async function getCategories(
    withCounts = false
  ): Promise<Category[]> {
    const res = await apiClient.get<{ success: boolean; data: Category[] }>(
      "/categories",
      { params: withCounts ? { withCounts: "true" } : undefined }
    );
    return res.data.data;
  }