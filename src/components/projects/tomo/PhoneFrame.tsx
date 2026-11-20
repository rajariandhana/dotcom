import Image from "next/image";
import type { ReactNode } from "react";

/**
 * An iPhone-shaped bezel. Pass `src` for a screenshot or `children` for live
 * markup; either way the inner screen keeps a real 390x844 device ratio so
 * captures taken at that viewport land pixel-true.
 */
export function PhoneFrame({
  src,
  alt = "",
  children,
  className = "",
  indicator = true,
}: {
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
  indicator?: boolean;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* side buttons, tucked behind the band so only the nubs show */}
      <div className="pointer-events-none absolute top-[14%] -left-[2px] z-0 h-[4%] w-[3px] rounded-l-sm bg-[#2b2b2e]" />
      <div className="pointer-events-none absolute top-[22%] -left-[2px] z-0 h-[8%] w-[3px] rounded-l-sm bg-[#2b2b2e]" />
      <div className="pointer-events-none absolute top-[32%] -left-[2px] z-0 h-[8%] w-[3px] rounded-l-sm bg-[#2b2b2e]" />
      <div className="pointer-events-none absolute top-[25%] -right-[2px] z-0 h-[11%] w-[3px] rounded-r-sm bg-[#2b2b2e]" />

      {/* titanium band */}
      <div className="relative z-10 rounded-[2.3rem] bg-linear-to-b from-[#3a3a3d] via-[#1c1c1e] to-[#3a3a3d] p-[2.5px] shadow-[0_30px_60px_-20px_rgba(15,23,42,0.55)] sm:rounded-[2.75rem]">
        {/* black bezel */}
        <div className="rounded-[2.2rem] bg-black p-[7px] sm:rounded-[2.6rem] sm:p-[9px]">
          {/* screen */}
          <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[1.75rem] bg-white sm:rounded-[2.1rem]">
            {src ? (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 640px) 256px, 224px"
                draggable={false}
                className="object-cover object-top select-none"
              />
            ) : (
              children
            )}

            {indicator && (
              <div className="pointer-events-none absolute bottom-[0.9%] left-1/2 h-[0.5%] w-[34%] -translate-x-1/2 rounded-full bg-tomo-ink/25" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
