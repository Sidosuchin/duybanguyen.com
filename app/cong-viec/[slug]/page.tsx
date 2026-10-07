import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContentPlaceholder from "@/components/ContentPlaceholder";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = PageProps<"/cong-viec/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/cong-viec/${project.slug}` },
    openGraph: {
      title: `${project.name} · Duy Ba Nguyen`,
      description: project.summary,
      url: `/cong-viec/${project.slug}`,
    },
  };
}

function CaseBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section aria-label={label} className="border-t border-line py-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
          {label}
        </h2>
        <div className="mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const meta = [project.role, project.category, project.year]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <PageHeader
        eyebrow={project.isSample ? "Case study · Mẫu bố cục" : "Case study"}
        title={project.name}
        description={meta || undefined}
      />

      {project.isSample && (
        <div className="border-t border-line">
          <div className="mx-auto max-w-[1200px] px-5 pt-8 sm:px-8">
            <Reveal>
              <ContentPlaceholder
                label="MẪU BỐ CỤC — CHƯA PHẢI NỘI DUNG THẬT"
                note="Khung case study mẫu để Duy hình dung cấu trúc. Mọi số liệu và thành tích thật phải do Duy xác nhận."
              />
            </Reveal>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8">
        {/* Images */}
        <Reveal>
          <div className="grid gap-4 py-10 sm:grid-cols-2">
            {project.images.map((src, i) => (
              <div
                key={i}
                role="img"
                aria-label={`Ảnh project ${project.name} — đang chờ ảnh thật`}
                className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-line bg-cream"
              >
                {src ? null : (
                  <span className="text-sm text-muted">
                    [CONTENT PLACEHOLDER] — Ảnh {i + 1}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <CaseBlock label="Context — Bối cảnh">
          <p className="text-muted">{project.context}</p>
        </CaseBlock>

        <CaseBlock label="Problem — Vấn đề">
          <p className="text-muted">{project.problem}</p>
        </CaseBlock>

        <CaseBlock label="What I did — Việc mình làm">
          <ul className="list-disc space-y-2 pl-5 text-muted">
            {project.whatIDid.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </CaseBlock>

        <CaseBlock label="Tools — Công cụ">
          <ul className="flex flex-wrap gap-2">
            {project.tools.map((tool, i) => (
              <li
                key={i}
                className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm"
              >
                {tool}
              </li>
            ))}
          </ul>
        </CaseBlock>

        <CaseBlock label="Result — Kết quả">
          <p className="text-muted">{project.result}</p>
          {project.metrics && project.metrics.length > 0 ? (
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-line bg-paper p-5"
                >
                  <dt className="text-sm text-muted">{m.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-extrabold text-terracotta">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-4 text-sm text-muted">
              Số liệu chỉ hiển thị khi có con số thật đã được xác nhận.
            </p>
          )}
        </CaseBlock>

        <CaseBlock label="Lessons learned — Điều học được">
          <ul className="list-disc space-y-2 pl-5 text-muted">
            {project.lessons.map((lesson, i) => (
              <li key={i}>{lesson}</li>
            ))}
          </ul>
        </CaseBlock>

        <Reveal>
          <div className="border-t border-line pt-10">
            <Link
              href="/cong-viec"
              className="link-underline font-medium text-terracotta"
            >
              ← Quay lại tất cả công việc
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
