import { randomUUID } from "crypto";

export default defineSupabaseEventHandler(async (event, { server }) => {

    await startImapWatcher();

    const emitter = getImapEmitter();

    const eventStream = createEventStream(event);

    const push = (payload: unknown) => {
        eventStream.push(JSON.stringify(payload));
    };

    server.channel("public:berichten").on("postgres_changes", { event: "*", schema: "public", table: "berichten" }, async (changeEvent: any) => {
        push(randomUUID())
    }).subscribe();

    emitter.on('new', push);

    eventStream.onClosed(async () => {
        emitter.off('new', push);
    });

    return eventStream.send();

});
