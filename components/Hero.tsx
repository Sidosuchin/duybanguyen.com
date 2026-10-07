import Link from "next/link";
import Reveal from "./Reveal";
import ContentPlaceholder from "./ContentPlaceholder";

export default function Hero() {
  return (
    <section aria-label="Giới thiệu" className="overflow-hidden">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-2 lg:gap-14 lg:pb-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
            Duy Ba Nguyen
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Xin chào, mình là Duy.
          </h1>
          <p className="mt-6 font-display text-xl font-bold leading-snug sm:text-2xl">
            Mình sống <span className="text-terracotta">·</span> Mình xây dựng{" "}
            <span className="text-terracotta">·</span> Mình khám phá
            <span className="text-terracotta">.</span>
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Mình thích khám phá những điều mới, xây dựng những thứ có giá trị
            và kết nối với mọi người.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ve-minh"
              className="rounded-lg bg-charcoal px-6 py-3 text-[15px] font-semibold text-paper transition-colors hover:bg-terracotta"
            >
              Về mình
            </Link>
            <Link
              href="/cong-viec"
              className="rounded-lg border border-charcoal/25 px-6 py-3 text-[15px] font-semibold transition-colors hover:border-terracotta hover:text-terracotta"
            >
              Xem công việc
            </Link>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div
            role="img"
            aria-label="Ảnh lifestyle của Duy — đang chờ ảnh thật"
            className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-line bg-cream p-6"
          >
            <ContentPlaceholder
              label="[CONTENT PLACEHOLDER]"
              note="Ảnh Hero: 1 ảnh lifestyle đời thường, ngang, nét cao"
              className="w-full border-0 bg-transparent"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
