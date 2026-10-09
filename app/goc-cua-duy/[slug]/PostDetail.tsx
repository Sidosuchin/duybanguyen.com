"use client";

import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ImagePanel from "@/components/ImagePanel";
import { useLanguage } from "@/components/LanguageProvider";
import type { Post } from "@/data/posts";
import { categoryLabel } from "@/data/posts";
import { pick, pickList } from "@/lib/i18n";

export default function PostDetail({ post }: { post: Post }) {
  const { lang, t } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow={pick(categoryLabel(post.category), lang)}
        title={pick(post.title, lang)}
        description={`${post.date} · ${pick(post.readingTime, lang)}`}
      />
      <article className="border-t border-line">
        <div className="mx-auto max-w-[760px] px-5 py-12 sm:px-8">
          <Reveal>
            <p className="text-lg leading-relaxed text-charcoal/90 sm:text-xl">
              {pick(post.excerpt, lang)}
            </p>
          </Reveal>
          {post.cover ? (
            <Reveal>
              <Image
                src={post.cover}
                alt={t.post.coverAlt}
                width={1200}
                height={750}
                className="mt-8 aspect-[16/10] w-full rounded-xl border border-line object-cover"
              />
            </Reveal>
          ) : (
            <Reveal>
              <ImagePanel
                ariaLabel={t.post.coverAlt}
                monogram={pick(post.title, lang).charAt(0)}
                className="mt-8 aspect-[16/10] w-full rounded-xl border border-line"
              />
            </Reveal>
          )}
          <div className="mt-8 space-y-5">
            {pickList(post.body, lang).map((paragraph, i) => (
              <Reveal key={i}>
                <p className="text-base leading-relaxed text-charcoal/90 sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 border-t border-line pt-8">
              <Link
                href="/goc-cua-duy"
                className="link-underline font-medium text-terracotta"
              >
                ← {t.post.back}
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
