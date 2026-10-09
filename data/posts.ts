import { lt, type LocalizedList, type LocalizedText } from "@/lib/i18n";

export type Post = {
  title: LocalizedText;
  slug: string;
  /** id của một chuyên mục trong postCategories */
  category: string;
  excerpt: LocalizedText;
  /** ISO date string, ví dụ "2026-10-07" */
  date: string;
  readingTime: LocalizedText;
  /** image path under /public — null = chưa có ảnh bìa */
  cover: string | null;
  /** body paragraphs */
  body: LocalizedList;
};

export const postCategories: { id: string; label: LocalizedText }[] = [
  { id: "business", label: lt("Business", "Business") },
  { id: "marketing", label: lt("Marketing", "Marketing") },
  { id: "technology", label: lt("Technology", "Technology") },
  { id: "learning", label: lt("Learning", "Learning") },
  { id: "life", label: lt("Life", "Life") },
  { id: "personal-thoughts", label: lt("Suy nghĩ cá nhân", "Personal thoughts") },
];

export function categoryLabel(id: string): LocalizedText {
  return (
    postCategories.find((c) => c.id === id)?.label ?? lt(id, id)
  );
}

/**
 * Chưa có bài viết thật — section Notes hiển thị trạng thái trung tính
 * cho đến khi Duy gửi bài đầu tiên. Không bịa bài viết.
 */
export const posts: Post[] = [];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
