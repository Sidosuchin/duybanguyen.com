import type { Metadata } from "next";
import LienHeContent from "./LienHeContent";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Kết nối với Duy Ba Nguyen — Facebook, Instagram, LinkedIn, Email.",
  alternates: { canonical: "/lien-he" },
  openGraph: {
    title: "Liên hệ · Duy Ba Nguyen",
    description: "Kết nối với Duy Ba Nguyen.",
    url: "/lien-he",
  },
};

export default function LienHePage() {
  return <LienHeContent />;
}
