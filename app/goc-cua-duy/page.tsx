import type { Metadata } from "next";
import NotesContent from "./NotesContent";

export const metadata: Metadata = {
  title: "Góc của Duy",
  description:
    "Notes của Duy Ba Nguyen — những điều mình đang nghĩ, đang học, đang tò mò: Business, Marketing, Technology, Learning, Life.",
  alternates: { canonical: "/goc-cua-duy" },
  openGraph: {
    title: "Góc của Duy · Duy Ba Nguyen",
    description: "Những điều Duy đang nghĩ, đang học, đang tò mò.",
    url: "/goc-cua-duy",
  },
};

export default function GocCuaDuyPage() {
  return <NotesContent />;
}
