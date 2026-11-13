/**
 * Public environment variables. Next.js only inlines `NEXT_PUBLIC_*` values
 * into client bundles when they are referenced literally, so keep each
 * `process.env.NEXT_PUBLIC_…` spelled out here.
 */
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseApiKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "",
} as const;
