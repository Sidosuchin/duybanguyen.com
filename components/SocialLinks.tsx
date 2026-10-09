"use client";

import { socials } from "@/data/site";
import { useLanguage } from "./LanguageProvider";

type SocialLinksProps = {
  className?: string;
  tone?: "light" | "dark";
};

/**
 * Renders social links. Entries without a real URL yet render as an
 * elegant static label — never a dead link, never a fake URL.
 */
export default function SocialLinks({
  className = "",
  tone = "light",
}: SocialLinksProps) {
  const { t } = useLanguage();
  const dark = tone === "dark";

  return (
    <ul
      className={`flex flex-wrap gap-2.5 ${className}`}
      aria-label={t.a11y.socials}
    >
      {socials.map((s) =>
        s.url ? (
          <li key={s.label}>
            <a
              href={s.url}
              target={s.url.startsWith("http") ? "_blank" : undefined}
              rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`inline-block rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                dark
                  ? "border-line-dark text-night-text/85 hover:border-terracotta-light hover:text-terracotta-light"
                  : "border-line bg-paper hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {s.label}
            </a>
          </li>
        ) : (
          <li key={s.label}>
            <span
              aria-disabled="true"
              className={`inline-block rounded-full border border-dashed px-4 py-2 text-sm ${
                dark
                  ? "border-line-dark text-fog"
                  : "border-line text-muted"
              }`}
            >
              {s.label}
            </span>
          </li>
        )
      )}
    </ul>
  );
}
