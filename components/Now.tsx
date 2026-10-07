import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { nowBlocks, nowUpdatedAt } from "@/data/now";

export default function Now() {
  return (
    <section aria-label="Hiện tại" className="border-t border-line bg-cream/50">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Now"
          title="Mình đang làm gì dạo này?"
          description="Section này mình tự cập nhật tay — để bạn biết site này đang sống, và mình cũng vậy."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nowBlocks.map((block, i) => (
            <Reveal key={block.id} delay={i * 80}>
              <article className="h-full rounded-2xl border border-line bg-paper p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta">
                  {block.label}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold">
                  {block.vi}
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-muted">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-6 text-sm text-muted">
            Cập nhật: {nowUpdatedAt ?? "[chưa có]"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
