export const site = {
  name: "Duy Ba Nguyen",
  tagline: "Sống · Làm · Khám phá",
  taglineEn: "Living · Building · Exploring",
  domain: "https://duybanguyen.com",
  locale: "vi-VN",
  description:
    "Digital home của Duy Ba Nguyen — nơi hiểu con người trước, thấy năng lực sau: cuộc sống, công việc, ghi chép và những thứ mình tạo ra.",
} as const;

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "/ve-minh", label: "Về mình" },
  { href: "/cong-viec", label: "Công việc" },
  { href: "/cuoc-song", label: "Cuộc sống" },
  { href: "/goc-cua-duy", label: "Notes" },
  { href: "/shop", label: "Shop" },
];

export type Social = {
  label: string;
  /** null = chưa có link thật, UI render trạng thái placeholder */
  url: string | null;
};

export const socials: Social[] = [
  { label: "Facebook", url: null },
  { label: "Instagram", url: null },
  { label: "LinkedIn", url: null },
  { label: "Email", url: null },
];
