import { createClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

// Use placeholder values if environment variables are not set
const supabaseUrl = PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
