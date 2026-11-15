import { isAxiosError } from "axios";

import { http } from "./http";

/**
 * Client for the RAG chatbot in dotcom-be (`POST /rag/qa`). The backend answers
 * from the site's own data (profile, education, projects) using Gemini.
 */

/** Same limit the backend validates against. */
export const MAX_QUERY_LENGTH = 2000;

export type ChatSource = {
  id: string;
  title: string;
  source: string;
  section: string;
  score: number;
};

export type ChatAnswer = {
  answer: string;
  sources: ChatSource[];
  /** Which chat model answered, or null when nothing relevant was found. */
  model: string | null;
  attempts: number;
};

type Envelope<T> = { meta: { status: number; message: string }; data: T };

/** Thrown with a message that's fine to show the visitor as is. */
export class ChatError extends Error {}

export async function askChatbot(query: string): Promise<ChatAnswer> {
  try {
    const res = await http.post<Envelope<ChatAnswer>>("/rag/qa", { query });
    return res.data.data;
  } catch (error) {
    throw new ChatError(describeError(error));
  }
}

function describeError(error: unknown): string {
  if (!isAxiosError(error)) return "Something went wrong. Please try again.";
  if (!error.response) {
    return error.code === "ECONNABORTED"
      ? "The chatbot took too long to answer. Please try again."
      : "Couldn't reach the chatbot. Check your connection and try again.";
  }
  const { status, data } = error.response;
  if (status === 503) {
    // Every model is rate-limited; the backend says when to come back.
    const ms = (data as Envelope<{ retryAfterMs?: number }> | undefined)?.data?.retryAfterMs;
    const seconds = ms ? Math.max(1, Math.ceil(ms / 1000)) : null;
    return seconds
      ? `The chatbot is busy right now. Please try again in ${seconds} second${seconds === 1 ? "" : "s"}.`
      : "The chatbot is busy right now. Please try again shortly.";
  }
  if (status === 400) return "That question couldn't be sent. Try rephrasing it.";
  return "The chatbot couldn't answer that. Please try again.";
}
