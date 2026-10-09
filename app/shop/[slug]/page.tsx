import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";
import { getProduct, products } from "@/data/products";
import { pick } from "@/lib/i18n";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = PageProps<"/shop/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: pick(product.description, "vi"),
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: `${product.name} · Duy Ba Nguyen`,
      description: pick(product.description, "vi"),
      url: `/shop/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
