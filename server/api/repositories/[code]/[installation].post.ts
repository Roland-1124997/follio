export default defineEventHandler((event) => {
    // return new Promise(async (resolve, reject) => {

    //     const { code, installation } = getRouterParams(event);
    //     if (!code || !installation) return reject({
    //         statusCode: 400,
    //         statusMessage: "Bad Request",
    //         message: "The server cannot or will not process the request due to an apparent client error."
    //     })

    //     const SessionId: any = getCookie(event, "access-token")
    //     const user: Record<string, any> | null = await useStorage("Sessions").getItem(SessionId)
        
    //     if (!user) return reject({
    //         statusCode: 401,
    //         statusMessage: "Unauthorized",
    //         message: "The request has not been applied because it lacks valid authentication credentials for the target resource."
    //     })
        
    //     if (!user.Admin) return {
    //         statusCode: 403,
    //         statusMessage: "Forbidden",
    //         message: "The server understood the request but refuses to authorize it."
    //     }

    //     await useOctokit(installation).then(async (OctoKitData: any) => {
    //         await useSaveInstall("Create", user, OctoKitData)
    //         return resolve({
    //             statusCode: 200,
    //             statusMessage: "OK",
    //             message: "The request has succeeded."
    //         });
    //     }).catch((err: any) => {
    //         return reject({
    //             statusCode: err.status,
    //             statusMessage: err.message,
    //             message: "An error has occurred while trying to save the installation through the GitHub API. try again later."
    //         })
    //     })
    // })
})
