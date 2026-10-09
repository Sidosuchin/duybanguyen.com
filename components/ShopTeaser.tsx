"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ImagePanel from "./ImagePanel";
import { useLanguage } from "./LanguageProvider";
import { products, shopIntro } from "@/data/products";
import { pick } from "@/lib/i18n";

const teaserProducts = products.slice(0, 3);

export default function ShopTeaser() {
  const { lang, t } = useLanguage();

  return (
    <section aria-label={t.sections.shop.title} className="bg-cream-soft">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow={t.sections.shop.eyebrow}
          title={t.sections.shop.title}
          description={pick(shopIntro, lang)}
        />
        {teaserProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teaserProducts.map((product, i) => (
              <Reveal key={product.slug} delay={i * 80}>
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
                  <h3 className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-terracotta">
                    {product.name}
                  </h3>
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
            <div className="rounded-xl border border-line bg-paper px-6 py-12 text-center sm:py-16">
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
          <Link
            href="/shop"
            className="link-underline mt-9 inline-block font-medium text-terracotta"
          >
            {t.sections.shop.viewAll} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
