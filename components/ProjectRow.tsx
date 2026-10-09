"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { useLanguage } from "./LanguageProvider";
import { pick } from "@/lib/i18n";

type ProjectRowProps = {
  project: Project;
  index: number;
  tone?: "light" | "dark";
};

/** Editorial project row — dùng chung cho Home và trang Công việc */
export default function ProjectRow({
  project,
  index,
  tone = "light",
}: ProjectRowProps) {
  const { lang, t } = useLanguage();
  const dark = tone === "dark";

  const meta = project.isSample
    ? ""
    : [pick(project.role, lang), pick(project.category, lang), project.year]
        .filter(Boolean)
        .join(" · ");

  return (
    <Link
      href={`/cong-viec/${project.slug}`}
      className={`group flex items-center justify-between gap-6 border-b py-8 transition-colors sm:py-10 ${
        dark
          ? "border-line-dark hover:bg-white/[0.04]"
          : "border-line hover:bg-cream/60"
      }`}
      aria-label={`${t.sections.work.viewCaseStudy}: ${project.name}${
        project.isSample ? ` (${t.sections.work.sampleBadge})` : ""
      }`}
    >
      <div className="pl-1 sm:pl-4">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`font-mono text-sm ${dark ? "text-fog" : "text-muted"}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.isSample && (
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                dark
                  ? "border-terracotta-light/50 bg-terracotta-light/10 text-terracotta-light"
                  : "border-terracotta/50 bg-terracotta/10 text-terracotta"
              }`}
            >
              {t.sections.work.sampleBadge}
            </span>
          )}
        </div>
        <h3
          className={`mt-2.5 font-display text-[1.7rem] font-extrabold tracking-tight transition-colors sm:text-4xl ${
            dark
              ? "group-hover:text-terracotta-light"
              : "group-hover:text-terracotta"
          }`}
        >
          {project.name}
        </h3>
        {meta && (
          <p
            className={`mt-2 text-sm sm:text-[15px] ${
              dark ? "text-paper/60" : "text-muted"
            }`}
          >
            {meta}
          </p>
        )}
      </div>
      <span
        aria-hidden="true"
        className={`pr-1 text-2xl transition-transform duration-300 group-hover:translate-x-1.5 sm:pr-4 sm:text-3xl ${
          dark
            ? "text-fog group-hover:text-terracotta-light"
            : "text-muted group-hover:text-terracotta"
        }`}
      >
        →
      </span>
    </Link>
  );
}
