"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { homeIntro } from "@/data/content";
import { pick } from "@/lib/i18n";

export default function Introduction() {
  const { lang, t } = useLanguage();

  return (
    <section aria-label={t.sections.intro.title} className="bg-cream-soft">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-deep dark:text-terracotta-light">
              {t.sections.intro.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t.sections.intro.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-2xl font-display text-xl font-medium leading-relaxed text-charcoal/90 sm:text-2xl sm:leading-relaxed">
              {pick(homeIntro, lang)}
            </p>
            <Link
              href="/ve-minh"
              className="link-underline mt-7 inline-block font-medium text-terracotta"
            >
              {t.sections.intro.readMore} →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
