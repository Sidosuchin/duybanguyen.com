import Image from "next/image";

/**
 * The sitting-cat motif (transparent background) that tops the site's
 * empty states, so a "nothing here yet" box still belongs to Duy's
 * watercolor world. Purely decorative — the sentence under it carries
 * the meaning — so it stays out of the accessibility tree. One shared
 * component keeps the size and spacing identical in every empty state.
 */
export default function EmptyMotif() {
  return (
    <Image
      src="/images/motif-cat.webp"
      alt=""
      width={595}
      height={595}
      draggable={false}
      className="mx-auto mb-6 h-24 w-auto select-none sm:h-28"
    />
  );
}
