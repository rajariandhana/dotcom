import { QueryClient } from "@tanstack/react-query";

/** Same defaults as the Vite app: no refetch on focus, no automatic retries. */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
}
