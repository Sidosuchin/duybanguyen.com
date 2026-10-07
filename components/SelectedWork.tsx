import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ProjectRow from "./ProjectRow";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  return (
    <section aria-label="Công việc nổi bật" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Work"
          title="Selected Work"
          description="Không phải CV — mỗi project là một case study: bối cảnh, việc mình làm, và điều mình học được."
        />
        <div className="border-t border-line">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 60}>
              <ProjectRow project={project} index={i} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link
            href="/cong-viec"
            className="link-underline mt-8 inline-block font-medium text-terracotta"
          >
            Xem tất cả công việc →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
