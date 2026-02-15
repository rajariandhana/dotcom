import { Card, CardHeader, Image } from "@heroui/react";

import { Link } from "react-router";
import { useHistories } from "../../hooks/history";

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
      <section>
        <h2 className="mb-2 text-xl cursor-pointer bg w-full mt-6">My Website's History</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isPending ? (
            <>pending...</>
          ) : (
            histories.map((history) => (
              <Card key={history.key} as={Link} to={`/gallery/${history.key}`}>
                <CardHeader className="absolute z-10 top-1 flex-col items-start!">
                  <h4 className="text-white font-medium text-large">
                    {history.label}
                  </h4>
                </CardHeader>
                <Image
                  isZoomed={true}
                  className="z-0 size-40 object-cover"
                  src={history.links[0]}
                />
              </Card>
            ))
          )}
        </ul>
      </section>
    </>
  );
}
