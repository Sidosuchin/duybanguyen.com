import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ContentPlaceholder from "./ContentPlaceholder";
import { posts } from "@/data/posts";

const latestPosts = posts.slice(0, 3);

export default function NotesPreview() {
  return (
    <section aria-label="Bài viết mới" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Notes"
          title="Góc của Duy"
          description="Những điều mình đang nghĩ, đang học, đang tò mò."
        />
        {latestPosts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {latestPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <Link
                  href={`/goc-cua-duy/${post.slug}`}
                  className="group block h-full rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-terracotta/50"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                    {post.category}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug transition-colors group-hover:text-terracotta">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-sm text-muted">
                    {post.date} · {post.readingTime}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <ContentPlaceholder
              label="[CONTENT PLACEHOLDER]"
              note="Chưa có bài viết thật — gửi mình 1–3 bài hoặc ý tưởng bài đầu tiên nhé."
              className="py-12"
            />
          </Reveal>
        )}
        <Reveal>
          <Link
            href="/goc-cua-duy"
            className="link-underline mt-8 inline-block font-medium text-terracotta"
          >
            Đọc thêm →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
