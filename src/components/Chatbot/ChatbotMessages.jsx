export default function ChatbotMessages({ messages, loading }) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-[75%] px-4 py-2 rounded-xl ${
            msg.role === "client"
              ? "self-end bg-blue-500 text-white"
              : "self-start bg-gray-200 text-black"
          }`}
        >
          {msg.content}
        </div>
      ))}

      {loading && (
        <div className="self-start bg-gray-200 px-4 py-2 rounded-xl">
          typing...
        </div>
      )}
    </div>
  );
}
