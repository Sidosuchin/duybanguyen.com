"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import ProjectRow from "./ProjectRow";
import { useLanguage } from "./LanguageProvider";
import { projects } from "@/data/projects";

/** Selected Work — dark editorial band between the light sections. */
export default function SelectedWork() {
  const { t } = useLanguage();

  return (
    <section aria-label={t.sections.work.title} className="bg-night text-night-text">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-light">
            {t.sections.work.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.15]">
            {t.sections.work.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-night-text/65 sm:text-lg">
            {t.sections.work.description}
          </p>
        </Reveal>
        <div className="border-t border-line-dark">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 60}>
              <ProjectRow project={project} index={i} tone="dark" />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link
            href="/cong-viec"
            className="link-underline mt-10 inline-block font-medium text-terracotta-light"
          >
            {t.sections.work.viewAll} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
