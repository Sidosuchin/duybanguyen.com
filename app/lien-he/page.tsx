import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ContentPlaceholder from "@/components/ContentPlaceholder";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Kết nối với Duy Ba Nguyen — Facebook, Instagram, LinkedIn, Email.",
  alternates: { canonical: "/lien-he" },
  openGraph: {
    title: "Liên hệ · Duy Ba Nguyen",
    description: "Kết nối với Duy Ba Nguyen.",
    url: "/lien-he",
  },
};

const purposes = [
  {
    title: "Hợp tác",
    text: "Có project muốn làm cùng, hay cơ hội hợp tác dài hạn — mình rất muốn nghe.",
  },
  {
    title: "Cà phê",
    text: "Đơn giản là muốn gặp, trò chuyện, chia sẻ về những điều cả hai đang tò mò.",
  },
  {
    title: "Góp ý",
    text: "Thấy website này có gì hay / chưa hay, cứ nói mình biết nhé.",
  },
];

export default function LienHePage() {
  return (
    <>
      <PageHeader
        eyebrow="Connect"
        title="Kết nối với mình nhé"
        description="Bạn liên hệ vì việc gì nhất? Chọn một trong ba — hoặc cả ba cũng được."
      />

      <section aria-label="Lý do liên hệ" className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {purposes.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-line bg-paper p-6">
                  <h2 className="font-display text-lg font-bold">{p.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Kênh liên hệ" className="border-t border-line bg-cream/50">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
          <SectionHeading
            eyebrow="Kênh liên hệ"
            title="Tìm mình ở đây"
          />
          <Reveal>
            <SocialLinks />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8">
              <ContentPlaceholder
                label="[CONTENT PLACEHOLDER]"
                note="Link Facebook, Instagram, LinkedIn và email công khai — kênh nào không muốn public thì báo mình."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
