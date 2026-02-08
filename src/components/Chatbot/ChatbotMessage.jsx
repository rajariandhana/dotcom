import { Spinner } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatbotMessage({ role, content, loading }) {
  return (
    <div
      className={`w-4/5 lg:w-3/4 whitespace-pre-wrap rounded-xl px-3 pt-1 pb-2 border shadow-md ${role === "client" ? "self-end bg-primary-100 border-primary-100 text-primary" : "self-start bg-secondary-100 border-secondary-100 text-secondary"}`}
    >
      <span className="text-xs">{role === "client" ? "You" : "Chatbot"}</span>
      {loading ? (
        <Spinner color="secondary" variant="dots" />
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      )}
    </div>
  );
}
