import Link from "next/link";
import Reveal from "./Reveal";
import ContentPlaceholder from "./ContentPlaceholder";

export default function Introduction() {
  return (
    <section aria-label="Giới thiệu ngắn" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              Introduction
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Vài dòng về mình
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <ContentPlaceholder
              label="[CONTENT PLACEHOLDER]"
              note="3–4 dòng định vị: mình là ai, đang làm gì, ở đâu, hướng đến đâu?"
              className="py-10"
            />
            <Link
              href="/ve-minh"
              className="link-underline mt-6 inline-block font-medium text-terracotta"
            >
              Đọc thêm về mình →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
