
export default defineSupabaseEventHandler(async (event, { server }) => {

    const imap_client = await useConnectClient();
    await useGetImapMailbox(imap_client, 'INBOX');
    
    const id = getRouterParam(event, 'id');
    const type = getQuery(event).type;

    const search = { uid: id };

    if (type == "email") {

        const { error } = await useDeleteMessage(imap_client, search);
        if (error) return useReturnResponse(event, internalServerError);
    }

    else if (type == "bericht") {

        const { error } = await server.from("berichten").delete().eq("uid", id);
        if (error) return useReturnResponse(event, internalServerError);
    }

    return useReturnResponse(event, {
        status: {
            success: true,
            code: 200,
            message: "Bericht succesvol verwijderd"
        }
    })
})