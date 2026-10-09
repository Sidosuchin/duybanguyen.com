type ImagePanelProps = {
  /** Accessible description of the area */
  ariaLabel: string;
  /** Big display initial(s) shown as a design element, e.g. "B" for BAMOS */
  monogram?: string;
  className?: string;
  tone?: "light" | "dark";
};

/**
 * Editorial panel used wherever a real photo will live later (project
 * imagery, product photos, post covers). A quiet dot texture + oversized
 * initial — a design element, never a fake photo and never a tech label.
 */
export default function ImagePanel({
  ariaLabel,
  monogram,
  className = "",
  tone = "light",
}: ImagePanelProps) {
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`flex items-center justify-center overflow-hidden ${
        dark
          ? "dot-grid-dark bg-ink text-paper"
          : "dot-grid bg-cream text-charcoal"
      } ${className}`}
    >
      {monogram && (
        <span
          aria-hidden="true"
          className={`font-display text-6xl font-extrabold tracking-tight sm:text-7xl ${
            dark ? "text-paper/25" : "text-charcoal/20"
          }`}
        >
          {monogram}
          <span className={dark ? "text-terracotta-light" : "text-terracotta"}>
            .
          </span>
        </span>
      )}
    </div>
  );
}
