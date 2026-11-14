import { Accordion } from "@heroui/react";
import type { Metadata } from "next";

import { LinkedText } from "@/components/LinkedText";
import { StickyHeading } from "@/components/StickyHeading";
import { faqs } from "@/config/faq";

export const metadata: Metadata = {
  title: "FAQ",
};

/**
 * Frequently asked questions from src/config/faq.ts, one HeroUI Accordion item
 * each: tap a question to show its answer. Answers can hold [label](url) links.
 */
export default function FAQPage() {
  return (
    <div className="flex flex-col gap-10">
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">
        Frequently Asked Questions
      </StickyHeading>
      {/* Pulled up under the title like the History intro; a sibling, not wrapped together, so the title keeps sticking. */}
      <p className="-mt-7 leading-relaxed text-pretty">
        <LinkedText text="Can't find your answer? You can also ask my AI-powered [Chatbot](/chatbot)." />
      </p>

      <Accordion allowsMultipleExpanded className="border border-block bg-surface">
        {faqs.map((faq, i) => (
          <Accordion.Item key={faq.question} id={`faq-${i}`}>
            <Accordion.Heading>
              <Accordion.Trigger className="px-4 py-4 text-start text-base font-semibold sm:px-5">
                {faq.question}
                <Accordion.Indicator className="text-accent" />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="px-4 pb-4 text-base leading-relaxed text-pretty text-foreground sm:px-5 sm:pb-5">
                <LinkedText text={faq.answer} />
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
