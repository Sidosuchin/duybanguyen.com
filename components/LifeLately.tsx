"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ImagePanel from "./ImagePanel";
import EmptyMotif from "./EmptyMotif";
import { useLanguage } from "./LanguageProvider";
import { lifePhotos, lifeTopics } from "@/data/life";
import { pick } from "@/lib/i18n";

const previewPhotos = lifePhotos.slice(0, 6);

export default function LifeLately() {
  const { lang, t } = useLanguage();

  return (
    <section aria-label={t.sections.life.title} className="bg-cream-soft">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow={t.sections.life.eyebrow}
          title={t.sections.life.title}
          description={t.sections.life.description}
        />
        {previewPhotos.length > 0 ? (
          <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {previewPhotos.map((photo, i) => (
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
                      {[photo.date, photo.location ? pick(photo.location, lang) : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="rounded-xl border border-line bg-paper px-6 py-12 text-center sm:py-16">
              <EmptyMotif />
              <p className="mx-auto max-w-md font-display text-xl font-bold leading-snug sm:text-2xl">
                {t.sections.life.emptyText}
              </p>
              <ul
                className="mt-8 flex flex-wrap justify-center gap-2"
                aria-label={t.a11y.topics}
              >
                {lifeTopics.map((topic) => (
                  <li
                    key={topic.id}
                    className="rounded-full border border-line bg-cream-soft px-4 py-1.5 text-sm text-muted"
                  >
                    {pick(topic.label, lang)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
        <Reveal>
          <Link
            href="/cuoc-song"
            className="link-underline mt-9 inline-block font-medium text-terracotta"
          >
            {t.sections.life.viewAll} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
