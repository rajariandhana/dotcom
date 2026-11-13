import axios from "axios";

import { env } from "./env";

/** Shared axios instance for the site's own API (`NEXT_PUBLIC_API_URL`). */
export const http = axios.create({
  baseURL: env.apiUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 60_000,
});
