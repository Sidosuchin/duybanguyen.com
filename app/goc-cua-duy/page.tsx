import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContentPlaceholder from "@/components/ContentPlaceholder";
import { postCategories, posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Góc của Duy",
  description:
    "Notes của Duy Ba Nguyen — những điều mình đang nghĩ, đang học, đang tò mò: Business, Marketing, Technology, Learning, Life.",
  alternates: { canonical: "/goc-cua-duy" },
  openGraph: {
    title: "Góc của Duy · Duy Ba Nguyen",
    description:
      "Những điều Duy đang nghĩ, đang học, đang tò mò.",
    url: "/goc-cua-duy",
  },
};

export default function GocCuaDuyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notes"
        title="Góc của Duy"
        description="Mình viết về những điều mình đang nghĩ, đang học và đang tò mò. Chữ nhiều, khoảng trắng nhiều."
      />

      <section aria-label="Chuyên mục" className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8">
          <Reveal>
            <ul className="flex flex-wrap gap-2" aria-label="Chuyên mục bài viết">
              {postCategories.map((cat) => (
                <li
                  key={cat}
                  className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm text-muted"
                >
                  {cat}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-label="Danh sách bài viết" className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
          {posts.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 80}>
                  <a
                    href={`/goc-cua-duy/${post.slug}`}
                    className="group block h-full rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-terracotta/50"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                      {post.category}
                    </p>
                    <h2 className="mt-3 font-display text-xl font-bold leading-snug transition-colors group-hover:text-terracotta">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-sm text-muted">
                      {post.date} · {post.readingTime}
                    </p>
                  </a>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <ContentPlaceholder
                label="[CONTENT PLACEHOLDER]"
                note="Chưa có bài viết thật — gửi mình 1–3 bài hoặc ý tưởng bài đầu tiên, chọn chuyên mục trong 6 nhóm trên nhé."
                className="py-14"
              />
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
