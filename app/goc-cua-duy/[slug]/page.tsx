import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostDetail from "./PostDetail";
import { getPost, posts } from "@/data/posts";
import { pick } from "@/lib/i18n";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = PageProps<"/goc-cua-duy/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: pick(post.title, "vi"),
    description: pick(post.excerpt, "vi"),
    alternates: { canonical: `/goc-cua-duy/${post.slug}` },
    openGraph: {
      title: `${pick(post.title, "vi")} · Duy Ba Nguyen`,
      description: pick(post.excerpt, "vi"),
      url: `/goc-cua-duy/${post.slug}`,
      type: "article",
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return <PostDetail post={post} />;
}
