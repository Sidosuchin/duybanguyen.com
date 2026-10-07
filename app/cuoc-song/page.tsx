import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ContentPlaceholder from "@/components/ContentPlaceholder";
import { lifePhotos, lifeTopics } from "@/data/life";

export const metadata: Metadata = {
  title: "Cuộc sống",
  description:
    "Life lately của Duy Ba Nguyen — photo journal: du lịch, cà phê, bạn bè, cộng đồng và đời thường.",
  alternates: { canonical: "/cuoc-song" },
  openGraph: {
    title: "Cuộc sống · Duy Ba Nguyen",
    description:
      "Photo journal của Duy: du lịch, cà phê, bạn bè, cộng đồng và đời thường.",
    url: "/cuoc-song",
  },
};

export default function CuocSongPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cuộc sống"
        title="Thế giới của Duy trông như thế nào?"
        description="Photo journal — ảnh thật, caption ngắn, ngày và địa điểm khi nhớ. Đời thật, không cần hoàn hảo."
      />

      <section aria-label="Chủ đề" className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8">
          <Reveal>
            <ul className="flex flex-wrap gap-2" aria-label="Chủ đề ảnh">
              {lifeTopics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm text-muted"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-label="Ảnh đời sống" className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
          {lifePhotos.length > 0 ? (
            <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
              {lifePhotos.map((photo, i) => (
                <Reveal key={i} delay={(i % 3) * 70} className="break-inside-avoid">
                  <figure className="overflow-hidden rounded-2xl border border-line bg-paper">
                    <div className="flex aspect-[4/3] items-center justify-center bg-cream text-sm text-muted">
                      [Ảnh]
                    </div>
                    <figcaption className="p-4 text-sm">
                      <p className="font-medium">{photo.caption}</p>
                      <p className="mt-1 text-muted">
                        {[photo.date, photo.location].filter(Boolean).join(" · ")}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          ) : (
            <>
              <SectionHeading
                eyebrow="Photo journal"
                title="Ảnh đang được chuẩn bị"
              />
              <Reveal>
                <ContentPlaceholder
                  label="[CONTENT PLACEHOLDER]"
                  note="6–9 ảnh đời sống + caption 1 dòng, ngày/địa điểm nếu nhớ. Không dùng stock photo đóng giả ảnh của Duy."
                  className="py-14"
                />
              </Reveal>
            </>
          )}
        </div>
      </section>
    </>
  );
}
