import type { H3Event } from "h3";
import type { SupabaseClient, User, AuthError } from "@supabase/supabase-js";

export const defineSupabaseEventHandler = (callback: (event: H3Event, options: { user: User, server: SupabaseClient }) => any) => {
    return defineEventHandler(async (event: H3Event) => {

        const client: SupabaseClient = await serverSupabaseClient(event);
        const server: SupabaseClient = serverSupabaseServiceRole(event)

        const { data: user, error } = await useSessionExists(event, client);
        if (!user || error) return useReturnResponse(event, unauthorizedError)

        return callback(event, { user, server })

    })
}


export const defineSupabaseFileHandler = (callback: (event: H3Event, options: { user: User | null, server: SupabaseClient }) => any) => {
    return defineEventHandler(async (event: H3Event) => {

        const client: SupabaseClient = await serverSupabaseClient(event);
        const server: SupabaseClient = serverSupabaseServiceRole(event)

        const { data: user } = await useSessionExists(event, client);

        return callback(event, { user, server })
    })
}


