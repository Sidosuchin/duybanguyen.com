"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import SocialLinks from "./SocialLinks";
import { useLanguage } from "./LanguageProvider";

export default function Connect() {
  const { t } = useLanguage();

  return (
    <section aria-label={t.sections.connect.eyebrow}>
      <div className="mx-auto max-w-[1240px] px-5 py-16 text-center sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-deep dark:text-terracotta-light">
            {t.sections.connect.eyebrow}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t.sections.connect.title}
            <span className="text-terracotta">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t.sections.connect.text}
          </p>
          <SocialLinks className="mt-9 justify-center" />
          <div className="mt-9">
            <Link
              href="/lien-he"
              className="inline-block rounded-full bg-charcoal px-8 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-terracotta"
            >
              {t.sections.connect.cta}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
