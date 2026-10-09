"use client";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SocialLinks from "@/components/SocialLinks";
import { useLanguage } from "@/components/LanguageProvider";
import { contactPurposes } from "@/data/content";
import { socials } from "@/data/site";
import { pick } from "@/lib/i18n";

export default function LienHeContent() {
  const { lang, t } = useLanguage();
  const p = t.pages.contact;
  const anySocialLinked = socials.some((s) => s.url);

  return (
    <>
      <PageHeader
        eyebrow={p.headerEyebrow}
        title={p.headerTitle}
        description={p.headerDescription}
      />

      <section aria-label={p.headerTitle} className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            {contactPurposes.map((purpose, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="h-full rounded-xl border border-line bg-paper p-6 transition-colors hover:border-terracotta/40">
                  <h2 className="font-display text-lg font-bold">
                    {pick(purpose.title, lang)}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {pick(purpose.text, lang)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label={p.channelsTitle} className="bg-cream-soft">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeading eyebrow={p.channelsEyebrow} title={p.channelsTitle} />
          <Reveal>
            <SocialLinks />
          </Reveal>
          {!anySocialLinked && (
            <Reveal delay={80}>
              <p className="mt-7 text-[15px] text-muted">{p.channelsNote}</p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
