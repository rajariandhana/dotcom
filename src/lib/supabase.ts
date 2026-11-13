import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { env } from "./env";

let client: SupabaseClient | undefined;

/**
 * Lazily created so a missing env var only fails the code that needs
 * Supabase, not every page that happens to import this module.
 */
export function getSupabase(): SupabaseClient {
  if (!client) {
    if (!env.supabaseUrl || !env.supabaseApiKey) {
      throw new Error(
        "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_API_KEY.",
      );
    }
    client = createClient(env.supabaseUrl, env.supabaseApiKey);
  }
  return client;
}
