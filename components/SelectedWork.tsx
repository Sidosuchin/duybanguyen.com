"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ProjectRow from "./ProjectRow";
import { useLanguage } from "./LanguageProvider";
import { projects } from "@/data/projects";

/** Selected Work — dark editorial band between the light sections. */
export default function SelectedWork() {
  const { t } = useLanguage();

  return (
    <section aria-label={t.sections.work.title} className="bg-night text-night-text">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          tone="dark"
          eyebrow={t.sections.work.eyebrow}
          title={t.sections.work.title}
          description={t.sections.work.description}
        />
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
