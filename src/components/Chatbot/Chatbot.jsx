import { useState, useRef, useEffect } from "react";
import PromptBox from "./PromptBox";
import ChatbotMessages from "./ChatbotMessages";
import instance from "../../libs/axios/instance";

const ERROR_MESSAGE =
  "Something went wrong... The AI probably reached it's limit, try again later...";

const sampleQueries = [
  "What school he went to?",
  "What are some of his web projects?",
  "What hobbies does he like?",
];

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const onSubmit = async (overrideQuery) => {
    const finalQuery = overrideQuery ?? query;
    if (!finalQuery.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "client", content: finalQuery }]);
    setQuery("");
    setLoading(true);

    try {
      const response = await instance.post("/rag/qa", { query: finalQuery });
      const answer = response.data.data;

      setMessages((prev) => [...prev, { role: "server", content: answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "server", content: ERROR_MESSAGE, isError: true },
      ]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center h-[calc(100dvh-7rem)] mb-6">
      <div className="relative w-full max-w-2xl h-full flex flex-col rounded-2xl border border-stone-200 bg-white overflow-hidden">
        {/* Header */}
        <header className="shrink-0 flex items-center gap-3 px-4 h-14 border-b border-stone-100">
          <div className="w-8 h-8 shrink-0 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold">
            AI
          </div>
          <div className="flex flex-col leading-tight flex-1 min-w-0">
            <span className="text-[15px] font-semibold text-black truncate">
              My Chatbot
            </span>
            <span className="text-xs text-stone-400 truncate">
              Cause apparently every website needs one
            </span>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="shrink-0 text-[11px] font-medium text-stone-400 hover:text-black transition-colors cursor-pointer"
            >
              New chat
            </button>
          )}
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3 bg-stone-50"
        >
          {messages.length === 0 ? (
            <div className="m-auto flex flex-col items-center text-center px-2">
              <h2 className="text-lg font-semibold text-black">
                Meet My Chatbot
              </h2>
              <p className="mt-1 text-sm text-stone-400 mb-6">
                Ask questions about me like:
              </p>
              <div className="flex flex-col gap-2 w-full items-stretch max-w-sm">
                {sampleQueries.map((q) => (
                  <button
                    key={q}
                    onClick={() => onSubmit(q)}
                    className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-[14px] text-stone-600 hover:border-stone-400 hover:text-black transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ChatbotMessages messages={messages} loading={loading} />
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 px-4 pt-3 pb-4 border-t border-stone-100">
          <PromptBox
            query={query}
            setQuery={setQuery}
            onSubmit={onSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
