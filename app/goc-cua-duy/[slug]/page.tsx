import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getPost } from "@/data/posts";

type Props = PageProps<"/goc-cua-duy/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/goc-cua-duy/${post.slug}` },
    openGraph: {
      title: `${post.title} · Duy Ba Nguyen`,
      description: post.excerpt,
      url: `/goc-cua-duy/${post.slug}`,
      type: "article",
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        description={`${post.date} · ${post.readingTime}`}
      />
      <article className="border-t border-line">
        <div className="mx-auto max-w-[760px] px-5 py-12 sm:px-8">
          <Reveal>
            <p className="text-lg leading-relaxed text-charcoal/90 sm:text-xl">
              {post.excerpt}
            </p>
          </Reveal>
          {post.cover ? null : (
            <Reveal>
              <div
                role="img"
                aria-label="Ảnh bìa bài viết — đang chờ ảnh thật"
                className="mt-8 flex aspect-[16/10] items-center justify-center rounded-2xl border border-line bg-cream text-sm text-muted"
              >
                [CONTENT PLACEHOLDER] — Ảnh bìa
              </div>
            </Reveal>
          )}
          <div className="mt-8 space-y-5">
            {post.body.map((paragraph, i) => (
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
                ← Quay lại Góc của Duy
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
