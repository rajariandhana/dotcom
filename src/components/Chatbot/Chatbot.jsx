import { useState } from "react";
import PromptBox from "./PromptBox";
import instance from "../../libs/axios/instance";
import ChatbotMessages from "./ChatbotMessages";
import { Button, Chip, ScrollShadow } from "@heroui/react";

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

  const sampleQueries = [
    "What school he went to?",
    "What are some of his web projects?",
    "What hobbies does he like?",
  ];

  const onSubmit = async (overrideQuery) => {
    const finalQuery = overrideQuery ?? query;
    if (!finalQuery.trim()) return;

    const clientMessage = {
      role: "client",
      content: finalQuery,
    };

    setMessages((prev) => [...prev, clientMessage]);
    setQuery("");
    setLoading(true);

    try {
      const response = await instance.post("/rag/qa", {
        query: finalQuery,
      });
      const answer = response.data.data;

      setMessages((prev) => [...prev, { role: "server", content: answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "server", content: "Something went wrong... The AI probably reached it's limit, try again later..." },
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
          <div className="flex flex-col w-full justify-center">
            <h2 className="text-2xl">Meet My Chatbot</h2>
            <span className="text-sm mb-8">
              Cause apparently every website needs a chatbot
            </span>
            <span className="mb-1">Ask questions about me like:</span>
            <div className="flex flex-col gap-2 w-full items-start">
              {sampleQueries.map((q) => (
                <Button
                  color="primary"
                  variant="flat"
                  size="lg"
                  onPress={() => onSubmit(q)}
                  key={q}
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <ChatbotMessages messages={messages} loading={loading} />
        )}
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
