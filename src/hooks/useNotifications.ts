import type {Credentials, Message, NotificationBody} from "../types";
import {useEffect} from "react";
import {receiveNotification, deleteNotification} from "../api/greenApi.ts"

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function toMessage(body: NotificationBody): {chatId: string; message: Message} | null {
    if (body.typeWebhook !== 'incomingMessageReceived') return null;

    const chatId = body.senderData?.chatId;
    const text = body.messageData?.textMessageData?.textMessage ??
        body.messageData?.extendedTextMessageData?.text;
    if(!chatId || !text || !body.idMessage || !body.timestamp ) return null;
    return {
        chatId,
        message: {
            id: body.idMessage,
            message: text,
            direction: 'incoming',
            timestamp: body.timestamp,
        }
    }
}

export function useNotifications(
    credentials: Credentials | null,
    onMessage: (chatId: string, message: Message) => void,
) {
    useEffect(() => {
        if (!credentials) return;

        let stopped = false;

        const loop = async () => {
            while (!stopped) {
                try {
                    const notification = await receiveNotification(credentials);
                    if (stopped) break;
                    if (!notification) continue;

                    const parsed = toMessage(notification.body);
                    if (parsed) {
                        onMessage(parsed.chatId, parsed.message);
                    }

                    await deleteNotification(credentials, notification.receiptId);
                } catch {
                    await sleep(3000);
                }
            }
        };

        loop();

        return () => {
            stopped = true;
        };
    }, [credentials]);
}