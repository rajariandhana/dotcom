import { DrawablyUnderline } from "drawably/react";

export default function H2Drawably({ label }) {
  return (
    <h2 className="mb-2 text-xl cursor-pointer">
      <DrawablyUnderline
        className="font-drawably!"
        style={{
          "--drawably-stroke": "var(--color-red)",
        }}
      >
        {label}
      </DrawablyUnderline>
    </h2>
  );
}
