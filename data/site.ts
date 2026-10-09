import { lt, type LocalizedText } from "@/lib/i18n";

export const site = {
  name: "Duy Ba Nguyen",
  tagline: lt("Sống · Làm · Khám phá", "Living · Building · Exploring"),
  domain: "https://duybanguyen.com",
  locale: "vi-VN",
  description: lt(
    "Digital home của Duy Ba Nguyen — nơi hiểu con người trước, thấy năng lực sau: cuộc sống, công việc, ghi chép và những thứ mình tạo ra.",
    "The digital home of Duy Ba Nguyen — get to know the person first, the work second: life, projects, notes and the things I create."
  ),
} as const;

/** Route order for nav + footer. Labels live in the i18n dictionary. */
export const navRoutes: { href: string; key: "about" | "work" | "life" | "notes" | "shop" }[] = [
  { href: "/ve-minh", key: "about" },
  { href: "/cong-viec", key: "work" },
  { href: "/cuoc-song", key: "life" },
  { href: "/goc-cua-duy", key: "notes" },
  { href: "/shop", key: "shop" },
];

export type Social = {
  label: string;
  /** null = chưa có link thật — UI hiển thị nhãn tĩnh trang nhã, không tạo link giả */
  url: string | null;
};

export const socials: Social[] = [
  { label: "Facebook", url: null },
  { label: "Instagram", url: null },
  { label: "LinkedIn", url: null },
  { label: "Email", url: null },
];

export type { LocalizedText };
