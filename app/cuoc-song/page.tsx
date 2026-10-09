import type { Metadata } from "next";
import CuocSongContent from "./CuocSongContent";

export const metadata: Metadata = {
  title: "Cuộc sống",
  description:
    "Life lately của Duy Ba Nguyen — photo journal: du lịch, cà phê, bạn bè, cộng đồng và đời thường.",
  alternates: { canonical: "/cuoc-song" },
  openGraph: {
    title: "Cuộc sống · Duy Ba Nguyen",
    description:
      "Photo journal của Duy: du lịch, cà phê, bạn bè, cộng đồng và đời thường.",
    url: "/cuoc-song",
  },
};

export default function CuocSongPage() {
  return <CuocSongContent />;
}
