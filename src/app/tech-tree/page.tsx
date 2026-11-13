import type { Metadata } from "next";

import { StickyHeading } from "@/components/StickyHeading";
import { TechTree } from "@/components/tech-tree/TechTree";
import { techCategories } from "@/config/tech";

export const metadata: Metadata = {
  title: "Tech Tree",
};

export default function TechTreePage() {
  return (
    <div className="flex flex-col gap-10">
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">
        Tech Tree
      </StickyHeading>

      <p className="max-w-prose text-muted">
        A beautiful tree full of technologies I&apos;ve used before, I wonder if
        one day it&apos;ll grow into a forrest.
        <br />
        Leaves in <span className="font-semibold text-accent">red</span> are my
        current tech stack I&apos;m using daily.
      </p>

      <TechTree categories={techCategories} />
    </div>
  );
}
