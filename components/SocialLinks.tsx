import { socials } from "@/data/site";

type SocialLinksProps = {
  className?: string;
};

/**
 * Renders social links. Entries without a real URL yet render as a muted
 * placeholder chip instead of a dead link — never a fake URL.
 */
export default function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`} aria-label="Kênh liên hệ">
      {socials.map((s) =>
        s.url ? (
          <li key={s.label}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-line bg-paper px-4 py-2 text-sm font-medium transition-colors hover:border-terracotta hover:text-terracotta"
            >
              {s.label}
            </a>
          </li>
        ) : (
          <li key={s.label}>
            <span
              className="inline-block cursor-not-allowed rounded-lg border border-dashed border-line px-4 py-2 text-sm text-muted"
              title="Chưa có link thật"
            >
              {s.label} · [chưa có link]
            </span>
          </li>
        )
      )}
    </ul>
  );
}
