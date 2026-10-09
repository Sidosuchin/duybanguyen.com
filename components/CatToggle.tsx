"use client";

import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import OrangeCat from "./OrangeCat";

/**
 * Orange Cat theme toggle — a floating button fixed to the bottom-right
 * of the viewport. Light mode shows the cat awake at its laptop; dark
 * mode shows the same cat curled up asleep, in sync with the site theme.
 *
 * z-40 keeps it above the page but below the sticky header (z-50),
 * whose mobile menu must stay on top. The footer carries extra bottom
 * padding so the button never covers its links or text.
 */
export default function CatToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const dark = theme === "dark";
  const label = dark ? t.theme.toggleToLight : t.theme.toggleToDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={dark}
      aria-label={label}
      title={label}
      className="fixed right-4 bottom-4 z-40 h-14 w-14 rounded-full border border-line bg-cream shadow-[0_10px_30px_rgba(22,18,15,0.16)] transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6 sm:h-[72px] sm:w-[72px] motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <OrangeCat />
    </button>
  );
}
