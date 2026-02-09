import { createClient } from "@supabase/supabase-js/dist/index.cjs";
import environment from "../../config/environment";

const supabase = createClient(
  environment.SUPABASE_URL,
  environment.SUPABASE_API_KEY,
);

export default supabase;
