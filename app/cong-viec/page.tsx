import type { Metadata } from "next";
import CongViecContent from "./CongViecContent";

export const metadata: Metadata = {
  title: "Công việc",
  description:
    "Selected work của Duy Ba Nguyen — các project dưới dạng case study: bối cảnh, việc đã làm, và điều học được.",
  alternates: { canonical: "/cong-viec" },
  openGraph: {
    title: "Công việc · Duy Ba Nguyen",
    description:
      "Các project của Duy dưới dạng case study: bối cảnh, việc đã làm, và điều học được.",
    url: "/cong-viec",
  },
};

export default function CongViecPage() {
  return <CongViecContent />;
}
