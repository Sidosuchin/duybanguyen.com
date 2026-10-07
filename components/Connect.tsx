import Link from "next/link";
import Reveal from "./Reveal";
import SocialLinks from "./SocialLinks";

export default function Connect() {
  return (
    <section aria-label="Kết nối" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-14 text-center sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            Connect
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Kết nối với mình nhé
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Muốn hợp tác, mời cà phê, hay chỉ đơn giản là chào nhau một câu —
            mình luôn vui khi quen thêm bạn mới.
          </p>
          <SocialLinks className="mt-8 justify-center" />
          <Link
            href="/lien-he"
            className="mt-8 inline-block rounded-lg bg-terracotta px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-deep"
          >
            Tới trang liên hệ
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
