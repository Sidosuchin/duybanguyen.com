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
              className={`inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
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
              className={`inline-block py-2 text-sm font-medium ${
                dark ? "text-fog" : "text-muted"
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
