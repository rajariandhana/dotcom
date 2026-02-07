import { useState } from "react";
import PromptBox from "./PromptBox";
import instance from "../../libs/axios/instance";
import ChatbotMessages from "./ChatbotMessages";
import { Alert } from "@heroui/react";

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const dummy = [
    {
      role: "client",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, natus consectetur ab dolorem libero sequi nihil itaque possimus iste saepe.",
    },
    {
      role: "server",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, natus consectetur ab dolorem libero sequi nihil itaque possimus iste saepe.",
    },
    {
      role: "client",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, natus consectetur ab dolorem libero sequi nihil itaque possimus iste saepe.",
    },
    {
      role: "server",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, natus consectetur ab dolorem libero sequi nihil itaque possimus iste saepe.",
    },
  ];
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
          content: "Something went wrong...",
        },
      ]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="pb-24 w-full">
        {messages.length === 0 ? (
          <div className="flex flex-col w-full items-center justify-center">
            <Alert
              title="Cause apparently every website needs a chatbot"
              color="primary"
              variant="faded"
            />
          </div>
        ) : (
          <ChatbotMessages messages={messages} loading={loading} />
        )}
        {/* chat messages go here */}
      </div>

      <div className="fixed bottom-0 left-0 w-full px-6 sm:px-12 py-4 bg-white">
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
