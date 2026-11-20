import type { Metadata } from "next";

import { ExperimentHeader } from "@/components/test/ExperimentHeader";
import { ShanShui } from "@/components/test/ShanShui";

export const metadata: Metadata = {
  title: "Shan Shui · Test",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10">
      <ExperimentHeader slug="shan-shui" />
      <ShanShui />
    </div>
  );
}
