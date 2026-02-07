import { Spinner, Textarea } from "@heroui/react";
import ChatbotMessage from "./ChatbotMessage";

export default function ChatbotMessages({ messages, loading }) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg, idx) => (
        <ChatbotMessage key={idx} role={msg.role} content={msg.content} />
      ))}
      {loading && (
        <ChatbotMessage
          role={"server"}
          startContent={<Spinner color="secondary" variant="dots" />}
        />
      )}
    </div>
  );
}
