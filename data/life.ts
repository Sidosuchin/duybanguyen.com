export type LifePhoto = {
  /** image path under /public — null = chưa có ảnh thật */
  src: string | null;
  caption: string;
  date: string | null;
  location: string | null;
  alt: string;
};

/**
 * Chưa có ảnh đời sống thật — không dùng stock photo đóng giả ảnh của Duy.
 * UI render khung placeholder cho đến khi Duy gửi ảnh.
 */
export const lifePhotos: LifePhoto[] = [];

export const lifeTopics = [
  "Travel",
  "Coffee",
  "Friends",
  "Community",
  "Events",
  "Daily life",
] as const;
