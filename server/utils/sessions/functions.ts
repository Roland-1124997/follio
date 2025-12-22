
import type { H3Event } from "h3";
import { SupabaseClient, Session, User, AuthError } from "@supabase/supabase-js";

export const useGetSession = async (client: SupabaseClient, currentSession: Session | Omit<Session, "user">) => {
    
    const stored = useStorage<User>(`sessions`);
    const cached = await stored.getItem(`session`);
    
    if(!currentSession?.access_token) return {
        data: { user: null }, 
        error: new AuthError('The user does not have an active session',)
    };
    
    if(cached) return { data: { user: cached }, error: null };
    
    const { data, error } = await client.auth.getUser(currentSession?.access_token);
    if(!error && data) await stored.setItem(`session`, data.user, { ttl: 60 * 5 });
    
    return { data, error };
}

export const useRefreshSession = async (client: SupabaseClient, currentSession: Session | Omit<Session, "user">) => {
    const result = await client.auth.refreshSession(currentSession);
    return result;
}

export const useDeleteSession = async (client: SupabaseClient) => {
    return await client.auth.signOut();
}
export const useSetSessionData = async (event: H3Event, user: User | null) => {
    if (user) {

        const server: SupabaseClient = useSupaBaseServer();
        const { data } = await server.from("factor_sessions").select("*").eq("user_id", user.id).single()

        const cookie = getCookie(event, "opt-verified")
        
        if (!data || cookie) return {
            id: user.id,
            email: user.email,
            factors: !!user.factors,
        }

        return {
            mfa_needs_to_verfied: !!data,
        }
    }

    return
}


export const useSessionExists = async (event: H3Event, client: SupabaseClient) => {

    const currentSession: any = await serverSupabaseSession(event);
    const { data, error } = await useGetSession(client, currentSession);

    return { data: data?.user, error };
}
