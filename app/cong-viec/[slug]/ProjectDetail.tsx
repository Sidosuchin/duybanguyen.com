"use client";

import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ImagePanel from "@/components/ImagePanel";
import { useLanguage } from "@/components/LanguageProvider";
import type { Project } from "@/data/projects";
import { pick, pickList } from "@/lib/i18n";

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
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          {label}
        </h2>
        <div className="mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const { lang, t } = useLanguage();
  const cs = t.caseStudy;

  const meta = project.isSample
    ? undefined
    : [pick(project.role, lang), pick(project.category, lang), project.year]
        .filter(Boolean)
        .join(" · ");

  return (
    <>
      <PageHeader
        eyebrow={project.isSample ? cs.sampleEyebrow : cs.eyebrow}
        title={project.name}
        description={meta || pick(project.summary, lang)}
      />

      {project.isSample && (
        <div className="border-t border-line bg-cream-soft">
          <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8">
            <Reveal>
              <p className="font-display text-lg font-bold">
                {cs.sampleBannerTitle}
                <span className="text-terracotta">.</span>
              </p>
              <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">
                {cs.sampleBannerNote}
              </p>
            </Reveal>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1240px] px-5 pb-24 sm:px-8">
        {/* Images */}
        <Reveal>
          <div className="grid gap-4 py-10 sm:grid-cols-2">
            {project.images.map((src, i) =>
              src ? (
                <Image
                  key={i}
                  src={src}
                  alt={`${project.name} — ${cs.imageAlt}`}
                  width={1000}
                  height={750}
                  className="aspect-[4/3] w-full rounded-xl border border-line object-cover"
                />
              ) : (
                <ImagePanel
                  key={i}
                  ariaLabel={cs.imageAlt}
                  monogram={project.name.charAt(0)}
                  className="aspect-[4/3] w-full rounded-xl border border-line"
                />
              )
            )}
          </div>
        </Reveal>

        <CaseBlock label={cs.context}>
          <p className="text-muted">{pick(project.context, lang)}</p>
        </CaseBlock>

        <CaseBlock label={cs.problem}>
          <p className="text-muted">{pick(project.problem, lang)}</p>
        </CaseBlock>

        <CaseBlock label={cs.whatIDid}>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            {pickList(project.whatIDid, lang).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </CaseBlock>

        <CaseBlock label={cs.tools}>
          <ul className="flex flex-wrap gap-2">
            {pickList(project.tools, lang).map((tool, i) => (
              <li
                key={i}
                className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm"
              >
                {tool}
              </li>
            ))}
          </ul>
        </CaseBlock>

        <CaseBlock label={cs.result}>
          <p className="text-muted">{pick(project.result, lang)}</p>
          {project.metrics && project.metrics.length > 0 ? (
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              {project.metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-line bg-paper p-5"
                >
                  <dt className="text-sm text-muted">{pick(m.label, lang)}</dt>
                  <dd className="mt-1 font-display text-2xl font-extrabold text-terracotta">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-4 text-sm text-muted">{cs.metricsNote}</p>
          )}
        </CaseBlock>

        <CaseBlock label={cs.lessons}>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            {pickList(project.lessons, lang).map((lesson, i) => (
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
              ← {cs.back}
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
