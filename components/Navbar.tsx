"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navRoutes, site } from "@/data/site";
import { useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/95 backdrop-blur-sm"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <nav
        aria-label={t.a11y.mainNav}
        className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-lg font-extrabold tracking-tight"
        >
          {site.name}
          <span className="text-terracotta">.</span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navRoutes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                aria-current={isActive(route.href) ? "page" : undefined}
                className={`link-underline text-[15px] font-medium transition-colors ${
                  isActive(route.href)
                    ? "text-terracotta-deep dark:text-terracotta-light"
                    : "text-charcoal/75 hover:text-charcoal"
                }`}
              >
                {t.nav[route.key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/lien-he"
            className="hidden rounded-lg bg-terracotta px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-deep sm:inline-block"
          >
            {t.nav.connect}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-charcoal transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-charcoal transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 bg-charcoal transition-transform duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line lg:hidden">
          <ul className="space-y-1 px-5 py-4">
            {navRoutes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(route.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 font-display text-xl font-bold tracking-tight transition-colors hover:bg-cream ${
                    isActive(route.href) ? "text-terracotta" : ""
                  }`}
                >
                  {t.nav[route.key]}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/lien-he"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-terracotta px-4 py-3 text-center font-display text-xl font-bold text-white transition-colors hover:bg-terracotta-deep"
              >
                {t.nav.connect}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
