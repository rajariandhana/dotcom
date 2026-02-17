import { Accordion, AccordionItem, Spinner } from "@heroui/react";

import { useHistories } from "../../hooks/history";
import HistoryDetail from "./HistoryDetail";

export default function History() {
  const { data: histories, isPending } = useHistories();
  // {
  //   "key": "2026",
  //   "label": "2026",
  // "techs": [
  //     "MongoDB",
  //     "Express.js",
  //     "React",
  //     "Node.js",
  //     "Next.js",
  //     "HeroUI",
  //     "Tailwindcss",
  //     "Supabase"
  //   ],
  //   "text": ""
  // }
  return (
    <>
      <section className="w-full">
        <h2 className="mb-2 text-xl cursor-pointer bg w-full mt-6">
          <span className="italic font-light">
            "Little trip down memory lane"
          </span>{" "}
          - My Website's History
        </h2>
        {isPending || !histories ? (
          <div className="flex w-full justify-center">
            <Spinner className="mt-12"  size="lg"/>
          </div>
        ) : (
          <Accordion defaultExpandedKeys={["0"]}>
            {histories.map((history, index) => (
              <AccordionItem
                key={index}
                title={
                  <h2 className="text-xl cursor-pointer">{history.label}</h2>
                }
                aria-label={history.label}
                className="w-full"
              >
                {/* {JSON.stringify(history)} */}
                <HistoryDetail history={history} />
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>
    </>
  );
}
