import { useRef } from "react";

export default function PromptBox({ query, setQuery, onSubmit, loading }) {
  const textareaRef = useRef(null);

  const adjustTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const submit = () => {
    if (loading || !query.trim()) return;
    onSubmit(query);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          adjustTextarea();
        }}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about me..."
        rows={1}
        disabled={loading}
        className="flex-1 resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-[15px] text-black placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors disabled:opacity-40 leading-relaxed"
      />
      <button
        onClick={submit}
        disabled={loading || !query.trim()}
        className="shrink-0 w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all cursor-pointer disabled:cursor-not-allowed"
        aria-label="Send"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M3.5 9H14.5M14.5 9L10 4.5M14.5 9L10 13.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
