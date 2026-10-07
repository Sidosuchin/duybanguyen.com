import Reveal from "./Reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-20">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        )}
      </Reveal>
    </div>
  );
}
