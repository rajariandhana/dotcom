import type { Metadata } from "next";

import { ExperimentHeader } from "@/components/test/ExperimentHeader";
import { Pokedex } from "@/components/test/Pokedex";

export const metadata: Metadata = {
  title: "PokéAPI · Test",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10">
      <ExperimentHeader slug="pokeapi" />
      <Pokedex />
    </div>
  );
}
