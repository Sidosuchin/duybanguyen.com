export type Project = {
  name: string;
  slug: string;
  role: string;
  category: string;
  year: string | null;
  summary: string;
  context: string;
  problem: string;
  whatIDid: string[];
  tools: string[];
  result: string;
  lessons: string[];
  /** image paths under /public — null entries render as placeholders */
  images: (string | null)[];
  /** Chỉ điền khi có số liệu thật đã được Duy xác nhận */
  metrics?: { label: string; value: string }[];
  /**
   * true = đây là MẪU BỐ CỤC để xem cấu trúc case study,
   * KHÔNG phải project/nội dung thật. UI phải gắn nhãn rõ ràng.
   */
  isSample?: boolean;
};

const PH = "[CONTENT PLACEHOLDER]";

export const projects: Project[] = [
  {
    name: "BAMOS COFFEE & TEA",
    slug: "bamos-coffee-tea",
    role: PH,
    category: PH,
    year: null,
    summary:
      "MẪU BỐ CỤC — đây chỉ là khung trình bày case study, chưa phải nội dung thật. Mọi trường bên dưới đang chờ Duy cung cấp.",
    context: PH,
    problem: PH,
    whatIDid: [PH],
    tools: [PH],
    result: PH,
    lessons: [PH],
    images: [null, null],
    isSample: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
