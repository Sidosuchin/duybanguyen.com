import { lt, type LocalizedList, type LocalizedText } from "@/lib/i18n";

export type Project = {
  name: string;
  slug: string;
  role: LocalizedText;
  category: LocalizedText;
  year: string | null;
  summary: LocalizedText;
  context: LocalizedText;
  problem: LocalizedText;
  whatIDid: LocalizedList;
  tools: LocalizedList;
  result: LocalizedText;
  lessons: LocalizedList;
  /** image paths under /public — null entries render as editorial panels */
  images: (string | null)[];
  /** Chỉ điền khi có số liệu thật đã được Duy xác nhận */
  metrics?: { label: LocalizedText; value: string }[];
  /**
   * true = đây là MẪU BỐ CỤC để xem cấu trúc case study,
   * KHÔNG phải project/nội dung thật. UI luôn gắn nhãn rõ ràng.
   */
  isSample?: boolean;
};

const sampleNote = lt(
  "Nội dung mẫu trung tính để xem bố cục — sẽ được thay bằng case study thật.",
  "Neutral sample copy to preview the layout — to be replaced with a real case study."
);

export const projects: Project[] = [
  {
    name: "BAMOS COFFEE & TEA",
    slug: "bamos-coffee-tea",
    role: sampleNote,
    category: sampleNote,
    year: null,
    summary: lt(
      "Mẫu bố cục case study — khung trình bày gồm bối cảnh, vấn đề, việc đã làm, công cụ, kết quả và điều học được. Nội dung thật sẽ được cập nhật tại đây.",
      "Case-study layout sample — a frame covering context, problem, what was done, tools, results and lessons. Real content will live here."
    ),
    context: sampleNote,
    problem: sampleNote,
    whatIDid: { vi: [sampleNote.vi], en: [sampleNote.en] },
    tools: { vi: [sampleNote.vi], en: [sampleNote.en] },
    result: sampleNote,
    lessons: { vi: [sampleNote.vi], en: [sampleNote.en] },
    images: [null, null],
    isSample: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
