"use client";

import Link from "next/link";
import { navRoutes, site } from "@/data/site";
import { pick } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-night text-night-text">
      {/* Extra bottom padding: clearance for the floating cat toggle */}
      <div className="mx-auto max-w-[1240px] px-5 pt-14 pb-28 sm:px-8 sm:pt-16 sm:pb-24">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-tight">
              {site.name}
              <span className="text-terracotta-light">.</span>
            </p>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-night-text/65">
              {pick(site.tagline, lang)}
            </p>
            <SocialLinks className="mt-7" tone="dark" />
          </div>
          <nav aria-label={t.a11y.footerNav}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fog">
              {t.footer.explore}
            </p>
            <ul className="mt-5 space-y-3">
              {navRoutes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="link-underline text-[15px] text-night-text/80 transition-colors hover:text-night-text"
                  >
                    {t.nav[route.key]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/lien-he"
                  className="link-underline text-[15px] text-night-text/80 transition-colors hover:text-night-text"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fog">
              {t.footer.connectTitle}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-night-text/75">
              {t.footer.blurb}
            </p>
            <Link
              href="/lien-he"
              className="mt-5 inline-flex min-h-[44px] items-center rounded-full bg-night-text px-6 py-2.5 text-sm font-semibold text-night transition-colors hover:bg-terracotta hover:text-night-text"
            >
              {t.footer.contactCta}
            </Link>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-line-dark pt-7 text-sm text-fog sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.name}. {t.footer.rights}
          </p>
          <p>{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
