"use client";

import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

/**
 * Orange Cat theme toggle — a floating button fixed to the bottom-right
 * of the viewport. Light mode shows the cat awake at its laptop; dark
 * mode shows the same cat curled up asleep, in sync with the site theme.
 *
 * The artwork is a pair of painterly editorial illustrations
 * (public/images/cat-day.webp / cat-night.webp) — the same cat in both.
 * Both files stay mounted and stacked for the CSS crossfade; the
 * ACTIVE theme's image loads eager at high priority, while the
 * inactive one is lazy + low priority so it never competes with page
 * content (the button is always in the viewport, so it still arrives
 * promptly and the first toggle crossfades cleanly).
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
      <span className="relative block h-full w-full" aria-hidden="true">
        <span className="absolute inset-0 p-1.5 opacity-100 rotate-0 scale-100 transition-all duration-300 ease-out dark:opacity-0 dark:scale-95 dark:-rotate-2 motion-reduce:transition-none">
          <span className="block h-full w-full overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element -- small static UI asset; plain img keeps both themes in first paint */}
            <img
              src="/images/cat-day.webp"
              alt=""
              width={512}
              height={512}
              loading={dark ? "lazy" : "eager"}
              fetchPriority={dark ? "low" : "high"}
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover select-none"
            />
          </span>
        </span>
        <span className="absolute inset-0 p-1.5 opacity-0 rotate-2 scale-95 transition-all duration-300 ease-out dark:opacity-100 dark:rotate-0 dark:scale-100 motion-reduce:transition-none">
          <span className="block h-full w-full overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element -- small static UI asset; plain img keeps both themes in first paint */}
            <img
              src="/images/cat-night.webp"
              alt=""
              width={512}
              height={512}
              loading={dark ? "eager" : "lazy"}
              fetchPriority={dark ? "high" : "low"}
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover select-none"
            />
          </span>
        </span>
      </span>
    </button>
  );
}
