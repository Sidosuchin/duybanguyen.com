import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ContentPlaceholder from "./ContentPlaceholder";
import { lifePhotos } from "@/data/life";

const previewPhotos = lifePhotos.slice(0, 6);

export default function LifeLately() {
  return (
    <section aria-label="Cuộc sống gần đây" className="border-t border-line bg-cream/50">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Life"
          title="Life Lately"
          description="Người phía sau công việc — ảnh thật, đời thật, không cần hoàn hảo."
        />
        {previewPhotos.length > 0 ? (
          <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {previewPhotos.map((photo, i) => (
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
          <Reveal>
            <ContentPlaceholder
              label="[CONTENT PLACEHOLDER]"
              note="6–9 ảnh đời sống + caption 1 dòng, ngày/địa điểm nếu nhớ. Không dùng stock photo đóng giả ảnh của Duy."
              className="py-12"
            />
          </Reveal>
        )}
        <Reveal>
          <Link
            href="/cuoc-song"
            className="link-underline mt-8 inline-block font-medium text-terracotta"
          >
            Xem cuộc sống của mình →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
