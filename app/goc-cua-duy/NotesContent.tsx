"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { postCategories, posts, categoryLabel } from "@/data/posts";
import { pick } from "@/lib/i18n";

export default function NotesContent() {
  const { lang, t } = useLanguage();
  const p = t.pages.notes;

  return (
    <>
      <PageHeader
        eyebrow={p.headerEyebrow}
        title={p.headerTitle}
        description={p.headerDescription}
      />

      <section aria-label={t.a11y.categories} className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8">
          <Reveal>
            <ul className="flex flex-wrap gap-2" aria-label={t.a11y.categories}>
              {postCategories.map((cat) => (
                <li
                  key={cat.id}
                  className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm text-muted"
                >
                  {pick(cat.label, lang)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-label={p.headerTitle} className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
          {posts.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 80}>
                  <Link
                    href={`/goc-cua-duy/${post.slug}`}
                    className="group block h-full rounded-xl border border-line bg-paper p-6 transition-colors hover:border-terracotta/50"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                      {pick(categoryLabel(post.category), lang)}
                    </p>
                    <h2 className="mt-3 font-display text-xl font-bold leading-snug transition-colors group-hover:text-terracotta">
                      {pick(post.title, lang)}
                    </h2>
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
              <div className="rounded-xl border border-line bg-cream-soft px-6 py-14 text-center">
                <p className="mx-auto max-w-md font-display text-xl font-bold leading-snug sm:text-2xl">
                  {t.sections.notes.emptyText}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
