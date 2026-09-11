/** The puppeteer's silhouette, sitting between you and the screen. */
export default function DalangShadow({
  className = "",
  fill = "#0A0705",
  stroke = "none",
}) {
  return (
    <svg
      viewBox="0 0 200 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M0 120V94c0-17 26-29 60-33 4-21 18-35 40-35s36 14 40 35c34 4 60 16 60 33v26z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
