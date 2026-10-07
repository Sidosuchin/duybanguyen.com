export type NowBlock = {
  id: string;
  /** English label — theo quy ước voice của brand */
  label: string;
  /** Vietnamese sub-label */
  vi: string;
  items: string[];
};

/**
 * Section NOW — Duy tự cập nhật tay.
 * Chưa có nội dung thật: giữ [CONTENT PLACEHOLDER], không bịa.
 */
export const nowUpdatedAt: string | null = null;

export const nowBlocks: NowBlock[] = [
  {
    id: "building",
    label: "Currently Building",
    vi: "Đang xây dựng",
    items: ["[CONTENT PLACEHOLDER]"],
  },
  {
    id: "learning",
    label: "Currently Learning",
    vi: "Đang học",
    items: ["[CONTENT PLACEHOLDER]"],
  },
  {
    id: "exploring",
    label: "Currently Exploring",
    vi: "Đang khám phá",
    items: ["[CONTENT PLACEHOLDER]"],
  },
  {
    id: "enjoying",
    label: "Currently Enjoying",
    vi: "Đang tận hưởng",
    items: ["[CONTENT PLACEHOLDER]"],
  },
];
