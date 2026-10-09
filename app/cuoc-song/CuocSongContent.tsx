"use client";

import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ImagePanel from "@/components/ImagePanel";
import { useLanguage } from "@/components/LanguageProvider";
import { lifePhotos, lifeTopics } from "@/data/life";
import { pick } from "@/lib/i18n";

export default function CuocSongContent() {
  const { lang, t } = useLanguage();
  const p = t.pages.life;

  return (
    <>
      <PageHeader
        eyebrow={p.headerEyebrow}
        title={p.headerTitle}
        description={p.headerDescription}
      />

      <section aria-label={t.a11y.topics} className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8">
          <Reveal>
            <ul className="flex flex-wrap gap-2" aria-label={t.a11y.topics}>
              {lifeTopics.map((topic) => (
                <li
                  key={topic.id}
                  className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm text-muted"
                >
                  {pick(topic.label, lang)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-label={p.journalTitle} className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
          {lifePhotos.length > 0 ? (
            <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
              {lifePhotos.map((photo, i) => (
                <Reveal key={i} delay={(i % 3) * 70} className="break-inside-avoid">
                  <figure className="overflow-hidden rounded-xl border border-line bg-paper">
                    {photo.src ? (
                      <Image
                        src={photo.src}
                        alt={pick(photo.alt, lang)}
                        width={800}
                        height={600}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    ) : (
                      <ImagePanel
                        ariaLabel={pick(photo.alt, lang)}
                        monogram={pick(photo.caption, lang).charAt(0)}
                        className="aspect-[4/3] w-full"
                      />
                    )}
                    <figcaption className="p-4 text-sm">
                      <p className="font-medium">{pick(photo.caption, lang)}</p>
                      <p className="mt-1 text-muted">
                        {[
                          photo.date,
                          photo.location ? pick(photo.location, lang) : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          ) : (
            <>
              <SectionHeading eyebrow={p.journalEyebrow} title={p.journalTitle} />
              <Reveal>
                <div className="rounded-xl border border-line bg-cream-soft px-6 py-14 text-center">
                  <p className="mx-auto max-w-md font-display text-xl font-bold leading-snug sm:text-2xl">
                    {t.sections.life.emptyText}
                  </p>
                </div>
              </Reveal>
            </>
          )}
        </div>
      </section>
    </>
  );
}
