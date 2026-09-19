import { AnimatePresence } from "motion/react";
import ChatbotMessage from "./ChatbotMessage";
import TypingIndicator from "./TypingIndicator";

export default function ChatbotMessages({ messages, loading }) {
  return (
    <>
      {messages.map((msg, idx) => (
        <ChatbotMessage
          key={idx}
          role={msg.role}
          content={msg.content}
          isError={msg.isError}
        />
      ))}
      <AnimatePresence>
        {loading && <TypingIndicator key="typing" />}
      </AnimatePresence>
      <div className="shrink-0 h-1" />
    </>
  );
}
