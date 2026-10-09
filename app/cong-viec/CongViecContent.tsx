"use client";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ProjectRow from "@/components/ProjectRow";
import { useLanguage } from "@/components/LanguageProvider";
import { projects } from "@/data/projects";

export default function CongViecContent() {
  const { t } = useLanguage();
  const p = t.pages.work;

  return (
    <>
      <PageHeader
        eyebrow={p.headerEyebrow}
        title={p.headerTitle}
        description={p.headerDescription}
      />
      <section aria-label={p.headerTitle} className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-4 sm:px-8">
          <div className="border-t border-line">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 60}>
                <ProjectRow project={project} index={i} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-9 text-sm text-muted">{p.listNote}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
