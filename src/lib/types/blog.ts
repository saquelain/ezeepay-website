export type Category = {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    order: number;
    isActive: boolean;
    postCount?: number;
  };
  
  export type BlogAuthor = {
    name: string;
    role: string;
    avatar: string | null;
  };
  
  export type BlogPost = {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: Category;
    coverImage: string | null;
    tags: string[];
    readTime: string | null;
    content: string;
    relatedPosts?: Pick<BlogPost, "_id" | "title" | "slug" | "excerpt" | "coverImage" | "publishedAt" | "category">[];
    faqs?: { question: string; answer: string }[];
    faqsTitle?: string;
    metaTitle?: string;
    metaDescription?: string;
    author: BlogAuthor;
    views: number;
    isPublished: boolean;
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
  
  export type BlogListResponse = {
    blogs: BlogPost[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };