import { Chip } from "@heroui/react";
import Image from "next/image";

import { findTech } from "@/lib/history";

/** Tech names as accent chips, with the Tech Tree icon where there is one. */
export function TechChips({ techs }: { techs: readonly string[] }) {
  if (techs.length === 0) return null;
  return (
    <ul aria-label="Technologies" className="flex flex-wrap items-center gap-1.5">
      {techs.map((name) => {
        const tech = findTech(name);
        return (
          <li key={name} className="flex">
            <Chip size="sm" variant="soft" color="accent" className="gap-1.5">
              {tech && (
                <Image
                  src={`/tech/${tech.icon}.svg`}
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="size-3.5"
                />
              )}
              {tech?.name ?? name}
            </Chip>
          </li>
        );
      })}
    </ul>
  );
}
