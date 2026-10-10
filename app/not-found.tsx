"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-24 text-center sm:px-8 sm:py-32">
      {/* The sleeping cat — the same artwork as the gate's completion
          screen — rests above the numeral. Purely decorative: the
          heading and text below carry the meaning. */}
      <Image
        src="/images/cat-night.webp"
        alt=""
        width={512}
        height={512}
        className="mx-auto mb-9 h-28 w-28 rounded-full border border-line object-cover shadow-[0_10px_30px_rgba(22,18,15,0.12)] sm:h-36 sm:w-36"
      />
      <p className="font-display text-7xl font-extrabold tracking-tight text-terracotta sm:text-8xl">
        {t.notFound.eyebrow}
      </p>
      <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        {t.notFound.title}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
        {t.notFound.text}
      </p>
      <Link
        href="/"
        className="mt-9 inline-block rounded-lg bg-charcoal px-7 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-terracotta"
      >
        {t.notFound.cta}
      </Link>
    </div>
  );
}
