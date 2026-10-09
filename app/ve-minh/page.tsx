import type { Metadata } from "next";
import VeMinhContent from "./VeMinhContent";

export const metadata: Metadata = {
  title: "Về mình",
  description:
    "Duy Ba Nguyen là ai? Tính cách, sở thích, hành trình, giá trị và điều mình đang tập trung.",
  alternates: { canonical: "/ve-minh" },
  openGraph: {
    title: "Về mình · Duy Ba Nguyen",
    description:
      "Duy Ba Nguyen là ai? Tính cách, sở thích, hành trình, giá trị và điều mình đang tập trung.",
    url: "/ve-minh",
  },
};

export default function VeMinhPage() {
  return <VeMinhContent />;
}
