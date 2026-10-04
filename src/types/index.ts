export interface Credentials {
    idInstance: string;
    apiToken: string;
    apiUrl: string;
}

export interface Message {
    id: string;
    message: string;
    direction: 'outgoing' | 'incoming';
    timestamp: number;
}

export interface Chat {
    chatId: string;
    phone: string;
    message: Message[];
}

export interface SendMessageResponse {
    idMessage: string;
}

export interface NotificationBody {
    typeWebhook: string;
    idMessage?: string;
    timestamp?: number;
    senderData?: {
        chatId: string;
    }
    messageData?:{
        typeMessage: string;
        textMessageData?: {
            textMessage: string;
        }
        extendedTextMessageData?:{
            text: string
        }
    }
}

export interface GreenApiNotification {
    receiptId: number;
    body: NotificationBody;
}