// Re-export from browser client for backward compatibility
export { createClient as createBrowserClient } from './supabase-browser';

// Legacy client (deprecated - use createBrowserClient instead)
import { createClient as createClientOriginal } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClientOriginal(supabaseUrl, supabaseKey);