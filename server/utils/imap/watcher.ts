import { EventEmitter } from 'events';
import type { ImapFlow } from 'imapflow';
import { setTimeout as wait } from 'timers/promises';

import { randomUUID } from "crypto";


let started = false;
let stopped = false;

let events = [
    'flags', 'exists', 'expunge'
]

const imapEmitter = new EventEmitter();

export const startImapWatcher = async () => {
    if (started) return;

    started = true;
    stopped = false;

    let client: ImapFlow

    const connectAndWatch = async () => {

        client = await useConnectClient();
        await useGetImapMailbox(client, 'INBOX');

        events.forEach((event: any) => {
            client.on(event, async () => {
                imapEmitter.emit('new', randomUUID());
            });
        });

        while (!stopped) await (client as any).idle?.();

        await useCloseImapClient(client);
    };

    (async () => {
        let attempt = 0;
        while (!stopped) {

            await connectAndWatch();
            if (stopped) break;

            attempt++;
            const delay = Math.min(30_000, 1000 * Math.pow(2, Math.min(6, attempt))); // max 30s
            await wait(delay);
        }
    })();
};

export const stopImapWatcher = async () => {
    stopped = true;
    started = false;
};

export const getImapEmitter = () => imapEmitter;

export const fetchImapNewMessages = async (client: ImapFlow, options: Record<string, number>) => {

    const mailbox = await useGetImapMailbox(client, 'INBOX');

    const startSeq = Math.max(1, (mailbox.exists || 0) - options.messages)

    const messages = await useFetchImapMessages(client, `${startSeq}:*`, {
        uid: true,
        envelope: true,
        internalDate: true,
        flags: true,
        source: true,
    });

    const unseen = messages.filter((m: any) => !m.flags.includes('\\Seen')).length;

    return { messages, unseen };
    
}

