import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ContentPlaceholder from "@/components/ContentPlaceholder";

export const metadata: Metadata = {
  title: "Về mình",
  description:
    "Duy Ba Nguyen là ai? Tính cách, sở thích, hành trình, giá trị và điều mình đang tập trung.",
  alternates: { canonical: "/ve-minh" },
  openGraph: {
    title: "Về mình · Duy Ba Nguyen",
    description:
      "Duy Ba Nguyen là ai? Tính cách, sở thích, hành trình, giá trị và điều mình đang tập trung.",
    url: "/ve-minh",
  },
};

const traits = [
  "Linh hoạt",
  "Thích nghi tốt",
  "Thoải mái",
  "Năng động",
  "Hòa đồng · Cộng đồng",
  "Thích khám phá",
  "Thích học hỏi",
  "Thích thử điều mới",
];

export default function VeMinhPage() {
  return (
    <>
      <PageHeader
        eyebrow="Về mình"
        title="Mình là Duy — một người trẻ đang sống, làm và khám phá."
        description="Trang này trả lời câu hỏi: Duy là người như thế nào?"
      />

      {/* Giới thiệu bản thân */}
      <section aria-label="Giới thiệu bản thân" className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
          <SectionHeading eyebrow="Giới thiệu" title="Chào bạn, mình là Duy" />
          <Reveal>
            <ContentPlaceholder
              label="[CONTENT PLACEHOLDER]"
              note="Đoạn giới thiệu bản thân: đang làm gì, ở đâu, quan tâm điều gì, hướng đến đâu?"
              className="py-12"
            />
          </Reveal>
        </div>
      </section>

      {/* Personality */}
      <section aria-label="Tính cách" className="border-t border-line bg-cream/50">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
          <SectionHeading
            eyebrow="Personality"
            title="Tính cách của mình"
            description="Tám tính từ này là bộ lọc cho mọi thứ mình làm — kể cả website này."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {traits.map((trait, i) => (
              <Reveal key={trait} delay={(i % 4) * 70}>
                <div className="rounded-2xl border border-line bg-paper px-4 py-6 text-center">
                  <p className="font-display text-base font-bold sm:text-lg">
                    {trait}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section aria-label="Sở thích" className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
          <SectionHeading eyebrow="Interests" title="Mình thích gì?" />
          <Reveal>
            <ContentPlaceholder
              label="[CONTENT PLACEHOLDER]"
              note="Liệt kê sở thích: ví dụ cà phê, âm nhạc, du lịch, công nghệ…"
              className="py-12"
            />
          </Reveal>
        </div>
      </section>

      {/* Journey */}
      <section aria-label="Hành trình" className="border-t border-line bg-cream/50">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
          <SectionHeading
            eyebrow="Journey"
            title="Hành trình của mình"
            description="Những cột mốc đã đưa mình đến hôm nay."
          />
          <Reveal>
            <ContentPlaceholder
              label="[CONTENT PLACEHOLDER]"
              note="Timeline các cột mốc: học tập, công việc, bước ngoặt… (chỉ điền mốc có thật)"
              className="py-12"
            />
          </Reveal>
        </div>
      </section>

      {/* Values + Current focus */}
      <section aria-label="Giá trị và trọng tâm hiện tại" className="border-t border-line">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Values" title="Điều mình tin" />
            <Reveal>
              <ContentPlaceholder
                label="[CONTENT PLACEHOLDER]"
                note="3–5 giá trị sống/làm việc của Duy"
                className="py-10"
              />
            </Reveal>
          </div>
          <div>
            <SectionHeading eyebrow="Current focus" title="Mình đang tập trung vào" />
            <Reveal>
              <ContentPlaceholder
                label="[CONTENT PLACEHOLDER]"
                note="1–3 điều đang dồn tâm sức nhất lúc này"
                className="py-10"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
