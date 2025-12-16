import * as zod from "zod";

const schema = zod.object({
    code: zod.string({ message: "This field is required" }).nonempty({ message: "This field is required" }).min(6, { message: "Must be at least 6 characters long" }).max(6, { message: "Must be at most 6 characters long" }),
})

// export default defineSupabaseEventHandler(async (event, user, client, server) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     if (!user) return useReturnResponse(event, unauthorizedError);

//     const request = await readBody(event);
//     const { error: zodError } = await schema.safeParseAsync(request);

//     if (zodError) return useReturnResponse(event, {
//         ...badRequestError,
//         error: {
//             type: "fields",
//             details: zodError.errors
//         }
//     });

//     const { error: sessionError } = await server.from("factor_sessions").select("*").eq("user_id", user.id).single()

//     if (sessionError) return useReturnResponse(event, {
//         ...unauthorizedError,
//         error: {
//             type: "fields",
//             details: {
//                 code: ["Not enabled for this account"],
//             }
//         }
//     });

//     const { data: factors, error: factorError } = await client.auth.mfa.listFactors()
//     if (factorError) return useReturnResponse(event, internalServerError)

//     const { error } = await client.auth.mfa.challengeAndVerify({
//         factorId: factors.all[0].id,
//         code: request.code
//     })

//     if (error) return useReturnResponse(event, {
//         ...unauthorizedError,
//         error: {
//             type: "fields",
//             details: {
//                 code: [error?.message],
//             }
//         }
//     });

//     /*
//     ************************************************************************************
//     */

//     const invite = getCookie(event, "invite_token");
//     const session: Omit<Session, "user"> | null = await serverSupabaseSession(event);

//     await server.from("factor_sessions").delete().eq("user_id", user.id)

//     setCookie(event, "opt-verified", "true", {
//         maxAge: 60 * 60 * 24 * 14,
//         httpOnly: true,
//     })

//     deleteCookie(event, "invite_token");
//     useSetCookies(event, session);

//     return useReturnResponse(event, {
//         status: {
//             success: true,
//             redirect: invite || "/",
//             message: "Ok",
//             code: 200
//         }
//     });

// })



