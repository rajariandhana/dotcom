import type { Metadata } from "next";

import { ExperimentHeader } from "@/components/test/ExperimentHeader";
import { DrawablyDemo } from "@/components/test/DrawablyDemo";

export const metadata: Metadata = {
  title: "Drawably · Test",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10">
      <ExperimentHeader slug="drawably" />
      <DrawablyDemo />
    </div>
  );
}
