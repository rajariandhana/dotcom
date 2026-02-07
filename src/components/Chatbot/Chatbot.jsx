import { useState } from "react";
import PromptBox from "./PromptBox";
import instance from "../../libs/axios/instance";
import ChatbotMessages from "./ChatbotMessages";

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const onSubmit = async () => {
    if (!query.trim()) return;
    const clientMessage = {
      role: "client",
      content: query,
    };
    setMessages((prev) => [...prev, clientMessage]);
    setQuery("");
    setLoading(true);
    try {
      const response = await instance.post("/rag/qa", {
        query,
      });
      const answer = response.data.data;
      const serverMessage = {
        role: "server",
        content: answer,
      };
      setMessages((prev) => [...prev, serverMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong 😬",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-red-50">
      <div className="pb-24">
        <ChatbotMessages messages={messages} loading={loading} />
        {/* chat messages go here */}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-yellow-50 px-6 sm:px-12 py-4">
        <PromptBox
          query={query}
          setQuery={setQuery}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
