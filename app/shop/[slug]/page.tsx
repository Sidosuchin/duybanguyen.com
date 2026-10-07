import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getProduct, shopTeaserNote } from "@/data/products";

type Props = PageProps<"/shop/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: `${product.name} · Duy Ba Nguyen`,
      description: product.description,
      url: `/shop/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title={product.name}
        description={product.description}
      />
      <section aria-label="Chi tiết sản phẩm" className="border-t border-line">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-2">
          <Reveal>
            <div
              role="img"
              aria-label={`Ảnh sản phẩm ${product.name} — đang chờ ảnh thật`}
              className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-line bg-cream text-sm text-muted"
            >
              [CONTENT PLACEHOLDER] — Ảnh sản phẩm
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {product.type === "physical"
                ? "Sản phẩm vật lý"
                : product.type === "digital"
                  ? "Sản phẩm số"
                  : "Sản phẩm gợi ý"}
            </p>
            <p className="mt-4 font-display text-3xl font-extrabold text-terracotta">
              {product.price ?? "[chưa có giá]"}
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              {product.description}
            </p>
            <div className="mt-8 rounded-xl border border-dashed border-terracotta/60 bg-terracotta/5 px-5 py-4">
              <p className="text-sm leading-relaxed text-muted">
                {shopTeaserNote}
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/shop"
                className="link-underline font-medium text-terracotta"
              >
                ← Quay lại Shop
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
