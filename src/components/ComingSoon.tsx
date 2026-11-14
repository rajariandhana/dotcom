import Link from "next/link";

/**
 * Placeholder for a page that's planned but not written yet: a construction
 * scene (a crane lowering a brick onto a half-built wall) and a short note.
 * Drawn inline in the accent colour, so it needs no image file.
 */
export function ComingSoon() {
  return (
    <section className="flex flex-col items-center gap-6 border border-block bg-surface px-6 py-10 text-center sm:py-14">
      <ConstructionIllustration className="w-full max-w-80" />
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-bold sm:text-2xl">Coming soon</h2>
        <p className="max-w-md leading-relaxed text-pretty text-muted text-sm sm:text-md">
          Apologies for the inconvenience. <br /> This page is under
          construction.
        </p>
      </div>
      <Link
        href="/"
        className="font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        Back to home
      </Link>
    </section>
  );
}

/** Bricks of the half-built wall: [x, y], each 30×14. The top row is still missing a brick. */
const bricks = [
  [70, 166],
  [102, 166],
  [134, 166],
  [166, 166],
  [86, 150],
  [118, 150],
  [150, 150],
  [102, 134],
] as const;

function ConstructionIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label="A crane lowering a brick onto a half-built wall"
      className={`text-accent ${className ?? ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Ground */}
      <path d="M12 181h296" />

      {/* Traffic cone */}
      <path d="M36 178 44 140h6l8 38" className="fill-accent/15" />
      <path d="M40 160h14M38 170h18" />
      <path d="M28 181v-3h38v3" />

      {/* Half-built wall */}
      {bricks.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={30}
          height={14}
          rx={1.5}
          className="fill-accent/15"
        />
      ))}

      {/* Crane mast: two rails braced by a zigzag */}
      <path d="M236 181V40M252 181V40" />
      <path
        d="M236 181 252 161 236 141 252 121 236 101 252 81 236 61 252 41"
        strokeWidth={1.5}
      />

      {/* Jib (left) and counter-jib (right), braced, hung from the peak */}
      <path d="M130 30h160M130 40h160M130 30v10" />
      <path
        d="M130 40 140 30 150 40 160 30 170 40 180 30 190 40 200 30 210 40 220 30 230 40"
        strokeWidth={1.5}
      />
      <path
        d="M236 30 244 12 252 30M244 12 136 30M244 12 288 30"
        strokeWidth={1.5}
      />

      {/* Counterweight and operator cab */}
      <rect
        x={270}
        y={40}
        width={18}
        height={16}
        rx={1.5}
        className="fill-accent/25"
      />
      <rect
        x={252}
        y={40}
        width={12}
        height={12}
        rx={1.5}
        className="fill-accent/15"
      />

      {/* Trolley, cable, hook and the brick on its way to the gap in the wall (sways gently) */}
      <rect
        x={144}
        y={40}
        width={12}
        height={4}
        rx={1}
        className="fill-current"
      />
      <g className="crane-load">
        <path d="M150 44v48" strokeWidth={1.5} />
        <path d="M150 92v4a4 4 0 1 1-4 4" />
        <path d="M150 96 138 104M150 96 162 104" strokeWidth={1.5} />
        <rect
          x={135}
          y={104}
          width={30}
          height={14}
          rx={1.5}
          className="fill-accent/40"
        />
      </g>
    </svg>
  );
}
