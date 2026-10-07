import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ContentPlaceholder from "./ContentPlaceholder";
import { products, shopIntro, shopTeaserNote } from "@/data/products";

const teaserProducts = products.slice(0, 3);

export default function ShopTeaser() {
  return (
    <section aria-label="Cửa hàng" className="border-t border-line bg-cream/50">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Shop"
          title="My Shop"
          description={shopIntro}
        />
        {teaserProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teaserProducts.map((product, i) => (
              <Reveal key={product.slug} delay={i * 80}>
                <Link
                  href={`/shop/${product.slug}`}
                  className="group block h-full rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-terracotta/50"
                >
                  <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-cream text-sm text-muted">
                    [Ảnh sản phẩm]
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-terracotta">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted">
                    {product.description}
                  </p>
                  <p className="mt-3 font-display font-bold text-terracotta">
                    {product.price ?? "—"}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <ContentPlaceholder
              label="[CONTENT PLACEHOLDER]"
              note="Chưa có sản phẩm thật. Chỉ cần cho mình biết định bán gì (vật lý / số / gợi ý liên kết) — chi tiết ở Phase 6."
              className="py-12"
            />
          </Reveal>
        )}
        <Reveal>
          <p className="mt-6 text-sm text-muted">{shopTeaserNote}</p>
          <Link
            href="/shop"
            className="link-underline mt-4 inline-block font-medium text-terracotta"
          >
            Vào Shop →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
