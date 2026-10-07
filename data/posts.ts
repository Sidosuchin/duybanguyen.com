export type Post = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  /** ISO date string, ví dụ "2026-10-07" */
  date: string;
  readingTime: string;
  /** image path under /public — null = chưa có ảnh bìa */
  cover: string | null;
  /** body paragraphs — markdown đơn giản */
  body: string[];
};

export const postCategories = [
  "Business",
  "Marketing",
  "Technology",
  "Learning",
  "Life",
  "Personal thoughts",
] as const;

/**
 * Chưa có bài viết thật — section Notes hiển thị trạng thái placeholder
 * cho đến khi Duy gửi bài đầu tiên. Không bịa bài viết.
 */
export const posts: Post[] = [];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
