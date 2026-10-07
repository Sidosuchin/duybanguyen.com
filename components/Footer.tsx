import Link from "next/link";
import { navLinks, site } from "@/data/site";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-extrabold tracking-tight">
              {site.name}
            </p>
            <p className="mt-2 text-sm text-muted">{site.tagline}</p>
            <p className="mt-1 text-sm text-muted">{site.taglineEn}</p>
            <SocialLinks className="mt-6" />
          </div>
          <nav aria-label="Điều hướng footer">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Khám phá
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-[15px] text-charcoal/80 hover:text-charcoal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Kết nối
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-charcoal/80">
              Muốn hợp tác, mời cà phê, hay chỉ đơn giản là chào nhau một câu —
              cứ nhắn mình nhé.
            </p>
            <Link
              href="/lien-he"
              className="mt-4 inline-block rounded-lg bg-charcoal px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-terracotta"
            >
              Liên hệ
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>Made with care — Sống · Làm · Khám phá.</p>
        </div>
      </div>
    </footer>
  );
}
