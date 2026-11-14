import type { Metadata } from "next";

import { ComingSoon } from "@/components/ComingSoon";
import { StickyHeading } from "@/components/StickyHeading";

export const metadata: Metadata = {
  title: "Chatbot",
};

/** Placeholder until the Chatbot page is written: linked from the menu, so it shouldn't 404. */
export default function ChatbotPage() {
  return (
    <div className="flex flex-col gap-10">
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">Chatbot</StickyHeading>
      <ComingSoon />
    </div>
  );
}
