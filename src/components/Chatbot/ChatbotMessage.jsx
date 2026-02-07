import { Textarea } from "@heroui/react";

export default function ChatbotMessage({ role, content }) {
  return (
    <Textarea
      className={`md:max-w-3/4 ${
        role === "client" ? "self-end" : "self-start"
      }`}
      isReadOnly
      color={role === "client" ? "primary" : "secondary"}
      value={content}
      variant="flat"
      label={role === "client" ? "You" : "Chatbot"}
    />
  );
}
