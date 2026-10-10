"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useLanguage } from "./LanguageProvider";
import { nowBlocks, nowUpdatedAt } from "@/data/now";
import { pick, pickList } from "@/lib/i18n";

function formatUpdated(ym: string, lang: "vi" | "en"): string {
  const [y, m] = ym.split("-");
  return lang === "vi" ? `${m}/${y}` : `${m}/${y}`;
}

export default function Now() {
  const { lang, t } = useLanguage();

  return (
    <section aria-label="Now">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow={t.sections.now.eyebrow}
          title={t.sections.now.title}
          description={t.sections.now.description}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nowBlocks.map((block, i) => (
            <Reveal key={block.id} delay={i * 80}>
              <article className="h-full rounded-xl border border-line bg-paper p-6 transition-colors hover:border-terracotta/40">
                <p className="font-display text-sm font-extrabold text-terracotta-deep dark:text-terracotta-light">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug">
                  {pick(block.label, lang)}
                </h3>
                <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-muted">
                  {pickList(block.items, lang).map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        {nowUpdatedAt && (
          <Reveal delay={200}>
            <p className="mt-7 text-sm text-muted">
              {t.sections.now.updated}: {formatUpdated(nowUpdatedAt, lang)}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
