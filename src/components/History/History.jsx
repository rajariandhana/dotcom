import {
  Accordion,
  AccordionItem,
} from "@heroui/react";

import { useHistories } from "../../hooks/history";
import HistoryDetail from "./HistoryDetail";

export default function History() {
  const { data: histories, isPending } = useHistories();
  // {
  //   "key": "2026",
  //   "label": "2026",
  //   "techs": [
  //     "reactjs",
  //     "tailwindcss",
  //     "heroui",
  //     "nodejs",
  //     "mongodb",
  //     "supabase"
  //   ],
  //   "text": ""
  // }
  return (
    <>
      <section className="w-full">
        <h2 className="mb-2 text-xl cursor-pointer bg w-full mt-6">
          "Little trip down memory lane" - My Website's History
        </h2>
        {isPending || !histories ? null : (
          <Accordion defaultExpandedKeys={["0"]}>
            {histories.map((history, index) => (
              <AccordionItem
                key={index}
                title={
                  <h2 className="text-xl cursor-pointer font-semibold">
                    {history.label}
                  </h2>
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
