import Image from "next/image";

import { site } from "@/config/site";

import { MixedFontText } from "./MixedFontText";

/** Avatar, name, role and quote. Large and stacked in the sidebar; compact in the drawer. */
export function Identity({ variant }: { variant: "sidebar" | "drawer" }) {
  if (variant === "drawer") {
    return (
      <div className="flex items-center gap-3">
        <Avatar className="size-10 shrink-0" sizes="40px" />
        <div className="flex flex-col gap-1">
          <p className="leading-tight font-extrabold">{site.name}</p>
          <p className="text-sm leading-tight font-medium">{site.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Avatar className="size-30" sizes="120px" eager />
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

/**
 * The silhouette on a circle of the accent colour, so it follows the theme
 * instead of having a red background baked into the image.
 */
function Avatar({ className, sizes, eager = false }: { className: string; sizes: string; eager?: boolean }) {
  return (
    <span className={`relative block overflow-hidden rounded-full bg-accent ${className}`}>
      <Image
        src={site.avatar.src}
        alt={site.avatar.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : undefined} // the sidebar's is the desktop LCP element
        className="object-cover"
      />
    </span>
  );
}
