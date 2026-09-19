import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatbotMessage({ role, content, isError }) {
  const isClient = role === "client";

  return (
    <motion.div
      className={`flex flex-col ${isClient ? "items-end" : "items-start"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <div
        className={[
          "chat-markdown max-w-[85%] sm:max-w-[75%] px-4 py-3 text-[15px] leading-relaxed rounded-2xl",
          isError
            ? "bg-stone-50 border border-stone-200 text-stone-500 rounded-tl-md"
            : isClient
              ? "bg-black text-white rounded-tr-md"
              : "bg-white border border-stone-200 text-black rounded-tl-md",
        ].join(" ")}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </motion.div>
  );
}
