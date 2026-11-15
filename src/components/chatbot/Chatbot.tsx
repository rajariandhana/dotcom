"use client";

import { useMutation } from "@tanstack/react-query";
import { Fragment, useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { FaArrowUp, FaRotateRight } from "react-icons/fa6";

import { askChatbot, ChatError, MAX_QUERY_LENGTH } from "@/lib/chatbot";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "bot"; text: string }
  | { id: number; role: "error"; text: string; query: string };

/** A message before it gets its id (distributes over the union, unlike a bare Omit). */
type NewMessage = Message extends infer M ? (M extends Message ? Omit<M, "id"> : never) : never;

/** Starters shown before the first message: what the knowledge base covers. */
const suggestions = [
  "Who is Ralfazza?",
  "Where did he study?",
  "What projects has he built?",
  "What games has he made?",
];

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

/**
 * Chat with the RAG assistant in dotcom-be. The conversation lives only in this
 * component's state; each question is answered on its own (the backend keeps no
 * thread), so it resets when the page is left.
 */
export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const nextId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputId = useId();

  const push = (message: NewMessage) =>
    setMessages((prev) => [...prev, { ...message, id: nextId.current++ } as Message]);

  const ask = useMutation({
    mutationFn: askChatbot,
    onSuccess: (data) => push({ role: "bot", text: data.answer }),
    onError: (error, query) =>
      push({
        role: "error",
        text: error instanceof ChatError ? error.message : "Something went wrong. Please try again.",
        query,
      }),
  });

  const send = (text: string) => {
    const query = text.trim();
    if (!query || ask.isPending) return;
    push({ role: "user", text: query });
    setDraft("");
    ask.mutate(query);
  };

  // Retrying replaces the error with a fresh attempt at the same question.
  const retry = (message: Extract<Message, { role: "error" }>) => {
    if (ask.isPending) return;
    setMessages((prev) => prev.filter((m) => m.id !== message.id));
    ask.mutate(message.query);
  };

  // Keep the newest message in view.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages, ask.isPending]);

  // Grow the textarea with its content, up to its max height.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [draft]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(draft);
  };

  // Enter sends, Shift+Enter adds a line (not while an IME is composing).
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(draft);
    }
  };

  const empty = messages.length === 0 && !ask.isPending;

  return (
    <section className="flex h-[min(42rem,calc(100dvh-14rem))] min-h-96 flex-col border border-block bg-surface">
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4 sm:p-5"
      >
        {empty ? (
          <div className="m-auto flex max-w-md flex-col items-center gap-5 text-center">
            <p className="leading-relaxed text-pretty text-muted">
              Ask anything about my background, studies, projects or hobbies. Answers come only from what&apos;s on
              this site, so it won&apos;t guess.
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => send(s)}
                    className={`border border-block bg-background px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent ${focusRing}`}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          messages.map((m) => <Bubble key={m.id} message={m} onRetry={retry} retryDisabled={ask.isPending} />)
        )}
        {ask.isPending && <Typing />}
      </div>

      <form onSubmit={onSubmit} className="flex items-end gap-2 border-t border-block p-3 sm:p-4">
        <label htmlFor={inputId} className="sr-only">
          Your question
        </label>
        <textarea
          ref={inputRef}
          id={inputId}
          rows={1}
          value={draft}
          maxLength={MAX_QUERY_LENGTH}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask about Ralfazza…"
          className={`max-h-40 min-h-10 flex-1 resize-none border border-block bg-background px-3 py-2 leading-normal placeholder:text-muted ${focusRing}`}
        />
        <button
          type="submit"
          disabled={!draft.trim() || ask.isPending}
          aria-label="Send"
          className={`grid size-10 shrink-0 place-items-center bg-accent text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40 ${focusRing}`}
        >
          <FaArrowUp aria-hidden />
        </button>
      </form>
    </section>
  );
}

function Bubble({
  message,
  onRetry,
  retryDisabled,
}: {
  message: Message;
  onRetry: (m: Extract<Message, { role: "error" }>) => void;
  retryDisabled: boolean;
}) {
  if (message.role === "user") {
    return (
      <p className="max-w-[85%] self-end bg-accent px-3.5 py-2 leading-relaxed break-words whitespace-pre-wrap text-accent-foreground">
        {message.text}
      </p>
    );
  }
  if (message.role === "error") {
    return (
      <div role="alert" className="flex max-w-[85%] flex-col items-start gap-2 self-start border border-danger/40 px-3.5 py-2">
        <p className="leading-relaxed text-danger">{message.text}</p>
        <button
          type="button"
          onClick={() => onRetry(message)}
          disabled={retryDisabled}
          className={`inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline disabled:opacity-50 ${focusRing}`}
        >
          <FaRotateRight aria-hidden className="size-3" /> Try again
        </button>
      </div>
    );
  }
  return (
    <div className="flex max-w-[85%] flex-col gap-2 self-start border border-block bg-background px-3.5 py-2 leading-relaxed break-words">
      <Answer text={message.text} />
    </div>
  );
}

function Typing() {
  return (
    <div
      aria-label="The chatbot is typing"
      className="flex gap-1 self-start border border-block bg-background px-3.5 py-3.5"
    >
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="size-1.5 animate-bounce rounded-full bg-muted motion-reduce:animate-none"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}

/**
 * The model writes light Markdown: paragraphs, "-"/"*" bullet lists and **bold**.
 * Render just those, as text — never as HTML.
 */
function Answer({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="flex list-disc flex-col gap-1 pl-5">
        {list.map((item, i) => (
          <li key={i}>
            <Inline text={item} />
          </li>
        ))}
      </ul>,
    );
    list = [];
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const bullet = /^(?:[-*•]|\d+[.)])\s+(.*)$/.exec(line);
    if (bullet) {
      list.push(bullet[1]);
      continue;
    }
    flush();
    if (line) {
      blocks.push(
        <p key={`p-${blocks.length}`}>
          <Inline text={line} />
        </p>,
      );
    }
  }
  flush();
  return blocks;
}

function Inline({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
