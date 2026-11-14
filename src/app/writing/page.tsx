import type { Metadata } from "next";

import { ComingSoon } from "@/components/ComingSoon";
import { StickyHeading } from "@/components/StickyHeading";

export const metadata: Metadata = {
  title: "Writing",
};

/** Placeholder until the Writing page is written: linked from the menu, so it shouldn't 404. */
export default function WritingPage() {
  return (
    <div className="flex flex-col gap-10">
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">Writing</StickyHeading>
      <ComingSoon />
    </div>
  );
}
