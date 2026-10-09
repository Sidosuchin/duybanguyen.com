import { lt, type LocalizedText } from "@/lib/i18n";

export type Product = {
  name: string;
  slug: string;
  description: LocalizedText;
  /** null = chưa có giá thật */
  price: string | null;
  /** image path under /public — null = chưa có ảnh */
  image: string | null;
  type: "physical" | "digital" | "affiliate";
  status: "draft" | "coming-soon" | "available";
};

/**
 * SHOP TEASER — theo quyết định D5 (Phase 1): dựng kiến trúc sẵn,
 * chỉ teaser ở giai đoạn đầu, bật giỏ hàng/checkout ở Phase 6.
 * Chưa có sản phẩm thật: không bịa tên, giá hay ảnh sản phẩm.
 */
export const products: Product[] = [];

export const shopIntro: LocalizedText = lt(
  "Những thứ mình tạo ra, sử dụng hoặc muốn chia sẻ.",
  "Things I create, use, or want to share."
);

export const shopTeaserNote: LocalizedText = lt(
  "Shop hiện tại chỉ là teaser — giỏ hàng và thanh toán sẽ mở ở giai đoạn tiếp theo.",
  "The shop is a teaser for now — cart and checkout arrive in a later phase."
);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
