import type {Credentials, SendMessageResponse, GreenApiNotification} from "../types";

function buildUrl(credentials: Credentials, method: string): string {
    const base = credentials.apiUrl.replace(/\/$/, '');
    return `${base}/waInstance${credentials.idInstance}/${method}/${credentials.apiToken}`;
}

export async function sendMessage(credentials: Credentials, chatId: string, message: string): Promise<SendMessageResponse> {
    const response = await fetch(buildUrl(credentials, 'sendMessage'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({chatId, message}),
    });
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
    }

    return response.json();
}

export async function receiveNotification(credentials: Credentials): Promise<GreenApiNotification | null> {
    const response = await
        fetch(buildUrl(credentials, 'receiveNotification') + '?receiveTimeout=5',)
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
    }

    return response.json();

}

export async function deleteNotification(credentials: Credentials, receiptId: number): Promise<void> {
    const response = await fetch(buildUrl(credentials, 'deleteNotification') + '/' + receiptId, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
    }
}