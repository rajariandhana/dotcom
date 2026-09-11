/**
 * An iPhone-shaped bezel. Pass `src` for a screenshot or `children` for live
 * markup; either way the inner screen keeps a real 390x844 device ratio so
 * captures taken at that viewport land pixel-true.
 */
export default function PhoneFrame({
  src,
  alt = "",
  children,
  className = "",
  island = true,
  indicator = true,
}) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* side buttons, tucked behind the band so only the nubs show */}
      <div className="pointer-events-none absolute -left-[2px] top-[14%] z-0 h-[4%] w-[3px] rounded-l-sm bg-[#2b2b2e]" />
      <div className="pointer-events-none absolute -left-[2px] top-[22%] z-0 h-[8%] w-[3px] rounded-l-sm bg-[#2b2b2e]" />
      <div className="pointer-events-none absolute -left-[2px] top-[32%] z-0 h-[8%] w-[3px] rounded-l-sm bg-[#2b2b2e]" />
      <div className="pointer-events-none absolute -right-[2px] top-[25%] z-0 h-[11%] w-[3px] rounded-r-sm bg-[#2b2b2e]" />

      {/* titanium band */}
      <div className="relative z-10 rounded-[2.3rem] bg-linear-to-b from-[#3a3a3d] via-[#1c1c1e] to-[#3a3a3d] p-[2.5px] shadow-[0_30px_60px_-20px_rgba(15,23,42,0.55)] sm:rounded-[2.75rem]">
        {/* black bezel */}
        <div className="rounded-[2.2rem] bg-black p-[7px] sm:rounded-[2.6rem] sm:p-[9px]">
          {/* screen */}
          <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[1.75rem] bg-white sm:rounded-[2.1rem]">
            {src ? (
              <img
                src={src}
                alt={alt}
                draggable={false}
                className="h-full w-full select-none object-cover object-top"
              />
            ) : (
              children
            )}

            {island && (
              <div className="pointer-events-none absolute left-1/2 top-[1.4%] h-[3.1%] w-[30%] -translate-x-1/2 rounded-full bg-black">
                <div className="absolute right-[14%] top-1/2 size-[22%] -translate-y-1/2 rounded-full bg-[#0d1117]" />
              </div>
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
