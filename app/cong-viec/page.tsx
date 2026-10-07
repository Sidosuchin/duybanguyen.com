import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ProjectRow from "@/components/ProjectRow";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Công việc",
  description:
    "Selected work của Duy Ba Nguyen — các project dưới dạng case study: bối cảnh, việc đã làm, và điều học được.",
  alternates: { canonical: "/cong-viec" },
  openGraph: {
    title: "Công việc · Duy Ba Nguyen",
    description:
      "Các project của Duy dưới dạng case study: bối cảnh, việc đã làm, và điều học được.",
    url: "/cong-viec",
  },
};

export default function CongViecPage() {
  return (
    <>
      <PageHeader
        eyebrow="Công việc"
        title="Mình đã làm gì?"
        description="Không phải CV — mỗi project là một case study. Bấm vào để xem bối cảnh, cách mình làm, và điều mình học được."
      />
      <section aria-label="Danh sách project" className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 pb-20 pt-4 sm:px-8">
          <div className="border-t border-line">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 60}>
                <ProjectRow project={project} index={i} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 text-sm text-muted">
              Danh sách đang được cập nhật — project thật sẽ thay thế mẫu bố
              cục khi Duy gửi nội dung.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
