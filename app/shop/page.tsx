import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContentPlaceholder from "@/components/ContentPlaceholder";
import { products, shopIntro, shopTeaserNote } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "My Shop — những thứ Duy Ba Nguyen tạo ra, sử dụng hoặc muốn chia sẻ. Hiện tại chỉ là teaser.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "My Shop · Duy Ba Nguyen",
    description: shopIntro,
    url: "/shop",
  },
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="My Shop"
        description={shopIntro}
      />

      <section aria-label="Danh sách sản phẩm" className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
          {products.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <Reveal key={product.slug} delay={(i % 3) * 80}>
                  <a
                    href={`/shop/${product.slug}`}
                    className="group block h-full rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-terracotta/50"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-cream text-sm text-muted">
                      [Ảnh sản phẩm]
                    </div>
                    <h2 className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-terracotta">
                      {product.name}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted">
                      {product.description}
                    </p>
                    <p className="mt-3 font-display font-bold text-terracotta">
                      {product.price ?? "—"}
                    </p>
                  </a>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <ContentPlaceholder
                label="[CONTENT PLACEHOLDER]"
                note="Chưa có sản phẩm thật. Cho mình biết định bán gì (vật lý / số / gợi ý liên kết) — giỏ hàng và checkout mở ở Phase 6."
                className="py-14"
              />
            </Reveal>
          )}
          <Reveal>
            <p className="mt-8 rounded-xl border border-line bg-cream/60 px-5 py-4 text-sm leading-relaxed text-muted">
              {shopTeaserNote} Shop ở đây là một góc của personal brand — cùng
              font, cùng màu, không biến thành cửa hàng ecommerce.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
