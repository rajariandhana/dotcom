import type { Metadata } from "next";

import { ExperimentHeader } from "@/components/test/ExperimentHeader";
import { Fishdraw } from "@/components/test/Fishdraw";

export const metadata: Metadata = {
  title: "Fishdraw · Test",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10">
      <ExperimentHeader slug="fishdraw" />
      <Fishdraw />
    </div>
  );
}
