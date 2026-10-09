import { lt, type LocalizedText } from "@/lib/i18n";

export type LifePhoto = {
  /** image path under /public — null = chưa có ảnh thật */
  src: string | null;
  caption: LocalizedText;
  date: string | null;
  location: LocalizedText | null;
  alt: LocalizedText;
};

/**
 * Chưa có ảnh đời sống thật — không dùng stock photo đóng giả ảnh của Duy.
 * UI hiển thị trạng thái trung tính cho đến khi Duy gửi ảnh.
 */
export const lifePhotos: LifePhoto[] = [];

export const lifeTopics: { id: string; label: LocalizedText }[] = [
  { id: "travel", label: lt("Du lịch", "Travel") },
  { id: "coffee", label: lt("Cà phê", "Coffee") },
  { id: "friends", label: lt("Bạn bè", "Friends") },
  { id: "community", label: lt("Cộng đồng", "Community") },
  { id: "events", label: lt("Sự kiện", "Events") },
  { id: "daily-life", label: lt("Đời thường", "Daily life") },
];
