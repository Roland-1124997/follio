import { randomUUID } from "crypto";

export default defineSupabaseEventHandler(async (event, { server }) => {

    const eventStream = createEventStream(event);

    const push = (payload: unknown) => {
        eventStream.push(JSON.stringify(payload));
    };

    server.channel("public:attachments").on("postgres_changes", { event: "*", schema: "public", table: "attachments" }, async (changeEvent: any) => {
        push(randomUUID())
    }).subscribe();

    
    return eventStream.send();

});
