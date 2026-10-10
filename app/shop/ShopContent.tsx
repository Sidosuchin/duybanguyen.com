"use client";

import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ImagePanel from "@/components/ImagePanel";
import EmptyMotif from "@/components/EmptyMotif";
import { useLanguage } from "@/components/LanguageProvider";
import { products, shopIntro, shopTeaserNote } from "@/data/products";
import { pick } from "@/lib/i18n";

export default function ShopContent() {
  const { lang, t } = useLanguage();
  const p = t.pages.shop;

  return (
    <>
      <PageHeader
        eyebrow={p.headerEyebrow}
        title={p.headerTitle}
        description={pick(shopIntro, lang)}
      />

      <section aria-label={p.headerTitle} className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
          {products.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <Reveal key={product.slug} delay={(i % 3) * 80}>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="group block h-full rounded-xl border border-line bg-paper p-5 transition-colors hover:border-terracotta/50"
                  >
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={800}
                        height={600}
                        className="aspect-[4/3] w-full rounded-lg object-cover"
                      />
                    ) : (
                      <ImagePanel
                        ariaLabel={t.sections.shop.productPhoto}
                        monogram={product.name.charAt(0)}
                        className="aspect-[4/3] w-full rounded-lg"
                      />
                    )}
                    <h2 className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-terracotta">
                      {product.name}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted">
                      {pick(product.description, lang)}
                    </p>
                    <p className="mt-3 font-display font-bold text-terracotta">
                      {product.price ?? t.sections.shop.comingSoon}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="rounded-xl border border-line bg-cream-soft px-6 py-14 text-center">
                <EmptyMotif />
                <p className="mx-auto max-w-md font-display text-xl font-bold leading-snug sm:text-2xl">
                  {t.sections.shop.comingSoon}
                  <span className="text-terracotta">.</span>
                </p>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                  {pick(shopIntro, lang)}
                </p>
              </div>
            </Reveal>
          )}
          <Reveal>
            <p className="mt-9 rounded-xl border border-line bg-cream-soft px-5 py-4 text-sm leading-relaxed text-muted">
              {pick(shopTeaserNote, lang)} {p.noteSuffix}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
