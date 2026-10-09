"use client";

import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ImagePanel from "@/components/ImagePanel";
import { useLanguage } from "@/components/LanguageProvider";
import type { Product } from "@/data/products";
import { shopTeaserNote } from "@/data/products";
import { pick } from "@/lib/i18n";

export default function ProductDetail({ product }: { product: Product }) {
  const { lang, t } = useLanguage();
  const pd = t.product;

  const typeLabel =
    product.type === "physical"
      ? pd.physical
      : product.type === "digital"
        ? pd.digital
        : pd.affiliate;

  return (
    <>
      <PageHeader
        eyebrow={t.pages.shop.headerEyebrow}
        title={product.name}
        description={pick(product.description, lang)}
      />
      <section aria-label={product.name} className="border-t border-line">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2">
          <Reveal>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={1000}
                height={750}
                className="aspect-[4/3] w-full rounded-xl border border-line object-cover"
              />
            ) : (
              <ImagePanel
                ariaLabel={pd.imageAlt}
                monogram={product.name.charAt(0)}
                className="aspect-[4/3] w-full rounded-xl border border-line"
              />
            )}
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {typeLabel}
            </p>
            <p className="mt-4 font-display text-3xl font-extrabold text-terracotta">
              {product.price ?? t.sections.shop.comingSoon}
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              {pick(product.description, lang)}
            </p>
            <div className="mt-8 rounded-xl border border-line bg-cream-soft px-5 py-4">
              <p className="text-sm leading-relaxed text-muted">
                {pick(shopTeaserNote, lang)}
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/shop"
                className="link-underline font-medium text-terracotta"
              >
                ← {pd.back}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
