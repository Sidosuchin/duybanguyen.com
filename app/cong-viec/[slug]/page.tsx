import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "./ProjectDetail";
import { getProject, projects } from "@/data/projects";
import { pick } from "@/lib/i18n";

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
    description: pick(project.summary, "vi"),
    alternates: { canonical: `/cong-viec/${project.slug}` },
    openGraph: {
      title: `${project.name} · Duy Ba Nguyen`,
      description: pick(project.summary, "vi"),
      url: `/cong-viec/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
