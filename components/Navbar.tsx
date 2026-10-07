"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/95 backdrop-blur-sm"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <nav
        aria-label="Điều hướng chính"
        className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-lg font-extrabold tracking-tight"
        >
          {site.name}
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="link-underline text-[15px] font-medium text-charcoal/80 transition-colors hover:text-charcoal"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/lien-he"
              className="rounded-lg bg-terracotta px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-deep"
            >
              Connect
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line md:hidden"
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
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line md:hidden">
          <ul className="space-y-1 px-5 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-display text-xl font-bold tracking-tight transition-colors hover:bg-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/lien-he"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-terracotta px-4 py-3 text-center font-display text-xl font-bold text-white transition-colors hover:bg-terracotta-deep"
              >
                Connect
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
