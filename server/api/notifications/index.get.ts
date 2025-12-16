
export default defineSupabaseEventHandler(async (event, { server }) => {

    const imap_client = await useConnectClient();
    await useGetImapMailbox(imap_client, 'INBOX');

    const list = await fetchImapNewMessages(imap_client, { messages: 100 });

    const { data, error } = await server.from("berichten").select("*").order("date", { ascending: false })

    if (!error) {
        list.unseen += data.filter((m: any) => !((m.flags || []) as string[]).includes('\\Seen')).length || 0;
        list.messages.push(...data.map((item: any) => item));
        list.messages.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    await useCloseImapClient(imap_client);

    return useReturnResponse(event, { 
        status: {
            code: 200,
            success: true,
            message: 'Notificaties succesvol opgehaald',
        },
        data: list
    });

});
