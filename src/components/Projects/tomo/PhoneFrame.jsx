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
  notch = false,
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

            {notch && (
              // A notch, not a Dynamic Island: it hangs off the top edge with
              // only its bottom corners rounded. Shallower than a real 32pt
              // notch on purpose — the screenshots are captured at 390 x 844
              // with no safe-area inset, so the conversation header sits
              // higher than it would on a notched device and a full-depth
              // notch would cover it.
              <div className="pointer-events-none absolute left-1/2 top-0 flex h-[1.9%] w-[41.5%] -translate-x-1/2 items-center justify-center gap-[6%] rounded-b-[0.4rem] bg-black sm:rounded-b-[0.55rem]">
                <div className="h-[1.6px] w-[26%] rounded-full bg-white/10" />
                <div className="size-[2.4px] rounded-full bg-white/15" />
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
