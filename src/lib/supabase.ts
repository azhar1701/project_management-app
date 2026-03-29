import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create the Supabase client. 
// Uses temporary placeholders to prevent crashing in local development prior to adding real .env variables.
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);

/**
 * HydroGIS Database Connection Guide:
 * 1. Create a project at https://supabase.com
 * 2. Create a `.env` file at the root of your project
 * 3. Add your keys:
 *    VITE_SUPABASE_URL=your-project-url
 *    VITE_SUPABASE_ANON_KEY=your-anon-key
 */
