"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useLanguage } from "./LanguageProvider";
import { posts, categoryLabel } from "@/data/posts";
import { pick } from "@/lib/i18n";

const latestPosts = posts.slice(0, 3);

export default function NotesPreview() {
  const { lang, t } = useLanguage();

  return (
    <section aria-label={t.sections.notes.title}>
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow={t.sections.notes.eyebrow}
          title={t.sections.notes.title}
          description={t.sections.notes.description}
        />
        {latestPosts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {latestPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <Link
                  href={`/goc-cua-duy/${post.slug}`}
                  className="group block h-full rounded-xl border border-line bg-paper p-6 transition-colors hover:border-terracotta/50"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                    {pick(categoryLabel(post.category), lang)}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug transition-colors group-hover:text-terracotta">
                    {pick(post.title, lang)}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-muted">
                    {pick(post.excerpt, lang)}
                  </p>
                  <p className="mt-4 text-sm text-muted">
                    {post.date} · {pick(post.readingTime, lang)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="rounded-xl border border-line bg-cream-soft px-6 py-12 text-center sm:py-16">
              <p className="mx-auto max-w-md font-display text-xl font-bold leading-snug sm:text-2xl">
                {t.sections.notes.emptyText}
              </p>
            </div>
          </Reveal>
        )}
        <Reveal>
          <Link
            href="/goc-cua-duy"
            className="link-underline mt-9 inline-block font-medium text-terracotta"
          >
            {t.sections.notes.readMore} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
