import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-24 text-center sm:px-8 sm:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Ối, lạc đường rồi bạn ơi.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
        Trang bạn tìm không tồn tại — nhưng nhà của mình thì ở ngay đây.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-charcoal px-6 py-3 text-[15px] font-semibold text-paper transition-colors hover:bg-terracotta"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
