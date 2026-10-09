"use client";

import { useLanguage } from "./LanguageProvider";
import type { Lang } from "@/lib/i18n";

const options: { value: Lang; label: string }[] = [
  { value: "vi", label: "VI" },
  { value: "en", label: "EN" },
];

/** VI | EN toggle — used in the navbar on desktop and mobile. */
export default function LanguageSwitcher({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const { lang, setLang, t } = useLanguage();

  const base =
    tone === "dark"
      ? "border-white/25 text-night-text/70"
      : "border-line text-muted";
  const active =
    tone === "dark"
      ? "bg-night-text text-night"
      : "bg-charcoal text-paper";

  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className={`inline-flex items-center rounded-full border p-0.5 ${base} ${className}`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLang(opt.value)}
          aria-pressed={lang === opt.value}
          className={`rounded-full px-2.5 py-1 text-xs font-bold tracking-wide transition-colors ${
            lang === opt.value ? active : "hover:text-terracotta"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
