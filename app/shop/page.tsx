import type { Metadata } from "next";
import ShopContent from "./ShopContent";
import { shopIntro } from "@/data/products";
import { pick } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "My Shop — những thứ Duy Ba Nguyen tạo ra, sử dụng hoặc muốn chia sẻ. Hiện tại chỉ là teaser.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "My Shop · Duy Ba Nguyen",
    description: pick(shopIntro, "vi"),
    url: "/shop",
  },
};

export default function ShopPage() {
  return <ShopContent />;
}
