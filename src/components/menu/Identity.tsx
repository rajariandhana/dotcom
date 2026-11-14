import Image from "next/image";

import { site } from "@/config/site";

import { MixedFontText } from "./MixedFontText";

/** Avatar, name, role and quote. Large and stacked in the sidebar; compact in the drawer. */
export function Identity({ variant }: { variant: "sidebar" | "drawer" }) {
  if (variant === "drawer") {
    return (
      <div className="flex items-center gap-3">
        <Image
          src={site.avatar.src}
          alt={site.avatar.alt}
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="leading-tight font-extrabold">{site.name}</p>
          <p className="text-sm leading-tight font-medium">{site.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Image
        src={site.avatar.src}
        alt={site.avatar.alt}
        width={120}
        height={120}
        loading="eager" // the desktop LCP element
        className="size-30 rounded-full"
      />
      <div className="flex flex-col gap-2">
        <p className="text-xl leading-none font-extrabold">{site.name}</p>
        <p className="leading-none font-medium">{site.role}</p>
      </div>
      <p className="leading-none font-medium">
        “<MixedFontText text={site.quote} />”
      </p>
    </div>
  );
}
