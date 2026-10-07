type ContentPlaceholderProps = {
  /** short label of what is missing, e.g. "Ảnh Hero" */
  label?: string;
  /** hint for what Duy needs to provide */
  note?: string;
  className?: string;
};

/**
 * Visible [CONTENT PLACEHOLDER] marker — per the content principle:
 * never invent achievements, metrics, projects or personal info.
 */
export default function ContentPlaceholder({
  label = "[CONTENT PLACEHOLDER]",
  note,
  className = "",
}: ContentPlaceholderProps) {
  return (
    <div
      className={`rounded-xl border border-dashed border-terracotta/60 bg-terracotta/5 px-4 py-6 text-center ${className}`}
    >
      <p className="text-sm font-semibold tracking-wide text-terracotta">
        {label}
      </p>
      {note && <p className="mt-1 text-sm text-muted">{note}</p>}
    </div>
  );
}
