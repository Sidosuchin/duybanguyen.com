import { lt, type LocalizedList, type LocalizedText } from "@/lib/i18n";

export type NowBlock = {
  id: string;
  /** Card heading in both languages */
  label: LocalizedText;
  items: LocalizedList;
};

/**
 * Section NOW — Duy tự cập nhật tay bằng cách sửa file này.
 * Nội dung hiện tại lấy từ ví dụ trong brief của Duy (Phase 1) —
 * thay bằng nhịp sống thật bất cứ lúc nào.
 */
export const nowUpdatedAt: string | null = "2026-10";

export const nowBlocks: NowBlock[] = [
  {
    id: "building",
    label: lt("Đang xây dựng", "Currently Building"),
    items: {
      vi: ["Website cá nhân của mình"],
      en: ["My personal website"],
    },
  },
  {
    id: "learning",
    label: lt("Đang học", "Currently Learning"),
    items: {
      vi: ["English · AI · Automation"],
      en: ["English · AI · Automation"],
    },
  },
  {
    id: "exploring",
    label: lt("Đang khám phá", "Currently Exploring"),
    items: {
      vi: ["Kinh doanh · Công nghệ · Cuộc sống"],
      en: ["Business · Technology · Life"],
    },
  },
  {
    id: "enjoying",
    label: lt("Đang tận hưởng", "Currently Enjoying"),
    items: {
      vi: ["Cà phê · Âm nhạc · Những người bạn tốt"],
      en: ["Coffee · Music · Good people"],
    },
  },
];
