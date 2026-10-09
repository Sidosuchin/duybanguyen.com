"use client";

import { useLanguage } from "./LanguageProvider";

export default function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-charcoal focus:px-4 focus:py-2 focus:text-paper"
    >
      {t.a11y.skip}
    </a>
  );
}
