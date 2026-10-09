"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { site } from "@/data/site";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section aria-label="Hero" className="overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
            <span aria-hidden="true" className="h-px w-10 bg-terracotta" />
            {site.name}
          </p>
          <h1 className="mt-6 font-display text-[2.9rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.6rem]">
            {t.hero.greeting}
          </h1>
          <p className="mt-7 font-display text-[1.35rem] font-bold leading-snug sm:text-[1.7rem]">
            {t.hero.live} <span className="text-terracotta">·</span>{" "}
            {t.hero.build} <span className="text-terracotta">·</span>{" "}
            {t.hero.explore}
            <span className="text-terracotta">.</span>
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t.hero.intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/ve-minh"
              className="rounded-lg bg-charcoal px-7 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-terracotta"
            >
              {t.hero.ctaAbout}
            </Link>
            <Link
              href="/cong-viec"
              className="rounded-lg border border-charcoal/25 px-7 py-3.5 text-[15px] font-semibold transition-colors hover:border-terracotta hover:text-terracotta"
            >
              {t.hero.ctaWork}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={140}>
          {/*
            Portrait area — typographic monogram treatment (no photo yet).
            When Duy provides a real portrait, replace this panel's inner
            content with the photo; the frame stays the same.
          */}
          <div
            role="img"
            aria-label={t.hero.portraitAlt}
            className="dot-grid relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-t-[10rem] rounded-b-2xl border border-line bg-cream text-charcoal"
          >
            {/* terracotta sun accent */}
            <div
              aria-hidden="true"
              className="absolute right-[13%] top-[15%] h-20 w-20 rounded-full bg-terracotta sm:h-24 sm:w-24"
            />
            {/* monogram */}
            <div className="absolute inset-x-0 bottom-[16%] text-center">
              <p
                aria-hidden="true"
                className="font-display text-[6.5rem] font-extrabold leading-none tracking-tight sm:text-[8rem]"
              >
                D<span className="text-terracotta">B</span>N
              </p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
                {t.hero.portraitCaption}
              </p>
            </div>
            {/* baseline rule */}
            <div
              aria-hidden="true"
              className="absolute inset-x-[12%] bottom-[9%] h-px bg-charcoal/20"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
