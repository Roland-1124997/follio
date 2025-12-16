import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

export { serverSupabaseClient, serverSupabaseUser, serverSupabaseSession, serverSupabaseServiceRole } from '#supabase/server'

let server: SupabaseClient | null = null;
let client: SupabaseClient | null = null;

export const useSupaBaseServer = () => {
    if (!server) {
        const config = useRuntimeConfig();
        server = createClient<Database>(
            config.supabaseUrl || '',
            config.supabaseSecretKey || '',
        );
    }
    return server;
}

export const useSupaBaseClient = () => {
    if (!client) {
        const config = useRuntimeConfig();
        client = createClient<Database>(
            config.supabaseUrl || '',
            config.supabaseKey || '',
        );
    }
    return client;
}



