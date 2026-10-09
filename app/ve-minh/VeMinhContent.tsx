"use client";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";
import {
  aboutIntro,
  traits,
  interests,
  values,
  journeyNote,
} from "@/data/content";
import { nowBlocks } from "@/data/now";
import { pick, pickList } from "@/lib/i18n";

export default function VeMinhContent() {
  const { lang, t } = useLanguage();
  const p = t.pages.about;

  return (
    <>
      <PageHeader
        eyebrow={p.headerEyebrow}
        title={p.headerTitle}
        description={p.headerDescription}
      />

      {/* Giới thiệu bản thân */}
      <section aria-label={p.introTitle} className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
          <SectionHeading eyebrow={p.introEyebrow} title={p.introTitle} />
          <Reveal>
            <p className="max-w-3xl font-display text-xl font-medium leading-relaxed text-charcoal/90 sm:text-2xl sm:leading-relaxed">
              {pick(aboutIntro, lang)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Personality */}
      <section aria-label={p.personalityTitle} className="bg-cream-soft">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow={p.personalityEyebrow}
            title={p.personalityTitle}
            description={p.personalityDescription}
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {traits.map((trait, i) => (
              <Reveal key={i} delay={(i % 4) * 70}>
                <div className="rounded-xl border border-line bg-paper px-4 py-7 text-center transition-colors hover:border-terracotta/40">
                  <p className="font-display text-base font-bold sm:text-lg">
                    {pick(trait, lang)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section aria-label={p.interestsTitle}>
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
          <SectionHeading eyebrow={p.interestsEyebrow} title={p.interestsTitle} />
          <Reveal>
            <ul className="flex flex-wrap gap-2.5">
              {interests.map((interest, i) => (
                <li
                  key={i}
                  className="rounded-full border border-line bg-cream-soft px-5 py-2.5 font-display text-[15px] font-semibold"
                >
                  {pick(interest, lang)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Journey */}
      <section aria-label={p.journeyTitle} className="bg-charcoal text-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal className="mb-10 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-light">
              {p.journeyEyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.15]">
              {p.journeyTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/65 sm:text-lg">
              {p.journeyDescription}
            </p>
          </Reveal>
          <Reveal>
            <p className="max-w-2xl font-display text-xl font-medium leading-relaxed text-paper/90 sm:text-2xl sm:leading-relaxed">
              {pick(journeyNote, lang)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values + Current focus */}
      <section aria-label={p.valuesTitle}>
        <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={p.valuesEyebrow} title={p.valuesTitle} />
            <div className="space-y-4">
              {values.map((value, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="rounded-xl border border-line bg-paper p-6">
                    <h3 className="font-display text-lg font-bold">
                      {pick(value.title, lang)}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                      {pick(value.text, lang)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={p.focusEyebrow} title={p.focusTitle} />
            <Reveal>
              <ul className="space-y-4">
                {nowBlocks.map((block) => (
                  <li
                    key={block.id}
                    className="rounded-xl border border-line bg-cream-soft p-6"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta">
                      {pick(block.label, lang)}
                    </p>
                    <p className="mt-2 font-display text-lg font-bold leading-snug">
                      {pickList(block.items, lang).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
