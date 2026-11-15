import type { Metadata } from "next";

import { Chatbot } from "@/components/chatbot/Chatbot";
import { StickyHeading } from "@/components/StickyHeading";

export const metadata: Metadata = {
  title: "Chatbot",
};

/** AI chat about Ralfazza, answered by the RAG endpoint in dotcom-be (see src/lib/chatbot.ts). */
export default function ChatbotPage() {
  return (
    <div className="flex flex-col gap-10">
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">Chatbot</StickyHeading>
      {/* Pulled up under the title like the FAQ intro; a sibling, so the title keeps sticking. */}
      <p className="-mt-7 leading-relaxed text-pretty text-muted">
        An AI assistant that answers from this site&apos;s own content. It can still get things wrong, so double-check
        anything important.
      </p>
      <Chatbot />
    </div>
  );
}
