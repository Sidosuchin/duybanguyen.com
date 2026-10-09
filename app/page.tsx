import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Now from "@/components/Now";
import SelectedWork from "@/components/SelectedWork";
import LifeLately from "@/components/LifeLately";
import NotesPreview from "@/components/NotesPreview";
import ShopTeaser from "@/components/ShopTeaser";
import Connect from "@/components/Connect";
import { site } from "@/data/site";
import { pick } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Duy Ba Nguyen — Sống · Làm · Khám phá",
  description: pick(site.description, "vi"),
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <Now />
      <SelectedWork />
      <LifeLately />
      <NotesPreview />
      <ShopTeaser />
      <Connect />
    </>
  );
}
