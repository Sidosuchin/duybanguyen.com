import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectRowProps = {
  project: Project;
  index: number;
};

/** Editorial project row — dùng chung cho Home và trang Công việc */
export default function ProjectRow({ project, index }: ProjectRowProps) {
  return (
    <Link
      href={`/cong-viec/${project.slug}`}
      className="group flex items-center justify-between gap-6 border-b border-line py-7 transition-colors hover:bg-cream/60 sm:py-9"
      aria-label={`Xem case study: ${project.name}${
        project.isSample ? " (mẫu bố cục)" : ""
      }`}
    >
      <div className="pl-1 sm:pl-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.isSample && (
            <span className="rounded-full border border-terracotta/50 bg-terracotta/10 px-2.5 py-0.5 text-xs font-semibold text-terracotta">
              Mẫu bố cục
            </span>
          )}
        </div>
        <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight transition-colors group-hover:text-terracotta sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-muted sm:text-[15px]">
          {[project.role, project.category, project.year]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="pr-1 text-2xl text-muted transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-terracotta sm:pr-4 sm:text-3xl"
      >
        →
      </span>
    </Link>
  );
}
