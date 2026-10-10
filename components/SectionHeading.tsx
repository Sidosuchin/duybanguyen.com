import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /**
   * "dark" is for always-dark bands (bg-night): heading in night-text,
   * eyebrow in terracotta-light, description in softened night-text —
   * matching how those bands style their labels. Default "normal"
   * follows the flipped theme tokens.
   */
  tone?: "normal" | "dark";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "normal",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center" : "text-left";
  const dark = tone === "dark";
  return (
    <Reveal className={`mb-10 sm:mb-14 ${alignCls}`}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
          dark
            ? "text-terracotta-light"
            : "text-terracotta-deep dark:text-terracotta-light"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? "text-night-text" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
            dark ? "text-night-text/65" : "text-muted"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
