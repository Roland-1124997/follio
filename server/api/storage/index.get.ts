interface FileMetadata {
    size: number;
    mimetype: string;
    created_at: string;
    updated_at: string;
    extension: string;
}


export default defineSupabaseEventHandler(async (event, { server }) => {

    const files: any[] = [];

    const { data, error } = await server.from('attachments').select('*').order('updated_at', { ascending: false });

    if (data) {

        for (const file of data) {

            const { data: meta, error: metaError } = await server.storage.from('stores').info(file.name);
            if (metaError || !meta) continue;

            files.push({
                id: file.id,
                name: file.name,
                published: file.published,
                media: {
                    preview: `/attachments/${file.name}`
                },
                metadata: {
                    size: meta.size,
                    mimetype: meta.contentType,
                    created_at: meta.createdAt,
                    updated_at: meta.lastModified,
                    extension: meta.name.split('.').pop() as string
                }
            });
        }
    }


    if (error) return useReturnResponse(event, internalServerError);

    return useReturnResponse(event, {
        status: {
            code: 200,
            message: 'Bestanden succesvol opgehaald',
            success: true
        },
        data: files
    })

});

